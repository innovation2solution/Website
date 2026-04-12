/**
 * Innovation 2 Solution — Cookie Consent Module
 * ─────────────────────────────────────────────
 * GDPR / UK GDPR / ePrivacy Directive compliant
 * Features:
 *   • Bottom-bar banner on first visit
 *   • Granular preferences panel (4 categories)
 *   • Accept All / Reject All / Save Preferences
 *   • Consent stored in localStorage with timestamp
 *   • Re-open trigger: any element with [data-i2s-cookies]
 *   • Google Consent Mode v2 integration hooks
 *   • Fully matches I2S brand (CSS vars, fonts, colours)
 * ─────────────────────────────────────────────
 * INSTALLATION (GitHub Pages / static HTML):
 *   1. Copy this file to /assets/js/cookie-consent.js
 *   2. Copy cookie-consent.css to /assets/css/cookie-consent.css
 *   3. Add to every HTML page <head>:
 *        <link rel="stylesheet" href="/assets/css/cookie-consent.css"/>
 *   4. Add to every HTML page just before </body>:
 *        <script src="/assets/js/cookie-consent.js"></script>
 *   5. Add the re-open link in your footer (see cookie-footer-snippet.html)
 *   6. Tag any non-essential scripts (see examples at the bottom of this file)
 */

