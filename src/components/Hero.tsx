'use client';

import { useEffect, useRef, useState } from 'react';
import AnimateOnScroll from './AnimateOnScroll';
import Icon from './Icon';
import BlockBuilderCanvas from './BlockBuilderCanvas';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const targetTiltRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Вычисляем отклонение от центра (от -1 до 1)
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      
      // Ограничиваем и применяем легкий наклон (максимум 3 градуса для более тонкого эффекта)
      const maxTilt = 3;
      targetTiltRef.current = {
        x: Math.max(-1, Math.min(1, x)) * maxTilt,
        y: Math.max(-1, Math.min(1, y)) * -maxTilt, // Инвертируем Y для естественного эффекта
      };
    };

    const handleMouseLeave = () => {
      targetTiltRef.current = { x: 0, y: 0 };
    };

    // Плавная интерполяция для более мягкого эффекта
    const animate = () => {
      setTilt(prev => {
        const diffX = targetTiltRef.current.x - prev.x;
        const diffY = targetTiltRef.current.y - prev.y;
        return {
          x: prev.x + diffX * 0.1,
          y: prev.y + diffY * 0.1,
        };
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900" />
      
      {/* Canvas animation - Block Builder concept */}
      <BlockBuilderCanvas tilt={tilt} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-[80px]">
        <AnimateOnScroll animationName="FADE_IN_DOWN" animationDelay={200} animationTime={800} rootMargin="-50px 0px">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            BlockBuilder
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={400} animationTime={800} rootMargin="-50px 0px">
          <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-4">
            Блочный конструктор с чистой архитектурой
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={600} animationTime={800} rootMargin="-50px 0px">
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Создавайте мощные no-code конструкторы с правильной архитектурой. 
            Поддержка Vue3, Pure JavaScript и TypeScript из коробки.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll animationName="SCALE_UP" animationDelay={800} animationTime={600} rootMargin="-50px 0px">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#installation"
              className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              Начать работу
            </a>
            <a
              href="#examples"
              className="px-8 py-4 bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl border-2 border-primary-200 dark:border-primary-800"
            >
              Посмотреть примеры
            </a>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={1000} animationTime={800} rootMargin="-50px 0px">
          {/* Key features badges */}
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            <span className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-md border border-gray-200 dark:border-slate-700 hover:scale-105 transition-transform flex items-center gap-2">
              <Icon name="sparkles" size={16} className="text-primary-600 dark:text-primary-400" />
              Clean Architecture
            </span>
            <span className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-md border border-gray-200 dark:border-slate-700 hover:scale-105 transition-transform flex items-center gap-2">
              <Icon name="target" size={16} className="text-primary-600 dark:text-primary-400" />
              SOLID принципы
            </span>
            <span className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-md border border-gray-200 dark:border-slate-700 hover:scale-105 transition-transform flex items-center gap-2">
              <Icon name="flask" size={16} className="text-primary-600 dark:text-primary-400" />
              100% покрытие тестами
            </span>
            <span className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-md border border-gray-200 dark:border-slate-700 hover:scale-105 transition-transform flex items-center gap-2">
              <Icon name="package" size={16} className="text-primary-600 dark:text-primary-400" />
              TypeScript
            </span>
            <span className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-md border border-gray-200 dark:border-slate-700 hover:scale-105 transition-transform flex items-center gap-2">
              <Icon name="zap" size={16} className="text-primary-600 dark:text-primary-400" />
              Vue3 Support
            </span>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-600 dark:border-primary-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

