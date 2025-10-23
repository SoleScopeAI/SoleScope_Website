import React, { useState } from 'react';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Bot, Calendar, Star, MessageSquare, FileText, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';

const CaseCards = () => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Track scroll position for mobile carousel
  useEffect(() => {
    const carousel = document.getElementById('cases-carousel');
    if (!carousel) return;

    const handleScroll = () => {
      const cardWidth = 280 + 16; // card width + gap
      const scrollLeft = carousel.scrollLeft;
      const newSlide = Math.round(scrollLeft / cardWidth);
      setCurrentSlide(newSlide);
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSlide = (index: number) => {
    const carousel = document.getElementById('cases-carousel');
    if (carousel) {
      const cardWidth = 280 + 16; // card width + gap
      carousel.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentSlide(index);
    }
  };

  const cases = [
    {
      id: 1,
      title: "AI Lead Qualification",
      description: "Intelligent lead scoring and routing that captures high-value prospects 24/7",
      icon: Bot,
      color: "from-blue-500 to-blue-600",
      steps: [
        "Lead submits inquiry via website, email, or chat",
        "AI instantly analyzes lead quality, intent, and fit",
        "High-value leads automatically routed to your team",
        "Personalized follow-up sequences triggered immediately",
        "Lead scores and interactions synced to your CRM",
        "Performance analytics tracked and reported weekly"
      ]
    },
    {
      id: 2,
      title: "Intelligent Client Onboarding",
      description: "Automated welcome workflows that create seamless first impressions",
      icon: Calendar,
      color: "from-green-500 to-green-600",
      steps: [
        "New client contract signed - onboarding triggers",
        "Personalized welcome email sequence sent automatically",
        "Client portal access credentials created and delivered",
        "Required documents and forms sent with tracking",
        "Progress milestones monitored and team notified",
        "Completion metrics compiled for continuous improvement"
      ]
    },
    {
      id: 3,
      title: "Smart Review & Reactivation Engine",
      description: "Automated reputation building and dormant customer re-engagement",
      icon: Star,
      color: "from-yellow-500 to-yellow-600",
      steps: [
        "Project completion or purchase event detected",
        "Timed review request sent via optimal channel",
        "Positive reviews directed to Google, Trustpilot, etc.",
        "Negative feedback captured privately for resolution",
        "Dormant customers identified and re-engagement campaigns triggered",
        "Review metrics and reactivation rates tracked monthly"
      ]
    },
    {
      id: 4,
      title: "Quote-to-Invoice Automation",
      description: "Streamlined proposal generation and payment collection workflow",
      icon: FileText,
      color: "from-purple-500 to-purple-600",
      steps: [
        "Quote request received and automatically logged",
        "AI generates accurate quote using your pricing rules",
        "Professional quote sent to client for approval",
        "Accepted quotes instantly converted to invoices",
        "Automated payment reminders sent at scheduled intervals",
        "Revenue pipeline updated in real-time with analytics"
      ]
    },
    {
      id: 5,
      title: "24/7 AI Customer Support",
      description: "Always-on intelligent helpdesk that handles inquiries and escalations",
      icon: MessageSquare,
      color: "from-indigo-500 to-indigo-600",
      steps: [
        "Customer inquiry received via website, email, or chat",
        "AI instantly categorizes and prioritizes the request",
        "Common questions answered automatically with accuracy",
        "Complex issues escalated to your team with full context",
        "Resolution tracked and confirmation sent to customer",
        "Support metrics analyzed for continuous improvement"
      ]
    },
    {
      id: 6,
      title: "Business Intelligence & Alerts",
      description: "Proactive monitoring that surfaces insights and flags anomalies",
      icon: BarChart3,
      color: "from-red-500 to-red-600",
      steps: [
        "Key business metrics monitored continuously",
        "AI detects unusual patterns, trends, and opportunities",
        "Instant alerts sent via SMS, email, or Slack",
        "Predictive trend analysis and forecasting generated",
        "Actionable recommendations delivered weekly",
        "Real-time dashboards updated with visual insights"
      ]
    }
  ];

  const openModal = (caseId: number) => {
    setSelectedCase(caseId);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedCase(null);
    document.body.style.overflow = 'unset';
  };

  const selectedCaseData = cases.find(c => c.id === selectedCase);

  return (
    <>
      <section id="case-studies" className="py-20 premium-bg relative overflow-hidden">
        <div className="floating-particles"></div>
        <div className="pulse-glow pulse-glow-1"></div>
        <div className="pulse-glow pulse-glow-2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold dark-text-primary mb-6">
              Real Automation Examples
            </h2>
            <p className="text-xl dark-text-body max-w-3xl mx-auto">
              See how we've helped businesses automate their most time-consuming tasks
            </p>
          </motion.div>

          {/* Desktop/Tablet: Grid Layout */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ position: 'relative', isolation: 'isolate' }}>
            {cases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative overflow-hidden rounded-3xl p-10 shadow-2xl hover:shadow-purple-500/20 hover:border-purple-400/30 focus-within:border-purple-400/50 focus-within:shadow-purple-500/30 transition-all duration-500 cursor-pointer text-center h-full flex flex-col"
                style={{ position: 'relative', isolation: 'isolate', zIndex: 0 }}
                tabIndex={0}
                role="button"
                aria-labelledby={`case-title-${caseItem.id}`}
                onClick={() => openModal(caseItem.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(caseItem.id);
                  }
                }}
                data-analytics={`case-card-${caseItem.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {/* L0: Background gradient layer */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-black/90 rounded-3xl"
                  style={{ zIndex: 0, pointerEvents: 'none' }}
                />
                <div
                  className="absolute inset-0 border border-white/10 rounded-3xl"
                  style={{ zIndex: 0, pointerEvents: 'none' }}
                />

                {/* L2: Hover sheen layer */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    zIndex: 2,
                    pointerEvents: 'none',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
                  }}
                />

                {/* L1: Content layer */}
                <div className="relative" style={{ zIndex: 1 }}>
                  <div className={`w-20 h-20 bg-gradient-to-r ${caseItem.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-focus:scale-110 transition-transform duration-300 mx-auto`}>
                  <caseItem.icon className="h-10 w-10 text-white drop-shadow-lg" />
                </div>
                
                <h3 id={`case-title-${caseItem.id}`} className="text-2xl font-bold text-white mb-6 group-hover:text-purple-300 group-focus:text-purple-300 transition-colors text-center uppercase tracking-wide leading-tight">
                  {caseItem.title}
                </h3>
                
                <p className="text-gray-300 text-lg mb-8 leading-relaxed text-center flex-grow">
                  {caseItem.description}
                </p>
                
                <div className="flex items-center justify-center text-purple-400 group-hover:text-purple-300 group-focus:text-purple-300 font-medium transition-colors">
                  <span>View Workflow</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile: Horizontal Carousel */}
          <div className="md:hidden relative" style={{ isolation: 'isolate' }}>
            <div 
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory scroll-smooth"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
              id="cases-carousel"
              role="region"
              aria-roledescription="carousel"
              aria-label="Automation case studies"
            >
              {cases.map((caseItem, index) => (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="group relative overflow-hidden rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/20 hover:border-purple-400/30 focus-within:border-purple-400/50 focus-within:shadow-purple-500/30 transition-all duration-500 flex-shrink-0 w-80 snap-center h-full flex flex-col text-center cursor-pointer"
                  style={{ position: 'relative', isolation: 'isolate', zIndex: 0 }}
                  tabIndex={0}
                  role="button"
                  aria-labelledby={`case-title-mobile-${caseItem.id}`}
                  onClick={() => openModal(caseItem.id)}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${cases.length}: ${caseItem.title}`}
                  aria-current={currentSlide === index ? 'true' : 'false'}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openModal(caseItem.id);
                    }
                  }}
                  data-analytics={`case-card-${caseItem.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {/* L0: Background gradient layer */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-black/90 rounded-3xl"
                    style={{ zIndex: 0, pointerEvents: 'none' }}
                  />
                  <div
                    className="absolute inset-0 border border-white/10 rounded-3xl"
                    style={{ zIndex: 0, pointerEvents: 'none' }}
                  />

                  {/* L2: Hover sheen layer */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      zIndex: 2,
                      pointerEvents: 'none',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
                    }}
                  />

                  {/* L1: Content layer */}
                  <div className="relative" style={{ zIndex: 1 }}>
                    <div className={`w-16 h-16 bg-gradient-to-r ${caseItem.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-focus:scale-110 transition-transform duration-300 mx-auto`}>
                    <caseItem.icon className="h-8 w-8 text-white drop-shadow-lg" />
                  </div>
                  
                  <h3 id={`case-title-mobile-${caseItem.id}`} className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 group-focus:text-purple-300 transition-colors text-center uppercase tracking-wide leading-tight">
                    {caseItem.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed text-center text-base flex-grow">
                    {caseItem.description}
                  </p>
                  
                  <div className="flex items-center justify-center text-purple-400 group-hover:text-purple-300 group-focus:text-purple-300 font-medium transition-colors text-sm">
                    <span>View Workflow</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Cases Pagination Icons */}
            <div className="flex justify-center mt-6 space-x-3 flex-wrap">
              {cases.map((caseItem, index) => (
                <motion.button
                  key={caseItem.id}
                  onClick={() => goToSlide(index)}
                  className={`pagination-icon group relative p-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6C3EF0] focus:ring-offset-2 focus:ring-offset-black ${
                    currentSlide === index
                      ? 'bg-[#6C3EF0]/20 border-2 border-[#6C3EF0] scale-110'
                      : 'bg-white/5 border border-white/20 opacity-60 hover:opacity-100 hover:border-[#6C3EF0]/50'
                  }`}
                  aria-label={caseItem.title}
                  aria-current={currentSlide === index ? 'true' : 'false'}
                  whileHover={{ scale: currentSlide === index ? 1.1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentSlide === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 bg-[#6C3EF0]/30 rounded-xl blur-sm"
                    />
                  )}
                  
                  <caseItem.icon 
                    className={`relative h-5 w-5 transition-all duration-300 ${
                      currentSlide === index
                        ? 'text-[#6C3EF0] drop-shadow-lg'
                        : 'text-white/70 group-hover:text-[#B39CFF]'
                    }`}
                  />
                </motion.button>
              ))}
            </div>

            {/* Cases Navigation Chevrons */}
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => currentSlide > 0 && goToSlide(currentSlide - 1)}
                disabled={currentSlide === 0}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  currentSlide === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                aria-label="Previous case study"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => currentSlide < cases.length - 1 && goToSlide(currentSlide + 1)}
                disabled={currentSlide === cases.length - 1}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  currentSlide === cases.length - 1
                    ? 'opacity-30 cursor-not-allowed'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                aria-label="Next case study"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedCase && selectedCaseData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="dark-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gradient-to-br from-gray-900 to-black z-10 pb-4 mb-2 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${selectedCaseData.color} rounded-lg flex items-center justify-center`}>
                      <selectedCaseData.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold dark-text-primary">
                      {selectedCaseData.title}
                    </h3>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-red-600/30 rounded-xl transition-all border border-white/10 hover:border-red-500/50"
                    aria-label="Close modal"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>
              </div>

              <p className="dark-text-body mb-8 text-lg">
                {selectedCaseData.description}
              </p>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold dark-text-primary mb-4">
                  Workflow Steps:
                </h4>
                {selectedCaseData.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 dark-surface-alt"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-accent-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="dark-text-body leading-relaxed">{step}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={() => {
                    closeModal();
                    const formElement = document.getElementById('proposal-form');
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full dark-btn-primary px-6 py-3 font-semibold transition-all duration-300 flex items-center justify-center"
                  data-analytics={`modal-cta-${selectedCaseData.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  Request This Automation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CaseCards;