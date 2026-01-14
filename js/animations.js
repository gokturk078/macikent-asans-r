/* ===================================
   MAVIKENT ASANSÖR - ANIMATIONS JS
   Scroll-based animations & counters
   =================================== */

'use strict';

// ===================================
// COUNTER ANIMATION
// ===================================
const CounterAnimation = {
    counters: document.querySelectorAll('.trust-number'),
    animated: new Set(),

    init() {
        if (!this.counters.length) return;

        // Use Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated.has(entry.target)) {
                    this.animate(entry.target);
                    this.animated.add(entry.target);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px'
        });

        this.counters.forEach(counter => observer.observe(counter));
    },

    animate(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
};

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================
const ScrollReveal = {
    elements: document.querySelectorAll('.reveal'),

    init() {
        if (!this.elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(el => observer.observe(el));
    }
};

// ===================================
// PARALLAX EFFECT
// ===================================
const Parallax = {
    elements: document.querySelectorAll('.parallax'),

    init() {
        if (!this.elements.length) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.update();
                    ticking = false;
                });
                ticking = true;
            }
        });
    },

    update() {
        const scrolled = window.pageYOffset;

        this.elements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }
};

// ===================================
// MAGNETIC BUTTONS
// ===================================
const MagneticButtons = {
    buttons: document.querySelectorAll('.btn-primary'),

    init() {
        if (window.innerWidth < 1024) return; // Disable on mobile

        this.buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => this.move(e, btn));
            btn.addEventListener('mouseleave', (e) => this.reset(btn));
        });
    },

    move(e, btn) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    },

    reset(btn) {
        btn.style.transform = 'translate(0, 0)';
    }
};

// ===================================
// TEXT TYPING EFFECT
// ===================================
const TypeWriter = {
    element: document.querySelector('.typing-text'),
    text: '',
    index: 0,

    init() {
        if (!this.element) return;

        this.text = this.element.dataset.text || this.element.textContent;
        this.element.textContent = '';
        this.type();
    },

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), 50);
        }
    }
};

// ===================================
// STAGGER ANIMATION
// ===================================
const StaggerAnimation = {
    containers: document.querySelectorAll('.stagger-container'),

    init() {
        if (!this.containers.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.stagger(entry.target);
                }
            });
        }, { threshold: 0.2 });

        this.containers.forEach(container => observer.observe(container));
    },

    stagger(container) {
        const children = container.querySelectorAll('.stagger-item');
        children.forEach((child, index) => {
            child.style.animationDelay = `${index * 0.1}s`;
            child.classList.add('stagger-animate');
        });
    }
};

// ===================================
// PROGRESS BAR ANIMATION
// ===================================
const ProgressBars = {
    bars: document.querySelectorAll('.progress-bar'),

    init() {
        if (!this.bars.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const value = bar.dataset.value || 100;
                    bar.style.width = `${value}%`;
                }
            });
        }, { threshold: 0.5 });

        this.bars.forEach(bar => observer.observe(bar));
    }
};

// ===================================
// CURSOR FOLLOWER
// ===================================
const CursorFollower = {
    cursor: null,

    init() {
        if (window.innerWidth < 1024) return;

        // Create cursor element
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor-follower';
        this.cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(0, 217, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.15s ease, width 0.3s ease, height 0.3s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(this.cursor);

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = `${e.clientX}px`;
            this.cursor.style.top = `${e.clientY}px`;
        });

        // Scale on hover
        document.querySelectorAll('a, button, .service-card, .portfolio-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.width = '40px';
                this.cursor.style.height = '40px';
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.style.width = '20px';
                this.cursor.style.height = '20px';
            });
        });
    }
};

// ===================================
// SCROLL-TRIGGERED CLASS TOGGLE
// ===================================
const ScrollTrigger = {
    triggers: [],

    init() {
        // Add elements to trigger
        this.addTrigger('.hero', 'hero-visible');
        this.addTrigger('.services', 'services-visible');

        window.addEventListener('scroll', () => this.check());
        this.check();
    },

    addTrigger(selector, className) {
        const element = document.querySelector(selector);
        if (element) {
            this.triggers.push({ element, className });
        }
    },

    check() {
        this.triggers.forEach(({ element, className }) => {
            const rect = element.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            element.classList.toggle(className, inView);
        });
    }
};

// ===================================
// IMAGE HOVER ZOOM
// ===================================
const ImageZoom = {
    images: document.querySelectorAll('.portfolio-item img'),

    init() {
        this.images.forEach(img => {
            img.addEventListener('mousemove', (e) => this.zoom(e, img));
            img.addEventListener('mouseleave', () => this.reset(img));
        });
    },

    zoom(e, img) {
        const rect = img.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        img.style.transformOrigin = `${x}% ${y}%`;
    },

    reset(img) {
        img.style.transformOrigin = 'center center';
    }
};

// ===================================
// SMOOTH NUMBER INCREMENT
// ===================================
const AnimateNumber = {
    animate(element, start, end, duration) {
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = this.easeOutCubic(progress);
            const current = Math.floor(start + (end - start) * eased);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = end;
            }
        };

        requestAnimationFrame(update);
    },

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
};

// ===================================
// INTERSECTION OBSERVER UTILITY
// ===================================
const ObserverUtil = {
    create(callback, options = {}) {
        const defaultOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        return new IntersectionObserver(callback, { ...defaultOptions, ...options });
    },

    observe(elements, callback, options) {
        const observer = this.create((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                }
            });
        }, options);

        elements.forEach(el => observer.observe(el));
        return observer;
    }
};

// ===================================
// TESTIMONIALS SLIDER (Simple)
// ===================================
const TestimonialsSlider = {
    container: document.querySelector('.testimonials-slider'),
    cards: null,
    currentIndex: 0,
    autoplayInterval: null,

    init() {
        if (!this.container) return;
        this.cards = this.container.querySelectorAll('.testimonial-card');
        if (this.cards.length <= 3) return; // Don't auto-rotate if 3 or less

        this.startAutoplay();
    },

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.next();
        }, 5000);
    },

    next() {
        // Simple opacity animation for autoplay effect
        this.cards.forEach((card, index) => {
            card.style.opacity = '0.7';
            card.style.transform = 'scale(0.95)';
        });

        setTimeout(() => {
            this.cards.forEach((card, index) => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            });
        }, 300);
    }
};

// ===================================
// SERVICE CARD 3D TILT
// ===================================
const ServiceCardTilt = {
    cards: document.querySelectorAll('.service-card'),

    init() {
        if (window.innerWidth < 1024) return;

        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.tilt(e, card));
            card.addEventListener('mouseleave', () => this.reset(card));
        });
    },

    tilt(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    },

    reset(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    }
};

// ===================================
// INITIALIZE ANIMATIONS
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    CounterAnimation.init();
    ScrollReveal.init();
    Parallax.init();
    StaggerAnimation.init();
    ProgressBars.init();
    ScrollTrigger.init();
    ImageZoom.init();
    TestimonialsSlider.init();
    ServiceCardTilt.init();

    // Optional: Enable cursor follower (can be disabled)
    // CursorFollower.init();

    // Optional: Enable magnetic buttons
    // MagneticButtons.init();

    console.log('✨ Animations Initialized');
});

// ===================================
// EXPORT FOR MODULE USE
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CounterAnimation,
        ScrollReveal,
        Parallax,
        AnimateNumber,
        ObserverUtil
    };
}
