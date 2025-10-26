'use client';

import { ReactNode } from 'react';
import { useScrollAnimation, AnimationType } from '@/hooks/useScrollAnimation';

interface AnimateOnScrollProps {
  children: ReactNode;
  animationName?: AnimationType;
  threshold?: number | number[];
  rootMargin?: string;
  animationTime?: number;
  animationDelay?: number;
  parallaxEnabled?: boolean;
  deltaPercent?: number;
  animationTimeParallax?: number;
  triggerOnce?: boolean;
  className?: string;
  innerClassName?: string;
}

export default function AnimateOnScroll({
  children,
  animationName = 'FADE_IN_UP',
  threshold = [0.15, 0.25, 0.5],
  rootMargin = '0px',
  animationTime = 600,
  animationDelay = 0,
  parallaxEnabled = false,
  deltaPercent = 0.1,
  animationTimeParallax = 500,
  triggerOnce = true,
  className = '',
  innerClassName = '',
}: AnimateOnScrollProps) {
  const { ref, style, parallaxStyle } = useScrollAnimation({
    animationName,
    threshold,
    rootMargin,
    animationTime,
    animationDelay,
    parallaxEnabled,
    deltaPercent,
    animationTimeParallax,
    triggerOnce,
  });

  return (
    <div ref={ref} className={className} style={parallaxStyle}>
      <div className={innerClassName} style={style}>
        {children}
      </div>
    </div>
  );
}

