// script.js
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.slider img');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let currentIndex = 0;

    function showImage(index) {
        if (index >= images.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = images.length - 1;
        } else {
            currentIndex = index;
        }
        slider.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    prevButton.addEventListener('click', () => {
        showImage(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        showImage(currentIndex + 1);
    });

    // Automatic Slideshow
    setInterval(() => {
        showImage(currentIndex + 1);
    }, 3000);

    // Display the first image on page load
    showImage(currentIndex);
});
