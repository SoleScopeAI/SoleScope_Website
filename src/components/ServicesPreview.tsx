import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Globe, Code, BarChart3, Palette, Bot, ArrowRight, MessageSquare } from 'lucide-react';

const ServicesPreview = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const services = [
    {
      icon: Globe,
      title: "Website Design & Hosting",
      description: "Professional, mobile-responsive websites with fully managed hosting and ongoing support.",
      path: "/services/website-design"
    },
    {
      icon: Code,
      title: "Custom WebApps & Hosting",
      description: "Tailored web applications with enterprise-grade hosting and complete technical management.",
      path: "/services/custom-webapps"
    },
    {
      icon: BarChart3,
      title: "AI Dashboards & Analytics",
      description: "Transform complex data into clear insights with custom AI-powered business intelligence.",
      path: "/services/ai-dashboards"
    },
    {
      icon: Palette,
      title: "Brand Identity & Visuals",
      description: "Complete brand identity packages with logos, color systems, and marketing materials.",
      path: "/services/brand-identity"
    },
    {
      icon: Bot,
      title: "Custom AI Automations",
      description: "Intelligent automation systems for lead qualification, client workflows, and business processes.",
      path: "/services/custom-ai-automations",
      isAI: true
    },
    {
      icon: MessageSquare,
      title: "Build Your Enquiry",
      description: "Get a personalized quote or discuss your project needs with our expert team.",
      path: "/contact"
    }
  ];

  return (
    <section 
      ref={ref} 
      className="relative py-20 overflow-hidden"
      aria-labelledby="services-heading"
      role="region"
    >
      {/* Enhanced Galaxy Background */}
      <div className="absolute inset-0 z-0">
        {/* Base galaxy gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#05050c] via-[#0c0816] to-[#05050c]"></div>
        
        {/* Multi-layer animated nebulas */}
        <div 
          className="absolute inset-0 opacity-70"
          style={{
            background: `
              radial-gradient(1400px 900px at 16% 22%, rgba(168,85,247,0.18), transparent 65%),
              radial-gradient(1200px 800px at 84% 68%, rgba(217,70,239,0.12), transparent 60%),
              radial-gradient(1000px 700px at 10% 88%, rgba(124,58,237,0.10), transparent 55%),
              radial-gradient(800px 600px at 90% 15%, rgba(147,51,234,0.08), transparent 50%)
            `,
            animation: 'galaxyTwinkle 10s ease-in-out infinite'
          }}
        ></div>
        
        {/* Floating star particles */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            background: `
              radial-gradient(2px 2px at 12% 18%, rgba(255,255,255,0.7), transparent),
              radial-gradient(1.5px 1.5px at 28% 76%, rgba(255,255,255,0.5), transparent),
              radial-gradient(2px 2px at 72% 38%, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 58% 58%, rgba(255,255,255,0.4), transparent),
              radial-gradient(1.5px 1.5px at 86% 14%, rgba(255,255,255,0.5), transparent)
            `,
            backgroundSize: '300px 300px, 200px 200px, 250px 250px, 150px 150px, 220px 220px',
            animation: 'galaxyDrift 100s linear infinite'
          }}
        ></div>
        
        {/* Dynamic pulse glows */}
        <div 
          className="absolute top-1/3 left-1/5 w-96 h-96 rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)',
            animation: 'galaxyPulse 6s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(217,70,239,0.5) 0%, transparent 70%)',
            animation: 'galaxyPulse 6s ease-in-out infinite 1.5s'
          }}
        ></div>
        <div 
          className="absolute top-2/3 left-2/3 w-64 h-64 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)',
            animation: 'galaxyPulse 6s ease-in-out infinite 3s'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            id="services-heading"
            className="text-4xl sm:text-5xl font-bold text-white mb-6 text-shadow uppercase tracking-wide"
          >
            What We Do
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Complete digital solutions designed specifically for service-based businesses who want to compete and win online.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
          role="list"
          aria-label="Our services"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
              role="listitem"
            >
              <Link
                to={service.path}
                aria-labelledby={`service-title-${index}`}
                aria-describedby={`service-desc-${index}`}
                className={`group relative overflow-hidden backdrop-blur-sm border rounded-3xl p-8 shadow-2xl transition-all duration-500 h-full flex flex-col text-center focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black ${
                  service.isAI 
                    ? 'bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-emerald-500/20 border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-400/30' 
                    : 'bg-gradient-to-br from-gray-900/80 to-black/90 border-white/10 hover:border-purple-400/30 hover:shadow-purple-500/20'
                }`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = service.path;
                  }
                }}
              >
                {/* Glass morphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
                
                {/* Special AI shimmer effect */}
                {service.isAI && (
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                      animation: 'shimmer 3s ease-in-out infinite'
                    }}
                  ></div>
                )}

                {/* Icon */}
                <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 transition-transform duration-300 group-hover:scale-110 group-focus:scale-110 ${
                  service.isAI 
                    ? 'bg-gradient-to-br from-cyan-400/30 via-purple-500/30 to-emerald-400/30 border border-cyan-400/40' 
                    : 'bg-gradient-to-br from-purple-600/30 to-purple-700/30 border border-white/20'
                }`}>
                  <service.icon className="h-10 w-10 text-white drop-shadow-lg" />
                  
                  {/* AI special effects */}
                  {service.isAI && (
                    <>
                      {/* Shimmer overlay on icon */}
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                          animation: 'shimmer 2s ease-in-out infinite'
                        }}
                      ></div>
                      
                      {/* Pulsing glow */}
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(168,85,247,0.2), rgba(16,185,129,0.2))',
                          filter: 'blur(8px)',
                          transform: 'scale(1.2)',
                          animation: 'aiGlow 3s ease-in-out infinite'
                        }}
                      ></div>
                    </>
                  )}
                  
                  {/* Regular icon glow */}
                  {!service.isAI && (
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(124,58,237,0.3))',
                        filter: 'blur(8px)',
                        transform: 'scale(1.2)'
                      }}
                    ></div>
                  )}
                </div>

                {/* Content */}
                <h3 
                  id={`service-title-${index}`}
                  className={`text-xl font-bold mb-6 transition-colors duration-300 leading-tight uppercase tracking-wide ${
                    service.isAI 
                      ? 'text-white group-hover:text-cyan-200 group-focus:text-cyan-200' 
                      : 'text-white group-hover:text-purple-300 group-focus:text-purple-300'
                  }`}
                >
                  {service.title}
                </h3>
                <p 
                  id={`service-desc-${index}`}
                  className="text-gray-300 text-lg leading-relaxed mb-8 group-hover:text-gray-200 group-focus:text-gray-200 transition-colors duration-300 flex-grow"
                >
                  {service.description}
                </p>

                {/* Learn More Link */}
                <div className={`flex items-center justify-center font-medium transition-colors duration-300 ${
                  service.isAI 
                    ? 'text-cyan-400 group-hover:text-cyan-300 group-focus:text-cyan-300' 
                    : 'text-purple-400 group-hover:text-purple-300 group-focus:text-purple-300'
                }`}>
                  <span className="font-medium">Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            to="/services"
            aria-label="Explore all our services in detail"
            className="group relative inline-flex items-center px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold text-lg rounded-2xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
          >
            {/* Button shimmer effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                animation: 'shimmer 2s ease-in-out infinite'
              }}
            ></div>
            
            <span className="relative z-10">Explore All Services</span>
            <ArrowRight className="relative z-10 ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;