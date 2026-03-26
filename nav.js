(function() {
    // 1. ANALYTICS (G-72GC5HPZWV)
    const GA_ID = 'G-72GC5HPZWV';
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_ID);

    // 2. NAVIGATION INJECTION
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navHTML = `
    <nav class="main-nav">
        <a href="index.html" class="nav-logo">
            <img src="Copy of i2s_logo copy.png" alt="I2S Logo">
            <span>Innovation<small style="color:#38bdf8">2</small>Solution</span>
        </a>
        <button class="mobile-toggle" id="mobile-toggle" aria-label="Menu" aria-expanded="false">
            <span></span><span></span><span></span>
        </button>
        <div class="nav-links" id="nav-links">
            <a href="index.html" class="${currentPath === 'index.html' ? 'nav-active' : ''}">Home</a>
            <a href="services.html" class="${currentPath === 'services.html' ? 'nav-active' : ''}">Services</a>
            <a href="approach.html" class="${currentPath === 'approach.html' ? 'nav-active' : ''}">Approach</a>
            <a href="about.html" class="${currentPath === 'about.html' ? 'nav-active' : ''}">About</a>
            <a href="contact.html" class="nav-cta-mobile" style="background:#ea580c; color:white; padding:10px 20px; border-radius:50px; text-align:center; margin-top:10px; display:none;">Book Audit</a>
        </div>
        <a href="contact.html" class="nav-cta">Book Audit</a>
    </nav>`;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
    
    // 3. MOBILE MENU LOGIC
    const toggle = document.getElementById('mobile-toggle');
    const links = document.getElementById('nav-links');
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            const isOpen = links.classList.toggle('mobile-open');
            toggle.classList.toggle('is-active');
            toggle.setAttribute('aria-expanded', isOpen);
        });
    }

    // 4. CONTACT FORM LOGIC
    document.addEventListener('DOMContentLoaded', () => {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('submit-btn');
            const status = document.getElementById('form-status');
            
            btn.disabled = true;
            status.innerText = "Processing Strategic Brief...";
            status.className = "mt-4 text-center font-bold text-sky-400 block";
            status.classList.remove('hidden');

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    status.innerText = "Brief Received. We will contact you shortly.";
                    status.className = "mt-4 text-center font-bold text-teal-400 block";
                    contactForm.reset();
                } else { throw new Error(); }
            } catch {
                status.innerText = "Submission error. Please email us directly.";
                status.className = "mt-4 text-center font-bold text-red-500 block";
                btn.disabled = false;
            }
        });
    });
})();