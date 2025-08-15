/* ========================================
   FORMS.JS - NK Insurance
   Form Validation and Submission
   ======================================== */

/**
 * Initialize all forms
 */
function initForms() {
    'use strict';
    
    // Initialize quote form
    initQuoteForm();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize newsletter form
    initNewsletterForm();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize phone number formatting
    initPhoneFormatting();
}

/**
 * Quote Form Multi-step Functionality
 */
function initQuoteForm() {
    const quoteForm = document.getElementById('quoteForm');
    
    if (!quoteForm) return;
    
    const steps = quoteForm.querySelectorAll('.form-step');
    const nextBtns = quoteForm.querySelectorAll('.btn-next');
    const prevBtns = quoteForm.querySelectorAll('.btn-prev');
    const submitBtn = quoteForm.querySelector('.btn-submit');
    const progressBar = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    let currentStep = 1;
    const totalSteps = steps.length;
    
    // Show specific step
    function showStep(stepNumber) {
        steps.forEach(step => {
            step.classList.remove('active');
        });
        
        const targetStep = quoteForm.querySelector(`.form-step[data-step="${stepNumber}"]`);
        if (targetStep) {
            targetStep.classList.add('active');
        }
        
        // Update progress
        updateProgress(stepNumber);
        
        // Show/hide navigation buttons
        updateNavButtons(stepNumber);
        
        // Update summary if on last step
        if (stepNumber === totalSteps) {
            updateSummary();
        }
    }
    
    // Update progress bar
    function updateProgress(step) {
        const progress = (step / totalSteps) * 100;
        
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        if (progressText) {
            progressText.textContent = `Paso ${step} de ${totalSteps}`;
        }
    }
    
    // Update navigation buttons visibility
    function updateNavButtons(step) {
        // Previous button
        prevBtns.forEach(btn => {
            btn.style.display = step === 1 ? 'none' : 'block';
        });
        
        // Next button
        nextBtns.forEach(btn => {
            btn.style.display = step === totalSteps ? 'none' : 'block';
        });
        
        // Submit button
        if (submitBtn) {
            submitBtn.style.display = step === totalSteps ? 'block' : 'none';
        }
    }
    
    // Validate current step
    function validateStep(stepNumber) {
        const currentStepElement = quoteForm.querySelector(`.form-step[data-step="${stepNumber}"]`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showFieldError(field, 'Este campo es requerido');
            } else {
                clearFieldError(field);
            }
            
            // Email validation
            if (field.type === 'email' && !isValidEmail(field.value)) {
                isValid = false;
                showFieldError(field, 'Por favor ingresa un email válido');
            }
            
            // Phone validation
            if (field.type === 'tel' && !isValidPhone(field.value)) {
                isValid = false;
                showFieldError(field, 'Por favor ingresa un teléfono válido');
            }
        });
        
        return isValid;
    }
    
    // Update summary on last step
    function updateSummary() {
        const summaryContent = quoteForm.querySelector('.summary-content');
        
        if (!summaryContent) return;
        
        const formData = new FormData(quoteForm);
        let summaryHTML = '';
        
        // Build summary HTML
        const fields = [
            { name: 'firstName', label: 'Nombre' },
            { name: 'lastName', label: 'Apellido' },
            { name: 'email', label: 'Email' },
            { name: 'phone', label: 'Teléfono' },
            { name: 'zipCode', label: 'Código Postal' },
            { name: 'householdSize', label: 'Tamaño del Hogar' },
            { name: 'income', label: 'Ingreso Anual' },
            { name: 'coverageNeeded', label: 'Cobertura Para' }
        ];
        
        fields.forEach(field => {
            const value = formData.get(field.name);
            if (value) {
                summaryHTML += `
                    <div class="summary-item">
                        <span class="summary-label">${field.label}:</span>
                        <span class="summary-value">${value}</span>
                    </div>
                `;
            }
        });
        
        summaryContent.innerHTML = summaryHTML;
    }
    
    // Next button click
    nextBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
                
                // Scroll to form top
                quoteForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Previous button click
    prevBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            currentStep--;
            showStep(currentStep);
            
            // Scroll to form top
            quoteForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
    
    // Form submission
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateStep(currentStep)) {
            return;
        }
        
        // Get form data
        const formData = new FormData(this);
        
        // Show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
        }
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message
            showSuccessMessage('¡Gracias por tu solicitud! Un agente se pondrá en contacto contigo en las próximas 24 horas.');
            
            // Reset form
            quoteForm.reset();
            currentStep = 1;
            showStep(currentStep);
            
            // Reset button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Obtener Mi Cotización Gratis';
            }
        }, 2000);
        
        // In production, you would send the data to your server
        console.log('Quote form data:', Object.fromEntries(formData));
    });
    
    // Initialize first step
    showStep(currentStep);
}

/**
 * Contact Form
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm(this)) {
            return;
        }
        
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        
        // Show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
        }
        
        // Simulate form submission
        setTimeout(() => {
            showSuccessMessage('¡Mensaje enviado con éxito! Te responderemos pronto.');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Mensaje';
            }
        }, 1500);
        
        console.log('Contact form data:', Object.fromEntries(formData));
    });
}

/**
 * Newsletter Form
 */
function initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            if (!emailInput || !isValidEmail(emailInput.value)) {
                showFieldError(emailInput, 'Por favor ingresa un email válido');
                return;
            }
            
            clearFieldError(emailInput);
            
            // Show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Suscribiendo...';
            }
            
            // Simulate subscription
            setTimeout(() => {
                showSuccessMessage('¡Gracias por suscribirte! Revisa tu email para confirmar.');
                
                // Reset form
                this.reset();
                
                // Reset button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Suscribirse';
                }
            }, 1500);
            
            console.log('Newsletter subscription:', emailInput.value);
        });
    });
}

/**
 * General form validation
 */
function initFormValidation() {
    // Real-time validation for all forms
    document.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

/**
 * Validate single field
 */
function validateField(field) {
    // Required field
    if (field.hasAttribute('required') && !field.value.trim()) {
        showFieldError(field, 'Este campo es requerido');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        showFieldError(field, 'Por favor ingresa un email válido');
        return false;
    }
    
    // Phone validation
    if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
        showFieldError(field, 'Por favor ingresa un teléfono válido');
        return false;
    }
    
    // Min length validation
    if (field.minLength && field.value.length < field.minLength) {
        showFieldError(field, `Mínimo ${field.minLength} caracteres`);
        return false;
    }
    
    clearFieldError(field);
    return true;
}

/**
 * Validate entire form
 */
function validateForm(form) {
    const fields = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Phone number formatting
 */
function initPhoneFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else if (value.length <= 10) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            
            e.target.value = value;
        });
    });
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    
    if (!formGroup) return;
    
    field.classList.add('error');
    formGroup.classList.add('error');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
}

/**
 * Clear field error
 */
function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    
    if (!formGroup) return;
    
    field.classList.remove('error');
    formGroup.classList.remove('error');
    
    const errorElement = formGroup.querySelector('.form-error');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Show success message
 */
function showSuccessMessage(message) {
    // Create success element
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✓</span>
            <p>${message}</p>
        </div>
    `;
    
    // Add styles
    successElement.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00D4AA, #00A884);
        color: white;
        padding: 20px 30px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 212, 170, 0.3);
        z-index: 9999;
        animation: slideInRight 0.5s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(successElement);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successElement.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            successElement.remove();
        }, 500);
    }, 5000);
}

/**
 * Email validation
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Phone validation
 */
function isValidPhone(phone) {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Make function available globally
window.initForms = initForms;