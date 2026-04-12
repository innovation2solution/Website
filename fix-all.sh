#!/usr/bin/env bash
# ============================================================
#  Innovation 2 Solution — Site Fix Script
#  Run this from the ROOT of the cloned Website repo:
#    git clone https://github.com/innovation2solution/Website
#    cd Website
#    bash fix-all.sh
#  Then: git add -A && git commit -m "Fix asset paths and broken links" && git push
# ============================================================

set -e
echo "=== I2S Site Fix Script ==="

# ------------------------------------------------------------
# 1. CREATE FOLDER STRUCTURE
# ------------------------------------------------------------
echo "[1/5] Creating asset folders..."
mkdir -p assets/css
mkdir -p assets/js
mkdir -p assets/images
mkdir -p services

# ------------------------------------------------------------
# 2. MOVE CSS + JS INTO assets/ SUBFOLDERS
# ------------------------------------------------------------
echo "[2/5] Moving CSS and JS files..."

if [ -f "styles.css" ]; then
  cp styles.css assets/css/styles.css
  echo "  ✓ styles.css → assets/css/styles.css"
else
  echo "  ⚠ styles.css not found in root — check filename"
fi

if [ -f "main.js" ]; then
  cp main.js assets/js/main.js
  echo "  ✓ main.js → assets/js/main.js"
fi

if [ -f "nav.js" ]; then
  # Append nav.js into main.js so there's only one script reference needed
  echo "" >> assets/js/main.js
  cat nav.js >> assets/js/main.js
  echo "  ✓ nav.js merged into assets/js/main.js"
fi

# ------------------------------------------------------------
# 3. MOVE SERVICE PAGES INTO services/ SUBFOLDER
# ------------------------------------------------------------
echo "[3/5] Moving service pages into services/ folder..."

for page in ai-automation digital-transformation app-development data-analytics it-consultancy; do
  if [ -f "${page}.html" ]; then
    cp "${page}.html" "services/${page}.html"
    echo "  ✓ ${page}.html → services/${page}.html"
  else
    echo "  ⚠ ${page}.html not found — skipping"
  fi
done

# ------------------------------------------------------------
# 4. FIX ASSET PATHS IN ALL HTML FILES
#    (CSS link, JS script src, footer links, copyright year)
# ------------------------------------------------------------
echo "[4/5] Patching asset paths in all HTML files..."

# Detect sed variant (macOS needs '' after -i)
if sed --version 2>/dev/null | grep -q GNU; then
  SED="sed -i"
else
  SED="sed -i ''"
fi

for f in *.html services/*.html; do
  [ -f "$f" ] || continue

  # Fix CSS path (already correct if pointing to /assets/css/styles.css)
  # Fix JS path (already correct if pointing to /assets/js/main.js)
  # These are already correct — the folders now exist after step 2

  # Fix footer Privacy/Terms/Cookie placeholder hrefs
  $SED 's|href="#" [^>]*>Privacy Policy|href="/privacy.html">Privacy Policy|g' "$f"
  $SED 's|href="#">Privacy Policy|href="/privacy.html">Privacy Policy|g' "$f"
  $SED 's|href="#">Privacy<|href="/privacy.html">Privacy<|g' "$f"
  $SED 's|href="#">Terms of Use|href="/terms.html">Terms of Use|g' "$f"
  $SED 's|href="#">Terms<|href="/terms.html">Terms<|g' "$f"
  $SED 's|href="#">Cookie Policy|href="/cookies.html">Cookie Policy|g' "$f"

  # Fix copyright year — replace hardcoded 2025 with JS dynamic year
  $SED 's|&copy; 2025 Innovation|<span id="i2s-yr"></span> Innovation|g' "$f"

  echo "  ✓ patched: $f"
done

# ------------------------------------------------------------
# 5. FIX LOGO FILENAME (remove spaces)
# ------------------------------------------------------------
echo "[5/5] Renaming logo asset..."

if [ -f "Copy of i2s_logo copy.png" ]; then
  cp "Copy of i2s_logo copy.png" "assets/images/i2s-logo.png"
  echo "  ✓ Logo copied to assets/images/i2s-logo.png"
fi

if [ -f "simon-bell.jpg" ]; then
  cp "simon-bell.jpg" "assets/images/simon-bell.jpg"
  echo "  ✓ simon-bell.jpg copied to assets/images/"
fi

# ------------------------------------------------------------
# DONE
# ------------------------------------------------------------
echo ""
echo "=== All fixes applied ==="
echo ""
echo "NEXT STEPS:"
echo "  1. Add a real OG image:  assets/images/og-home.png  (1200x630px)"
echo "  2. Set up form backend:  see contact-form-setup.md"
echo "  3. Update social links:  search href=\"#\" class=\"social-link\" in index.html"
echo "  4. Commit and push:"
echo "       git add -A"
echo '       git commit -m "Fix: asset paths, service subfolder, footer links"'
echo "       git push"
echo ""
echo "  GitHub Pages rebuild takes ~60 seconds after push."
