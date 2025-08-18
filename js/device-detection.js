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
        // Detección simplificada y más confiable
        isMobile: function() {
            // Primero verificar viewport
            if (window.innerWidth <= 768) {
                return true;
            }
            
            // Luego User Agent
            if (/Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true;
            }
            
            // Verificar touch + tamaño
            const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
            const smallScreen = window.innerWidth <= 992;
            
            return hasTouch && smallScreen;
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
            /* ===== OPTIMIZACIONES BALANCEADAS PARA TOUCH DEVICES ===== */
            
            /* Animaciones optimizadas pero visibles */
            .is-touch .feature-card,
            .is-touch .service-card,
            .is-touch .benefit-card,
            .is-touch .testimonial-card,
            .is-mobile .feature-card,
            .is-mobile .service-card,
            .is-mobile .benefit-card,
            .is-mobile .testimonial-card {
                transition: all 0.4s ease !important; /* Más rápido pero visible */
                transition-delay: 0s !important; /* Sin delay entre cards */
            }
            
            /* Mantener animaciones suaves para badges */
            .is-touch .hero-badge,
            .is-touch .about-badge,
            .is-touch .card-content,
            .is-mobile .hero-badge,
            .is-mobile .about-badge,
            .is-mobile .card-content {
                animation-duration: 3s !important; /* Mantener suave como desktop */
                transition-duration: 0.6s !important;
            }
            
            /* Animación de float para badges - mantener suave */
            @keyframes float {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-10px);
                }
            }
            
            /* Animación de pulse para badges - mantener suave */
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.05);
                    opacity: 0.9;
                }
            }
            
            /* Optimizar entrada de elementos al scroll */
            .is-touch .animate-in,
            .is-mobile .animate-in {
                transition: opacity 0.4s ease, transform 0.4s ease !important;
            }
            
            /* Reducir desplazamiento inicial */
            .is-touch [style*="translateY(20px)"],
            .is-mobile [style*="translateY(20px)"] {
                transform: translateY(10px) !important;
            }
            
            /* Hover effects simples pero presentes */
            .is-touch .card:active,
            .is-mobile .card:active {
                transform: translateY(-3px) !important;
                transition: transform 0.2s ease !important;
            }
            
            /* Mantener parallax desactivado */
            .is-touch [data-parallax],
            .is-mobile [data-parallax] {
                transform: none !important;
            }
            
            /* Optimizar sombras sin eliminarlas */
            .is-touch .card,
            .is-mobile .card {
                box-shadow: 0 4px 8px rgba(0,0,0,0.08) !important;
            }
            
            .is-touch .card:hover,
            .is-mobile .card:active {
                box-shadow: 0 6px 12px rgba(0,0,0,0.12) !important;
            }
            
            /* Animaciones de fondo del hero más sutiles */
            .is-touch .hero::before,
            .is-touch .hero::after,
            .is-mobile .hero::before,
            .is-mobile .hero::after {
                animation-duration: 30s !important; /* Más lento para menos distracción */
                opacity: 0.5 !important;
            }
            
            /* Mejorar performance de scroll */
            .is-touch *,
            .is-mobile * {
                -webkit-overflow-scrolling: touch;
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
            }
            
            /* Para móviles de alta resolución */
            .is-high-res.is-touch .feature-card,
            .is-high-res.is-touch .service-card {
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
            // Crear un observer optimizado para móvil
            const mobileObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Aplicar animación con un pequeño delay secuencial
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                            entry.target.classList.add('animate-in');
                        }, index * 50); // 50ms entre cada elemento
                        
                        mobileObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.05,
                rootMargin: '0px 0px -30px 0px' // Activar un poco antes
            });
            
            // Preparar elementos para animación
            animatedElements.forEach(element => {
                // Si el elemento ya está en viewport, mostrarlo
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    // Ya visible, mostrar sin animación
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                } else {
                    // Preparar para animación
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(10px)';
                    element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    mobileObserver.observe(element);
                }
            });
        }
        
        // Mantener typewriter pero más rápido
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && heroTitle.dataset.typewriter !== 'false') {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            let index = 0;
            
            function quickTypewriter() {
                if (index < text.length) {
                    heroTitle.textContent += text.charAt(index);
                    index++;
                    setTimeout(quickTypewriter, 20); // Más rápido en móvil
                }
            }
            
            setTimeout(quickTypewriter, 200);
        }
        
        // Números animados más rápidos
        const numbers = document.querySelectorAll('[data-animate-number]');
        numbers.forEach(number => {
            const target = parseInt(number.dataset.animateNumber || number.textContent);
            const duration = 800; // Más rápido en móvil
            let current = 0;
            const increment = target / (duration / 16);
            
            const updateNumber = () => {
                current += increment;
                if (current < target) {
                    number.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateNumber);
                } else {
                    number.textContent = target.toLocaleString();
                }
            };
            
            // Iniciar cuando sea visible
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
    
    // Ejecutar inmediatamente para dispositivos móviles
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        // DOM ya cargado
        initialize();
    }
    
    function initialize() {
        // Actualizar info del dispositivo
        updateDeviceInfo();
        
        // Aplicar optimizaciones
        applyOptimizations();
        
        // Forzar aplicación de estilos
        setTimeout(() => {
            // Re-aplicar en caso de que los estilos no se hayan aplicado
            if (deviceDetector.isMobile() || deviceDetector.isTouchDevice()) {
                console.log('Forcing mobile optimizations...');
                document.body.classList.add('is-mobile');
                document.body.classList.add('is-touch');
            }
        }, 100);
        
        // Actualizar en resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                updateDeviceInfo();
                applyOptimizations();
            }, 250);
        });
    }
    
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