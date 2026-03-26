(function() {
    // 1. ANALYTICS (G-72GC5HPZWV)
    const GA_ID = 'G-72GC5HPZWV';
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

    // 2. DETECT PAGE & INJECT HEADER
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navHTML = `
    <nav class="main-nav">
        <a href="index.html" class="nav-logo">
            <img src="Copy of i2s_logo copy.png" alt="I2S Logo">
            <span>Innovation<small style="color:#38bdf8">2</small>Solution</span>
        </a>
        <button class="mobile-toggle" id="mobile-toggle" aria-label="Menu" aria-expanded="false">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
        </button>
        <div class="nav-links" id="nav-links">
            <a href="index.html" class="${currentPath === 'index.html' ? 'nav-active' : ''}">Home</a>
            <a href="services.html" class="${currentPath === 'services.html' ? 'nav-active' : ''}">Services</a>
            <a href="approach.html" class="${currentPath === 'approach.html' ? 'nav-active' : ''}">Approach</a>
            <a href="about.html" class="${currentPath === 'about.html' ? 'nav-active' : ''}">About</a>
            <a href="contact.html" class="nav-cta-mobile">Book Audit</a>
        </div>
        <a href="contact.html" class="nav-cta">Book Audit</a>
    </nav>`;

    // 3. INJECT FOOTER (Only if one doesn't already exist)
    const existingFooter = document.querySelector('footer');
    if (!existingFooter) {
        const footerHTML = `
        <footer class="site-footer">
            <div class="footer-grid">
                <div>
                    <h4>Innovation2Solution</h4>
                    <p>Bridging the gap between visionary ideas and enterprise-grade utility.</p>
                </div>
                <div>
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="approach.html">Our Approach</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Contact</h4>
                    <p>enquiries@innovation2solution.com</p>
                </div>
            </div>
            <div class="footer-bottom">
                &copy; 2026 Innovation2Solution. All Rights Reserved.
            </div>
        </footer>`;
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }

    // Perform Header Injection
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    
    // 4. MOBILE MENU LOGIC
    document.addEventListener('click', function(e) {
        const toggle = document.getElementById('mobile-toggle');
        const links = document.getElementById('nav-links');
        
        if (e.target.closest('#mobile-toggle')) {
            links.classList.toggle('mobile-open');
            toggle.classList.toggle('is-active');
            const isOpen = links.classList.contains('mobile-open');
            toggle.setAttribute('aria-expanded', isOpen);
        } else if (!e.target.closest('.main-nav')) {
            // Close menu if clicking outside
            links.classList.remove('mobile-open');
            toggle.classList.remove('is-active');
        }
    });
})();