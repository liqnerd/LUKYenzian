// Create Unified Mobile Navigation
function createMobileNavigation() {
    console.log('Creating mobile navigation...');
    
    // Check if mobile nav already exists
    const existingMobileNav = document.querySelector('.mobile-nav-menu');
    if (existingMobileNav) {
        console.log('Mobile nav already exists');
        return existingMobileNav;
    }
    
    // Get all navigation items from both nav-left and nav-right
    const navLeft = document.querySelector('.nav-menu.nav-left');
    const navRight = document.querySelector('.nav-menu.nav-right');
    
    console.log('Nav left found:', !!navLeft);
    console.log('Nav right found:', !!navRight);
    
    if (!navLeft || !navRight) {
        console.error('Navigation elements not found!');
        return null;
    }
    
    // Create mobile navigation container
    const mobileNav = document.createElement('ul');
    mobileNav.className = 'mobile-nav-menu';
    
    // Get all links from both menus
    const allNavItems = [];
    
    // Add nav-left items (PRODEJNA, PŮJČOVNA, SERVIS)
    const leftItems = navLeft.querySelectorAll('.nav-item');
    console.log('Left items found:', leftItems.length);
    leftItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        if (link) {
            allNavItems.push({
                text: link.textContent,
                href: link.getAttribute('href'),
                isActive: link.classList.contains('active')
            });
        }
    });
    
    // Add nav-right items (KURZY, AKTUALITY, KONTAKT)
    const rightItems = navRight.querySelectorAll('.nav-item');
    console.log('Right items found:', rightItems.length);
    rightItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        if (link) {
            allNavItems.push({
                text: link.textContent,
                href: link.getAttribute('href'),
                isActive: link.classList.contains('active')
            });
        }
    });
    
    console.log('Total nav items:', allNavItems.length);
    
    // Create mobile menu items
    allNavItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'mobile-nav-item';
        
        const a = document.createElement('a');
        a.className = `mobile-nav-link ${item.isActive ? 'active' : ''}`;
        a.href = item.href;
        a.textContent = item.text;
        
        li.appendChild(a);
        mobileNav.appendChild(li);
    });
    
    // Insert mobile nav after nav-container
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        navContainer.parentNode.insertBefore(mobileNav, navContainer.nextSibling);
        console.log('Mobile navigation created successfully with', allNavItems.length, 'items');
        return mobileNav;
    } else {
        console.error('Nav container not found!');
        return null;
    }
}

// Mobile Navigation Toggle
let mobileNavMenu = null;
let isInitialized = false;

// Initialize mobile navigation with multiple fallbacks
function initializeMobileNav() {
    if (isInitialized) {
        console.log('Mobile nav already initialized');
        return;
    }
    
    console.log('Initializing mobile navigation...');
    
    const navToggle = document.querySelector('.nav-toggle');
    if (!navToggle) {
        console.error('Nav toggle not found!');
        return;
    }
    
    console.log('Nav toggle found, creating mobile navigation...');
    
    // Create mobile navigation
    mobileNavMenu = createMobileNavigation();
    
    if (!mobileNavMenu) {
        console.error('Failed to create mobile navigation');
        return;
    }
    
    // Add click handler for nav toggle (only once)
    navToggle.addEventListener('click', handleNavToggleClick);
    
    isInitialized = true;
    console.log('Mobile navigation initialized successfully');
}

// Handle nav toggle click
function handleNavToggleClick() {
    console.log('Nav toggle clicked');
    
    if (!mobileNavMenu) {
        console.log('Mobile nav not found, creating...');
        mobileNavMenu = createMobileNavigation();
    }
    
    if (mobileNavMenu) {
        const isActive = mobileNavMenu.classList.contains('active');
        console.log('Menu currently active:', isActive);
        
        mobileNavMenu.classList.toggle('active');
        document.querySelector('.nav-toggle').classList.toggle('active');
        
        // Prevent body scroll when menu is open
        const newIsActive = mobileNavMenu.classList.contains('active');
        document.body.style.overflow = newIsActive ? 'hidden' : 'auto';
        
        console.log('Menu toggled to:', newIsActive);
    } else {
        console.error('Mobile nav menu still not available');
    }
}

