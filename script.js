// ════════════════════════════════════════════════
//  CAMPUS WEBSITE — Main Script
// ════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Scroll-reveal animations ──────────────────────────────
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));

    // ── 2. Header Scroll Effect ───────────────────────────────────
    const siteHeader = document.getElementById('site-header');
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            siteHeader.style.boxShadow = window.scrollY > 50
                ? '0 10px 30px rgba(0,0,0,0.15)'
                : 'none';
        });
    }

    // ── 3. Smooth Anchor Scrolling ────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ── 4. Click Spark Animation ──────────────────────────────────
    window.addEventListener('mousedown', e => {
        const colors = ['#2563eb', '#5227FF', '#FF9FFC'];
        for (let i = 0; i < 8; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark-particle';
            document.body.appendChild(spark);
            const angle    = (i / 8) * 360;
            const distance = 40 + Math.random() * 20;
            spark.style.backgroundColor = colors[i % colors.length];
            spark.style.left      = `${e.pageX}px`;
            spark.style.top       = `${e.pageY}px`;
            spark.style.transform = `translate(-50%,-50%) rotate(${angle}deg) translateY(0) scaleY(1)`;
            void spark.offsetWidth;
            spark.style.transform = `translate(-50%,-50%) rotate(${angle}deg) translateY(-${distance}px) scaleY(0)`;
            spark.style.opacity   = '0';
            setTimeout(() => spark.remove(), 600);
        }
    });

    // ── 5. Lucide Icons ───────────────────────────────────────────
    if (window.lucide) lucide.createIcons();

    // ── 6. Theme Switching ────────────────────────────────────────
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon   = document.getElementById('theme-icon');
    const body        = document.body;

    function setTheme(isLight) {
        body.classList.toggle('light-mode', isLight);
        if (themeIcon) themeIcon.setAttribute('data-lucide', isLight ? 'sun' : 'moon');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        if (window.lucide) lucide.createIcons();
    }

    if (themeToggle) {
        if (localStorage.getItem('theme') === 'light') setTheme(true);
        themeToggle.addEventListener('click', () => {
            setTheme(!body.classList.contains('light-mode'));
        });
    }

    // ── 7. Dynamic Leaves & Pollen ────────────────────────────────
    const leavesContainer = document.getElementById('leaves-container');
    if (leavesContainer) {
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.className = 'pollen';
            p.style.left            = `${Math.random() * 100}%`;
            p.style.top             = `${Math.random() * 100}%`;
            p.style.animationDelay  = `${Math.random() * 10}s`;
            p.style.animationDuration = `${10 + Math.random() * 10}s`;
            leavesContainer.appendChild(p);
        }
        const leafImages = ['assets/light-bg-1.jpg', 'assets/light-bg-2.jpg', 'assets/light-bg-3.jpg'];
        for (let i = 0; i < 15; i++) {
            const l = document.createElement('div');
            l.className = 'leaf';
            l.style.left            = `${Math.random() * 100}%`;
            l.style.top             = `${Math.random() * 100}%`;
            l.style.backgroundImage = `url(${leafImages[i % leafImages.length]})`;
            l.style.animationDelay  = `${Math.random() * 5}s`;
            l.style.animationDuration = `${8 + Math.random() * 7}s`;
            l.style.transform       = `rotate(${Math.random() * 360}deg)`;
            leavesContainer.appendChild(l);
        }
    }

});

// ── FAQ Accordion ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.accordion-header').forEach(hdr => {
        hdr.addEventListener('click', () => {
            hdr.parentElement.classList.toggle('active');
        });
    });
});
