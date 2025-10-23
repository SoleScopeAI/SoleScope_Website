import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

const Testimonials = () => {
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
      text: "SoleScope AI transformed my business completely. My new website books appointments automatically, and I'm getting three times more local customers. The AI chatbot answers questions even when I'm busy with clients!",
      rating: 5,
    },
    {
      name: "James Thompson",
      business: "Thompson Carpentry",
      location: "Birmingham",
      text: "I was losing customers because my old website looked unprofessional. Within two weeks, SoleScope delivered a stunning site that shows off my work perfectly. My phone hasn't stopped ringing since.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      business: "Blade Sharp Services",
      location: "London",
      text: "The automation setup has saved me hours every week. Customer inquiries, booking confirmations, and follow-ups all happen automatically. I can focus on what I do best while the system handles the rest.",
      rating: 5,
    },
    {
      name: "Michael Brown",
      business: "Brown's Mobile Mechanics",
      location: "Leeds",
      text: "From zero online presence to ranking first on Google for 'mobile mechanic Leeds' in just 3 months. The SEO work they did is incredible, and the automated booking system is a game-changer.",
      rating: 5,
    },
    {
      name: "Lisa Chen",
      business: "Zen Wellness Studio",
      location: "Bristol",
      text: "The team understood exactly what my wellness business needed. The website reflects my brand perfectly, and the client portal keeps my customers engaged. Bookings have increased by 200%.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

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
    <section ref={ref} className="py-24 bg-rich-black-1">
      <AnimatedBackground variant="section" className="opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 fade-in-up"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-wide uppercase">
            WHAT OUR CLIENTS SAY
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto font-light">
            Real results from businesses across the UK who trusted us to transform their digital presence.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-rich-black-0 border border-gray-800 p-12 text-center hover:border-white transition-colors duration-300 rounded-lg shadow-md scale-in"
            >
              <div className="flex items-center justify-center mb-6">
                <Quote className="h-8 w-8 text-gray-600" />
              </div>

              <blockquote className="text-lg md:text-xl text-white mb-8 leading-relaxed font-light">
                "{testimonials[currentIndex].text}"
              </blockquote>

              <div className="flex items-center justify-center space-x-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-white fill-current" />
                ))}
              </div>

              <div className="text-center">
                <h4 className="text-lg font-medium text-white mb-1">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-400 font-light mb-1">
                  {testimonials[currentIndex].business}
                </p>
                <p className="text-gray-500 text-sm">
                  {testimonials[currentIndex].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-rich-black-0 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all duration-300 rounded-lg"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-rich-black-0 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all duration-300 rounded-lg"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;