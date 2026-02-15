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
            className="mt-8 md:hidden relative mx-auto w-full max-w-md overflow-hidden"
          >
            <div className="relative aspect-[4/3] w-full">
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full relative z-10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="humanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
                  </linearGradient>

                  <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                  </linearGradient>

                  <radialGradient id="glowGradient">
                    <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#06b6d4', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 0 }} />
                  </radialGradient>

                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>

                  <filter id="strongGlow">
                    <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                <rect width="800" height="600" fill="#1e1b4b" />

                {Array.from({ length: 40 }).map((_, i) => (
                  <circle
                    key={`star-${i}`}
                    cx={Math.random() * 800}
                    cy={Math.random() * 600}
                    r={Math.random() * 1.5 + 0.5}
                    fill="#ffffff"
                    opacity="0.6"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.2;0.8;0.2"
                      dur={`${Math.random() * 3 + 2}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                ))}

                <g id="humanHand" filter="url(#glow)">
                  <path
                    d="M 150,400 Q 130,350 140,300 L 160,250 Q 165,230 175,240 L 180,290 Q 182,250 190,240 Q 195,235 200,245 L 205,290 Q 208,250 218,245 Q 223,242 228,250 L 230,295 Q 235,260 245,255 Q 250,253 255,265 L 255,320 Q 258,360 270,390 L 290,420 Q 295,430 285,435 L 260,440 Q 240,442 220,435 L 180,420 Q 165,413 150,400 Z"
                    fill="none"
                    stroke="url(#humanGradient)"
                    strokeWidth="2.5"
                    opacity="0.9"
                  />

                  {[
                    'M 180,240 L 180,290',
                    'M 200,240 L 205,290',
                    'M 228,245 L 230,295',
                    'M 255,260 L 255,320',
                  ].map((d, i) => (
                    <path key={`finger-${i}`} d={d} stroke="url(#humanGradient)" strokeWidth="2" opacity="0.7" fill="none" />
                  ))}

                  {[
                    [160, 300], [170, 270], [180, 250], [200, 300], [210, 280],
                    [230, 310], [240, 290], [255, 330], [220, 360], [200, 380],
                    [180, 400], [240, 380]
                  ].map((pos, i) => (
                    <g key={`node-${i}`}>
                      <circle cx={pos[0]} cy={pos[1]} r="3" fill="#06b6d4" opacity="0.8">
                        <animate
                          attributeName="opacity"
                          values="0.4;1;0.4"
                          dur={`${2 + (i % 3)}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx={pos[0]} cy={pos[1]} r="6" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.4" />
                    </g>
                  ))}

                  {[
                    'M 160,300 L 170,270 L 180,250',
                    'M 200,300 L 210,280 L 200,240',
                    'M 230,310 L 240,290 L 228,245',
                    'M 255,330 L 255,320',
                    'M 220,360 L 200,380 L 180,400',
                  ].map((d, i) => (
                    <path
                      key={`circuit-${i}`}
                      d={d}
                      stroke="#06b6d4"
                      strokeWidth="1"
                      opacity="0.5"
                      fill="none"
                      strokeDasharray="3,3"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="12"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </path>
                  ))}
                </g>

                <g id="robotHand" filter="url(#glow)">
                  <path
                    d="M 650,400 Q 670,350 660,300 L 640,250 Q 635,230 625,240 L 620,290 Q 618,250 610,240 Q 605,235 600,245 L 595,290 Q 592,250 582,245 Q 577,242 572,250 L 570,295 Q 565,260 555,255 Q 550,253 545,265 L 545,320 Q 542,360 530,390 L 510,420 Q 505,430 515,435 L 540,440 Q 560,442 580,435 L 620,420 Q 635,413 650,400 Z"
                    fill="none"
                    stroke="url(#robotGradient)"
                    strokeWidth="3"
                    opacity="0.9"
                  />

                  {[
                    { cx: 580, cy: 290, r: 25, innerR: 15 },
                    { cx: 540, cy: 340, r: 30, innerR: 18 },
                    { cx: 600, cy: 360, r: 22, innerR: 13 },
                    { cx: 570, cy: 400, r: 18, innerR: 10 },
                    { cx: 620, cy: 320, r: 20, innerR: 12 },
                  ].map((gear, i) => (
                    <g key={`gear-${i}`}>
                      <circle
                        cx={gear.cx}
                        cy={gear.cy}
                        r={gear.r}
                        fill="none"
                        stroke="url(#robotGradient)"
                        strokeWidth="2.5"
                        opacity="0.8"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from={`0 ${gear.cx} ${gear.cy}`}
                          to={`${i % 2 === 0 ? 360 : -360} ${gear.cx} ${gear.cy}`}
                          dur={`${8 + i * 2}s`}
                          repeatCount="indefinite"
                        />
                      </circle>

                      {Array.from({ length: 8 }).map((_, j) => {
                        const angle = (j * 45 * Math.PI) / 180;
                        const x1 = gear.cx + Math.cos(angle) * gear.innerR;
                        const y1 = gear.cy + Math.sin(angle) * gear.innerR;
                        const x2 = gear.cx + Math.cos(angle) * gear.r;
                        const y2 = gear.cy + Math.sin(angle) * gear.r;
                        return (
                          <line
                            key={`tooth-${j}`}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="url(#robotGradient)"
                            strokeWidth="2"
                            opacity="0.7"
                          >
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              from={`0 ${gear.cx} ${gear.cy}`}
                              to={`${i % 2 === 0 ? 360 : -360} ${gear.cx} ${gear.cy}`}
                              dur={`${8 + i * 2}s`}
                              repeatCount="indefinite"
                            />
                          </line>
                        );
                      })}

                      <circle
                        cx={gear.cx}
                        cy={gear.cy}
                        r={gear.innerR}
                        fill="none"
                        stroke="url(#robotGradient)"
                        strokeWidth="1.5"
                        opacity="0.6"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from={`0 ${gear.cx} ${gear.cy}`}
                          to={`${i % 2 === 0 ? 360 : -360} ${gear.cx} ${gear.cy}`}
                          dur={`${8 + i * 2}s`}
                          repeatCount="indefinite"
                        />
                      </circle>

                      <circle cx={gear.cx} cy={gear.cy} r="4" fill="#a855f7" opacity="0.8" />
                    </g>
                  ))}

                  {[
                    'M 580,290 L 540,340',
                    'M 540,340 L 570,400',
                    'M 600,360 L 580,290',
                    'M 620,320 L 600,360',
                  ].map((d, i) => (
                    <path
                      key={`robot-circuit-${i}`}
                      d={d}
                      stroke="#a855f7"
                      strokeWidth="1.5"
                      opacity="0.4"
                      fill="none"
                    />
                  ))}
                </g>

                <g id="connectionPoint" filter="url(#strongGlow)">
                  <circle cx="400" cy="350" r="40" fill="url(#glowGradient)" opacity="0.3">
                    <animate attributeName="r" values="40;50;40" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>

                  <circle cx="400" cy="350" r="20" fill="url(#glowGradient)" opacity="0.6">
                    <animate attributeName="r" values="20;25;20" dur="1.5s" repeatCount="indefinite" />
                  </circle>

                  <circle cx="400" cy="350" r="8" fill="#ffffff" opacity="1">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" repeatCount="indefinite" />
                  </circle>

                  <line x1="290" y1="350" x2="380" y2="350" stroke="#06b6d4" strokeWidth="3" opacity="0.8">
                    <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
                  </line>

                  <line x1="420" y1="350" x2="510" y2="350" stroke="#a855f7" strokeWidth="3" opacity="0.8">
                    <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
                  </line>

                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <line
                      key={`ray-${i}`}
                      x1="400"
                      y1="350"
                      x2={400 + Math.cos((angle * Math.PI) / 180) * 60}
                      y2={350 + Math.sin((angle * Math.PI) / 180) * 60}
                      stroke="#ffffff"
                      strokeWidth="1"
                      opacity="0.3"
                    >
                      <animate
                        attributeName="opacity"
                        values="0;0.6;0"
                        dur="3s"
                        begin={`${i * 0.2}s`}
                        repeatCount="indefinite"
                      />
                    </line>
                  ))}
                </g>
              </svg>
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
