// Detect touch devices and add appropriate classes/events for better mobile UX
const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
};

if (isTouchDevice()) {
    document.documentElement.classList.add('touch-device');
    
    // Add active state feedback for interactive elements on touch
    const interactiveElements = document.querySelectorAll('a, button, .skill-category, .testimonial-card, .about-card');
    interactiveElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.classList.add('active-touch');
        });
        el.addEventListener('touchend', function() {
            setTimeout(() => this.classList.remove('active-touch'), 200);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Welcome Modal
    const welcomeModal = document.getElementById('welcomeModal');
    const welcomeContent = document.getElementById('welcomeContent');
    const closeWelcome = document.getElementById('closeWelcome');
    
    // Show welcome modal quickly on first visit
    setTimeout(() => {
        welcomeModal.classList.remove('opacity-0', 'invisible');
        welcomeContent.classList.remove('scale-95');
        welcomeContent.classList.add('scale-100');
        // Reinitialize feather icons in modal
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }, 150);
    
    // Close modal
    closeWelcome.addEventListener('click', () => {
        welcomeContent.classList.add('scale-95');
        welcomeContent.classList.remove('scale-100');
        welcomeModal.classList.add('opacity-0', 'invisible');
    });
    
    // Close on outside click
    welcomeModal.addEventListener('click', (e) => {
        if (e.target === welcomeModal) {
            welcomeContent.classList.add('scale-95');
            welcomeContent.classList.remove('scale-100');
            welcomeModal.classList.add('opacity-0', 'invisible');
        }
    });
    
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
            backToTopButton.classList.remove('opacity-0', 'invisible');
        } else {
            backToTopButton.classList.remove('visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Theme Toggle (will be handled by navbar component)
    
    // Project Card Hover Effects
    const projectCards = document.querySelectorAll('.group');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.05)';
            this.querySelector('.absolute').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
            this.querySelector('.absolute').style.opacity = '0';
        });
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.right-timeline, .left-timeline');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.animationPlayState = 'running';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Feather Icons Replacement
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';

            try {
                const response = await fetch('https://formsubmit.co/ajax/developeraz07@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                        _subject: 'New Contact Form Submission from Portfolio'
                    })
                });

                const data = await response.json();

                // Show message
                formMessage.classList.remove('hidden');
                if (response.ok) {
                    formMessage.className = 'p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 mb-4';
                    formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
                    contactForm.reset();
                } else {
                    formMessage.className = 'p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 mb-4';
                    formMessage.textContent = data.message;
                }

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                }, 5000);

            } catch (error) {
                formMessage.classList.remove('hidden');
                formMessage.className = 'p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 mb-4';
                formMessage.textContent = 'Network error. Please make sure the server is running.';
                
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                }, 5000);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';
            }
        });
    }
    
    // Testimonial Card Click Handler
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('click', function() {
            const personName = this.getAttribute('data-person');
            console.log('Testimonial clicked: ' + personName);
            // You can add any action here, like showing a modal or expanding the card
        });
    });
});