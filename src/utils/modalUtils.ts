import { useEffect, useCallback, useRef } from 'react';

export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    previousActiveElement.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    firstElement?.focus();

    document.addEventListener('keydown', handleTabKey);

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      previousActiveElement.current?.focus();
    };
  }, [isActive]);

  return containerRef;
};

export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPaddingRight = document.body.style.paddingRight;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.documentElement.style.overflow = 'hidden';

    const fixedElements = document.querySelectorAll<HTMLElement>('[data-fixed-element]');
    fixedElements.forEach(el => {
      el.style.paddingRight = `${scrollBarWidth}px`;
    });

    if (document.body.scrollHeight > window.innerHeight) {
      document.body.style.top = `-${originalScrollPosition}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.paddingRight = originalBodyPaddingRight;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      fixedElements.forEach(el => {
        el.style.paddingRight = '';
      });

      window.scrollTo(0, originalScrollPosition);
    };
  }, [isLocked]);
};

export const useEscapeKey = (callback: () => void, isActive: boolean) => {
  useEffect(() => {
    if (!isActive) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [callback, isActive]);
};

export const useSwipeToClose = (
  callback: () => void,
  isActive: boolean,
  threshold: number = 100
) => {
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const scrollTopAtStart = useRef<number>(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    const target = e.target as HTMLElement;
    const scrollableParent = target.closest('[data-modal-body]') as HTMLElement;
    scrollTopAtStart.current = scrollableParent?.scrollTop || 0;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const swipeDistance = touchEndY.current - touchStartY.current;
    if (swipeDistance > threshold && scrollTopAtStart.current === 0) {
      callback();
    }
  }, [callback, threshold]);

  useEffect(() => {
    if (!isActive) return;

    const options: AddEventListenerOptions = { passive: true };
    document.addEventListener('touchstart', handleTouchStart, options);
    document.addEventListener('touchmove', handleTouchMove, options);
    document.addEventListener('touchend', handleTouchEnd, options);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isActive, handleTouchStart, handleTouchMove, handleTouchEnd]);
};

export const clampProgress = (value: number): number => {
  return Math.max(0, Math.min(100, value));
};

export const scrollToTop = (element: HTMLElement | null) => {
  if (element) {
    requestAnimationFrame(() => {
      element.scrollTo({ top: 0, behavior: 'auto' });
    });
  }
};

export const preventBackgroundScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  const isModalContent = target.closest('[role="dialog"]');
  if (!isModalContent) {
    e.preventDefault();
  }
};
