import React, { useEffect, useRef, useCallback } from 'react';
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
  const modalOverlayRef = useRef<HTMLDivElement>(null);

  useScrollLock(isOpen);
  useEscapeKey(onClose, isOpen);
  useSwipeToClose(onClose, isOpen, 100);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');

      if (modalBodyRef.current) {
        scrollToTop(modalBodyRef.current);

        const firstFocusable = modalBodyRef.current.parentElement?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
          requestAnimationFrame(() => {
            firstFocusable.focus();
          });
        }
      }
    }

    return () => {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={modalOverlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto overflow-x-hidden bg-black/80 backdrop-blur-sm"
          style={{
            paddingTop: 'clamp(1rem, 4vh, 3rem)',
            paddingBottom: 'clamp(1rem, 4vh, 3rem)',
            paddingLeft: 'max(1rem, env(safe-area-inset-left))',
            paddingRight: 'max(1rem, env(safe-area-inset-right))'
          }}
          onClick={handleOverlayClick}
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
            className={`relative w-full max-w-${maxWidth} flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-white/20 shadow-2xl my-auto`}
            style={{
              isolation: 'isolate',
              maxHeight: 'calc(100vh - 8vh)',
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="sticky top-0 z-20 px-6 sm:px-8 pt-6 pb-4 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-md border-b border-white/10 rounded-t-3xl flex items-center justify-between gap-4"
              style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)'
              }}
            >
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
                className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center hover:bg-red-600/30 border border-white/10 hover:border-red-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                style={{ minWidth: '44px', minHeight: '44px' }}
                aria-label="Close modal (Escape key)"
                type="button"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            <div
              ref={modalBodyRef}
              data-modal-body
              className="flex-1 overflow-y-auto overflow-x-hidden px-6 sm:px-8 py-6"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(168, 85, 247, 0.3) rgba(255, 255, 255, 0.05)',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain'
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
