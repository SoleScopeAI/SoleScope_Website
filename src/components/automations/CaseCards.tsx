import React, { useState } from 'react';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Bot, Calendar, Star, MessageSquare, FileText, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import BulletproofModal from '../shared/BulletproofModal';

const CaseCards = () => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const carousel = document.getElementById('cases-carousel');
    if (!carousel) return;

    const handleScroll = () => {
      const cardWidth = 280 + 16;
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
      const cardWidth = 280 + 16;
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
      tagline: "Intelligent lead scoring and routing that captures high-value prospects 24/7",
      icon: Bot,
      color: "from-blue-500 to-blue-600",
      metrics: [
        { label: "Response Time", value: "<2min" },
        { label: "Lead Quality", value: "+85%" },
        { label: "Conversion Rate", value: "+120%" }
      ],
      tags: ["Lead Scoring", "Auto-Routing", "CRM Integration"],
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
      tagline: "Automated welcome workflows that create seamless first impressions",
      icon: Calendar,
      color: "from-green-500 to-green-600",
      metrics: [
        { label: "Time Saved", value: "15hrs/mo" },
        { label: "Setup Speed", value: "-75%" },
        { label: "Satisfaction", value: "4.9/5" }
      ],
      tags: ["Welcome Automation", "Document Delivery", "Progress Tracking"],
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
      tagline: "Automated reputation building and dormant customer re-engagement",
      icon: Star,
      color: "from-yellow-500 to-yellow-600",
      metrics: [
        { label: "Review Volume", value: "+200%" },
        { label: "Reactivation", value: "+45%" },
        { label: "Rating Avg", value: "4.8/5" }
      ],
      tags: ["Review Requests", "Platform Routing", "Re-engagement"],
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
      tagline: "Streamlined proposal generation and payment collection workflow",
      icon: FileText,
      color: "from-purple-500 to-purple-600",
      metrics: [
        { label: "Quote Speed", value: "Instant" },
        { label: "Payment Time", value: "-60%" },
        { label: "Accuracy", value: "99.8%" }
      ],
      tags: ["AI Quotes", "Auto-Invoicing", "Payment Reminders"],
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
      tagline: "Always-on intelligent helpdesk that handles inquiries and escalations",
      icon: MessageSquare,
      color: "from-indigo-500 to-indigo-600",
      metrics: [
        { label: "Availability", value: "24/7" },
        { label: "Resolution", value: "87%" },
        { label: "Response", value: "<30sec" }
      ],
      tags: ["AI Chatbot", "Smart Escalation", "Multi-Channel"],
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
      tagline: "Proactive monitoring that surfaces insights and flags anomalies",
      icon: BarChart3,
      color: "from-red-500 to-red-600",
      metrics: [
        { label: "Monitoring", value: "Real-time" },
        { label: "Accuracy", value: "94%" },
        { label: "Alerts", value: "Instant" }
      ],
      tags: ["Anomaly Detection", "Trend Forecasting", "Instant Alerts"],
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
  };

  const closeModal = () => {
    setSelectedCase(null);
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
            <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 border border-yellow-500/30 rounded-full">
              <span className="text-yellow-300 font-semibold text-sm uppercase tracking-wider">
                Demo Automation Examples
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold dark-text-primary mb-6">
              Real Automation Examples
            </h2>
            <p className="text-xl dark-text-body max-w-3xl mx-auto">
              See how we've helped businesses automate their most time-consuming tasks
            </p>
          </motion.div>

          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl bg-slate-800/60 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col p-8"
                style={{ minHeight: '440px' }}
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
                <div className="flex flex-col flex-1">
                  <div className="inline-block self-start px-3 py-1 mb-3 bg-yellow-600/20 border border-yellow-500/30 rounded-full">
                    <span className="text-xs font-semibold text-yellow-300 uppercase tracking-wide">
                      Demo Case Study
                    </span>
                  </div>

                  <div className={`w-16 h-16 bg-gradient-to-r ${caseItem.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-focus:scale-110 transition-transform duration-300`}>
                    <caseItem.icon className="h-8 w-8 text-white drop-shadow-lg" />
                  </div>

                  <h3
                    id={`case-title-${caseItem.id}`}
                    className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 group-focus:text-purple-300 transition-colors uppercase tracking-wide leading-tight line-clamp-2"
                  >
                    {caseItem.title}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4 leading-relaxed flex-grow line-clamp-3">
                    {caseItem.tagline}
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {caseItem.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-center flex flex-col justify-center"
                      >
                        <div className="text-base font-bold text-white mb-1">{metric.value}</div>
                        <div className="text-xs text-gray-400 leading-tight">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {caseItem.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-medium text-purple-200 whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-end mt-auto pt-4">
                    <button
                      className="flex items-center text-purple-400 group-hover:text-purple-300 group-focus:text-purple-300 font-semibold transition-colors text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(caseItem.id);
                      }}
                    >
                      <span>View Demo Breakdown</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

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
                  whileHover={{ y: -4 }}
                  className="group relative rounded-2xl bg-slate-800/60 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0 w-80 snap-center flex flex-col cursor-pointer p-6"
                  style={{ minHeight: '420px' }}
                  tabIndex={0}
                  role="button"
                  aria-labelledby={`case-title-mobile-${caseItem.id}`}
                  onClick={() => openModal(caseItem.id)}
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
                  <div className="flex flex-col flex-1">
                    <div className="inline-block self-start px-3 py-1 mb-3 bg-yellow-600/20 border border-yellow-500/30 rounded-full">
                      <span className="text-xs font-semibold text-yellow-300 uppercase tracking-wide">
                        Demo Case Study
                      </span>
                    </div>

                    <div className={`w-14 h-14 bg-gradient-to-r ${caseItem.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-focus:scale-110 transition-transform duration-300`}>
                      <caseItem.icon className="h-7 w-7 text-white drop-shadow-lg" />
                    </div>

                    <h3
                      id={`case-title-mobile-${caseItem.id}`}
                      className="text-lg font-bold text-white mb-3 group-hover:text-purple-300 group-focus:text-purple-300 transition-colors uppercase tracking-wide leading-tight line-clamp-2"
                    >
                      {caseItem.title}
                    </h3>

                    <p className="text-gray-300 mb-4 leading-relaxed text-sm flex-grow line-clamp-3">
                      {caseItem.tagline}
                    </p>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {caseItem.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="px-2 py-2.5 bg-white/5 border border-white/10 rounded-lg text-center flex flex-col justify-center"
                        >
                          <div className="text-sm font-bold text-white mb-0.5">{metric.value}</div>
                          <div className="text-xs text-gray-400 leading-tight truncate">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {caseItem.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-medium text-purple-200 whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-end mt-auto pt-2">
                      <button
                        className="flex items-center text-purple-400 group-hover:text-purple-300 group-focus:text-purple-300 font-semibold transition-colors text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(caseItem.id);
                        }}
                      >
                        <span>View Demo</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-6 space-x-3 flex-wrap">
              {cases.map((caseItem, index) => (
                <motion.button
                  key={caseItem.id}
                  onClick={() => goToSlide(index)}
                  className={`pagination-icon group relative p-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black ${
                    currentSlide === index
                      ? 'bg-purple-600/20 border-2 border-purple-500 scale-110'
                      : 'bg-white/5 border border-white/20 opacity-60 hover:opacity-100 hover:border-purple-500/50'
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
                      className="absolute inset-0 bg-purple-600/30 rounded-xl blur-sm"
                    />
                  )}

                  <caseItem.icon
                    className={`relative h-5 w-5 transition-all duration-300 ${
                      currentSlide === index
                        ? 'text-purple-400 drop-shadow-lg'
                        : 'text-white/70 group-hover:text-purple-300'
                    }`}
                  />
                </motion.button>
              ))}
            </div>

            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => currentSlide > 0 && goToSlide(currentSlide - 1)}
                disabled={currentSlide === 0}
                className={`p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
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
                className={`p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <p className="text-sm text-center text-slate-400 max-w-4xl mx-auto leading-relaxed">
              All figures and visuals are for demonstration purposes only. Actual performance varies by business and implementation.
            </p>
          </motion.div>
        </div>
      </section>

      <BulletproofModal
        isOpen={selectedCase !== null}
        onClose={closeModal}
        title={selectedCaseData?.title || ''}
        subtitle="Demo Automation Workflow"
        ariaLabel={`${selectedCaseData?.title} workflow details`}
      >
        {selectedCaseData && (
          <div className="space-y-6">
            <div className="p-5 bg-yellow-500/10 border-l-4 border-yellow-500 rounded-lg">
              <p className="text-sm text-yellow-200 leading-relaxed">
                <span className="font-bold">Demo Case Study:</span> This workflow uses modelled data for demonstration purposes. Results represent typical expected outcomes.
              </p>
            </div>

            <div className="flex items-center gap-5">
              <div className={`w-20 h-20 bg-gradient-to-r ${selectedCaseData.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <selectedCaseData.icon className="h-10 w-10 text-white drop-shadow-lg" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">{selectedCaseData.title}</h3>
                <p className="text-slate-300 text-base leading-relaxed">{selectedCaseData.tagline}</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-5 uppercase tracking-wide">Key Metrics</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {selectedCaseData.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-gradient-to-br from-white/8 to-white/3 border border-white/10 rounded-2xl text-center hover:border-purple-500/30 transition-all duration-300 shadow-lg"
                  >
                    <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                    <div className="text-sm font-medium text-slate-300">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-5 uppercase tracking-wide">Workflow Steps</h4>
              <div className="space-y-4">
                {selectedCaseData.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-5 bg-gradient-to-br from-white/8 to-white/3 border border-white/10 rounded-xl hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl flex items-center justify-center text-base font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <p className="text-slate-300 leading-relaxed flex-1 text-base">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t-2 border-white/10">
              <button
                onClick={() => {
                  closeModal();
                  const formElement = document.getElementById('proposal-form');
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-base rounded-2xl hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center uppercase tracking-wide"
                data-analytics={`modal-cta-${selectedCaseData.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                Request This Automation
                <ArrowRight className="ml-3 h-5 w-5" />
              </button>
              <p className="text-xs text-center text-slate-400 mt-5 leading-relaxed">
                Figures shown are modelled examples based on comparable service businesses. Actual performance varies.
              </p>
            </div>
          </div>
        )}
      </BulletproofModal>
    </>
  );
};

export default CaseCards;
