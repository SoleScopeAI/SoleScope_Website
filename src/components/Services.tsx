import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Globe, 
  Code, 
  BarChart3,
  Palette,
  Workflow,
} from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

const Services = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const services = [
    {
      icon: Globe,
      title: "Website Design & Hosting",
      description: "Professional websites that work on every device, rank well on Google, and convert visitors into paying customers. Includes hosting, security, and ongoing support."
    },
    {
      icon: Code,
      title: "Custom WebApps & Hosting",
      description: "Custom-built web applications that solve your specific business challenges. From client portals to booking systems—all with enterprise-grade hosting and 24/7 monitoring."
    },
    {
      icon: BarChart3,
      title: "AI Dashboards & Analytics",
      description: "Transform complex business data into clear, actionable insights with custom AI-powered dashboards. Real-time analytics and automated reporting to make data-driven decisions."
    },
    {
      icon: Palette,
      title: "Brand Identity & Visuals",
      description: "Complete brand identity packages including logos, color schemes, and marketing materials that make your business look professional and trustworthy."
    },
    {
      icon: Workflow,
      title: "Custom AI Automations",
      description: "Intelligent automation systems that handle lead qualification, client onboarding, review collection, and business workflows while you focus on serving customers."
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-rich-black-1">
      <AnimatedBackground variant="section" className="opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 fade-in-up"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-wide uppercase">
            COMPLETE DIGITAL SOLUTIONS FOR SERVICE BUSINESSES
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto font-light">
            From stunning websites to powerful automation systems—everything you need to compete digitally and win more clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group bg-rich-black-0 border border-gray-800 p-8 hover:border-white transition-all duration-300 rounded-lg shadow-md fade-in-up"
            >
              <div className="w-12 h-12 mb-6 flex items-center justify-center">
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-white mb-4 tracking-wide uppercase">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;