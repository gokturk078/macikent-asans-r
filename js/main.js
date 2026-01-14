/* ===================================
   MAVIKENT ASANSÖR - MAIN JAVASCRIPT
   Application Logic & Interactions
   =================================== */

'use strict';

// ===================================
// DOM ELEMENTS
// ===================================
const DOM = {
    // Header & Navigation
    header: document.getElementById('header'),
    navMenu: document.getElementById('navMenu'),
    navToggle: document.getElementById('navToggle'),
    navClose: document.getElementById('navClose'),
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Scroll Elements
    scrollProgress: document.getElementById('scrollProgress'),
    backToTop: document.getElementById('backToTop'),
    
    // Dark Mode
    darkModeToggle: document.getElementById('darkModeToggle'),
    
    // Cookie Consent
    cookieConsent: document.getElementById('cookieConsent'),
    
    // Trust Numbers (for counter animation)
    trustNumbers: document.querySelectorAll('.trust-number'),
    
    // FAQ Accordion
    faqItems: document.querySelectorAll('.faq-item'),
    
    // Portfolio Filters
    filterBtns: document.querySelectorAll('.filter-btn'),
    portfolioItems: document.querySelectorAll('.portfolio-item'),
    
    // Contact Form
    contactForm: document.getElementById('contactForm'),
    
    // Sections (for active nav tracking)
    sections: document.querySelectorAll('section[id]')
};

// ===================================
// UTILITY FUNCTIONS
// ===================================
const Utils = {
    // Debounce function
    debounce(func, wait = 100) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle(func, limit = 100) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if element is in viewport
    isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= offset
        );
    },
    
    // Smooth scroll to element
    scrollTo(target, offset = 80) {
        const element = document.querySelector(target);
        if (element) {
            const top = element.offsetTop - offset;
            window.scrollTo({
                top,
                behavior: 'smooth'
            });
        }
    },
    
    // Get current scroll position
    getScrollPosition() {
        return window.pageYOffset || document.documentElement.scrollTop;
    },
    
    // Format number with separator
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
};

// ===================================
// NAVIGATION
// ===================================
const Navigation = {
    init() {
        this.bindEvents();
        this.handleScroll();
    },
    
    bindEvents() {
        // Toggle mobile menu
        if (DOM.navToggle) {
            DOM.navToggle.addEventListener('click', () => this.openMenu());
        }
        
        if (DOM.navClose) {
            DOM.navClose.addEventListener('click', () => this.closeMenu());
        }
        
        // Close menu on link click
        DOM.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.closeMenu();
                this.handleNavClick(e);
            });
        });
        
        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!DOM.navMenu.contains(e.target) && !DOM.navToggle.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Scroll event
        window.addEventListener('scroll', Utils.throttle(() => {
            this.handleScroll();
            this.updateActiveLink();
        }, 100));
    },
    
    openMenu() {
        DOM.navMenu.classList.add('show');
        document.body.style.overflow = 'hidden';
    },
    
    closeMenu() {
        DOM.navMenu.classList.remove('show');
        document.body.style.overflow = '';
    },
    
    handleScroll() {
        const scrolled = Utils.getScrollPosition() > 50;
        DOM.header.classList.toggle('scrolled', scrolled);
    },
    
    handleNavClick(e) {
        const href = e.target.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            Utils.scrollTo(href);
        }
    },
    
    updateActiveLink() {
        const scrollPos = Utils.getScrollPosition() + 100;
        
        DOM.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                DOM.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};

// ===================================
// SCROLL PROGRESS
// ===================================
const ScrollProgress = {
    init() {
        window.addEventListener('scroll', Utils.throttle(() => this.update(), 50));
    },
    
    update() {
        const scrollTop = Utils.getScrollPosition();
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        if (DOM.scrollProgress) {
            DOM.scrollProgress.style.width = `${progress}%`;
        }
    }
};

