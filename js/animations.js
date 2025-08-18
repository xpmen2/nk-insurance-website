/* ========================================
   ANIMATIONS.JS - NK Insurance
   Scroll Animations and Interactions
   ======================================== */

/**
 * Initialize all animations
 */
function initAnimations() {
    'use strict';
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Initialize hover animations
    initHoverAnimations();
    
    // Initialize text animations
    initTextAnimations();
    
    // Initialize loading animations
    initLoadingAnimations();
}

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    // Elements to animate
    const animatedElements = document.querySelectorAll(`
        .feature-card,
        .service-card,
        .benefit-card,
        .testimonial-card,
        .office-card,
        .about-content,
        .about-images,
        .recruitment-card,
        .section-header,
        .quote-form-wrapper,
        .contact-form-wrapper
    `);
    
    if (animatedElements.length === 0) return;
    
    // Observer options
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.classList.add('animate-in');
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements
    animatedElements.forEach((element, index) => {
        // Add initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Add staggered delay for card groups
        if (element.classList.contains('feature-card') || 
            element.classList.contains('service-card') || 
            element.classList.contains('benefit-card')) {
            element.style.transitionDelay = `${index * 0.1}s`;
        }
        
        observer.observe(element);
    });
    
    // Add CSS for animated state
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Parallax scrolling effects
 */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    // Use throttle for performance
    const handleParallax = window.nkUtils ? 
        window.nkUtils.throttle(updateParallax, 16) : 
        updateParallax;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Only apply on desktop
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', handleParallax);
    }
    
    // Remove on mobile
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            window.removeEventListener('scroll', handleParallax);
            parallaxElements.forEach(element => {
                element.style.transform = '';
            });
        } else {
            window.addEventListener('scroll', handleParallax);
        }
    });
}

/**
 * Enhanced hover animations
 */
function initHoverAnimations() {
    // Cards with 3D hover effect
    const cards = document.querySelectorAll('.feature-card, .service-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(10px)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

/**
 * Text animations
 */
function initTextAnimations() {
    // Typewriter effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle && heroTitle.dataset.typewriter !== 'false') {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.minHeight = '1.2em';
        
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start after a delay
        setTimeout(typeWriter, 500);
    }
    
    // Animated numbers
    const numbers = document.querySelectorAll('[data-animate-number]');
    
    numbers.forEach(number => {
        const target = parseInt(number.dataset.animateNumber || number.textContent);
        const duration = parseInt(number.dataset.duration || 2000);
        const start = 0;
        const increment = target / (duration / 16);
        
        let current = start;
        
        const updateNumber = () => {
            current += increment;
            
            if (current < target) {
                number.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target.toLocaleString();
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !number.classList.contains('animated')) {
                    number.classList.add('animated');
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(number);
    });
}

/**
 * Loading animations
 */
function initLoadingAnimations() {
    // Skeleton loading for images
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (!img.complete) {
            img.classList.add('skeleton-loading');
            
            img.addEventListener('load', function() {
                this.classList.remove('skeleton-loading');
                this.classList.add('image-loaded');
            });
        }
    });
    
    // Add skeleton loading CSS
    const skeletonStyle = document.createElement('style');
    skeletonStyle.textContent = `
        .skeleton-loading {
            background: linear-gradient(
                90deg,
                #f0f0f0 25%,
                #e0e0e0 50%,
                #f0f0f0 75%
            );
            background-size: 200% 100%;
            animation: skeleton-shimmer 1.5s infinite;
        }
        
        @keyframes skeleton-shimmer {
            0% {
                background-position: 200% 0;
            }
            100% {
                background-position: -200% 0;
            }
        }
        
        .image-loaded {
            animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(skeletonStyle);
    
    // Progress bar for page load
    const progressBar = document.createElement('div');
    progressBar.className = 'page-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--secondary), var(--accent));
        width: 0;
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress based on page load
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                progressBar.style.opacity = '0';
                setTimeout(() => {
                    progressBar.remove();
                }, 300);
            }, 500);
        }
        
        progressBar.style.width = `${progress}%`;
    }, 300);
    
    // Complete on window load
    window.addEventListener('load', () => {
        progress = 100;
        progressBar.style.width = '100%';
    });
}

/**
 * Custom cursor (optional premium feature)
 */
function initCustomCursor() {
    // Only on desktop
    if (window.innerWidth <= 768) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--secondary);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX - 10}px`;
        cursor.style.top = `${e.clientY - 10}px`;
    });
    
    // Scale on hover
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Make function available globally
window.initAnimations = initAnimations;