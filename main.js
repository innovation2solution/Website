/* ============================================================
   Innovation 2 Solution — Main JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Sticky Nav ---------------------------------------- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Mobile Nav Toggle --------------------------------- */
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.classList.toggle('is-active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // Close on link click
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Active nav link ----------------------------------- */
  const path = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '');
    if (href === path || (href !== '/' && path.startsWith(href))) {
      link.classList.add('active');
    }
  });

  /* --- Stats Counter ------------------------------------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const animateCount = (el) => {
      const target   = parseFloat(el.dataset.count);
      const suffix   = el.dataset.suffix || '';
      const prefix   = el.dataset.prefix || '';
      const decimals = el.dataset.decimals || 0;
      const duration = 1800;
      const start    = performance.now();

      const step = (now) => {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const value    = eased * target;
        el.textContent = prefix + (decimals > 0 ? value.toFixed(decimals) : Math.floor(value)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !e.target.dataset.counted) {
          e.target.dataset.counted = 'true';
          animateCount(e.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  /* --- Scroll Reveal ------------------------------------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(r => revealObs.observe(r));
  }

  /* --- Contact Form -------------------------------------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;
      // Simulated send — replace with actual endpoint
      setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = 'var(--accent-2)';
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.background = '';
          form.reset();
        }, 3500);
      }, 1200);
    });
  }

  /* --- Hamburger animation ------------------------------- */
  document.querySelectorAll('.nav-toggle').forEach(t => {
    const style = document.createElement('style');
    style.textContent = `
      .nav-toggle.is-active span:nth-child(1){transform:translateY(7px) rotate(45deg)}
      .nav-toggle.is-active span:nth-child(2){opacity:0;transform:scaleX(0)}
      .nav-toggle.is-active span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
    `;
    document.head.appendChild(style);
  });

});
