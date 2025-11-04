'use client';

import AnimateOnScroll from './AnimateOnScroll';
import Icon from './Icon';

export default function GitHubNpmBlock() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 overflow-hidden relative">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200 dark:bg-primary-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-2xl opacity-50 animate-float" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-2xl opacity-50 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimateOnScroll animationName="FADE_IN_DOWN" animationDelay={100}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Открытый исходный код
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Изучайте код, вносите вклад или используйте в своих проектах
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GitHub Card */}
          <AnimateOnScroll animationName="FADE_IN_LEFT" animationDelay={200} className="h-full" innerClassName="h-full">
            <a
              href="https://github.com/mushket-co/block-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 transform hover:-translate-y-2 h-full"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-primary-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />
              
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon name="github" size={32} className="text-white" />
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    <span className="text-sm font-medium">Открыть</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  GitHub
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Исходный код, примеры использования и документация
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Icon name="sparkles" size={16} className="text-yellow-500" />
                    <span>MIT License</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="star" size={16} className="text-yellow-500" />
                    <span>Open Source</span>
                  </span>
                </div>
              </div>
            </a>
          </AnimateOnScroll>

          {/* NPM Card */}
          <AnimateOnScroll animationName="FADE_IN_RIGHT" animationDelay={300} className="h-full" innerClassName="h-full">
            <a
              href="https://www.npmjs.com/package/@mushket-co/block-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-200 dark:border-slate-700 hover:border-red-500 dark:hover:border-red-500 transform hover:-translate-y-2 h-full"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-orange-500/0 to-red-600/0 group-hover:from-red-500/10 group-hover:via-orange-500/10 group-hover:to-red-600/10 transition-all duration-300" />
              
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 dark:from-red-700 dark:to-red-800 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z" />
                    </svg>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    <span className="text-sm font-medium">Открыть</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  NPM Package
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Установите пакет через npm и начните использовать прямо сейчас
                </p>
                
                <div className="bg-slate-900 dark:bg-slate-950 rounded-lg px-4 py-3 font-mono text-sm text-gray-100 border border-slate-700 group-hover:border-red-500 dark:group-hover:border-red-500 transition-colors">
                  <span className="text-red-400">npm</span>
                  <span className="text-gray-400"> install </span>
                  <span className="text-primary-400">@mushket-co/block-builder</span>
                </div>
              </div>
            </a>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

