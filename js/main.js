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
  const el = document.querySelector('.hero h1');
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

/* ---------- form (Formspree'ye gönderim) ---------- */
const form = document.getElementById('leadForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error('Gönderim başarısız');
    form.style.display = 'none';
    document.getElementById('formSuccess').classList.add('show');
    /* Meta Pixel: Lead eventi yalnızca basvuru basariyla kaydedildikten sonra tetiklenir.
       TODO: Conversions API (backend) kurulunca event_id backend'de uretilip buraya
       donmeli - Pixel ve CAPI ayni event_id'yi paylasmali (dedup icin). Backend yokken
       gecici olarak burada uretiliyor. */
    if (typeof fbq === 'function') {
      const eventId = 'LEAD_' + crypto.randomUUID();
      fbq('track', 'Lead', {
        content_name: 'Bütüncül Psikoterapi Eğitimi',
        content_category: 'education',
        lead_type: 'pre_interview_application',
        form_id: 'education_pre_interview_form'
      }, { eventID: eventId });
    }
  } catch (err) {
    submitBtn.disabled = false;
    alert('Talebiniz gönderilemedi. Lütfen tekrar deneyin ya da bizimle doğrudan iletişime geçin.');
  }
});

/* ---------- video placeholder ---------- */
document.getElementById('videoFrame').addEventListener('click', () => {
  /* TODO (Claude Code): YouTube/Vimeo iframe'i buraya gömün. */
  alert('Tanıtım videosu buraya gömülecek (YouTube/Vimeo embed).');
});
