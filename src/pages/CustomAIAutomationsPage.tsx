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
      title: "Intelligent Decision Making",
      description: "AI systems that understand context, learn patterns, and make smart decisions based on your business logic",
      color: "from-cyan-400 to-blue-500"
    },
    {
      id: 'real-time-learning',
      icon: Cpu,
      title: "Adaptive Systems",
      description: "Automation that learns from your data and continuously improves performance over time",
      color: "from-emerald-400 to-teal-500"
    },
    {
      id: 'intelligent-routing',
      icon: Network,
      title: "Seamless Integration",
      description: "Connect your CRM, databases, email, and business tools into one intelligent ecosystem",
      color: "from-purple-400 to-indigo-500"
    },
    {
      id: 'predictive-analytics',
      icon: TrendingUp,
      title: "Predictive Intelligence",
      description: "AI-driven insights that forecast trends, identify opportunities, and recommend actions before issues arise",
      color: "from-orange-400 to-red-500"
    }
  ];

  const automationShowcase = [
    {
      id: 'lead-qualification',
      icon: Target,
      title: "Lead Management Systems",
      description: "Intelligent lead scoring, qualification, and routing — automatically connecting your best prospects to the right sales team",
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
      title: "Client Onboarding Automation",
      description: "Streamlined welcome sequences, document automation, and progress tracking — creating seamless first impressions",
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
      title: "AI Support Systems",
      description: "24/7 intelligent customer support that handles common inquiries and seamlessly escalates complex issues to your team",
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
      title: "Business Intelligence Dashboards",
      description: "Real-time data dashboards with automated reporting, anomaly detection, and predictive analytics for manufacturing, logistics, and operations",
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
      title: "Reputation Management",
      description: "Automated review collection, response management, and reputation monitoring — keeping your brand image positive",
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
      title: "Customer Reactivation Systems",
      description: "Smart re-engagement campaigns with AI-powered segmentation that automatically win back inactive customers",
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
      label: "Development Time",
      description: "from discovery to deployment",
      icon: Rocket,
      color: "from-blue-400 to-cyan-400"
    },
    {
      value: "99.9%",
      label: "System Uptime",
      description: "with enterprise monitoring",
      icon: Activity,
      color: "from-emerald-400 to-teal-400"
    },
    {
      value: "< 4h",
      label: "Support Response",
      description: "for critical system issues",
      icon: Clock,
      color: "from-purple-400 to-indigo-400"
    },
    {
      value: "24/7",
      label: "Automation",
      description: "working for your business",
      icon: Globe,
      color: "from-orange-400 to-red-400"
    }
  ];

  const whyChooseUs = [
    {
      icon: Brain,
      title: "Discovery-Driven Design",
      description: "We start every project with a deep dive into your business goals, workflows, and pain points — ensuring every AI feature serves a purpose and solves real problems.",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: Code2,
      title: "Built In-House, Designed For You",
      description: "Every automation and system is custom-built by our specialists — no outsourced code, no cookie-cutter tools. Just solutions engineered around how your business works.",
      color: "from-emerald-400 to-teal-500"
    },
    {
      icon: Database,
      title: "Secure, Managed, Scalable",
      description: "Every system we build is securely hosted and fully managed by us — with monitoring, updates, and long-term support as your business evolves.",
      color: "from-purple-400 to-indigo-500"
    }
  ];

  const faqs = [
    {
      question: "What types of AI systems can you build for my business?",
      answer: "We design and build custom AI automations for daily tasks (email sequences, lead follow-up, data entry), business intelligence dashboards (production tracking, KPIs, analytics), and full-scale AI software (CRM integrations, workflow management, predictive systems). Every solution is tailored to your industry — from manufacturing and logistics to marketing and service-based businesses.",
      tags: ['custom systems', 'automation types', 'business solutions']
    },
    {
      question: "How is this different from generic automation tools?",
      answer: "We don't use templates or one-size-fits-all platforms. Every system is custom-built from scratch around your specific workflows, data sources, and business goals. We combine intelligent AI decision-making with bespoke integrations — creating systems that feel like they were designed exclusively for you (because they were).",
      tags: ['custom vs generic', 'bespoke development', 'tailored solutions']
    },
    {
      question: "How long does it take to build a custom AI system?",
      answer: "Timelines depend on complexity. Simple automations for sole traders (email sequences, CRM updates) take 2-3 weeks. Business systems for SMEs (dashboards, reporting, multi-tool integration) take 4-6 weeks. Enterprise AI solutions (full-scale platforms, predictive analytics) take 6-8+ weeks. We provide detailed timelines during your discovery session.",
      tags: ['timeline', 'development', 'project duration']
    },
    {
      question: "Can you integrate with our existing business tools?",
      answer: "Yes! We specialise in creating seamless integrations between your CRM, email platforms, databases, project management tools, and operational software. Whether it's HubSpot, Salesforce, Xero, Asana, or custom internal systems — we connect everything into one intelligent workflow.",
      tags: ['integrations', 'existing tools', 'system connectivity']
    },
    {
      question: "How do you ensure system reliability and uptime?",
      answer: "Every system we build includes error handling, automatic retries, fallback procedures, real-time monitoring, and 24/7 health checks. We host and manage everything securely — handling updates, scaling, and performance optimisation so your automation runs smoothly without interruption.",
      tags: ['reliability', 'monitoring', 'managed hosting']
    },
    {
      question: "Do your AI systems learn and improve over time?",
      answer: "Yes. We build intelligent systems that learn from your data patterns and outcomes. As your business grows, the AI adapts — becoming more accurate with lead scoring, better at detecting anomalies, and smarter about recommending actions. The longer it runs, the more valuable it becomes.",
      tags: ['machine learning', 'continuous improvement', 'adaptive intelligence']
    },
    {
      question: "What industries do you specialise in?",
      answer: "We work extensively with manufacturing, logistics, FMCG, distribution, marketing agencies, and service-based businesses. Our AI systems are particularly valuable for SMEs needing production tracking, route optimisation, predictive maintenance, staff scheduling, or performance analytics — and for sole traders wanting to automate repetitive admin tasks.",
      tags: ['industries', 'sectors', 'specialisation']
    },
    {
      question: "How do you handle data security and compliance?",
      answer: "All systems are designed with security-first architecture. We implement encrypted data transfer, secure API protocols, GDPR compliance, regular backups, and isolated processing environments. Your data is protected, monitored, and managed with enterprise-grade security standards.",
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
              <span className="ai-title-line-1">Custom AI Automations,</span>
              <span className="ai-title-line-2">Systems</span>
              <span className="ai-title-line-3">& Software</span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="ai-subtitle"
          >
            From one-click automations to full-scale AI platforms — we design intelligent systems that transform how your business works. Built for sole traders and SMEs that want to automate smarter, operate faster, and grow confidently through AI-powered technology.
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

      {/* Value Proposition Overview */}
      <section className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="ai-automation-card mb-16 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">
            Practical AI That Delivers Real Results
          </h2>
          <div className="space-y-4 text-white text-lg leading-relaxed opacity-90">
            <p>
              Every business runs on repeated actions — we turn those into intelligent automations. From managing leads and reporting to production tracking or performance analytics, our AI systems make work simpler, faster, and more accurate.
            </p>
            <p>
              We design around your business, not generic tools. Every automation, workflow, and dashboard is custom-built — connecting your data, systems, and people into one streamlined ecosystem.
            </p>
            <p>
              For SMEs, that means AI-driven business software. For sole traders, it means smart, time-saving automations that run behind the scenes.
            </p>
            <p className="text-cyan-400 font-semibold">
              We specialise in creating practical, real-world AI — the kind that delivers measurable time savings, efficiency gains, and insight you can act on.
            </p>
          </div>
        </motion.div>
      </section>

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
              What Makes Our AI Systems Different
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
              Custom AI Solutions We Build
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
              Why Choose SoleScope For AI Systems
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
              How We Build Your AI Systems
            </h2>
            <div className="ai-process-grid">
              {[
                { step: "1", title: "Discovery", desc: "Deep dive into your business goals, workflows, and pain points", icon: Eye, color: "cyan" },
                { step: "2", title: "Design", desc: "Blueprint the automation or system architecture tailored to your needs", icon: Layers, color: "emerald" },
                { step: "3", title: "Build", desc: "Develop custom AI systems with integrations and intelligent logic", icon: Code2, color: "purple" },
                { step: "4", title: "Support", desc: "Deploy, monitor, and evolve your systems as your business grows", icon: Rocket, color: "orange" }
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
              Frequently Asked Questions
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
              Ready To Design Your Next Evolution?
            </h2>
            <p className="ai-cta-description">
              Let's build the systems that will power your business for years to come. Serving sole traders and SMEs across the UK — combining deep industry insight with advanced AI automation and custom software design.
            </p>
            
            <div className="ai-cta-buttons">
              <Link to="/contact" className="ai-btn-primary">
                <Calendar className="h-5 w-5" />
                Start My Discovery Session
              </Link>
              <a href="mailto:contact@solescope.co.uk" className="ai-btn-secondary">
                <Mail className="h-5 w-5" />
                Email Our Team
              </a>
            </div>
            
            <div className="ai-cta-features">
              <div className="ai-cta-feature">
                <div className="ai-cta-feature-dot"></div>
                <span>Free discovery consultation</span>
              </div>
              <div className="ai-cta-divider"></div>
              <div className="ai-cta-feature">
                <div className="ai-cta-feature-dot"></div>
                <span>Custom proposal within 24 hours</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default CustomAIAutomationsPage;