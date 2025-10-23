import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Zap,
  Shield,
  Puzzle,
  Check,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Calendar,
  Mail,
  ChevronLeft,
  ChevronRight,
  Target,
  Users,
  MessageSquare,
  BarChart3,
  Bell,
  RefreshCw,
  Brain,
  Cpu,
  Network,
  Sparkles,
  Eye,
  Layers,
  Activity,
  Workflow,
  Settings,
  TrendingUp,
  Clock,
  Globe,
  Database,
  Code2,
  Rocket
} from "lucide-react";
import '../styles/ai-automations-galaxy.css';

const CustomAIAutomationsPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [benefitsSlide, setBenefitsSlide] = useState(0);
  const [automationsSlide, setAutomationsSlide] = useState(0);
  const [activeDemo, setActiveDemo] = useState(0);

  // Add page class for scoped styling
  useEffect(() => {
    document.body.classList.add('page-custom-ai-automations');
    return () => {
      document.body.classList.remove('page-custom-ai-automations');
    };
  }, []);

  // Auto-cycle demo animations
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
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
    const cleanupAutomations = setupCarouselTracking('automations-carousel', setAutomationsSlide, 300);

    return () => {
      cleanupBenefits?.();
      cleanupAutomations?.();
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

  const aiCapabilities = [
    {
      id: 'neural-processing',
      icon: Brain,
      title: "Neural Processing",
      description: "Advanced AI models that understand context and make intelligent decisions",
      color: "from-cyan-400 to-blue-500"
    },
    {
      id: 'real-time-learning',
      icon: Cpu,
      title: "Real-Time Learning",
      description: "Systems that adapt and improve based on your business patterns",
      color: "from-emerald-400 to-teal-500"
    },
    {
      id: 'intelligent-routing',
      icon: Network,
      title: "Intelligent Routing",
      description: "Smart decision trees that route tasks to the right place every time",
      color: "from-purple-400 to-indigo-500"
    },
    {
      id: 'predictive-analytics',
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "AI that forecasts trends and suggests proactive business actions",
      color: "from-orange-400 to-red-500"
    }
  ];

  const automationShowcase = [
    {
      id: 'lead-qualification',
      icon: Target,
      title: "AI Lead Qualification",
      description: "Intelligent lead scoring and routing that identifies your best prospects automatically",
      features: ["Smart lead scoring", "Automatic routing", "CRM integration", "Follow-up sequences"],
      color: "from-blue-500 to-cyan-500",
      demoSteps: [
        "Lead submits form → AI analyzes intent",
        "Quality score calculated → Route to sales team",
        "Automated follow-up → CRM updated"
      ]
    },
    {
      id: 'client-onboarding',
      icon: Users,
      title: "Intelligent Onboarding",
      description: "Automated welcome sequences and setup workflows that create professional first impressions",
      features: ["Welcome sequences", "Document automation", "Progress tracking", "Team notifications"],
      color: "from-emerald-500 to-teal-500",
      demoSteps: [
        "New client signs → Welcome sequence starts",
        "Portal access created → Tasks assigned",
        "Progress tracked → Team notified"
      ]
    },
    {
      id: 'customer-support',
      icon: MessageSquare,
      title: "AI Customer Support",
      description: "24/7 intelligent helpdesk that handles inquiries and escalates complex issues seamlessly",
      features: ["24/7 AI support", "Smart escalation", "Knowledge base", "Multi-channel support"],
      color: "from-purple-500 to-indigo-500",
      demoSteps: [
        "Customer inquiry → AI categorizes request",
        "Common issues resolved → Complex escalated",
        "Resolution tracked → Customer notified"
      ]
    },
    {
      id: 'business-intelligence',
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Automated reporting and analytics that track KPIs and provide actionable insights",
      features: ["Automated reports", "Anomaly detection", "KPI tracking", "Predictive insights"],
      color: "from-orange-500 to-red-500",
      demoSteps: [
        "Data collected → Patterns analyzed",
        "Anomalies detected → Alerts sent",
        "Insights generated → Actions recommended"
      ]
    },
    {
      id: 'review-management',
      icon: Bell,
      title: "Smart Review System",
      description: "Automated review collection and reputation management across all platforms",
      features: ["Review requests", "Response automation", "Reputation monitoring", "Platform integration"],
      color: "from-yellow-500 to-orange-500",
      demoSteps: [
        "Service completed → Review request sent",
        "Positive reviews → Public platforms",
        "Negative feedback → Internal resolution"
      ]
    },
    {
      id: 'reactivation-campaigns',
      icon: RefreshCw,
      title: "AI Reactivation Engine",
      description: "Smart re-engagement campaigns that automatically win back inactive customers",
      features: ["Customer segmentation", "Automated campaigns", "Engagement tracking", "Win-back sequences"],
      color: "from-pink-500 to-rose-500",
      demoSteps: [
        "Inactive customers identified → Segments created",
        "Personalized campaigns → Engagement tracked",
        "Win-back sequences → Success measured"
      ]
    }
  ];

  const metrics = [
    {
      value: "2-6 weeks",
      label: "AI Development",
      description: "from concept to deployment",
      icon: Rocket,
      color: "from-blue-400 to-cyan-400"
    },
    {
      value: "99.9%",
      label: "AI Uptime",
      description: "intelligent monitoring",
      icon: Activity,
      color: "from-emerald-400 to-teal-400"
    },
    {
      value: "< 4h",
      label: "AI Response",
      description: "for critical issues",
      icon: Clock,
      color: "from-purple-400 to-indigo-400"
    },
    {
      value: "24/7",
      label: "AI Operation",
      description: "never sleeps",
      icon: Globe,
      color: "from-orange-400 to-red-400"
    }
  ];

  const whyChooseUs = [
    {
      icon: Brain,
      title: "AI-First Approach",
      description: "We don't just add AI to existing processes - we redesign workflows around intelligent automation from the ground up.",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: Code2,
      title: "Custom AI Development",
      description: "Bespoke AI solutions built specifically for your business needs, not generic templates or one-size-fits-all tools.",
      color: "from-emerald-400 to-teal-500"
    },
    {
      icon: Database,
      title: "Enterprise-Grade Infrastructure",
      description: "Scalable, secure AI systems with enterprise-level monitoring, backup, and disaster recovery protocols.",
      color: "from-purple-400 to-indigo-500"
    }
  ];

  const faqs = [
    {
      question: "What types of AI automations can you build for my business?",
      answer: "We develop custom AI solutions including intelligent lead qualification, automated customer support, predictive analytics, smart review management, client onboarding workflows, and business intelligence systems. Each solution is tailored to your specific industry and business model.",
      tags: ['ai types', 'custom development', 'business solutions']
    },
    {
      question: "How advanced is your AI technology compared to basic chatbots?",
      answer: "Our AI systems use advanced machine learning models, natural language processing, and predictive analytics - far beyond simple rule-based chatbots. We build intelligent systems that learn, adapt, and make complex decisions based on context and business logic.",
      tags: ['ai technology', 'machine learning', 'advanced systems']
    },
    {
      question: "How long does it take to develop custom AI automations?",
      answer: "Development timelines vary based on complexity. Simple AI automations take 2-3 weeks, standard business intelligence systems require 4-6 weeks, while complex multi-system AI solutions may need 6-8+ weeks. We provide detailed project timelines during planning.",
      tags: ['timeline', 'development', 'project duration']
    },
    {
      question: "Will your AI systems integrate with our existing business tools?",
      answer: "Absolutely! Our AI solutions are designed to seamlessly integrate with your existing CRM, email platforms, databases, and business tools. We use advanced API development and custom connectors to ensure smooth data flow between all systems.",
      tags: ['integrations', 'existing tools', 'api development']
    },
    {
      question: "How do you ensure AI reliability and prevent system failures?",
      answer: "We implement multiple layers of reliability including error handling, automatic retries, fallback procedures, real-time monitoring, and 24/7 system health checks. Our AI systems are designed with enterprise-grade reliability standards.",
      tags: ['reliability', 'monitoring', 'enterprise grade']
    },
    {
      question: "Can your AI systems learn and improve over time?",
      answer: "Yes! Our AI systems include machine learning capabilities that continuously improve performance based on your business data and outcomes. The systems become more accurate and efficient as they process more information.",
      tags: ['machine learning', 'continuous improvement', 'adaptive systems']
    },
    {
      question: "What level of AI customization do you provide?",
      answer: "We provide fully custom AI development from the ground up. This includes custom machine learning models, bespoke decision logic, tailored user interfaces, and integration architectures designed specifically for your business requirements.",
      tags: ['customization', 'bespoke development', 'tailored solutions']
    },
    {
      question: "How do you handle AI system security and data protection?",
      answer: "We implement military-grade encryption, secure API protocols, GDPR compliance, regular security audits, and isolated processing environments. All AI systems are designed with security-first architecture and data protection by design.",
      tags: ['security', 'data protection', 'compliance']
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main id="ai-automations" className="ai-automations-surface pt-24 pb-20">
      {/* Dynamic AI Header */}
      <header className="container ai-header">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative"
        >
          {/* Floating AI Elements */}
          <div className="ai-floating-elements">
            <motion.div
              className="ai-node ai-node-1"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Brain className="h-6 w-6 text-cyan-400" />
            </motion.div>
            <motion.div
              className="ai-node ai-node-2"
              animate={{
                y: [0, 15, 0],
                rotate: [0, -180, -360],
                scale: [1, 0.9, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <Cpu className="h-6 w-6 text-emerald-400" />
            </motion.div>
            <motion.div
              className="ai-node ai-node-3"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 90, 180],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              <Network className="h-6 w-6 text-purple-400" />
            </motion.div>
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="ai-title-container"
          >
            <h1 className="ai-main-title">
              <span className="ai-title-line-1">Custom AI</span>
              <span className="ai-title-line-2">Automations</span>
              <span className="ai-title-line-3">& AIOS</span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="ai-subtitle"
          >
            Intelligent automation systems that work 24/7 to grow your business while you focus on serving customers. 
            Built with cutting-edge AI technology and custom business logic.
          </motion.p>

          {/* AI Demo Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="ai-demo-container"
          >
            <div className="ai-demo-grid">
              {[
                { icon: Target, label: "Lead Analysis", active: activeDemo === 0, color: "cyan" },
                { icon: Brain, label: "AI Processing", active: activeDemo === 1, color: "emerald" },
                { icon: Zap, label: "Auto Action", active: activeDemo === 2, color: "purple" }
              ].map((step, index) => (
                <motion.div
                  key={step.label}
                  className={`ai-demo-step ${step.active ? 'active' : ''} ${step.color}`}
                  animate={{
                    scale: step.active ? 1.1 : 1,
                    opacity: step.active ? 1 : 0.6
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <step.icon className="h-8 w-8" />
                  <span className="ai-demo-label">{step.label}</span>
                  {step.active && (
                    <motion.div
                      className="ai-pulse-ring"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.8, 0, 0.8]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
            <div className="ai-connection-lines">
              <motion.div
                className="ai-line ai-line-1"
                animate={{
                  pathLength: activeDemo >= 1 ? 1 : 0,
                  opacity: activeDemo >= 1 ? 1 : 0.3
                }}
                transition={{ duration: 0.8 }}
              />
              <motion.div
                className="ai-line ai-line-2"
                animate={{
                  pathLength: activeDemo >= 2 ? 1 : 0,
                  opacity: activeDemo >= 2 ? 1 : 0.3
                }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* AI Capabilities Surface */}
      <section className="ai-capabilities-surface">
        <div className="container">
          {/* AI Capabilities Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="ai-section-title">
              Advanced AI Capabilities
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiCapabilities.map((capability, index) => (
                <motion.div
                  key={capability.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="ai-capability-card"
                >
                  <div className={`ai-capability-icon bg-gradient-to-br ${capability.color}`}>
                    <capability.icon className="h-8 w-8 text-white" />
                    <motion.div
                      className="ai-capability-glow"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    />
                  </div>
                  <h3 className="ai-capability-title">{capability.title}</h3>
                  <p className="ai-capability-description">{capability.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Automation Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="ai-section-title">
              AI Automation Solutions We Build
            </h2>
            
            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {automationShowcase.map((automation, index) => (
                <motion.div
                  key={automation.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="ai-automation-card"
                >
                  <div className={`ai-automation-icon bg-gradient-to-br ${automation.color}`}>
                    <automation.icon className="h-10 w-10 text-white" />
                    <motion.div
                      className="ai-automation-pulse"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 0, 0.6]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: index * 0.3
                      }}
                    />
                  </div>
                  
                  <h3 className="ai-automation-title">{automation.title}</h3>
                  <p className="ai-automation-description">{automation.description}</p>
                  
                  <div className="ai-features-grid">
                    {automation.features.map((feature) => (
                      <div key={feature} className="ai-feature-chip">
                        <div className="ai-feature-dot"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="ai-demo-steps">
                    <h4 className="ai-demo-steps-title">AI Workflow:</h4>
                    {automation.demoSteps.map((step, stepIndex) => (
                      <motion.div
                        key={stepIndex}
                        className="ai-demo-step-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: stepIndex * 0.1 }}
                      >
                        <div className="ai-step-number">{stepIndex + 1}</div>
                        <span className="ai-step-text">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile: Carousel */}
            <div className="md:hidden relative">
              <div 
                className="flex gap-6 overflow-x-auto scrollbar-hide pt-4 pb-4 snap-x snap-mandatory scroll-smooth"
                style={{ 
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
                id="automations-carousel"
                role="region"
                aria-roledescription="carousel"
                aria-label="AI automation solutions"
              >
                {automationShowcase.map((automation, index) => (
                  <div
                    key={automation.id}
                    className="ai-automation-card flex-shrink-0 w-80 snap-center"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${automationShowcase.length}: ${automation.title}`}
                    aria-current={automationsSlide === index ? 'true' : 'false'}
                  >
                    <div className={`ai-automation-icon bg-gradient-to-br ${automation.color}`}>
                      <automation.icon className="h-10 w-10 text-white" />
                      <motion.div
                        className="ai-automation-pulse"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.6, 0, 0.6]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: index * 0.3
                        }}
                      />
                    </div>
                    
                    <h3 className="ai-automation-title">{automation.title}</h3>
                    <p className="ai-automation-description">{automation.description}</p>
                    
                    <div className="ai-features-grid">
                      {automation.features.map((feature) => (
                        <div key={feature} className="ai-feature-chip">
                          <div className="ai-feature-dot"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="ai-demo-steps">
                      <h4 className="ai-demo-steps-title">AI Workflow:</h4>
                      {automation.demoSteps.map((step, stepIndex) => (
                        <div key={stepIndex} className="ai-demo-step-item">
                          <div className="ai-step-number">{stepIndex + 1}</div>
                          <span className="ai-step-text">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Navigation */}
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={() => automationsSlide > 0 && goToSlide('automations-carousel', automationsSlide - 1, 300, setAutomationsSlide)}
                  disabled={automationsSlide === 0}
                  className={`ai-nav-btn ${automationsSlide === 0 ? 'disabled' : ''}`}
                  aria-label="Previous automation"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => automationsSlide < automationShowcase.length - 1 && goToSlide('automations-carousel', automationsSlide + 1, 300, setAutomationsSlide)}
                  disabled={automationsSlide === automationShowcase.length - 1}
                  className={`ai-nav-btn ${automationsSlide === automationShowcase.length - 1 ? 'disabled' : ''}`}
                  aria-label="Next automation"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {automationShowcase.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide('automations-carousel', index, 300, setAutomationsSlide)}
                    className={`ai-dot-indicator ${automationsSlide === index ? 'active' : ''}`}
                    aria-label={`Go to automation ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="ai-metrics-grid"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="ai-metric-card"
              >
                <div className={`ai-metric-icon bg-gradient-to-br ${metric.color}`}>
                  <metric.icon className="h-6 w-6 text-white" />
                  <motion.div
                    className="ai-metric-glow"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.4
                    }}
                  />
                </div>
                <div className="ai-metric-value">{metric.value}</div>
                <div className="ai-metric-label">{metric.label}</div>
                <div className="ai-metric-description">{metric.description}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Why Choose Our AI */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="ai-section-title">
              Why Choose Our AI Solutions
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {whyChooseUs.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="ai-feature-card"
                >
                  <div className={`ai-feature-icon bg-gradient-to-br ${feature.color}`}>
                    <feature.icon className="h-10 w-10 text-white" />
                    <motion.div
                      className="ai-feature-glow"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 0.8
                      }}
                    />
                  </div>
                  <h3 className="ai-feature-title">{feature.title}</h3>
                  <p className="ai-feature-description">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Development Process */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="ai-process-container"
          >
            <h2 className="ai-section-title">
              Our AI Development Process
            </h2>
            <div className="ai-process-grid">
              {[
                { step: "1", title: "AI Discovery", desc: "Map workflows and identify AI opportunities", icon: Eye, color: "cyan" },
                { step: "2", title: "AI Architecture", desc: "Design intelligent system architecture", icon: Layers, color: "emerald" },
                { step: "3", title: "AI Development", desc: "Build and train custom AI models", icon: Code2, color: "purple" },
                { step: "4", title: "AI Deployment", desc: "Launch with monitoring and optimization", icon: Rocket, color: "orange" }
              ].map((process, index) => (
                <motion.div
                  key={process.step}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="ai-process-step"
                >
                  <div className={`ai-process-icon ${process.color}`}>
                    <process.icon className="h-8 w-8 text-white" />
                    <span className="ai-process-number">{process.step}</span>
                    <motion.div
                      className="ai-process-ring"
                      animate={{
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 1
                      }}
                    />
                  </div>
                  <h3 className="ai-process-title">{process.title}</h3>
                  <p className="ai-process-description">{process.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mb-16"
          >
            <h2 className="ai-section-title">
              AI Automation Questions
            </h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="ai-faq-item"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="ai-faq-button"
                    aria-expanded={activeIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <div className="flex-1 pr-6">
                      <h3 className="ai-faq-question" id={`faq-question-${index}`}>
                        {faq.question}
                      </h3>
                      <div className="ai-tags-container">
                        {faq.tags.map((tag) => (
                          <span key={tag} className="ai-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-6 w-6 text-white" />
                    </motion.div>
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
                        <div className="ai-faq-content" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`}>
                          <div className="ai-faq-divider"></div>
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI CTA Section */}
      <section className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="ai-cta-container"
        >
          <div className="ai-cta-background">
            <motion.div
              className="ai-cta-orb ai-cta-orb-1"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="ai-cta-orb ai-cta-orb-2"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
          
          <div className="ai-cta-content">
            <motion.div
              className="ai-cta-icon"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Bot className="h-12 w-12 text-white" />
            </motion.div>
            
            <h2 className="ai-cta-title">
              Ready To Deploy Custom AI For Your Business?
            </h2>
            <p className="ai-cta-description">
              Let's discuss your workflows and create intelligent automation systems that transform your business operations and drive sustainable growth.
            </p>
            
            <div className="ai-cta-buttons">
              <Link to="/contact" className="ai-btn-primary">
                <Calendar className="h-5 w-5" />
                Request AI Consultation
              </Link>
              <a href="mailto:contact@solescope.co.uk" className="ai-btn-secondary">
                <Mail className="h-5 w-5" />
                Email Our AI Team
              </a>
            </div>
            
            <div className="ai-cta-features">
              <div className="ai-cta-feature">
                <div className="ai-cta-feature-dot"></div>
                <span>Free AI consultation</span>
              </div>
              <div className="ai-cta-divider"></div>
              <div className="ai-cta-feature">
                <div className="ai-cta-feature-dot"></div>
                <span>Custom AI proposal within 24 hours</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default CustomAIAutomationsPage;