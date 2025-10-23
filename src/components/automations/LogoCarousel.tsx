import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface LogoCarouselProps {
  items: string[];
}

const LogoCarousel: React.FC<LogoCarouselProps> = ({ items }) => {
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <section className="py-16 premium-bg border-y border-white/10">
      <div className="floating-particles"></div>
      <div className="pulse-glow pulse-glow-1"></div>
      <div className="pulse-glow pulse-glow-2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-semibold dark-text-primary mb-4">
            We integrate with your existing tools
          </h2>
          <p className="dark-text-body">
            Connect AI to the platforms you already use
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          {/* Fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--background)] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--background)] to-transparent z-10"></div>

          <motion.div
            ref={carouselRef}
            className="flex space-x-8"
            animate={{
              x: isPaused ? undefined : [0, -50 * items.length]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            {duplicatedItems.map((tool, index) => (
              <div
                key={`${tool}-${index}`}
                className="flex-shrink-0 px-6 py-3 dark-card rounded-lg hover:border-accent-primary transition-all duration-300 min-w-max"
                tabIndex={0}
                role="button"
                aria-label={`${tool} integration`}
              >
                <span className="dark-text-body font-medium text-sm whitespace-nowrap">
                  {tool}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;