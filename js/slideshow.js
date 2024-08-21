class ImageGallery {
    constructor(galleryElement) {
        this.currentImageIndex = 0;
        this.galleryItems = galleryElement.querySelectorAll('.gallery-item');
        this.prevButton = galleryElement.querySelector('.gallery-nav.prev');
        this.nextButton = galleryElement.querySelector('.gallery-nav.next');

        this.prevButton.addEventListener('click', () => this.changeImage(-1));
        this.nextButton.addEventListener('click', () => this.changeImage(1));

        this.initializeGallery();
    }

    changeImage(direction) {
        this.galleryItems[this.currentImageIndex].classList.remove('active');
        this.currentImageIndex = (this.currentImageIndex + direction + this.galleryItems.length) % this.galleryItems.length;
        this.galleryItems[this.currentImageIndex].classList.add('active');
        this.resizeActiveImage();
    }

    resizeActiveImage() {
        const activeItem = this.galleryItems[this.currentImageIndex];
        const img = activeItem.querySelector('.gallery-image');
        
        const width = parseInt(img.getAttribute('data-width'));
        const height = parseInt(img.getAttribute('data-height'));
        
        // Set container size
        activeItem.style.maxWidth = width + 'px';
        activeItem.style.margin = 'auto';
        
        // Set image size
        img.style.width = '100%';
        img.style.height = 'auto';
        
        // Ensure image doesn't exceed its natural size
        if (activeItem.offsetWidth < width) {
            img.style.width = '100%';
            img.style.height = 'auto';
        } else {
            img.style.width = width + 'px';
            img.style.height = height + 'px';
        }
    }

    initializeGallery() {
        if (this.galleryItems.length > 0) {
            this.galleryItems[0].classList.add('active');
            this.resizeActiveImage();
        }
    }
}

// Initialize all galleries on the page
document.addEventListener('DOMContentLoaded', function() {
    const galleries = document.querySelectorAll('.image-gallery');
    galleries.forEach(gallery => new ImageGallery(gallery));
});

// Resize all galleries on window resize
window.addEventListener('resize', function() {
    const galleries = document.querySelectorAll('.image-gallery');
    galleries.forEach(gallery => {
        const galleryInstance = new ImageGallery(gallery);
        galleryInstance.resizeActiveImage();
    });
});