import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Globe, Code, BarChart3, Palette, Bot, CheckCircle, Clock, Shield, Server, FileText, BookOpen, Calendar } from 'lucide-react';

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

  const trustChips = [
    {
      text: 'Build window: 2–6 weeks',
      icon: Clock
    },
    {
      text: 'Support: ≤ 1 business day',
      icon: CheckCircle
    },
    {
      text: 'Hosting SLA: 99.9%+ (provider)',
      icon: Server
    },
    {
      text: 'Data privacy: UK/EU-friendly',
      icon: Shield
    },
    {
      text: 'Boutique capacity: 2 new builds/month',
      icon: Bot
    }
  ];

  const resourceLinks = [
    {
      label: 'Brand Deck (PDF)',
      icon: FileText,
      path: '/files/solescope-brand.pdf'
    },
    {
      label: 'Service Catalog (PDF)',
      icon: BookOpen,
      path: '/files/solescope-catalog.pdf'
    },
    {
      label: 'Process & Timelines (PDF)',
      icon: Calendar,
      path: '/files/solescope-process.pdf'
    }
  ];

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden pt-20 md:pt-22 lg:pt-24 py-14 md:py-16 lg:py-18"
      aria-labelledby="hero-heading"
      role="region"
    >

      {/* Subtle vignette overlay for text legibility */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-black/5 blur-3xl rounded-full"></div>
      </div>

      {portfolioImages.map((example) => (
        <motion.div
          key={example.id}
          className={`absolute ${example.size} opacity-15 pointer-events-none z-0`}
          style={{
            ...example.position,
            transform: `rotate(${example.rotation})`,
          }}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.15, 0.20, 0.15],
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
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
              Boutique AI Web & Automation Studio • UK
            </span>
          </motion.div>

          <motion.h1
            id="hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight md:leading-tight tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Where Human Design Meets Intelligent Automation.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 max-w-2xl md:max-w-3xl mx-auto text-base md:text-lg leading-relaxed text-white/80 mb-8"
          >
            Handcrafted websites with concierge automation—bookings, emails, reviews, and workflows—woven into one seamless experience. Professional. Personal. Quietly powerful.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 justify-center"
          >
            <Link
              to="/contact"
              aria-label="Book a 15-minute fit call with SoleScope"
              className="group bg-[#6C3EF0] text-white px-10 py-4 text-lg font-semibold rounded-full hover:bg-[#5A33C8] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center shadow-lg shadow-purple-500/30 focus:outline-none focus:ring-2 focus:ring-[#6C3EF0] focus:ring-offset-2 focus:ring-offset-black"
            >
              <span>Book a 15-min Fit Call →</span>
            </Link>

            <Link
              to="/services"
              aria-label="View our case demos and portfolio"
              className="group bg-transparent text-white border-2 border-white/40 px-10 py-4 text-lg font-semibold rounded-full hover:bg-white hover:text-black hover:border-white hover:scale-[1.02] transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              View Case Demos
              <Play className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-4 text-center"
          >
            <p className="text-xs text-white/60">
              No hard sells. Transparent pricing and concierge onboarding.
            </p>
          </motion.div>

          {/* Resource Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-6"
          >
            {resourceLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-xs text-white/50 hover:text-white/80 transition-colors duration-300"
                aria-label={link.label}
              >
                <link.icon className="h-3.5 w-3.5" />
                <span>{link.label}</span>
              </a>
            ))}
          </motion.div>

          {/* Trust Chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-12 mb-8"
          >
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory md:overflow-visible px-4 md:px-0">
              {trustChips.map((chip, index) => (
                <motion.div
                  key={chip.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.85 + index * 0.05 }}
                  className="flex-shrink-0 snap-center"
                >
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/8 hover:border-white/20 transition-all duration-300">
                    <chip.icon className="h-4 w-4 text-slate-400" />
                    <span className="text-sm font-medium text-white/80 whitespace-nowrap">
                      {chip.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Disclosure */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-4 text-center"
          >
            <p className="text-xs text-white/50 italic">
              Discreetly enhanced by modern AI to save you time, not your brand voice.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="max-w-6xl mx-auto mt-16"
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
