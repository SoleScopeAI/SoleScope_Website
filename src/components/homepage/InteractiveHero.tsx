import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Globe, Code, BarChart3, Palette, Bot, CheckCircle, Clock, Shield, Server } from 'lucide-react';

const InteractiveHero = () => {
  const [activeService, setActiveService] = useState<number | null>(null);

  const services = [
    {
      icon: Bot,
      label: "AI Automations",
      path: "/services/custom-ai-automations",
      preview: "Enterprise-grade automation for lead qualification, team workflows, and business intelligence",
      color: "from-cyan-500 via-purple-500 to-emerald-500",
      isAI: true
    },
    {
      icon: Globe,
      label: "Website Design",
      path: "/services/website-design",
      preview: "Scalable, conversion-focused websites with enterprise hosting and SEO foundations",
      color: "from-purple-600 to-purple-700"
    },
    {
      icon: Code,
      label: "Custom WebApps",
      path: "/services/custom-webapps",
      preview: "Multi-user web applications with team collaboration and enterprise integrations",
      color: "from-purple-600 to-purple-700"
    },
    {
      icon: BarChart3,
      label: "AI Dashboards",
      path: "/services/ai-dashboards",
      preview: "Real-time business intelligence dashboards with custom reporting and team analytics",
      color: "from-purple-600 to-purple-700"
    },
    {
      icon: Palette,
      label: "Brand Identity",
      path: "/services/brand-identity",
      preview: "Comprehensive corporate identity systems from startups to established SMEs",
      color: "from-purple-600 to-purple-700"
    }
  ];

  const portfolioImages = [
    {
      id: 1,
      image: "/assets/carousel/JodiesPamperedPoochesWebsite.png",
      title: "Jodie's Pampered Pooches",
      service: "Website Design",
      position: { top: '15%', left: '8%' },
      rotation: '-12deg',
      size: 'w-24 h-16 sm:w-32 sm:h-20 md:w-48 md:h-32',
      delay: 0
    },
    {
      id: 2,
      image: "/assets/carousel/Design K9 Home Page.png",
      title: "Design K9 Training",
      service: "Web Development",
      position: { top: '25%', right: '10%' },
      rotation: '8deg',
      size: 'w-28 h-18 sm:w-36 sm:h-24 md:w-52 md:h-36',
      delay: 2
    },
    {
      id: 3,
      image: "/assets/carousel/UKBladeSharpening.png",
      title: "UK Blade Sharpening",
      service: "Custom WebApp",
      position: { bottom: '20%', left: '5%' },
      rotation: '15deg',
      size: 'w-20 h-12 sm:w-28 sm:h-18 md:w-44 md:h-28',
      delay: 4
    },
    {
      id: 4,
      image: "/assets/carousel/JodiesPamperedPoochesWebsite.png",
      title: "Portfolio Example",
      service: "Brand Identity",
      position: { bottom: '30%', right: '8%' },
      rotation: '-8deg',
      size: 'w-18 h-10 sm:w-24 sm:h-16 md:w-40 md:h-24',
      delay: 1
    },
    {
      id: 5,
      image: "/assets/carousel/Design K9 Home Page.png",
      title: "Client Work",
      service: "AI Dashboard",
      position: { top: '45%', left: '12%' },
      rotation: '5deg',
      size: 'w-16 h-10 sm:w-20 sm:h-14 md:w-36 md:h-24',
      delay: 3
    },
    {
      id: 6,
      image: "/assets/carousel/UKBladeSharpening.png",
      title: "Business Solution",
      service: "Automation",
      position: { top: '60%', right: '15%' },
      rotation: '-18deg',
      size: 'w-22 h-14 sm:w-28 sm:h-18 md:w-42 md:h-28',
      delay: 5
    }
  ];

  const serviceLevelFacts = [
    {
      label: 'Build window',
      value: '2–8 weeks',
      tooltip: 'Scalable timelines for small businesses to SMEs; varies by scope, integrations & complexity.',
      icon: Clock
    },
    {
      label: 'Support',
      value: '≤ 4 hours',
      tooltip: 'Enterprise-grade response times; urgent issues prioritized for business continuity.',
      icon: CheckCircle
    },
    {
      label: 'Hosting SLA',
      value: '99.9%+ uptime',
      tooltip: 'Business-critical reliability with enterprise hosting infrastructure and monitoring.',
      icon: Server
    },
    {
      label: 'Data privacy',
      value: 'GDPR compliant',
      tooltip: 'Full UK/EU compliance, secure data handling, and complete data ownership for your business.',
      icon: Shield
    }
  ];

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden pt-20 md:pt-22 lg:pt-24 py-14 md:py-16 lg:py-18"
      aria-labelledby="hero-heading"
      role="region"
    >

      {portfolioImages.map((example) => (
        <motion.div
          key={example.id}
          className={`hidden md:block absolute ${example.size} opacity-20 pointer-events-none z-0`}
          style={{
            ...example.position,
            transform: `rotate(${example.rotation})`,
          }}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.20, 0.25, 0.20],
            scale: [0.95, 1.05, 0.95],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: example.delay,
            ease: "easeInOut"
          }}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-transparent"></div>
            <img
              src={example.image}
              alt={example.title}
              className="w-full h-full object-cover filter blur-[1px] sm:blur-[2px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent"></div>
          </div>
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            className="mt-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
              AI Web & Automation Studio • Serving Small Businesses & SMEs • UK
            </span>
          </motion.div>

          <h1
            id="hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-white"
          >
            Where Human Design Meets Intelligent Automation.
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-3 max-w-2xl md:max-w-3xl mx-auto text-base md:text-lg text-white/80 hidden md:block"
          >
            We combine handcrafted web design with intelligent automation — connecting bookings, CRM, team workflows, and business processes into scalable systems. From sole traders to growing SMEs, we deliver solutions that evolve with your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 md:hidden relative mx-auto w-full max-w-md"
          >
            <div className="relative aspect-[4/3] w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-cyan-500/30 to-purple-600/40 blur-3xl animate-pulse"></div>

              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10 w-full h-full flex items-center justify-center"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl"></div>

                  <svg
                    viewBox="0 0 400 300"
                    className="w-full h-full relative z-10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                      </linearGradient>

                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>

                    <g filter="url(#glow)">
                      <ellipse cx="200" cy="120" rx="100" ry="80" fill="none" stroke="url(#brainGradient)" strokeWidth="3" opacity="0.8" />
                      <ellipse cx="180" cy="100" rx="40" ry="35" fill="none" stroke="url(#brainGradient)" strokeWidth="2" opacity="0.6" />
                      <ellipse cx="220" cy="100" rx="40" ry="35" fill="none" stroke="url(#brainGradient)" strokeWidth="2" opacity="0.6" />

                      <path d="M 160 120 Q 150 140 160 160 Q 170 180 180 160 Q 190 140 180 120"
                            fill="none" stroke="url(#brainGradient)" strokeWidth="2" opacity="0.7" />
                      <path d="M 220 120 Q 230 140 220 160 Q 210 180 200 160 Q 190 140 200 120"
                            fill="none" stroke="url(#brainGradient)" strokeWidth="2" opacity="0.7" />

                      <line x1="150" y1="80" x2="120" y2="50" stroke="url(#brainGradient)" strokeWidth="2" opacity="0.5" />
                      <line x1="250" y1="80" x2="280" y2="50" stroke="url(#brainGradient)" strokeWidth="2" opacity="0.5" />
                      <line x1="130" y1="140" x2="90" y2="160" stroke="url(#brainGradient)" strokeWidth="2" opacity="0.5" />
                      <line x1="270" y1="140" x2="310" y2="160" stroke="url(#brainGradient)" strokeWidth="2" opacity="0.5" />

                      <circle cx="120" cy="50" r="4" fill="#06b6d4" opacity="0.8">
                        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="280" cy="50" r="4" fill="#8b5cf6" opacity="0.8">
                        <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="90" cy="160" r="4" fill="#06b6d4" opacity="0.8">
                        <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="310" cy="160" r="4" fill="#8b5cf6" opacity="0.8">
                        <animate attributeName="opacity" values="0.3;1;0.3" dur="2.2s" repeatCount="indefinite" />
                      </circle>

                      <g transform="translate(100, 200)">
                        <circle cx="0" cy="0" r="15" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />
                        <circle cx="0" cy="0" r="8" fill="#06b6d4" opacity="0.3" />
                        <line x1="-10" y1="0" x2="10" y2="0" stroke="#06b6d4" strokeWidth="1.5" />
                        <line x1="0" y1="-10" x2="0" y2="10" stroke="#06b6d4" strokeWidth="1.5" />
                      </g>

                      <g transform="translate(300, 200)">
                        <circle cx="0" cy="0" r="15" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0.6" />
                        <path d="M -8,-8 L 8,8 M -8,8 L 8,-8" stroke="#8b5cf6" strokeWidth="1.5" />
                      </g>

                      <g transform="translate(200, 240)">
                        <rect x="-12" y="-12" width="24" height="24" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />
                        <circle cx="0" cy="0" r="5" fill="#06b6d4" opacity="0.5">
                          <animate attributeName="r" values="3;7;3" dur="1.8s" repeatCount="indefinite" />
                        </circle>
                      </g>
                    </g>

                    <text x="200" y="280" textAnchor="middle" fill="url(#brainGradient)" fontSize="12" opacity="0.6" fontWeight="600">
                      AI-Powered Intelligence
                    </text>
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-7 flex flex-col md:flex-row md:items-center gap-3 justify-center"
          >
            <Link
              to="/contact"
              className="group bg-[#6C3EF0] text-white px-10 py-4 text-lg font-semibold rounded-full hover:bg-[#5A33C8] hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-lg shadow-purple-500/30 w-full md:w-auto"
            >
              <span>Book a 15-min Fit Call</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/services"
              className="group bg-transparent text-white border-2 border-white/40 px-10 py-4 text-lg font-semibold rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center w-full md:w-auto"
            >
              View Case Demos
              <Play className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-2 text-center"
          >
            <p className="text-xs text-white/60">
              Transparent pricing • Concierge onboarding • No lock-ins
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 md:mt-9"
          >
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur shadow-lg">
              <ul className="grid grid-cols-2 sm:grid-cols-4 divide-y divide-white/5 sm:divide-y-0 sm:divide-x sm:divide-white/5 sm:[&>*]:px-5 py-3 sm:py-4 gap-y-2">
                {serviceLevelFacts.map((fact, index) => (
                  <li
                    key={fact.label}
                    className="group relative text-center px-4 sm:px-0 hover:bg-white/5 transition-all duration-300"
                    title={fact.tooltip}
                  >
                    <fact.icon className="h-5 w-5 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs text-white/60 mb-1">{fact.label}</p>
                    <p className="text-sm sm:text-base font-semibold text-white leading-tight">{fact.value}</p>
                    <span className="sr-only">{fact.tooltip}</span>
                  </li>
                ))}
              </ul>
              <div className="px-4 pb-3">
                <p className="text-[11px] text-white/50">
                  *Examples and timelines are indicative and may vary by project. We do not guarantee rankings, traffic, or revenue.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="max-w-6xl mx-auto mt-8 hidden md:block"
          >
            <p className="text-sm text-slate-400 mb-4 uppercase tracking-wide">Our Services</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  onHoverStart={() => setActiveService(index)}
                  onHoverEnd={() => setActiveService(null)}
                  className="relative"
                >
                  <Link
                    to={service.path}
                    className={`flex flex-col items-center p-6 backdrop-blur-sm border rounded-xl transition-all duration-300 h-full ${
                      service.isAI
                        ? 'bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-emerald-500/20 border-cyan-400/30 hover:border-cyan-400/60'
                        : 'bg-black/30 border-white/20 hover:border-[#6C3EF0] hover:bg-purple-600/10'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 ${
                      service.isAI
                        ? 'bg-gradient-to-br from-cyan-400 via-purple-500 to-emerald-400'
                        : 'bg-gradient-to-br from-purple-600/30 to-purple-700/30'
                    }`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-center leading-tight text-white">
                      {service.label}
                    </span>

                    <AnimatePresence>
                      {activeService === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-64 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg p-3 z-50"
                        >
                          <p className="text-xs text-slate-300 text-center">{service.preview}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveHero;
