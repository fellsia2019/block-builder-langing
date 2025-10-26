'use client';

import AnimateOnScroll from './AnimateOnScroll';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900" />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimateOnScroll animationName="FADE_IN_DOWN" animationDelay={200} animationTime={800}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            BlockBuilder
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={400} animationTime={800}>
          <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-4">
            Блочный конструктор с чистой архитектурой
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={600} animationTime={800}>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Создавайте мощные no-code конструкторы с правильной архитектурой. 
            Поддержка Vue3, Pure JavaScript и TypeScript из коробки.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll animationName="SCALE_UP" animationDelay={800} animationTime={600}>
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

        <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={1000} animationTime={800}>
          {/* Key features badges */}
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            <span className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-md border border-gray-200 dark:border-slate-700 hover:scale-105 transition-transform">
              ✨ Clean Architecture
            </span>
            <span className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-md border border-gray-200 dark:border-slate-700 hover:scale-105 transition-transform">
              🎯 SOLID принципы
            </span>
            <span className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-md border border-gray-200 dark:border-slate-700 hover:scale-105 transition-transform">
              🧪 100% покрытие тестами
            </span>
            <span className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-md border border-gray-200 dark:border-slate-700 hover:scale-105 transition-transform">
              📦 TypeScript
            </span>
            <span className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-md border border-gray-200 dark:border-slate-700 hover:scale-105 transition-transform">
              ⚡ Vue3 Support
            </span>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-600 dark:border-primary-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

