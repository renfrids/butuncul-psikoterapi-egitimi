const crypto = require('crypto');

const FORMSPREE_URL = 'https://formspree.io/f/mkodwnvn';
const META_PIXEL_ID = '1573209434143007';
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

function sha256(input) {
  return crypto.createHash('sha256').update(input, 'utf8').digest('hex');
}

function normalizeEmail(email) {
  return (email || '').trim().toLowerCase();
}

function normalizePhone(phone) {
  let digits = (phone || '').replace(/[\s()+-]/g, '').replace(/\D/g, '');
  if (digits.startsWith('0')) digits = digits.slice(1);
  if (!digits.startsWith('90')) digits = '90' + digits;
  return digits;
}

function splitName(fullName) {
  const parts = (fullName || '').trim().split(/\s+/).filter(Boolean);
  const fn = (parts.shift() || '').toLowerCase();
  const ln = parts.join(' ').toLowerCase();
  return { fn, ln };
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ success: false, error: 'method_not_allowed' }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ success: false, error: 'invalid_json' }) };
  }

  const { ad, email, tel, meslek, kvkk_onay, fbp, fbc, fbclid, landing_url, referrer } = payload;

  if (!ad || !email || !tel || !meslek || !kvkk_onay) {
    return { statusCode: 400, body: JSON.stringify({ success: false, error: 'missing_fields' }) };
  }

  // 1) Basvuruyu Formspree'ye ilet - mevcut kayit/bildirim akisi bundan sonra da bu uzerinden isliyor.
  let formspreeRes;
  try {
    formspreeRes = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: 'Bütüncül Psikoterapi Eğitimi — Yeni Ön Başvuru',
        ad, email, tel, meslek,
      }),
    });
  } catch (e) {
    return { statusCode: 502, body: JSON.stringify({ success: false, error: 'formspree_unreachable' }) };
  }

  if (!formspreeRes.ok) {
    return { statusCode: 502, body: JSON.stringify({ success: false, error: 'formspree_failed' }) };
  }

  // 2) Formspree basvuruyu basariyla kaydettiginde, ayni event_id'yi Pixel'in de kullanacagi
  //    sekilde backend'de uret (Meta dedup'i bu ID uzerinden yapar).
  const eventId = 'LEAD_' + crypto.randomUUID();
  const eventTime = Math.floor(Date.now() / 1000);

  const clientIp =
    event.headers['x-nf-client-connection-ip'] ||
    (event.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const userAgent = event.headers['user-agent'] || '';
  const { fn, ln } = splitName(ad);

  const userData = {
    em: [sha256(normalizeEmail(email))],
    ph: [sha256(normalizePhone(tel))],
    fn: [sha256(fn)],
    client_ip_address: clientIp,
    client_user_agent: userAgent,
  };
  if (ln) userData.ln = [sha256(ln)];
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;
  else if (fbclid) userData.fbc = `fb.1.${eventTime}.${fbclid}`;

  const capiBody = {
    data: [
      {
        event_name: 'Lead',
        event_time: eventTime,
        event_id: eventId,
        action_source: 'website',
        event_source_url: landing_url || 'https://butunculterapilerenstitusu.com/',
        user_data: userData,
        custom_data: {
          content_name: 'Bütüncül Psikoterapi Eğitimi',
          content_category: 'education',
          lead_type: 'pre_interview_application',
          form_id: 'education_pre_interview_form',
          referrer: referrer || '',
        },
      },
    ],
  };

  // 3) Meta CAPI'ye gonder. CAPI basarisiz olsa da basvuru Formspree'ye kaydedildigi icin
  //    kullaniciya hata gostermiyoruz - sadece loglayip devam ediyoruz.
  if (META_ACCESS_TOKEN) {
    try {
      const capiRes = await fetch(
        `https://graph.facebook.com/v20.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(capiBody),
        }
      );
      if (!capiRes.ok) {
        console.error('Meta CAPI hata:', await capiRes.text());
      }
    } catch (err) {
      console.error('Meta CAPI istek hatasi:', err.message);
    }
  } else {
    console.error('META_ACCESS_TOKEN tanimli degil - CAPI gonderimi atlandi.');
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: true, eventId }),
  };
};
