import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const PremiumTestimonials = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Mitchell",
      business: "Paws & Claws Dog Grooming",
      location: "Manchester",
      text: "SoleScope transformed my business completely. My new website books appointments automatically, and I'm getting three times more local customers. The AI chatbot answers questions even when I'm busy with clients!",
      rating: 5,
      image: "https://images.pexels.com/photos/3727464/pexels-photo-3727464.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "James Thompson",
      business: "Thompson Carpentry",
      location: "Birmingham",
      text: "I was losing customers because my old website looked unprofessional. Within two weeks, SoleScope delivered a stunning site that shows off my work perfectly. My phone hasn't stopped ringing since.",
      rating: 5,
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Emma Rodriguez",
      business: "Blade Sharp Services",
      location: "London",
      text: "The automation setup has saved me hours every week. Customer inquiries, booking confirmations, and follow-ups all happen automatically. I can focus on what I do best while the system handles the rest.",
      rating: 5,
      image: "https://images.pexels.com/photos/3727463/pexels-photo-3727463.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section 
      ref={ref} 
      className="relative py-20 overflow-hidden"
      aria-labelledby="testimonials-heading"
      role="region"
    >
      {/* Enhanced Galaxy Background */}
      <div className="absolute inset-0 z-0">
        {/* Base galaxy gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#05050c] via-[#0c0816] to-[#05050c]"></div>
        
        {/* Animated nebula layers */}
        <div 
          className="absolute inset-0 opacity-65"
          style={{
            background: `
              radial-gradient(1300px 850px at 20% 25%, rgba(168,85,247,0.16), transparent 65%),
              radial-gradient(1100px 750px at 80% 70%, rgba(217,70,239,0.12), transparent 60%),
              radial-gradient(900px 650px at 15% 85%, rgba(124,58,237,0.10), transparent 55%),
              radial-gradient(700px 500px at 85% 20%, rgba(147,51,234,0.08), transparent 50%)
            `,
            animation: 'galaxyTwinkle 14s ease-in-out infinite'
          }}
        ></div>
        
        {/* Floating particles */}
        <div 
          className="absolute inset-0 opacity-45"
          style={{
            background: `
              radial-gradient(2px 2px at 15% 20%, rgba(255,255,255,0.6), transparent),
              radial-gradient(1.5px 1.5px at 35% 75%, rgba(255,255,255,0.4), transparent),
              radial-gradient(2px 2px at 75% 40%, rgba(255,255,255,0.5), transparent),
              radial-gradient(1px 1px at 60% 60%, rgba(255,255,255,0.3), transparent),
              radial-gradient(1.5px 1.5px at 90% 20%, rgba(255,255,255,0.4), transparent)
            `,
            backgroundSize: '250px 250px, 180px 180px, 220px 220px, 140px 140px, 200px 200px',
            animation: 'galaxyDrift 90s linear infinite'
          }}
        ></div>
        
        {/* Dynamic pulse glows */}
        <div 
          className="absolute top-1/4 left-1/6 w-80 h-80 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.6) 0%, transparent 70%)',
            animation: 'galaxyPulse 7s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/6 w-96 h-96 rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(217,70,239,0.5) 0%, transparent 70%)',
            animation: 'galaxyPulse 7s ease-in-out infinite 2s'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            id="testimonials-heading"
            className="text-4xl sm:text-5xl font-bold text-white mb-6 text-shadow uppercase tracking-wide"
          >
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real results from businesses across the UK who trusted us to transform their digital presence.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div 
          className="relative"
          role="region"
          aria-label="Customer testimonials"
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-sm border border-white/10 rounded-3xl p-12 shadow-2xl hover:shadow-purple-500/20 hover:border-purple-400/30 transition-all duration-500 text-center max-w-4xl mx-auto"
              role="article"
              aria-labelledby={`testimonial-${currentIndex}`}
            >
              {/* Glass morphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>

              {/* Quote Icon */}
              <div className="relative flex justify-center mb-8" aria-hidden="true">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600/30 to-purple-700/30 border border-white/20 rounded-full flex items-center justify-center">
                  <Quote className="h-10 w-10 text-white drop-shadow-lg" />
                  
                  {/* Quote icon glow */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-60"
                    style={{
                      background: 'linear-gradient(135deg, rgba(168,85,247,0.4), rgba(124,58,237,0.4))',
                      filter: 'blur(12px)',
                      transform: 'scale(1.3)',
                      animation: 'galaxyPulse 4s ease-in-out infinite'
                    }}
                  ></div>
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote 
                id={`testimonial-${currentIndex}`}
                className="relative text-xl lg:text-2xl text-white mb-10 leading-relaxed font-light max-w-4xl mx-auto"
              >
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Rating */}
              <div 
                className="flex items-center justify-center space-x-1 mb-8"
                role="img"
                aria-label={`${testimonials[currentIndex].rating} out of 5 stars`}
              >
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-purple-400 fill-current drop-shadow-lg" aria-hidden="true" />
                ))}
              </div>

              {/* Client Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30 shadow-lg"
                />
                <div className="text-center sm:text-left">
                  <h4 className="text-xl font-semibold text-white mb-1">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-purple-400 font-medium text-lg">
                    {testimonials[currentIndex].business}
                  </p>
                  <p className="text-gray-400">
                    {testimonials[currentIndex].location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/80 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-600/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <button
            onClick={nextTestimonial}
            aria-label="Next testimonial"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/80 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-600/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          {/* Dots Indicator */}
          <div 
            className="flex justify-center space-x-3 mt-10"
            role="tablist"
            aria-label="Testimonial navigation"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`w-4 h-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black ${
                  index === currentIndex
                    ? 'bg-purple-500 scale-125 shadow-lg shadow-purple-500/50'
                    : 'bg-gray-600 hover:bg-gray-500 hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumTestimonials;