'use client';

import { useState } from 'react';
import AnimateOnScroll from './AnimateOnScroll';
import CodeBlock from './CodeBlock';
import Icon from './Icon';

const examples = [
  {
    title: 'Vue3 компонент',
    language: 'vue',
    code: `<template>
  <BlockBuilderComponent
    :config="{ availableBlockTypes }"
    :block-management-use-case="blockManagementUseCase"
    :api-select-use-case="apiSelectUseCase"
    :custom-field-renderer-registry="customFieldRendererRegistry"
    :on-save="handleSave"
    :initial-blocks="initialBlocks"
    :is-edit="isEdit"
  />
</template>

<script setup>
import { ref } from 'vue'
import {
  BlockBuilderComponent,
  createBlockManagementUseCase,
  ApiSelectUseCase,
  FetchHttpClient,
  CustomFieldRendererRegistry
} from '@mushket-co/block-builder/vue'
import YourTextBlock from './components/YourTextBlock.vue'

const blockManagementUseCase = createBlockManagementUseCase()
const httpClient = new FetchHttpClient()
const apiSelectUseCase = new ApiSelectUseCase(httpClient)
const customFieldRendererRegistry = new CustomFieldRendererRegistry()

// Регистрируем компоненты
const componentRegistry = blockManagementUseCase.getComponentRegistry()
componentRegistry.register('text', YourTextBlock)

const availableBlockTypes = ref([
  {
    type: 'text',
    label: 'Текст',
    render: {
      kind: 'component',
      framework: 'vue',
      component: YourTextBlock
    },
    fields: [
      {
        field: 'content',
        label: 'Содержимое',
        type: 'textarea',
        defaultValue: 'Hello'
      }
    ],
    defaultProps: { content: 'Hello' }
  }
])

const isEdit = ref(true)

const handleSave = async (blocks) => {
  localStorage.setItem('saved-blocks', JSON.stringify(blocks))
  return true
}

const initialBlocks = ref([])
</script>`,
  },
  {
    title: 'Pure JavaScript',
    language: 'javascript',
    code: `import { BlockBuilder } from '@mushket-co/block-builder'
import '@mushket-co/block-builder/index.esm.css' // Импортируйте стили!

// Конфигурация блоков
const blockConfigs = {
  text: {
    title: 'Текстовый блок',
    icon: '📝',
    render: {
      kind: 'html',
      template: (props) => \`
        <div style="padding: 1rem; background: white; border-radius: 4px;">
          <p style="font-size: \${props.fontSize || 16}px; color: \${props.color || '#333'};">
            \${props.content || 'Пустой текст'}
          </p>
        </div>
      \`
    },
    fields: [
      {
        field: 'content',
        label: 'Содержимое',
        type: 'textarea',
        defaultValue: 'Новый текстовый блок'
      },
      {
        field: 'fontSize',
        label: 'Размер шрифта',
        type: 'number',
        defaultValue: 16
      },
      {
        field: 'color',
        label: 'Цвет',
        type: 'color',
        defaultValue: '#333333'
      }
    ]
  }
}

// Создание экземпляра с автоматическим UI
const blockBuilder = new BlockBuilder({
  containerId: 'my-app', // Передаем containerId - UI инициализируется автоматически
  blockConfigs: blockConfigs,
  initialBlocks: [], // Начальные блоки
  isEdit: true, // Режим редактирования
  onSave: async (blocks) => {
    // Сохранение блоков через колбэк
    localStorage.setItem('blocks', JSON.stringify(blocks))
    return true
  }
})

// Пользователь получает готовые кнопки, 
// формы, валидацию из коробки`,
  },
  {
    title: 'Только API (без UI)',
    language: 'javascript',
    code: `import { BlockBuilder } from '@mushket-co/block-builder/core'
// Для core версии НЕ импортируйте CSS!

// Конфигурация блоков
const blockConfigs = {
  text: {
    title: 'Текстовый блок',
    fields: [
      {
        field: 'content',
        label: 'Содержимое',
        type: 'textarea',
        defaultValue: 'Новый текстовый блок'
      },
      {
        field: 'fontSize',
        label: 'Размер шрифта',
        type: 'number',
        defaultValue: 16
      }
    ]
  }
}

// Создание экземпляра только с API
const blockBuilder = new BlockBuilder({
  // containerId НЕ передаем - UI не инициализируется
  blockConfigs: blockConfigs,
  autoInit: false // Ручная инициализация
})

// Используем только API
await blockBuilder.createBlock({
  type: 'text',
  props: { content: 'Hello World' },
  settings: { fontSize: 16 }
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

// Используем в конфигурации блока
const blockConfigs = {
  richText: {
    title: 'Текстовый блок',
    fields: [
      {
        field: 'content',
        label: 'Содержимое',
        type: 'custom',
        customFieldConfig: {
          rendererId: 'wysiwyg-editor'
        }
      }
    ]
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
                <div className="mb-2">
                  <Icon name="zap" size={32} className="text-primary-600 dark:text-primary-400" />
                </div>
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
                <div className="mb-2">
                  <Icon name="plugin" size={32} className="text-green-600 dark:text-green-400" />
                </div>
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
                <div className="mb-2">
                  <Icon name="paintbrush" size={32} className="text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Расширяемость
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Создавайте свои типы полей
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Demo link card */}
          <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={900}>
            <a
              href="https://demo.block-builder.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 block p-8 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 text-white text-center group"
            >
              <div className="flex flex-col items-center">
                <Icon name="monitor" size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-3xl font-bold mb-2">
                  Посмотрите живые примеры
                </h3>
                <p className="text-xl text-white/90 mb-4">
                  Интерактивные демо с реальными блоками и формами
                </p>
                <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg font-semibold group-hover:bg-white/30 transition-colors">
                  Перейти на demo.block-builder.ru →
                </div>
              </div>
            </a>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

