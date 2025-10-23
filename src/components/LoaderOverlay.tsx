import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderOverlayProps {
  forceShow?: boolean;
  maxDurationMs?: number;
  onComplete?: () => void;
  navbarLogoRect?: DOMRect | null;
  navbarBrandNameRect?: DOMRect | null;
}

const LoaderOverlay: React.FC<LoaderOverlayProps> = ({
  forceShow = false,
  maxDurationMs = 2000,
  onComplete,
  navbarLogoRect,
  navbarBrandNameRect
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'loading' | 'transitioning' | 'complete'>('loading');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const brandNameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Check URL params for debug mode
    const urlParams = new URLSearchParams(window.location.search);
    const debugLoader = urlParams.get('debugLoader') === '1';
    
    // Check if loader should be shown
    const hasSeenLoader = localStorage.getItem('hasSeenBrandLoader');
    
    if (forceShow || debugLoader || hasSeenLoader !== '1') {
      setIsVisible(true);
      
      // Prevent body scroll during loader
      document.documentElement.style.overflow = 'hidden';
      
      // Animation timeline
      const timeline = [
        // Phase 1: Loading (0-1.6s)
        setTimeout(() => {
          if (navbarLogoRect && navbarBrandNameRect) {
            setAnimationPhase('transitioning');
          }
        }, prefersReducedMotion ? 200 : 1600),
        
        // Phase 2: Complete (2.0s or maxDurationMs)
        setTimeout(() => {
          setAnimationPhase('complete');
          setIsVisible(false);
          localStorage.setItem('hasSeenBrandLoader', '1');
          document.documentElement.style.overflow = '';
          onComplete?.();
        }, prefersReducedMotion ? 400 : maxDurationMs)
      ];

      return () => {
        timeline.forEach(timer => clearTimeout(timer));
        document.documentElement.style.overflow = '';
      };
    } else {
      // Skip loader if already seen
      onComplete?.();
    }
  }, [forceShow, maxDurationMs, navbarLogoRect, navbarBrandNameRect, onComplete, prefersReducedMotion]);

  const skipLoader = () => {
    setAnimationPhase('complete');
    setIsVisible(false);
    localStorage.setItem('hasSeenBrandLoader', '1');
    document.documentElement.style.overflow = '';
    onComplete?.();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] overflow-hidden"
        style={{ pointerEvents: animationPhase === 'complete' ? 'none' : 'auto' }}
        aria-hidden="true"
      >
        {/* Galaxy Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black">
          {/* Animated Haze Background */}
          <div className="absolute inset-0 animated-haze-bg opacity-40" />
          
          {/* Floating Particles */}
          {!prefersReducedMotion && (
            <>
              <div className="floating-particles opacity-60" />
              <div className="pulse-glow pulse-glow-1 opacity-30" />
              <div className="pulse-glow pulse-glow-2 opacity-30" />
            </>
          )}
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-purple-900/10" />
        </div>

        {/* Skip Link for Accessibility */}
        <button
          onClick={skipLoader}
          className="absolute top-8 right-8 text-white/60 hover:text-white text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black rounded-lg px-3 py-2 z-10"
          aria-label="Skip intro animation"
        >
          Skip Intro
        </button>

        {/* Logo Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            ref={logoRef}
            initial={{ 
              scale: 1,
              x: 0,
              y: 0
            }}
            animate={
              animationPhase === 'loading' 
                ? {
                    scale: prefersReducedMotion ? 1 : [1, 1.03, 1],
                    rotate: prefersReducedMotion ? 0 : [0, 360],
                  }
                : animationPhase === 'transitioning' && navbarLogoRect
                ? {
                    x: navbarLogoRect.left + navbarLogoRect.width / 2 - window.innerWidth / 2,
                    y: navbarLogoRect.top + navbarLogoRect.height / 2 - window.innerHeight / 2,
                    scale: navbarLogoRect.width / 80, // Scale to match navbar logo size
                  }
                : {}
            }
            transition={
              animationPhase === 'loading'
                ? {
                    scale: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 1.6, ease: "linear" }
                  }
                : {
                    duration: 0.25,
                    ease: [0.22, 1, 0.36, 1] // cubic-bezier out-expo
                  }
            }
            className="flex items-center space-x-4"
            data-shared="brandMark"
          >
            {/* Logo */}
            <div className="w-20 h-20 relative">
              <img
                src="/edited-photo.png"
                alt="SoleScope AI Owl Logo"
                className="w-full h-full object-contain filter drop-shadow-lg"
              />
            </div>

            {/* Brand Name - Appears during transition */}
            <motion.div
              ref={brandNameRef}
              initial={{ opacity: 0, x: -20 }}
              animate={
                animationPhase === 'transitioning'
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -20 }
              }
              transition={{ duration: 0.25, delay: 0.1 }}
              className="text-2xl font-bold text-white tracking-tight whitespace-nowrap"
              style={{ fontSize: 'clamp(18px, 3.2vw, 28px)' }}
            >
              SoleScope Studio & Design
            </motion.div>
          </motion.div>
        </div>

        {/* Loading Text */}
        {animationPhase === 'loading' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center"
          >
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={prefersReducedMotion ? {} : {
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                    className="w-2 h-2 bg-purple-400 rounded-full"
                  />
                ))}
              </div>
              <span className="text-white/80 text-sm font-medium">
                Loading your experience...
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default LoaderOverlay;