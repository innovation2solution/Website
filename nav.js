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
    <nav class="main-nav" id="main-navigation">
        <a href="index.html" class="nav-logo">
            <img src="Copy of i2s_logo copy.png" alt="Innovation 2 Solution Logo">
            <span>Innovation<small>2</small>Solution</span>
        </a>
        
        <button class="mobile-toggle" id="mobile-toggle" aria-label="Menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
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

    // Inject immediately without waiting for DOMContentLoaded 
    // to ensure it appears before other content renders
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    
    // MOBILE MENU LOGIC
    const initNav = () => {
        const toggle = document.getElementById('mobile-toggle');
        const links = document.getElementById('nav-links');
        
        if (toggle && links) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const isOpen = links.classList.toggle('mobile-open');
                toggle.classList.toggle('is-active');
                toggle.setAttribute('aria-expanded', isOpen);
            });
        }
    };

    // Initialize logic
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNav);
    } else {
        initNav();
    }
})();