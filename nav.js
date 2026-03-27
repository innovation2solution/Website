(function() {
    // 1. ANALYTICS
    const GA_ID = 'G-CPJ8XCB3KE';
    if (!window.gtag) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(script);
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', GA_ID);
    }

    // 2. HEADER INJECTION
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navHTML = `
    <nav class="main-nav">
        <a href="index.html" class="nav-logo">
            <img src="Copy of i2s_logo copy.png" alt="I2S Logo">
            <span>Innovation<small style="color:#38bdf8">2</small>Solution</span>
        </a>
        <div class="mobile-toggle" id="mobile-toggle">
            <span></span><span></span><span></span>
        </div>
        <div class="nav-links" id="nav-links">
            <a href="index.html" class="${currentPath === 'index.html' ? 'nav-active' : ''}">Home</a>
            <a href="services.html" class="${currentPath === 'services.html' ? 'nav-active' : ''}">Services</a>
            <a href="approach.html" class="${currentPath === 'approach.html' ? 'nav-active' : ''}">Approach</a>
            <a href="about.html" class="${currentPath === 'about.html' ? 'nav-active' : ''}">About</a>
            <a href="contact.html" class="nav-cta">Book Audit</a>
        </div>
        <a href="contact.html" class="nav-cta">Book Audit</a>
    </nav>`;

    // 3. FOOTER INJECTION
    const footerHTML = `
    <footer class="bg-[#020617] border-t border-slate-800 py-16 mt-20">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
                <h4 class="text-white font-bold mb-4 uppercase tracking-widest text-xs">Innovation2Solution</h4>
                <p class="text-slate-400 text-sm leading-relaxed">Bridging the gap between visionary ideas and enterprise-grade utility.</p>
            </div>
            <div>
                <h4 class="text-white font-bold mb-4 uppercase tracking-widest text-xs">Platform</h4>
                <ul class="text-slate-400 text-sm space-y-2">
                    <li><a href="services.html" class="hover:text-[#38bdf8]">Services</a></li>
                    <li><a href="approach.html" class="hover:text-[#38bdf8]">Approach</a></li>
                    <li><a href="about.html" class="hover:text-[#38bdf8]">About</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-bold mb-4 uppercase tracking-widest text-xs">Legal</h4>
                <ul class="text-slate-400 text-sm space-y-2">
                    <li><a href="privacy.html" class="hover:text-[#38bdf8]">Privacy</a></li>
                    <li><a href="terms.html" class="hover:text-[#38bdf8]">Terms</a></li>
                    <li><a href="cookies.html" class="hover:text-[#38bdf8]">Cookies</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-bold mb-4 uppercase tracking-widest text-xs">Contact</h4>
                <p class="text-slate-400 text-sm">simon@innovation2solution.com</p>
            </div>
        </div>
    </footer>`;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // 4. MOBILE MENU INTERACTION
    const toggle = document.getElementById('mobile-toggle');
    const links = document.getElementById('nav-links');

    if (toggle) {
        toggle.addEventListener('click', function() {
            links.classList.toggle('active');
        });
    }

    // 5. COOKIE BANNER
    if (!localStorage.getItem('cookieConsent')) {
        const cookieHTML = `
        <div id="cookie-banner" style="position:fixed; bottom:20px; left:50%; transform:translateX(-50%); width:90%; max-width:500px; background:#1e293b; border:1px solid #334155; padding:20px; border-radius:15px; z-index:10001; display:flex; justify-content:space-between; align-items:center; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
            <p style="color:#cbd5e1; font-size:12px; margin:0;">We use cookies for analytics and security. <a href="privacy.html" style="color:#38bdf8">Learn more</a></p>
            <button onclick="this.parentElement.remove(); localStorage.setItem('cookieConsent', 'true');" style="background:#38bdf8; border:none; padding:5px 15px; border-radius:5px; font-weight:bold; cursor:pointer;">OK</button>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', cookieHTML);
    }
})();