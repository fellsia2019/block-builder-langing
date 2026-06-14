'use client';

import CodeBlock from '@/components/CodeBlock';
import Icon from '@/components/Icon';
import type { NavigationProps } from '../../types';

export default function GettingStartedVue3({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Быстрый старт с Vue3</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Начните использовать BlockBuilder с Vue3 - готовый UI и полная интеграция с Vue компонентами
        </p>
      </div>

      <section className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Установка</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Установите BlockBuilder и убедитесь, что у вас установлен Vue 3:
        </p>
        <CodeBlock
          code="npm install @mushket-co/block-builder"
          language="bash"
          className="mb-4"
        />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Для TypeScript добавьте типы: <code className="text-purple-700 dark:text-purple-400">npm install -D @types/node</code>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Основные концепции</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <h3 className="font-bold text-purple-900 dark:text-purple-300 mb-2">BlockBuilderComponent</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Основной Vue компонент, который предоставляет готовый UI для управления блоками
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Ваши компоненты</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Vue компоненты, которые используются для рендеринга конкретных типов блоков
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-900 dark:text-green-300 mb-2">Config</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Конфигурация с доступными типами блоков, их полями и компонентами
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
            <h3 className="font-bold text-orange-900 dark:text-orange-300 mb-2">События</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              События для отслеживания создания, обновления и удаления блоков
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Базовый пример</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Создайте компонент блока и подключите BlockBuilderComponent:
        </p>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">1. Создайте компонент блока</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            <strong>Важно:</strong> Margin автоматически применяется на UI блок-обертку над компонентом. 
            Для padding используйте CSS переменные, которые устанавливаются автоматически.
          </p>
          <CodeBlock
            code={`<!-- components/TextBlock.vue -->
<template>
  <div class="text-block">
    <div v-html="block.props.content"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.text-block {
  /* Используем CSS переменные для padding из spacing */
  /* Переменные автоматически устанавливаются на .block-builder-block обертке */
  padding-top: var(--spacing-padding-top, 1rem);
  padding-bottom: var(--spacing-padding-bottom, 1rem);
  
  /* Дополнительные стили вашего компонента */
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>`}
            language="vue"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">2. Используйте BlockBuilderComponent</h3>
          <CodeBlock
            code={`<template>
  <BlockBuilderComponent 
    :config="config"
    @block-added="handleBlockAdded"
    @block-updated="handleBlockUpdated"
    @block-deleted="handleBlockDeleted"
  />
</template>

<script setup>
import { BlockBuilderComponent } from '@mushket-co/block-builder/vue'
import TextBlock from './components/TextBlock.vue'

const config = {
  availableBlockTypes: [
    {
      type: 'text',
      label: 'Текстовый блок',
      render: {
        kind: 'component',
        framework: 'vue',
        component: TextBlock
      },
      fields: [
        {
          field: 'content',
          label: 'Содержимое',
          type: 'textarea',
          rules: [{ type: 'required', field: 'content' }],
          defaultValue: '<p>Привет, мир!</p>'
        }
      ],
      defaultProps: {
        content: '<p>Привет, мир!</p>'
      },
      spacingOptions: {
        enabled: true,
        spacingTypes: ['padding-top', 'padding-bottom', 'margin-top', 'margin-bottom']
      }
    }
  ],
}

const handleBlockAdded = (block) => {
  console.log('Блок создан:', block)
}

const handleBlockUpdated = (block) => {
  console.log('Блок обновлен:', block)
}

const handleBlockDeleted = (blockId) => {
  console.log('Блок удален:', blockId)
}
</script>`}
            language="vue"
            className="mb-4"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Множественные типы блоков</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Вы можете определить несколько типов блоков с разными компонентами и полями:
        </p>
        <CodeBlock
          code={`<script setup>
import { BlockBuilderComponent } from '@mushket-co/block-builder/vue'
import TextBlock from './components/TextBlock.vue'
import ImageBlock from './components/ImageBlock.vue'
import ButtonBlock from './components/ButtonBlock.vue'

const config = {
  availableBlockTypes: [
    {
      type: 'text',
      label: 'Текстовый блок',
      render: {
        kind: 'component',
        framework: 'vue',
        component: TextBlock
      },
      fields: [
        {
          field: 'content',
          label: 'Содержимое',
          type: 'textarea',
          rules: [{ type: 'required', field: 'content' }]
        },
        {
          field: 'textAlign',
          label: 'Выравнивание',
          type: 'select',
          options: [
            { value: 'left', label: 'Слева' },
            { value: 'center', label: 'По центру' },
            { value: 'right', label: 'Справа' }
          ]
        }
      ]
    },
    {
      type: 'image',
      label: 'Изображение',
      render: {
        kind: 'component',
        framework: 'vue',
        component: ImageBlock
      },
      fields: [
        {
          field: 'image',
          label: 'Изображение',
          type: 'image',
          rules: [{ type: 'required', field: 'image' }],
          fileUploadConfig: {
            uploadUrl: '/api/upload',
            maxFileSize: 5 * 1024 * 1024,
            accept: 'image/*',
            responseMapper: (response) => ({
              src: response.url
            })
          }
        },
        {
          field: 'alt',
          label: 'Альтернативный текст',
          type: 'text'
        },
        {
          field: 'width',
          label: 'Ширина',
          type: 'number',
          defaultValue: 100
        }
      ]
    },
    {
      type: 'button',
      label: 'Кнопка',
      render: {
        kind: 'component',
        framework: 'vue',
        component: ButtonBlock
      },
      fields: [
        {
          field: 'text',
          label: 'Текст кнопки',
          type: 'text',
          rules: [{ type: 'required', field: 'text' }]
        },
        {
          field: 'url',
          label: 'Ссылка',
          type: 'url'
        },
        {
          field: 'variant',
          label: 'Стиль',
          type: 'select',
          options: [
            { value: 'primary', label: 'Основной' },
            { value: 'secondary', label: 'Вторичный' },
            { value: 'outline', label: 'Обводка' }
          ]
        }
      ]
    }
  ],
}
</script>`}
          language="vue"
          className="mb-4"
        />
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 border-l-4 border-yellow-400 mt-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
            <Icon name="warning" size={18} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Важно:</strong> При использовании <code className="text-yellow-700 dark:text-yellow-400">uploadUrl</code> (загрузка через сервер API клиента) ответ сервера <strong>ОБЯЗАТЕЛЬНО</strong> должен быть объектом с полем 
              <code className="text-yellow-700 dark:text-yellow-400">src</code>, содержащим URL изображения. Если формат ответа отличается, используйте 
              <code className="text-yellow-700 dark:text-yellow-400">responseMapper</code> для преобразования ответа к виду объекта с вашими полями и обязательным полем <code className="text-yellow-700 dark:text-yellow-400">src</code>.
            </span>
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Режим редактирования/просмотра</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          BlockBuilder поддерживает два режима работы. Используйте проп <code className="text-purple-700 dark:text-purple-400">isEdit</code> для управления режимом:
        </p>
        <CodeBlock
          code={`<template>
  <!-- Режим редактирования (по умолчанию) -->
  <BlockBuilderComponent 
    :config="config"
    :isEdit="true"
  />

  <!-- Режим только просмотра -->
  <BlockBuilderComponent 
    :config="config"
    :isEdit="false"
  />
</template>

<script setup>
import { BlockBuilderComponent } from '@mushket-co/block-builder/vue'

const config = {
  availableBlockTypes: [
    // ваша конфигурация
  ],
}
</script>`}
          language="vue"
          className="mb-4"
        />
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">Что происходит в режиме просмотра?</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>Скрываются все контролы редактирования, добавления и управления блоками</li>
            <li>Остаётся только пользовательская верстка блоков в обёртке BlockBuilder</li>
            <li>На элемент <code className="text-green-700 dark:text-green-400">body</code> автоматически добавляется/удаляется CSS класс <code className="text-green-700 dark:text-green-400">bb-is-edit-mode</code></li>
          </ul>
        </div>
      </section>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">💡 Важные моменты</h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span><strong>Spacing</strong> - BlockBuilder автоматически добавляет поля spacing в форму настроек блока, если указано <code className="text-blue-700 dark:text-blue-400">spacingOptions.enabled: true</code>. Margin применяется автоматически на UI блок-обертку, для padding используйте CSS переменные: <code className="text-blue-700 dark:text-blue-400">--spacing-padding-top</code> и <code className="text-blue-700 dark:text-blue-400">--spacing-padding-bottom</code></span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span><strong>Props блока</strong> - Ваш компонент получает объект <code className="text-blue-700 dark:text-blue-400">block</code> с полями <code className="text-blue-700 dark:text-blue-400">id</code>, <code className="text-blue-700 dark:text-blue-400">type</code>, <code className="text-blue-700 dark:text-blue-400">props</code>, <code className="text-blue-700 dark:text-blue-400">settings</code></span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span><strong>Сохранение</strong> - Используйте колбэк <code className="text-blue-700 dark:text-blue-400">onSave</code> для сохранения блоков (localStorage для разработки или API для продакшена)</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span><strong>События</strong> - Подписывайтесь на события компонента для синхронизации с вашим бэкендом</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span><strong>Режим просмотра</strong> - Используйте <code className="text-blue-700 dark:text-blue-400">:isEdit="false"</code> для отображения блоков в режиме только просмотра без возможности редактирования</span>
          </li>
        </ul>
      </section>

      <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Nuxt (SSR)</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Для серверного рендеринга с Nuxt 3/4 см. раздел{' '}
          <a href="/docs/nuxt" className="text-green-600 hover:underline">Nuxt (SSR)</a>.
          Живые примеры —{' '}
          <a href="https://github.com/mushket-co/block-builder/tree/master/examples/nuxt3" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">examples/nuxt3</a>
          {' '}и{' '}
          <a href="https://github.com/mushket-co/block-builder/tree/master/examples/nuxt4" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">examples/nuxt4</a>
          {' '}в репозитории block-builder (не в demo-bb).
        </p>
      </section>
    </div>
  );
}

