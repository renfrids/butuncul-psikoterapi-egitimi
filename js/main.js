/* ---------- URL'de hash varsa (ör. reklam linki #form ile bitiyorsa) sayfa
   acilista otomatik kaymasin, hep en ustten baslasin ---------- */
if (window.location.hash) {
  history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  window.addEventListener('load', () => window.scrollTo(0, 0));
}

/* ---------- yıl ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- header scroll ---------- */
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
});

/* ---------- mobil menü ---------- */
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

/* ---------- hero başlık daktilo efekti ---------- */
(() => {
  const el = document.querySelector('.hero-hook-overlay');
  if (!el) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const fullText = el.textContent.trim();
  el.textContent = '';
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  cursor.textContent = '|';
  el.appendChild(cursor);

  let i = 0;
  const speed = 38;
  function typeNext() {
    if (i < fullText.length) {
      cursor.insertAdjacentText('beforebegin', fullText[i]);
      i++;
      setTimeout(typeNext, speed);
    }
  }
  typeNext();
})();

/* ---------- akordeonlar (müfredat + SSS) ---------- */
document.querySelectorAll('.acc-head').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const body = btn.nextElementSibling;
    const open = item.classList.contains('open');
    // aynı akordeon içindekileri kapat
    item.parentElement.querySelectorAll('.acc-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.acc-body').style.maxHeight = null;
    });
    if (!open) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

/* ---------- eğitmen biyografisi "devamını oku" ---------- */
document.querySelectorAll('.team-more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const full = btn.previousElementSibling;
    if (!full || !full.classList.contains('team-full')) return;
    const isHidden = full.hidden;
    full.hidden = !isHidden;
    btn.textContent = isHidden ? 'Daha az göster' : 'Devamını oku';
  });
});

/* ---------- form (Netlify Function uzerinden Formspree + Meta CAPI) ---------- */
const form = document.getElementById('leadForm');

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : '';
}

const telInput = document.getElementById('tel');
const telField = telInput.closest('.field');

function validatePhone() {
  const digits = telInput.value.replace(/\D/g, '');
  // Kabul edilen formatlar: 0XXXXXXXXXX (11 hane, yerel) veya 90XXXXXXXXXX (12 hane, +90 dahil ulke kodulu).
  // Sadece cıplak 10 haneli (0 veya 90 onsuz) girisde "basina 0 koy" uyarisi gosterilir.
  const valid = /^0\d{10}$/.test(digits) || /^90\d{10}$/.test(digits);
  telField.classList.toggle('has-error', !valid);
  telInput.setCustomValidity(valid ? '' : ' ');
  return valid;
}
telInput.addEventListener('input', () => {
  if (telField.classList.contains('has-error')) validatePhone();
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validatePhone()) { telInput.focus(); return; }
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  try {
    const params = new URLSearchParams(location.search);
    const payload = {
      ad: form.ad.value,
      email: form.email.value,
      tel: form.tel.value,
      meslek: form.meslek.value,
      kvkk_onay: form.kvkk.checked ? 'Onaylandı' : '',
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc'),
      fbclid: params.get('fbclid') || '',
      landing_url: location.href,
      referrer: document.referrer,
    };
    const res = await fetch('/.netlify/functions/submit-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) throw new Error('Gönderim başarısız');
    form.style.display = 'none';
    document.getElementById('formSuccess').classList.add('show');
    /* Pixel (tarayici) + CAPI (sunucu) birlikte, Meta'nin onerdigi sekilde: ayni event_id
       ile eslestirilip dedup yapiliyor. Bu cagri kisisel veri (email/telefon/ad)
       ICERMEZ - sadece kategori/ID bilgisi tarayicidan gecer, hassas veri yalnizca
       sunucudaki CAPI cagrisinda (hash'lenmis olarak) yer alir. */
    if (typeof fbq === 'function' && data.eventId) {
      fbq('track', 'Lead', {
        content_name: 'Bütüncül Psikoterapi Eğitimi',
        content_category: 'education',
        lead_type: 'pre_interview_application',
        form_id: 'education_pre_interview_form'
      }, { eventID: data.eventId });
    }
  } catch (err) {
    submitBtn.disabled = false;
    alert('Talebiniz gönderilemedi. Lütfen tekrar deneyin ya da bizimle doğrudan iletişime geçin.');
  }
});

/* ---------- tanıtım videosu (kendi sunucumuzda barinan mp4, tiklaninca yuklenir) ---------- */
(() => {
  const frame = document.getElementById('videoFrame');
  if (!frame) return;
  frame.addEventListener('click', () => {
    const video = document.createElement('video');
    video.src = 'assets/video/tanitim-video.mp4';
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.style.cssText = 'position:absolute; inset:0; width:100%; height:100%; object-fit:cover;';
    frame.innerHTML = '';
    frame.style.cursor = 'default';
    frame.appendChild(video);
  }, { once: true });
})();

/* ---------- mobil hero video: otomatik + sessiz basla, dokununca ses ac ---------- */
(() => {
  const isMobile = window.matchMedia('(max-width:860px)').matches;
  if (!isMobile) return;
  const wrap = document.getElementById('heroVideo');
  if (!wrap) return;
  const hint = wrap.querySelector('.hero-video-hint');
  const video = document.createElement('video');
  // bazi mobil webview'ler (WhatsApp ic taraycisi vb.) autoplay icin
  // muted/playsinline'i HTML attribute olarak da bekliyor, sadece JS property yetmiyor
  video.setAttribute('muted', '');
  video.setAttribute('autoplay', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.poster = 'assets/images/tanitim-poster.jpg';
  video.src = 'assets/video/tanitim-video.mp4';
  wrap.prepend(video);
  const tryPlay = () => video.play().catch(() => {});
  tryPlay();
  video.addEventListener('loadedmetadata', tryPlay);
  video.addEventListener('canplay', tryPlay);
  video.addEventListener('click', () => {
    if (video.paused) {
      video.muted = false;
      video.controls = true;
      if (hint) hint.style.display = 'none';
      tryPlay();
      return;
    }
    if (!video.muted) return;
    video.muted = false;
    video.controls = true;
    if (hint) hint.style.display = 'none';
  });
})();
