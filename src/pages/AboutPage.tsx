import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Calendar,
  Mail,
  ChevronDown,
  ChevronUp,
  Brain,
  Lightbulb,
  Target,
  Users,
  Zap,
  Code,
  Settings,
  HeartHandshake,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import '../styles/about-galaxy.css';

const AboutPage = () => {
  const [insightExpanded, setInsightExpanded] = useState(false);
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);
  const [expandedSkill, setExpandedSkill] = useState<number | null>(null);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    document.title = 'About — SoleScope Studio & Design';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about Kevin Hannah, Chartered Manager and Founder of SoleScope Studio & Design — a boutique AI and web design studio helping real businesses streamline with modern technology.');
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'About — SoleScope Studio & Design');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Learn about Kevin Hannah, Chartered Manager and Founder of SoleScope Studio & Design — a boutique AI and web design studio helping real businesses streamline with modern technology.');
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200');
    }
  }, []);

  const pillars = [
    {
      icon: Brain,
      title: "Human-Led, Tech-Enhanced",
      preview: "Every project begins with understanding your business, not just your tools. We use AI where it makes the biggest difference — never where it complicates.",
      expanded: "Technology should amplify your strengths, not replace your judgment. We start every engagement by listening to how your business actually works — the workflows, the pain points, the goals that matter. Only then do we apply AI and automation strategically, ensuring each tool serves a clear purpose and genuinely makes your life easier."
    },
    {
      icon: Target,
      title: "Built for Real Businesses",
      preview: "We specialise in systems for small and growing companies. Our builds are practical, affordable, and focused on results — not vanity metrics.",
      expanded: "Sole traders and small teams don't need enterprise bloat or Silicon Valley buzzwords. You need websites that convert, systems that save time, and tech that actually gets used daily. We design for real-world constraints: limited budgets, lean teams, and the need for immediate, measurable impact."
    },
    {
      icon: Sparkles,
      title: "Precision by Design",
      preview: "From web layout to automation flow, every detail is intentional. The result is digital infrastructure that looks and feels seamless.",
      expanded: "Great design isn't just aesthetics — it's function made visible. Every button placement, every colour choice, every automation trigger is carefully considered to reduce friction and enhance clarity. We obsess over the details so your customers and team don't have to think twice about how things work."
    },
    {
      icon: HeartHandshake,
      title: "End-to-End Support",
      preview: "From planning to post-launch refinements, we help clients stay confident and self-sufficient as their tech evolves.",
      expanded: "Our relationship doesn't end at launch. We provide ongoing guidance, training, and refinement so you feel empowered to manage your systems. Whether it's tweaking an automation, updating content, or scaling for growth, we're here to support you — not create dependency."
    }
  ];

  const skills = [
    {
      icon: Brain,
      title: "AI & Automation Systems",
      description: "Workflow design, task routing, lead tracking, and CRM-lite automations using modern low-code tools.",
      examples: "Email inbox triage, booking reminders, review collection flows, lead qualification chatbots, customer follow-up sequences"
    },
    {
      icon: Code,
      title: "Web Design & Development",
      description: "Custom, responsive websites built for clarity, performance, and long-term maintainability.",
      examples: "Service-focused landing pages, portfolio sites, booking systems, content management, mobile-first design, SEO foundations"
    },
    {
      icon: Settings,
      title: "Operational Systems Thinking",
      description: "FMCG-derived process discipline applied to small business tech and design systems.",
      examples: "Business process mapping, workflow optimisation, efficiency audits, tech stack selection, handover documentation"
    },
    {
      icon: Zap,
      title: "Integration & Support",
      description: "From idea to ongoing iteration — practical, structured digital partnerships.",
      examples: "Platform integrations, API connections, ongoing maintenance, training sessions, iterative improvements"
    }
  ];

  const togglePillar = (index: number) => {
    setExpandedPillar(expandedPillar === index ? null : index);
  };

  const toggleSkill = (index: number) => {
    setExpandedSkill(expandedSkill === index ? null : index);
  };

  return (
    <main id="about" className="about-surface pt-24 pb-20">
      {/* Hero Section - Founder Introduction */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left: Portrait */}
            <div className="flex justify-center lg:justify-end">
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-80 h-80 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl relative">
                  <img
                    src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Kevin Hannah, CMgr - Founder of SoleScope Studio & Design"
                    className="w-full h-full object-cover"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <p className="text-white text-sm font-medium tracking-wide">
                      Founder, SoleScope Studio & Design
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 uppercase tracking-wide">
                  Kevin Hannah, CMgr
                </h1>
                <p className="text-xl text-white/80 mb-1">
                  Founder & Chartered Manager
                </p>
              </div>

              <div className="space-y-4 text-white/90 leading-relaxed text-lg">
                <p>
                  I'm a Chartered Manager (CMgr) with seven years of leadership experience in FMCG manufacturing, and I've founded and operated six small businesses. My work blends structured operational thinking with hands-on technical ability — specialising in AI application, automation, and web design for small to medium-sized businesses.
                </p>
                <p>
                  At SoleScope Studio & Design, I focus on building AI-ready systems and websites that look exceptional and perform reliably in real-world operations. Every solution is designed to save time, remove friction, and enhance clarity — so business owners can focus on what matters.
                </p>
              </div>

              {/* Credential Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['AI Solutions', 'Web Design', 'Automation & CRM-Lite', 'Chartered Manager', '7 Yrs FMCG', '6× Founder'].map((tag) => (
                  <span key={tag} className="credential-chip">
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="/contact"
                  className="about-btn-primary"
                  aria-label="Book a free 15-minute discovery call with Kevin Hannah"
                >
                  <Calendar className="h-5 w-5" />
                  Book a Free 15-Min Discovery Call
                </a>
                <a
                  href="mailto:contact@solescope.co.uk"
                  className="about-btn-secondary"
                  aria-label="Send an email to Kevin Hannah"
                >
                  <Mail className="h-5 w-5" />
                  Email Kevin
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expanded Founder Insight Card */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="about-refined-card cursor-pointer"
            onClick={() => setInsightExpanded(!insightExpanded)}
            role="button"
            aria-expanded={insightExpanded}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setInsightExpanded(!insightExpanded);
              }
            }}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <p className="text-white/90 leading-relaxed text-lg mb-4">
                  Behind SoleScope Studio & Design is a belief that modern technology should feel natural, not forced. I combine my background in business leadership with hands-on technical skills to create automation and design systems that feel effortless for clients.
                </p>

                <AnimatePresence>
                  {insightExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 text-white/80 leading-relaxed"
                    >
                      <p>
                        Before launching SoleScope Studio & Design, I spent several years leading teams and streamlining operations within the FMCG sector — learning the value of simplicity, process, and consistency. Alongside that, I built and ran multiple small ventures, gaining firsthand experience of what owners actually need from technology.
                      </p>
                      <p>
                        That's what drives SoleScope's philosophy: clarity over complexity. We don't chase buzzwords; we focus on solutions that make measurable improvements to time, workflow, and experience. Whether it's a custom website, automated CRM flow, or AI-powered service system, everything is built with the end-user in mind.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                className="flex-shrink-0 p-2 hover:bg-white/5 rounded-full transition-colors"
                aria-label={insightExpanded ? "Collapse insight" : "Expand insight"}
              >
                {insightExpanded ? (
                  <ChevronUp className="h-6 w-6 text-white" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-white" />
                )}
              </button>
            </div>

            <div className="mt-4 text-center">
              <span className="text-sm text-white/60 uppercase tracking-wide">
                {insightExpanded ? 'Collapse' : 'Read More'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillar Section - What Defines the Studio */}
      <section className="about-cards-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
              What Defines the Studio
            </h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Our approach combines deep operational experience with modern technical capability
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="about-refined-card cursor-pointer"
                onClick={() => togglePillar(index)}
                role="button"
                aria-expanded={expandedPillar === index}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    togglePillar(index);
                  }
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/30 to-purple-800/30 border border-purple-500/30 flex items-center justify-center">
                    <pillar.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 uppercase tracking-wide">
                      {pillar.title}
                    </h3>
                  </div>
                  <button
                    className="flex-shrink-0 p-2 hover:bg-white/5 rounded-full transition-colors"
                    aria-label={expandedPillar === index ? "Collapse" : "Expand"}
                  >
                    {expandedPillar === index ? (
                      <ChevronUp className="h-5 w-5 text-white" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-white" />
                    )}
                  </button>
                </div>

                <p className="text-white/80 leading-relaxed">
                  {pillar.preview}
                </p>

                <AnimatePresence>
                  {expandedPillar === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-white/10"
                    >
                      <p className="text-white/70 leading-relaxed">
                        {pillar.expanded}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Skills in Action Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
              Skills in Action
            </h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Expertise applied to real-world business challenges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="about-refined-card cursor-pointer group"
                onClick={() => toggleSkill(index)}
                role="button"
                aria-expanded={expandedSkill === index}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSkill(index);
                  }
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/40 to-purple-900/40 border-2 border-purple-500/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <skill.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 uppercase tracking-wide">
                      {skill.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed text-sm">
                      {skill.description}
                    </p>
                  </div>
                  <button
                    className="flex-shrink-0 p-2 hover:bg-white/5 rounded-full transition-colors"
                    aria-label={expandedSkill === index ? "Collapse examples" : "Show examples"}
                  >
                    {expandedSkill === index ? (
                      <ChevronUp className="h-5 w-5 text-white" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-white" />
                    )}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedSkill === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-white/10"
                    >
                      <p className="text-sm text-white/60 uppercase tracking-wide mb-2">
                        Use Cases
                      </p>
                      <p className="text-white/70 leading-relaxed text-sm">
                        {skill.examples}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-refined-card text-center p-12 md:p-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-600/30 to-purple-900/30 border-2 border-purple-500/40 flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-white" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight uppercase tracking-wide">
              Let's design technology that works as hard as you do.
            </h2>

            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Book a 15-minute chat to explore how modern automation and design can help your business run smoother.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="about-btn-primary"
              >
                <Calendar className="h-5 w-5" />
                Start a Project
              </a>
              <a
                href="mailto:contact@solescope.co.uk"
                className="about-btn-secondary"
              >
                <Mail className="h-5 w-5" />
                Ask a Question
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
