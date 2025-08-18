/* ========================================
   MOBILE PERFORMANCE FIX - NK Insurance
   Optimización de animaciones para móvil
   ======================================== */

/**
 * Mobile Performance Optimizer
 * Detecta móvil y ajusta animaciones para mejor rendimiento
 */
(function() {
    'use strict';
    
    // Detectar si es móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                     || window.innerWidth <= 768;
    
    if (!isMobile) {
        // Si no es móvil, salir
        return;
    }
    
    console.log('Mobile detected - Optimizing animations...');
    
    // ========================================
    // 1. SIMPLIFICAR ANIMACIONES EN MÓVIL
    // ========================================
    
    // Esperar a que el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
        
        // Reducir complejidad de animaciones
        const style = document.createElement('style');
        style.innerHTML = `
            /* Animaciones más rápidas en móvil */
            @media (max-width: 768px) {
                * {
                    /* Reducir duración de todas las transiciones */
                    transition-duration: 0.3s !important;
                    animation-duration: 0.3s !important;
                }
                
                /* Eliminar delays en móvil */
                .feature-card,
                .service-card,
                .benefit-card,
                .testimonial-card {
                    transition-delay: 0s !important;
                    animation-delay: 0s !important;
                }
                
                /* Simplificar transformaciones */
                .animate-in {
                    transform: translateY(10px) !important;
                }
                
                /* Desactivar parallax en móvil */
                [data-parallax] {
                    transform: none !important;
                }
                
                /* Desactivar efectos hover complejos */
                .card:hover {
                    transform: translateY(-2px) !important;
                }
                
                /* Simplificar sombras */
                .card,
                .btn {
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
                }
                
                /* Desactivar animaciones de fondo */
                .hero::before,
                .hero::after {
                    animation: none !important;
                }
                
                /* Reducir blur y efectos pesados */
                .hero-card,
                .feature-card {
                    backdrop-filter: none !important;
                }
            }
            
            /* Para dispositivos con poco poder de procesamiento */
            @media (max-width: 768px) and (hover: none) {
                /* Eliminar todos los efectos hover */
                *:hover {
                    transform: none !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        // ========================================
        // 2. OPTIMIZAR INTERSECTION OBSERVER
        // ========================================
        
        // Override del observer para móvil
        const animatedElements = document.querySelectorAll(`
            .feature-card,
            .service-card,
            .benefit-card,
            .testimonial-card
        `);
        
        if (animatedElements.length > 0) {
            // Crear un observer más simple para móvil
            const mobileObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animación más simple
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        mobileObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.05, // Más sensible en móvil
                rootMargin: '50px' // Más margen para pre-cargar
            });
            
            // Re-observar elementos con configuración móvil
            animatedElements.forEach(element => {
                // Reset y simplificar
                element.style.transition = 'all 0.3s ease';
                element.style.transitionDelay = '0s';
                
                // Observar con nueva configuración
                if (element.style.opacity === '0') {
                    mobileObserver.observe(element);
                }
            });
        }
        
        // ========================================
        // 3. DESACTIVAR ANIMACIONES PESADAS
        // ========================================
        
        // Desactivar typewriter en móvil
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && heroTitle.dataset.typewriter !== 'false') {
            heroTitle.style.opacity = '1';
        }
        
        // Desactivar parallax
        window.removeEventListener('scroll', window.updateParallax);
        
        // Simplificar número de animaciones
        const numbers = document.querySelectorAll('[data-animate-number]');
        numbers.forEach(number => {
            const target = number.dataset.animateNumber || number.textContent;
            number.textContent = target; // Mostrar directamente sin animar
        });
        
        // ========================================
        // 4. OPTIMIZAR IMÁGENES
        // ========================================
        
        // Lazy loading más agresivo en móvil
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.loading) {
                img.loading = 'lazy';
            }
        });
        
        // ========================================
        // 5. REDUCIR REPINTADOS
        // ========================================
        
        // Usar transform en lugar de top/left
        const fixedElements = document.querySelectorAll('.navbar, .hero-card');
        fixedElements.forEach(el => {
            el.style.willChange = 'transform';
        });
        
        // ========================================
        // 6. DEBOUNCE SCROLL EVENTS
        // ========================================
        
        let scrollTimeout;
        const scrollEvents = ['scroll', 'resize'];
        
        scrollEvents.forEach(eventName => {
            const originalHandler = window[`on${eventName}`];
            if (originalHandler) {
                window[`on${eventName}`] = function(e) {
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        originalHandler.call(window, e);
                    }, 100); // Debounce de 100ms
                };
            }
        });
        
    });
    
    // ========================================
    // 7. PERFORMANCE MONITORING
    // ========================================
    
    // Log performance metrics
    window.addEventListener('load', function() {
        if (window.performance && window.performance.timing) {
            const loadTime = window.performance.timing.loadEventEnd - 
                           window.performance.timing.navigationStart;
            console.log(`Mobile page load time: ${loadTime}ms`);
            
            // Si la carga es muy lenta, desactivar más animaciones
            if (loadTime > 3000) {
                document.documentElement.classList.add('slow-device');
                
                const slowStyle = document.createElement('style');
                slowStyle.innerHTML = `
                    .slow-device * {
                        animation: none !important;
                        transition: none !important;
                    }
                `;
                document.head.appendChild(slowStyle);
            }
        }
    });
    
    // ========================================
    // 8. TOUCH OPTIMIZATIONS
    // ========================================
    
    // Mejorar respuesta táctil
    document.addEventListener('touchstart', function() {}, {passive: true});
    document.addEventListener('touchmove', function() {}, {passive: true});
    
    // Prevenir zoom no deseado en inputs
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.fontSize = '16px'; // Previene zoom en iOS
        });
    });
    
})();

// ========================================
// EXPORT PARA USO GLOBAL
// ========================================
window.mobileOptimizer = {
    // Función para forzar optimización
    optimize: function() {
        document.documentElement.classList.add('mobile-optimized');
    },
    
    // Función para verificar si es móvil
    isMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
               || window.innerWidth <= 768;
    },
    
    // Función para desactivar todas las animaciones
    disableAllAnimations: function() {
        const style = document.createElement('style');
        style.innerHTML = `
            * {
                animation: none !important;
                transition: none !important;
            }
        `;
        document.head.appendChild(style);
    }
};