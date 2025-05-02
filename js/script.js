document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            navUl.style.display = 'none';
        });
    });
    
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navUl = document.querySelector('nav ul');
    
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        if (navUl.style.display === 'flex') {
            navUl.style.display = 'none';
        } else {
            navUl.style.display = 'flex';
        }
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const package = document.getElementById('package').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            // For this example, we'll redirect to WhatsApp with the form data
            const whatsappMessage = `¡Hola! Soy ${name}. Estoy interesado/a en el ${package}. ${message}. Mi teléfono es ${phone} y mi correo ${email}.`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            window.open(`https://wa.me/51TU_NUMERO_WHATSAPP?text=${encodedMessage}`, '_blank');
            
            // Reset the form
            contactForm.reset();
            
            // Show success message
            alert('¡Gracias por tu mensaje! Serás redirigido a WhatsApp para completar tu reserva.');
        });
    }
    
    // Animation for elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .about-image, .contact-info, .gallery-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'var(--white)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});