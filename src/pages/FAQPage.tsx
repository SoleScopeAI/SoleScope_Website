import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronDown, 
  ChevronUp,
  Zap, 
  Globe, 
  Code, 
  BarChart3,
  Palette,
  MessageCircle,
  Clock,
  Shield,
  ArrowRight,
  Sparkles,
  X,
  Calendar,
  Mail,
  HelpCircle
} from 'lucide-react';
import '../styles/faq-galaxy.css';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Add page class for scoped styling
  useEffect(() => {
    document.body.classList.add('page-faq');
    return () => {
      document.body.classList.remove('page-faq');
    };
  }, []);

  const categories = [
    { id: 'all', name: 'All Questions', icon: Sparkles, count: 0 },
    { id: 'services', name: 'Services', icon: Globe, count: 0 },
    { id: 'pricing', name: 'Pricing', icon: BarChart3, count: 0 },
    { id: 'process', name: 'Process', icon: Code, count: 0 },
    { id: 'support', name: 'Support', icon: Shield, count: 0 },
    { id: 'technical', name: 'Technical', icon: Zap, count: 0 }
  ];

  const faqs = [
    // Services Category
    {
      id: 1,
      category: 'services',
      question: "What digital services does SoleScope Studio & Design offer?",
      answer: "We specialize in four core services designed for modern service businesses: Website Design & Hosting (professional, mobile-responsive websites with managed hosting), Custom WebApps & Hosting (tailored web applications with enterprise-grade hosting), AI Dashboards & Analytics (data visualization and business intelligence solutions), and Brand Identity & Visuals (logos, color systems, and marketing materials). Each service is designed to help you compete digitally and win more clients.",
      tags: ['websites', 'webapps', 'dashboards', 'branding']
    },
    {
      id: 2,
      category: 'services',
      question: "Do you work with businesses outside the UK?",
      answer: "While we're based in the UK and primarily serve UK businesses, we do work with international clients. Our digital-first approach means we can effectively collaborate with businesses worldwide. All our hosting solutions are globally optimized, and we provide support across different time zones for international projects.",
      tags: ['international', 'global', 'uk']
    },
    {
      id: 3,
      category: 'services',
      question: "What industries do you specialize in?",
      answer: "We focus on service-based businesses including professional services, healthcare, beauty and wellness, home services, consulting, coaching, and creative services. Our solutions are specifically designed for businesses that serve clients rather than sell products, ensuring maximum relevance and effectiveness for your industry.",
      tags: ['industries', 'service businesses', 'consulting']
    },
    
    // Pricing Category
    {
      id: 4,
      category: 'pricing',
      question: "How much do your services cost?",
      answer: "Our pricing varies by service and complexity. Website design starts at £199 for basic packages, custom web applications begin at £199/month for hosting plus development costs, AI dashboards start at £99/month, and brand identity packages range from £49-£499. We provide detailed, transparent quotes after understanding your specific needs during our free consultation.",
      tags: ['pricing', 'cost', 'quotes', 'consultation']
    },
    {
      id: 5,
      category: 'pricing',
      question: "Do you offer payment plans or financing options?",
      answer: "Yes! We understand that investing in digital transformation is significant for small businesses. We offer flexible payment plans for larger projects, including milestone-based payments for development work and monthly subscription options for ongoing services. Contact us to discuss payment arrangements that work for your budget.",
      tags: ['payment plans', 'financing', 'budget', 'flexible']
    },
    {
      id: 6,
      category: 'pricing',
      question: "What's included in your hosting packages?",
      answer: "Our hosting includes SSL certificates, regular backups, security monitoring, performance optimization, software updates, and technical support. Basic plans start at £69.99/month with email support, Standard plans at £129.99/month include priority support and enhanced features, while Professional plans at £249.99/month offer dedicated account management and premium performance.",
      tags: ['hosting', 'ssl', 'backups', 'security', 'support']
    },

    // Process Category
    {
      id: 7,
      category: 'process',
      question: "How long does it take to complete my project?",
      answer: "Project timelines vary by service: Website design typically takes 1-3 weeks, custom web applications require 4-8 weeks, AI dashboards are completed in 2-4 weeks, and brand identity projects take 1-2 weeks. We provide detailed timelines during our initial consultation and keep you updated throughout the process with regular progress reports.",
      tags: ['timeline', 'project duration', 'delivery', 'progress']
    },
    {
      id: 8,
      category: 'process',
      question: "What information do you need to get started?",
      answer: "We'll need basic information about your business, your goals, any existing branding materials, and access to relevant accounts (like hosting or domain registrars). During our discovery call, we'll walk you through exactly what's needed for your specific project. We make the onboarding process as simple as possible.",
      tags: ['onboarding', 'requirements', 'discovery', 'information']
    },
    {
      id: 9,
      category: 'process',
      question: "How do you ensure projects stay on schedule?",
      answer: "We use advanced project management systems to track progress and maintain clear communication throughout. You'll receive regular updates, have access to a client portal to monitor progress in real-time, and we build buffer time into our schedules to accommodate revisions and feedback. Our structured approach ensures on-time delivery.",
      tags: ['project management', 'schedule', 'communication', 'portal']
    },

    // Support Category
    {
      id: 10,
      category: 'support',
      question: "What kind of ongoing support do you provide?",
      answer: "Support varies by plan: Basic plans include email support with 48-hour response times, Standard plans offer priority support with 24-hour response, and Professional plans include 4-hour response times plus phone support and dedicated account management. All plans include security updates, backups, and technical maintenance.",
      tags: ['support', 'maintenance', 'response time', 'account management']
    },
    {
      id: 11,
      category: 'support',
      question: "What happens if my website goes down?",
      answer: "We monitor all hosted websites 24/7 with automatic alerts and AI-powered monitoring systems. If your site goes down, we're typically notified and working on a fix within minutes. We maintain 99.9% uptime with redundant servers and provide immediate notifications for any issues. Your business continuity is our priority.",
      tags: ['uptime', 'monitoring', 'downtime', 'alerts', 'reliability']
    },
    {
      id: 12,
      category: 'support',
      question: "Can you help with updates and changes after launch?",
      answer: "Absolutely! We provide ongoing support for all updates and changes. Minor content updates are included in your hosting plan, while larger modifications can be handled through our support tickets or as separate projects. We're here to help your digital presence evolve with your business needs.",
      tags: ['updates', 'changes', 'modifications', 'evolution']
    },

    // Technical Category
    {
      id: 13,
      category: 'technical',
      question: "Do I need technical knowledge to work with you?",
      answer: "Absolutely not! Our entire approach is designed for business owners who want professional results without technical complexity. We handle all the technical aspects while you focus on running your business. We provide training and documentation for any systems we build, making everything user-friendly and accessible.",
      tags: ['technical knowledge', 'user-friendly', 'training', 'documentation']
    },
    {
      id: 14,
      category: 'technical',
      question: "How do you handle data security and backups?",
      answer: "Security is our top priority. We implement enterprise-grade SSL certificates, regular security updates, AI-powered malware protection, and automated daily backups with multiple redundancy layers. All data is stored securely with military-grade encryption and multiple backup locations. We follow GDPR compliance and industry best practices.",
      tags: ['security', 'backups', 'encryption', 'gdpr', 'compliance']
    },
    {
      id: 15,
      category: 'technical',
      question: "Can you integrate with my existing business tools?",
      answer: "Yes! We specialize in seamless integrations with CRM systems, email marketing platforms, accounting software, booking systems, and more. Our API development expertise ensures smooth data flow between systems. We'll assess your current tools and create custom integrations that streamline your entire workflow.",
      tags: ['integrations', 'crm', 'api', 'workflow', 'business tools']
    }
  ];

  const stats = [
    {
      value: "15+",
      label: "Common Questions",
      description: "comprehensive coverage"
    },
    {
      value: "< 24h",
      label: "Response Time",
      description: "for new questions"
    },
    {
      value: "6",
      label: "Categories",
      description: "organized topics"
    },
    {
      value: "100%",
      label: "Transparency",
      description: "honest answers"
    }
  ];

  // Update category counts
  const updatedCategories = categories.map(cat => ({
    ...cat,
    count: cat.id === 'all' ? faqs.length : faqs.filter(faq => faq.category === cat.id).length
  }));

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setActiveCategory('all');
    setActiveIndex(null);
  };

  return (
    <main id="faq" className="faq-surface pt-24 pb-20">
      {/* Compact Header */}
      <header className="container faq-header">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about our AI-powered digital solutions and how we help service businesses thrive.</p>
        </motion.div>
      </header>

      {/* FAQ Cards Surface */}
      <section className="faq-cards-surface">
        <div className="container">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="search-container"
          >
            <Search className="search-icon h-6 w-6" />
            <input
              type="text"
              placeholder="Search FAQs, services, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="clear-search"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="categories-grid"
          >
            {updatedCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`faq-refined-card category-card ${
                  activeCategory === category.id ? 'active' : ''
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveCategory(category.id);
                  }
                }}
              >
                <div className="category-icon">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="category-title">{category.name}</h3>
                <p className="category-count">{category.count} questions</p>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="stats-grid"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="faq-refined-card stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
              </div>
            ))}
          </motion.div>

          {/* FAQ Content */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {filteredFaqs.length > 0 ? (
              <div className="space-y-4 max-w-4xl mx-auto mb-12">
                {filteredFaqs.map((faq, index) => (
                  <div key={faq.id} className="faq-item">
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
            ) : (
              <div className="faq-refined-card no-results">
                <div className="no-results-icon">
                  <Search className="h-10 w-10 text-white" />
                </div>
                <h3 className="no-results-title">No FAQs Found</h3>
                <p className="no-results-message">
                  Try adjusting your search terms or browse different categories.
                </p>
                <button
                  onClick={clearFilters}
                  className="faq-btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </motion.div>

          {/* Still Have Questions */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="faq-refined-card text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-6 uppercase tracking-wide">
              Still Have Questions?
            </h2>
            <p className="text-white/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Our team is here to help. Get personalized answers and a free consultation about transforming your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <a
                href="/contact"
                className="faq-btn-primary"
              >
                <Calendar className="h-5 w-5" />
                Get Expert Consultation
              </a>
              <a
                href="mailto:contact@solescope.co.uk"
                className="faq-btn-secondary"
              >
                <Mail className="h-5 w-5" />
                Email Us Directly
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-6 text-white/60 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Response within 24 hours</span>
              </div>
              <div className="w-px h-4 bg-white/10"></div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Free consultation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default FAQPage;