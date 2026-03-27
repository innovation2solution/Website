(function() {
    // 1. ANALYTICS (G-CPJ8XCB3KE)
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

    // 2. DETECT PAGE & INJECT HEADER
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navHTML = `
    <nav class="main-nav">
        <a href="index.html" class="nav-logo">
            <img src="Copy of i2s_logo copy.png" alt="I2S Logo">
            <span>Innovation<small style="color:#38bdf8">2</small>Solution</span>
        </a>
        <button class="mobile-toggle" id="mobile-toggle" aria-label="Menu" aria-expanded="false">
            <span class="line"></span><span class="line"></span><span class="line"></span>
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

    // 3. INJECT FOOTER (Updated with Simon's Email and Legal Links)
    const footerHTML = `
    <footer class="bg-[#020617] border-t border-slate-800 py-16 mt-20">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
                <h4 class="text-white font-bold mb-4 uppercase tracking-widest text-xs">Innovation2Solution</h4>
                <p class="text-slate-400 text-sm leading-relaxed">Bridging the gap between visionary ideas and enterprise-grade utility.</p>
            </div>
            <div>
                <h4 class="text-white font-bold mb-4 uppercase tracking-widest text-xs">Explore more</h4>
                <ul class="text-slate-400 text-sm space-y-2">
                    <li><a href="services.html" class="hover:text-[#38bdf8] transition-colors">Services</a></li>
                    <li><a href="approach.html" class="hover:text-[#38bdf8] transition-colors">Our Approach</a></li>
                    <li><a href="about.html" class="hover:text-[#38bdf8] transition-colors">About Us</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-bold mb-4 uppercase tracking-widest text-xs">Legal</h4>
                <ul class="text-slate-400 text-sm space-y-2">
                    <li><a href="privacy.html" class="hover:text-[#38bdf8] transition-colors">Privacy Policy</a></li>
                    <li><a href="terms.html" class="hover:text-[#38bdf8] transition-colors">Terms of Use</a></li>
                    <li><a href="cookies.html" class="hover:text-[#38bdf8] transition-colors">Cookie Policy</a></li>
                    <li><a href="governance.html" class="hover:text-[#38bdf8] transition-colors">Data Governance</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-bold mb-4 uppercase tracking-widest text-xs">Contact</h4>
                <p class="text-slate-400 text-sm">enquiries@innovation2solution.com</p>
            </div>
        </div>
        <div class="text-center mt-12 pt-8 border-t border-slate-900 text-slate-500 text-xs">
            &copy; 2024 Innovation2Solution. All Rights Reserved.
        </div>
    </footer>`;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // 4. MOBILE MENU INTERACTIVITY FIX
    document.addEventListener('click', function(e) {
        const toggle = document.getElementById('mobile-toggle');
        const links = document.getElementById('nav-links');
        if (e.target.closest('#mobile-toggle')) {
            const isOpen = links.classList.toggle('active'); // Toggles display via CSS
            toggle.classList.toggle('is-active'); // For burger animation
            toggle.setAttribute('aria-expanded', isOpen);
        }
    });

    // 5. AJAX FORM HANDLER
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            const status = document.getElementById("form-status");
            const btn = document.getElementById("submit-btn");
            const data = new FormData(event.target);
            btn.disabled = true;
            btn.innerText = "Sending...";

            fetch(event.target.action, {
                method: contactForm.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    status.innerHTML = "Success! We will be in touch shortly.";
                    status.className = "mt-6 text-center font-bold text-green-500 block";
                    contactForm.reset();
                    btn.innerText = "Sent Successfully";
                } else { throw new Error(); }
            }).catch(() => {
                status.innerHTML = "Oops! Problem sending. Please try again.";
                status.className = "mt-6 text-center font-bold text-red-500 block";
                btn.disabled = false;
                btn.innerText = "Request Strategic Consultation";
            });
        });
    }

    // 6. COOKIE CONSENT BANNER
    const cookieHTML = `
    <div id="cookie-banner" class="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[600px] bg-[#1e293b] border border-slate-700 rounded-2xl shadow-2xl p-6 z-[10001] flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl bg-opacity-95 hidden">
        <div class="text-sm text-slate-300 leading-relaxed">
            <strong class="text-white block mb-1">Privacy</strong>
            We use cookies to analyse traffic and ensure performance. <a href="privacy.html" class="text-[#38bdf8] underline">Read Policy</a>
        </div>
        <div class="flex gap-3 shrink-0">
            <button onclick="dismissCookie(false)" class="px-5 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">Reject</button>
            <button onclick="dismissCookie(true)" class="px-5 py-2 text-xs font-bold bg-[#38bdf8] text-[#0f172a] rounded-lg hover:bg-white transition-all">Accept All</button>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', cookieHTML);
    const banner = document.getElementById('cookie-banner');
    if (!localStorage.getItem('cookieConsent')) {
        banner.classList.remove('hidden');
        banner.classList.add('flex');
    }

    window.dismissCookie = function(accepted) {
        localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'rejected');
        banner.remove();
    };
})();