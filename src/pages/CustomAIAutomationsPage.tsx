import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Zap,
  Shield,
  Check,
  ArrowRight,
  ChevronDown,
  Calendar,
  Mail,
  Target,
  Users,
  BarChart3,
  Brain,
  Cpu,
  Database,
  Code2,
  Rocket,
  Eye,
  Layers,
  TrendingUp,
  Factory,
  Truck,
  Briefcase,
  Package,
  Settings,
  Server,
  Lock,
  CheckCircle2
} from "lucide-react";

const CustomAIAutomationsPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeProcess, setActiveProcess] = useState(0);
  const [dashboardMetrics, setDashboardMetrics] = useState({
    speed: 50,
    insight: 50,
    volume: 50
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProcess((prev) => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollToDiscovery = () => {
    const element = document.getElementById('discovery-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const keyPillars = [
    {
      icon: Settings,
      label: "Custom-Built Automations",
      description: "Tailored to your workflows"
    },
    {
      icon: Database,
      label: "Business Systems",
      description: "Integrated operational tools"
    },
    {
      icon: BarChart3,
      label: "AI Dashboards",
      description: "Real-time insight and analytics"
    },
    {
      icon: Server,
      label: "Managed Hosting",
      description: "Secure, monitored infrastructure"
    }
  ];

  const industries = [
    {
      icon: Factory,
      name: "Manufacturing / FMCG",
      example: "Real-time dashboards and predictive analytics for production lines"
    },
    {
      icon: Truck,
      name: "Distribution & Logistics",
      example: "Smart routing, inventory tracking, and automated reports"
    },
    {
      icon: Target,
      name: "Marketing & Sales",
      example: "AI-assisted lead generation and performance tracking"
    },
    {
      icon: Settings,
      name: "Operations & Admin",
      example: "Workforce scheduling and automated workflow management"
    },
    {
      icon: Briefcase,
      name: "Professional Services",
      example: "Client onboarding, task assignment, and billing automations"
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Discovery",
      desc: "Deep dive into workflows, goals, and pain points",
      icon: Eye
    },
    {
      step: "2",
      title: "Design",
      desc: "Blueprint the system architecture tailored to needs",
      icon: Layers
    },
    {
      step: "3",
      title: "Build",
      desc: "Develop custom systems with intelligent logic",
      icon: Code2
    },
    {
      step: "4",
      title: "Deploy",
      desc: "Launch with training and documentation",
      icon: Rocket
    },
    {
      step: "5",
      title: "Support",
      desc: "Monitor and evolve as business grows",
      icon: Shield
    }
  ];

  const packages = [
    {
      name: "Automation Essentials",
      description: "Daily task automations for sole traders and small businesses",
      features: [
        "1-3 workflow automations",
        "Email and calendar integration",
        "Client onboarding sequences",
        "Basic reporting setup",
        "Email support"
      ],
      cta: "Start with Essentials"
    },
    {
      name: "Business Systems",
      description: "Integrated AI systems and dashboards for SMEs",
      features: [
        "Multi-system integrations",
        "Custom operational dashboards",
        "AI-assisted analytics",
        "Team workflow automations",
        "Priority support"
      ],
      cta: "Explore Business Systems",
      popular: true
    },
    {
      name: "Enterprise AI Solutions",
      description: "Custom AI software with full discovery, prototyping, and support",
      features: [
        "Unlimited integrations",
        "Bespoke AI platforms",
        "Advanced predictive models",
        "Dedicated account manager",
        "24/7 monitoring"
      ],
      cta: "Discuss Enterprise Needs"
    }
  ];

  const faqs = [
    {
      question: "What types of AI systems can you build for my business?",
      answer: "We design and build custom AI automations for daily tasks (email sequences, lead follow-up, data entry), business intelligence dashboards (production tracking, KPIs, analytics), and full-scale AI software (CRM integrations, workflow management, predictive systems). Every solution is tailored to your industry — from manufacturing and logistics to marketing and service-based businesses."
    },
    {
      question: "How is this different from generic automation tools?",
      answer: "We don't use templates or one-size-fits-all platforms. Every system is custom-built from scratch around your specific workflows, data sources, and business goals. We combine intelligent AI decision-making with bespoke integrations — creating systems that feel like they were designed exclusively for you (because they were)."
    },
    {
      question: "How long does it take to build a custom AI system?",
      answer: "Timelines depend on complexity. Simple automations for sole traders (email sequences, CRM updates) take 2-3 weeks. Business systems for SMEs (dashboards, reporting, multi-tool integration) take 4-6 weeks. Enterprise AI solutions (full-scale platforms, predictive analytics) take 6-8+ weeks. We provide detailed timelines during your discovery session."
    },
    {
      question: "Can you integrate with our existing business tools?",
      answer: "Yes! We specialise in creating seamless integrations between your CRM, email platforms, databases, project management tools, and operational software. Whether it's HubSpot, Salesforce, Xero, Asana, or custom internal systems — we connect everything into one intelligent workflow."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const calculatedMetrics = {
    tasksPerDay: Math.round((dashboardMetrics.speed / 10) * (dashboardMetrics.volume / 10) * 5),
    insightScore: Math.round((dashboardMetrics.insight * 0.8) + 20),
    efficiency: Math.round(((dashboardMetrics.speed + dashboardMetrics.insight + dashboardMetrics.volume) / 3) * 0.9)
  };

  return (
    <main className="pt-24 pb-20 bg-black text-white">
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Intelligent Automation,
                <span className="block text-slate-300">Built Around Your Business</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed max-w-2xl">
                We design and build custom AI automations, systems, and business software that help sole traders and SMEs work smarter, faster, and more efficiently.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Book a Discovery Session
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <button
                  onClick={scrollToDiscovery}
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors"
                >
                  See What's Possible
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                <div className="space-y-4">
                  {[
                    { label: "Data Input", active: true },
                    { label: "AI Processing", active: true },
                    { label: "Automated Output", active: activeProcess >= 2 },
                    { label: "System Integration", active: activeProcess >= 3 },
                    { label: "Performance Monitoring", active: activeProcess >= 4 }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-3"
                      animate={{
                        opacity: item.active ? 1 : 0.3
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`w-3 h-3 rounded-full ${item.active ? 'bg-purple-400' : 'bg-white/30'}`} />
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-400 to-purple-600"
                          initial={{ width: 0 }}
                          animate={{ width: item.active ? '100%' : '0%' }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="text-sm text-slate-400 w-40">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Practical AI That Delivers Real Results
              </h2>
              <p className="text-lg text-slate-400 mb-4 leading-relaxed">
                From automating daily admin to developing complex business software, our AI systems are designed around the real challenges of your business.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                We focus on practical, measurable impact — saving time, improving accuracy, and connecting your data so everything runs seamlessly.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {keyPillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/[0.07] hover:border-purple-400/30 transition-all duration-300"
                >
                  <pillar.icon className="h-8 w-8 text-white mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{pillar.label}</h3>
                  <p className="text-xs text-slate-400">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Built For Your Business Stage
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <div className="flex items-start gap-4 mb-4">
                <Users className="h-8 w-8 text-white flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">For Sole Traders</h3>
                  <p className="text-slate-400 leading-relaxed">
                    We automate the repetitive parts of your work — from client onboarding to invoicing — so you can focus on what you do best.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <div className="flex items-start gap-4 mb-4">
                <Briefcase className="h-8 w-8 text-white flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">For SMEs</h3>
                  <p className="text-slate-400 leading-relaxed">
                    We build tailored AI software and integrated systems that streamline operations, connect departments, and give leadership real-time visibility across the business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="discovery-section" className="py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Approach: Discovery-Led Design
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Every project starts with a Discovery Session — a deep dive into your workflows, goals, and challenges. We create a detailed roadmap before any build begins, ensuring that every automation or system we deliver is perfectly aligned with your business.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2" />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 relative">
              {processSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/[0.07] transition-colors">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">{step.step}</div>
                      <h3 className="text-sm font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-xs text-slate-400">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Industry Expertise
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/[0.07] transition-colors"
              >
                <industry.icon className="h-10 w-10 text-white mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{industry.name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{industry.example}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Service Packages
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-white/5 backdrop-blur-sm rounded-2xl border p-8 hover:bg-white/[0.07] hover:border-purple-400/30 transition-all duration-300 ${
                  pkg.popular ? 'border-purple-400/30 ring-1 ring-purple-400/20' : 'border-white/10'
                }`}
              >
                {pkg.popular && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full mb-4 shadow-lg">
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">Most Popular</span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white mb-3">{pkg.name}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">{pkg.description}</p>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg"
                >
                  {pkg.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Dashboard Simulator
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Adjust the controls below to see how different configurations affect system performance.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="space-y-8 mb-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-white">Automation Speed</label>
                  <span className="text-sm text-slate-400">{dashboardMetrics.speed}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dashboardMetrics.speed}
                  onChange={(e) => setDashboardMetrics({ ...dashboardMetrics, speed: parseInt(e.target.value) })}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-white">Insight Level</label>
                  <span className="text-sm text-slate-400">{dashboardMetrics.insight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dashboardMetrics.insight}
                  onChange={(e) => setDashboardMetrics({ ...dashboardMetrics, insight: parseInt(e.target.value) })}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-white">Data Volume</label>
                  <span className="text-sm text-slate-400">{dashboardMetrics.volume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dashboardMetrics.volume}
                  onChange={(e) => setDashboardMetrics({ ...dashboardMetrics, volume: parseInt(e.target.value) })}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="text-center">
                <motion.div
                  key={calculatedMetrics.tasksPerDay}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  {calculatedMetrics.tasksPerDay}
                </motion.div>
                <div className="text-sm text-slate-400">Tasks Per Day</div>
              </div>

              <div className="text-center border-x border-white/10">
                <motion.div
                  key={calculatedMetrics.insightScore}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  {calculatedMetrics.insightScore}
                </motion.div>
                <div className="text-sm text-slate-400">Insight Score</div>
              </div>

              <div className="text-center">
                <motion.div
                  key={calculatedMetrics.efficiency}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  {calculatedMetrics.efficiency}%
                </motion.div>
                <div className="text-sm text-slate-400">Efficiency</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Secure, Reliable, Fully Managed
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              All systems are securely hosted and fully managed. We monitor, maintain, and support every build — ensuring consistent performance and peace of mind.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed mt-4">
              Our clients rely on us long after launch. You'll have ongoing access to the same specialists who designed and built your system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Lock, label: "Enterprise Security", desc: "Bank-level encryption" },
              { icon: Server, label: "Managed Hosting", desc: "24/7 monitoring" },
              { icon: Shield, label: "Ongoing Support", desc: "Direct specialist access" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 text-center">
                <item.icon className="h-10 w-10 text-white mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-white mb-1">{item.label}</h3>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-lg font-semibold text-white pr-8">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-white transition-transform flex-shrink-0 ${
                      activeIndex === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-slate-400 leading-relaxed border-t border-white/10 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Let's build the systems that power your next stage of growth
          </h2>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            Book your Discovery Session today
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg"
          >
            Book Discovery Session
            <Calendar className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CustomAIAutomationsPage;
