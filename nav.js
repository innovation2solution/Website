(function() {
    // 1. ANALYTICS & NAV INJECTION (Keep your existing G-ID logic here)
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    const navHTML = `
    <nav class="main-nav" id="main-nav">
        <a href="index.html" class="nav-logo">
            <img src="Copy of i2s_logo copy.png" alt="Innovation 2 Solution Logo">
            <span>Innovation<small>2</small>Solution</span>
        </a>
        
        <button class="mobile-toggle" id="mobile-toggle" aria-label="Open Menu" aria-expanded="false">
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

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // 2. THE FIX: Global Event Listener (Event Delegation)
    document.addEventListener('click', function (event) {
        const toggle = document.getElementById('mobile-toggle');
        const links = document.getElementById('nav-links');

        // Check if the click was on the toggle or any of its children (the spans)
        if (event.target.closest('#mobile-toggle')) {
            const isActive = links.classList.toggle('mobile-open');
            toggle.classList.toggle('is-active');
            toggle.setAttribute('aria-expanded', isActive);
        } else if (!event.target.closest('#main-nav')) {
            // Optional: Close menu if clicking outside
            links.classList.remove('mobile-open');
            toggle.classList.remove('is-active');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
})();