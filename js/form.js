/* ===================================
   MAVIKENT ASANSÖR - CONTACT FORM JAVASCRIPT
   Enhanced Form with EmailJS Integration
   =================================== */

'use strict';

// ===================================
// CONTACT FORM MANAGER CLASS
// ===================================
class ContactFormManager {
    constructor() {
        this.form = null;
        this.submitBtn = null;
        this.feedback = null;

        // Email configuration
        this.EMAIL_RECIPIENT = 'g.kahriman078@gmail.com';
        this.SMS_NUMBER = '05306506990';

        // EmailJS config (user needs to fill these)
        this.EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
        this.EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
        this.EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.form = document.getElementById('contact-form-enhanced');
        if (!this.form) {
            // Fallback to original form
            this.form = document.getElementById('contactForm');
        }

        if (!this.form) {
            console.warn('Contact form not found');
            return;
        }

        this.submitBtn = this.form.querySelector('button[type="submit"]');
        this.feedback = document.getElementById('formFeedback');

        this.bindEvents();
        console.log('📧 Contact Form Manager initialized');
    }

    bindEvents() {
        // Form submit
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
                // Update character counter for textarea
                if (input.tagName === 'TEXTAREA') {
                    this.updateCharCounter(input);
                }
            });
        });

        // Phone input formatting
        const phoneInput = this.form.querySelector('input[type="tel"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => this.formatPhoneInput(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        const isValid = this.validateForm();
        if (!isValid) {
            this.showFeedback('Lütfen tüm gerekli alanları doğru şekilde doldurun.', 'error');
            return;
        }

        // Set loading state
        this.setLoading(true);

        // Collect form data
        const formData = this.collectFormData();

        try {
            // Try EmailJS first
            if (this.EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' && typeof emailjs !== 'undefined') {
                await this.sendViaEmailJS(formData);
            } else {
                // Fallback: simulate sending (for demo)
                await this.simulateSend(formData);
            }

            // Success
            this.showFeedback('✅ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
            this.form.reset();

            // Reset character counter
            const charCounter = this.form.querySelector('.char-counter');
            if (charCounter) charCounter.textContent = '0 / 1000';

            // Track event
            this.trackFormSubmit(formData);

        } catch (error) {
            console.error('Form gönderim hatası:', error);
            this.showFeedback('❌ Bir hata oluştu. Lütfen doğrudan bizi arayın: 0252 612 00 99', 'error');
        } finally {
            this.setLoading(false);
        }
    }

    collectFormData() {
        const getValue = (id) => {
            const el = document.getElementById(id);
            return el ? el.value.trim() : '';
        };

        return {
            fullName: getValue('fullName') || getValue('name'),
            phone: getValue('phone'),
            email: getValue('email') || 'Belirtilmedi',
            serviceType: getValue('serviceType') || getValue('service'),
            message: getValue('message'),
            timestamp: new Date().toLocaleString('tr-TR'),
            source: 'Mavikent Asansör Web Sitesi'
        };
    }

    async sendViaEmailJS(formData) {
        const templateParams = {
            to_email: this.EMAIL_RECIPIENT,
            from_name: formData.fullName,
            from_phone: formData.phone,
            from_email: formData.email,
            service_type: formData.serviceType,
            message: formData.message,
            timestamp: formData.timestamp
        };

        return emailjs.send(
            this.EMAILJS_SERVICE_ID,
            this.EMAILJS_TEMPLATE_ID,
            templateParams,
            this.EMAILJS_PUBLIC_KEY
        );
    }

    async simulateSend(formData) {
        // Simulate network delay
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('📧 Form data (simulated send):', formData);
                resolve({ status: 200 });
            }, 1500);
        });
    }

    validateForm() {
        let isValid = true;
        const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        // Validate checkbox separately
        const checkbox = this.form.querySelector('input[type="checkbox"][required]');
        if (checkbox && !checkbox.checked) {
            this.showFieldError(checkbox, 'Bu alanı işaretlemeniz gerekmektedir.');
            isValid = false;
        }

        return isValid;
    }

    validateField(input) {
        const value = input.value.trim();
        const type = input.type;
        let isValid = true;
        let errorMessage = '';

        // Skip if not required and empty
        if (!input.required && !value) {
            this.clearFieldError(input);
            return true;
        }

        // Required check
        if (input.required && !value) {
            isValid = false;
            errorMessage = 'Bu alan zorunludur';
        }
        // Email validation
        else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Geçerli bir e-posta adresi girin';
            }
        }
        // Phone validation
        else if (type === 'tel' && value) {
            const cleanPhone = value.replace(/\D/g, '');
            if (cleanPhone.length < 10 || cleanPhone.length > 11) {
                isValid = false;
                errorMessage = 'Geçerli bir telefon numarası girin';
            }
        }
        // Min length check
        else if (input.minLength && value.length < input.minLength) {
            isValid = false;
            errorMessage = `En az ${input.minLength} karakter olmalı`;
        }
        // Max length check
        else if (input.maxLength && value.length > input.maxLength) {
            isValid = false;
            errorMessage = `En fazla ${input.maxLength} karakter olabilir`;
        }

        // Update UI
        if (isValid) {
            this.clearFieldError(input);
            input.classList.add('success');
        } else {
            this.showFieldError(input, errorMessage);
        }

        return isValid;
    }

    showFieldError(input, message) {
        input.classList.remove('success');
        input.classList.add('error');

        const group = input.closest('.form-group') || input.closest('.checkbox-group');
        if (!group) return;

        let errorSpan = group.querySelector('.form-error-text');
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'form-error-text';
            group.appendChild(errorSpan);
        }

        errorSpan.textContent = message;
        errorSpan.classList.add('show');
    }

    clearFieldError(input) {
        input.classList.remove('error');

        const group = input.closest('.form-group') || input.closest('.checkbox-group');
        if (!group) return;

        const errorSpan = group.querySelector('.form-error-text');
        if (errorSpan) {
            errorSpan.classList.remove('show');
            errorSpan.textContent = '';
        }
    }

    formatPhoneInput(e) {
        let value = e.target.value.replace(/\D/g, '');

        // Format as: 0XXX XXX XX XX
        if (value.length > 0) {
            if (value.length <= 4) {
                value = value;
            } else if (value.length <= 7) {
                value = value.slice(0, 4) + ' ' + value.slice(4);
            } else if (value.length <= 9) {
                value = value.slice(0, 4) + ' ' + value.slice(4, 7) + ' ' + value.slice(7);
            } else {
                value = value.slice(0, 4) + ' ' + value.slice(4, 7) + ' ' + value.slice(7, 9) + ' ' + value.slice(9, 11);
            }
        }

        e.target.value = value;
    }

    updateCharCounter(textarea) {
        const counter = textarea.parentElement.querySelector('.char-counter');
        if (counter) {
            const current = textarea.value.length;
            const max = textarea.maxLength || 1000;
            counter.textContent = `${current} / ${max}`;

            // Add warning class if near limit
            if (current > max * 0.9) {
                counter.classList.add('warning');
            } else {
                counter.classList.remove('warning');
            }
        }
    }

    setLoading(isLoading) {
        if (!this.submitBtn) return;

        this.submitBtn.disabled = isLoading;

        if (isLoading) {
            this.submitBtn.classList.add('loading');
        } else {
            this.submitBtn.classList.remove('loading');
        }
    }

    showFeedback(message, type) {
        if (!this.feedback) {
            // Create feedback element if it doesn't exist
            this.feedback = document.createElement('div');
            this.feedback.id = 'formFeedback';
            this.feedback.className = 'form-feedback';
            this.form.parentElement.appendChild(this.feedback);
        }

        this.feedback.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                ${type === 'success'
                ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
                : '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
            }
            </svg>
            <span>${message}</span>
        `;

        this.feedback.className = `form-feedback ${type} show`;

        // Scroll to feedback
        this.feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Auto hide after 8 seconds
        setTimeout(() => {
            this.feedback.classList.remove('show');
        }, 8000);
    }

    trackFormSubmit(formData) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'Contact',
                event_label: formData.serviceType,
                value: 1
            });
        }

        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: formData.serviceType
            });
        }
    }
}

// ===================================
// INITIALIZE FORM
// ===================================
window.contactFormManager = new ContactFormManager();

// ===================================
// EMAILJS INITIALIZATION HELPER
// ===================================
window.initEmailJS = function (publicKey) {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(publicKey);
        console.log('✅ EmailJS initialized');
    } else {
        console.warn('EmailJS library not loaded');
    }
};

// ===================================
// CONFIGURE EMAILJS (Call this with your credentials)
// ===================================
window.configureEmailJS = function (serviceId, templateId, publicKey) {
    if (window.contactFormManager) {
        window.contactFormManager.EMAILJS_SERVICE_ID = serviceId;
        window.contactFormManager.EMAILJS_TEMPLATE_ID = templateId;
        window.contactFormManager.EMAILJS_PUBLIC_KEY = publicKey;
        console.log('✅ EmailJS configured');
    }
};
