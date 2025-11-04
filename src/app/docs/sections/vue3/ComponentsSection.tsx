'use client';

import CodeBlock from '@/components/CodeBlock';
import Icon from '@/components/Icon';
import type { NavigationProps } from '../../types';

export default function ComponentsSection({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Компоненты</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Vue3 компоненты BlockBuilder и их API
        </p>
      </div>

      <section className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border-l-4 border-purple-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-purple-700 dark:text-purple-400">BlockBuilderComponent</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Основной компонент для работы с BlockBuilder в Vue3. Предоставляет готовый UI для управления блоками с drag-and-drop, редактированием и удалением.
        </p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Импорт</h3>
          <CodeBlock
            code={`import { BlockBuilderComponent } from '@mushket-co/block-builder/vue'`}
            language="javascript"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Props</h3>
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
                <code className="text-purple-700 dark:text-purple-400">config</code>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">Object, required</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Конфигурация BlockBuilder с типами блоков и настройками
              </p>
              <CodeBlock
                code={`{
  availableBlockTypes?: Array<IBlockType>,  // Массив типов блоков
}`}
                language="typescript"
                className="mb-2 text-xs"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                <strong>IBlockType:</strong>
              </p>
              <CodeBlock
                code={`{
  type: string,                    // Уникальный тип блока (обязательно)
  label: string,                   // Отображаемое название (обязательно)
  title?: string,                  // Заголовок блока
  icon?: string,                   // Иконка блока
  render?: {                       // Конфигурация рендеринга
    kind: 'component' | 'html',
    framework?: 'vue',
    component?: Component,         // Vue компонент (для kind: 'component')
    template?: string | Function    // HTML шаблон (для kind: 'html')
  },
  defaultSettings?: Record<string, any>,  // Настройки по умолчанию
  defaultProps?: Record<string, any>,      // Свойства по умолчанию
  fields?: Array<IFormFieldConfig>,       // Поля формы редактирования
  spacingOptions?: {                      // Опции для spacing (опционально)
    enabled?: boolean,
    config?: { breakpoints?: Array<IBreakpoint> }
  }
}`}
                language="typescript"
                className="mb-2 text-xs"
              />
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
                <code className="text-purple-700 dark:text-purple-400">blockManagementUseCase</code>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">BlockManagementUseCase, required</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Экземпляр use case для управления блоками. Создаётся через <code className="text-purple-700 dark:text-purple-400">createBlockManagementUseCase()</code>
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
                <code className="text-purple-700 dark:text-purple-400">apiSelectUseCase</code>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">ApiSelectUseCase, optional</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Экземпляр use case для работы с API select полями (требуется для PRO версии)
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
                <code className="text-purple-700 dark:text-purple-400">customFieldRendererRegistry</code>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">ICustomFieldRendererRegistry, optional</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Реестр кастомных рендереров полей (требуется для PRO версии)
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
                <code className="text-purple-700 dark:text-purple-400">initialBlocks</code>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">Array, optional</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Массив начальных блоков для загрузки при инициализации
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
                <code className="text-purple-700 dark:text-purple-400">onSave</code>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">Function, optional</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Callback функция для сохранения блоков (например, отправка на сервер)
              </p>
              <CodeBlock
                code={`onSave: async (blocks) => {
  // Сохранить блоки на сервер
  await fetch('/api/blocks', {
    method: 'POST',
    body: JSON.stringify(blocks)
  })
  return true // или false в случае ошибки
}`}
                language="javascript"
                className="mb-2 text-xs"
              />
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
                <code className="text-purple-700 dark:text-purple-400">isEdit</code>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">Boolean, optional, default: true</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Режим редактирования. Если <code className="text-purple-700 dark:text-purple-400">false</code>, все контролы редактирования скрываются, остаётся только пользовательская верстка блоков в обёртке BlockBuilder.
              </p>
              <CodeBlock
                code={`// Режим редактирования (по умолчанию)
<BlockBuilderComponent :config="config" :isEdit="true" />

// Режим только просмотра
<BlockBuilderComponent :config="config" :isEdit="false" />`}
                language="vue"
                className="mb-2 text-xs"
              />
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
                <code className="text-purple-700 dark:text-purple-400">controlsContainerClass</code>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">String, optional</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Кастомный CSS класс для контейнера контролов (кнопки и статистика)
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
                <code className="text-purple-700 dark:text-purple-400">controlsFixedPosition</code>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">'top' | 'bottom', optional</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Фиксирует панель управления (кнопки + статистика) сверху или снизу экрана
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
                <code className="text-purple-700 dark:text-purple-400">controlsOffset</code>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">Number, optional</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Отступ от края в пикселях (по умолчанию 0)
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
                <code className="text-purple-700 dark:text-purple-400">controlsOffsetVar</code>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">String, optional</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                CSS переменная для учета высоты шапки/футера (например: <code className="text-purple-700 dark:text-purple-400">'--header-height'</code>)
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
                <code className="text-purple-700 dark:text-purple-400">licenseKey</code>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">String, optional</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Лицензионный ключ для проверки (для обратной совместимости). Рекомендуется использовать <code className="text-purple-700 dark:text-purple-400">licenseService</code>
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
                <code className="text-purple-700 dark:text-purple-400">licenseService</code>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">LicenseService, optional</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Сервис лицензии для управления PRO/FREE режимами
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
                <code className="text-purple-700 dark:text-purple-400">licenseInfo</code>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">Object, optional</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Информация о лицензии: <code className="text-purple-700 dark:text-purple-400">{'{ isPro: boolean, maxBlockTypes: number, currentTypesCount: number }'}</code>
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Events (События)</h3>
          <div className="space-y-2 text-sm">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-200 dark:border-slate-700">
              <code className="text-purple-700 dark:text-purple-400">@block-created</code>
              <span className="text-gray-600 dark:text-gray-400 ml-2">- Вызывается при создании нового блока</span>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-200 dark:border-slate-700">
              <code className="text-purple-700 dark:text-purple-400">@block-updated</code>
              <span className="text-gray-600 dark:text-gray-400 ml-2">- Вызывается при обновлении блока</span>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-200 dark:border-slate-700">
              <code className="text-purple-700 dark:text-purple-400">@block-deleted</code>
              <span className="text-gray-600 dark:text-gray-400 ml-2">- Вызывается при удалении блока</span>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-200 dark:border-slate-700">
              <code className="text-purple-700 dark:text-purple-400">@block-reordered</code>
              <span className="text-gray-600 dark:text-gray-400 ml-2">- Вызывается при изменении порядка блоков</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Базовое использование</h3>
          <CodeBlock
            code={`<template>
  <BlockBuilderComponent 
    :config="config"
    :initialBlocks="initialBlocks"
    @block-created="handleBlockCreated"
    @block-updated="handleBlockUpdated"
    @block-deleted="handleBlockDeleted"
    @block-reordered="handleBlockReordered"
  />
</template>

<script setup>
import { ref } from 'vue'
import { BlockBuilderComponent } from '@mushket-co/block-builder/vue'

const config = {
  availableBlockTypes: [
    // ваша конфигурация типов блоков
  ]
}

const initialBlocks = ref([
  {
    id: 'block-1',
    type: 'text',
    props: { content: 'Начальный контент' },
    settings: {}
  }
])

const handleBlockCreated = (block) => {
  console.log('Создан:', block)
}

const handleBlockUpdated = (block) => {
  console.log('Обновлен:', block)
}

const handleBlockDeleted = (blockId) => {
  console.log('Удален:', blockId)
}

const handleBlockReordered = (blocks) => {
  console.log('Новый порядок:', blocks)
}
</script>`}
            language="vue"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">С сохранением на сервер</h3>
          <CodeBlock
            code={`<template>
  <BlockBuilderComponent 
    :config="config"
    :initialBlocks="initialBlocks"
    :onSave="saveBlocks"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { BlockBuilderComponent } from '@mushket-co/block-builder/vue'

const config = {
  availableBlockTypes: [
    // ваша конфигурация
  ]
}

const initialBlocks = ref([])

// Загрузка сохраненных блоков с сервера при инициализации
const loadBlocks = async () => {
  try {
    const response = await fetch('/api/blocks/load', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      const data = await response.json()
      initialBlocks.value = data.blocks || []
    }
  } catch (error) {
    console.error('Ошибка загрузки блоков:', error)
    initialBlocks.value = []
  }
}

// Сохранение блоков на сервер
const saveBlocks = async (blocks) => {
  try {
    const response = await fetch('/api/blocks/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ blocks })
    })
    
    if (!response.ok) {
      throw new Error('Ошибка сохранения')
    }
    
    return true
  } catch (error) {
    console.error('Ошибка:', error)
    return false
  }
}

// Загружаем блоки при монтировании компонента
onMounted(() => {
  loadBlocks()
})
</script>`}
            language="vue"
            className="mb-4"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ваши компоненты блоков</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Каждый тип блока использует ваш Vue компонент для рендеринга. Компонент получает объект <code className="text-purple-700 dark:text-purple-400">block</code> с полной информацией о блоке.
        </p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Структура объекта block</h3>
          <CodeBlock
            code={`{
  id: string,
  type: string,
  props: {
    /* Ваши кастомные props */
    spacing?: {
      /* Опционально: spacing данные */
      'padding-top': { 'desktop': '20px' },
      'margin-bottom': { 'mobile': '10px' }
    }
  },
  settings: {
    /* Метаданные и настройки */
  }
}`}
            language="javascript"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Пример компонента блока</h3>
          <CodeBlock
            code={`<!-- components/HeroBlock.vue -->
<template>
  <section 
    class="hero-block"
  >
    <div class="container">
      <h1>{{ block.props.title }}</h1>
      <p>{{ block.props.subtitle }}</p>
      <button v-if="block.props.buttonText" @click="handleClick">
        {{ block.props.buttonText }}
      </button>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const handleClick = () => {
  if (props.block.props.buttonUrl) {
    window.location.href = props.block.props.buttonUrl
  }
}
</script>

<style scoped>
.hero-block {
  /* Используем CSS переменные для padding из spacing */
  padding-top: var(--spacing-padding-top, 4rem);
  padding-bottom: var(--spacing-padding-bottom, 4rem);
  /* margin применяется автоматически через inline стили */
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
</style>`}
            language="vue"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Пример компонента с изображением</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            При использовании поля <code className="text-purple-700 dark:text-purple-400">type: 'image'</code> в компоненте нужно обрабатывать как строку (base64), так и объект (серверная загрузка):
          </p>
          <CodeBlock
            code={`<!-- components/ImageBlock.vue -->
<template>
  <div class="image-block">
    <img 
      :src="imageUrl" 
      :alt="block.props.alt || 'Image'" 
      :style="{ width: block.props.width + '%' }"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

// Автоматическое извлечение URL из строки или объекта
const imageUrl = computed(() => {
  const image = props.block.props.image
  if (typeof image === 'string') {
    return image // base64 строка
  }
  if (typeof image === 'object' && image !== null) {
    return image.src || '' // объект с полем src
  }
  return ''
})
</script>

<style scoped>
.image-block {
  padding-top: var(--spacing-padding-top, 1rem);
  padding-bottom: var(--spacing-padding-bottom, 1rem);
}
</style>`}
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
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
            <Icon name="lightbulb" size={20} className="text-blue-600 dark:text-blue-400" />
            Важно
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Компонент должен принимать prop <code className="text-blue-700 dark:text-blue-400">block</code></span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Spacing применяется автоматически: margin через inline стили, padding через CSS переменные (<code className="text-blue-700 dark:text-blue-400">--spacing-padding-top</code>, <code className="text-blue-700 dark:text-blue-400">--spacing-padding-bottom</code> и т.д.)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Все кастомные props доступны через <code className="text-blue-700 dark:text-blue-400">block.props</code></span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Компонент должен быть реактивным - изменения в props автоматически обновляют блок</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

