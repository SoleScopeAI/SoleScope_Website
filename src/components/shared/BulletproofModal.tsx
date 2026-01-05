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
  maxWidth = '4xl',
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
          className="fixed inset-0 z-[9000] bg-black/70 backdrop-blur-md"
          style={{
            isolation: 'isolate',
            overscrollBehavior: 'contain'
          }}
          onClick={handleOverlayClick}
        >
          <div className="fixed inset-0 z-[9100] flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto" style={{ overscrollBehavior: 'contain' }}>
            <motion.div
              ref={focusTrapRef}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`relative w-full max-w-${maxWidth} rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden`}
              style={{
                isolation: 'isolate',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                willChange: 'transform',
                contain: 'layout style paint'
              }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-label={ariaLabel || title}
            >
              <div
                className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/75 border-b border-white/10 px-5 py-3 flex items-center justify-between"
                style={{
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)'
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
                  className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 hover:bg-white/5 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  style={{ minWidth: '36px', minHeight: '36px' }}
                  aria-label="Close modal (Escape key)"
                  type="button"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>

              <div
                ref={modalBodyRef}
                data-modal-body
                className="flex-1 overflow-y-auto overflow-x-hidden px-6 sm:px-8 py-8"
                style={{
                  maxHeight: 'calc(90vh - 80px)',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(168, 85, 247, 0.4) rgba(255, 255, 255, 0.08)',
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain',
                  contain: 'layout style'
                }}
              >
                {children}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BulletproofModal;
