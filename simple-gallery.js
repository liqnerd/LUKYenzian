// Simple Reliable Gallery JavaScript - No External Dependencies
class SimpleGallery {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            autoplay: false,
            autoplayDelay: 4000,
            images: options.images || [
                { src: "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800&h=600&fit=crop", alt: "Shop Exterior" },
                { src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop", alt: "Shop Interior" },
                { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop", alt: "Equipment Display" },
                { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", alt: "Mountain Biking" },
                { src: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop", alt: "Bike Equipment" },
                { src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop", alt: "Outdoor Gear" },
                { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop", alt: "Mountain Views" },
                { src: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800&h=600&fit=crop", alt: "Ski Equipment" },
            ],
            ...options
        };
        
        this.currentIndex = 0;
        this.isAutoPlaying = this.options.autoplay;
        this.isDragging = false;
        
        this.init();
    }
    
    init() {
        this.createGallery();
        this.setupEventListeners();
        this.startAutoplay();
        console.log('Simple Gallery initialized successfully!');
    }
    
    createGallery() {
        this.container.innerHTML = `
            <div class="simple-gallery">
                <div class="gallery-wrapper">
                    <div class="gallery-track">
                        ${this.options.images.map((image, index) => `
                            <div class="gallery-item" data-index="${index}">
                                <img src="${image.src}" alt="${image.alt}" class="gallery-image" loading="lazy">
                                <div class="gallery-label">${image.alt}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <button class="gallery-nav prev" aria-label="Previous image">‹</button>
                <button class="gallery-nav next" aria-label="Next image">›</button>
                
                <div class="gallery-progress">
                    ${this.options.images.map((_, index) => `
                        <div class="gallery-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
                    `).join('')}
                </div>
            </div>
        `;
        
        this.wrapper = this.container.querySelector('.gallery-wrapper');
        this.track = this.container.querySelector('.gallery-track');
        this.prevBtn = this.container.querySelector('.gallery-nav.prev');
        this.nextBtn = this.container.querySelector('.gallery-nav.next');
        this.dots = this.container.querySelectorAll('.gallery-dot');
        this.items = this.container.querySelectorAll('.gallery-item');
    }
    
    setupEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Dots navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Drag scrolling
        let isDown = false;
        let startX;
        let scrollLeft;
        
        this.wrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            this.wrapper.classList.add('active');
            startX = e.pageX - this.wrapper.offsetLeft;
            scrollLeft = this.wrapper.scrollLeft;
            this.pauseAutoplay();
        });
        
        this.wrapper.addEventListener('mouseleave', () => {
            isDown = false;
            this.wrapper.classList.remove('active');
            this.resumeAutoplay();
        });
        
        this.wrapper.addEventListener('mouseup', () => {
            isDown = false;
            this.wrapper.classList.remove('active');
            this.resumeAutoplay();
        });
        
        this.wrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - this.wrapper.offsetLeft;
            const walk = (x - startX) * 2;
            this.wrapper.scrollLeft = scrollLeft - walk;
        });
        
        // Touch support
        this.wrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX;
            scrollLeft = this.wrapper.scrollLeft;
            this.pauseAutoplay();
        });
        
        this.wrapper.addEventListener('touchmove', (e) => {
            if (!startX) return;
            const x = e.touches[0].pageX;
            const walk = (startX - x) * 2;
            this.wrapper.scrollLeft = scrollLeft + walk;
        });
        
        this.wrapper.addEventListener('touchend', () => {
            startX = null;
            this.resumeAutoplay();
        });
        
        // Pause autoplay on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.container.addEventListener('mouseleave', () => this.resumeAutoplay());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Image click for modal
        this.items.forEach(item => {
            const img = item.querySelector('.gallery-image');
            img.addEventListener('click', () => {
                this.openModal(img.src, img.alt);
            });
        });
        
        // Modal close
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
        
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    prev() {
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.options.images.length - 1;
        this.scrollToSlide(this.currentIndex);
        this.updateDots();
    }
    
    next() {
        this.currentIndex = this.currentIndex < this.options.images.length - 1 ? this.currentIndex + 1 : 0;
        this.scrollToSlide(this.currentIndex);
        this.updateDots();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.scrollToSlide(index);
        this.updateDots();
    }
    
    scrollToSlide(index) {
        const item = this.items[index];
        if (item) {
            const itemLeft = item.offsetLeft;
            const itemWidth = item.offsetWidth;
            const wrapperWidth = this.wrapper.offsetWidth;
            const scrollLeft = itemLeft - (wrapperWidth - itemWidth) / 2;
            
            this.wrapper.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    }
    
    updateDots() {
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
    
    openModal(src, alt) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        
        if (modal && modalImage) {
            modalImage.src = src.replace(/w=800&h=600/, 'w=1200&h=900');
            modalImage.alt = alt;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
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

// Initialize gallery automatically
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('simple-gallery');
    
    if (galleryContainer) {
        console.log('Initializing Simple Gallery...');
        
        window.simpleGallery = new SimpleGallery(galleryContainer, {
            autoplay: false,
            autoplayDelay: 5000
        });
        
        console.log('Simple Gallery ready!');
    } else {
        console.error('Gallery container #simple-gallery not found');
    }
});

// Export for global use
window.SimpleGallery = SimpleGallery;
