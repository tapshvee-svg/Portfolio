/**
 * interactions.js
 * Premium micro-interactions: scroll reveal, stagger, ripple, floating.
 * All GPU-accelerated. Respects prefers-reduced-motion.
 */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ================================================================
     1. SCROLL REVEAL  (IntersectionObserver)
  ================================================================ */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger, hr.divider');

  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => io.observe(el));
  }

  /* ================================================================
     2. RIPPLE EFFECT on buttons
  ================================================================ */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const r = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      const x = e.clientX - r.left - size / 2;
      const y = e.clientY - r.top  - size / 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.cssText = `
        width:${size}px; height:${size}px;
        left:${x}px; top:${y}px;
      `;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  /* ================================================================
     3. SUBTLE BACKGROUND PARALLAX
  ================================================================ */
  if (!reduced) {
    const canvas = document.getElementById('wireframe-bg');
    if (canvas) {
      let lastScrollY = window.scrollY;
      window.addEventListener('scroll', () => {
        const sy = window.scrollY;
        // Very subtle: max ±15px vertical shift at slow scroll
        const oy = (sy * 0.04).toFixed(2);
        canvas.style.transform = `translate3d(0, ${oy}px, 0)`;
        lastScrollY = sy;
      }, { passive: true });
    }
  }

  /* ================================================================
     4. SECTION H2 HEADING REVEAL (separate from .reveal so it's
        precise and doesn't conflict with existing slide-up)
  ================================================================ */
  const headings = document.querySelectorAll('section h2');
  if (headings.length) {
    headings.forEach(h => {
      h.style.opacity   = '0';
      h.style.transform = 'translate3d(0, 14px, 0)';
      h.style.transition = 'opacity 0.55s cubic-bezier(0.25,1,0.5,1), transform 0.55s cubic-bezier(0.25,1,0.5,1)';
    });

    const hio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translate3d(0, 0, 0)';
          hio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    headings.forEach(h => hio.observe(h));
  }

  /* ================================================================
     5. VIDEO CARDS — stagger into view
  ================================================================ */
  const videoCards = document.querySelectorAll('.video-card');
  if (videoCards.length) {
    videoCards.forEach((card, i) => {
      card.style.opacity   = '0';
      card.style.transform = 'translate3d(0, 24px, 0)';
      card.style.transition = `opacity 0.6s cubic-bezier(0.25,1,0.5,1) ${i * 0.09}s,
                               transform 0.6s cubic-bezier(0.25,1,0.5,1) ${i * 0.09}s`;
    });

    const vio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translate3d(0, 0, 0)';
          vio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    videoCards.forEach(card => vio.observe(card));
  }

  /* ================================================================
     6. TESTIMONIAL CARDS stagger
  ================================================================ */
  const tCards = document.querySelectorAll('.testimonial-card');
  if (tCards.length) {
    tCards.forEach((card, i) => {
      card.style.opacity   = '0';
      card.style.transform = 'translate3d(0, 18px, 0)';
      card.style.transition = `opacity 0.55s cubic-bezier(0.25,1,0.5,1) ${i * 0.10}s,
                               transform 0.55s cubic-bezier(0.25,1,0.5,1) ${i * 0.10}s,
                               box-shadow 0.35s cubic-bezier(0.25,1,0.5,1)`;
    });

    const tio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translate3d(0, 0, 0)';
          tio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    tCards.forEach(c => tio.observe(c));
  }

  /* ================================================================
     7. SERVICE LIST ITEMS stagger reveal
  ================================================================ */
  const svcItems = document.querySelectorAll('.service-list li');
  if (svcItems.length) {
    svcItems.forEach((li, i) => {
      li.style.opacity   = '0';
      li.style.transform = 'translate3d(-10px, 0, 0)';
      li.style.transition = `opacity 0.5s cubic-bezier(0.25,1,0.5,1) ${i * 0.08}s,
                             transform 0.5s cubic-bezier(0.25,1,0.5,1) ${i * 0.08}s,
                             padding-left 0.28s cubic-bezier(0.25,1,0.5,1)`;
    });

    const sio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translate3d(0, 0, 0)';
          sio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    svcItems.forEach(li => sio.observe(li));
  }

})();
