import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import '../styles/homepage-galaxy.css';

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
      className="homepage-section"
      aria-labelledby="testimonials-heading"
      role="region"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            id="testimonials-heading"
            className="text-4xl sm:text-5xl font-bold text-white mb-6 uppercase tracking-wide"
          >
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real results from businesses across the UK who trusted us to transform their digital presence.
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="homepage-refined-card homepage-testimonial-card"
            >
              <div className="homepage-quote-icon">
                <Quote className="h-10 w-10 text-white drop-shadow-lg" />
              </div>

              <blockquote className="text-xl lg:text-2xl text-white mb-10 leading-relaxed font-light">
                "{testimonials[currentIndex].text}"
              </blockquote>

              <div className="flex items-center justify-center space-x-1 mb-8">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-purple-400 fill-current drop-shadow-lg" />
                ))}
              </div>

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

          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:border-purple-500/50 hover:bg-purple-600/20 transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:border-purple-500/50 hover:bg-purple-600/20 transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="flex justify-center space-x-3 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-purple-500 scale-125'
                    : 'bg-white/30 hover:bg-white/60'
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