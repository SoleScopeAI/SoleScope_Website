import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Star } from 'lucide-react';

const TestimonialsStrip = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Jodie Thompson",
      business: "Jodie's Pampered Pooches",
      service: "Website Design & Hosting",
      quote: "SoleScope transformed our online presence completely. The automated booking system has saved us countless hours and our client bookings have increased by over 130%. Absolutely worth the investment!",
      rating: 5
    },
    {
      id: 2,
      name: "Mark Stevens",
      business: "Design K9 Training",
      service: "Custom WebApp",
      quote: "Working with SoleScope was seamless from start to finish. They built us a custom training management platform that our clients love. The team's expertise in both design and automation is unmatched.",
      rating: 5
    },
    {
      id: 3,
      name: "Sarah Mitchell",
      business: "UK Blade Sharpening",
      service: "AI Automations",
      quote: "The AI-powered lead qualification system has been a game-changer. We're now able to respond to qualified leads instantly, and our conversion rate has nearly doubled. SoleScope delivers real results.",
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wide"
          >
            Client Success Stories
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Hear from businesses we've helped transform with intelligent digital solutions.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto h-[400px] sm:h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Quote className="h-8 w-8 text-white" />
                  </motion.div>

                  <div className="flex justify-center mb-4">
                    {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      >
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-xl text-white text-center mb-8 leading-relaxed max-w-3xl mx-auto">
                    "{testimonials[activeTestimonial].quote}"
                  </blockquote>

                  <div className="text-center">
                    <div className="text-lg font-bold text-white mb-1">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-base text-purple-400 font-semibold mb-1">
                      {testimonials[activeTestimonial].business}
                    </div>
                    <div className="inline-block px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full">
                      <span className="text-sm text-slate-300">
                        {testimonials[activeTestimonial].service}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center space-x-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeTestimonial
                  ? 'bg-purple-500 w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsStrip;
