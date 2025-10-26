'use client';

import AnimateOnScroll from './AnimateOnScroll';

export default function Architecture() {
  return (
    <section id="architecture" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animationName="FADE_IN_DOWN" animationDelay={100}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Архитектура
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Построено по принципам Clean Architecture
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <AnimateOnScroll animationName="FADE_IN_LEFT" animationDelay={200}>
              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-primary-600">
                <h3 className="text-xl font-semibold mb-3 text-primary-600 dark:text-primary-400">
                  🎯 Core Layer (Ядро)
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• <strong>Entities</strong> - бизнес-правила и сущности</li>
                  <li>• <strong>Use Cases</strong> - сценарии использования</li>
                  <li>• <strong>Ports</strong> - интерфейсы для внешнего мира</li>
                  <li>• <strong>DTO</strong> - объекты передачи данных</li>
                </ul>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animationName="FADE_IN_LEFT" animationDelay={400}>
              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-600">
                <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">
                  🔧 Infrastructure Layer
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• <strong>Repositories</strong> - реализации хранилищ</li>
                  <li>• <strong>HTTP Clients</strong> - работа с API</li>
                  <li>• <strong>Registries</strong> - регистры компонентов</li>
                </ul>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animationName="FADE_IN_LEFT" animationDelay={600}>
              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-pink-600">
                <h3 className="text-xl font-semibold mb-3 text-pink-600 dark:text-pink-400">
                  🎨 UI Layer
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• <strong>Vue3 Components</strong> - готовые компоненты</li>
                  <li>• <strong>Controllers</strong> - управление UI</li>
                  <li>• <strong>Services</strong> - UI сервисы</li>
                </ul>
              </div>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll 
            animationName="FADE_IN_RIGHT" 
            animationDelay={300}
            parallaxEnabled={true}
            deltaPercent={0.05}
          >
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-shadow">
              <div className="space-y-4">
                <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Направление зависимостей
                </div>
                
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex-1 p-4 bg-pink-100 dark:bg-pink-900 rounded-lg text-center">
                    <div className="font-semibold text-pink-700 dark:text-pink-300">UI</div>
                    <div className="text-xs text-pink-600 dark:text-pink-400 mt-1">Controllers, Components</div>
                  </div>
                  <div className="text-2xl text-gray-400">→</div>
                  <div className="flex-1 p-4 bg-primary-100 dark:bg-primary-900 rounded-lg text-center">
                    <div className="font-semibold text-primary-700 dark:text-primary-300">Core</div>
                    <div className="text-xs text-primary-600 dark:text-primary-400 mt-1">Use Cases, Entities</div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <div className="flex-1 p-4 bg-purple-100 dark:bg-purple-900 rounded-lg text-center">
                    <div className="font-semibold text-purple-700 dark:text-purple-300">Infrastructure</div>
                    <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">Repositories, HTTP</div>
                  </div>
                  <div className="text-2xl text-gray-400">→</div>
                  <div className="flex-1 p-4 bg-primary-100 dark:bg-primary-900 rounded-lg text-center">
                    <div className="font-semibold text-primary-700 dark:text-primary-300">Ports</div>
                    <div className="text-xs text-primary-600 dark:text-primary-400 mt-1">Interfaces</div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border-2 border-green-200 dark:border-green-800">
                  <div className="text-center text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                    ✅ Преимущества
                  </div>
                  <ul className="text-xs text-green-600 dark:text-green-400 space-y-1">
                    <li>• Core не зависит от внешних слоев</li>
                    <li>• Легко тестировать и мокать</li>
                    <li>• Простая замена реализаций</li>
                    <li>• Четкое разделение ответственности</li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimateOnScroll animationName="ZOOM_IN" animationDelay={200}>
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              <div className="text-3xl mb-2 transform hover:scale-110 transition-transform">🧪</div>
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-400">Покрытие тестами</div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animationName="ZOOM_IN" animationDelay={400}>
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              <div className="text-3xl mb-2 transform hover:scale-110 transition-transform">📦</div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">TypeScript</div>
              <div className="text-gray-600 dark:text-gray-400">Полная типизация</div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animationName="ZOOM_IN" animationDelay={600}>
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              <div className="text-3xl mb-2 transform hover:scale-110 transition-transform">⚡</div>
              <div className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-2">SOLID</div>
              <div className="text-gray-600 dark:text-gray-400">Принципы разработки</div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
