(function() {
    // 1. ANALYTICS (G-72GC5HPZWV)
    const GA_ID = 'G-72GC5HPZWV';
    if (!window.gtag) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=G-CPJ8XCB3KE`;
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

    // 3. INJECT FOOTER (Using Simon's correct email)
    const footerHTML = `
    <footer class="bg-[#020617] border-t border-slate-800 py-12 mt-20">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
                <h4 class="text-white font-bold mb-4">Innovation2Solution</h4>
                <p class="text-slate-400 text-sm leading-relaxed">Bridging the gap between visionary ideas and enterprise-grade utility.</p>
            </div>
            <div>
                <h4 class="text-white font-bold mb-4">Quick Links</h4>
                <ul class="text-slate-400 text-sm space-y-2">
                    <li><a href="services.html" class="hover:text-[#38bdf8]">Services</a></li>
                    <li><a href="approach.html" class="hover:text-[#38bdf8]">Our Approach</a></li>
                    <li><a href="contact.html" class="hover:text-[#38bdf8]">Contact</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-bold mb-4">Contact</h4>
                <p class="text-slate-400 text-sm">simon@innovation2solution.com</p>
            </div>
        </div>
        <div class="text-center mt-12 pt-8 border-t border-slate-900 text-slate-500 text-xs">
            &copy; 2024 Innovation2Solution. All Rights Reserved.
        </div>
    </footer>`;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // 4. NAVIGATION & FORM AJAX LOGIC
    document.addEventListener('click', function(e) {
        const toggle = document.getElementById('mobile-toggle');
        const links = document.getElementById('nav-links');
        if (e.target.closest('#mobile-toggle')) {
            const isOpen = links.classList.toggle('mobile-open');
            toggle.classList.toggle('is-active');
            toggle.setAttribute('aria-expanded', isOpen);
        }
    });

    // 5. AJAX FORMSPREE HANDLER
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
                    status.classList.remove("hidden", "text-red-500");
                    status.classList.add("text-green-500", "block");
                    contactForm.reset();
                    btn.innerText = "Sent Successfully";
                } else {
                    throw new Error();
                }
            }).catch(error => {
                status.innerHTML = "Oops! There was a problem. Please try again.";
                status.classList.remove("hidden", "text-green-500");
                status.classList.add("text-red-500", "block");
                btn.disabled = false;
                btn.innerText = "Request Strategic Consultation";
            });
        });
    }
})();