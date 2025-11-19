// The Pinnacle Smile - Premium JavaScript

// ===== DOM Elements =====
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const bookConsultationBtn = document.getElementById('book-consultation');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const contactForm = document.getElementById('contact-form');
const appointmentForm = document.getElementById('appointment-form');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const testimonialPrev = document.getElementById('testimonial-prev');
const testimonialNext = document.getElementById('testimonial-next');

// ===== State Management =====
let currentTestimonial = 0;
let isModalOpen = false;

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeScrollEffects();
    initializeModal();
    initializeTestimonialSlider();
    initializeForms();
    initializeScrollAnimations();
});

// ===== Navigation =====
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Scroll Effects =====
function initializeScrollEffects() {
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active navigation link based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== Modal =====
function initializeModal() {
    // Open modal
    bookConsultationBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    // Close modal
    modalClose.addEventListener('click', () => {
        closeModal();
    });

    // Close modal on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isModalOpen) {
            closeModal();
        }
    });
}

function openModal() {
    modalOverlay.classList.add('active');
    isModalOpen = true;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    modalOverlay.classList.remove('active');
    isModalOpen = false;
    document.body.style.overflow = ''; // Restore scrolling
}

// ===== Testimonial Slider =====
function initializeTestimonialSlider() {
    // Auto-rotate testimonials
    setInterval(() => {
        nextTestimonial();
    }, 5000);

    // Manual controls
    testimonialPrev.addEventListener('click', () => {
        prevTestimonial();
    });

    testimonialNext.addEventListener('click', () => {
        nextTestimonial();
    });
}

function showTestimonial(index) {
    testimonialItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
    currentTestimonial = index;
}

function nextTestimonial() {
    const nextIndex = (currentTestimonial + 1) % testimonialItems.length;
    showTestimonial(nextIndex);
}

function prevTestimonial() {
    const prevIndex = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
    showTestimonial(prevIndex);
}

// ===== Forms =====
function initializeForms() {
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleContactFormSubmit();
        });
    }

    // Appointment form submission
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleAppointmentFormSubmit();
        });
    }
}

function handleContactFormSubmit() {
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    console.log('Contact form submitted:', data);
    
    // Show success message
    showFormMessage(contactForm, 'Thank you for your message. We\'ll be in touch soon!', 'success');
    
    // Reset form
    contactForm.reset();
}

function handleAppointmentFormSubmit() {
    const formData = new FormData(appointmentForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    console.log('Appointment form submitted:', data);
    
    // Show success message and close modal
    showFormMessage(appointmentForm, 'Your appointment request has been received. We\'ll contact you shortly to confirm.', 'success');
    
    // Reset form and close modal after delay
    setTimeout(() => {
        appointmentForm.reset();
        closeModal();
    }, 2000);
}

function showFormMessage(form, message, type) {
    // Remove any existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message--${type}`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 8px;
        text-align: center;
        background: ${type === 'success' ? 'linear-gradient(135deg, #E0F7FA 0%, #FAFAD2 100%)' : '#ff6b6b'};
        color: #0A192F;
        font-weight: 500;
    `;

    // Insert message after form
    form.appendChild(messageElement);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// ===== Scroll Animations =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Add fade-in class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// ===== Hero CTA Button =====
document.addEventListener('DOMContentLoaded', () => {
    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        heroCta.addEventListener('click', () => {
            // Scroll to services section
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                const offsetTop = servicesSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
});


// ===== Service Item Interactions =====
document.addEventListener('DOMContentLoaded', () => {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            // Add a subtle pulse effect
            item.style.transform = 'scale(0.98)';
            setTimeout(() => {
                item.style.transform = '';
            }, 150);
        });
    });
});

// ===== Doctor Card Hover Effects =====
document.addEventListener('DOMContentLoaded', () => {
    const doctorItems = document.querySelectorAll('.doctor-item');
    
    doctorItems.forEach(item => {
        const headshot = item.querySelector('.doctor-headshot');
        
        item.addEventListener('mouseenter', () => {
            if (headshot) {
                headshot.style.transform = 'scale(1.05)';
                headshot.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (headshot) {
                headshot.style.transform = 'scale(1)';
            }
        });
    });
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Arrow keys for testimonial navigation
    if (e.key === 'ArrowLeft' && document.querySelector('.testimonials')) {
        prevTestimonial();
    } else if (e.key === 'ArrowRight' && document.querySelector('.testimonials')) {
        nextTestimonial();
    }
});

// ===== Performance Optimization =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-dependent operations here
}, 10));

// ===== Loading Optimization =====
// Lazy load images when they come into view
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// ===== Accessibility Enhancements =====
// Add focus indicators for keyboard navigation
document.addEventListener('DOMContentLoaded', () => {
    const focusableElements = document.querySelectorAll('button, a, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #0A192F';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
});

// ===== Console Message =====
console.log('%c The Pinnacle Smile - Premium Dental Clinic Website ', 'background: linear-gradient(135deg, #E0F7FA 0%, #FAFAD2 100%); color: #0A192F; font-weight: bold; padding: 10px; border-radius: 5px;');
