/* ========================================
   DIAGNOSTIC SCRIPT - NK Insurance
   Script para diagnosticar el problema de la franja blanca
   ======================================== */

(function() {
    'use strict';
    
    // Esperar a que cargue el DOM
    document.addEventListener('DOMContentLoaded', function() {
        
        // Función de diagnóstico
        function diagnoseWhiteStripe() {
            console.log('🔍 INICIANDO DIAGNÓSTICO DE FRANJA BLANCA...');
            
            // 1. Verificar viewport
            console.log('📏 Viewport:', {
                width: window.innerWidth,
                height: window.innerHeight,
                devicePixelRatio: window.devicePixelRatio
            });
            
            // 2. Verificar body
            const bodyStyles = window.getComputedStyle(document.body);
            console.log('📦 Body:', {
                margin: bodyStyles.margin,
                padding: bodyStyles.padding,
                width: bodyStyles.width,
                overflow: bodyStyles.overflow
            });
            
            // 3. Verificar hero
            const hero = document.querySelector('.hero');
            if (hero) {
                const heroStyles = window.getComputedStyle(hero);
                const heroRect = hero.getBoundingClientRect();
                
                console.log('🦸 Hero Element:', {
                    margin: heroStyles.margin,
                    marginLeft: heroStyles.marginLeft,
                    marginRight: heroStyles.marginRight,
                    padding: heroStyles.padding,
                    paddingLeft: heroStyles.paddingLeft,
                    paddingRight: heroStyles.paddingRight,
                    width: heroStyles.width,
                    position: heroStyles.position,
                    left: heroStyles.left,
                    right: heroStyles.right,
                    transform: heroStyles.transform,
                    background: heroStyles.background.substring(0, 50) + '...',
                    boundingRect: {
                        left: heroRect.left,
                        right: heroRect.right,
                        width: heroRect.width
                    }
                });
                
                // Verificar si hay margen izquierdo
                if (heroRect.left > 0) {
                    console.error('❌ PROBLEMA DETECTADO: Hero tiene margen izquierdo de ' + heroRect.left + 'px');
                }
                
                // Verificar ancho
                if (heroRect.width < window.innerWidth) {
                    console.error('❌ PROBLEMA DETECTADO: Hero no ocupa todo el ancho. Ancho actual: ' + heroRect.width + 'px, Viewport: ' + window.innerWidth + 'px');
                }
            }
            
            // 4. Buscar elementos que se desbordan
            console.log('🔍 Buscando elementos que se desbordan...');
            const allElements = document.querySelectorAll('*');
            let overflowingElements = [];
            
            allElements.forEach(function(element) {
                const rect = element.getBoundingClientRect();
                if (rect.width > window.innerWidth || rect.right > window.innerWidth) {
                    overflowingElements.push({
                        element: element,
                        class: element.className,
                        width: rect.width,
                        right: rect.right
                    });
                }
            });
            
            if (overflowingElements.length > 0) {
                console.warn('⚠️ Elementos que se desbordan:', overflowingElements);
            }
            
            // 5. Verificar container
            const container = hero ? hero.querySelector('.container') : null;
            if (container) {
                const containerStyles = window.getComputedStyle(container);
                console.log('📦 Container:', {
                    margin: containerStyles.margin,
                    padding: containerStyles.padding,
                    width: containerStyles.width,
                    maxWidth: containerStyles.maxWidth
                });
            }
            
            console.log('✅ Diagnóstico completado');
        }
        
        // Ejecutar diagnóstico
        diagnoseWhiteStripe();
        
        // Función para aplicar fix
        window.applyNuclearFix = function() {
            console.log('💣 Aplicando Nuclear Fix...');
            
            // Reset body
            document.body.style.cssText = 'margin: 0 !important; padding: 0 !important; width: 100% !important; overflow-x: hidden !important;';
            
            // Fix hero
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.cssText = 'margin: 0 !important; padding: 40px 0 !important; width: 100vw !important; position: relative !important; left: 0 !important; right: 0 !important; transform: none !important; background: linear-gradient(135deg, #0B2545 0%, #134E6F 50%, #0B2545 100%) !important;';
                
                // Fix container
                const container = hero.querySelector('.container');
                if (container) {
                    container.style.cssText = 'margin: 0 !important; padding: 0 15px !important; width: 100% !important; max-width: 100% !important;';
                }
            }
            
            console.log('✅ Nuclear Fix aplicado');
        };
        
        // Función para activar modo debug
        window.activateDebugMode = function() {
            document.body.classList.add('debug-mode');
            console.log('🐛 Modo debug activado - Bordes rojos visibles');
        };
        
        // Auto-fix si es móvil
        if (window.innerWidth <= 768) {
            console.log('📱 Dispositivo móvil detectado - Aplicando fixes...');
            
            // Intentar fix automático
            setTimeout(function() {
                const hero = document.querySelector('.hero');
                if (hero) {
                    const rect = hero.getBoundingClientRect();
                    if (rect.left > 0) {
                        console.log('🔧 Aplicando auto-fix para margen izquierdo...');
                        hero.style.marginLeft = '0';
                        hero.style.paddingLeft = '0';
                        hero.style.left = '0';
                        hero.style.transform = 'none';
                    }
                }
            }, 100);
        }
    });
    
})();