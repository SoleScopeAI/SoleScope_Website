import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Smartphone, 
  Search, 
  Zap, 
  Users, 
  Check, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Calendar
} from 'lucide-react';

const AIWebsiteDesignPage = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const benefits = [
    {
      icon: Smartphone,
      title: "Mobile-Friendly",
      description: "Responsive design that looks perfect on all devices"
    },
    {
      icon: Search,
      title: "SEO-Ready",
      description: "Built-in optimization to rank higher on Google"
    },
    {
      icon: Users,
      title: "CRM-Integrated",
      description: "Seamlessly connects with your business systems"
    },
    {
      icon: Zap,
      title: "Lightning-Fast",
      description: "Optimized for speed and performance"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "£299",
      description: "Perfect for new businesses",
      features: [
        "1-3 pages",
        "Basic SEO setup",
        "Mobile responsive design",
        "Contact form integration",
        "1 revision round",
        "30-day support"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "£599",
      description: "Most popular for growing businesses",
      features: [
        "4-6 pages",
        "Custom brand styling",
        "Blog setup & CMS",
        "Advanced SEO optimization",
        "Social media integration",
        "2 revision rounds",
        "60-day support"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "£999",
      description: "Complete solution for established businesses",
      features: [
        "7+ pages",
        "CRM & email integration",
        "Professional copywriting",
        "Analytics & tracking setup",
        "Full brand styling package",
        "E-commerce capability",
        "Unlimited revisions",
        "90-day support"
      ],
      popular: false
    }
  ];

  const faqs = [
    {
      question: "How long does it take to build my website?",
      answer: "Most websites are completed within 2-3 weeks. Starter packages can be ready in 1 week, while Premium packages may take up to 4 weeks to ensure every detail is perfect."
    },
    {
      question: "Do I need to provide content for my website?",
      answer: "You can provide your own content, or we can create it for you. Our Pro and Premium packages include professional copywriting services to ensure your message resonates with your target audience."
    },
    {
      question: "Will my website work on mobile phones?",
      answer: "Absolutely! All our websites are built mobile-first, meaning they're designed to look and work perfectly on smartphones, tablets, and desktops. We test on multiple devices before launch."
    },
    {
      question: "What happens after my website is built?",
      answer: "We provide ongoing support and can help with updates, maintenance, and improvements. We also offer monthly maintenance packages to keep your website secure and up-to-date."
    },
    {
      question: "Can you integrate my website with my existing business tools?",
      answer: "Yes! We specialize in integrating websites with CRM systems, email marketing platforms, booking systems, and other business tools you already use."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="pt-24 pb-20 dark-theme-page">
      {/* Hero Section */}
      <section className="relative py-40 premium-bg overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="floating-particles"></div>
        <div className="pulse-glow pulse-glow-1"></div>
        <div className="pulse-glow pulse-glow-2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 relative z-10"
          >
            <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 leading-tight tracking-tight dark-text-primary uppercase">
              Future-Proof Websites, Built by AI & Design Experts
            </h1>
            <p className="text-xl dark-text-body max-w-4xl mx-auto mb-16 leading-relaxed font-normal">
              We create high-converting, mobile-optimized, SEO-friendly websites powered by AI. 
              Perfect for service-based small businesses who need more than a DIY template.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <a
                href="#pricing"
                className="dark-btn-primary px-10 py-4 text-lg font-medium hover:scale-105 transition-all duration-300 flex items-center justify-center tracking-wide uppercase rounded-xl"
              >
                View Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#cta"
                className="dark-btn-secondary px-10 py-4 text-lg font-medium transition-all duration-300 tracking-wide uppercase rounded-xl"
              >
                Book Discovery Call
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={ref} className="py-20 premium-bg relative overflow-hidden">
        <div className="floating-particles"></div>
        <div className="pulse-glow pulse-glow-1"></div>
        <div className="pulse-glow pulse-glow-2"></div>
        <div className="floating-particles"></div>
        <div className="pulse-glow pulse-glow-1"></div>
        <div className="pulse-glow pulse-glow-2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 uppercase tracking-wide">
              Why Choose Our AI-Powered Approach?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-normal">
              We combine cutting-edge AI technology with human expertise to deliver websites that actually work for your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-visible bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-sm border border-white/10 rounded-3xl p-10 shadow-2xl hover:shadow-purple-500/20 hover:border-purple-400/30 focus-within:border-purple-400/50 focus-within:shadow-purple-500/30 transition-all duration-500 h-full flex flex-col text-center"
                tabIndex={0}
                role="article"
                aria-labelledby={`benefit-title-${benefit.title.toLowerCase().replace(/\s+/g, '-')}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    // Add any interaction logic here if needed
                  }
                }}
              >
                <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center bg-gradient-to-br from-purple-600/30 to-purple-700/30 border border-white/20 rounded-2xl group-hover:scale-110 group-focus-within:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-10 w-10 text-white drop-shadow-lg" />
                </div>
                <h3 id={`benefit-title-${benefit.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-2xl font-bold text-white mb-6 uppercase tracking-wide leading-tight">{benefit.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed flex-grow">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 premium-bg relative overflow-hidden">
        <div className="floating-particles"></div>
        <div className="pulse-glow pulse-glow-1"></div>
        <div className="pulse-glow pulse-glow-2"></div>
        <div className="floating-particles"></div>
        <div className="pulse-glow pulse-glow-1"></div>
        <div className="pulse-glow pulse-glow-2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              <span className="text-white uppercase tracking-wide">
                Website Design Packages
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-normal">
              Choose the perfect package for your business needs. All packages include hosting, SSL, and ongoing support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative overflow-visible dark-card h-full flex flex-col"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold dark-text-primary mb-2 uppercase tracking-wide">{plan.name}</h3>
                  <p className="dark-text-body mb-4">{plan.description}</p>
                  <div className="flex items-end justify-center space-x-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="dark-text-muted mb-1">+ VAT</span>
                  </div>
                  <p className="dark-text-muted">One-time payment</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-accent-primary flex-shrink-0 mt-0.5" />
                      <span className="dark-text-body font-normal">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full mt-auto inline-flex items-center justify-center px-6 py-4 font-semibold rounded-lg transition-all duration-300 uppercase tracking-wide ${
                  plan.popular
                    ? 'dark-btn-primary'
                    : 'dark-btn-secondary'
                }`}>
                  GET STARTED
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 premium-bg relative overflow-hidden">
        <div className="floating-particles"></div>
        <div className="pulse-glow pulse-glow-1"></div>
        <div className="pulse-glow pulse-glow-2"></div>
        <div className="floating-particles"></div>
        <div className="pulse-glow pulse-glow-1"></div>
        <div className="pulse-glow pulse-glow-2"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 uppercase tracking-wide">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400 font-normal">
              Everything you need to know about our AI website design service.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-rich-black-0 border border-gray-800 overflow-hidden hover:border-white transition-all duration-300 rounded-lg"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-8 py-5 flex justify-between items-center hover:bg-gray-700/30 transition-colors"
                >
                  <span className="font-semibold text-white pr-4">{faq.question}</span>
                  {activeIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-white flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-8 pb-5"
                  >
                    <p className="text-gray-400 leading-relaxed font-normal">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 premium-bg relative overflow-hidden">
        <div className="floating-particles"></div>
        <div className="pulse-glow pulse-glow-1"></div>
        <div className="pulse-glow pulse-glow-2"></div>
        <div className="floating-particles"></div>
        <div className="pulse-glow pulse-glow-1"></div>
        <div className="pulse-glow pulse-glow-2"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
              <span className="text-white uppercase tracking-wide">Ready to Transform Your Online Presence?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 font-normal">
              Let's discuss your vision and create a website that drives real results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-rich-black-0 px-8 py-4 text-lg font-medium hover:bg-rich-black-0 hover:text-white hover:border hover:border-white hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center tracking-wide uppercase rounded-xl shadow-md"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book a Discovery Call
              </a>
              <a
                href="/contact"
                className="bg-rich-black-0 text-white border border-white px-8 py-4 text-lg font-medium hover:bg-white hover:text-rich-black-0 hover:border-white hover:shadow-lg transition-all duration-300 tracking-wide uppercase rounded-xl"
              >
                Get Free Quote
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-6 font-normal">
              Free consultation • No obligation • Quick response within 24 hours
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AIWebsiteDesignPage;