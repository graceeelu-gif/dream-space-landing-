// Image carousel - cycles through images like a GIF
document.addEventListener('DOMContentLoaded', function() {
  // Change image interval (in milliseconds)
  const INTERVAL = 2000; // 2 seconds per image

  // Function to create a carousel cycler
  function createCarousel(selector) {
    const images = document.querySelectorAll(selector);
    let currentIndex = 0;

    function cycleImages() {
      // Remove active class from current image
      images[currentIndex].classList.remove('active');

      // Move to next image
      currentIndex = (currentIndex + 1) % images.length;

      // Add active class to new image
      images[currentIndex].classList.add('active');
    }

    // Only start cycling if there are multiple images
    if (images.length > 1) {
      setInterval(cycleImages, INTERVAL);
    }
  }

  // Initialize hero carousel
  createCarousel('.carousel-image');

  // Initialize showcase carousel (with slight delay offset for visual interest)
  setTimeout(() => {
    createCarousel('.showcase-slide-wrapper');
  }, 1000);
});