// Try multiple initialization methods
document.addEventListener('DOMContentLoaded', initializeMobileNav);

// Fallback initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMobileNav);
} else {
    // DOM is already loaded
    console.log('DOM already loaded, initializing immediately');
    initializeMobileNav();
}

// Additional fallback with timeout
setTimeout(() => {
    if (!isInitialized) {
        console.log('Fallback initialization after timeout...');
        initializeMobileNav();
    }
}, 1000);

// Debug function - can be called from browser console
window.debugMobileNav = function() {
    console.log('=== MOBILE NAV DEBUG INFO ===');
    console.log('Is initialized:', isInitialized);
    console.log('Mobile nav menu exists:', !!mobileNavMenu);
    console.log('Nav toggle exists:', !!document.querySelector('.nav-toggle'));
    console.log('Nav left exists:', !!document.querySelector('.nav-menu.nav-left'));
    console.log('Nav right exists:', !!document.querySelector('.nav-menu.nav-right'));
    console.log('Nav container exists:', !!document.querySelector('.nav-container'));
    
    const navLeft = document.querySelector('.nav-menu.nav-left');
    const navRight = document.querySelector('.nav-menu.nav-right');
    
    if (navLeft) {
        console.log('Nav left items:', navLeft.querySelectorAll('.nav-item').length);
    }
    if (navRight) {
        console.log('Nav right items:', navRight.querySelectorAll('.nav-item').length);
    }
    
    console.log('============================');
};

// Close mobile menu when clicking on a link
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('mobile-nav-link')) {
        if (mobileNavMenu) mobileNavMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && navToggle.classList.contains('active')) {
        if (mobileNavMenu) mobileNavMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Image Slider Functionality
class ImageSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }
    
    init() {
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Auto-play slider
        this.startAutoPlay();
        
        // Pause auto-play on hover
        const heroSlider = document.querySelector('.hero-slider');
        if (heroSlider) {
            heroSlider.addEventListener('mouseenter', () => this.stopAutoPlay());
            heroSlider.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Touch/swipe support
        this.addTouchSupport();
    }
    
    goToSlide(slideIndex) {
        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = slideIndex;
        
        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        const heroSlider = document.querySelector('.hero-slider');
        
        if (!heroSlider) return; // Exit if hero slider doesn't exist
        
        heroSlider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        heroSlider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
        
        heroSlider.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            heroSlider.style.cursor = 'grabbing';
        });
        
        heroSlider.addEventListener('mouseup', (e) => {
            endX = e.clientX;
            this.handleSwipe();
            heroSlider.style.cursor = 'grab';
        });
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide(); // Swipe left - next slide
            } else {
                this.prevSlide(); // Swipe right - previous slide
            }
        }
    }
}

// Header scroll effect (minimal since we don't scroll)
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize slider if hero elements exist (main page)
    if (document.querySelector('.hero-slider')) {
        new ImageSlider();
        
        // Add error handling for images
        const heroImages = document.querySelectorAll('.hero-image');
        heroImages.forEach((img, index) => {
            img.addEventListener('error', function() {
                console.warn(`Image ${index + 1} failed to load, trying fallback`);
                const fallback = this.getAttribute('data-fallback');
                if (fallback && this.src !== fallback) {
                    this.src = fallback;
                } else {
                    console.error(`All images failed for slide ${index + 1}`);
                    // Set a solid color background as final fallback
                    this.style.display = 'none';
                    this.parentElement.style.background = 'linear-gradient(135deg, #2c5530 0%, #8B7355 100%)';
                }
            });
            
            img.addEventListener('load', function() {
                console.log(`Image ${index + 1} loaded successfully`);
            });
        });
    }
    
    // Allow minimal scrolling to show footer
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'auto';
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
const handleResize = debounce(() => {
    // Ensure proper layout on resize
    const hero = document.querySelector('.hero');
    const header = document.querySelector('.header');
    
    // Only apply hero height if hero element exists (main page)
    if (hero && header) {
        hero.style.height = `calc(100vh - ${header.offsetHeight}px)`;
    }
}, 250);

window.addEventListener('resize', handleResize);