// ===================================
// BACK TO TOP
// ===================================
const BackToTop = {
    init() {
        if (!DOM.backToTop) return;
        
        window.addEventListener('scroll', Utils.throttle(() => this.toggle(), 100));
        DOM.backToTop.addEventListener('click', () => this.scrollToTop());
    },
    
    toggle() {
        const show = Utils.getScrollPosition() > 500;
        DOM.backToTop.classList.toggle('show', show);
    },
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// ===================================
// DARK MODE
// ===================================
const DarkMode = {
    init() {
        this.loadPreference();
        this.bindEvents();
    },
    
    bindEvents() {
        if (DOM.darkModeToggle) {
            DOM.darkModeToggle.addEventListener('click', () => this.toggle());
        }
    },
    
    loadPreference() {
        const darkMode = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (darkMode === 'true' || (darkMode === null && prefersDark)) {
            document.documentElement.classList.add('dark-mode');
            this.updateIcon(true);
        }
    },
    
    toggle() {
        const isDark = document.documentElement.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDark);
        this.updateIcon(isDark);
    },
    
    updateIcon(isDark) {
        if (DOM.darkModeToggle) {
            const icon = DOM.darkModeToggle.querySelector('i');
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
};

// ===================================
// COOKIE CONSENT
// ===================================
const CookieConsent = {
    init() {
        if (this.hasConsent()) return;
        this.show();
    },
    
    hasConsent() {
        return localStorage.getItem('cookieConsent') === 'true';
    },
    
    show() {
        setTimeout(() => {
            if (DOM.cookieConsent) {
                DOM.cookieConsent.classList.add('show');
            }
        }, 2000);
    }
};

// Global function for cookie accept button
window.acceptCookies = function() {
    localStorage.setItem('cookieConsent', 'true');
    if (DOM.cookieConsent) {
        DOM.cookieConsent.classList.remove('show');
    }
};

// ===================================
// FAQ ACCORDION
// ===================================
const FAQ = {
    init() {
        DOM.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => this.toggle(item));
        });
    },
    
    toggle(item) {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        DOM.faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    }
};

// ===================================
// PORTFOLIO FILTER
// ===================================
const PortfolioFilter = {
    init() {
        DOM.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.filter(e));
        });
    },
    
    filter(e) {
        const btn = e.target;
        const filter = btn.dataset.filter;
        
        // Update active button
        DOM.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter items
        DOM.portfolioItems.forEach(item => {
            const category = item.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
};

// ===================================
// CONTACT FORM
// ===================================
const ContactForm = {
    init() {
        if (!DOM.contactForm) return;
        
        DOM.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = DOM.contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    },
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(DOM.contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate all fields
        let isValid = true;
        const requiredFields = DOM.contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            this.showNotification('Lütfen tüm zorunlu alanları doldurun.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = DOM.contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            this.showNotification('Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.', 'success');
            DOM.contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    },
    
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        
        // Required check
        if (field.required && !value) {
            this.showError(field, 'Bu alan zorunludur.');
            isValid = false;
        }
        // Email validation
        else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(field, 'Geçerli bir e-posta adresi girin.');
                isValid = false;
            }
        }
        // Phone validation
        else if (type === 'tel' && value) {
            const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                this.showError(field, 'Geçerli bir telefon numarası girin.');
                isValid = false;
            }
        }
        
        if (isValid) {
            this.clearError(field);
        }
        
        return isValid;
    },
    
    showError(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('has-error');
        
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.style.cssText = 'color: #FF3D00; font-size: 0.75rem; margin-top: 0.25rem; display: block;';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
        
        field.style.borderColor = '#FF3D00';
    },
    
    clearError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('has-error');
        
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        
        field.style.borderColor = '';
    },
    
    showNotification(message, type) {
        // Remove existing notification
        const existing = document.querySelector('.form-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            background: ${type === 'success' ? '#00C853' : '#FF3D00'};
            color: white;
            font-weight: 500;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
};

// Add slide animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    Utils.scrollTo(href);
                }
            });
        });
    }
};

// ===================================
// VANILLA TILT INITIALIZATION
// ===================================
const TiltEffect = {
    init() {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        if (tiltElements.length && typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(tiltElements, {
                max: 10,
                speed: 400,
                glare: true,
                'max-glare': 0.2
            });
        }
    }
};

// ===================================
// PARTICLES GENERATOR
// ===================================
const Particles = {
    init() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: linear-gradient(45deg, var(--secondary), var(--accent));
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                opacity: 0;
                animation: particleFloat ${Math.random() * 5 + 5}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }
};

// ===================================
// LAZY LOADING IMAGES
// ===================================
const LazyLoad = {
    init() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading supported
            return;
        }
        
        // Fallback for older browsers
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
};

// ===================================
// INITIALIZE APP
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Core modules
    Navigation.init();
    ScrollProgress.init();
    BackToTop.init();
    DarkMode.init();
    CookieConsent.init();
    SmoothScroll.init();
    
    // Interactive elements
    FAQ.init();
    PortfolioFilter.init();
    ContactForm.init();
    
    // Effects
    TiltEffect.init();
    Particles.init();
    LazyLoad.init();
    
    console.log('🏢 Mavikent Asansör - Website Initialized');
});

// ===================================
// WINDOW EVENTS
// ===================================
window.addEventListener('load', () => {
    // Remove loading state if any
    document.body.classList.remove('loading');
    
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            disable: 'mobile'
        });
    }
});
