// Image carousel - cycles through images like a GIF
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.carousel-image');
  let currentIndex = 0;

  // Change image interval (in milliseconds)
  // Adjust this value to make it faster or slower
  const INTERVAL = 2000; // 2 seconds per image

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
});
