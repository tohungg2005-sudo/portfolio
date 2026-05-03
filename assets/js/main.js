/* ============================================================
   PORTFOLIO — main.js
   Mouse tracking | Particles | GSAP Animations | Typed text
   ============================================================ */

/* ============================================================
   0. i18n — LANGUAGE SWITCHER
   ============================================================ */
let currentLang = localStorage.getItem('lang') || 'vi';

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  // textContent
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // innerHTML (strong, em...)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // html lang
  document.documentElement.lang = lang;

  // typed phrases
  if (lang === 'en') {
    phraseList = [
      '3rd-Year Logistics & Supply Chain Student',
      'Basketball Coach',
      'AI & Technology Enthusiast',
      'Eager • Enthusiastic • Agile',
      'Problem Solver',
    ];
  } else {
    phraseList = [
      'Sinh viên năm 3 — Logistics & Supply Chain',
      'Basketball Coach',
      'Yêu thích công nghệ & AI',
      'Ham học hỏi • Nhiệt tình • Nhanh nhẹn',
      'Problem Solver',
    ];
  }

  // toggle UI
  document.querySelector('.lang-vi').classList.toggle('active', lang === 'vi');
  document.querySelector('.lang-en').classList.toggle('active', lang === 'en');

  localStorage.setItem('lang', lang);
  currentLang = lang;
}

/* ============================================================
   1. GSAP SETUP
   ============================================================ */
gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   2. CUSTOM CURSOR
   ============================================================ */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1 });
});

// Smooth follower
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  gsap.set(follower, { x: followerX, y: followerY });
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effects
const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, .card-3d');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('expanded');
    follower.classList.add('expanded');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('expanded');
    follower.classList.remove('expanded');
  });
});

/* ============================================================
   3. NAVBAR SCROLL
   ============================================================ */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled style
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* ============================================================
   4. HAMBURGER MENU
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinksEl.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close menu on link click
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ============================================================
   5. HERO TYPED TEXT
   ============================================================ */
const typedEl = document.getElementById('typedText');
let phraseList = [
  'Sinh viên năm 3 — Logistics & Supply Chain',
  'Basketball Coach',
  'Yêu thích công nghệ & AI',
  'Ham học hỏi • Nhiệt tình • Nhanh nhẹn',
  'Problem Solver',
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
  const currentPhrase = phraseList[phraseIdx];

  if (isDeleting) {
    typedEl.textContent = currentPhrase.substring(0, charIdx - 1);
    charIdx--;
    typingSpeed = 40;
  } else {
    typedEl.textContent = currentPhrase.substring(0, charIdx + 1);
    charIdx++;
    typingSpeed = 80;
  }

  if (!isDeleting && charIdx === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 1800; // pause
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phraseList.length;
    typingSpeed = 400;
  }

  setTimeout(typeEffect, typingSpeed);
}

setTimeout(typeEffect, 1500);

/* ============================================================
   6. PARTICLE CANVAS
   ============================================================ */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 70;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '108,99,255' : '0,212,255';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

