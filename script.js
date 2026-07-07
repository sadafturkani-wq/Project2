/**
 * BOOTSLAND - Modern Landing Page Scripts
 * Handles navbar, animations, counters, and portfolio filtering
 */

(function() {
    'use strict';

    // === DOM Elements ===
    const navbar = document.getElementById('mainNav');
    const heroSection = document.getElementById('home');
    const navLinks = document.querySelectorAll('.nav-link');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const statNumbers = document.querySelectorAll('.stat-number');

    // === Navbar Scroll Effect ===
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // === Smooth Scroll for Anchor Links ===
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 72;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        document.querySelector('.navbar-toggler').click();
                    }
                }
            });
        });
    }

    // === Active Nav Link on Scroll ===
    function handleActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    // === Portfolio Filter ===
    function initPortfolioFilter() {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Filter items with animation
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');

                    if (filter === 'all' || filter === category) {
                        item.classList.remove('hidden');
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.transition = 'all 0.5s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.classList.add('hidden');
                        }, 300);
                    }
                });
            });
        });
    }

    // === Counter Animation ===
    function animateCounters() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const startTime = performance.now();
                    const startValue = 0;

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // Ease-out cubic for smooth animation
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const currentValue = Math.floor(startValue + (target - startValue) * easeOut);

                        counter.textContent = currentValue.toLocaleString();

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toLocaleString();
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    counterObserver.unobserve(counter);
                }
            });
        }, observerOptions);

        statNumbers.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // === Scroll Reveal Animation ===
    function initScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.feature-card, .service-card, .about-content, .about-image-wrapper, .portfolio-item, .section-header'
        );

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        revealElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s ease ${index * 0.05}s`;
            revealObserver.observe(el);
        });
    }

    // === Form Handling ===
    function initForms() {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                if (email) {
                    alert('Thank you for subscribing!');
                    this.reset();
                }
            });
        }
    }

    // === Initialize Everything ===
    function init() {
        // Add scroll listener
        window.addEventListener('scroll', function() {
            handleNavbarScroll();
            handleActiveNavOnScroll();
        });

        // Initialize features
        initSmoothScroll();
        initPortfolioFilter();
        animateCounters();
        initScrollReveal();
        initForms();

        // Initial navbar state
        handleNavbarScroll();
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();