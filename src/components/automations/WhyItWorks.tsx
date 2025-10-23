import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Puzzle, ChevronLeft, ChevronRight } from 'lucide-react';

const WhyItWorks = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Track scroll position for mobile carousel
  useEffect(() => {
    const carousel = document.getElementById('features-carousel');
    if (!carousel) return;

    const handleScroll = () => {
      const cardWidth = 280 + 16; // card width + gap
      const scrollLeft = carousel.scrollLeft;
      const newSlide = Math.round(scrollLeft / cardWidth);
      setCurrentSlide(newSlide);
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSlide = (index: number) => {
    const carousel = document.getElementById('features-carousel');
    if (carousel) {
      const cardWidth = 280 + 16; // card width + gap
      carousel.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentSlide(index);
    }
  };

  const features = [
    {
      id: 'reliable',
      icon: Zap,
      title: "Reliable",
      description: "Built-in retries, validation, and error handling ensure your automations work consistently.",
      checks: [
        "Automatic retry logic",
        "Data validation at every step",
        "Fallback procedures",
        "99.9% uptime guarantee"
      ]
    },
    {
      id: 'secure',
      icon: Shield,
      title: "Secure by Design",
      description: "GDPR compliant with enterprise-grade security and data protection standards.",
      checks: [
        "End-to-end encryption",
        "GDPR compliance built-in",
        "Regular security audits",
        "SOC 2 Type II certified"
      ]
    },
    {
      id: 'stack-native',
      icon: Puzzle,
      title: "Stack-Native",
      description: "Seamless integration with your existing tools and workflows without disruption.",
      checks: [
        "API-first integrations",
        "No data migration required",
        "Works with existing workflows",
        "Custom connector development"
      ]
    }
  ];

  return (
    <section className="py-20 premium-bg relative overflow-hidden">
      <div className="floating-particles"></div>
      <div className="pulse-glow pulse-glow-1"></div>
      <div className="pulse-glow pulse-glow-2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold dark-text-primary mb-6">
            Why Our Automations Work
          </h2>
          <p className="text-xl dark-text-body max-w-3xl mx-auto">
            Built for reliability, security, and seamless integration with your existing business systems
          </p>
        </motion.div>

        {/* Desktop/Tablet: Grid Layout */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative overflow-visible bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-sm border border-white/10 rounded-3xl p-10 shadow-2xl hover:shadow-purple-500/20 hover:border-purple-400/30 focus-within:border-purple-400/50 focus-within:shadow-purple-500/30 transition-all duration-500 text-center h-full flex flex-col"
              tabIndex={0}
              role="article"
              aria-labelledby={`feature-title-${feature.id}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  // Add any interaction logic here if needed
                }
              }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 group-focus:scale-110 transition-transform duration-300">
                <feature.icon className="h-10 w-10 text-white drop-shadow-lg" />
              </div>
              
              <h3 id={`feature-title-${feature.id}`} className="text-2xl font-bold text-white mb-6 text-center uppercase tracking-wide leading-tight">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 text-lg mb-8 leading-relaxed text-center">
                {feature.description}
              </p>

              <ul className="space-y-4 text-left flex-grow">
                {feature.checks.map((check, checkIndex) => (
                  <li key={checkIndex} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-purple-600/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2.5 h-2.5 bg-purple-400 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 text-base">{check}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Horizontal Carousel */}
        <div className="md:hidden relative">
          <div 
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory scroll-smooth"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
            id="features-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="Why our automations work features"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-visible bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/20 hover:border-purple-400/30 focus-within:border-purple-400/50 focus-within:shadow-purple-500/30 transition-all duration-500 flex-shrink-0 w-80 snap-center h-full flex flex-col text-center"
                tabIndex={0}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${features.length}: ${feature.title}`}
                aria-current={currentSlide === index ? 'true' : 'false'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    // Add any interaction logic here if needed
                  }
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-focus:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white drop-shadow-lg" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 text-center uppercase tracking-wide leading-tight">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed text-center text-base">
                  {feature.description}
                </p>

                <ul className="space-y-3 text-left flex-grow">
                  {feature.checks.map((check, checkIndex) => (
                    <li key={checkIndex} className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-purple-600/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      </div>
                      <span className="text-gray-300 text-sm">{check}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Features Pagination Icons */}
          <div className="flex justify-center mt-6 space-x-4">
            {features.map((feature, index) => (
              <motion.button
                key={feature.id}
                onClick={() => goToSlide(index)}
                className={`pagination-icon group relative p-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6C3EF0] focus:ring-offset-2 focus:ring-offset-black ${
                  currentSlide === index
                    ? 'bg-[#6C3EF0]/20 border-2 border-[#6C3EF0] scale-110'
                    : 'bg-white/5 border border-white/20 opacity-60 hover:opacity-100 hover:border-[#6C3EF0]/50'
                }`}
                aria-label={feature.title}
                aria-current={currentSlide === index ? 'true' : 'false'}
                whileHover={{ scale: currentSlide === index ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentSlide === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-[#6C3EF0]/30 rounded-xl blur-sm"
                  />
                )}
                
                <feature.icon 
                  className={`relative h-5 w-5 transition-all duration-300 ${
                    currentSlide === index
                      ? 'text-[#6C3EF0] drop-shadow-lg'
                      : 'text-white/70 group-hover:text-[#B39CFF]'
                  }`}
                />
              </motion.button>
            ))}
          </div>

          {/* Features Navigation Chevrons */}
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={() => currentSlide > 0 && goToSlide(currentSlide - 1)}
              disabled={currentSlide === 0}
              className={`p-2 rounded-lg transition-all duration-300 ${
                currentSlide === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              aria-label="Previous feature"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => currentSlide < features.length - 1 && goToSlide(currentSlide + 1)}
              disabled={currentSlide === features.length - 1}
              className={`p-2 rounded-lg transition-all duration-300 ${
                currentSlide === features.length - 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              aria-label="Next feature"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItWorks;