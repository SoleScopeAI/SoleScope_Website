import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClientResultsCarousel = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/assets/carousel/JodiesPamperedPoochesWebsite.png',
      title: "Jodie's Pampered Pooches",
      industry: "Pet Grooming Services",
      result: "+138% leads after launch",
      description: "Complete website redesign with automated booking system"
    },
    {
      id: 2,
      image: '/assets/carousel/Design K9 Home Page.png',
      title: "Design K9 Training",
      industry: "Dog Training Services",
      result: "Fully automated booking system",
      description: "Custom web app with client progress tracking"
    },
    {
      id: 3,
      image: '/assets/carousel/UKBladeSharpening.png',
      title: "UK Blade Sharpening",
      industry: "Equipment Services",
      result: "+180% qualified leads",
      description: "AI-powered lead qualification and CRM integration"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    if (index > currentSlide) {
      setDirection(1);
    } else if (index < currentSlide) {
      setDirection(-1);
    }
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      aria-labelledby="client-results-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-black to-black"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            id="client-results-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wide"
          >
            Recent Client Results
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Real businesses. Real growth. Powered by SoleScope.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative h-[500px] md:h-[600px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-full max-w-4xl">
                  <motion.div
                    className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-64 md:h-96 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20"
                        animate={{
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <img
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="inline-block px-4 py-2 bg-purple-600/80 backdrop-blur-sm border border-purple-400/30 rounded-full mb-3">
                            <span className="text-sm font-semibold text-white">
                              {slides[currentSlide].industry}
                            </span>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            {slides[currentSlide].title}
                          </h3>
                          <p className="text-base md:text-lg text-slate-300 mb-3">
                            {slides[currentSlide].description}
                          </p>
                          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500/80 to-emerald-500/80 backdrop-blur-sm rounded-lg">
                            <span className="text-sm md:text-base font-bold text-white">
                              {slides[currentSlide].result}
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          <div className="flex justify-center space-x-3 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-purple-500 w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/services"
            className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold text-lg rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 uppercase tracking-wide"
          >
            <span>View All Projects</span>
            <ExternalLink className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientResultsCarousel;
