import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Monitor, Code, LayoutDashboard, Bot } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

const HeroSection = () => {
  const services = [
    {
      icon: Monitor,
      label: "Website Design & Hosting",
      path: "/services/website-design"
    },
    {
      icon: Code,
      label: "Web App Development",
      path: "/services/custom-webapps"
    },
    {
      icon: LayoutDashboard,
      label: "Custom Dashboards",
      path: "/services/ai-dashboards"
    },
    {
      icon: Bot,
      label: "Custom AI Automations",
      path: "/services/custom-ai-automations"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-rich-black-0 overflow-hidden pt-20 md:pt-0">
      {/* Enhanced animated background */}
      <AnimatedBackground variant="hero" />
      
      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 md:pt-0 fade-in-up">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight tracking-tight parallax-slow"
        >
          Smart Websites. Smarter Systems.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl text-gray-300 font-light mb-12 max-w-4xl mx-auto leading-relaxed parallax-medium"
        >
          We build websites, apps, dashboards, and AI automations — all done for you.
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
        >
          <Link
            to="/contact"
            className="group bg-white text-rich-black-0 px-10 py-4 text-lg font-medium hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center uppercase tracking-wide rounded-lg shadow-md"
          >
            Start Your Project
          </Link>
          <Link
            to="/services"
            className="group border border-white text-white px-10 py-4 text-lg font-medium hover:bg-white hover:text-rich-black-0 hover:shadow-lg transition-all duration-300 flex items-center justify-center uppercase tracking-wide rounded-lg"
          >
            See Our Work
          </Link>
        </motion.div>

        {/* Service Icons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto scale-in"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="fade-in-up">
              <Link
                to={service.path}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-16 h-16 mb-4 flex items-center justify-center border border-gray-600 rounded-lg group-hover:border-white transition-colors duration-300">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <p className="text-white text-sm font-medium text-center uppercase tracking-wide">
                  {service.label}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;