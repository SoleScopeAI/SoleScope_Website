import React from 'react';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Globe, Code, BarChart3, Palette, Bot } from 'lucide-react';

const PremiumHeroSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  const services = [
    {
      icon: Globe,
      label: "Website Design & Hosting",
      path: "/services/website-design"
    },
    {
      icon: Code,
      label: "Custom WebApps & Hosting",
      path: "/services/custom-webapps"
    },
    {
      icon: BarChart3,
      label: "AI Dashboards & Analytics",
      path: "/services/ai-dashboards"
    },
    {
      icon: Palette,
      label: "Brand Identity & Visuals",
      path: "/services/brand-identity"
    },
    {
      icon: Bot,
      label: "AI Automations",
      path: "/services/custom-ai-automations"
    }
  ];

  useEffect(() => {
    // Auto-scroll functionality for mobile carousel
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Only apply auto-scroll on mobile
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    let isScrolling = false;
    let scrollPosition = 0;
    const scrollStep = 72; // Width of each icon (64px) + gap (8px)
    const totalWidth = services.length * scrollStep;

    const autoScroll = () => {
      if (isScrolling) return;
      
      scrollPosition += scrollStep;
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0;
      }
      
      carousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    };

    // Start auto-scroll
    intervalRef.current = setInterval(autoScroll, 2500);

    // Pause on user interaction
    const pauseAutoScroll = () => {
      isScrolling = true;
    };

    const resumeAutoScroll = () => {
      setTimeout(() => {
        isScrolling = false;
      }, 3000);
    };

    carousel.addEventListener('touchstart', pauseAutoScroll);
    carousel.addEventListener('touchend', resumeAutoScroll);
    carousel.addEventListener('mouseenter', pauseAutoScroll);
    carousel.addEventListener('mouseleave', resumeAutoScroll);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (carousel) {
        carousel.removeEventListener('touchstart', pauseAutoScroll);
        carousel.removeEventListener('touchend', resumeAutoScroll);
        carousel.removeEventListener('mouseenter', pauseAutoScroll);
        carousel.removeEventListener('mouseleave', resumeAutoScroll);
      }
    };
  }, [services.length]);

  const workExamples = [
    {
      id: 1,
      image: "/assets/carousel/JodiesPamperedPoochesWebsite.png",
      title: "Jodie's Pampered Pooches",
      position: { top: '15%', left: '8%' },
      rotation: '-12deg',
      size: 'w-24 h-16 sm:w-32 sm:h-20 md:w-48 md:h-32',
      delay: 0
    },
    {
      id: 2,
      image: "/assets/carousel/Design K9 Home Page.png",
      title: "Design K9 Training",
      position: { top: '25%', right: '10%' },
      rotation: '8deg',
      size: 'w-28 h-18 sm:w-36 sm:h-24 md:w-52 md:h-36',
      delay: 2
    },
    {
      id: 3,
      image: "/assets/carousel/UKBladeSharpening.png",
      title: "UK Blade Sharpening",
      position: { bottom: '20%', left: '5%' },
      rotation: '15deg',
      size: 'w-20 h-12 sm:w-28 sm:h-18 md:w-44 md:h-28',
      delay: 4
    },
    {
      id: 4,
      image: "/assets/carousel/JodiesPamperedPoochesWebsite.png",
      title: "Portfolio Example",
      position: { bottom: '30%', right: '8%' },
      rotation: '-8deg',
      size: 'w-18 h-10 sm:w-24 sm:h-16 md:w-40 md:h-24',
      delay: 1
    },
    {
      id: 5,
      image: "/assets/carousel/Design K9 Home Page.png",
      title: "Client Work",
      position: { top: '45%', left: '12%' },
      rotation: '5deg',
      size: 'w-16 h-10 sm:w-20 sm:h-14 md:w-36 md:h-24',
      delay: 3
    },
    {
      id: 6,
      image: "/assets/carousel/UKBladeSharpening.png",
      title: "Business Solution",
      position: { top: '60%', right: '15%' },
      rotation: '-18deg',
      size: 'w-22 h-14 sm:w-28 sm:h-18 md:w-42 md:h-28',
      delay: 5
    }
  ];

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center premium-bg overflow-hidden pt-20 md:pt-0"
      aria-labelledby="hero-heading"
      role="region"
    >
      {/* Enhanced Background Effects */}
      <div className="floating-particles"></div>
      <div className="pulse-glow pulse-glow-1"></div>
      <div className="pulse-glow pulse-glow-2"></div>

      {/* Floating Work Examples */}
      {workExamples.map((example) => (
        <motion.div
          key={example.id}
          className={`absolute ${example.size} opacity-20 pointer-events-none z-0`}
          style={{
            ...example.position,
            transform: `rotate(${example.rotation})`,
          }}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0.20, 0.25, 0.20],
            scale: [0.95, 1.05, 0.95],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: example.delay,
            ease: "easeInOut"
          }}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-transparent"></div>
            <img 
              src={example.image} 
              alt={example.title}
              className="w-full h-full object-cover filter blur-[1px] sm:blur-[2px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent"></div>
          </div>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 md:mb-12 text-center"
        >
          {/* Hero Heading */}
          <h1 
            id="hero-heading"
            className="text-center text-2xl sm:text-3xl md:text-6xl font-bold mt-2 mb-4 md:mb-12 leading-tight md:leading-normal pb-6 md:pb-0 pt-20 md:pt-0"
          >
            <span className="block text-white">Transform Your Business With</span>
            <span className="block bg-gradient-to-r from-[#B39CFF] to-[#6C3EF0] bg-clip-text text-transparent">
              AI-Powered Solutions
            </span>
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base md:text-xl text-slate-300 max-w-[32ch] md:max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed"
          >
            Complete digital solutions for service businesses who want to compete and win online.
          </motion.p>

          {/* Service Chips */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-6xl mx-auto mb-8 md:mb-16"
            role="group"
            aria-label="Our services"
          >
            {/* Desktop Grid Layout */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <Link
                    to={service.path}
                    aria-label={`Learn more about ${service.label}`}
                    className={`flex flex-col items-center p-6 backdrop-blur-sm border rounded-xl hover:scale-105 transition-all duration-300 h-32 w-full ${
                      service.isAI 
                        ? 'ai-automation-hero-card bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-emerald-500/20 border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-400/30' 
                        : 'bg-black/30 border-white/20 hover:border-[#6C3EF0] hover:bg-purple-600/10 hover:shadow-lg hover:shadow-[#6C3EF0]/20'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 relative overflow-hidden ${
                      service.isAI 
                        ? 'ai-automation-icon bg-gradient-to-br from-cyan-400 via-purple-500 to-emerald-400' 
                        : 'bg-gradient-to-br from-purple-600/30 to-purple-700/30 group-hover:from-[#6C3EF0]/40 group-hover:to-[#B39CFF]/40'
                    }`}>
                      {service.isAI && (
                        <>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{
                              x: ['-100%', '100%']
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-emerald-400/20 rounded-lg"
                            animate={{
                              scale: [1, 1.1, 1],
                              opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </>
                      )}
                      <service.icon className={`h-8 w-8 relative z-10 transition-colors duration-300 ${
                        service.isAI 
                          ? 'text-white drop-shadow-lg' 
                          : 'text-[#B39CFF] group-hover:text-white'
                      }`} />
                    </div>
                    <span className={`text-sm font-semibold text-center leading-tight transition-colors duration-300 ${
                      service.isAI 
                        ? 'text-white drop-shadow-md' 
                        : 'text-white group-hover:text-[#B39CFF]'
                    }`}>
                      {service.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Smooth Marquee */}
            <div className="md:hidden relative overflow-hidden py-4" role="group" aria-label="Services carousel">
              {/* Edge fade masks */}
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" aria-hidden="true"></div>
              <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" aria-hidden="true"></div>
              
              <div 
                ref={carouselRef}
                className="flex space-x-4 mobile-marquee"
                style={{ 
                  width: 'max-content',
                  animation: 'marqueeScroll 20s linear infinite'
                }}
                onTouchStart={() => {
                  if (carouselRef.current) {
                    carouselRef.current.style.animationPlayState = 'paused';
                  }
                }}
                onTouchEnd={() => {
                  if (carouselRef.current) {
                    carouselRef.current.style.animationPlayState = 'running';
                  }
                }}
                onMouseEnter={() => {
                  if (carouselRef.current) {
                    carouselRef.current.style.animationPlayState = 'paused';
                  }
                }}
                onMouseLeave={() => {
                  if (carouselRef.current) {
                    carouselRef.current.style.animationPlayState = 'running';
                  }
                }}
              >
                {/* Triple the services for seamless loop */}
                {[...services, ...services, ...services].map((service, index) => (
                  <Link
                    key={`${service.label}-${index}`}
                    to={service.path}
                    aria-label={`Learn more about ${service.label}`}
                    className={`flex items-center justify-center w-12 h-12 backdrop-blur-sm border rounded-full transition-all duration-300 flex-shrink-0 relative overflow-hidden ${
                      service.isAI 
                        ? 'ai-automation-mobile-icon bg-gradient-to-br from-cyan-400/30 via-purple-500/30 to-emerald-400/30 border-cyan-400/40 hover:border-cyan-400/70' 
                        : 'bg-gradient-to-br from-purple-600/20 to-purple-700/20 border-white/20 hover:border-[#6C3EF0] hover:bg-purple-600/30'
                    }`}
                  >
                    {service.isAI && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ['-100%', '100%']
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                    <service.icon className={`h-6 w-6 transition-colors duration-300 relative z-10 ${
                      service.isAI 
                        ? 'text-white drop-shadow-lg' 
                        : 'text-[#B39CFF] hover:text-white'
                    }`} />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center items-center px-4 sm:px-0"
          role="group"
          aria-label="Call to action buttons"
        >
          <Link
            to="/contact"
            aria-label="Get started with SoleScope services"
            className="group bg-[#6C3EF0] text-white px-8 py-3 text-base sm:px-10 sm:py-3 sm:text-base md:text-lg font-semibold rounded-full hover:bg-[#5A33C8] hover:scale-105 transition-all duration-300 flex items-center justify-center w-full sm:w-auto shadow-lg h-12 sm:min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#6C3EF0] focus:ring-offset-2 focus:ring-offset-black"
          >
            <span>Get Started</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/services"
            aria-label="View all our services"
            className="group bg-transparent text-white border-2 border-white/40 px-8 py-3 text-base sm:px-10 sm:py-3 sm:text-base md:text-lg font-semibold rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center w-full sm:w-auto h-12 sm:min-h-[44px] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          >
            View Services
            <Play className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumHeroSection;