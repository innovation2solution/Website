/**
 * Innovation 2 Solution — main.js  (FINAL)
 * Save to: assets/js/main.js
 *
 * Changes from previous version:
 *   1. initMobileNav: closeMenu() no longer fires on .nav-dropdown parent links.
 *      Previously every link tap including "Services" triggered closeMenu(),
 *      which immediately closed the menu before the dropdown could open.
 *   2. initDropdowns: uses class 'open' (matches CSS .nav-dropdown.open)
 *   3. initStickyNav: uses class 'scrolled' (matches CSS .navbar.scrolled)
 *   4. resize listener added — resets menu cleanly when going back to desktop
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
      menu.classList.add('open');
      toggle.classList.add('is-active');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      menu.classList.remove('open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      // also collapse any open sub-dropdown
      document.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
        d.classList.remove('open');
      });
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.classList.contains('open') ? closeMenu() : openMenu();
    });

    /* Close on nav link click — BUT skip .nav-dropdown parent links on mobile.
       Those need to stay open so the user can see and tap the sub-items.
       initDropdowns() handles those separately. */
    menu.querySelectorAll('a').forEach(function (link) {
      if (link.classList.contains('nav-link') && link.closest('.nav-dropdown')) {
        return; // skip — handled by initDropdowns
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

    /* Reset when resizing back to desktop */
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
        if (window.innerWidth <= 768) {
          e.preventDefault();
          var isOpen = dropdown.classList.contains('open');
          // Close all dropdowns first
          dropdowns.forEach(function (d) { d.classList.remove('open'); });
          // Toggle this one open/closed
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
      navbar.classList.toggle('scrolled', window.scrollY > 20);
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
            entry.target.classList.add('is-visible');
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
   * 5. COUNTER ANIMATION
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
          progress     = 1 - (1 - progress) * (1 - progress);
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
