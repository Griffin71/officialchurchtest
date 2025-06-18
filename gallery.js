// Play/pause video on hover in gallery
document.querySelectorAll('.gallery-item video').forEach(video => {
    video.addEventListener('mouseenter', () => video.play());
    video.addEventListener('mouseleave', () => video.pause());
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const closeButton = document.querySelector('.close');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const leftArrow = document.querySelector('.nav-arrow.left');
const rightArrow = document.querySelector('.nav-arrow.right');

let currentIndex = 0;

function resetLightbox() {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
    lightboxImg.style.display = 'none';

    lightboxVideo.pause();
    lightboxVideo.style.display = 'none';
    lightboxVideo.querySelectorAll('source').forEach(source => source.src = '');
    lightboxVideo.load();
    document.body.style.overflow = 'auto';
}

function openLightbox(item, index) {
    currentIndex = index;
    const img = item.querySelector('img');
    const video = item.querySelector('video');

    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    if (img) {
        lightboxImg.src = img.src;
        lightboxImg.style.display = 'block';
        lightboxVideo.style.display = 'none';
    } else if (video) {
        const sources = video.querySelectorAll('source');
        const targetSources = lightboxVideo.querySelectorAll('source');
        sources.forEach((src, i) => {
            if (targetSources[i]) targetSources[i].src = src.src;
        });
        lightboxVideo.load();
        lightboxVideo.style.display = 'block';
        lightboxImg.style.display = 'none';
    }
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(item, index));
});

closeButton.addEventListener('click', resetLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) resetLightbox();
});

// Swipe navigation
let startX = 0;
lightbox.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
}, { passive: true });

lightbox.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const delta = startX - endX;
    if (Math.abs(delta) > 50) {
        if (delta > 0) navigateLightbox(1);   // swipe left
        else navigateLightbox(-1);            // swipe right
    }
}, { passive: true });

function navigateLightbox(direction) {
    currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
    openLightbox(galleryItems[currentIndex], currentIndex);
}

// Navigation arrows
if (leftArrow) leftArrow.addEventListener('click', () => navigateLightbox(-1));
if (rightArrow) rightArrow.addEventListener('click', () => navigateLightbox(1));
