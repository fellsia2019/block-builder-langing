'use client';

import { useState } from 'react';
import AnimateOnScroll from './AnimateOnScroll';
import CodeBlock from './CodeBlock';

const examples = [
  {
    title: 'Vue3 компонент',
    language: 'vue',
    code: `<template>
  <BlockBuilderComponent :config="config" />
</template>

<script setup>
import { BlockBuilderComponent } from '@mushket-co/block-builder/vue'
import YourTextBlock from './components/YourTextBlock.vue'

const config = {
  availableBlockTypes: [
    {
      type: 'text',
      label: 'Текст',
      render: {
        kind: 'component',
        framework: 'vue',
        component: YourTextBlock
      },
      defaultProps: { content: 'Hello' }
    }
  ]
}
</script>`,
  },
  {
    title: 'Pure JavaScript',
    language: 'javascript',
    code: `import { BlockBuilder } from '@mushket-co/block-builder'
import { blockConfigs } from './block-config.js'

// Создание экземпляра с автоматическим UI
const blockBuilder = new BlockBuilder({
  containerId: 'my-app',
  blockConfigs: blockConfigs,
  storage: 'localStorage',
  autoRender: true // UI рендерится автоматически!
})

// Пользователь получает готовые кнопки, 
// формы, валидацию из коробки`,
  },
  {
    title: 'Только API (без UI)',
    language: 'javascript',
    code: `import { BlockBuilder } from '@mushket-co/block-builder'

// Создание экземпляра только с API
const blockBuilder = new BlockBuilder({
  containerId: 'my-app',
  blockConfigs: blockConfigs,
  autoRender: false // Отключаем UI
})

// Используем только API
await blockBuilder.createBlock({
  type: 'text',
  settings: { fontSize: 16 },
  props: { content: 'Hello World' }
})

const blocks = await blockBuilder.getAllBlocks()
console.log('Все блоки:', blocks)`,
  },
  {
    title: 'Кастомные поля',
    language: 'javascript',
    code: `// Создаём Custom Field Renderer
export class WysiwygFieldRenderer {
  id = 'wysiwyg-editor'
  name = 'WYSIWYG Editor'

  render(container, context) {
    const { value, onChange } = context
    
    const wrapper = document.createElement('div')
    const editorAPI = createWysiwygEditor(wrapper, {
      value: value || '<p></p>',
      onChange: (newValue) => onChange(newValue)
    })
    
    return {
      element: wrapper,
      getValue: () => editorAPI.getValue(),
      setValue: (v) => editorAPI.setValue(v),
      destroy: () => editorAPI.destroy()
    }
  }
}

// Регистрируем renderer
const wysiwygRenderer = new WysiwygFieldRenderer()
blockBuilder.registerCustomFieldRenderer(wysiwygRenderer)`,
  },
];

export default function CodeExamples() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="examples" className="py-20 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animationName="FADE_IN_DOWN" animationDelay={100}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Примеры использования
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Быстрый старт с готовыми примерами кода
            </p>
          </div>
        </AnimateOnScroll>

        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={200}>
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === index
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                }`}
              >
                {example.title}
              </button>
            ))}
          </div>
          </AnimateOnScroll>

          <AnimateOnScroll animationName="SCALE_UP" animationDelay={400}>
            {/* Code block */}
            <div className="relative bg-slate-900 rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow">
            <div className="flex items-center justify-between px-6 py-3 bg-slate-800">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-sm text-gray-400">{examples[activeTab].title}</div>
            </div>
            <div className="px-6 pb-6">
              <CodeBlock 
                code={examples[activeTab].code} 
                language={examples[activeTab].language}
                className="rounded-none"
              />
            </div>
          </div>
          </AnimateOnScroll>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={600}>
              <div className="p-6 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl border border-primary-200 dark:border-primary-800 hover:scale-105 transition-transform">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Быстрый старт
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Готовые компоненты и UI из коробки
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={700}>
              <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl border border-green-200 dark:border-green-800 hover:scale-105 transition-transform">
                <div className="text-2xl mb-2">🔌</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Гибкость
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Используйте с UI или только API
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={800}>
              <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800 hover:scale-105 transition-transform">
                <div className="text-2xl mb-2">🎨</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Расширяемость
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Создавайте свои типы полей
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

