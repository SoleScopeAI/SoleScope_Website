import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ClientCard from './ClientCard';

const HeroCarousel = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Client projects data
  const clientProjects = [
    {
      id: 1,
      name: "Jodie's Pampered Pooches",
      services: ["Web Design", "Booking System", "Local SEO"],
      screenshot: "/assets/carousel/JodiesPamperedPoochesWebsite.png",
      cta: "View Site",
      alt: "Homepage for Jodie's Pampered Pooches Dog Grooming Website"
    },
    {
      id: 2,
      name: "Design K9 Training",
      services: ["Web Design", "Blog", "Branding"],
      screenshot: "/assets/carousel/Design K9 Home Page.png",
      cta: "View Site",
      alt: "Homepage for Design K9 Dog Training Website"
    },
    {
      id: 3,
      name: "UK Blade Sharpening",
      services: ["Website", "CRM Integration", "Local SEO"],
      screenshot: "/assets/carousel/UKBladeSharpening.png",
      cta: "View Site",
      alt: "Homepage for UK Blade Sharpening Business Website"
    }
  ];

  // Calculate visible cards based on screen size
  const getVisibleCards = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // Mobile
      if (window.innerWidth < 1024) return 2; // Tablet
      return 3; // Desktop
    }
    return 3;
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= clientProjects.length - visibleCards 
          ? 0 
          : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, visibleCards, clientProjects.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= clientProjects.length - visibleCards 
        ? 0 
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 
        ? clientProjects.length - visibleCards 
        : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section 
      ref={ref} 
      className="py-40 bg-rich-black-0 relative overflow-hidden min-h-screen flex items-center"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Subtle ambient background */}
      <div className="animated-haze-bg opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-rich-black-0 border border-white/20 text-white p-3 rounded-full hover:bg-white hover:text-rich-black-0 transition-all duration-300 shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-rich-black-0 border border-white/20 text-white p-3 rounded-full hover:bg-white hover:text-rich-black-0 transition-all duration-300 shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Carousel Track */}
          <div
            ref={carouselRef}
            className="carousel-track flex transition-transform duration-500 ease-in-out gap-8"
            style={{
              transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
              width: `${(clientProjects.length * 100) / visibleCards}%`
            }}
          >
            {clientProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="flex-shrink-0"
                style={{ 
                  width: `${100 / clientProjects.length}%`, 
                  minWidth: `${100 / visibleCards}%` 
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <ClientCard project={project} />
              </motion.div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-12 space-x-3">
            {Array.from({ length: Math.ceil(clientProjects.length - visibleCards + 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-white shadow-lg'
                    : 'bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;