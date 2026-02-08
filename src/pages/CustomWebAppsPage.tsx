import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Database, 
  Cloud, 
  Server, 
  Check, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Calendar,
  Mail,
  ChevronLeft,
  ChevronRight,
  Star,
  Crown,
  Gem,
  Zap,
  Shield,
  Target
} from 'lucide-react';
import '../styles/services-galaxy.css';

const CustomWebAppsPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [benefitsSlide, setBenefitsSlide] = useState(0);
  const [pricingSlide, setPricingSlide] = useState(0);
  const [hostingSlide, setHostingSlide] = useState(0);

  // Add page class for scoped styling
  useEffect(() => {
    document.body.classList.add('page-custom-webapps');
    return () => {
      document.body.classList.remove('page-custom-webapps');
    };
  }, []);

  // Track scroll position for mobile carousels
  useEffect(() => {
    const setupCarouselTracking = (carouselId: string, setSlide: (slide: number) => void, cardWidth: number) => {
      const carousel = document.getElementById(carouselId);
      if (!carousel) return;

      const handleScroll = () => {
        const scrollLeft = carousel.scrollLeft;
        const newSlide = Math.round(scrollLeft / cardWidth);
        setSlide(newSlide);
      };

      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    };

    const cleanupBenefits = setupCarouselTracking('benefits-carousel', setBenefitsSlide, 280);
    const cleanupPricing = setupCarouselTracking('pricing-carousel', setPricingSlide, 300);
    const cleanupHosting = setupCarouselTracking('hosting-carousel', setHostingSlide, 300);

    return () => {
      cleanupBenefits?.();
      cleanupPricing?.();
      cleanupHosting?.();
    };
  }, []);

  const goToSlide = (carouselId: string, index: number, cardWidth: number, setSlide: (slide: number) => void) => {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
      carousel.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setSlide(index);
    }
  };

  const benefits = [
    {
      id: 'custom-development',
      icon: Code,
      title: "Bespoke Development",
      description: "Each solution built around your workflows, brand, and growth goals"
    },
    {
      id: 'database-integration',
      icon: Database,
      title: "Intelligent Data Systems",
      description: "Secure, scalable databases optimised with AI-enhanced workflows"
    },
    {
      id: 'cloud-hosting',
      icon: Cloud,
      title: "Enterprise-Grade Hosting",
      description: "Modern cloud infrastructure for peak performance and uptime"
    },
    {
      id: 'full-management',
      icon: Server,
      title: "Fully Managed Support",
      description: "Seamless technical support from the team that built your app"
    }
  ];

  const pricingPlans = [
    {
      id: 'mvp-package',
      name: "Starter Package",
      price: "£1,500",
      pricePrefix: "from",
      description: "Ideal for growing small businesses ready to add secure client portals or online tools",
      timeline: "Delivery in 2–3 weeks",
      features: [
        "1–3 core features",
        "Rapid prototype design",
        "Simple frontend/backend",
        "Launch-ready hosting included",
        "1 round of revisions"
      ],
      popular: false
    },
    {
      id: 'business-package',
      name: "Business Package",
      price: "£3,000",
      pricePrefix: "from",
      description: "Best for SMEs that need robust, scalable systems — customer portals, booking platforms, or multi-user tools",
      timeline: "Delivery in 3–5 weeks",
      features: [
        "Full UI/UX design",
        "Scalable architecture",
        "Admin/dashboard views",
        "API integrations (e.g. Stripe, Zapier)",
        "Ongoing hosting/setup support"
      ],
      popular: true
    },
    {
      id: 'scalable-package',
      name: "Enterprise Package",
      price: "£5,000",
      pricePrefix: "from",
      description: "Custom-engineered solutions for established businesses requiring advanced functionality and dedicated support",
      timeline: "Delivery 5–8+ weeks",
      features: [
        "Multi-user authentication & permissions",
        "Complex database architecture",
        "Real-time data synchronization",
        "Multiple API integrations & AI-enhanced automation",
        "Custom dashboards",
        "Long-term launch & scaling support"
      ],
      popular: false
    }
  ];

  const hostingPlans = [
    {
      id: 'basic-tier',
      name: "Basic Tier",
      price: "£149.99",
      description: "Secure, reliable hosting with essential managed support",
      features: [
        "VPS or shared hosting infrastructure",
        "SSL certificate included",
        "Basic uptime & security monitoring",
        "Monthly backups",
        "Core plugin & patch updates",
        "Email support (1–2 day response)"
      ],
      popular: false
    },
    {
      id: 'standard-tier',
      name: "Standard Tier",
      price: "£399.99",
      description: "Complete peace-of-mind hosting for scaling SME platforms",
      features: [
        "Everything in Basic Tier",
        "Cloud-based hosting (AWS, Vercel, DigitalOcean)",
        "Database maintenance",
        "Security patching & audits",
        "Performance monitoring & staging environment",
        "Monthly performance reports",
        "Priority support (24–48 hrs)",
        "Minor bug fixes or feature tweaks"
      ],
      popular: true
    },
    {
      id: 'premium-tier',
      name: "Premium Tier",
      price: "£999.99",
      description: "Enterprise-grade infrastructure with full accountability and seamless support",
      features: [
        "Everything in Standard Tier",
        "High-availability multi-server setup",
        "Custom scalable infrastructure (Docker/Kubernetes)",
        "CI/CD deployment support",
        "Dedicated dev hours/month",
        "SLA-based priority support",
        "Penetration testing & compliance (GDPR, HIPAA)",
        "Full monitoring & analytics dashboard"
      ],
      popular: false
    }
  ];

  const metrics = [
    {
      value: "4-8 weeks",
      label: "Delivery Time",
      description: "from start to live"
    },
    {
      value: "99.9%",
      label: "Uptime SLA",
      description: "hosting guarantee"
    },
    {
      value: "< 24h",
      label: "Response Time",
      description: "for all inquiries"
    },
    {
      value: "100%",
      label: "Custom Built",
      description: "tailored solutions"
    }
  ];

  const whyChooseUs = [
    {
      icon: Target,
      title: "Your Digital Development Partner",
      description: "From customer portals and booking systems to internal dashboards — our web apps are built to match how your company actually works. No templates, just bespoke solutions."
    },
    {
      icon: Zap,
      title: "Modern Automation & AI Optimisation",
      description: "Our use of advanced automation and AI-enhanced workflows means your app stays efficient, scalable, and secure as your business evolves."
    },
    {
      icon: Shield,
      title: "Enterprise Results, SME Accessibility",
      description: "We deliver enterprise-level results without the enterprise red tape. Built and supported in the UK by specialists who understand your business."
    }
  ];

  const faqs = [
    {
      question: "What types of web applications can you build?",
      answer: "We develop fully customised web applications including client portals, booking and scheduling systems, inventory management tools, internal dashboards, business management platforms, and e-commerce solutions. Every application is engineered specifically for your business workflows and growth objectives.",
      tags: ['applications', 'custom development', 'business tools']
    },
    {
      question: "How long does it take to develop a custom web application?",
      answer: "Development timelines vary based on complexity. Starter packages typically take 2-3 weeks, Business packages require 3-5 weeks, while Enterprise packages may need 5-8+ weeks. We work collaboratively with you throughout the entire process and provide transparent project timelines from the start.",
      tags: ['timeline', 'development', 'project duration']
    },
    {
      question: "Do you provide ongoing maintenance and support?",
      answer: "Yes! All our hosting packages include ongoing maintenance, security updates, backups, and dedicated technical support. We monitor your applications continuously and handle all infrastructure management — giving you full accountability and seamless support from the team that built your system.",
      tags: ['maintenance', 'support', 'hosting']
    },
    {
      question: "Can you integrate with our existing business systems?",
      answer: "Absolutely! We specialise in creating seamless integrations with your existing CRM systems, accounting software, payment processors, and other business tools. Our API development expertise ensures smooth, secure data flow between all your systems.",
      tags: ['integrations', 'api', 'business systems']
    },
    {
      question: "What hosting infrastructure do you use?",
      answer: "We use modern cloud infrastructure including AWS, Vercel, and DigitalOcean — optimised for uptime, speed, and data protection. This gives SMEs enterprise-grade reliability without enterprise overheads, backed by our 99.9% uptime guarantee.",
      tags: ['hosting', 'infrastructure', 'cloud']
    },
    {
      question: "Do I need technical knowledge to manage my web application?",
      answer: "Not at all! We design intuitive, user-friendly interfaces and provide comprehensive training. All technical complexity is handled by our specialists, so you can focus on using your platform to scale your business.",
      tags: ['user-friendly', 'training', 'management']
    },
    {
      question: "Can you add features after the application is built?",
      answer: "Yes! We design all applications with scalability in mind. New features and enhancements can be added as your business grows — we provide ongoing development support to ensure your platform evolves with your needs.",
      tags: ['scalability', 'features', 'enhancements']
    },
    {
      question: "What security measures do you implement?",
      answer: "We implement enterprise-grade security including SSL encryption, secure authentication, regular security audits, automated backups, and compliance with GDPR and other relevant UK regulations. Your data and your customers' data are fully protected at all times.",
      tags: ['security', 'encryption', 'compliance']
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main id="services" className="services-surface pt-24 pb-20">
      {/* Compact Header */}
      <header className="container services-header">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Custom WebApps & Hosting</h1>
          <p>Powerful, scalable web apps — designed for ambitious SMEs. We design and host fully customised web applications for businesses that have outgrown basic websites. Each build is engineered for performance, reliability, and effortless user experience.</p>
        </motion.div>
      </header>

      {/* Services Cards Surface */}
      <section className="services-cards-surface">
        <div className="container">
          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center uppercase tracking-wide">
              Why Choose SoleScope for Web App Design & Hosting?
            </h2>
            
            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={benefit.id} className="services-refined-card feature-card">
                  <div className="feature-icon">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="feature-title">{benefit.title}</h3>
                  <p className="feature-description">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* Mobile: Carousel */}
            <div className="md:hidden relative">
              <div 
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory scroll-smooth"
                style={{ 
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
                id="benefits-carousel"
                role="region"
                aria-roledescription="carousel"
                aria-label="Custom webapp benefits"
              >
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit.id}
                    className="services-refined-card feature-card flex-shrink-0 w-80 snap-center"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${benefits.length}: ${benefit.title}`}
                    aria-current={benefitsSlide === index ? 'true' : 'false'}
                  >
                    <div className="feature-icon">
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="feature-title">{benefit.title}</h3>
                    <p className="feature-description">{benefit.description}</p>
                  </div>
                ))}
              </div>

              {/* Benefits Navigation */}
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={() => benefitsSlide > 0 && goToSlide('benefits-carousel', benefitsSlide - 1, 280, setBenefitsSlide)}
                  disabled={benefitsSlide === 0}
                  className={`p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 ${
                    benefitsSlide === 0 ? 'opacity-30 cursor-not-allowed' : ''
                  }`}
                  aria-label="Previous benefit"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => benefitsSlide < benefits.length - 1 && goToSlide('benefits-carousel', benefitsSlide + 1, 280, setBenefitsSlide)}
                  disabled={benefitsSlide === benefits.length - 1}
                  className={`p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 ${
                    benefitsSlide === benefits.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
                  }`}
                  aria-label="Next benefit"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {benefits.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide('benefits-carousel', index, 280, setBenefitsSlide)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      benefitsSlide === index
                        ? 'bg-purple-400 scale-125'
                        : 'bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Go to benefit ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* WebApp Development Packages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center uppercase tracking-wide">
              WebApp Development Packages
            </h2>
            
            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
              {pricingPlans.map((plan, index) => (
                <div
                  key={plan.id}
                  className="services-refined-card h-full flex flex-col text-center"
                >

                  <div className="text-center mb-8 pt-2">
                    <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-wide">{plan.name}</h3>
                    <p className="text-white mb-6 leading-relaxed opacity-80">{plan.description}</p>
                    {plan.pricePrefix && (
                      <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">{plan.pricePrefix}</p>
                    )}
                    <div className="flex items-end justify-center space-x-1">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      <span className="text-white mb-2 text-sm opacity-60">+ VAT</span>
                    </div>
                    <p className="text-purple-300 font-medium text-sm">{plan.timeline}</p>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-white font-normal leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact?service=Custom WebApps %26 Hosting#contact-form"
                    className={`w-full mt-auto services-btn-primary ${
                      plan.popular ? '' : 'services-btn-secondary'
                    }`}
                  >
                    GET STARTED
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Mobile: Pricing Carousel */}
            <div className="md:hidden relative">
              <div
                className="flex gap-4 overflow-x-auto scrollbar-hide pt-4 pb-4 snap-x snap-mandatory scroll-smooth"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
                id="pricing-carousel"
                role="region"
                aria-roledescription="carousel"
                aria-label="WebApp development pricing packages"
              >
                {pricingPlans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className="services-refined-card flex-shrink-0 w-72 snap-center h-full flex flex-col text-center"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${pricingPlans.length}: ${plan.name} - ${plan.price}`}
                    aria-current={pricingSlide === index ? 'true' : 'false'}
                  >

                    <div className="text-center mb-6 pt-6">
                      <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">{plan.name}</h3>
                      <p className="text-white mb-4 text-sm leading-relaxed opacity-80">{plan.description}</p>
                      {plan.pricePrefix && (
                        <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">{plan.pricePrefix}</p>
                      )}
                      <div className="flex items-end justify-center space-x-1">
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                        <span className="text-white mb-2 text-sm opacity-60">+ VAT</span>
                      </div>
                      <p className="text-purple-300 font-medium text-sm">{plan.timeline}</p>
                    </div>

                    <ul className="space-y-3 mb-6 flex-grow">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="h-2.5 w-2.5 text-white" />
                          </div>
                          <span className="text-white text-sm font-normal leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/contact?service=Custom WebApps %26 Hosting#contact-form"
                      className={`w-full mt-auto services-btn-primary text-sm ${
                        plan.popular ? '' : 'services-btn-secondary'
                      }`}
                    >
                      GET STARTED
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pricing Navigation */}
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={() => pricingSlide > 0 && goToSlide('pricing-carousel', pricingSlide - 1, 300, setPricingSlide)}
                  disabled={pricingSlide === 0}
                  className={`p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 ${
                    pricingSlide === 0 ? 'opacity-30 cursor-not-allowed' : ''
                  }`}
                  aria-label="Previous pricing package"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => pricingSlide < pricingPlans.length - 1 && goToSlide('pricing-carousel', pricingSlide + 1, 300, setPricingSlide)}
                  disabled={pricingSlide === pricingPlans.length - 1}
                  className={`p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 ${
                    pricingSlide === pricingPlans.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
                  }`}
                  aria-label="Next pricing package"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {pricingPlans.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide('pricing-carousel', index, 300, setPricingSlide)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      pricingSlide === index
                        ? 'bg-purple-400 scale-125'
                        : 'bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Go to package ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Hosting & Support Plans */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4 text-center uppercase tracking-wide">
              Ongoing Hosting & Support Plans
            </h2>
            <p className="text-white text-center mb-8 opacity-80 max-w-3xl mx-auto">
              Our managed hosting keeps your web app running at peak performance — secure, backed up, and continuously monitored. We use modern cloud infrastructure optimised for uptime, speed, and data protection. Everything is managed by the same team that built your application.
              <strong> These are recurring monthly fees, separate from your one-time webapp development cost.</strong>
            </p>
            
            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
              {hostingPlans.map((plan, index) => (
                <div
                  key={plan.id}
                  className="services-refined-card h-full flex flex-col text-center"
                >

                  <div className="text-center mb-8 pt-2">
                    <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-wide">{plan.name}</h3>
                    <p className="text-white mb-6 leading-relaxed opacity-80">{plan.description}</p>
                    <div className="flex items-end justify-center space-x-1">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      <span className="text-white mb-2 text-sm opacity-60">+ VAT</span>
                    </div>
                    <p className="text-white text-sm opacity-60">/month</p>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-white font-normal leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact?service=Custom WebApps %26 Hosting#contact-form"
                    className={`w-full mt-auto services-btn-primary ${
                      plan.popular ? '' : 'services-btn-secondary'
                    }`}
                  >
                    CHOOSE {plan.name.split(' ')[0].toUpperCase()}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Mobile: Hosting Carousel */}
            <div className="md:hidden relative">
              <div
                className="flex gap-4 overflow-x-auto scrollbar-hide pt-4 pb-4 snap-x snap-mandatory scroll-smooth"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
                id="hosting-carousel"
                role="region"
                aria-roledescription="carousel"
                aria-label="WebApp hosting plans"
              >
                {hostingPlans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className="services-refined-card flex-shrink-0 w-72 snap-center h-full flex flex-col text-center"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${hostingPlans.length}: ${plan.name} - ${plan.price}/month`}
                    aria-current={hostingSlide === index ? 'true' : 'false'}
                  >

                    <div className="text-center mb-6 pt-2">
                      <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">{plan.name}</h3>
                      <p className="text-white mb-4 text-sm leading-relaxed opacity-80">{plan.description}</p>
                      <div className="flex items-end justify-center space-x-1">
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                        <span className="text-white mb-2 text-sm opacity-60">+ VAT</span>
                      </div>
                      <p className="text-white text-sm opacity-60">/month</p>
                    </div>

                    <ul className="space-y-3 mb-6 flex-grow">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="h-2.5 w-2.5 text-white" />
                          </div>
                          <span className="text-white text-sm font-normal leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/contact?service=Custom WebApps %26 Hosting#contact-form"
                      className={`w-full mt-auto services-btn-primary text-sm ${
                        'services-btn-secondary'
                      }`}
                    >
                      CHOOSE {plan.name.split(' ')[0].toUpperCase()}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Hosting Navigation */}
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={() => hostingSlide > 0 && goToSlide('hosting-carousel', hostingSlide - 1, 300, setHostingSlide)}
                  disabled={hostingSlide === 0}
                  className={`p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 ${
                    hostingSlide === 0 ? 'opacity-30 cursor-not-allowed' : ''
                  }`}
                  aria-label="Previous hosting plan"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => hostingSlide < hostingPlans.length - 1 && goToSlide('hosting-carousel', hostingSlide + 1, 300, setHostingSlide)}
                  disabled={hostingSlide === hostingPlans.length - 1}
                  className={`p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 ${
                    hostingSlide === hostingPlans.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
                  }`}
                  aria-label="Next hosting plan"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {hostingPlans.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide('hosting-carousel', index, 300, setHostingSlide)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      hostingSlide === index
                        ? 'bg-purple-400 scale-125'
                        : 'bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Go to hosting plan ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
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
            initial={{ opacity: 0, y: 30 }}
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="services-refined-card"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center uppercase tracking-wide">
              How We Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Discover", desc: "We plan, discuss, and map your exact requirements" },
                { step: "2", title: "Design", desc: "Hand-crafted design with your workflows and brand in mind" },
                { step: "3", title: "Develop", desc: "Built using the latest design technology and AI-optimised workflows" },
                { step: "4", title: "Deploy", desc: "Fully managed launch with ongoing technical partnership" }
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

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center uppercase tracking-wide">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="faq-button"
                    aria-expanded={activeIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <div className="flex-1 pr-6">
                      <h3 className="text-xl font-semibold text-white mb-2 uppercase tracking-wide" id={`faq-question-${index}`}>
                        {faq.question}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {faq.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {activeIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-white" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-white/60" />
                    )}
                  </button>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="faq-content" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`}>
                          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="services-refined-card text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6 uppercase tracking-wide">
            Ready To Bring Your Next Idea To Life?
          </h2>
          <p className="text-white mb-8 text-lg leading-relaxed max-w-2xl mx-auto opacity-90">
            Let's build a system that evolves with your business. Designed for SMEs across the UK — built with precision, performance, and personal care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Link
              to="/contact"
              className="services-btn-primary"
            >
              <Calendar className="h-5 w-5" />
              Book A Discovery Call
            </Link>
            <a
              href="mailto:contact@solescope.co.uk"
              className="services-btn-secondary"
            >
              <Mail className="h-5 w-5" />
              Email Us Directly
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-6 text-white/60 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Free consultation</span>
            </div>
            <div className="w-px h-4 bg-white/10"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Response within 24 hours</span>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default CustomWebAppsPage;