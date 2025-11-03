'use client';

import NextPageLink from '../../components/NextPageLink';
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
    containerId: 'my-app',
    blockConfigs: blockConfigs,
    storage: 'localStorage',
    autoRender: false
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
    containerId: 'my-app',
    blockConfigs: blockConfigs,
    storage: 'localStorage',
    autoRender: false
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

          <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
            <h3 className="font-bold mb-2 text-gray-900 dark:text-white">
              <code className="text-purple-700 dark:text-purple-400">saveBlocks()</code>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Сохранить все блоки в storage
            </p>
            <CodeBlock
              code={`await blockBuilder.value.saveBlocks()
console.log('Блоки сохранены')`}
              language="javascript"
              className="text-xs"
            />
          </div>

          <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
            <h3 className="font-bold mb-2 text-gray-900 dark:text-white">
              <code className="text-purple-700 dark:text-purple-400">loadBlocks()</code>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Загрузить блоки из storage
            </p>
            <CodeBlock
              code={`await blockBuilder.value.loadBlocks()
// Затем перезагрузите UI
await loadBlocks()`}
              language="javascript"
              className="text-xs"
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
            <span>Для управления UI вручную установите <code className="text-yellow-700 dark:text-yellow-400">autoRender: false</code></span>
          </li>
        </ul>
      </section>

      <NextPageLink nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} color="purple" />
    </div>
  );
}

