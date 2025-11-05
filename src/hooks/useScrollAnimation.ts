'use client';

import { useEffect, useRef, useState } from 'react';

export const ANIMATIONS = {
  FADE_IN_UP: 'FADE_IN_UP',
  FADE_IN_DOWN: 'FADE_IN_DOWN',
  FADE_IN_LEFT: 'FADE_IN_LEFT',
  FADE_IN_RIGHT: 'FADE_IN_RIGHT',
  ZOOM_IN: 'ZOOM_IN',
  SCALE_UP: 'SCALE_UP',
} as const;

export type AnimationType = keyof typeof ANIMATIONS;

export const ANIMATE_STYLES: Record<AnimationType, { hide: React.CSSProperties; show: React.CSSProperties }> = {
  FADE_IN_UP: {
    hide: {
      opacity: 0,
      transform: 'translateY(50px) scale(0.95)',
    },
    show: {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
    },
  },
  FADE_IN_DOWN: {
    hide: {
      opacity: 0,
      transform: 'translateY(-50px) scale(0.95)',
    },
    show: {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
    },
  },
  FADE_IN_LEFT: {
    hide: {
      opacity: 0,
      transform: 'translateX(-50px) scale(0.95)',
    },
    show: {
      opacity: 1,
      transform: 'translateX(0) scale(1)',
    },
  },
  FADE_IN_RIGHT: {
    hide: {
      opacity: 0,
      transform: 'translateX(50px) scale(0.95)',
    },
    show: {
      opacity: 1,
      transform: 'translateX(0) scale(1)',
    },
  },
  ZOOM_IN: {
    hide: {
      opacity: 0,
      transform: 'scale(0.5)',
    },
    show: {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
  SCALE_UP: {
    hide: {
      opacity: 0,
      transform: 'scale(0.8)',
    },
    show: {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
};

interface UseScrollAnimationOptions {
  animationName?: AnimationType;
  threshold?: number | number[];
  rootMargin?: string;
  animationTime?: number;
  animationDelay?: number;
  parallaxEnabled?: boolean;
  deltaPercent?: number;
  animationTimeParallax?: number;
  triggerOnce?: boolean;
}

export function useScrollAnimation({
  animationName = 'FADE_IN_UP',
  threshold = [0.15, 0.25, 0.5, 0.75, 1],
  rootMargin = '0px',
  animationTime = 500,
  animationDelay = 0,
  parallaxEnabled = false,
  deltaPercent = 0.1,
  animationTimeParallax = 500,
  triggerOnce = true,
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const startScrollY = useRef<number | null>(null);
  const isIntersecting = useRef(false);
  const hasTriggered = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Очищаем предыдущий observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    // Проверяем начальную видимость один раз через requestAnimationFrame
    if (!hasTriggered.current) {
      requestAnimationFrame(() => {
        if (!element || hasTriggered.current) return;
        
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        const isInViewport = 
          rect.top < windowHeight &&
          rect.bottom > 0 &&
          rect.left < windowWidth &&
          rect.right > 0;

        if (isInViewport) {
          hasTriggered.current = true;
          setIsVisible(true);
        }
      });
    }

    // Создаем observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting.current = entry.isIntersecting;

          if (entry.isIntersecting && !hasTriggered.current) {
            hasTriggered.current = true;
            setIsVisible(true);
            if (triggerOnce && observerRef.current) {
              observerRef.current.unobserve(element);
            }
          } else if (!triggerOnce && !entry.isIntersecting) {
            setIsVisible(false);
            hasTriggered.current = false;
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.unobserve(element);
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [threshold, rootMargin, animationDelay, triggerOnce]);

  // Сбрасываем состояние при размонтировании компонента
  useEffect(() => {
    return () => {
      setIsVisible(false);
      hasTriggered.current = false;
      isIntersecting.current = false;
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!parallaxEnabled) return;

    const handleScroll = () => {
      const element = ref.current;
      if (!element || !isIntersecting.current) return;

      const rect = element.getBoundingClientRect();
      if (!rect) return;

      if (startScrollY.current === null) {
        startScrollY.current = window.scrollY;
      }

      const delta = window.scrollY - startScrollY.current;
      const offset = delta * deltaPercent * -1;

      setParallaxOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [parallaxEnabled, deltaPercent]);

  const animationStyle = {
    ...ANIMATE_STYLES[animationName][isVisible ? 'show' : 'hide'],
    transition: `all ${animationTime}ms ease`,
    transitionDelay: `${animationDelay}ms`,
  };

  const parallaxStyle = parallaxEnabled
    ? {
        transform: `translateY(${parallaxOffset}px)`,
        transition: `transform ${animationTimeParallax}ms ease`,
      }
    : {};

  return {
    ref,
    isVisible,
    style: animationStyle,
    parallaxStyle,
  };
}

