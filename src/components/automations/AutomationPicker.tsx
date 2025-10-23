import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ChevronLeft, ChevronRight, Zap, Calendar, CreditCard, MessageSquare, BarChart3, Bell, RefreshCw, Users, Target, Shield } from 'lucide-react';

interface AutomationPickerProps {
  selectedAutomations: string[];
  setSelectedAutomations: (automations: string[]) => void;
}

const AutomationPicker: React.FC<AutomationPickerProps> = ({
  selectedAutomations,
  setSelectedAutomations
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Track scroll position for mobile carousel
  useEffect(() => {
    const carousel = document.getElementById('automations-carousel');
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
    const carousel = document.getElementById('automations-carousel');
    if (carousel) {
      const cardWidth = 280 + 16; // card width + gap
      carousel.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentSlide(index);
    }
  };

  const automations = [
    { id: 'lead-capture', name: 'Lead Capture', icon: Target },
    { id: 'qualification', name: 'Qualification', icon: Users },
    { id: 'calendar-booking', name: 'Calendar Booking', icon: Calendar },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'onboarding', name: 'Onboarding', icon: Check },
    { id: 'reviews', name: 'Reviews', icon: MessageSquare },
    { id: 'helpdesk', name: 'Helpdesk', icon: Shield },
    { id: 'reporting', name: 'Reporting', icon: BarChart3 },
    { id: 'alerts', name: 'Alerts', icon: Bell },
    { id: 're-activation', name: 'Re-activation', icon: RefreshCw }
  ];

  const toggleAutomation = (automation: string) => {
    if (selectedAutomations.includes(automation)) {
      setSelectedAutomations(selectedAutomations.filter(item => item !== automation));
    } else {
      setSelectedAutomations([...selectedAutomations, automation]);
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('proposal-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const generateWorkflowSummary = () => {
    if (selectedAutomations.length === 0) {
      return "Select automations above to see your custom workflow preview";
    }
    
    const workflows = {
      'Lead Capture': 'Capture leads from website forms, social media, and ads',
      'Qualification': 'AI qualifies leads based on your criteria',
      'Calendar Booking': 'Automated scheduling with calendar integration',
      'Payments': 'Streamlined payment processing and invoicing',
      'Onboarding': 'Automated client onboarding sequences',
      'Reviews': 'Automated review requests and management',
      'Helpdesk': 'AI-powered customer support automation',
      'Reporting': 'Automated business intelligence and reporting',
      'Alerts': 'Smart notifications for important events',
      'Re-activation': 'Automated re-engagement campaigns'
    };

    return selectedAutomations.map(automation => workflows[automation]).join(' → ');
  };

  return (
    <section className="py-20 premium-bg relative overflow-hidden">
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
            What would you like to automate?
          </h2>
          <p className="text-xl dark-text-body max-w-3xl mx-auto">
            Select the areas where AI could save you time and improve your results
          </p>
        </motion.div>

        {/* Desktop/Tablet: Grid Layout */}
        <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {automations.map((automation, index) => (
            <motion.button
              key={automation.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleAutomation(automation.name)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                selectedAutomations.includes(automation.name)
                  ? 'border-accent-primary bg-accent-primary/20 dark-text-primary shadow-lg'
                  : 'dark-card hover:border-accent-primary hover:dark-text-primary'
              } focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black`}
              data-analytics={`automation-toggle-${automation.id}`}
            >
              <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                <automation.icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex items-center justify-center mb-2">
                {selectedAutomations.includes(automation.name) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <Check className="h-4 w-4 text-accent-primary" />
                  </motion.div>
                )}
              </div>
              <span className="font-medium text-sm text-white">{automation.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Mobile: Horizontal Carousel */}
        <div className="md:hidden relative mb-12">
          <div 
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory scroll-smooth"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
            id="automations-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="Automation options"
          >
            {automations.map((automation, index) => (
              <motion.button
                key={automation.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleAutomation(automation.name)}
                className={`group relative overflow-visible bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/20 hover:border-purple-400/30 focus-within:border-purple-400/50 focus-within:shadow-purple-500/30 transition-all duration-500 flex-shrink-0 w-80 snap-center h-full flex flex-col text-center ${
                  selectedAutomations.includes(automation.name)
                    ? 'border-purple-400 bg-purple-400/20 shadow-lg shadow-purple-500/25'
                    : ''
                } focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black`}
                tabIndex={0}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${automations.length}: ${automation.name}`}
                aria-current={currentSlide === index ? 'true' : 'false'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleAutomation(automation.name);
                  }
                }}
                data-analytics={`automation-toggle-${automation.id}`}
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-purple-600/30 to-purple-700/30 border border-white/20 rounded-2xl group-hover:scale-110 group-focus:scale-110 transition-transform duration-300">
                  <automation.icon className="h-8 w-8 text-white drop-shadow-lg" />
                </div>
                <div className="flex items-center justify-center mb-3">
                  {selectedAutomations.includes(automation.name) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <Check className="h-5 w-5 text-purple-400" />
                    </motion.div>
                  )}
                </div>
                <span className="font-medium text-base text-white uppercase tracking-wide">{automation.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Automation Pagination Icons */}
          <div className="flex justify-center mt-6 space-x-2 flex-wrap">
            {automations.map((automation, index) => (
              <motion.button
                key={automation.id}
                onClick={() => goToSlide(index)}
                className={`pagination-icon group relative p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6C3EF0] focus:ring-offset-2 focus:ring-offset-black ${
                  currentSlide === index
                    ? 'bg-[#6C3EF0]/20 border-2 border-[#6C3EF0] scale-110'
                    : 'bg-white/5 border border-white/20 opacity-60 hover:opacity-100 hover:border-[#6C3EF0]/50'
                }`}
                aria-label={automation.name}
                aria-current={currentSlide === index ? 'true' : 'false'}
                whileHover={{ scale: currentSlide === index ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentSlide === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-[#6C3EF0]/30 rounded-lg blur-sm"
                  />
                )}
                
                <automation.icon 
                  className={`relative h-4 w-4 transition-all duration-300 ${
                    currentSlide === index
                      ? 'text-[#6C3EF0] drop-shadow-lg'
                      : 'text-white/70 group-hover:text-[#B39CFF]'
                  }`}
                />
              </motion.button>
            ))}
          </div>

          {/* Automation Navigation Chevrons */}
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={() => currentSlide > 0 && goToSlide(currentSlide - 1)}
              disabled={currentSlide === 0}
              className={`p-2 rounded-lg transition-all duration-300 ${
                currentSlide === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              aria-label="Previous automation"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => currentSlide < automations.length - 1 && goToSlide(currentSlide + 1)}
              disabled={currentSlide === automations.length - 1}
              className={`p-2 rounded-lg transition-all duration-300 ${
                currentSlide === automations.length - 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              aria-label="Next automation"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Live Preview Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="dark-card rounded-2xl p-8 mb-8"
        >
          <h3 className="text-xl font-semibold dark-text-primary mb-4 text-center">
            Your Custom Workflow Preview
          </h3>
          <div className="dark-surface-alt p-6 border border-white/10">
            <p className="dark-text-body text-center leading-relaxed">
              {generateWorkflowSummary()}
            </p>
          </div>
        </motion.div>

        {/* Use My Picks Button */}
        {selectedAutomations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <button
              onClick={scrollToForm}
              className="group dark-btn-primary px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center mx-auto"
              data-analytics="use-my-picks-cta"
            >
              Use My Picks
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AutomationPicker;