import { useEffect } from 'react';

interface ScrollAnimationsProps {
  children?: React.ReactNode;
}

const ScrollAnimations: React.FC<ScrollAnimationsProps> = ({ children }) => {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return;
    }

    // Enhanced Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in'
    );
    
    animatedElements.forEach((el) => observer.observe(el));

    // Enhanced parallax scroll effect with performance optimization
    let ticking = false;
    
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium');
      
      parallaxElements.forEach((element) => {
        const speed = element.classList.contains('parallax-slow') ? 0.5 : 0.3;
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };

    const requestParallaxUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    // Throttled scroll listener with passive option for better performance
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });

    // Enhanced navbar scroll effect
    const navbar = document.querySelector('nav');
    const handleNavbarScroll = () => {
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('nav-blur');
        } else {
          navbar.classList.remove('nav-blur');
        }
      }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', requestParallaxUpdate);
      window.removeEventListener('scroll', handleNavbarScroll);
    };
  }, []);

  return <>{children}</>;
};

export default ScrollAnimations;