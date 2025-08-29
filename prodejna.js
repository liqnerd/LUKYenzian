// PRODEJNA Page JavaScript - VERSION 2 (NO NAVTOGGLE CONFLICTS)
console.log('PRODEJNA.JS VERSION 2 LOADING - NO CONFLICTS');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Prodejna.js loaded');
    
    // Test modal elements exist
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    console.log('Modal elements found:', {modal: !!modal, modalImage: !!modalImage});
    
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
    
    // Add multiple click listeners for debugging
    gallery.addEventListener('click', function(e) {
        console.log('Gallery clicked! Target:', e.target);
        console.log('Target classes:', e.target.className);
        console.log('Target tag:', e.target.tagName);
        
        // Check if clicked on gallery-item or gallery-image
        let targetImage = null;
        if (e.target.classList.contains('gallery-image')) {
            targetImage = e.target;
            console.log('Direct click on gallery-image');
        } else if (e.target.classList.contains('gallery-item')) {
            targetImage = e.target.querySelector('.gallery-image');
            console.log('Click on gallery-item, found image:', targetImage);
        }
        
        if (targetImage) {
            console.log('Opening modal with image:', targetImage.src);
            e.stopPropagation();
            
            const modal = document.getElementById('imageModal');
            const modalImage = document.getElementById('modalImage');
            
            if (modal && modalImage) {
                modal.style.display = 'flex';
                modal.style.opacity = '1';
                modalImage.src = targetImage.src;
                modalImage.alt = targetImage.alt;
                document.body.style.overflow = 'hidden';
                console.log('Modal opened successfully');
            } else {
                console.error('Modal elements not found!', {modal, modalImage});
            }
        }
    });
}

// Modal Functionality
function initializeModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');
    
    // Use event delegation for dynamically created images
    document.addEventListener('click', function(e) {
        console.log('Click detected on:', e.target);
        if (e.target.classList.contains('gallery-image')) {
            console.log('Gallery image clicked via document listener');
            e.stopPropagation();
            modal.style.display = 'flex';
            modal.style.opacity = '1';
            modalImage.src = e.target.src;
            modalImage.alt = e.target.alt;
            document.body.style.overflow = 'hidden';
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

// Navigation code is handled by script.js - no duplicates needed here
