import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const KeyboardNavigationGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShownGuide, setHasShownGuide] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // Determine if the device is desktop based on screen width (using Tailwind's 'lg' breakpoint)
    const isDesktop = window.innerWidth >= 1024;

    // Show guide on first visit if user hasn't seen it
    const hasSeenGuide = localStorage.getItem('keyboard-guide-seen');
    if (!hasSeenGuide && !hasShownGuide && isDesktop) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasShownGuide(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasShownGuide]);

  const closeGuide = () => {
    setIsOpen(false);
    localStorage.setItem('keyboard-guide-seen', 'true');
  };

  const keyboardShortcuts = [
    {
      keys: ['Tab'],
      description: 'Navigate between interactive elements'
    },
    {
      keys: ['Shift', 'Tab'],
      description: 'Navigate backwards through elements'
    },
    {
      keys: ['Enter', 'Space'],
      description: 'Activate buttons and links'
    },
    {
      keys: ['↑', '↓'],
      description: 'Navigate dropdown menus'
    },
    {
      keys: ['Escape'],
      description: 'Close modals and dropdowns'
    },
    {
      keys: ['←', '→'],
      description: 'Navigate carousels and pagination'
    }
  ];

  return (
    <>
      {/* Floating Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
        aria-label="Open keyboard navigation guide"
      >
        <Keyboard className="h-6 w-6 mx-auto" />
      </button>

      {/* Guide Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeGuide}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-8 max-w-lg w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Keyboard className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Keyboard Navigation
                  </h2>
                </div>
                <button
                  onClick={closeGuide}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
                  aria-label="Close guide"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <p className="text-gray-300 mb-6">
                Navigate our website efficiently using these keyboard shortcuts:
              </p>

              <div className="space-y-4">
                {keyboardShortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-2">
                      {shortcut.keys.map((key, keyIndex) => (
                        <React.Fragment key={keyIndex}>
                          <kbd className="px-2 py-1 bg-gray-700 text-white text-xs rounded border border-gray-600 font-mono">
                            {key === '↑' ? <ArrowUp className="h-3 w-3" /> :
                             key === '↓' ? <ArrowDown className="h-3 w-3" /> :
                             key === '←' ? <ArrowLeft className="h-3 w-3" /> :
                             key === '→' ? <ArrowRight className="h-3 w-3" /> :
                             key}
                          </kbd>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="text-gray-400 text-xs">+</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    <span className="text-gray-300 text-sm flex-1 ml-4">
                      {shortcut.description}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-gray-400 text-sm text-center">
                  Press <kbd className="px-1 py-0.5 bg-gray-700 text-white text-xs rounded">Tab</kbd> to start navigating
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default KeyboardNavigationGuide;