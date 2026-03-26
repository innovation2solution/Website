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

    // 2. DETECT ACTIVE PAGE
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    const navHTML = `
    <nav class="main-nav">
        <a href="index.html" class="nav-logo">
            <img src="Copy of i2s_logo copy.png" alt="I2S">
            <span>Innovation<small>2</small>Solution</span>
        </a>
        
        <div class="mobile-toggle" id="mobile-toggle">
            <span></span>
            <span></span>
            <span></span>
        </div>

        <div class="nav-links" id="nav-links">
            <a href="index.html" class="${currentPath === 'index.html' ? 'nav-active' : ''}">Home</a>
            <a href="services.html" class="${currentPath === 'services.html' ? 'nav-active' : ''}">Services</a>
            <a href="approach.html" class="${currentPath === 'approach.html' ? 'nav-active' : ''}">Approach</a>
            <a href="about.html" class="${currentPath === 'about.html' ? 'nav-active' : ''}">About</a>
            <a href="contact.html" class="nav-cta-mobile">Book Audit</a>
        </div>
        
        <a href="contact.html" class="nav-cta">Book Audit</a>
    </nav>`;

    document.addEventListener('DOMContentLoaded', () => {
        document.body.insertAdjacentHTML('afterbegin', navHTML);
        
        // MOBILE MENU FUNCTION
        const toggle = document.getElementById('mobile-toggle');
        const links = document.getElementById('nav-links');
        
        toggle.addEventListener('click', () => {
            links.classList.toggle('mobile-open');
            toggle.classList.toggle('is-active');
        });
    });
})();

// FORM PROCESSING LOGIC (AJAX)
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return; // Only runs on the contact page

    const btn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    const status = document.getElementById('form-status');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 1. Enter "Loading" State
        btn.disabled = true;
        btnText.innerText = "Processing Brief...";
        btnSpinner.classList.remove('hidden');
        status.classList.add('hidden');

        const data = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // 2. Success State
                status.innerText = "Briefing Received. Our team will contact you shortly.";
                status.className = "mt-4 text-center font-bold text-teal-400 block";
                contactForm.reset();
                btnText.innerText = "Submission Complete";
                btnSpinner.classList.add('hidden');
            } else {
                // 3. Error State
                throw new Error();
            }
        } catch (error) {
            status.innerText = "Oops! There was a problem. Please try again or email us directly.";
            status.className = "mt-4 text-center font-bold text-red-500 block";
            btn.disabled = false;
            btnText.innerText = "Request Strategic Consultation";
            btnSpinner.classList.add('hidden');
        }
    });
});