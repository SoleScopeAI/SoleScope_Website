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
      preview: "24/7 intelligent automation for lead qualification and client workflows",
      color: "from-cyan-500 via-purple-500 to-emerald-500",
      isAI: true
    },
    {
      icon: Globe,
      label: "Website Design",
      path: "/services/website-design",
      preview: "Professional, mobile-responsive websites with managed hosting",
      color: "from-purple-600 to-purple-700"
    },
    {
      icon: Code,
      label: "Custom WebApps",
      path: "/services/custom-webapps",
      preview: "Tailored web applications with enterprise-grade hosting",
      color: "from-purple-600 to-purple-700"
    },
    {
      icon: BarChart3,
      label: "AI Dashboards",
      path: "/services/ai-dashboards",
      preview: "Transform complex data into clear, actionable insights",
      color: "from-purple-600 to-purple-700"
    },
    {
      icon: Palette,
      label: "Brand Identity",
      path: "/services/brand-identity",
      preview: "Complete brand packages with logos and marketing materials",
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
      label: 'Typical build window',
      value: '2–6 weeks',
      tooltip: 'Estimated; varies by scope & assets.',
      icon: Clock
    },
    {
      label: 'Support response',
      value: '≤ 1 business day',
      tooltip: 'Business hours; urgent issues prioritized.',
      icon: CheckCircle
    },
    {
      label: 'Hosting SLA',
      value: '99.9%+ (provider)',
      tooltip: "Per hosting provider's SLA; not a guarantee of zero downtime.",
      icon: Server
    },
    {
      label: 'Data privacy',
      value: 'UK/EU-friendly',
      tooltip: 'We follow sensible data-handling practices; you control your data.',
      icon: Shield
    }
  ];

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden pt-16 md:pt-0 pb-12 md:pb-16"
      aria-labelledby="hero-heading"
      role="region"
    >

      {portfolioImages.map((example) => (
        <motion.div
          key={example.id}
          className={`absolute ${example.size} opacity-20 pointer-events-none z-0`}
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-800/60 border border-slate-600/40 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-sm text-slate-300 font-medium">Boutique AI Web Studio • UK</span>
          </motion.div>

          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
          >
            <span className="block text-white">Transform Your Service Business with</span>
            <span className="block bg-gradient-to-r from-[#B39CFF] to-[#6C3EF0] bg-clip-text text-transparent">
              Boutique AI-Powered Websites
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto mb-6 md:mb-8 leading-relaxed"
          >
            We craft high-performing websites and automations for UK service businesses—designed to capture leads,
            handle bookings, streamline follow-up, and showcase reviews. Premium craft, measurable workflows.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur shadow-lg overflow-hidden">
              <ul className="grid grid-cols-2 sm:grid-cols-4 divide-y divide-white/5 sm:divide-y-0 sm:divide-x sm:divide-white/5">
                {serviceLevelFacts.map((fact, index) => (
                  <li
                    key={fact.label}
                    className="group relative text-center px-4 sm:px-6 py-4 hover:bg-white/5 transition-all duration-300"
                    title={fact.tooltip}
                  >
                    <fact.icon className="h-5 w-5 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs text-white/60 mb-1">{fact.label}</p>
                    <p className="text-sm sm:text-base font-semibold text-white leading-tight">{fact.value}</p>
                    <span className="sr-only">{fact.tooltip}</span>
                  </li>
                ))}
              </ul>
              <div className="px-4 pb-4 pt-2">
                <p className="text-[11px] text-white/50 leading-relaxed">
                  *Examples and timelines are indicative and may vary by project. We do not guarantee rankings, traffic, or revenue.
                  Actual performance depends on many factors including market, competition, and client inputs.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-4 text-center"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-amber-200 font-medium">Limited capacity: accepting up to 2 new projects this month</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-6xl mx-auto mb-8"
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center items-center"
        >
          <Link
            to="/contact"
            className="group bg-[#6C3EF0] text-white px-10 py-4 text-lg font-semibold rounded-full hover:bg-[#5A33C8] hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-lg shadow-purple-500/30"
          >
            <span>Book a 15-min Fit Call</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/services"
            className="group bg-transparent text-white border-2 border-white/40 px-10 py-4 text-lg font-semibold rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center"
          >
            View Case Demos
            <Play className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-slate-400">
            Transparent pricing • Concierge onboarding • No long-term lock-ins
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveHero;
