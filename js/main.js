/* ---------- yıl ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- header scroll ---------- */
const header = document.getElementById('siteHeader');
const navCta = document.querySelector('.nav-cta[href="#form"]');
const hero = document.getElementById('hero');
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

/* ---------- ana sayfa / sekme "sayfa değişimi" navigasyonu ---------- */
const homeView = document.getElementById('homeView');
const tabPanels = document.querySelectorAll('.tab-panel');

function showHome({ scroll = true } = {}) {
  homeView.classList.remove('hidden');
  tabPanels.forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a, .foot-links a').forEach(a => a.classList.remove('active'));
  if (scroll) window.scrollTo({ top: 0, behavior: 'auto' });
}

function showTab(panel, { scroll = true } = {}) {
  homeView.classList.add('hidden');
  tabPanels.forEach(p => p.classList.toggle('active', p === panel));
  document.querySelectorAll('.nav-links a, .foot-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + panel.id);
  });
  if (scroll) window.scrollTo({ top: 0, behavior: 'auto' });
}

function scrollToInPage(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const y = target.getBoundingClientRect().top + window.scrollY - (header.offsetHeight + 14);
  window.scrollTo({ top: y, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  const id = a.getAttribute('href').slice(1);

  if (id === 'hero') {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      showHome();
      links.classList.remove('open');
    });
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;

  if (target.classList.contains('tab-panel')) {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      showTab(target);
      links.classList.remove('open');
    });
    return;
  }

  const panel = target.closest('.tab-panel');
  if (panel) {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      showTab(panel, { scroll: false });
      scrollToInPage(id);
      links.classList.remove('open');
    });
  }
  /* #form gibi sekme sisteminin dışındaki linkler tarayıcının doğal çapa davranışına bırakılır */
});

(() => {
  const hashId = location.hash.slice(1);
  const hashTarget = hashId && document.getElementById(hashId);
  const hashPanel = hashTarget && (hashTarget.classList.contains('tab-panel') ? hashTarget : hashTarget.closest('.tab-panel'));
  if (hashPanel) {
    showTab(hashPanel, { scroll: false });
  } else {
    showHome({ scroll: false });
  }
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

/* ---------- eğitmen kartı "devamını oku" ---------- */
document.querySelectorAll('.team-more-btn').forEach(btn => {
  const more = btn.nextElementSibling;
  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    btn.firstChild.textContent = open ? 'Daha az göster ' : 'Devamını oku ';
    more.style.maxHeight = open ? more.scrollHeight + 'px' : null;
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
  } catch (err) {
    submitBtn.disabled = false;
    alert('Talebiniz gönderilemedi. Lütfen tekrar deneyin ya da bizimle doğrudan iletişime geçin.');
  }
});

/* ---------- galeri (tiklayinca buyuyen kart) ---------- */
(() => {
  const shots = document.querySelectorAll('.gallery .shot');
  const overlay = document.getElementById('galeriOverlay');
  if (!shots.length || !overlay) return;

  const overlayImg = document.getElementById('galeriOverlayImg');
  const overlayCap = document.getElementById('galeriOverlayCap');
  const closeBtn = overlay.querySelector('.gallery-overlay-close');
  const backdrop = overlay.querySelector('.gallery-overlay-backdrop');

  function openShot(shot) {
    const img = shot.querySelector('img');
    if (!img) return;
    overlayImg.src = img.src;
    overlayImg.alt = img.alt;
    overlayCap.textContent = shot.dataset.caption || '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeOverlay() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  shots.forEach(shot => shot.addEventListener('click', () => openShot(shot)));
  backdrop.addEventListener('click', closeOverlay);
  closeBtn.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeOverlay(); });
})();

/* ---------- video placeholder ---------- */
document.getElementById('videoFrame').addEventListener('click', () => {
  /* TODO (Claude Code): YouTube/Vimeo iframe'i buraya gömün. */
  alert('Tanıtım videosu buraya gömülecek (YouTube/Vimeo embed).');
});
