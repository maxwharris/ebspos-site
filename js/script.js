document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500); // Show loading screen for at least 1.5 seconds
    });
    
    // Animated Counter Function
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number based on target value
            if (target >= 1000000) {
                element.textContent = (current / 1000000).toFixed(1) + 'M+';
            } else if (target >= 1000) {
                element.textContent = Math.floor(current).toLocaleString() + '+';
            } else if (target % 1 !== 0) {
                element.textContent = current.toFixed(1) + '%';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stat-item')) {
                    entry.target.classList.add('animate');
                    const numberElement = entry.target.querySelector('.stat-number');
                    const target = parseFloat(numberElement.getAttribute('data-target'));
                    animateCounter(numberElement, target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => observer.observe(item));
    
    // Contact Form Modal
    const contactModal = document.getElementById('contact-modal');
    const modalClose = document.getElementById('modal-close');
    const contactPopupBtn = document.getElementById('contact-popup-btn');
    const getInTouchBtn = document.querySelector('.cta-buttons .btn-secondary');
    
    // Function to open modal
    function openModal() {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
    
    // Function to close modal
    function closeModal() {
        contactModal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // Add click event to contact popup button
    if (contactPopupBtn) {
        contactPopupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }
    
    // Add click event to "Get in Touch" button in hero section
    if (getInTouchBtn) {
        getInTouchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }
    
    // Close modal when clicking the close button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside the modal content
    if (contactModal) {
        contactModal.addEventListener('click', function(e) {
            if (e.target === contactModal) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Form validation for popup contact form
    const popupContactForm = document.getElementById('popup-contact-form');
    
    if (popupContactForm) {
        popupContactForm.addEventListener('submit', function(event) {
            let isValid = true;
            
            // Get form fields
            const nameInput = document.getElementById('popup-name');
            const emailInput = document.getElementById('popup-email');
            const messageInput = document.getElementById('popup-message');
            
            // Validate name
            if (!nameInput.value.trim()) {
                isValid = false;
                showError(nameInput, 'Please enter your name');
            } else {
                removeError(nameInput);
            }
            
            // Validate email
            if (!emailInput.value.trim()) {
                isValid = false;
                showError(emailInput, 'Please enter your email');
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email');
            } else {
                removeError(emailInput);
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                isValid = false;
                showError(messageInput, 'Please enter your message');
            } else {
                removeError(messageInput);
            }
            
            // If form is not valid, prevent submission
            if (!isValid) {
                event.preventDefault();
            }
        });
    }
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav && nav.classList.contains('active') && !event.target.closest('nav') && !event.target.closest('.menu-toggle')) {
            nav.classList.remove('active');
        }
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
    
    // Form Validation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            let isValid = true;
            
            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Validate name
            if (!nameInput.value.trim()) {
                isValid = false;
                showError(nameInput, 'Please enter your name');
            } else {
                removeError(nameInput);
            }
            
            // Validate email
            if (!emailInput.value.trim()) {
                isValid = false;
                showError(emailInput, 'Please enter your email');
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email');
            } else {
                removeError(emailInput);
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                isValid = false;
                showError(messageInput, 'Please enter your message');
            } else {
                removeError(messageInput);
            }
            
            // If form is not valid, prevent submission
            if (!isValid) {
                event.preventDefault();
            }
        });
    }
    
    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.style.color = 'var(--accent-color)';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '0.5rem';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.style.borderColor = 'var(--accent-color)';
    }
    
    function removeError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.style.borderColor = 'var(--border-color)';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
