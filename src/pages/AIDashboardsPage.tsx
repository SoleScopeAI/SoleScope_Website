import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Eye, 
  Zap, 
  Database, 
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
  Target,
  Shield
} from 'lucide-react';
import '../styles/services-galaxy.css';

const AIDashboardsPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [benefitsSlide, setBenefitsSlide] = useState(0);
  const [pricingSlide, setPricingSlide] = useState(0);

  // Add page class for scoped styling
  useEffect(() => {
    document.body.classList.add('page-ai-dashboards');
    return () => {
      document.body.classList.remove('page-ai-dashboards');
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

    return () => {
      cleanupBenefits?.();
      cleanupPricing?.();
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
      id: 'multi-source-data',
      icon: Database,
      title: "All Your Data, One View",
      description: "Sales, operations, projects, and performance — unified and clear"
    },
    {
      id: 'ai-powered-analytics',
      icon: Zap,
      title: "Smart Automation",
      description: "AI-assisted insights that forecast trends and automate reporting"
    },
    {
      id: 'at-glance-insights',
      icon: Eye,
      title: "Real-Time Clarity",
      description: "Monitor workflow, production, and customer data in real-time"
    },
    {
      id: 'custom-visualizations',
      icon: BarChart3,
      title: "Custom-Built for You",
      description: "Designed from scratch around your specific business goals"
    }
  ];

  const pricingPlans = [
    {
      id: 'basic-package',
      name: "Starter Package",
      price: "£99",
      description: "Ideal for small businesses that need visibility across key performance areas — sales, leads, operations, or job tracking",
      features: [
        "1-2 system integrations",
        "Core performance dashboard",
        "Weekly automated reports",
        "Key metrics & KPI tracking",
        "Mobile-responsive design",
        "Email support"
      ],
      popular: false,
      mostPopular: false
    },
    {
      id: 'standard-package',
      name: "Professional Package",
      price: "£199",
      description: "Designed for SMEs looking to connect CRM, project tools, finance, HR, or production into one intelligent dashboard",
      features: [
        "Up to 5 system integrations",
        "Advanced operations visualisations",
        "Daily automated reports",
        "Custom KPIs & operational metrics",
        "Performance goals & smart alerts",
        "Priority support"
      ],
      popular: true,
      mostPopular: false
    },
    {
      id: 'premium-package',
      name: "Advanced Package",
      price: "£299+",
      description: "Perfect for larger SMEs requiring end-to-end operational oversight, AI forecasting, and secure managed hosting",
      features: [
        "Unlimited system integrations",
        "Fully custom dashboards",
        "Real-time operational updates",
        "Advanced AI insights",
        "Custom integrations",
        "Dedicated account manager",
        "Monthly strategy calls"
      ],
      popular: false,
      mostPopular: true
    }
  ];

  const metrics = [
    {
      value: "2-4 weeks",
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
      title: "Your Real-Time Command Centre",
      description: "Whether it's monitoring sales, managing workflow, tracking production, or understanding customer engagement — your dashboard brings everything together in one clear, easy-to-use view."
    },
    {
      icon: Zap,
      title: "AI-Assisted Intelligence",
      description: "Our systems use AI-assisted insights and automation to surface trends, forecast demand, and highlight opportunities before they're visible in a spreadsheet."
    },
    {
      icon: Shield,
      title: "Secure & Fully Managed",
      description: "Your dashboard runs securely in the cloud with full UK-based managed hosting. All data integrations are encrypted and monitored — your information is protected and always up to date."
    }
  ];

  const faqs = [
    {
      question: "What systems can you integrate?",
      answer: "We can integrate with CRM systems (HubSpot, Salesforce), project management tools (Asana, Monday), accounting software (Xero, QuickBooks), marketing platforms (Google Analytics, Mailchimp), HR systems, and production tools. If you have a specific platform, just ask!",
      tags: ['integrations', 'systems', 'platforms']
    },
    {
      question: "How is this different from standard analytics tools?",
      answer: "Standard analytics focus on one area like website or sales data. Our dashboards combine multiple systems into one unified view — website traffic, CRM data, project status, production metrics, and operational KPIs all in one place with AI-assisted insights that highlight what matters most.",
      tags: ['analytics', 'comparison', 'features']
    },
    {
      question: "Do I need technical knowledge to use the dashboard?",
      answer: "Not at all! Our dashboards are designed for business owners and operations teams, not technical specialists. Everything is presented in clear, easy-to-understand visuals. Think of it as your real-time business command centre — handcrafted by humans, powered by smart technology.",
      tags: ['user-friendly', 'training', 'ease of use']
    },
    {
      question: "How long does it take to set up?",
      answer: "Starter dashboards can be set up within 1-2 weeks. Professional dashboards typically take 2-3 weeks, and Advanced custom dashboards may take 3-4 weeks depending on complexity and the number of integrations required. We work collaboratively with you throughout the entire process.",
      tags: ['timeline', 'setup', 'delivery']
    },
    {
      question: "Can you create custom metrics for my specific business?",
      answer: "Absolutely! Each solution is built from scratch around your business goals, so you see exactly what matters most to you. Whether it's tracking production efficiency, customer lifetime value, project completion rates, or service-specific operational metrics — we craft it all custom.",
      tags: ['custom metrics', 'kpis', 'business specific']
    },
    {
      question: "What happens if my systems change?",
      answer: "We provide ongoing support for all system changes and updates. If you switch platforms, add new operational tools, or change your workflow systems, we'll update your dashboard integrations to ensure continuous data flow and accurate reporting.",
      tags: ['maintenance', 'updates', 'flexibility']
    },
    {
      question: "Can I access my dashboard on mobile devices?",
      answer: "Yes! All our dashboards are fully responsive and optimised for mobile devices. You can monitor operations, check performance metrics, receive alerts, and access reports from anywhere — whether you're tracking projects, revenue, production, or team performance.",
      tags: ['mobile', 'responsive', 'accessibility']
    },
    {
      question: "Do you provide training on how to use the dashboard?",
      answer: "Absolutely! All packages include comprehensive training sessions to ensure you and your team can effectively use the dashboard. We also provide documentation and ongoing support for any questions that arise.",
      tags: ['training', 'support', 'documentation']
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
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>AI & Operations Dashboards</h1>
          <p>Turn your data into clarity. We design intelligent, custom dashboards that help UK sole traders, small businesses, and SMEs track performance, streamline operations, and make smarter decisions — all in one place.</p>
        </motion.div>
      </header>

      {/* Services Cards Surface */}
      <section className="services-cards-surface">
        <div className="container">
          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center uppercase tracking-wide">
              Why Choose SoleScope for AI & Operations Dashboards?
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
                aria-label="AI dashboard benefits"
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

          {/* AI Dashboard Packages */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center uppercase tracking-wide">
              AI Dashboard Packages
            </h2>
            
            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
              {pricingPlans.map((plan, index) => (
                <div
                  key={plan.id}
                  className="services-refined-card h-full flex flex-col text-center"
                >
                  {plan.mostPopular && (
                    <span className="wdh-featured-badge-2025" aria-hidden="true">
                      Most Popular
                    </span>
                  )}
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
                aria-label="AI dashboard pricing packages"
              >
                {pricingPlans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className="services-refined-card flex-shrink-0 w-72 snap-center h-full flex flex-col text-center"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${pricingPlans.length}: ${plan.name} - ${plan.price}/month`}
                    aria-current={pricingSlide === index ? 'true' : 'false'}
                  >
                    {plan.mostPopular && (
                      <span className="wdh-featured-badge-2025" aria-hidden="true">
                        Most Popular
                      </span>
                    )}
                    <div className="text-center mb-6 pt-6">
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

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
            transition={{ duration: 0.8, delay: 0.6 }}
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
            transition={{ duration: 0.8, delay: 0.8 }}
            className="services-refined-card"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center uppercase tracking-wide">
              How We Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Discover", desc: "Identify your performance and operational goals" },
                { step: "2", title: "Design", desc: "Build custom dashboards around your specific workflows" },
                { step: "3", title: "Develop", desc: "Connect your tools using intelligent automation" },
                { step: "4", title: "Deploy", desc: "Launch with training and continuous support" }
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
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
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
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="services-refined-card text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6 uppercase tracking-wide">
            Ready To See Your Business In A New Light?
          </h2>
          <p className="text-white mb-8 text-lg leading-relaxed max-w-2xl mx-auto opacity-90">
            Let's build an intelligent dashboard that gives you clarity, confidence, and control — across every part of your operations. Serving sole traders, small businesses, and SMEs across the UK — combining human design, intelligent automation, and clear, actionable insight.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Link
              to="/contact"
              className="services-btn-primary"
            >
              <Calendar className="h-5 w-5" />
              Start My Dashboard Project
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

export default AIDashboardsPage;