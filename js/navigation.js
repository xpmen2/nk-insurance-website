/* ========================================
   NAVIGATION.JS - NK Insurance
   Navigation Menu Functionality
   ======================================== */

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    'use strict';
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Sticky navigation
    initStickyNav();
    
    // Active link highlighting
    initActiveLinks();
    
    // Dropdown menus (if any)
    initDropdowns();
}

/**
 * Mobile menu toggle functionality
 */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) return;
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Sticky navigation on scroll
 */
function initStickyNav() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    let lastScrollTop = 0;
    const scrollThreshold = 100;
    
    // Use throttle from utilities if available
    const handleScroll = window.nkUtils ? 
        window.nkUtils.throttle(onScroll, 100) : 
        onScroll;
    
    function onScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navigation on scroll (optional)
        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down - hide nav
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show nav
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
    
    window.addEventListener('scroll', handleScroll);
}

/**
 * Highlight active navigation links based on scroll position
 */
function initActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const observerOptions = {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to matching link
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Initialize dropdown menus
 */
function initDropdowns() {
    const dropdownToggles = document.querySelectorAll('.nav-item.has-dropdown');
    
    if (dropdownToggles.length === 0) return;
    
    dropdownToggles.forEach(toggle => {
        const dropdown = toggle.querySelector('.nav-dropdown');
        
        if (!dropdown) return;
        
        // Mouse events for desktop
        toggle.addEventListener('mouseenter', function() {
            if (window.innerWidth > 991) {
                dropdown.style.display = 'block';
                setTimeout(() => {
                    dropdown.classList.add('show');
                }, 10);
            }
        });
        
        toggle.addEventListener('mouseleave', function() {
            if (window.innerWidth > 991) {
                dropdown.classList.remove('show');
                setTimeout(() => {
                    dropdown.style.display = '';
                }, 300);
            }
        });
        
        // Click event for mobile
        const link = toggle.querySelector('.nav-link');
        
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 991) {
                    e.preventDefault();
                    dropdown.classList.toggle('show');
                    
                    // Close other dropdowns
                    dropdownToggles.forEach(otherToggle => {
                        if (otherToggle !== toggle) {
                            const otherDropdown = otherToggle.querySelector('.nav-dropdown');
                            if (otherDropdown) {
                                otherDropdown.classList.remove('show');
                            }
                        }
                    });
                }
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item.has-dropdown')) {
            document.querySelectorAll('.nav-dropdown.show').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });
}

// Make function available globally
window.initNavigation = initNavigation;