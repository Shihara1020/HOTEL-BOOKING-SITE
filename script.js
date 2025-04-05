document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Sticky Header
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Form Date Validation
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        checkinInput.setAttribute('min', today);
        
        checkinInput.addEventListener('change', function() {
            if (this.value) {
                const nextDay = new Date(this.value);
                nextDay.setDate(nextDay.getDate() + 1);
                const nextDayStr = nextDay.toISOString().split('T')[0];
                checkoutInput.setAttribute('min', nextDayStr);
                
                if (checkoutInput.value && checkoutInput.value < nextDayStr) {
                    checkoutInput.value = '';
                }
            }
        });
    }
    
    // Room Type Selection Animation
    const roomTypeSelect = document.getElementById('room-type');
    if (roomTypeSelect) {
        roomTypeSelect.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        roomTypeSelect.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    }
    
    // Review Form Validation
    const reviewForm = document.querySelector('.review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            const reviewText = document.getElementById('review-text');
            if (reviewText.value.trim().length < 10) {
                e.preventDefault();
                alert('Please write a more detailed review (at least 10 characters).');
                reviewText.focus();
            }
        });
    }
    
    // Booking Form Validation
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            const checkin = document.getElementById('checkin');
            const checkout = document.getElementById('checkout');
            
            if (!checkin.value || !checkout.value) {
                e.preventDefault();
                alert('Please select both check-in and check-out dates.');
                return;
            }
            
            if (new Date(checkout.value) <= new Date(checkin.value)) {
                e.preventDefault();
                alert('Check-out date must be after check-in date.');
                return;
            }
            
            const roomType = document.getElementById('room-type');
            if (!roomType.value) {
                e.preventDefault();
                alert('Please select a room type.');
                roomType.focus();
            }
        });
    }
    
    // Animation on Scroll Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }
});