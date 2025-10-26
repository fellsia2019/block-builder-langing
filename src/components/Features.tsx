'use client';

import AnimateOnScroll from './AnimateOnScroll';

const features = [
  {
    icon: '🏗️',
    title: 'Чистая архитектура',
    description: 'Проект построен по принципам Clean Architecture с четким разделением на слои: Core, Infrastructure и UI.'
  },
  {
    icon: '🎯',
    title: 'SOLID принципы',
    description: 'Каждый класс имеет одну ответственность. Код легко тестировать, расширять и поддерживать.'
  },
  {
    icon: '🎨',
    title: 'Vue3 компоненты из коробки',
    description: 'Готовые Vue3 Single File Components для быстрой интеграции в ваше приложение.'
  },
  {
    icon: '⚡',
    title: 'Pure JavaScript поддержка',
    description: 'Работает как с фреймворками, так и с чистым JavaScript без зависимостей.'
  },
  {
    icon: '🔌',
    title: 'Плагинная система',
    description: 'Легко расширяйте функциональность через кастомные типы полей и рендереры.'
  },
  {
    icon: '📦',
    title: 'TypeScript',
    description: 'Полная типизация для безопасной разработки и отличной поддержки IDE.'
  },
  {
    icon: '💾',
    title: 'Гибкое хранилище',
    description: 'Выбирайте между localStorage и in-memory хранилищем или создайте свою реализацию.'
  },
  {
    icon: '🎭',
    title: 'Автоматический UI',
    description: 'Встроенный UI с формами, валидацией и модальными окнами работает из коробки.'
  },
  {
    icon: '🧪',
    title: 'Покрытие тестами',
    description: 'Unit, интеграционные и E2E тесты для гарантии качества кода.'
  },
];

const animations = ['FADE_IN_UP', 'FADE_IN_LEFT', 'FADE_IN_RIGHT', 'ZOOM_IN', 'SCALE_UP'] as const;

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animationName="FADE_IN_DOWN" animationDelay={100}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Почему BlockBuilder?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Библиотека, которая позволяет создавать блочные конструкторы с правильной архитектурой
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimateOnScroll
              key={index}
              animationName={animations[index % animations.length]}
              animationDelay={index * 100}
              animationTime={600}
            >
              <div className="h-full p-6 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-slate-700">
                <div className="text-4xl mb-4 transform hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

