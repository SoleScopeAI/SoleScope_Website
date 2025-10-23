import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useFocusTrap, useScrollLock, useEscapeKey, useSwipeToClose, scrollToTop } from '../../utils/modalUtils';

interface BulletproofModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
  ariaLabel?: string;
}

const BulletproofModal: React.FC<BulletproofModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '6xl',
  ariaLabel
}) => {
  const focusTrapRef = useFocusTrap(isOpen);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  useScrollLock(isOpen);
  useEscapeKey(onClose, isOpen);
  useSwipeToClose(onClose, isOpen, 100);

  useEffect(() => {
    if (isOpen && modalBodyRef.current) {
      scrollToTop(modalBodyRef.current);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-label={ariaLabel || title}
        >
          <motion.div
            ref={focusTrapRef}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`relative w-full max-w-${maxWidth} max-h-[90vh] flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-white/20 shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
            style={{ isolation: 'isolate' }}
          >
            <div className="sticky top-0 z-20 px-6 sm:px-8 pt-6 pb-4 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm border-b border-white/10 rounded-t-3xl flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2
                  id="modal-title"
                  className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide truncate"
                >
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-sm text-slate-300 mt-1 truncate">{subtitle}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-red-600/30 border border-white/10 hover:border-red-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                aria-label="Close modal"
                type="button"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            <div
              ref={modalBodyRef}
              className="flex-1 overflow-y-auto px-6 sm:px-8 py-6"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(168, 85, 247, 0.3) rgba(255, 255, 255, 0.05)'
              }}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BulletproofModal;
