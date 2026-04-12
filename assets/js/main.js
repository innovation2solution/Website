/**
 * Innovation 2 Solution — main.js  (FIXED v3)
 * Save to: assets/js/main.js
 *
 * KEY FIX: All class names now aligned with styles.css:
 *   Menu open state   → 'open'       (CSS line 1323: .nav-menu.open)
 *   Dropdown open     → 'open'       (CSS: .nav-dropdown.open)
 *   Burger active     → 'is-active'  (CSS: .nav-toggle.is-active)
 *   Navbar scrolled   → 'scrolled'   (CSS line 236: .navbar.scrolled)
 *   Reveal visible    → 'is-visible' (CSS line 1535: .reveal.is-visible)
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
   * 1. BURGER / MOBILE NAV TOGGLE
   * ───────────────────────────────────────── */
  function initMobileNav() {
    var toggle = document.getElementById('navToggle');
    var menu   = document.getElementById('navMenu');
    var navbar = document.getElementById('navbar');

    if (!toggle || !menu) return;

    function openMenu() {
      menu.classList.add('open');           // matches .nav-menu.open in CSS
      toggle.classList.add('is-active');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      menu.classList.remove('open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      // Close any open sub-dropdowns
      document.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
        d.classList.remove('open');
      });
    }

    /* Burger button click */
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.classList.contains('open') ? closeMenu() : openMenu();
    });

    /* Close when a non-dropdown nav link is tapped.
       IMPORTANT: skip the Services parent .nav-link — that's handled by
       initDropdowns() so we must NOT close the whole menu when it's tapped. */
    menu.querySelectorAll('a').forEach(function (link) {
      if (link.classList.contains('nav-link') && link.closest('.nav-dropdown')) {
        return; // skip dropdown parent links
      }
      link.addEventListener('click', closeMenu);
    });

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (navbar && !navbar.contains(e.target)) {
        closeMenu();
      }
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    /* Reset on resize to desktop */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  /* ─────────────────────────────────────────
   * 2. MOBILE DROPDOWN (Services sub-menu)
   * ───────────────────────────────────────── */
  function initDropdowns() {
    var dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(function (dropdown) {
      var link = dropdown.querySelector('.nav-link');
      if (!link) return;

      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {       // matches CSS breakpoint exactly
          e.preventDefault();
          var isOpen = dropdown.classList.contains('open');
          // Close all dropdowns first
          dropdowns.forEach(function (d) { d.classList.remove('open'); });
          // Toggle this one
          if (!isOpen) dropdown.classList.add('open');
        }
      });
    });
  }

  /* ─────────────────────────────────────────
   * 3. STICKY NAVBAR
   * ───────────────────────────────────────── */
  function initStickyNav() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    var onScroll = function () {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');    // matches .navbar.scrolled in CSS
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─────────────────────────────────────────
   * 4. SCROLL-REVEAL ANIMATIONS
   * ───────────────────────────────────────── */
  function initReveal() {
    var targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible'); // matches .reveal.is-visible in CSS
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      targets.forEach(function (el) { observer.observe(el); });
    } else {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  /* ─────────────────────────────────────────
   * 5. COUNTER ANIMATION (hero stats)
   * ───────────────────────────────────────── */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el       = entry.target;
        var target   = parseInt(el.getAttribute('data-count'), 10);
        var suffix   = el.getAttribute('data-suffix') || '';
        var duration = 1600;
        var start    = performance.now();

        function tick(now) {
          var elapsed  = now - start;
          var progress = Math.min(elapsed / duration, 1);
          progress = 1 - (1 - progress) * (1 - progress); // ease-out quad
          el.textContent = Math.round(progress * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ─────────────────────────────────────────
   * 6. FOOTER YEAR
   * ───────────────────────────────────────── */
  function initFooterYear() {
    var el = document.getElementById('i2s-yr');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ─────────────────────────────────────────
   * 7. SMOOTH ANCHOR SCROLL
   * ───────────────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ─────────────────────────────────────────
   * INIT
   * ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initDropdowns();
    initStickyNav();
    initReveal();
    initCounters();
    initFooterYear();
    initSmoothScroll();
  });

})();
