import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  mobileOnly?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = false,
  mobileOnly = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`collapsible-section ${mobileOnly ? 'md:!block' : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`collapsible-trigger ${mobileOnly ? 'md:hidden' : ''} mobile-touch-target`}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-white text-sm uppercase tracking-wide">
          {title}
        </span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-white flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-white flex-shrink-0" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {(isOpen || !mobileOnly) && (
          <motion.div
            initial={mobileOnly ? { height: 0, opacity: 0 } : false}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`collapsible-content ${mobileOnly ? 'md:!block md:!opacity-100' : ''}`}
          >
            <div className="collapsible-inner">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {mobileOnly && (
        <div className="hidden md:block">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;
