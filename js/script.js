document.addEventListener('DOMContentLoaded', () => {

    // --- STICKY HEADER ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- MOBILE NAVIGATION TOGGLE ---
    const navToggle = document.querySelector('.header__toggle');
    const navMenu = document.querySelector('.header__menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.header__link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // --- SCROLL-TRIGGERED ANIMATIONS ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- HERO SLIDESHOW LOGIC ---
    const initHeroSlideshow = () => {
        const slides = document.querySelectorAll('.hero__bg-image');
        if (slides.length <= 1) return; // Don't run if there's only one or no slide

        let currentSlideIndex = 0;
        const slideInterval = 5000; // 5 seconds

        setInterval(() => {
            // Fade out the current slide
            slides[currentSlideIndex].classList.remove('active-slide');

            // Move to the next slide
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;

            // Fade in the new slide
            slides[currentSlideIndex].classList.add('active-slide');
        }, slideInterval);
    };

    initHeroSlideshow();
    
    // --- APPOINTMENT FORM HANDLING ---
    const form = document.getElementById('appointment-form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;

        // Basic validation
        if (!name || !phone || !date) {
            formMessage.textContent = 'Please fill out all fields.';
            formMessage.className = 'form-message error';
            return;
        }

        // Simulate form submission
        formMessage.textContent = 'Thank you! Your request has been sent. We will contact you shortly.';
        formMessage.className = 'form-message success';
        
        form.reset();

        // Hide the message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    });

});