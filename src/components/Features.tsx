'use client';

import type { ReactNode } from 'react';
import AnimateOnScroll from './AnimateOnScroll';
import Icon from './Icon';
import { GITHUB_EXAMPLES } from '@/lib/urls';

const features: Array<{
  iconName: 'building' | 'target' | 'paintbrush' | 'zap' | 'plugin' | 'package' | 'theater' | 'flask' | 'clipboard';
  title: string;
  description: ReactNode;
}> = [
  {
    iconName: 'building' as const,
    title: 'Чистая архитектура',
    description: 'Проект построен по принципам Clean Architecture с четким разделением на слои: Core, Infrastructure и UI.'
  },
  {
    iconName: 'target' as const,
    title: 'SOLID принципы',
    description: 'Каждый класс имеет одну ответственность. Код легко тестировать, расширять и поддерживать.'
  },
  {
    iconName: 'paintbrush' as const,
    title: 'Vue 3 и React UI',
    description: 'Готовые компоненты BlockBuilder для Vue 3 и React 19+, единый core API.'
  },
  {
    iconName: 'zap' as const,
    title: 'SSR и Nuxt / Next.js',
    description: (
      <>
        Серверный рендеринг контента блоков. Живые SSR-примеры — в{' '}
        <a href={GITHUB_EXAMPLES} className="text-primary-600 dark:text-primary-400 hover:underline" target="_blank" rel="noopener noreferrer">
          block-builder/examples
        </a>{' '}
        (Nuxt 3/4, Next.js).
      </>
    ),
  },
  {
    iconName: 'plugin' as const,
    title: 'Якоря и файлы (1.5.0)',
    description: 'Поле block-anchor для ссылок на блоки страницы и отдельный UI загрузки file/files. Скролл к якорю реализуется в ваших компонентах блоков.'
  },
  {
    iconName: 'clipboard' as const,
    title: 'Form scope & import (1.8.0)',
    description: 'formScope в custom fields, optionsFrom для select, file-import с merge/dedupeBy, persist: false — Vue 3 и React; демо в demo-bb.'
  },
  {
    iconName: 'clipboard' as const,
    title: 'Form hooks (1.7.0)',
    description: 'formHooks.onFormOpen / onBeforeSave в конфиге типа блока — гидрация формы и side-effects перед save (Vue 3 и React).'
  },
  {
    iconName: 'clipboard' as const,
    title: 'Matrix-table (1.6.0)',
    description: 'Поле matrix-table — редактор таблицы в форме блока (Vue 3 и React). Демо в demo-bb и examples.'
  },
  {
    iconName: 'clipboard' as const,
    title: 'Multi-select (1.5.5)',
    description: 'Поле select с multiple: true — множественный выбор с тегами во Vue и React.'
  },
  {
    iconName: 'plugin' as const,
    title: 'Плагинная система',
    description: 'Легко расширяйте функциональность через кастомные типы полей и рендереры.'
  },
  {
    iconName: 'package' as const,
    title: 'TypeScript',
    description: 'Полная типизация для безопасной разработки и отличной поддержки IDE.'
  },
  {
    iconName: 'theater' as const,
    title: 'Автоматический UI',
    description: 'Встроенный UI с формами, валидацией и модальными окнами работает из коробки.'
  },
  {
    iconName: 'flask' as const,
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
              className="h-full"
              innerClassName="h-full"
            >
              <div className="h-full p-6 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-slate-700">
                <div className="mb-4 transform hover:scale-110 transition-transform duration-300">
                  <Icon name={feature.iconName} size={48} className="text-primary-600 dark:text-primary-400" />
                </div>
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

