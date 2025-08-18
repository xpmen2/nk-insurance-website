/* ========================================
   DEVICE DETECTION & OPTIMIZATION - NK Insurance
   Detección mejorada y optimización de rendimiento
   ======================================== */

(function() {
    'use strict';
    
    // ========================================
    // DETECCIÓN AVANZADA DE DISPOSITIVO
    // ========================================
    
    const deviceDetector = {
        // Detección más precisa
        isMobile: function() {
            // Check 1: User Agent
            const userAgentCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            // Check 2: Touch capability
            const touchCheck = ('ontouchstart' in window) || 
                             (navigator.maxTouchPoints > 0) || 
                             (navigator.msMaxTouchPoints > 0);
            
            // Check 3: Screen size (considerando alta resolución)
            const screenCheck = window.matchMedia("(max-width: 768px)").matches;
            
            // Check 4: Orientation
            const hasOrientation = typeof window.orientation !== 'undefined';
            
            // Check 5: Pointer coarse (touch screens)
            const pointerCheck = window.matchMedia("(pointer: coarse)").matches;
            
            // Es móvil si tiene touch Y (es pequeño O tiene user agent móvil O pointer coarse)
            return touchCheck && (userAgentCheck || screenCheck || pointerCheck || hasOrientation);
        },
        
        isTablet: function() {
            const isIPad = /iPad/i.test(navigator.userAgent);
            const isAndroidTablet = /Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent);
            const screenSize = window.innerWidth >= 768 && window.innerWidth <= 1024;
            
            return (isIPad || isAndroidTablet) || (this.isTouchDevice() && screenSize);
        },
        
        isTouchDevice: function() {
            return ('ontouchstart' in window) || 
                   (navigator.maxTouchPoints > 0) || 
                   (navigator.msMaxTouchPoints > 0);
        },
        
        isHighResolution: function() {
            return window.devicePixelRatio > 1.5;
        },
        
        isSlowDevice: function() {
            // Detectar dispositivos lentos
            const memory = navigator.deviceMemory; // RAM en GB
            const cores = navigator.hardwareConcurrency; // Número de cores
            
            return (memory && memory < 4) || (cores && cores < 4);
        },
        
        getDeviceType: function() {
            if (this.isMobile()) return 'Móvil';
            if (this.isTablet()) return 'Tablet';
            if (this.isTouchDevice()) return 'Touch Desktop';
            return 'Desktop';
        },
        
        getScreenResolution: function() {
            return `${screen.width}x${screen.height}`;
        },
        
        getViewportSize: function() {
            return `${window.innerWidth}x${window.innerHeight}`;
        },
        
        getPixelRatio: function() {
            return window.devicePixelRatio || 1;
        }
    };
    
    // ========================================
    // MOSTRAR INFO EN FOOTER
    // ========================================
    
    function updateDeviceInfo() {
        const deviceType = document.getElementById('deviceType');
        const screenRes = document.getElementById('screenRes');
        const viewportSize = document.getElementById('viewportSize');
        const touchDevice = document.getElementById('touchDevice');
        
        if (deviceType) {
            deviceType.textContent = `Conectado desde: ${deviceDetector.getDeviceType()}`;
        }
        
        if (screenRes) {
            screenRes.textContent = `Res: ${deviceDetector.getScreenResolution()}@${deviceDetector.getPixelRatio()}x`;
        }
        
        if (viewportSize) {
            viewportSize.textContent = `Viewport: ${deviceDetector.getViewportSize()}`;
        }
        
        if (touchDevice) {
            touchDevice.textContent = deviceDetector.isTouchDevice() ? 'Touch: Sí' : 'Touch: No';
        }
    }
    
    // ========================================
    // OPTIMIZACIÓN BASADA EN DETECCIÓN
    // ========================================
    
    function applyOptimizations() {
        const isMobile = deviceDetector.isMobile();
        const isTablet = deviceDetector.isTablet();
        const isTouchDevice = deviceDetector.isTouchDevice();
        const isSlowDevice = deviceDetector.isSlowDevice();
        const isHighRes = deviceDetector.isHighResolution();
        
        console.log('Device Detection:', {
            mobile: isMobile,
            tablet: isTablet,
            touch: isTouchDevice,
            slow: isSlowDevice,
            highRes: isHighRes,
            screen: deviceDetector.getScreenResolution(),
            viewport: deviceDetector.getViewportSize()
        });
        
        // Aplicar clases al body para CSS condicional
        document.body.classList.toggle('is-mobile', isMobile);
        document.body.classList.toggle('is-tablet', isTablet);
        document.body.classList.toggle('is-touch', isTouchDevice);
        document.body.classList.toggle('is-slow-device', isSlowDevice);
        document.body.classList.toggle('is-high-res', isHighRes && isTouchDevice);
        
        // OPTIMIZACIONES PARA DISPOSITIVOS TÁCTILES (incluye móviles de alta resolución)
        if (isTouchDevice || isMobile) {
            optimizeForTouch();
        }
        
        // OPTIMIZACIONES EXTRA PARA DISPOSITIVOS LENTOS
        if (isSlowDevice) {
            extremeOptimization();
        }
    }
    
    // ========================================
    // OPTIMIZACIÓN PARA DISPOSITIVOS TÁCTILES
    // ========================================
    
    function optimizeForTouch() {
        console.log('Applying touch device optimizations...');
        
        // Crear estilos optimizados
        const style = document.createElement('style');
        style.innerHTML = `
            /* ===== OPTIMIZACIONES PARA TOUCH DEVICES ===== */
            
            /* Animaciones más rápidas */
            .is-touch *,
            .is-mobile * {
                transition-duration: 0.2s !important;
                animation-duration: 0.3s !important;
            }
            
            /* Eliminar TODOS los delays en cards */
            .is-touch .feature-card,
            .is-touch .service-card,
            .is-touch .benefit-card,
            .is-touch .testimonial-card,
            .is-mobile .feature-card,
            .is-mobile .service-card,
            .is-mobile .benefit-card,
            .is-mobile .testimonial-card {
                transition-delay: 0s !important;
                animation-delay: 0s !important;
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            /* Hacer que aparezcan inmediatamente */
            .is-touch .animate-in,
            .is-mobile .animate-in {
                opacity: 1 !important;
                transform: none !important;
                transition: none !important;
            }
            
            /* Desactivar animaciones de scroll */
            .is-touch [data-aos],
            .is-mobile [data-aos] {
                opacity: 1 !important;
                transform: none !important;
            }
            
            /* Simplificar hover effects */
            .is-touch .card:hover,
            .is-mobile .card:hover {
                transform: translateY(-2px) !important;
            }
            
            /* Desactivar parallax */
            .is-touch [data-parallax],
            .is-mobile [data-parallax] {
                transform: none !important;
            }
            
            /* Optimizar sombras */
            .is-touch .card,
            .is-touch .btn,
            .is-mobile .card,
            .is-mobile .btn {
                box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
            }
            
            /* Desactivar animaciones de fondo del hero */
            .is-touch .hero::before,
            .is-touch .hero::after,
            .is-mobile .hero::before,
            .is-mobile .hero::after {
                display: none !important;
            }
            
            /* Mejorar performance de scroll */
            .is-touch *,
            .is-mobile * {
                -webkit-overflow-scrolling: touch;
            }
            
            /* Para móviles de alta resolución como el tuyo */
            .is-high-res.is-touch .feature-card,
            .is-high-res.is-touch .service-card {
                will-change: auto !important;
                transform: translateZ(0);
            }
        `;
        document.head.appendChild(style);
        
        // Modificar el JavaScript de animaciones
        modifyAnimations();
    }
    
    // ========================================
    // MODIFICAR ANIMACIONES EXISTENTES
    // ========================================
    
    function modifyAnimations() {
        // Sobrescribir el observer para dispositivos táctiles
        const animatedElements = document.querySelectorAll(`
            .feature-card,
            .service-card,
            .benefit-card,
            .testimonial-card,
            .office-card,
            .about-content,
            .about-images,
            .recruitment-card
        `);
        
        if (animatedElements.length > 0) {
            // Hacer todo visible inmediatamente
            animatedElements.forEach(element => {
                element.style.opacity = '1';
                element.style.transform = 'none';
                element.style.transition = 'opacity 0.2s ease';
                element.style.transitionDelay = '0s';
                element.classList.add('animate-in');
            });
            
            // Crear un observer simplificado
            const simpleObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        simpleObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.01,
                rootMargin: '100px'
            });
            
            // Solo observar elementos que aún no son visibles
            animatedElements.forEach(element => {
                if (element.getBoundingClientRect().top > window.innerHeight) {
                    element.style.opacity = '0';
                    simpleObserver.observe(element);
                }
            });
        }
        
        // Desactivar typewriter
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.opacity = '1';
        }
        
        // Desactivar contador de números
        const numbers = document.querySelectorAll('[data-animate-number]');
        numbers.forEach(number => {
            const target = number.dataset.animateNumber || number.textContent;
            number.textContent = target;
        });
    }
    
    // ========================================
    // OPTIMIZACIÓN EXTREMA PARA DISPOSITIVOS LENTOS
    // ========================================
    
    function extremeOptimization() {
        console.log('Applying extreme optimizations for slow device...');
        
        const style = document.createElement('style');
        style.innerHTML = `
            .is-slow-device * {
                animation: none !important;
                transition: none !important;
            }
            
            .is-slow-device .hero::before,
            .is-slow-device .hero::after {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ========================================
    // INICIALIZACIÓN
    // ========================================
    
    document.addEventListener('DOMContentLoaded', function() {
        // Actualizar info del dispositivo
        updateDeviceInfo();
        
        // Aplicar optimizaciones
        applyOptimizations();
        
        // Actualizar en resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                updateDeviceInfo();
                applyOptimizations();
            }, 250);
        });
    });
    
    // ========================================
    // API PÚBLICA
    // ========================================
    
    window.deviceOptimizer = {
        detector: deviceDetector,
        update: updateDeviceInfo,
        optimize: applyOptimizations,
        forceOptimization: function() {
            optimizeForTouch();
        }
    };
    
})();