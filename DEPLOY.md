# Innovation 2 Solution — Site Fix Deployment Guide

## What's in this package

| File | What it fixes |
|------|--------------|
| `fix-all.sh` | Master script — creates folders, moves files, patches all HTML in one run |
| `index.html` | Corrected homepage — all paths, footer links, dynamic year |
| `about.html` | Corrected about page — all paths, footer links, dynamic year |
| `contact.html` | Corrected contact page + Formspree backend wired in |
| `DEPLOY.md` | This guide |

---

## Option A — Quickest fix (recommended): Run the shell script

### Prerequisites
- Git installed on your machine
- Access to push to the `innovation2solution/Website` repo

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/innovation2solution/Website.git
cd Website

# 2. Copy fix-all.sh into the repo root, then run it
bash fix-all.sh

# 3. Review what changed
git status
git diff --stat

# 4. Commit and push
git add -A
git commit -m "Fix: CSS/JS asset paths, service subpages, footer links, dynamic year"
git push origin main
```

GitHub Pages rebuilds automatically — allow ~60 seconds, then hard-refresh the site.

---

## Option B — Manual fixes (if you prefer to edit in GitHub's web UI)

### Fix 1 — CSS not loading (site unstyled)

In every `.html` file, find:
```html
<link rel="stylesheet" href="/assets/css/styles.css"/>
```

**Option B1:** Upload `styles.css` to the path `assets/css/styles.css` in the repo.
**Option B2:** Change every link tag to `href="/styles.css"` (the file already exists at root).

---

### Fix 2 — JS not loading (nav, animations, counters broken)

In every `.html` file, find:
```html
<script src="/assets/js/main.js"></script>
```

**Option B1:** Upload `main.js` + `nav.js` to `assets/js/` (merge nav.js into main.js first).
**Option B2:** Change every script tag to `src="/main.js"` and add a second `src="/nav.js"`.

---

### Fix 3 — Service pages returning 404

**The issue:** Nav and footer links point to `/services/ai-automation.html` etc., but files are in the root.

**Option B1 (create the subfolder — keeps URLs clean):**
1. In GitHub, go to "Add file" → "Create new file"
2. Type: `services/ai-automation.html` — GitHub creates the folder automatically
3. Copy the content of `ai-automation.html` into it
4. Repeat for: `digital-transformation.html`, `app-development.html`, `data-analytics.html`, `it-consultancy.html`

**Option B2 (update links instead):**
In every HTML file, find & replace:
- `/services/ai-automation.html` → `/ai-automation.html`
- `/services/digital-transformation.html` → `/digital-transformation.html`
- `/services/app-development.html` → `/app-development.html`
- `/services/data-analytics.html` → `/data-analytics.html`
- `/services/it-consultancy.html` → `/it-consultancy.html`

---

### Fix 4 — Footer legal links broken (GDPR risk)

In every `.html` file footer, find and replace:
```html
<a href="#">Privacy Policy</a>   →  <a href="/privacy.html">Privacy Policy</a>
<a href="#">Privacy</a>          →  <a href="/privacy.html">Privacy</a>
<a href="#">Terms of Use</a>     →  <a href="/terms.html">Terms of Use</a>
<a href="#">Terms</a>            →  <a href="/terms.html">Terms</a>
<a href="#">Cookie Policy</a>    →  <a href="/cookies.html">Cookie Policy</a>
```
The pages `privacy.html`, `terms.html`, `cookies.html` already exist in the repo.

---

### Fix 5 — Social links broken

In every `.html` file footer, find:
```html
<a href="#" class="social-link" aria-label="LinkedIn">
<a href="#" class="social-link" aria-label="Twitter / X">
```

Replace with your actual profile URLs:
```html
<a href="https://www.linkedin.com/company/innovation2solution" class="social-link" 
   aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
<a href="https://twitter.com/innovation2sol" class="social-link" 
   aria-label="Twitter / X" target="_blank" rel="noopener noreferrer">
```

---

### Fix 6 — Dynamic copyright year

In every `.html` file footer, find:
```html
<p>© 2025 Innovation 2 Solution Limited...</p>
```

Replace with:
```html
<p>© <span id="i2s-yr"></span> Innovation 2 Solution Limited...</p>
```

And before `</body>` add:
```html
<script>document.getElementById('i2s-yr').textContent = new Date().getFullYear();</script>
```

---

## Fix 7 — Contact form (currently does nothing)

1. Go to **https://formspree.io** — create a free account
2. Create a new form, set the destination email to `enquiries@innovation2solution.com`
3. Copy your form ID (e.g. `xyzabcde`)
4. In `contact.html`, find `YOUR_FORM_ID` and replace it with your actual ID:
   ```html
   <form action="https://formspree.io/f/xyzabcde" method="POST">
   ```
5. The provided `contact.html` already has AJAX submission, success/error states, and spam prevention built in.

**Free tier:** 50 submissions/month — plenty for initial traffic. Upgrade at $10/month for unlimited.

---

## Fix 8 — OG/Social share image missing

Create a `1200 × 630px` branded image and upload it to:
```
assets/images/og-home.png
```

All OG/Twitter meta tags already reference this path — no code changes needed.

Tools to create the image:
- **Canva** (free) — use a "LinkedIn Banner" template at 1200×627px
- **Figma** — create frame at 1200×630px, export as PNG

Include: I2S logo, tagline "Digital Transformation & AI Consultancy | UK", brand colours.

---

## Fix 9 — Logo filename (spaces cause issues on some servers)

```bash
# Rename the logo file
git mv "Copy of i2s_logo copy.png" "assets/images/i2s-logo.png"
```

Then optionally add it to the nav:
```html
<a href="/" class="nav-logo" aria-label="Innovation 2 Solution Home">
  <img src="/assets/images/i2s-logo.png" alt="Innovation 2 Solution" height="40">
</a>
```

---

## Post-fix checklist

- [ ] Site loads with styles (not plain HTML)
- [ ] Mobile nav toggle works
- [ ] Hero counter animations work (15+, 50+, etc.)
- [ ] All service pages load without 404
- [ ] Contact form submits and confirmation shows
- [ ] Privacy, Terms, Cookie pages accessible from footer
- [ ] Social links open correct profiles
- [ ] LinkedIn share shows branded image (test: https://www.linkedin.com/post-inspector/)
- [ ] Submit sitemap to Google Search Console
- [ ] Test on mobile (iOS Safari + Android Chrome)

---

## Ongoing improvements (next steps)

1. **Write the 3 insights articles** — the blog section on the homepage references them but they don't exist yet. This is valuable SEO content.
2. **Add a cookie consent banner** — required for GDPR compliance (UK/EU visitors). Consider `cookieconsent.js` (free, lightweight).
3. **Set up Google Analytics 4** — add GA4 measurement ID to all pages for traffic tracking.
4. **Submit sitemap** — https://www.innovation2solution.com/sitemap.xml → Google Search Console → Sitemaps
5. **Add favicon** — currently no favicon. Create one from the logo and add to all `<head>` sections.
