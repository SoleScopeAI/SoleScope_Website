import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedBackground from './AnimatedBackground';

const CTASection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const benefits = [
    "Setup completed in 2 weeks",
    "No technical knowledge required",
    "24/7 support via client portal",
    "Money-back guarantee"
  ];

  return (
    <section ref={ref} className="py-24 bg-rich-black-0 border-t border-gray-800">
      <AnimatedBackground variant="default" className="opacity-40" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center fade-in-up"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-wide uppercase">
            <span className="text-white">STOP LOSING CLIENTS TO</span>
            <br />
            <span className="text-white">OUTDATED DIGITAL SYSTEMS</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12 font-light">
            Join hundreds of UK service businesses using AI-powered websites and automation to win more clients.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center space-x-2 text-gray-300 fade-in-left"
              >
                <CheckCircle className="h-4 w-4 text-white flex-shrink-0" />
                <span className="text-sm font-light">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              to="/contact"
              className="group bg-white text-rich-black-0 px-10 py-4 text-lg font-medium hover:bg-rich-black-0 hover:text-white hover:border hover:border-white hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center uppercase tracking-wide rounded-lg shadow-md"
            >
              START YOUR TRANSFORMATION
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="group bg-rich-black-0 text-white border border-gray-600 px-10 py-4 text-lg font-medium hover:bg-white hover:text-rich-black-0 hover:border-white hover:shadow-lg transition-all duration-300 uppercase tracking-wide rounded-lg"
            >
              BOOK FREE CONSULTATION
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-gray-500 text-sm mt-8 font-light"
          >
            No setup fees • Cancel anytime • Trusted by 500+ businesses
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;