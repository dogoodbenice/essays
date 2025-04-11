document.addEventListener('DOMContentLoaded', function() {
  // Initialize parallax effect
  const parallaxImages = document.querySelectorAll('.parallax-image');
  parallaxImages.forEach(image => {
    const imgSrc = image.getAttribute('data-image');
    const imgAlt = image.getAttribute('data-alt');
    image.style.backgroundImage = `url(${imgSrc})`;
    
    // Add hidden image for better accessibility
    const hiddenImg = document.createElement('img');
    hiddenImg.src = imgSrc;
    hiddenImg.alt = imgAlt || 'Parallax background image';
    hiddenImg.style.display = 'none';
    image.appendChild(hiddenImg);
  });

  // Enhanced parallax effect (increased intensity)
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    parallaxImages.forEach(image => {
      const topOffset = image.offsetTop;
      const height = image.offsetHeight;
      
      // Check if element is in viewport
      if (scrollPosition + window.innerHeight > topOffset && 
          scrollPosition < topOffset + height) {
        // Increased effect by using 0.35 instead of previous value
        const parallaxOffset = (scrollPosition - topOffset) * 0.35;
        image.style.backgroundPositionY = `calc(50% + ${parallaxOffset}px)`;
      }
    });
  });

  // Handle navbar scrolling effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Image grid loading effect
  const imageItems = document.querySelectorAll('.image-grid-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  imageItems.forEach(item => {
    const img = item.querySelector('img');
    if (img.complete) {
      item.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        item.classList.add('loaded');
      });
    }
    observer.observe(item);
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.getElementById('mobileMenu'); // Ensure this ID matches your HTML

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active'); // Toggle the active class
    });
  }
});
