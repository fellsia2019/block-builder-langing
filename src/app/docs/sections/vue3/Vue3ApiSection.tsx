'use client';

import CodeBlock from '@/components/CodeBlock';
import Icon from '@/components/Icon';
import type { NavigationProps } from '../../types';

export default function Vue3ApiSection({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">API в Vue3</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Использование Core API напрямую в Vue3 для программного управления блоками
        </p>
      </div>

      <section className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border-l-4 border-purple-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Когда использовать Core API?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Используйте Core API напрямую, если вам нужно:
        </p>
        <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-4">
          <li className="flex items-start">
            <span className="text-purple-500 mr-2">•</span>
            <span>Полный контроль над UI и логикой работы с блоками</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-500 mr-2">•</span>
            <span>Интеграция с существующими Vue компонентами без использования BlockBuilderComponent</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-500 mr-2">•</span>
            <span>Создание кастомного UI для управления блоками</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-500 mr-2">•</span>
            <span>Работа с блоками только через программный API</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Инициализация</h2>
        <CodeBlock
          code={`<script setup>
import { onMounted, ref } from 'vue'
import { BlockBuilder } from '@mushket-co/block-builder/core'

const blockBuilder = ref(null)

onMounted(() => {
  blockBuilder.value = new BlockBuilder({
    blockConfigs: blockConfigs
  })
})
</script>`}
          language="vue"
          className="mb-4"
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Основные методы API</h2>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              <code className="text-purple-700 dark:text-purple-400">createBlock()</code>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Создает новый блок указанного типа
            </p>
            <CodeBlock
              code={`const createBlock = async () => {
  const block = await blockBuilder.value.createBlock({
    type: 'text',
    props: { 
      content: 'Привет, мир!',
      textAlign: 'center'
    },
    settings: {
      visible: true
    }
  })
  
  console.log('Создан блок:', block)
  // Результат: объект с полями id, type, props, settings
}`}
              language="javascript"
              className="mb-2"
            />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              <code className="text-purple-700 dark:text-purple-400">getAllBlocks()</code>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Получает все существующие блоки
            </p>
            <CodeBlock
              code={`const getAllBlocks = async () => {
  const blocks = await blockBuilder.value.getAllBlocks()
  
  console.log('Все блоки:', blocks)
  // Результат: массив объектов блоков
  
  return blocks
}`}
              language="javascript"
              className="mb-2"
            />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              <code className="text-purple-700 dark:text-purple-400">getBlockById()</code>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Получает блок по его ID
            </p>
            <CodeBlock
              code={`const getBlock = async (blockId) => {
  const block = await blockBuilder.value.getBlockById(blockId)
  
  if (block) {
    console.log('Найден блок:', block)
  } else {
    console.log('Блок не найден')
  }
  
  return block
}`}
              language="javascript"
              className="mb-2"
            />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              <code className="text-purple-700 dark:text-purple-400">updateBlock()</code>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Обновляет существующий блок
            </p>
            <CodeBlock
              code={`const updateBlock = async (blockId) => {
  const updated = await blockBuilder.value.updateBlock(blockId, {
    props: {
      content: 'Обновленный контент',
      textAlign: 'left'
    },
    settings: {
      visible: false
    }
  })
  
  console.log('Блок обновлен:', updated)
  return updated
}`}
              language="javascript"
              className="mb-2"
            />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              <code className="text-purple-700 dark:text-purple-400">deleteBlock()</code>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Удаляет блок по ID
            </p>
            <CodeBlock
              code={`const deleteBlock = async (blockId) => {
  const deleted = await blockBuilder.value.deleteBlock(blockId)
  
  if (deleted) {
    console.log('Блок удален:', blockId)
  } else {
    console.log('Не удалось удалить блок')
  }
  
  return deleted
}`}
              language="javascript"
              className="mb-2"
            />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              <code className="text-purple-700 dark:text-purple-400">reorderBlocks()</code>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Изменяет порядок блоков
            </p>
            <CodeBlock
              code={`const reorderBlocks = async (newOrder) => {
  // newOrder - массив ID блоков в нужном порядке
  const reordered = await blockBuilder.value.reorderBlocks([
    'block-3',
    'block-1',
    'block-2'
  ])
  
  console.log('Блоки переупорядочены:', reordered)
  return reordered
}`}
              language="javascript"
              className="mb-2"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Полный пример использования</h2>
        <CodeBlock
          code={`<template>
  <div class="block-manager">
    <button @click="handleCreateBlock">Создать блок</button>
    <button @click="handleLoadBlocks">Загрузить все блоки</button>
    
    <div v-for="block in blocks" :key="block.id" class="block-item">
      <h3>{{ block.type }}</h3>
      <button @click="handleUpdateBlock(block.id)">Обновить</button>
      <button @click="handleDeleteBlock(block.id)">Удалить</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { BlockBuilder } from '@mushket-co/block-builder/core'

const blockBuilder = ref(null)
const blocks = ref([])

const blockConfigs = [
  {
    type: 'text',
    label: 'Текстовый блок',
    fields: [
      {
        name: 'content',
        label: 'Содержимое',
        type: 'text',
        required: true
      }
    ]
  }
]

onMounted(() => {
  blockBuilder.value = new BlockBuilder({
    blockConfigs: blockConfigs
  })
  
  // Загружаем существующие блоки
  loadBlocks()
})

const loadBlocks = async () => {
  if (!blockBuilder.value) return
  
  blocks.value = await blockBuilder.value.getAllBlocks()
}

const handleCreateBlock = async () => {
  if (!blockBuilder.value) return
  
  const newBlock = await blockBuilder.value.createBlock({
    type: 'text',
    props: {
      content: 'Новый текст'
    }
  })
  
  blocks.value.push(newBlock)
  console.log('Создан блок:', newBlock)
}

const handleUpdateBlock = async (blockId) => {
  if (!blockBuilder.value) return
  
  const updated = await blockBuilder.value.updateBlock(blockId, {
    props: {
      content: 'Обновленный текст'
    }
  })
  
  // Обновляем в локальном массиве
  const index = blocks.value.findIndex(b => b.id === blockId)
  if (index >= 0) {
    blocks.value[index] = updated
  }
}

const handleDeleteBlock = async (blockId) => {
  if (!blockBuilder.value) return
  
  const deleted = await blockBuilder.value.deleteBlock(blockId)
  
  if (deleted) {
    blocks.value = blocks.value.filter(b => b.id !== blockId)
    console.log('Блок удален')
  }
}
</script>`}
          language="vue"
          className="mb-4"
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Дополнительные методы</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
            <h3 className="font-bold mb-2 text-gray-900 dark:text-white">
              <code className="text-purple-700 dark:text-purple-400">getAvailableBlockTypes()</code>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Получить список доступных типов блоков
            </p>
            <CodeBlock
              code={`const types = blockBuilder.value.getAvailableBlockTypes()
console.log('Доступные типы:', types)`}
              language="javascript"
              className="text-xs"
            />
          </div>

          <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
            <h3 className="font-bold mb-2 text-gray-900 dark:text-white">
              <code className="text-purple-700 dark:text-purple-400">clearAllBlocks()</code>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Удалить все блоки
            </p>
            <CodeBlock
              code={`await blockBuilder.value.clearAllBlocks()
blocks.value = []`}
              language="javascript"
              className="text-xs"
            />
          </div>

        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Режим редактирования/просмотра</h2>
        
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-4 border-green-500 mb-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            BlockBuilder поддерживает два режима работы: <strong>режим редактирования</strong> (по умолчанию) 
            и <strong>режим просмотра</strong>. В режиме просмотра все кнопки редактирования, добавления и управления блоками скрываются.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              <code className="text-purple-700 dark:text-purple-400">Инициализация с режимом просмотра</code>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              При создании экземпляра BlockBuilder можно указать режим работы:
            </p>
            <CodeBlock
              code={`onMounted(() => {
  blockBuilder.value = new BlockBuilder({
    blockConfigs: blockConfigs,
    isEdit: false // режим только просмотра
  })
})`}
              language="javascript"
              className="mb-2"
            />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              <code className="text-purple-700 dark:text-purple-400">Динамическое переключение режима</code>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Используйте методы BlockBuilderFacade для переключения режима во время работы:
            </p>
            <CodeBlock
              code={`<script setup>
import { ref } from 'vue'
import { BlockBuilderFactory } from '@mushket-co/block-builder'

const facade = ref(null)

onMounted(() => {
  facade.value = BlockBuilderFactory.create({
    blockConfigs: blockConfigs,
    isEdit: true // режим редактирования
  })
})

// Переключить в режим просмотра
const switchToViewMode = () => {
  facade.value?.setIsEdit(false)
}

// Переключить в режим редактирования
const switchToEditMode = () => {
  facade.value?.setIsEdit(true)
}

// Проверить текущий режим
const checkMode = () => {
  const isEdit = facade.value?.getIsEdit()
  console.log('Текущий режим:', isEdit ? 'редактирование' : 'просмотр')
}
</script>`}
              language="vue"
              className="mb-2"
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">CSS класс для кастомизации</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              При изменении режима на элемент <code className="text-blue-700 dark:text-blue-400">body</code> автоматически добавляется/удаляется CSS класс <code className="text-blue-700 dark:text-blue-400">bb-is-edit-mode</code>. 
              Это позволяет кастомизировать стили в зависимости от режима:
            </p>
            <CodeBlock
              code={`/* Скрыть элементы только в режиме просмотра */
body:not(.bb-is-edit-mode) .edit-controls {
  display: none;
}

/* Показать дополнительные элементы в режиме просмотра */
body:not(.bb-is-edit-mode) .view-only-info {
  display: block;
}`}
              language="css"
              className="mb-2 text-xs"
            />
          </div>
        </div>
      </section>

      <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border-l-4 border-yellow-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="warning" size={24} className="text-yellow-600 dark:text-yellow-400" />
          Важно
        </h2>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">•</span>
            <span>Все методы API возвращают Promise, используйте <code className="text-yellow-700 dark:text-yellow-400">await</code> или <code className="text-yellow-700 dark:text-yellow-400">.then()</code></span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">•</span>
            <span>BlockBuilder должен быть инициализирован в <code className="text-yellow-700 dark:text-yellow-400">onMounted()</code>, чтобы избежать проблем с DOM</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">•</span>
            <span>Используйте <code className="text-yellow-700 dark:text-yellow-400">ref()</code> для хранения экземпляра BlockBuilder, чтобы он был реактивным</span>
          </li>
            <li className="flex items-start">
            <span className="text-yellow-500 mr-2">•</span>
            <span>Для управления UI вручную используйте <code className="text-yellow-700 dark:text-yellow-400">autoInit: false</code> в опциях (для core версии не передавайте <code className="text-yellow-700 dark:text-yellow-400">containerId</code>)</span>
          </li>
        </ul>
      </section>
    </div>
  );
}

