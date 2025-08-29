// Horizontal Gallery JavaScript - Simple and Reliable
class HorizontalGallery {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            autoplay: true,
            autoplayDelay: 4000,
            scrollSpeed: options.scrollSpeed || 2,
            scrollEase: options.scrollEase || 0.05,
            ...options
        };
        
        this.currentIndex = 0;
        this.isAutoPlaying = this.options.autoplay;
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.items = [];
        
        this.init();
    }
    
    init() {
        this.createGallery();
        this.setupEventListeners();
        this.startAutoplay();
    }
    
    createGallery() {
        const galleryItems = this.options.items || [
            { image: "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800&h=600&fit=crop", text: "Shop Exterior" },
            { image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop", text: "Shop Interior" },
            { image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop", text: "Equipment Display" },
            { image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", text: "Mountain Biking" },
            { image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop", text: "Bike Equipment" },
            { image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop", text: "Outdoor Gear" },
            { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop", text: "Mountain Views" },
            { image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800&h=600&fit=crop", text: "Ski Equipment" },
        ];
        
        this.items = galleryItems;
        
        this.container.innerHTML = `
            <div class="horizontal-gallery">
                <div class="gallery-track">
                    ${galleryItems.map((item, index) => `
                        <div class="gallery-item" data-index="${index}">
                            <img src="${item.image}" alt="${item.text}" class="gallery-image">
                            <div class="gallery-label">${item.text}</div>
                        </div>
                    `).join('')}
                </div>
                
                <button class="gallery-nav prev" aria-label="Previous">‹</button>
                <button class="gallery-nav next" aria-label="Next">›</button>
                
                <div class="gallery-progress">
                    ${galleryItems.map((_, index) => `
                        <div class="gallery-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
                    `).join('')}
                </div>
            </div>
        `;
        
        this.track = this.container.querySelector('.gallery-track');
        this.prevBtn = this.container.querySelector('.gallery-nav.prev');
        this.nextBtn = this.container.querySelector('.gallery-nav.next');
        this.dots = this.container.querySelectorAll('.gallery-dot');
        this.galleryItems = this.container.querySelectorAll('.gallery-item');
    }
    
    setupEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Dots navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch/mouse drag
        this.track.addEventListener('mousedown', (e) => this.handleStart(e));
        this.track.addEventListener('touchstart', (e) => this.handleStart(e));
        
        document.addEventListener('mousemove', (e) => this.handleMove(e));
        document.addEventListener('touchmove', (e) => this.handleMove(e));
        
        document.addEventListener('mouseup', () => this.handleEnd());
        document.addEventListener('touchend', () => this.handleEnd());
        
        // Pause autoplay on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.container.addEventListener('mouseleave', () => this.resumeAutoplay());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Image click for modal (if modal exists)
        this.galleryItems.forEach(item => {
            const img = item.querySelector('.gallery-image');
            img.addEventListener('click', () => {
                const modal = document.getElementById('imageModal');
                const modalImage = document.getElementById('modalImage');
                if (modal && modalImage) {
                    modalImage.src = img.src.replace(/w=800&h=600/, 'w=1200&h=900');
                    modalImage.alt = img.alt;
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        // Modal close functionality
        const modal = document.getElementById('imageModal');
        const modalClose = document.querySelector('.modal-close');
        
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
    }
    
    handleStart(e) {
        this.isDragging = true;
        this.startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        this.currentX = this.startX;
        this.pauseAutoplay();
        this.track.style.cursor = 'grabbing';
    }
    
    handleMove(e) {
        if (!this.isDragging) return;
        
        e.preventDefault();
        this.currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const deltaX = this.currentX - this.startX;
        
        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                this.prev();
            } else {
                this.next();
            }
            this.handleEnd();
        }
    }
    
    handleEnd() {
        this.isDragging = false;
        this.track.style.cursor = 'grab';
        this.resumeAutoplay();
    }
    
    prev() {
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.items.length - 1;
        this.updateGallery();
    }
    
    next() {
        this.currentIndex = this.currentIndex < this.items.length - 1 ? this.currentIndex + 1 : 0;
        this.updateGallery();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateGallery();
    }
    
    updateGallery() {
        const itemWidth = 320 + 30; // item width + gap
        const offset = -this.currentIndex * itemWidth;
        
        this.track.style.transform = `translateX(${offset}px)`;
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    startAutoplay() {
        if (!this.options.autoplay) return;
        
        this.autoplayInterval = setInterval(() => {
            if (this.isAutoPlaying) {
                this.next();
            }
        }, this.options.autoplayDelay);
    }
    
    pauseAutoplay() {
        this.isAutoPlaying = false;
    }
    
    resumeAutoplay() {
        this.isAutoPlaying = this.options.autoplay;
    }
    
    closeModal() {
        const modal = document.getElementById('imageModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    destroy() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
        }
    }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('horizontal-gallery');
    
    if (galleryContainer) {
        console.log('Initializing Horizontal Gallery...');
        
        const gallery = new HorizontalGallery(galleryContainer, {
            scrollSpeed: 2,
            scrollEase: 0.05,
            autoplay: true,
            autoplayDelay: 5000
        });
        
        console.log('Horizontal Gallery initialized successfully!');
    } else {
        console.error('Gallery container not found');
    }
});

// Export for global use
window.HorizontalGallery = HorizontalGallery;
