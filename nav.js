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
            <a href="contact.html" class="nav-cta" style="display:none;">Book Audit</a>
        </div>
        <a href="contact.html" class="nav-cta">Book Audit</a>
    </nav>`;

    // 3. FOOTER INJECTION
    const footerHTML = `
    <footer class="bg-[#020617] border-t border-slate-800 py-16 mt-20">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
            <div>
                <h4 class="text-white font-bold mb-4 uppercase tracking-widest text-xs">Innovation2Solution</h4>
                <p class="text-slate-400 text-sm leading-relaxed">Bridging the gap between visionary ideas and enterprise-grade utility.</p>
            </div>
            <div>
                <h4 class="text-white font-bold mb-4 uppercase tracking-widest text-xs">Explore more</h4>
                <ul class="text-slate-400 text-sm space-y-2 list-none p-0">
                    <li><a href="services.html" class="hover:text-[#38bdf8] transition-colors">Services</a></li>
                    <li><a href="approach.html" class="hover:text-[#38bdf8] transition-colors">Approach</a></li>
                    <li><a href="about.html" class="hover:text-[#38bdf8] transition-colors">About</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-bold mb-4 uppercase tracking-widest text-xs">Legal</h4>
                <ul class="text-slate-400 text-sm space-y-2 list-none p-0">
                    <li><a href="privacy.html" class="hover:text-[#38bdf8] transition-colors">Privacy</a></li>
                    <li><a href="terms.html" class="hover:text-[#38bdf8] transition-colors">Terms</a></li>
                    <li><a href="cookies.html" class="hover:text-[#38bdf8] transition-colors">Cookies</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-bold mb-4 uppercase tracking-widest text-xs">Contact</h4>
                <p class="text-slate-400 text-sm">enquiries@innovation2solution.com</p>
        
            </div>
        </div>
    </footer>`;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // 4. MOBILE TOGGLE LOGIC
    const toggle = document.getElementById('mobile-toggle');
    const links = document.getElementById('nav-links');

    if (toggle) {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            links.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        links.addEventListener('click', () => links.classList.remove('active'));
    }

    // 5. COOKIE BANNER
    if (!localStorage.getItem('cookieConsent')) {
        const cookieHTML = `
        <div id="cookie-banner" style="position:fixed; bottom:24px; left:50%; transform:translateX(-50%); width:90%; max-width:550px; background:rgba(30,41,59,0.95); border:1px solid rgba(255,255,255,0.1); padding:20px; border-radius:20px; z-index:10001; display:flex; justify-content:space-between; align-items:center; backdrop-filter:blur(10px); box-shadow:0 20px 50px rgba(0,0,0,0.5);">
            <p style="color:#cbd5e1; font-size:13px; margin:0; padding-right:20px;">We use cookies for analytics and enterprise security. <a href="privacy.html" style="color:#38bdf8; text-decoration:none;">Learn more</a></p>
            <button onclick="this.parentElement.remove(); localStorage.setItem('cookieConsent', 'true');" style="background:#38bdf8; color:#0f172a; border:none; padding:8px 20px; border-radius:10px; font-weight:bold; cursor:pointer; white-space:nowrap;">Accept</button>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', cookieHTML);
    }
})();