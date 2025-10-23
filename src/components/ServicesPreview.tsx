import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Globe, Code, BarChart3, Palette, Bot, ArrowRight } from 'lucide-react';
import '../styles/homepage-galaxy.css';

const ServicesPreview = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const services = [
    {
      icon: Bot,
      title: "Custom AI Automations",
      description: "Intelligent automation systems for lead qualification, client workflows, and business processes that work 24/7.",
      path: "/services/custom-ai-automations",
      featured: true
    },
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
    }
  ];

  return (
    <section
      ref={ref}
      className="homepage-section"
      aria-labelledby="services-heading"
      role="region"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl font-bold text-white mb-6 uppercase tracking-wide"
          >
            Our Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Complete digital solutions designed specifically for service-based businesses who want to compete and win online.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <Link
                to={service.path}
                className={`homepage-refined-card homepage-service-card block ${
                  service.featured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="homepage-service-icon">
                  <service.icon className="h-10 w-10 text-white drop-shadow-lg" />
                </div>

                <h3 className="homepage-service-title">
                  {service.title}
                </h3>
                <p className="homepage-service-description">
                  {service.description}
                </p>

                <div className="homepage-service-cta">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            to="/services"
            className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold text-lg rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 uppercase tracking-wide"
          >
            <span>View All Services</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;