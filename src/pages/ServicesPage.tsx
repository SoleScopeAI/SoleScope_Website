import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Code,
  BarChart3,
  Palette,
  Bot,
  MessageSquare,
  ArrowRight,
  Calendar,
  Mail,
  Zap,
  Shield,
  Target,
  CheckCircle,
  X,
  Send,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Link } from 'react-router-dom';
import '../styles/services-galaxy.css';

const ServicesPage = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    phone: '',
    service: '',
    message: '',
    callbackRequested: false,
    preferredTime: '',
    website: '', // honeypot
    timestamp: Date.now()
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Add page class for scoped styling
  useEffect(() => {
    document.body.classList.add('page-services');
    return () => {
      document.body.classList.remove('page-services');
    };
  }, []);

  // Manage body overflow when modal is open
  useEffect(() => {
    if (isContactFormOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isContactFormOpen]);

  // Separate AI Automations from other services
  const aiAutomationsService = {
    icon: Bot,
    title: "Custom AI Automations",
    description: "Intelligent automation for lead qualification, client onboarding, and business workflows. AI systems that work 24/7 to grow your business while you focus on serving customers.",
    path: "/services/custom-ai-automations",
    features: ["Lead Qualification", "Workflow Automation", "24/7 Operation", "Business Growth"]
  };

  const otherServices = [
    {
      icon: Globe,
      title: "Website Design & Hosting",
      description: "Professional, mobile-responsive websites with fully managed hosting. We handle design, development, maintenance, security, and support for a complete online presence that converts visitors into customers.",
      path: "/services/website-design",
      features: ["Mobile-First Design", "SEO Optimization", "Managed Hosting", "24/7 Support"]
    },
    {
      icon: Code,
      title: "Custom WebApps & Hosting",
      description: "Tailored web applications with database integration and enterprise-grade hosting. From client portals to management systems, we build scalable solutions with complete technical support.",
      path: "/services/custom-webapps",
      features: ["Custom Development", "Database Integration", "Cloud Hosting", "Full Management"]
    },
    {
      icon: BarChart3,
      title: "AI Dashboards & Analytics",
      description: "Transform complex business data into clear, actionable insights with AI-powered dashboards. Multiple data sources, real-time analytics, and automated reporting in one beautiful interface.",
      path: "/services/ai-dashboards",
      features: ["Multi-Source Data", "AI Insights", "Real-Time Updates", "Custom Reports"]
    },
    {
      icon: Palette,
      title: "Brand Identity & Visuals",
      description: "Professional logos, strategic color systems, and brand materials that make your business stand out. Complete visual identities that build trust and attract ideal customers.",
      path: "/services/brand-identity",
      features: ["Logo Design", "Color Systems", "Brand Guidelines", "Marketing Materials"]
    }
  ];

  // Carousel navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % otherServices.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + otherServices.length) % otherServices.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const metrics = [
    {
      value: "500+",
      label: "Projects Delivered",
      description: "successful launches"
    },
    {
      value: "< 24h",
      label: "Response Time",
      description: "for all inquiries"
    },
    {
      value: "99.9%",
      label: "Uptime SLA",
      description: "hosting guarantee"
    },
    {
      value: "2-4 weeks",
      label: "Avg. Delivery",
      description: "from start to live"
    }
  ];

  const whyChooseUs = [
    {
      icon: Target,
      title: "Service-Business Specialist",
      description: "Built specifically for sole traders and small service businesses who need practical digital solutions."
    },
    {
      icon: Zap,
      title: "AI-Powered Efficiency",
      description: "Cutting-edge AI technology combined with proven design principles for faster, better results."
    },
    {
      icon: Shield,
      title: "Complete Support",
      description: "From initial consultation to ongoing maintenance, we handle all the technical complexity for you."
    }
  ];

  const serviceOptions = [
    "Website Design & Hosting",
    "Custom WebApps & Hosting", 
    "AI Dashboards & Analytics",
    "Custom AI Automations",
    "Brand Identity & Visuals",
    "Multiple Services",
    "Not Sure - Need Consultation"
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Anti-spam checks
    if (formData.website) {
      setSubmitStatus('error');
      return;
    }
    
    const fillTime = Date.now() - formData.timestamp;
    if (fillTime < 5000) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          data: {
            name: formData.name,
            email: formData.email,
            business: formData.business,
            phone: formData.phone,
            service: formData.service,
            message: formData.message,
            callbackRequested: formData.callbackRequested,
            preferredTime: formData.preferredTime
          }
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          business: '',
          phone: '',
          service: '',
          message: '',
          callbackRequested: false,
          preferredTime: '',
          website: '',
          timestamp: Date.now()
        });
        // Close form after 3 seconds on success
        setTimeout(() => {
          setIsContactFormOpen(false);
          setSubmitStatus('idle');
        }, 3000);
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const openContactForm = () => {
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
    setSubmitStatus('idle');
  };

  return (
    <main id="services" className="services-surface pt-24 pb-20">
      {/* Compact Header */}
      <header className="container services-header">
        <div>
          <h1>Our Services</h1>
          <p>Complete digital solutions designed specifically for service-based businesses who want to compete and win online.</p>
        </div>
      </header>

      {/* Services Cards Surface */}
      <section className="services-cards-surface">
        <div className="container">
          {/* Featured AI Automations Service */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center uppercase tracking-wide">
              Featured Service
            </h2>
            <Link
              to={aiAutomationsService.path}
              className="services-refined-card service-card block max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="text-center lg:text-left">
                  <div className="service-icon mx-auto lg:mx-0 mb-6">
                    <aiAutomationsService.icon className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="service-title text-left">{aiAutomationsService.title}</h3>
                  <p className="service-description text-left mb-6">{aiAutomationsService.description}</p>
                  <div className="service-cta justify-start">
                    <span>Explore AI Automations</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {aiAutomationsService.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-3 h-3 bg-purple-400 rounded-full flex-shrink-0"></div>
                      <span className="text-white text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Other Services Carousel */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center uppercase tracking-wide">
              Our Core Services
            </h2>
            
            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherServices.map((service, index) => (
                <Link
                  key={service.title}
                  to={service.path}
                  className="services-refined-card service-card"
                >
                  <div className="service-icon">
                    <service.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  
                  {/* Feature highlights */}
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-white text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="service-cta">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile: Carousel */}
            <div className="md:hidden relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {otherServices.map((service, index) => (
                    <div key={service.title} className="w-full flex-shrink-0 px-4">
                      <Link
                        to={service.path}
                        className="services-refined-card service-card block"
                      >
                        <div className="service-icon">
                          <service.icon className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-description">{service.description}</p>
                        
                        {/* Feature highlights */}
                        <div className="mb-6">
                          <div className="grid grid-cols-2 gap-2">
                            {service.features.map((feature) => (
                              <div key={feature} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                <span className="text-white text-xs">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="service-cta">
                          <span>Learn More</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Navigation */}
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={prevSlide}
                  className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
                  aria-label="Previous service"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
                  aria-label="Next service"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {otherServices.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? 'bg-purple-400 scale-125'
                        : 'bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Go to service ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact CTA Card */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <div
              onClick={openContactForm}
              className="services-refined-card service-card cursor-pointer max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="text-center lg:text-left">
                  <div className="service-icon mx-auto lg:mx-0 mb-6">
                    <MessageSquare className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="service-title text-left">Get Started Today</h3>
                  <p className="service-description text-left mb-6">Ready to transform your business? Contact our team for a free consultation and personalized quote tailored to your specific needs and goals.</p>
                  <div className="service-cta justify-start">
                    <span>Start Your Project</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {["Free Consultation", "Custom Quote", "24h Response", "No Obligation"].map((feature) => (
                    <div key={feature} className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-3 h-3 bg-purple-400 rounded-full flex-shrink-0"></div>
                      <span className="text-white text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="metrics-grid"
          >
            {metrics.map((metric, index) => (
              <div key={metric.label} className="services-refined-card metric-card">
                <div className="metric-value">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
                <div className="metric-description">{metric.description}</div>
              </div>
            ))}
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center uppercase tracking-wide">
              Why Choose SoleScope
            </h2>
            <div className="features-grid">
              {whyChooseUs.map((feature, index) => (
                <div key={feature.title} className="services-refined-card feature-card">
                  <div className="feature-icon">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Process Overview */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="services-refined-card"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center uppercase tracking-wide">
              How We Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Discover", desc: "Understand your business goals and requirements" },
                { step: "2", title: "Design", desc: "Create tailored solutions that fit your needs" },
                { step: "3", title: "Develop", desc: "Build and test your digital solutions" },
                { step: "4", title: "Deploy", desc: "Launch and provide ongoing support" }
              ].map((process) => (
                <div key={process.step} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{process.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 uppercase tracking-wide">{process.title}</h3>
                  <p className="text-white text-sm">{process.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="services-refined-card text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6 uppercase tracking-wide">
            Ready to Transform Your Business?
          </h2>
          <p className="text-white mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
            Let's discuss your project and create digital solutions that help you win more clients and grow sustainably.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <button
              onClick={openContactForm}
              className="services-btn-primary"
            >
              <Calendar className="h-5 w-5" />
              Start Your Project
            </button>
            <a
              href="mailto:contact@solescope.co.uk"
              className="services-btn-secondary"
            >
              <Mail className="h-5 w-5" />
              Email Us Directly
            </a>
          </div>
        </motion.div>
      </section>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {isContactFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closeContactForm}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Get Started Today</h2>
                    <p className="text-gray-400">Let's discuss your project</p>
                  </div>
                </div>
                <button
                  onClick={closeContactForm}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close contact form"
                >
                  <X className="h-6 w-6 text-gray-400" />
                </button>
              </div>

              {submitStatus === 'success' ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
                  <p className="text-gray-300 mb-2">Your message has been sent successfully.</p>
                  <p className="text-gray-400 text-sm">We'll respond within 24 hours with next steps.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Honeypot field (hidden) */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleFormChange}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="business" className="block text-sm font-semibold text-white mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        id="business"
                        name="business"
                        value={formData.business}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="Your business name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="+44 20 1234 5678"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-white mb-2">
                      Service of Interest *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    >
                      <option value="">Select a service...</option>
                      {serviceOptions.map((service) => (
                        <option key={service} value={service} className="bg-gray-900 text-white">{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                      placeholder="Tell us about your project, goals, and how we can help transform your business..."
                    />
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                    <input
                      type="checkbox"
                      id="callbackRequested"
                      name="callbackRequested"
                      checked={formData.callbackRequested}
                      onChange={handleFormChange}
                      className="mt-1 w-5 h-5 text-purple-600 bg-white/10 border-white/30 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <div className="flex-1">
                      <label htmlFor="callbackRequested" className="text-sm font-semibold text-white cursor-pointer">
                        Request a callback
                      </label>
                      <p className="text-xs text-gray-400 mt-1">
                        We'll call you within 24 hours to discuss your project
                      </p>
                    </div>
                  </div>

                  {formData.callbackRequested && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label htmlFor="preferredTime" className="block text-sm font-semibold text-white mb-2">
                        Preferred Call Time
                      </label>
                      <input
                        type="text"
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="e.g., Weekdays 2-4 PM"
                      />
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <span className="text-lg">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                    <Send className="ml-2 h-5 w-5" />
                  </button>

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
                    >
                      <p className="text-red-300 font-medium text-center">
                        ✗ There was an error sending your message. Please try again or email us directly at contact@solescope.co.uk
                      </p>
                    </motion.div>
                  )}

                  <div className="text-center pt-4 border-t border-white/10">
                    <p className="text-gray-400 text-sm">
                      Free consultation • No obligation • Response within 24 hours
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ServicesPage;