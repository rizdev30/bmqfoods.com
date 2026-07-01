/* ========================================
   Benchmark Quality Foods - Scripts
   ======================================== */

// Create floating rice grain particles
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random positioning and timing
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 15 + Math.random() * 20;
        const size = 0.5 + Math.random() * 1;
        
        particle.style.left = `${left}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.transform = `scale(${size})`;
        particle.style.width = `${3 + Math.random() * 3}px`;
        particle.style.height = `${8 + Math.random() * 8}px`;
        
        container.appendChild(particle);
    }
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe contact section elements
    const contactHeader = document.querySelector('.contact-header');
    const contactForm = document.querySelector('.contact-form');
    
    if (contactHeader) {
        contactHeader.style.opacity = '0';
        contactHeader.style.transform = 'translateY(30px)';
        contactHeader.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(contactHeader);
    }
    
    if (contactForm) {
        contactForm.style.opacity = '0';
        contactForm.style.transform = 'translateY(30px)';
        contactForm.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s';
        observer.observe(contactForm);
    }
}

// Handle animate-in class
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS for animate-in
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

// Form submission handler
async function handleSubmit(event) {
    event.preventDefault();
    
    // Check reCAPTCHA
    if (window.grecaptcha) {
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            alert('Please complete the CAPTCHA to send your message.');
            return;
        }
    }
    
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const submitBtn = document.getElementById('submit-btn');
    
    // Button loading state
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    btnText.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Prepare form data for Web3Forms
    const formData = new FormData(form);
    formData.append("access_key", "5aa19e6f-634d-4143-adec-d9c2bb73aabb");
    
    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Hide form, show success
            form.style.display = 'none';
            successMessage.classList.add('show');
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Reset after 5 seconds
            setTimeout(() => {
                form.reset();
                if (window.grecaptcha) grecaptcha.reset();
                form.style.display = 'block';
                successMessage.classList.remove('show');
            }, 5000);
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        btnText.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
}

// Smooth scroll for anchor links
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initScrollAnimations();
});
