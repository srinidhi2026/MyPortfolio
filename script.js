
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
      menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        // Toggle icon between bars and X
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    }
    
    // Close mobile menu when a nav item is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          const icon = menuBtn.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
    
    // Active nav item on scroll
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links a');
    
    function activeNav() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
          current = section.getAttribute('id');
        }
      });
      
      navLi.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').substring(1) === current) {
          li.classList.add('active');
        }
      });
    }
    
    window.addEventListener('scroll', activeNav);
    
    // Reveal sections when they come into view
    const animatedSections = document.querySelectorAll('.section-animate');
    
    function revealSections() {
      animatedSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        if (sectionTop < windowHeight - revealPoint) {
          section.classList.add('in-view');
        }
      });
    }
    
    // Initialize animations
    window.addEventListener('scroll', revealSections);
    window.addEventListener('load', function() {
      revealSections();
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send this data to a server
        // For now we'll just log it and show a success message
        console.log({
          name,
          email,
          subject,
          message
        });
        
        // Create a success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
          <div style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p>Thank you for your message, ${name}! I'll get back to you soon.</p>
          </div>
        `;
        
        // Add success message to the form
        contactForm.appendChild(successMessage);
        
        // Reset the form
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      });
    }
  });