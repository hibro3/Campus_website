document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll-reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve after revealing
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealOnScroll, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    // 3. Header Scroll Effect
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '1.5rem 0';
            header.style.boxShadow = 'none';
        }
    });

    // 4. Smooth Anchor Scrolling (optional enhancement)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Click Spark Animation
    function createSpark(x, y) {
        const sparkCount = 8;
        const colors = ['#2563eb', '#5227FF', '#FF9FFC']; // Primary and logo colors
        
        for (let i = 0; i < sparkCount; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark-particle';
            document.body.appendChild(spark);
            
            const angle = (i / sparkCount) * 360;
            const distance = 40 + Math.random() * 20;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            spark.style.backgroundColor = color;
            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;
            spark.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(0) scaleY(1)`;
            
            // Force layout reflow
            void spark.offsetWidth;
            
            spark.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(-${distance}px) scaleY(0)`;
            spark.style.opacity = '0';
            
            setTimeout(() => spark.remove(), 600);
        }
    }

    window.addEventListener('mousedown', (e) => {
        createSpark(e.pageX, e.pageY);
    });

    // Initial icon creation
    if (window.lucide) {
        lucide.createIcons();
    }

    // 6. Theme Switching logic
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    function setTheme(isLight) {
        if (isLight) {
            body.classList.add('light-mode');
            if (themeIcon) themeIcon.setAttribute('data-lucide', 'sun');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
            localStorage.setItem('theme', 'dark');
        }
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    if (themeToggle) {
        // Check saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setTheme(true);
        }

        themeToggle.addEventListener('click', () => {
            setTheme(!body.classList.contains('light-mode'));
        });
    }

    // 7. Dynamic Leaves & Pollen
    const leavesContainer = document.getElementById('leaves-container');
    if (leavesContainer) {
        // Generate Pollen
        for (let i = 0; i < 40; i++) {
            const pollen = document.createElement('div');
            pollen.className = 'pollen';
            pollen.style.left = `${Math.random() * 100}%`;
            pollen.style.top = `${Math.random() * 100}%`;
            pollen.style.animationDelay = `${Math.random() * 10}s`;
            pollen.style.animationDuration = `${10 + Math.random() * 10}s`;
            leavesContainer.appendChild(pollen);
        }

        // Generate Leaves
        const leafImages = ['assets/leaf1.png', 'assets/leaf2.png'];
        for (let i = 0; i < 15; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            leaf.style.left = `${Math.random() * 100}%`;
            leaf.style.top = `${Math.random() * 100}%`;
            leaf.style.backgroundImage = `url(${leafImages[Math.floor(Math.random() * leafImages.length)]})`;
            leaf.style.animationDelay = `${Math.random() * 5}s`;
            leaf.style.animationDuration = `${8 + Math.random() * 7}s`;
            leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
            leavesContainer.appendChild(leaf);
        }
    }
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
        });
    });
});
