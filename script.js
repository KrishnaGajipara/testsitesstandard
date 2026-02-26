/* ══════════════════════════════════════════
   THE STANDARD BUILD — script.js
══════════════════════════════════════════ */

// ─── Custom Cursor ───
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smoothly lag the ring
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .service-card, .feature-card, .pricing-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('expand');
    cursorRing.classList.add('expand');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('expand');
    cursorRing.classList.remove('expand');
  });
});

// ─── Mobile Nav Toggle ───
const toggle   = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

// ─── Scroll Reveal ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children if container has data-stagger
      if (entry.target.dataset.stagger) {
        const children = entry.target.querySelectorAll('.reveal');
        children.forEach((child, idx) => {
          setTimeout(() => {
            child.classList.add('visible');
          }, idx * 80);
        });
      } else {
        entry.target.classList.add('visible');
      }
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

// Observe stagger containers
document.querySelectorAll('[data-stagger]').forEach(el => {
  revealObserver.observe(el);
});

// Observe individual reveal elements not inside stagger containers
document.querySelectorAll('.reveal:not([data-stagger] .reveal)').forEach(el => {
  revealObserver.observe(el);
});

// ─── Active Nav Link ───
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});
