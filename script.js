// ===== SCROLL TO TOP BUTTON =====
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  topBtn.classList.toggle('on', window.scrollY > 400);
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); }),
  { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== NAVBAR HIDE/SHOW ON SCROLL =====
let lastScroll = 0;
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > lastScroll && current > 80) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastScroll = current;
});
nav.style.transition = 'transform 0.3s ease';

// ===== SMOOTH ACTIVE NAV LINKS =====
const sections = document.querySelectorAll('section[id], div[id="home"]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--violet-light)';
    }
  });
});

// ===== ANIMATE PROGRESS BARS ON SCROLL =====
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.pbar-fill');
      fills.forEach(fill => {
        const w = fill.style.width;
        fill.style.width = '0';
        setTimeout(() => { fill.style.width = w; }, 100);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
const profCard = document.querySelector('.prof-card');
if (profCard) barObserver.observe(profCard);

// ===== TYPING EFFECT FOR HERO ROLE =====
const roleEl = document.querySelector('.hero-role');
if (roleEl) {
  const roles = [
    '<b>Full Stack Developer</b> &nbsp;·&nbsp; MERN Stack &nbsp;·&nbsp; DTU \'26',
    '<b>React.js Developer</b> &nbsp;·&nbsp; Node.js &nbsp;·&nbsp; MongoDB',
    '<b>Problem Solver</b> &nbsp;·&nbsp; LeetCode 100+ &nbsp;·&nbsp; GFG AIR 1,873'
  ];
  let i = 0;
  setInterval(() => {
    roleEl.style.opacity = '0';
    setTimeout(() => {
      i = (i + 1) % roles.length;
      roleEl.innerHTML = roles[i];
      roleEl.style.opacity = '1';
    }, 400);
  }, 3000);
  roleEl.style.transition = 'opacity 0.4s ease';
}

// ===== COUNTER ANIMATION FOR STATS =====
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.stat-num').forEach(el => {
      const text = el.textContent.trim();
      const num = parseInt(text.replace(/\D/g, ''));
      if (!num) return;
      const prefix = text.match(/^[^\d]*/)?.[0] || '';
      const suffix = text.match(/[^\d]*$/)?.[0] || '';
      let start = 0;
      const step = Math.ceil(num / 40);
      const timer = setInterval(() => {
        start = Math.min(start + step, num);
        el.textContent = prefix + start + suffix;
        if (start >= num) clearInterval(timer);
      }, 30);
    });
    countObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.stats');
if (statsEl) countObserver.observe(statsEl);
