import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, TrendingUp, Award, Users, Clock, Shield, Zap, Target, ChevronLeft, ChevronRight } from 'lucide-react';

const ClientSuccessMetrics = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const metrics = [
    {
      icon: Users,
      value: '350+',
      label: 'Happy Clients',
      description: 'Businesses transformed',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Star,
      value: '4.9',
      label: 'Average Rating',
      description: 'From 200+ reviews',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      value: '98%',
      label: 'Success Rate',
      description: 'Projects delivered on time',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Clock,
      value: '< 24h',
      label: 'Response Time',
      description: 'Average support response',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Target,
      value: '180%',
      label: 'ROI Average',
      description: 'Client return on investment',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Shield,
      value: '99.9%',
      label: 'Uptime SLA',
      description: 'Guaranteed availability',
      color: 'from-purple-500 to-fuchsia-500'
    },
    {
      icon: Zap,
      value: '12.5k',
      label: 'Hours Automated',
      description: 'Time saved for clients',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Award,
      value: '15+',
      label: 'Industry Awards',
      description: 'Recognition & certifications',
      color: 'from-pink-500 to-red-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      business: 'Paws & Claws Dog Grooming',
      location: 'Manchester, UK',
      rating: 5,
      text: 'SoleScope transformed my business completely. My new website books appointments automatically, and I\'m getting three times more local customers. The AI chatbot answers questions even when I\'m busy with clients!',
      image: 'https://images.pexels.com/photos/3727464/pexels-photo-3727464.jpeg?auto=compress&cs=tinysrgb&w=150',
      results: ['300% increase in bookings', '24/7 customer service', '15min response time']
    },
    {
      name: 'James Thompson',
      business: 'Thompson Carpentry',
      location: 'Birmingham, UK',
      rating: 5,
      text: 'I was losing customers because my old website looked unprofessional. Within two weeks, SoleScope delivered a stunning site that shows off my work perfectly. My phone hasn\'t stopped ringing since.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      results: ['250% more inquiries', '2-week delivery', 'Mobile optimized']
    },
    {
      name: 'Emma Rodriguez',
      business: 'Blade Sharp Services',
      location: 'London, UK',
      rating: 5,
      text: 'The automation setup has saved me hours every week. Customer inquiries, booking confirmations, and follow-ups all happen automatically. I can focus on what I do best while the system handles the rest.',
      image: 'https://images.pexels.com/photos/3727463/pexels-photo-3727463.jpeg?auto=compress&cs=tinysrgb&w=150',
      results: ['40hrs saved/month', 'Zero missed leads', '180% ROI']
    },
    {
      name: 'Michael Chen',
      business: 'Elite Fitness Studio',
      location: 'Leeds, UK',
      rating: 5,
      text: 'The custom booking system and member portal have completely streamlined our operations. Members love the convenience, and we\'ve reduced admin work by 85%. Best investment we\'ve made.',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
      results: ['400+ new members', '85% less admin', '£120k revenue increase']
    },
    {
      name: 'Lisa Anderson',
      business: 'Anderson Legal Services',
      location: 'Edinburgh, UK',
      rating: 5,
      text: 'The AI-powered client intake system has revolutionized how we onboard new clients. What used to take hours now happens in minutes, and client satisfaction has never been higher.',
      image: 'https://images.pexels.com/photos/3727466/pexels-photo-3727466.jpeg?auto=compress&cs=tinysrgb&w=150',
      results: ['90% faster onboarding', '500+ clients processed', '95% satisfaction']
    }
  ];

  const clientLogos = [
    'Design K9', 'UK Blade Sharp', 'Jodie\'s Pooches', 'Elite Fitness', 'Anderson Legal',
    'Smart Home', 'Local Trades', 'Pet Paradise', 'Quick Fix', 'Pro Services'
  ];

  const awards = [
    { title: 'Best Web Design Agency', year: '2024', organization: 'UK Digital Awards' },
    { title: 'AI Innovation Leader', year: '2024', organization: 'Tech Excellence' },
    { title: 'Customer Service Excellence', year: '2023', organization: 'Business Awards' },
    { title: 'Top Rated Developer', year: '2023', organization: 'Trustpilot' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-black via-purple-950/10 to-black"
      aria-labelledby="metrics-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            id="metrics-heading"
            className="text-4xl sm:text-5xl font-bold text-white mb-6 uppercase tracking-wide"
          >
            Proven Track Record
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Real results from real businesses. See why companies across the UK trust us with their digital transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <motion.div
                className={`w-14 h-14 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <metric.icon className="h-7 w-7 text-white" />
              </motion.div>
              <div className="text-3xl font-bold text-white mb-2 text-center group-hover:text-purple-400 transition-colors">
                {metric.value}
              </div>
              <div className="text-sm font-semibold text-slate-200 mb-1 text-center">
                {metric.label}
              </div>
              <div className="text-xs text-slate-400 text-center">
                {metric.description}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            What Our Clients Say
          </h3>

          <div className="relative max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-12"
              >
                <div className="flex items-center justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-white mb-8 leading-relaxed text-center font-light">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {testimonials[currentTestimonial].results.map((result, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm text-purple-300 font-medium"
                    >
                      {result}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30 shadow-lg"
                  />
                  <div className="text-center sm:text-left">
                    <h4 className="text-xl font-semibold text-white mb-1">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-purple-400 font-medium">
                      {testimonials[currentTestimonial].business}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {testimonials[currentTestimonial].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-purple-500 scale-125'
                      : 'bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Trusted By Leading Businesses
          </h3>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-8 px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-semibold text-lg whitespace-nowrap"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center space-x-3">
            <Award className="h-8 w-8 text-purple-400" />
            <span>Awards & Recognition</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">{award.title}</h4>
                <p className="text-sm text-purple-400 mb-1">{award.year}</p>
                <p className="text-xs text-slate-400">{award.organization}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientSuccessMetrics;
