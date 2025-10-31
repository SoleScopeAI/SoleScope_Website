import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Globe, Code, BarChart3, Palette, Bot, CheckCircle, Clock, Shield, Server, Award, Users, Briefcase } from 'lucide-react';

const InteractiveHero = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [showFounderDetails, setShowFounderDetails] = useState(false);

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

  const quickCredentials = [
    { icon: Award, label: 'Chartered Manager' },
    { icon: Briefcase, label: '7 yrs FMCG Leadership' },
    { icon: Users, label: '6× Business Founder' }
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
      value: '2–6 weeks',
      tooltip: 'Estimated; varies by scope & assets.',
      icon: Clock
    },
    {
      label: 'Support',
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
      className="relative flex items-center justify-center overflow-hidden pt-20 md:pt-22 lg:pt-24 py-14 md:py-16 lg:py-18"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 flex flex-col items-center lg:items-start"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative">
                <motion.div
                  className="w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setShowFounderDetails(!showFounderDetails)}
                >
                  <img
                    src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Kevin Hannah, CMgr - Founder of SoleScope Studio & Design"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </motion.div>

                <motion.div
                  className="mt-4 space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-white text-center lg:text-left">
                    Kevin Hannah, <span className="text-purple-300">CMgr</span>
                  </h2>
                  <p className="text-base text-white/70 text-center lg:text-left">
                    Founder & Automation Specialist
                  </p>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-2">
                    {quickCredentials.map((cred, index) => (
                      <motion.div
                        key={cred.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5"
                      >
                        <cred.icon className="h-3.5 w-3.5 text-purple-300" />
                        <span className="text-xs text-white/80">{cred.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <AnimatePresence>
                  {showFounderDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 overflow-hidden"
                    >
                      <p className="text-sm text-white/80 leading-relaxed text-center lg:text-left">
                        I specialize in AI application and web design for sole traders and small service teams—combining operational discipline with hands-on build skills to deliver solutions that actually get used.
                      </p>
                      <Link
                        to="/about"
                        className="inline-flex items-center gap-2 mt-3 text-sm text-purple-300 hover:text-purple-200 transition-colors"
                      >
                        Read full story <ArrowRight className="h-4 w-4" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8"
          >
            <div className="mb-5 flex justify-center lg:justify-start">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-purple-600/15 px-3 py-1 text-xs font-medium text-purple-200">
                Limited capacity: accepting up to 2 new projects this month
              </span>
            </div>

            <motion.div
              className="mb-4 flex justify-center lg:justify-start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
                Boutique AI Web & Automation Studio • UK
              </span>
            </motion.div>

            <h1
              id="hero-heading"
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-[1.1] tracking-tight text-white mb-4 text-center lg:text-left"
            >
              <span className="block">AI-Powered Solutions for</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Sole Traders, Small Businesses & SMEs
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-4 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed text-center lg:text-left"
            >
              I combine handcrafted web design with intelligent automation—connecting your bookings, emails, reviews, and workflows into one seamless system. Built specifically for service businesses who want to compete and win online.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 justify-center lg:justify-start"
            >
              <Link
                to="/contact"
                className="group bg-[#6C3EF0] text-white px-10 py-4 text-lg font-semibold rounded-full hover:bg-[#5A33C8] hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-lg shadow-purple-500/30"
              >
                <span>Start Your Project</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/services"
                className="group bg-transparent text-white border-2 border-white/40 px-10 py-4 text-lg font-semibold rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center"
              >
                View Services
                <Play className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-3 text-center lg:text-left"
            >
              <p className="text-xs text-white/60">
                Transparent pricing • Personal service • No lock-ins • You own your assets
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
                  <p className="text-[11px] text-white/50 text-center lg:text-left">
                    *Timelines and results vary by project scope. No guarantees on rankings, traffic, or revenue.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-sm text-slate-400 uppercase tracking-wide mb-2">What I Can Build For You</h3>
            <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.5 + index * 0.1 }}
                onHoverStart={() => setActiveService(index)}
                onHoverEnd={() => setActiveService(null)}
                className="relative"
              >
                <Link
                  to={service.path}
                  className={`flex flex-col items-center p-6 backdrop-blur-sm border rounded-xl transition-all duration-300 h-full ${
                    service.isAI
                      ? 'bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-emerald-500/20 border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-400/20'
                      : 'bg-black/30 border-white/20 hover:border-[#6C3EF0] hover:bg-purple-600/10 hover:shadow-lg hover:shadow-purple-500/20'
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
                        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg p-3 z-50 shadow-xl"
                      >
                        <p className="text-xs text-slate-300 text-center">{service.preview}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-white/60">
              Built for sole traders, groomers, trades, trainers, local pros, and growing SMEs
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveHero;