(function () {
  'use strict';

  /* ── Constants ─────────────────────────────────────────── */
  var STORAGE_KEY   = 'i2s_cookie_consent';
  var STORAGE_VER   = '1';                 // bump to re-prompt on policy change
  var BANNER_ID     = 'i2s-cookie-banner';
  var PANEL_ID      = 'i2s-cookie-panel';
  var OVERLAY_ID    = 'i2s-cookie-overlay';

  /* ── Category definitions ───────────────────────────────── */
  var CATEGORIES = [
    {
      id:          'necessary',
      label:       'Strictly Necessary',
      description: 'Essential cookies required for the website to function. These cannot be disabled.',
      locked:      true,
      defaultOn:   true
    },
    {
      id:          'analytics',
      label:       'Analytics & Performance',
      description: 'Help us understand how visitors interact with our website so we can improve it. Data is anonymised.',
      locked:      false,
      defaultOn:   false
    },
    {
      id:          'functional',
      label:       'Functionality',
      description: 'Remember your preferences and personalise your experience (e.g. region, language).',
      locked:      false,
      defaultOn:   false
    },
    {
      id:          'marketing',
      label:       'Marketing & Targeting',
      description: 'Used to deliver relevant advertising and track effectiveness. We do not sell your data.',
      locked:      false,
      defaultOn:   false
    }
  ];

  /* ── Helpers ────────────────────────────────────────────── */
  function getConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (obj.version !== STORAGE_VER) return null;
      return obj;
    } catch (e) { return null; }
  }

  function saveConsent(prefs) {
    var obj = {
      version:   STORAGE_VER,
      timestamp: new Date().toISOString(),
      prefs:     prefs
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)); } catch (e) {}
    return obj;
  }

  function allAccept() {
    var p = {};
    CATEGORIES.forEach(function (c) { p[c.id] = true; });
    return p;
  }

  function allReject() {
    var p = {};
    CATEGORIES.forEach(function (c) { p[c.id] = c.locked ? true : false; });
    return p;
  }

  /* ── Google Consent Mode v2 ─────────────────────────────── */
  function pushGCM(prefs) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('consent', 'update', {
      analytics_storage:    prefs.analytics  ? 'granted' : 'denied',
      ad_storage:           prefs.marketing  ? 'granted' : 'denied',
      ad_user_data:         prefs.marketing  ? 'granted' : 'denied',
      ad_personalization:   prefs.marketing  ? 'granted' : 'denied',
      functionality_storage: prefs.functional ? 'granted' : 'denied',
      personalization_storage: prefs.functional ? 'granted' : 'denied'
    });
  }

  /* Default GCM denied state — call BEFORE loading GA */
  function defaultDenyGCM() {
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = window.gtag || gtag;
    window.gtag('consent', 'default', {
      analytics_storage:    'denied',
      ad_storage:           'denied',
      ad_user_data:         'denied',
      ad_personalization:   'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      wait_for_update:      500
    });
  }

  /* ── Script activation ──────────────────────────────────── */
  function activateScripts(prefs) {
    document.querySelectorAll('script[data-i2s-consent]').forEach(function (el) {
      var cat = el.getAttribute('data-i2s-consent');
      if (prefs[cat]) {
        var s = document.createElement('script');
        // copy all attributes except type/data-i2s-consent
        Array.prototype.slice.call(el.attributes).forEach(function (attr) {
          if (attr.name !== 'type' && attr.name !== 'data-i2s-consent') {
            s.setAttribute(attr.name, attr.value);
          }
        });
        s.type = 'text/javascript';
        if (!el.src) s.textContent = el.textContent;
        el.parentNode.replaceChild(s, el);
      }
    });
  }

  /* ── Apply consent ──────────────────────────────────────── */
  function applyConsent(prefs) {
    pushGCM(prefs);
    activateScripts(prefs);
    // Dispatch custom event for any third-party integrations
    var evt;
    try {
      evt = new CustomEvent('i2s:consentUpdated', { detail: prefs });
    } catch (e) {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent('i2s:consentUpdated', true, true, prefs);
    }
    document.dispatchEvent(evt);
  }

  /* ── DOM Builders ───────────────────────────────────────── */
  function buildBanner() {
    var el = document.createElement('div');
    el.id = BANNER_ID;
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'false');
    el.setAttribute('aria-label', 'Cookie consent');
    el.innerHTML = [
      '<div class="i2s-cc-banner-inner">',
        '<div class="i2s-cc-banner-text">',
          '<span class="i2s-cc-banner-icon" aria-hidden="true">',
            '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>',
          '</span>',
          '<p>We use cookies to improve your experience and analyse how our site is used. ',
            'You can choose which cookies to accept. ',
            '<a href="/cookies.html" class="i2s-cc-link">Learn more</a>',
          '</p>',
        '</div>',
        '<div class="i2s-cc-banner-actions">',
          '<button id="i2s-cc-reject"   class="i2s-cc-btn i2s-cc-btn-ghost">Reject All</button>',
          '<button id="i2s-cc-manage"   class="i2s-cc-btn i2s-cc-btn-outline">Manage Preferences</button>',
          '<button id="i2s-cc-accept"   class="i2s-cc-btn i2s-cc-btn-primary">Accept All</button>',
        '</div>',
      '</div>'
    ].join('');
    return el;
  }

  function buildPanel() {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    overlay.setAttribute('aria-hidden', 'true');

    var panel = document.createElement('div');
    panel.id = PANEL_ID;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'Cookie preferences');

    var rows = CATEGORIES.map(function (c) {
      var lockAttr = c.locked ? ' disabled checked' : '';
      var checkedAttr = c.locked ? ' checked' : '';
      return [
        '<div class="i2s-cc-row">',
          '<div class="i2s-cc-row-text">',
            '<strong>' + c.label + (c.locked ? ' <span class="i2s-cc-required">Required</span>' : '') + '</strong>',
            '<p>' + c.description + '</p>',
          '</div>',
          '<label class="i2s-cc-toggle" aria-label="' + c.label + '">',
            '<input type="checkbox" data-cat="' + c.id + '"' + lockAttr + checkedAttr + '>',
            '<span class="i2s-cc-slider"></span>',
          '</label>',
        '</div>'
      ].join('');
    }).join('');

    panel.innerHTML = [
      '<div class="i2s-cc-panel-head">',
        '<div class="i2s-cc-panel-logo">',
          '<span>Innovation<span style="color:var(--i2s-accent)">2</span>Solution</span>',
        '</div>',
        '<button class="i2s-cc-close" id="i2s-cc-close" aria-label="Close preferences">',
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
        '</button>',
      '</div>',
      '<div class="i2s-cc-panel-body">',
        '<h2 class="i2s-cc-panel-title">Your Privacy Choices</h2>',
        '<p class="i2s-cc-panel-desc">We use cookies and similar technologies on our website. Some are essential; others help us improve your experience and support our marketing. Use the controls below to customise your preferences. You can change these at any time via the "Cookie Settings" link in our footer.</p>',
        '<div class="i2s-cc-rows">' + rows + '</div>',
      '</div>',
      '<div class="i2s-cc-panel-foot">',
        '<button id="i2s-cc-reject-all"  class="i2s-cc-btn i2s-cc-btn-ghost">Reject All</button>',
        '<div style="display:flex;gap:0.75rem;flex-wrap:wrap">',
          '<button id="i2s-cc-accept-all" class="i2s-cc-btn i2s-cc-btn-outline">Accept All</button>',
          '<button id="i2s-cc-save"       class="i2s-cc-btn i2s-cc-btn-primary">Save My Preferences</button>',
        '</div>',
      '</div>'
    ].join('');

    return { overlay: overlay, panel: panel };
  }

  /* ── Show / Hide ────────────────────────────────────────── */
  function showBanner() {
    var el = document.getElementById(BANNER_ID);
    if (el) { el.classList.add('i2s-cc-visible'); }
  }

  function hideBanner() {
    var el = document.getElementById(BANNER_ID);
    if (el) { el.classList.remove('i2s-cc-visible'); }
  }

  function showPanel() {
    var panel   = document.getElementById(PANEL_ID);
    var overlay = document.getElementById(OVERLAY_ID);
    // Populate toggles from current or default state
    var stored = getConsent();
    CATEGORIES.forEach(function (c) {
      var inp = panel.querySelector('input[data-cat="' + c.id + '"]');
      if (inp && !c.locked) {
        inp.checked = stored ? stored.prefs[c.id] : c.defaultOn;
      }
    });
    if (overlay) { overlay.classList.add('i2s-cc-visible'); overlay.setAttribute('aria-hidden', 'false'); }
    if (panel)   { panel.classList.add('i2s-cc-visible');   panel.focus(); }
    document.body.classList.add('i2s-cc-noscroll');
  }

  function hidePanel() {
    var panel   = document.getElementById(PANEL_ID);
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) { overlay.classList.remove('i2s-cc-visible'); overlay.setAttribute('aria-hidden', 'true'); }
    if (panel)   { panel.classList.remove('i2s-cc-visible'); }
    document.body.classList.remove('i2s-cc-noscroll');
  }

  /* ── Read panel toggles ─────────────────────────────────── */
  function readPanelPrefs() {
    var prefs = {};
    var panel = document.getElementById(PANEL_ID);
    CATEGORIES.forEach(function (c) {
      var inp = panel.querySelector('input[data-cat="' + c.id + '"]');
      prefs[c.id] = inp ? inp.checked : c.locked;
    });
    return prefs;
  }

  /* ── Finalise choice ────────────────────────────────────── */
  function finalise(prefs) {
    saveConsent(prefs);
    applyConsent(prefs);
    hideBanner();
    hidePanel();
  }

  /* ── Wire events ────────────────────────────────────────── */
  function wireEvents() {
    /* Banner */
    var accept  = document.getElementById('i2s-cc-accept');
    var reject  = document.getElementById('i2s-cc-reject');
    var manage  = document.getElementById('i2s-cc-manage');
    if (accept) accept.addEventListener('click', function () { finalise(allAccept()); });
    if (reject) reject.addEventListener('click', function () { finalise(allReject()); });
    if (manage) manage.addEventListener('click', showPanel);

    /* Panel */
    var save       = document.getElementById('i2s-cc-save');
    var acceptAll  = document.getElementById('i2s-cc-accept-all');
    var rejectAll  = document.getElementById('i2s-cc-reject-all');
    var close      = document.getElementById('i2s-cc-close');
    var overlay    = document.getElementById(OVERLAY_ID);

    if (save)      save.addEventListener('click', function () { finalise(readPanelPrefs()); });
    if (acceptAll) acceptAll.addEventListener('click', function () { finalise(allAccept()); });
    if (rejectAll) rejectAll.addEventListener('click', function () { finalise(allReject()); });
    if (close)     close.addEventListener('click', function () {
      hidePanel();
      // If no consent recorded yet, re-show banner
      if (!getConsent()) showBanner();
    });
    if (overlay)   overlay.addEventListener('click', function () {
      hidePanel();
      if (!getConsent()) showBanner();
    });

    /* Re-open trigger — any element with data-i2s-cookies attribute */
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-i2s-cookies]');
      if (t) {
        e.preventDefault();
        showPanel();
      }
    });

    /* Keyboard: Escape closes panel */
    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.keyCode === 27) && document.getElementById(PANEL_ID).classList.contains('i2s-cc-visible')) {
        hidePanel();
        if (!getConsent()) showBanner();
      }
    });
  }

  /* ── Init ───────────────────────────────────────────────── */
  function init() {
    defaultDenyGCM();

    // Inject elements
    var banner      = buildBanner();
    var panelParts  = buildPanel();
    document.body.appendChild(panelParts.overlay);
    document.body.appendChild(panelParts.panel);
    document.body.appendChild(banner);

    wireEvents();

    // Check existing consent
    var stored = getConsent();
    if (stored) {
      applyConsent(stored.prefs);
    } else {
      // Small delay so page renders first
      setTimeout(showBanner, 600);
    }
  }

  /* Run after DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

/* ═══════════════════════════════════════════════════════════
   SCRIPT TAGGING GUIDE
   ───────────────────────────────────────────────────────────
   Tag any non-essential <script> blocks so they only fire
   after consent. Change type to "text/plain" and add the
   data-i2s-consent attribute with the appropriate category.

   Categories:
     necessary   — always runs (no tagging needed)
     analytics   — e.g. Google Analytics, Hotjar
     functional  — e.g. language/preferences
     marketing   — e.g. Google Ads, LinkedIn Insight, Meta Pixel

   Examples:

   Google Analytics 4:
   ────────────────────
   <!-- Default consent state (add BEFORE the GA script) -->
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>

   <!-- GA4 load — blocked until analytics consent granted -->
   <script type="text/plain" data-i2s-consent="analytics"
     src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" async>
   </script>

   LinkedIn Insight Tag:
   ─────────────────────
   <script type="text/plain" data-i2s-consent="marketing">
     _linkedin_partner_id = "XXXXXXX";
     window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
     window._linkedin_data_partner_ids.push(_linkedin_partner_id);
   </script>

   Meta Pixel:
   ───────────
   <script type="text/plain" data-i2s-consent="marketing">
     !function(f,b,e,v,n,t,s)...
   </script>
   ═══════════════════════════════════════════════════════════ */
