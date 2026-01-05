import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Search, 
  Zap, 
  Palette, 
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
  Award,
  Shield,
  Cloud,
  Server,
  Globe,
  Target,
  Users
} from 'lucide-react';
import '../styles/services-galaxy.css';

const WebsiteDesignPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [benefitsSlide, setBenefitsSlide] = useState(0);
  const [pricingSlide, setPricingSlide] = useState(0);
  const [hostingSlide, setHostingSlide] = useState(0);

  // Add page class for scoped styling
  useEffect(() => {
    document.body.classList.add('page-website-design');
    return () => {
      document.body.classList.remove('page-website-design');
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
      id: 'ai-speed',
      icon: Zap,
      title: "Smart Technology",
      description: "Modern tools and intelligent workflows for fast, precise delivery"
    },
    {
      id: 'mobile-responsive',
      icon: Smartphone,
      title: "Mobile Responsive",
      description: "Perfect on every device and screen size"
    },
    {
      id: 'seo-optimized',
      icon: Search,
      title: "SEO Optimised",
      description: "Search-ready from day one with expert-led optimisation"
    },
    {
      id: 'strategic-design',
      icon: Palette,
      title: "Handcrafted Design",
      description: "Custom layouts tailored to your brand and audience"
    }
  ];

  const pricingPlans = [
    {
      id: 'basic-package',
      name: "Basic Package",
      price: "£199",
      description: "Perfect for sole traders ready to launch online",
      mostPopular: false,
      features: [
        "One-page landing site",
        "SEO-optimized structure",
        "Mobile responsive design",
        "Contact form integration",
        "Basic analytics setup",
        "1 revision round"
      ]
    },
    {
      id: 'three-page-package',
      name: "Three-Page Package",
      price: "£349",
      description: "Ideal for contractors and small service businesses",
      mostPopular: false,
      features: [
        "Home, Services, Contact pages",
        "Custom brand styling",
        "Advanced SEO optimization",
        "Social media integration",
        "2 revision rounds"
      ]
    },
    {
      id: 'five-page-package',
      name: "Five-Page Package",
      price: "£599",
      description: "Best for growing SMEs needing a scalable website",
      mostPopular: true,
      features: [
        "Home, About, Services, Contact, Gallery",
        "Advanced contact forms",
        "Performance optimization",
        "3 revision rounds"
      ]
    },
    {
      id: 'custom-package',
      name: "Custom Package",
      price: "£799",
      pricePrefix: "from",
      description: "Fully bespoke for established small businesses",
      mostPopular: false,
      features: [
        "Unlimited pages",
        "Advanced functionality",
        "CRM integrations",
        "Custom animations",
        "Unlimited revisions"
      ]
    }
  ];

  const hostingPlans = [
    {
      id: 'basic-tier',
      name: "Basic Tier",
      price: "£69.99",
      description: "Reliable managed hosting with essential support",
      mostPopular: false,
      features: [
        "Reliable hosting infrastructure",
        "SSL certificate included",
        "Basic security monitoring",
        "Weekly automated backups",
        "Email support (48-hour response)",
        "Core software updates"
      ]
    },
    {
      id: 'standard-tier',
      name: "Standard Tier",
      price: "£129.99",
      description: "Complete peace-of-mind hosting and maintenance",
      mostPopular: true,
      features: [
        "Everything in Basic Tier",
        "Faster SSD hosting",
        "Enhanced security features",
        "Daily automated backups",
        "Priority support (24-hour response)",
        "Performance optimization",
        "Monthly performance reports"
      ]
    },
    {
      id: 'professional-tier',
      name: "Professional Tier",
      price: "£249.99",
      description: "Enterprise-grade hosting with personal studio support",
      mostPopular: false,
      features: [
        "Everything in Standard Tier",
        "Premium high-speed hosting",
        "Advanced security & malware protection",
        "Real-time backups",
        "Priority support (4-hour response)",
        "Regular maintenance & updates",
        "Monthly SEO health checks",
        "Dedicated account manager"
      ]
    }
  ];

  const metrics = [
    {
      value: "1-3 weeks",
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
      label: "Mobile Ready",
      description: "responsive design"
    }
  ];

  const whyChooseUs = [
    {
      icon: Target,
      title: "Boutique Studio Approach",
      description: "Every SoleScope website is created in-house by a dedicated specialist — no templates, just custom builds tailored to your business."
    },
    {
      icon: Zap,
      title: "Technology-Enhanced Craftsmanship",
      description: "We blend hands-on creativity with intelligent automation — ensuring fast delivery, perfect responsiveness, and search-ready performance."
    },
    {
      icon: Shield,
      title: "Personal, Reliable Support",
      description: "You'll get the reliability of enterprise-grade infrastructure, but the personal support of a small studio that knows your site inside out."
    }
  ];

  const faqs = [
    {
      question: "How long does it take to build my website?",
      answer: "Most websites are completed within 2-3 weeks. Basic packages can be ready in 1 week, while Custom packages may take up to 4 weeks to ensure every detail is perfect. We work with you directly throughout the entire process.",
      tags: ['timeline', 'delivery', 'project duration']
    },
    {
      question: "Do I need to provide content for my website?",
      answer: "You can provide your own content, or we can create it for you. Our Five-Page and Custom packages include professional copywriting services to ensure your message resonates with your target audience.",
      tags: ['content', 'copywriting', 'text']
    },
    {
      question: "Will my website work on mobile phones?",
      answer: "Absolutely! Every SoleScope website is built mobile-first and tested across multiple devices before launch. Whether your customers visit from their phone, tablet, or desktop, your site will look exceptional and perform flawlessly.",
      tags: ['mobile', 'responsive', 'devices']
    },
    {
      question: "What happens after my website is built?",
      answer: "We provide fully managed hosting and ongoing support through our monthly hosting plans. This includes all technical maintenance, security updates, backups, and support so you never have to worry about the technical side of your website.",
      tags: ['hosting', 'support', 'maintenance']
    },
    {
      question: "Can you integrate my website with my existing business tools?",
      answer: "Yes! We specialize in integrating websites with CRM systems, email marketing platforms, booking systems, and other business tools you already use.",
      tags: ['integrations', 'crm', 'business tools']
    },
    {
      question: "Do you provide SEO services?",
      answer: "All our websites include foundational SEO optimisation as standard. This includes proper page structure, meta tags, and mobile optimisation. We can also provide advanced SEO services for businesses looking to rank higher in local and national search results.",
      tags: ['seo', 'optimization', 'google']
    },
    {
      question: "What if I need changes after my website is live?",
      answer: "We provide ongoing support for all updates and changes. Minor content updates are included in your hosting plan, while larger modifications can be handled directly with your dedicated specialist or as separate projects.",
      tags: ['updates', 'changes', 'modifications']
    },
    {
      question: "Do you offer e-commerce functionality?",
      answer: "Yes! We can integrate e-commerce functionality into your website, including product catalogs, shopping carts, payment processing, and inventory management. This is available in our Custom Package and higher tiers.",
      tags: ['ecommerce', 'online store', 'payments']
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
          <h1>Website Design & Hosting</h1>
          <p>Bespoke websites for UK sole traders and growing SMEs — built by specialists using the latest design technology to help your business stand out and scale.</p>
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
              Why Choose SoleScope for Website Design?
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
                aria-label="Website design benefits"
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

          {/* Website Design Packages */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center uppercase tracking-wide">
              Website Design Packages
            </h2>
            
            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
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
                    {plan.pricePrefix && (
                      <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">{plan.pricePrefix}</p>
                    )}
                    <div className="flex items-end justify-center space-x-1">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      <span className="text-white mb-2 text-sm opacity-60">+ VAT</span>
                    </div>
                    <p className="text-white text-sm opacity-60">One-time payment</p>
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

                  <button className="w-full mt-auto services-btn-secondary">
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
                aria-label="Website design pricing packages"
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
                    {plan.mostPopular && (
                      <span className="wdh-featured-badge-2025" aria-hidden="true">
                        Most Popular
                      </span>
                    )}
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
                      <p className="text-white text-sm opacity-60">One-time payment</p>
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

                    <button className="w-full mt-auto services-btn-secondary text-sm">
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
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4 text-center uppercase tracking-wide">
              Ongoing Hosting & Support Plans
            </h2>
            <p className="text-white text-center mb-8 opacity-80 max-w-3xl mx-auto">
              Our managed hosting keeps your website secure, fast, and always up to date — with zero effort on your end. Hosting and maintenance are fully handled in-house by the same specialists who built your site.
              <strong> These are recurring monthly fees, separate from your one-time website build cost.</strong>
            </p>
            
            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
              {hostingPlans.map((plan, index) => (
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

                  <button className="w-full mt-auto services-btn-secondary">
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
                aria-label="Website hosting plans"
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
                    {plan.mostPopular && (
                      <span className="wdh-featured-badge-2025" aria-hidden="true">
                        Most Popular
                      </span>
                    )}
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

                    <button className="w-full mt-auto services-btn-secondary text-sm">
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
            Ready For A Website That Feels Handcrafted Yet Built With Tomorrow's Technology?
          </h2>
          <p className="text-white mb-8 text-lg leading-relaxed max-w-2xl mx-auto opacity-90">
            Let's start your project today. Serving sole traders, small businesses, and SMEs across the UK.
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

export default WebsiteDesignPage;

/*
 * === MOST POPULAR BADGE IMPLEMENTATION ===
 *
 * Badge Location:
 * - Five-Page Package (Website Design Packages section)
 * - Standard Tier (Ongoing Hosting & Support Plans section)
 *
 * Implementation Details:
 * - Badge class: wdh-featured-badge-2025
 * - Styling location: src/styles/services-galaxy.css (lines 336-371)
 * - Data flags: mostPopular boolean in pricingPlans and hostingPlans arrays
 *
 * Stacking Approach:
 * - Parent cards use isolation: isolate to create stacking context
 * - Cards have overflow: visible to prevent clipping
 * - Badge has z-index: 50 and position: absolute
 * - Badge is decorative only (aria-hidden="true")
 *
 * Responsive Behavior:
 * - Visible on all devices (320px, 768px, 1024px, 1440px tested)
 * - Slightly smaller on screens < 360px to prevent content intrusion
 * - Badge appears on both desktop grid and mobile carousel layouts
 *
 * How to Modify:
 * - Change badge text: Edit "Most Popular" in badge spans (lines 442, 499, 597, 654)
 * - Change badge style: Edit .wdh-featured-badge-2025 in services-galaxy.css
 * - Move badge to different cards: Change mostPopular: true flag in data arrays
 * - Disable badge: Set all mostPopular flags to false or remove conditional rendering
 * - Theme badge: Modify background, color, border properties in CSS
 *
 * Selectors Used:
 * - Five-Page Package: plan.name === "Five-Page Package" (matched via mostPopular flag)
 * - Standard Tier: plan.name === "Standard Tier" (matched via mostPopular flag)
 */