// Draw connections between nearby particles + mouse
let mx = -999, my = -999;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function drawConnections() {
  particles.forEach((p, i) => {
    // Particle to particle
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dist = Math.hypot(p.x - q.x, p.y - q.y);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(108,99,255,${0.12 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
    // Particle to mouse
    const distM = Math.hypot(p.x - mx, p.y - my);
    if (distM < 150) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(mx, my);
      ctx.strokeStyle = `rgba(108,99,255,${0.25 * (1 - distM / 150)})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ============================================================
   7. 3D CARD MOUSE TILT (About section)
   ============================================================ */
const card3d = document.getElementById('card3d');
if (card3d) {
  card3d.addEventListener('mousemove', e => {
    const rect = card3d.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rotateX = ((e.clientY - cy) / rect.height) * -20;
    const rotateY = ((e.clientX - cx) / rect.width) * 20;
    gsap.to(card3d.querySelector('.card-inner'), {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out',
    });
  });

  card3d.addEventListener('mouseleave', () => {
    gsap.to(card3d.querySelector('.card-inner'), {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
  });
}

/* ============================================================
   8. PROJECT CARDS TILT
   ============================================================ */
document.querySelectorAll('.project-card[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rotateX = ((e.clientY - cy) / rect.height) * -8;
    const rotateY = ((e.clientX - cx) / rect.width) * 8;
    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 800,
      duration: 0.3,
      ease: 'power2.out',
    });

    // Spotlight glow
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.querySelector('.project-card-bg').style.background =
      `radial-gradient(circle at ${x}% ${y}%, rgba(108,99,255,0.12), rgba(255,255,255,0.04) 60%)`;
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
    card.querySelector('.project-card-bg').style.background = '';
  });
});

/* ============================================================
   9. GSAP SCROLL ANIMATIONS
   ============================================================ */

// Hero content
gsap.timeline({ delay: 0.3 })
  .to('.hero-tag',      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
  .to('.hero-title .line', {
    opacity: 1, y: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
  }, '-=0.3')
  .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
  .to('.hero-cta',      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3');

// Section headers
gsap.utils.toArray('.section-header').forEach(header => {
  gsap.from(header, {
    scrollTrigger: { trigger: header, start: 'top 85%' },
    opacity: 0, y: 40,
    duration: 0.8, ease: 'power3.out',
  });
});

// Skill cards
gsap.utils.toArray('.skill-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 88%' },
    opacity: 0, y: 50,
    duration: 0.7,
    delay: i * 0.1,
    ease: 'power3.out',
  });
});

// Timeline items
const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.timeline-item').forEach(el => timelineObserver.observe(el));

// Achieve cards
const achieveObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      achieveObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.achieve-card').forEach(el => achieveObserver.observe(el));

// About text paragraphs
gsap.utils.toArray('.about-intro, .about-body, .about-stats, .about-links').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 90%' },
    opacity: 0, x: 30,
    duration: 0.7,
    delay: i * 0.1,
    ease: 'power3.out',
  });
});

// Work Style cards
gsap.utils.toArray('.ws-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 90%' },
    opacity: 0, y: 50, scale: 0.95,
    duration: 0.6,
    delay: i * 0.08,
    ease: 'power3.out',
  });
});

// Work Style quote
gsap.from('.ws-quote', {
  scrollTrigger: { trigger: '.ws-quote', start: 'top 90%' },
  opacity: 0, y: 30,
  duration: 0.8, ease: 'power3.out',
});

// Contact items
gsap.utils.toArray('.contact-item').forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: { trigger: item, start: 'top 90%' },
    opacity: 0, x: -30,
    duration: 0.6,
    delay: i * 0.1,
    ease: 'power3.out',
  });
});

// Contact form
gsap.from('.contact-form', {
  scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
  opacity: 0, y: 40,
  duration: 0.8, ease: 'power3.out',
});

/* ============================================================
   10. COUNTER ANIMATION (About stats)
   ============================================================ */
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 35);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

/* ============================================================
   11. CONTACT FORM — EmailJS
   Cần điền 3 giá trị bên dưới sau khi tạo tài khoản EmailJS:
   https://www.emailjs.com/
   ============================================================ */
const EMAILJS_PUBLIC_KEY  = 'C6WRShpQ0LuH1YmTJ';
const EMAILJS_SERVICE_ID  = 'service_9u1df1a';
const EMAILJS_TEMPLATE_ID = 'template_f1qwdp5';

emailjs.init(EMAILJS_PUBLIC_KEY);

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    // Validate
    const name    = contactForm.querySelector('#name').value.trim();
    const email   = contactForm.querySelector('#email').value.trim();
    const message = contactForm.querySelector('#message').value.trim();
    if (!name || !email || !message) return;

    btn.innerHTML = '<span>Đang gửi...</span><i class="fa-solid fa-spinner fa-spin"></i>';
    btn.disabled = true;

    const templateParams = {
      from_name:    name,
      from_email:   email,
      subject:      contactForm.querySelector('#subject').value || 'Không có chủ đề',
      message:      message,
      to_email:     'hungtq.working@gmail.com',
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        btn.innerHTML = '<span>Gửi thành công!</span><i class="fa-solid fa-check"></i>';
        btn.style.background = 'linear-gradient(135deg, #00d4ff, #6c63ff)';
        contactForm.reset();
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      })
      .catch(err => {
        console.error('EmailJS error:', err);
        btn.innerHTML = '<span>Gửi thất bại, thử lại!</span><i class="fa-solid fa-xmark"></i>';
        btn.style.background = 'linear-gradient(135deg, #ff6584, #ff4444)';
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      });
  });
}

/* ============================================================
   12. FEEDBACK SECTION
   ============================================================ */
(function () {
  const STORAGE_KEY = 'portfolio_feedbacks';

  // Load từ localStorage
  function loadFeedbacks() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }

  function saveFeedbacks(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  // Render sao hiển thị
  function renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += `<i class="fa-solid fa-star${i > rating ? ' empty' : ''}"></i>`;
    }
    return html;
  }

  // Tạo card feedback
  function createCard(fb) {
    const initials = fb.name.trim().split(' ').map(w => w[0]).slice(-2).join('').toUpperCase();
    const date = new Date(fb.timestamp).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const card = document.createElement('div');
    card.className = 'fb-card';
    card.innerHTML = `
      <div class="fb-card-header">
        <div class="fb-card-author">
          <div class="fb-avatar">${initials}</div>
          <div>
            <div class="fb-name">${escHtml(fb.name)}</div>
            ${fb.role ? `<div class="fb-role">${escHtml(fb.role)}</div>` : ''}
          </div>
        </div>
        <div class="fb-stars">${renderStars(fb.rating)}</div>
      </div>
      <p class="fb-comment">${escHtml(fb.comment)}</p>
      <div class="fb-date">${date}</div>
    `;
    return card;
  }

  function escHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // Render toàn bộ danh sách
  function renderAll() {
    const list = loadFeedbacks();
    const container = document.getElementById('feedbackList');
    const empty = document.getElementById('feedbackEmpty');
    if (!container) return;

    // Xóa các card cũ (giữ lại empty placeholder)
    container.querySelectorAll('.fb-card').forEach(c => c.remove());

    if (list.length === 0) {
      if (empty) empty.style.display = 'flex';
    } else {
      if (empty) empty.style.display = 'none';
      list.slice().reverse().forEach(fb => {
        container.prepend(createCard(fb));
      });
    }
  }

  // Star rating input
  let selectedRating = 0;
  const stars = document.querySelectorAll('#starRating .star');
  const ratingInput = document.getElementById('fbRating');

  stars.forEach(star => {
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.dataset.value);
      stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.value) <= val));
    });
    star.addEventListener('mouseleave', () => {
      stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.value) <= selectedRating));
    });
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.dataset.value);
      if (ratingInput) ratingInput.value = selectedRating;
      stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.value) <= selectedRating));
    });
  });

  // Submit feedback
  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', e => {
      e.preventDefault();
      const name    = document.getElementById('fbName').value.trim();
      const role    = document.getElementById('fbRole').value.trim();
      const comment = document.getElementById('fbComment').value.trim();
      const rating  = parseInt(document.getElementById('fbRating').value);

      if (!name || !comment || rating < 1) {
        if (rating < 1) {
          document.getElementById('starRating').style.outline = '2px solid var(--accent-3)';
          document.getElementById('starRating').style.borderRadius = '4px';
          setTimeout(() => { document.getElementById('starRating').style.outline = ''; }, 2000);
        }
        return;
      }

      const list = loadFeedbacks();
      list.push({ name, role, comment, rating, timestamp: Date.now() });
      saveFeedbacks(list);

      renderAll();
      feedbackForm.reset();
      selectedRating = 0;
      if (ratingInput) ratingInput.value = 0;
      stars.forEach(s => s.classList.remove('active'));

      // Flash success
      const btn = feedbackForm.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<span>Đã gửi!</span><i class="fa-solid fa-check"></i>';
      btn.style.background = 'linear-gradient(135deg, #00d4ff, #6c63ff)';
      btn.disabled = true;
      setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; }, 2500);
    });
  }

  // Init
  renderAll();
})();

/* ============================================================
   13. SMOOTH SCROLL for anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   13. PAGE LOADER + i18n INIT
   ============================================================ */
window.addEventListener('load', () => {
  // Apply language on load
  applyTranslations(currentLang);

  // Lang toggle button listener
  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const next = currentLang === 'vi' ? 'en' : 'vi';
      // Fade out → switch → fade in
      document.body.style.transition = 'opacity 0.15s ease';
      document.body.style.opacity = '0.6';
      setTimeout(() => {
        applyTranslations(next);
        document.body.style.opacity = '1';
        setTimeout(() => { document.body.style.transition = ''; }, 200);
      }, 150);
    });
  }

  // Page fade-in
  document.body.style.opacity = '0';
  gsap.to(document.body, { opacity: 1, duration: 0.6, ease: 'power2.out' });
});
