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
            className="mt-8 md:hidden relative mx-auto w-full max-w-md overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-[16/10] w-full">
              <svg
                viewBox="0 0 1000 625"
                className="w-full h-full relative z-10"
                xmlns="http://www.w3.org/2000/svg"
                style={{ willChange: 'transform' }}
              >
                <defs>
                  {/* Complex Background Gradients */}
                  <radialGradient id="deepSpaceGradient" cx="50%" cy="50%">
                    <stop offset="0%" style={{ stopColor: '#1e1b4b', stopOpacity: 1 }} />
                    <stop offset="40%" style={{ stopColor: '#312e81', stopOpacity: 1 }} />
                    <stop offset="70%" style={{ stopColor: '#1e1b4b', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#0f0a1f', stopOpacity: 1 }} />
                  </radialGradient>

                  <linearGradient id="cosmicDust" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#4c1d95', stopOpacity: 0.3 }} />
                    <stop offset="50%" style={{ stopColor: '#5b21b6', stopOpacity: 0.15 }} />
                    <stop offset="100%" style={{ stopColor: '#1e1b4b', stopOpacity: 0.3 }} />
                  </linearGradient>

                  {/* Hand Gradients */}
                  <linearGradient id="handPurpleBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                  </linearGradient>

                  <linearGradient id="handCyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
                  </linearGradient>

                  {/* Brain Gear Gradients */}
                  <linearGradient id="brainGearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                    <stop offset="25%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                    <stop offset="75%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#d946ef', stopOpacity: 1 }} />
                  </linearGradient>

                  <linearGradient id="circuitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.8 }} />
                  </linearGradient>

                  {/* Touch Point Radial Gradient */}
                  <radialGradient id="touchPointGradient">
                    <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                    <stop offset="30%" style={{ stopColor: '#e0e7ff', stopOpacity: 0.9 }} />
                    <stop offset="60%" style={{ stopColor: '#a855f7', stopOpacity: 0.6 }} />
                    <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0 }} />
                  </radialGradient>

                  <radialGradient id="purpleAmbient">
                    <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 0.4 }} />
                    <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.2 }} />
                    <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 0 }} />
                  </radialGradient>

                  {/* Advanced Filters */}
                  <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>

                  <filter id="mediumGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>

                  <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>

                  <filter id="cinematicBloom" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="blur"/>
                    <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.5 0" result="brightBlur"/>
                    <feMerge>
                      <feMergeNode in="brightBlur"/>
                      <feMergeNode in="brightBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Deep Space Background */}
                <rect width="1000" height="625" fill="url(#deepSpaceGradient)" />

                {/* Cosmic Dust Layer */}
                <rect width="1000" height="625" fill="url(#cosmicDust)" opacity="0.6" />

                {/* Star Particles - Multiple Layers for Depth */}
                {Array.from({ length: 120 }).map((_, i) => {
                  const x = Math.random() * 1000;
                  const y = Math.random() * 625;
                  const size = Math.random() * 2 + 0.3;
                  const layer = i % 3;
                  const opacity = layer === 0 ? 0.3 : layer === 1 ? 0.5 : 0.8;
                  const duration = 2 + Math.random() * 4;

                  return (
                    <circle
                      key={`star-${i}`}
                      cx={x}
                      cy={y}
                      r={size}
                      fill="#ffffff"
                      opacity={opacity}
                    >
                      <animate
                        attributeName="opacity"
                        values={`${opacity * 0.3};${opacity};${opacity * 0.3}`}
                        dur={`${duration}s`}
                        repeatCount="indefinite"
                        begin={`${Math.random() * 2}s`}
                      />
                    </circle>
                  );
                })}

                {/* Subtle Depth Radial Overlays */}
                <circle cx="500" cy="312" r="400" fill="url(#purpleAmbient)" opacity="0.15" />

                {/* LEFT SIDE - Holographic Hand */}
                <g id="holoHand" filter="url(#mediumGlow)">
                  {/* Hand Palm Base */}
                  <path
                    d="M 120,420 Q 110,400 115,370 L 125,340 Q 128,320 135,325 L 140,360 Q 142,350 145,345"
                    fill="none"
                    stroke="url(#handPurpleBlue)"
                    strokeWidth="2"
                    opacity="0.3"
                  />

                  {/* Index Finger - Extended Toward Brain */}
                  <path
                    d="M 160,280 L 165,260 L 172,245 L 180,235 Q 185,230 190,230 Q 198,230 215,235 L 250,245 L 300,260 L 380,285"
                    fill="none"
                    stroke="url(#handPurpleBlue)"
                    strokeWidth="3.5"
                    opacity="0.85"
                    strokeLinecap="round"
                  />

                  {/* Index Finger Inner Structure */}
                  <path
                    d="M 160,280 L 165,260 L 172,245 L 180,235 Q 185,230 190,230 Q 198,230 215,235 L 250,245 L 300,260 L 380,285"
                    fill="none"
                    stroke="url(#handCyanGlow)"
                    strokeWidth="1.5"
                    opacity="0.6"
                    strokeLinecap="round"
                  />

                  {/* Other Fingers - Slightly Curled */}
                  <path
                    d="M 155,295 Q 150,270 145,250 L 140,225 Q 138,210 145,215 L 150,240"
                    fill="none"
                    stroke="url(#handPurpleBlue)"
                    strokeWidth="2.5"
                    opacity="0.7"
                  />

                  <path
                    d="M 150,310 Q 142,285 135,265 L 128,240 Q 125,225 132,228 L 138,250"
                    fill="none"
                    stroke="url(#handPurpleBlue)"
                    strokeWidth="2.5"
                    opacity="0.65"
                  />

                  <path
                    d="M 145,325 Q 135,300 128,280 L 120,255 Q 118,240 125,243 L 130,265"
                    fill="none"
                    stroke="url(#handPurpleBlue)"
                    strokeWidth="2.5"
                    opacity="0.6"
                  />

                  {/* Thumb */}
                  <path
                    d="M 135,340 Q 125,350 115,365 L 105,385 Q 100,395 105,400 L 115,405"
                    fill="none"
                    stroke="url(#handPurpleBlue)"
                    strokeWidth="2.5"
                    opacity="0.7"
                  />

                  {/* Wrist Connection */}
                  <path
                    d="M 115,370 Q 105,385 100,405 L 95,430"
                    fill="none"
                    stroke="url(#handPurpleBlue)"
                    strokeWidth="3"
                    opacity="0.5"
                  />

                  {/* Circuit Nodes Along Hand */}
                  {[
                    [160, 280], [180, 250], [215, 235], [250, 245], [300, 260], [350, 275],
                    [145, 250], [135, 265], [128, 280],
                    [125, 340], [115, 365], [105, 385]
                  ].map((pos, i) => (
                    <g key={`hand-node-${i}`}>
                      <circle cx={pos[0]} cy={pos[1]} r="3.5" fill="#06b6d4" opacity="0.9">
                        <animate
                          attributeName="opacity"
                          values="0.4;1;0.4"
                          dur={`${2 + (i % 4) * 0.5}s`}
                          repeatCount="indefinite"
                          begin={`${i * 0.1}s`}
                        />
                      </circle>
                      <circle cx={pos[0]} cy={pos[1]} r="7" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.3" />
                    </g>
                  ))}

                  {/* Energy Flow Paths */}
                  {[
                    'M 160,280 L 180,250 L 215,235',
                    'M 215,235 L 250,245 L 300,260',
                    'M 145,250 L 135,265 L 128,280',
                    'M 125,340 L 115,365 L 105,385'
                  ].map((d, i) => (
                    <path
                      key={`energy-${i}`}
                      d={d}
                      stroke="url(#handCyanGlow)"
                      strokeWidth="1.5"
                      opacity="0.5"
                      fill="none"
                      strokeDasharray="4,6"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="20"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </path>
                  ))}

                  {/* Neon Edge Highlights */}
                  <path
                    d="M 160,280 L 165,260 L 172,245 L 180,235 Q 185,230 190,230 Q 198,230 215,235 L 250,245 L 300,260 L 380,285"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    opacity="0.8"
                    strokeLinecap="round"
                  />
                </g>

                {/* RIGHT SIDE - AI Brain with Gears and Circuits */}
                <g id="aiBrain" filter="url(#mediumGlow)">
                  {/* Brain Outline Silhouette */}
                  <path
                    d="M 620,200 Q 680,195 720,220 Q 750,240 760,275 Q 765,310 755,340 Q 745,365 720,380 Q 685,400 650,395 Q 620,392 600,375 Q 580,355 575,330 Q 570,300 580,270 Q 590,240 605,220 Q 610,210 620,200 Z"
                    fill="none"
                    stroke="url(#brainGearGradient)"
                    strokeWidth="2.5"
                    opacity="0.7"
                  />

                  {/* Luminous Circuit Trace Around Brain */}
                  <path
                    d="M 620,200 Q 680,195 720,220 Q 750,240 760,275 Q 765,310 755,340 Q 745,365 720,380 Q 685,400 650,395 Q 620,392 600,375 Q 580,355 575,330 Q 570,300 580,270 Q 590,240 605,220 Q 610,210 620,200 Z"
                    fill="none"
                    stroke="url(#circuitGlow)"
                    strokeWidth="1"
                    opacity="0.9"
                    filter="url(#softGlow)"
                  />

                  {/* Large Central Gear */}
                  {(() => {
                    const gear = { cx: 665, cy: 290, r: 45, innerR: 28, teeth: 12 };
                    return (
                      <g>
                        <circle
                          cx={gear.cx}
                          cy={gear.cy}
                          r={gear.r}
                          fill="none"
                          stroke="url(#brainGearGradient)"
                          strokeWidth="3"
                          opacity="0.85"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from={`0 ${gear.cx} ${gear.cy}`}
                            to={`360 ${gear.cx} ${gear.cy}`}
                            dur="20s"
                            repeatCount="indefinite"
                          />
                        </circle>

                        {Array.from({ length: gear.teeth }).map((_, j) => {
                          const angle = (j * (360 / gear.teeth) * Math.PI) / 180;
                          const x1 = gear.cx + Math.cos(angle) * gear.innerR;
                          const y1 = gear.cy + Math.sin(angle) * gear.innerR;
                          const x2 = gear.cx + Math.cos(angle) * gear.r;
                          const y2 = gear.cy + Math.sin(angle) * gear.r;
                          return (
                            <line
                              key={`central-tooth-${j}`}
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke="url(#brainGearGradient)"
                              strokeWidth="2.5"
                              opacity="0.8"
                            >
                              <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from={`0 ${gear.cx} ${gear.cy}`}
                                to={`360 ${gear.cx} ${gear.cy}`}
                                dur="20s"
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
                          stroke="url(#brainGearGradient)"
                          strokeWidth="2"
                          opacity="0.7"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from={`0 ${gear.cx} ${gear.cy}`}
                            to={`360 ${gear.cx} ${gear.cy}`}
                            dur="20s"
                            repeatCount="indefinite"
                          />
                        </circle>

                        <circle cx={gear.cx} cy={gear.cy} r="6" fill="#06b6d4" opacity="0.9" />
                      </g>
                    );
                  })()}

                  {/* Additional Gears - Various Sizes */}
                  {[
                    { cx: 620, cy: 245, r: 32, innerR: 20, teeth: 10, dir: -1, dur: 15 },
                    { cx: 710, cy: 250, r: 28, innerR: 18, teeth: 8, dir: 1, dur: 18 },
                    { cx: 640, cy: 340, r: 35, innerR: 22, teeth: 10, dir: 1, dur: 16 },
                    { cx: 705, cy: 325, r: 25, innerR: 16, teeth: 8, dir: -1, dur: 14 },
                    { cx: 595, cy: 300, r: 22, innerR: 14, teeth: 8, dir: 1, dur: 17 },
                    { cx: 735, cy: 285, r: 20, innerR: 12, teeth: 8, dir: -1, dur: 13 }
                  ].map((gear, i) => (
                    <g key={`gear-${i}`}>
                      <circle
                        cx={gear.cx}
                        cy={gear.cy}
                        r={gear.r}
                        fill="none"
                        stroke="url(#brainGearGradient)"
                        strokeWidth="2.5"
                        opacity="0.8"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from={`0 ${gear.cx} ${gear.cy}`}
                          to={`${gear.dir * 360} ${gear.cx} ${gear.cy}`}
                          dur={`${gear.dur}s`}
                          repeatCount="indefinite"
                        />
                      </circle>

                      {Array.from({ length: gear.teeth }).map((_, j) => {
                        const angle = (j * (360 / gear.teeth) * Math.PI) / 180;
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
                            stroke="url(#brainGearGradient)"
                            strokeWidth="2"
                            opacity="0.75"
                          >
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              from={`0 ${gear.cx} ${gear.cy}`}
                              to={`${gear.dir * 360} ${gear.cx} ${gear.cy}`}
                              dur={`${gear.dur}s`}
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
                        stroke="url(#brainGearGradient)"
                        strokeWidth="1.5"
                        opacity="0.6"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from={`0 ${gear.cx} ${gear.cy}`}
                          to={`${gear.dir * 360} ${gear.cx} ${gear.cy}`}
                          dur={`${gear.dur}s`}
                          repeatCount="indefinite"
                        />
                      </circle>

                      <circle cx={gear.cx} cy={gear.cy} r="4" fill="#8b5cf6" opacity="0.85" />
                    </g>
                  ))}

                  {/* Circuit Board Patterns Between Gears */}
                  {[
                    'M 620,245 L 665,290',
                    'M 710,250 L 665,290',
                    'M 640,340 L 665,290',
                    'M 705,325 L 665,290',
                    'M 595,300 L 620,245',
                    'M 735,285 L 710,250',
                    'M 640,340 L 705,325'
                  ].map((d, i) => (
                    <path
                      key={`circuit-connect-${i}`}
                      d={d}
                      stroke="url(#circuitGlow)"
                      strokeWidth="2"
                      opacity="0.5"
                      fill="none"
                    />
                  ))}

                  {/* Microchip Details */}
                  {[
                    [600, 270], [630, 220], [650, 360], [690, 240], [720, 305], [740, 270]
                  ].map((pos, i) => (
                    <g key={`chip-${i}`}>
                      <rect
                        x={pos[0] - 6}
                        y={pos[1] - 6}
                        width="12"
                        height="12"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="1"
                        opacity="0.7"
                      />
                      <circle cx={pos[0]} cy={pos[1]} r="2.5" fill="#d946ef" opacity="0.9">
                        <animate
                          attributeName="opacity"
                          values="0.5;1;0.5"
                          dur={`${1.5 + (i % 3) * 0.5}s`}
                          repeatCount="indefinite"
                          begin={`${i * 0.15}s`}
                        />
                      </circle>
                    </g>
                  ))}

                  {/* Floating Brain Motion */}
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0,0; 0,-8; 0,0"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </g>

                {/* Neural Fiber Strands Below Brain */}
                <g id="neuralStrands" filter="url(#softGlow)">
                  {[
                    { x: 650, length: 60, offset: 0, color: '#8b5cf6' },
                    { x: 665, length: 75, offset: 0.2, color: '#a855f7' },
                    { x: 680, length: 55, offset: 0.4, color: '#06b6d4' },
                    { x: 695, length: 68, offset: 0.1, color: '#8b5cf6' },
                    { x: 710, length: 50, offset: 0.3, color: '#0ea5e9' },
                    { x: 635, length: 62, offset: 0.5, color: '#a855f7' },
                    { x: 725, length: 58, offset: 0.25, color: '#06b6d4' },
                    { x: 620, length: 48, offset: 0.35, color: '#8b5cf6' }
                  ].map((strand, i) => (
                    <g key={`strand-${i}`}>
                      <path
                        d={`M ${strand.x},400 Q ${strand.x + (i % 2 === 0 ? 10 : -10)},${400 + strand.length * 0.5} ${strand.x + (i % 2 === 0 ? 5 : -5)},${400 + strand.length}`}
                        fill="none"
                        stroke={strand.color}
                        strokeWidth="2"
                        opacity="0.6"
                        strokeLinecap="round"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.4;0.7;0.4"
                          dur={`${3 + i * 0.3}s`}
                          repeatCount="indefinite"
                          begin={`${strand.offset}s`}
                        />
                      </path>
                      <circle
                        cx={strand.x}
                        cy={400 + strand.length}
                        r="2"
                        fill={strand.color}
                        opacity="0.8"
                      />
                    </g>
                  ))}

                  {/* Purple Ambient Glow Below Brain */}
                  <ellipse
                    cx="665"
                    cy="470"
                    rx="80"
                    ry="20"
                    fill="url(#purpleAmbient)"
                    opacity="0.6"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.4;0.7;0.4"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </ellipse>
                </g>

                {/* Subtle UI Elements */}
                <g id="uiElements" opacity="0.25">
                  {/* Data Panel 1 */}
                  <rect x="550" y="480" width="60" height="30" fill="none" stroke="#06b6d4" strokeWidth="1" rx="2" />
                  <line x1="555" y1="488" x2="580" y2="488" stroke="#06b6d4" strokeWidth="0.5" opacity="0.6" />
                  <line x1="555" y1="494" x2="605" y2="494" stroke="#06b6d4" strokeWidth="0.5" opacity="0.6" />
                  <line x1="555" y1="500" x2="590" y2="500" stroke="#06b6d4" strokeWidth="0.5" opacity="0.6" />

                  {/* Data Panel 2 */}
                  <rect x="720" y="470" width="70" height="35" fill="none" stroke="#8b5cf6" strokeWidth="1" rx="2" />
                  <circle cx="728" cy="480" r="2" fill="#a855f7" opacity="0.8" />
                  <line x1="735" y1="480" x2="785" y2="480" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.6" />
                  <line x1="735" y1="487" x2="775" y2="487" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.6" />
                  <line x1="735" y1="494" x2="780" y2="494" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.6" />

                  {/* Holographic Indicators */}
                  <circle cx="620" cy="520" r="3" fill="none" stroke="#06b6d4" strokeWidth="1" />
                  <circle cx="740" cy="530" r="3" fill="none" stroke="#a855f7" strokeWidth="1" />
                </g>

                {/* TOUCH POINT - Radiant Connection */}
                <g id="touchPoint" filter="url(#cinematicBloom)">
                  {/* Outer Glow Rings */}
                  <circle cx="480" cy="285" r="80" fill="url(#touchPointGradient)" opacity="0.2">
                    <animate attributeName="r" values="80;95;80" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2.5s" repeatCount="indefinite" />
                  </circle>

                  <circle cx="480" cy="285" r="55" fill="url(#touchPointGradient)" opacity="0.3">
                    <animate attributeName="r" values="55;65;55" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.25;0.45;0.25" dur="2s" repeatCount="indefinite" />
                  </circle>

                  <circle cx="480" cy="285" r="30" fill="url(#touchPointGradient)" opacity="0.5">
                    <animate attributeName="r" values="30;38;30" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.6;0.4" dur="1.5s" repeatCount="indefinite" />
                  </circle>

                  {/* Bright Core */}
                  <circle cx="480" cy="285" r="15" fill="#ffffff" opacity="0.9">
                    <animate attributeName="r" values="15;18;15" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" repeatCount="indefinite" />
                  </circle>

                  <circle cx="480" cy="285" r="8" fill="#ffffff" opacity="1">
                    <animate attributeName="opacity" values="0.9;1;0.9" dur="0.8s" repeatCount="indefinite" />
                  </circle>

                  {/* Connection Lines to Hand and Brain */}
                  <line x1="380" y1="285" x2="450" y2="285" stroke="url(#handCyanGlow)" strokeWidth="4" opacity="0.8">
                    <animate attributeName="opacity" values="0.5;0.95;0.5" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
                  </line>

                  <line x1="510" y1="285" x2="590" y2="285" stroke="url(#brainGearGradient)" strokeWidth="4" opacity="0.8">
                    <animate attributeName="opacity" values="0.5;0.95;0.5" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
                  </line>

                  {/* Energy Particles Flowing */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <circle
                      key={`particle-left-${i}`}
                      r="2"
                      fill="#06b6d4"
                      opacity="0.9"
                    >
                      <animateMotion
                        path="M 380,285 L 450,285"
                        dur="1.5s"
                        repeatCount="indefinite"
                        begin={`${i * 0.2}s`}
                      />
                      <animate
                        attributeName="opacity"
                        values="0;1;0"
                        dur="1.5s"
                        repeatCount="indefinite"
                        begin={`${i * 0.2}s`}
                      />
                    </circle>
                  ))}

                  {Array.from({ length: 8 }).map((_, i) => (
                    <circle
                      key={`particle-right-${i}`}
                      r="2"
                      fill="#a855f7"
                      opacity="0.9"
                    >
                      <animateMotion
                        path="M 510,285 L 590,285"
                        dur="1.5s"
                        repeatCount="indefinite"
                        begin={`${i * 0.2}s`}
                      />
                      <animate
                        attributeName="opacity"
                        values="0;1;0"
                        dur="1.5s"
                        repeatCount="indefinite"
                        begin={`${i * 0.2}s`}
                      />
                    </circle>
                  ))}

                  {/* Radial Burst Rays */}
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
                    <line
                      key={`ray-${i}`}
                      x1="480"
                      y1="285"
                      x2={480 + Math.cos((angle * Math.PI) / 180) * 70}
                      y2={285 + Math.sin((angle * Math.PI) / 180) * 70}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      opacity="0.3"
                    >
                      <animate
                        attributeName="opacity"
                        values="0;0.7;0"
                        dur="3s"
                        begin={`${i * 0.15}s`}
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
