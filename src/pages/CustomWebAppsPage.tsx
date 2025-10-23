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
      title: "Custom Development",
      description: "Tailored web applications built specifically for your business needs"
    },
    {
      id: 'database-integration',
      icon: Database,
      title: "Database Integration",
      description: "Seamless data management with secure database solutions"
    },
    {
      id: 'cloud-hosting',
      icon: Cloud,
      title: "Cloud Hosting",
      description: "Reliable, scalable hosting infrastructure that grows with you"
    },
    {
      id: 'full-management',
      icon: Server,
      title: "Full Management",
      description: "Complete server management and technical support included"
    }
  ];

  const pricingPlans = [
    {
      id: 'mvp-package',
      name: "MVP Package",
      price: "From £1,500",
      description: "A lean, testable version of your idea",
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
      price: "From £3,000",
      description: "Custom web app for internal systems or client platforms",
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
      name: "Scalable Package",
      price: "From £5,000",
      description: "Advanced custom apps, SaaS, or high-performance tools",
      timeline: "Delivery 5–8+ weeks",
      features: [
        "Multi-user authentication & permissions",
        "Complex database architecture",
        "Real-time data synchronization",
        "Multiple API/AI automations",
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
      description: "Essential hosting & core maintenance",
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
      description: "Professional-grade support for growing apps",
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
      description: "Enterprise-level infrastructure & support",
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

  const faqs = [
    {
      question: "What types of web applications can you build?",
      answer: "We develop a wide range of custom web applications including client portals, booking systems, inventory management tools, CRM systems, e-commerce platforms, and data visualization dashboards. Each application is tailored to your specific business requirements.",
      tags: ['applications', 'custom development', 'business tools']
    },
    {
      question: "How long does it take to develop a custom web application?",
      answer: "Development timelines vary based on complexity. MVP packages typically take 2-3 weeks, Business packages require 3-5 weeks, while Scalable packages may need 5-8+ weeks. We provide detailed project timelines during the planning phase and keep you updated throughout development.",
      tags: ['timeline', 'development', 'project duration']
    },
    {
      question: "Do you provide ongoing maintenance and support?",
      answer: "Yes! All our hosting packages include ongoing maintenance, security updates, backups, and technical support. We monitor your applications 24/7 and handle all server management so you can focus on your business.",
      tags: ['maintenance', 'support', 'hosting']
    },
    {
      question: "Can you integrate with our existing business systems?",
      answer: "Absolutely! We specialize in creating seamless integrations with existing CRM systems, accounting software, payment processors, and other business tools. Our API development expertise ensures smooth data flow between systems.",
      tags: ['integrations', 'api', 'business systems']
    },
    {
      question: "What hosting infrastructure do you use?",
      answer: "We use enterprise-grade cloud hosting with redundant servers, automatic scaling, and global content delivery networks. This ensures your web applications are fast, reliable, and available 24/7 with 99.9% uptime guarantee.",
      tags: ['hosting', 'infrastructure', 'cloud']
    },
    {
      question: "Do I need technical knowledge to manage my web application?",
      answer: "Not at all! We design user-friendly admin interfaces and provide comprehensive training. All technical maintenance is handled by our team, so you can focus on using the application to grow your business.",
      tags: ['user-friendly', 'training', 'management']
    },
    {
      question: "Can you add features after the application is built?",
      answer: "Yes! We design applications with scalability in mind. New features can be added through our development services, and we provide ongoing enhancement options to help your application evolve with your business needs.",
      tags: ['scalability', 'features', 'enhancements']
    },
    {
      question: "What security measures do you implement?",
      answer: "We implement enterprise-grade security including SSL encryption, secure authentication, regular security audits, automated backups, and compliance with GDPR and other relevant regulations. Your data and your customers' data are fully protected.",
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
          <p>Tailored web applications with database integration and enterprise-grade hosting. Complete technical support included.</p>
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
              Why Choose Our Custom WebApp Services?
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

                  <button className={`w-full mt-auto services-btn-primary ${
                    plan.popular ? '' : 'services-btn-secondary'
                  }`}>
                    GET STARTED
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
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

                    <button className={`w-full mt-auto services-btn-primary text-sm ${
                      plan.popular ? '' : 'services-btn-secondary'
                    }`}>
                      GET STARTED
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
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
              After your web application is built, we provide fully managed hosting and maintenance. 
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

                  <button className={`w-full mt-auto services-btn-primary ${
                    plan.popular ? '' : 'services-btn-secondary'
                  }`}>
                    CHOOSE {plan.name.split(' ')[0].toUpperCase()}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
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

                    <button className={`w-full mt-auto services-btn-primary text-sm ${
                      'services-btn-secondary'
                    }`}>
                      CHOOSE {plan.name.split(' ')[0].toUpperCase()}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
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
                { step: "1", title: "Discover", desc: "Understand your business goals and requirements" },
                { step: "2", title: "Design", desc: "Create tailored solutions that fit your needs" },
                { step: "3", title: "Develop", desc: "Build and test your web applications" },
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
            Ready To Build Your Custom Web Application?
          </h2>
          <p className="text-white mb-8 text-lg leading-relaxed max-w-2xl mx-auto opacity-90">
            Let's discuss your project requirements and create a powerful web application that transforms your business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Link
              to="/contact"
              className="services-btn-primary"
            >
              <Calendar className="h-5 w-5" />
              Request Consultation
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