// ============================================
// INTERACTIONS.JS — Premium Experience Layer
// Shree Radhe Krishna Enterprises
// ============================================

// ——— 1. DARK MODE TOGGLE ———
function initDarkMode() {
  const toggle = document.getElementById('dark-toggle');
  if (!toggle) return;
  const moon = toggle.querySelector('.icon-moon');
  const sun  = toggle.querySelector('.icon-sun');

  function applyIcons(isDark) {
    if (moon) moon.classList.toggle('hidden', isDark);
    if (sun)  sun.classList.toggle('hidden', !isDark);
  }
  // Apply icons to match current class state (set by inline script in <head>)
  applyIcons(document.documentElement.classList.contains('dark'));

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('srk-dark-mode', isDark ? 'dark' : 'light');
    applyIcons(isDark);
  });
}

// ——— 2. LOADING SCREEN ———
function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;

  // Only show on very first session visit
  if (sessionStorage.getItem('srk-loaded')) {
    screen.remove();
    return;
  }
  sessionStorage.setItem('srk-loaded', '1');

  setTimeout(() => {
    screen.classList.add('fade-out');
    setTimeout(() => screen.remove(), 520);
  }, 1400);
}

// ——— 3. SCROLL PROGRESS ———
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const update = () => {
    const el = document.documentElement;
    const pct = el.scrollHeight - el.clientHeight;
    bar.style.width = pct > 0 ? (el.scrollTop / pct * 100) + '%' : '0%';
  };
  window.addEventListener('scroll', update, { passive: true });
}

// ——— 4. SCROLL REVEAL (fade-up / fade-left / fade-right / stagger) ———
function initReveal() {
  const targets = document.querySelectorAll('[data-reveal], [data-stagger]');
  if (!targets.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  targets.forEach(el => io.observe(el));
}

// ——— 5. COUNTER ANIMATION ———
function animateCounter(el) {
  const target   = parseInt(el.dataset.count, 10);
  const suffix   = el.dataset.suffix || '';
  const duration = 1800;
  const start    = performance.now();

  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - p, 3);
    const val   = Math.round(eased * target);
    el.textContent = val >= 1000 ? val.toLocaleString() + suffix : val + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = '1';
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  els.forEach(el => io.observe(el));
}

// ——— 6. BACK TO TOP ———
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ——— 7. RIPPLE EFFECT ———
function initRipple() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-ripple');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x    = e.clientX - rect.left - size / 2;
    const y    = e.clientY - rect.top  - size / 2;
    const wave = document.createElement('span');
    wave.className = 'ripple-wave';
    wave.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
    btn.appendChild(wave);
    setTimeout(() => wave.remove(), 600);
  });
}

// ——— 8. MOBILE MENU (smooth) ———
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu   = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Close on link click
  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => menu.classList.remove('open'))
  );
}

// ——— 9. FAQ ACCORDION ———
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn    = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all others
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').classList.remove('open');
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.classList.add('open');
      }
    });
  });
}

// ——— 10. TOAST SYSTEM ———
window.showToast = function(message, icon = '✓') {
  let container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span style="font-size:15px;line-height:1">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 280);
  }, 3000);
};

// ——— 11. TESTIMONIAL SLIDER (auto + hover pause + dots) ———
function initTestimonialSlider() {
  const slider = document.getElementById('testimonial-slider');
  if (!slider) return;
  const slides = slider.querySelectorAll('.t-slide');
  const dots   = slider.querySelectorAll('.t-dot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  const show = (idx) => {
    slides.forEach((s, i) => {
      s.style.opacity    = i === idx ? '1' : '0';
      s.style.transform  = i === idx ? 'translateX(0)' : 'translateX(20px)';
      s.style.position   = i === idx ? 'relative' : 'absolute';
      s.style.pointerEvents = i === idx ? 'auto' : 'none';
    });
    dots.forEach((d, i) => {
      d.classList.toggle('bg-gold', i === idx);
      d.classList.toggle('bg-white/25', i !== idx);
      d.style.transform = i === idx ? 'scale(1.25)' : 'scale(1)';
    });
    current = idx;
  };

  const next = () => show((current + 1) % slides.length);

  const start = () => { timer = setInterval(next, 4500); };
  const stop  = () => clearInterval(timer);

  dots.forEach((d, i) => d.addEventListener('click', () => { show(i); stop(); start(); }));
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);

  // Init all slides with transition style
  slides.forEach(s => {
    s.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    s.style.top = '0'; s.style.left = '0'; s.style.width = '100%';
  });

  show(0);
  start();
}

// ——— 12. SKELETON LOADER (utility) ———
window.showSkeletons = function(containerId, count = 4) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = Array.from({ length: count }).map(() => `
    <div class="rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
      <div class="skeleton h-52 w-full"></div>
      <div class="p-4 space-y-3">
        <div class="skeleton h-3 w-1/3 rounded"></div>
        <div class="skeleton h-4 w-3/4 rounded"></div>
        <div class="skeleton h-3 w-1/2 rounded"></div>
        <div class="flex justify-between items-center mt-2">
          <div class="skeleton h-5 w-16 rounded"></div>
          <div class="skeleton h-8 w-24 rounded-lg"></div>
        </div>
      </div>
    </div>`).join('');
};

// ——— 13. TILT CARD EFFECT (Spotlight & Hero right composition only) ———
function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const angleX = (yc - y) / 10;
      const angleY = (x - xc) / 10;
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
  });
}

// ——— 14. MAGNETIC BUTTONS (Desktop only, max 5px) ———
function initMagneticButtons() {
  if (window.innerWidth < 768) return; // Desktop only
  const btns = document.querySelectorAll('.magnetic-btn');
  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Limit to 5px displacement
      const maxMove = 5;
      const strength = 0.15;
      const moveX = Math.max(-maxMove, Math.min(maxMove, x * strength));
      const moveY = Math.max(-maxMove, Math.min(maxMove, y * strength));
      btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// ——— 15. SPOTLIGHT CARD GLOWS ———
function initSpotlightCards() {
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// ——— 16. PAGE TRANSITIONS ———
function initPageTransitions() {
  let overlay = document.querySelector('.page-transition-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);
  }

  // Remove transition classes on load
  window.addEventListener('pageshow', () => {
    overlay.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    // Check if link is a valid internal relative page (e.g. index.html, products.html)
    if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && link.target !== '_blank') {
      const pathPart = href.split('?')[0];
      if (pathPart.endsWith('.html') || pathPart === 'index.html' || pathPart === '') {
        e.preventDefault();
        overlay.classList.add('active');
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    }
  });
}

// ——— INIT ALL ———
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initLoadingScreen();
  initScrollProgress();
  initReveal();
  initCounters();
  initBackToTop();
  initRipple();
  initMobileMenu();
  initFAQ();
  initTestimonialSlider();
  initTiltCards();
  initMagneticButtons();
  initSpotlightCards();
  initPageTransitions();
});
