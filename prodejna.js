// PRODEJNA Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    initializeModal();
});

// Gallery Slideshow Functionality
function initializeGallery() {
    const gallery = document.getElementById('gallery');
    
    if (!gallery) return;
    
    // Pause animation on hover
    gallery.addEventListener('mouseenter', () => {
        gallery.style.animationPlayState = 'paused';
    });
    
    gallery.addEventListener('mouseleave', () => {
        gallery.style.animationPlayState = 'running';
    });
}

// Modal Functionality
function initializeModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');
    
    // Use event delegation for dynamically created images
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('gallery-image')) {
            e.stopPropagation();
            modal.style.display = 'block';
            modalImage.src = e.target.src;
            modalImage.alt = e.target.alt;
            document.body.style.overflow = 'hidden';
            
            // Add fade-in animation
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
        }
    });
    
    // Close modal functions
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Close modal when clicking the X
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Prevent modal from closing when clicking on the image
    modalImage.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile navigation (reuse from main script)
const navToggle = document.querySelector('.nav-toggle');
const navMenus = document.querySelectorAll('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenus.forEach(menu => {
            menu.classList.toggle('active');
        });
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navToggle.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenus.forEach(menu => {
            menu.classList.remove('active');
        });
        if (navToggle) {
            navToggle.classList.remove('active');
        }
        document.body.style.overflow = '';
    });
});

// Header scroll effect
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
