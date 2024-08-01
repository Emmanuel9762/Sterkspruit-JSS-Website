$(document).ready(function() {
    // Function to toggle the sidebar and overlay
    function toggleSidebar() {
        $('.sidebar').toggleClass('active');
        $('.overlay').toggleClass('active');
        $('#hamburger-icon').toggleClass('rotated');
    }

    // Function to hide the sidebar and overlay
    function hideSidebar() {
        $('.sidebar').removeClass('active');
        $('.overlay').removeClass('active');
        $('#hamburger-icon').removeClass('rotated');
    }

    // Event listener for the hamburger icon click
    $('#hamburger-icon').click(function() {
        toggleSidebar();
    });

    // Event listener for the overlay click
    $('.overlay').click(function() {
        hideSidebar();
    });
});


//carousel logic
window.addEventListener('DOMContentLoaded', function() {
    // Get all carousel slides
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let currentSlide = 0;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        // Show the selected slide
        slides[index].style.display = 'block';
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Show the first slide
    showSlide(currentSlide);

    // Set interval for automatic sliding
    let slideInterval = setInterval(nextSlide, 4000);

    // Pause automatic sliding on hover
    document.querySelector('.carousel').addEventListener('mouseover', function() {
        clearInterval(slideInterval);
    });

    // Resume automatic sliding on mouse leave
    document.querySelector('.carousel').addEventListener('mouseleave', function() {
        slideInterval = setInterval(nextSlide, 4000);
    });

    // Previous slide button
    document.querySelector('.prev').addEventListener('click', function() {
        prevSlide();
    });

    // Next slide button
    document.querySelector('.next').addEventListener('click', function() {
        nextSlide();
    });
});




