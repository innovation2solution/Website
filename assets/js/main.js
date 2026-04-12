/**
 * Innovation 2 Solution — main.js
 * Fixed: burger menu toggle, scroll behaviour, dropdown, reveal animations
 * Place this file at the ROOT of the GitHub Pages repo (same level as index.html)
 * All HTML pages must reference it as: <script src="/main.js"></script>
 * (or as a relative path: <script src="main.js"></script> on root-level pages)
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
   * 1. BURGER / MOBILE NAV TOGGLE
   * ───────────────────────────────────────── */
  function initMobileNav() {
    var toggle  = document.getElementById('navToggle');
    var menu    = document.getElementById('navMenu');
    var navbar  = document.getElementById('navbar');

    if (!toggle || !menu) return; // guard — elements must exist

    /* Open / close */
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = menu.classList.contains('is-open');

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    /* Close when a nav link is tapped (SPA-friendly) */
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
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

    function openMenu() {
      menu.classList.add('is-open');
      toggle.classList.add('is-active');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // prevent scroll behind overlay
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      // Also close any open dropdowns
      document.querySelectorAll('.nav-dropdown.is-open').forEach(function (d) {
        d.classList.remove('is-open');
      });
    }
  }

  /* ─────────────────────────────────────────
   * 2. MOBILE DROPDOWN (Services sub-menu)
   * ───────────────────────────────────────── */
  function initDropdowns() {
    var dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(function (dropdown) {
      var link = dropdown.querySelector('.nav-link');
      if (!link) return;

      /* On mobile, tap the parent link to toggle sub-menu instead of navigating */
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 900) {           // match your CSS breakpoint
          e.preventDefault();
          var isOpen = dropdown.classList.contains('is-open');
          // Close siblings
          dropdowns.forEach(function (d) { d.classList.remove('is-open'); });
          if (!isOpen) dropdown.classList.add('is-open');
        }
      });
    });
  }

  /* ─────────────────────────────────────────
   * 3. STICKY NAVBAR — add shadow on scroll
   * ───────────────────────────────────────── */
  function initStickyNav() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    var onScroll = function () {
      if (window.scrollY > 20) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
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
      // Fallback for older browsers — just show everything
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
        var el     = entry.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1600;
        var start  = performance.now();

        function tick(now) {
          var elapsed = now - start;
          var progress = Math.min(elapsed / duration, 1);
          // ease-out quad
          progress = 1 - (1 - progress) * (1 - progress);
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
   * INIT — run everything on DOMContentLoaded
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
