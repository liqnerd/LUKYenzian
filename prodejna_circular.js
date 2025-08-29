// Circular Gallery JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const centerImage = document.querySelector('.center-img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const circleImages = document.querySelector('.circle-images');
    
    let currentIndex = 0;
    let isPlaying = true;
    const images = [
        {
            thumb: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop",
            full: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop",
            alt: "Shop interior"
        },
        {
            thumb: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop",
            full: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop",
            alt: "Equipment display"
        },
        {
            thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
            full: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
            alt: "Mountain biking gear"
        },
        {
            thumb: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=100&h=100&fit=crop",
            full: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=300&h=300&fit=crop",
            alt: "Bike equipment"
        },
        {
            thumb: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=100&h=100&fit=crop",
            full: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=300&fit=crop",
            alt: "Outdoor gear"
        },
        {
            thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop",
            full: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
            alt: "Mountain landscape"
        },
        {
            thumb: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=100&h=100&fit=crop",
            full: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=300&h=300&fit=crop",
            alt: "Ski equipment"
        },
        {
            thumb: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=100&h=100&fit=crop",
            full: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&h=300&fit=crop",
            alt: "Cycling gear"
        }
    ];
    
    // Initialize gallery
    function initGallery() {
        updateCenterImage();
        
        // Add click events to gallery items
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = index;
                updateCenterImage();
                pauseRotation();
                setTimeout(resumeRotation, 3000); // Resume after 3 seconds
            });
        });
        
        // Add control button events
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateCenterImage();
                pauseRotation();
                setTimeout(resumeRotation, 3000);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % images.length;
                updateCenterImage();
                pauseRotation();
                setTimeout(resumeRotation, 3000);
            });
        }
        
        // Pause rotation on hover
        if (gallery) {
            gallery.addEventListener('mouseenter', pauseRotation);
            gallery.addEventListener('mouseleave', resumeRotation);
        }
        
        // Auto-advance center image every 4 seconds
        setInterval(() => {
            if (isPlaying) {
                currentIndex = (currentIndex + 1) % images.length;
                updateCenterImage();
            }
        }, 4000);
    }
    
    function updateCenterImage() {
        if (centerImage && images[currentIndex]) {
            centerImage.src = images[currentIndex].full;
            centerImage.alt = images[currentIndex].alt;
        }
    }
    
    function pauseRotation() {
        isPlaying = false;
        if (circleImages) {
            circleImages.style.animationPlayState = 'paused';
        }
        galleryItems.forEach(item => {
            item.style.animationPlayState = 'paused';
        });
    }
    
    function resumeRotation() {
        isPlaying = true;
        if (circleImages) {
            circleImages.style.animationPlayState = 'running';
        }
        galleryItems.forEach(item => {
            item.style.animationPlayState = 'running';
        });
    }
    
    // Image Modal functionality (from original prodejna.js)
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal-close');
    
    // Add modal functionality to all gallery images
    function initModal() {
        // Center image click
        if (centerImage) {
            centerImage.addEventListener('click', (e) => {
                e.stopPropagation();
                showModal(centerImage.src, centerImage.alt);
            });
        }
        
        // Gallery items click for modal
        galleryItems.forEach(item => {
            const img = item.querySelector('.gallery-image');
            if (img) {
                img.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // Get full size version
                    const fullSrc = img.src.replace(/w=100&h=100/, 'w=800&h=800');
                    showModal(fullSrc, img.alt);
                });
            }
        });
        
        // Close modal
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }
    
    function showModal(src, alt) {
        if (modal && modalImage) {
            modalImage.src = src;
            modalImage.alt = alt;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Initialize everything
    initGallery();
    initModal();
});

// Enhanced gallery interactions based on the ReactBits circular gallery
class CircularGallery {
    constructor(container) {
        this.container = container;
        this.items = container.querySelectorAll('.gallery-item');
        this.centerImage = container.querySelector('.center-img');
        this.isRotating = true;
        this.currentRotation = 0;
        this.rotationSpeed = 0.1; // degrees per frame
        
        this.init();
    }
    
    init() {
        this.setupAnimation();
        this.setupInteractions();
    }
    
    setupAnimation() {
        // Smooth manual rotation option (alternative to CSS animation)
        // Uncomment if you want JavaScript-controlled rotation
        /*
        const animate = () => {
            if (this.isRotating) {
                this.currentRotation += this.rotationSpeed;
                const circleContainer = this.container.querySelector('.circle-images');
                if (circleContainer) {
                    circleContainer.style.transform = `rotate(${this.currentRotation}deg)`;
                }
                
                // Counter-rotate items to keep them upright
                this.items.forEach(item => {
                    item.style.transform = `translate(-50%, -50%) rotate(-${this.currentRotation}deg)`;
                });
            }
            requestAnimationFrame(animate);
        };
        animate();
        */
    }
    
    setupInteractions() {
        // Enhanced hover effects
        this.items.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                this.highlightItem(item, index);
            });
            
            item.addEventListener('mouseleave', () => {
                this.unhighlightItem(item);
            });
        });
    }
    
    highlightItem(item, index) {
        // Add special highlight effect
        item.style.zIndex = '20';
        item.style.transform += ' scale(1.3)';
        
        // Optionally update center image
        // this.updateCenterFromIndex(index);
    }
    
    unhighlightItem(item) {
        item.style.zIndex = '';
        item.style.transform = item.style.transform.replace(' scale(1.3)', '');
    }
    
    pause() {
        this.isRotating = false;
    }
    
    resume() {
        this.isRotating = true;
    }
}

// Initialize enhanced gallery if container exists
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.circular-gallery');
    if (galleryContainer) {
        new CircularGallery(galleryContainer);
    }
});
