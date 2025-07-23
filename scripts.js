document.addEventListener('DOMContentLoaded', function() {
    const flipClocks = document.querySelectorAll('.widget-preview.flipclock');

    flipClocks.forEach(flipClock => {
        const video = flipClock.querySelector('.video-container video');
        const img = flipClock.querySelector('.widget-image');
        let videoLoadTimeout;

        // Initially hide the image and try to load the video
        img.style.display = 'none';

        if (video && img) {
            // Set a timeout in case the video gets stuck loading
            videoLoadTimeout = setTimeout(() => {
                img.style.display = 'block'; // Show the image if the video doesn't load in time
                console.log('Video loading timeout - showing fallback image');
            }, 3000); // 3 second timeout

            // Show image if video fails to load
            video.addEventListener('error', function() {
                img.style.display = 'block';
                clearTimeout(videoLoadTimeout);
                console.log('Video failed to load - showing fallback image');
            });

            // Hide image once video is ready and can play
            video.addEventListener('canplay', function() {
                img.style.display = 'none';
                clearTimeout(videoLoadTimeout);
                console.log('Video loaded successfully - hiding fallback image');
            });

            // Fallback: if video never starts playing, show the image
            video.addEventListener('stalled', function() {
                img.style.display = 'block';
                clearTimeout(videoLoadTimeout);
                console.log('Video stalled - showing fallback image');
            });
        } else {
            // If no video element found, show the image
            img.style.display = 'block';
        }
    });
});
