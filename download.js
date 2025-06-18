document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.querySelector('.download');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');

    downloadBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        let src = '';
        let filename = 'downloaded-file';

        // Detect if image or video is visible
        if (lightboxImg && !lightboxImg.classList.contains('hidden') && lightboxImg.src) {
            src = lightboxImg.src;
            filename = src.split('/').pop();
        } else if (lightboxVideo && !lightboxVideo.classList.contains('hidden')) {
            const videoSource = lightboxVideo.querySelector('source');
            if (videoSource && videoSource.src) {
                src = videoSource.src;
                filename = src.split('/').pop();
            }
        }

        if (!src) {
            alert("No media found to download.");
            return;
        }

        try {
            const response = await fetch(src, { mode: 'cors' });
            if (!response.ok) throw new Error('Fetch failed');
            const blob = await response.blob();
            const tempUrl = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = tempUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(tempUrl);
        } catch (err) {
            console.warn('CORS download failed:', err);
            alert("Sorry, the file couldn't be downloaded due to browser restrictions (CORS).\n\nTry right-clicking the media and selecting 'Save As', or take a screenshot instead, if you're on mobile.");
        }
    });
});

