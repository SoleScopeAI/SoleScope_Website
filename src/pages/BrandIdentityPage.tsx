import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Eye, 
  Sparkles, 
  Image, 
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
  Target,
  Zap,
  Shield
} from 'lucide-react';
import '../styles/services-galaxy.css';

const BrandIdentityPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [benefitsSlide, setBenefitsSlide] = useState(0);
  const [pricingSlide, setPricingSlide] = useState(0);

  // Add page class for scoped styling
  useEffect(() => {
    document.body.classList.add('page-brand-identity');
    return () => {
      document.body.classList.remove('page-brand-identity');
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
      id: 'professional-logos',
      icon: Palette,
      title: "Built By Hand",
      description: "Every identity is personally crafted — no templates, just real creative work"
    },
    {
      id: 'cohesive-colors',
      icon: Eye,
      title: "Strategically Designed",
      description: "Colour palettes, typography, and tone — all working together to tell your story"
    },
    {
      id: 'social-ready',
      icon: Sparkles,
      title: "Consistent Everywhere",
      description: "From business cards to social media — your brand looks cohesive across every touchpoint"
    },
    {
      id: 'premium-mockups',
      icon: Image,
      title: "Future-Ready",
      description: "Designed to grow with you — scalable, flexible, and built to last"
    }
  ];

  const pricingPlans = [
    {
      id: 'logo-only',
      name: "Brand Essentials",
      price: "£149–£249",
      description: "Perfect for startups and sole traders building their first professional image",
      features: [
        "Custom logo design",
        "Colour system foundation",
        "Brand typography selection",
        "All file formats included",
        "2 revision rounds",
        "Full commercial rights"
      ],
      popular: false,
      mostPopular: false
    },
    {
      id: 'mini-kit',
      name: "Rebrand Package",
      price: "£349–£549",
      description: "Ideal for growing small businesses ready to refresh their identity",
      features: [
        "Complete logo redesign",
        "Comprehensive brand guidelines",
        "Digital asset suite",
        "Social media templates",
        "Business card design",
        "3 revision rounds",
        "Brand strategy consultation"
      ],
      popular: true,
      mostPopular: false
    },
    {
      id: 'full-pack',
      name: "Full Brand System",
      price: "£649–£899",
      description: "Comprehensive branding for businesses expanding their reach",
      features: [
        "Full visual identity system",
        "Tone of voice guidelines",
        "Branded collateral suite",
        "Multi-platform templates",
        "Custom iconography",
        "Stationery system",
        "Unlimited revisions",
        "Dedicated brand specialist"
      ],
      popular: false,
      mostPopular: true
    },
    {
      id: 'hero-photo-pack',
      name: "Visual Assets Pack",
      price: "£199–£349",
      description: "Custom marketing visuals to complement your brand identity",
      features: [
        "3-5 custom hero visuals",
        "Social media graphics",
        "Ad-ready templates",
        "Multiple format variations",
        "Brand-aligned design",
        "2 revision rounds"
      ],
      popular: false,
      mostPopular: false
    }
  ];

  const metrics = [
    {
      value: "1-3 weeks",
      label: "Delivery Time",
      description: "from start to final"
    },
    {
      value: "100%",
      label: "Custom Design",
      description: "tailored to you"
    },
    {
      value: "< 24h",
      label: "Response Time",
      description: "for all inquiries"
    },
    {
      value: "Full Rights",
      label: "Ownership",
      description: "you own everything"
    }
  ];

  const whyChooseUs = [
    {
      icon: Target,
      title: "Strategic & Personal",
      description: "We believe great design comes from collaboration. You'll work directly with a brand specialist who understands your vision and guides you through every step."
    },
    {
      icon: Zap,
      title: "Modern Creative Process",
      description: "Using the latest design tools and intelligent automation, we explore concepts faster without losing the human creative touch that makes your brand unique."
    },
    {
      icon: Shield,
      title: "Built To Last",
      description: "From discovery to final delivery — we craft identities with meaning, purpose, and visual impact that grows with your business for years to come."
    }
  ];

  const faqs = [
    {
      question: "How long does it take to create my brand identity?",
      answer: "Brand Essentials packages are completed within 1-2 weeks. Rebrand Package takes 2-3 weeks, Full Brand System takes 3-4 weeks, and Visual Assets Pack is ready within 1-2 weeks. Every project is personally managed to ensure quality over speed.",
      tags: ['timeline', 'delivery', 'project duration']
    },
    {
      question: "What if I don't like the initial design concepts?",
      answer: "Every package includes multiple revision rounds, and we work collaboratively with you throughout the entire process. From moodboards to final brand files — you're involved every step of the way until it feels absolutely right.",
      tags: ['revisions', 'satisfaction', 'design process']
    },
    {
      question: "Do I own the rights to my brand designs?",
      answer: "Absolutely. Once the project is complete and payment is made, you own full commercial rights to all brand assets. We provide comprehensive brand guidelines and all source files — everything is yours to use as you grow.",
      tags: ['ownership', 'rights', 'files']
    },
    {
      question: "Can you refresh my existing brand without starting from scratch?",
      answer: "Yes! If you have existing brand elements you'd like to build upon, we can refine and evolve your current identity — enhancing what works while bringing fresh strategic clarity and modern design thinking to your brand.",
      tags: ['existing brand', 'rebranding', 'enhancement']
    },
    {
      question: "What file formats will I receive?",
      answer: "You'll receive your brand assets in all commonly used formats including PNG, JPG, SVG, PDF, and AI/PSD source files. Everything is provided in high resolution and optimised for both print and digital use — ready for any application.",
      tags: ['file formats', 'source files', 'resolution']
    },
    {
      question: "Will I receive brand guidelines for my team?",
      answer: "Yes! Our Rebrand Package and Full Brand System include comprehensive brand guidelines covering logo usage, colour systems, typography, tone of voice, and application examples — ensuring everyone represents your brand consistently.",
      tags: ['brand guidelines', 'team', 'consistency']
    },
    {
      question: "Do you provide social media templates?",
      answer: "Yes! Our Rebrand Package and Full Brand System include social media templates designed to keep your brand consistent across all platforms. We can also create custom platform-specific templates tailored to your marketing needs.",
      tags: ['social media', 'templates', 'platforms']
    },
    {
      question: "Can you design business cards and stationery?",
      answer: "Absolutely! Business card design is included in our Rebrand Package, and the Full Brand System includes a complete stationery suite — letterheads, invoices, email signatures, and more. Everything branded and print-ready.",
      tags: ['business cards', 'stationery', 'marketing materials']
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
          <h1>Brand Identity & Rebranding</h1>
          <p>Stand out with a brand that feels like you. We craft distinctive, timeless brand identities for startups, sole traders, and growing businesses — designed to make your audience remember you.</p>
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
              Your Brand Is More Than A Logo
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
                aria-label="Brand identity benefits"
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

          {/* Brand Identity Packages */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center uppercase tracking-wide">
              Brand Identity Packages
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
                aria-label="Brand identity pricing packages"
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
                { step: "1", title: "Discovery", desc: "Understand your story, audience, and ambitions" },
                { step: "2", title: "Creative Development", desc: "Explore concepts, moodboards, and visual directions" },
                { step: "3", title: "Refinement", desc: "Collaborate to perfect every detail of your identity" },
                { step: "4", title: "Delivery", desc: "Receive complete brand files and comprehensive guidelines" }
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
            Your Business Deserves A Brand That Feels As Confident As You Do
          </h2>
          <p className="text-white mb-8 text-lg leading-relaxed max-w-2xl mx-auto opacity-90">
            Let's create a visual identity that captures who you are — and where you're going. Helping startups, sole traders, and small businesses across the UK build brands that last.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Link
              to="/contact"
              className="services-btn-primary"
            >
              <Calendar className="h-5 w-5" />
              Start My Brand Project
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

export default BrandIdentityPage;