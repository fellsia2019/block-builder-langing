'use client';

import CodeBlock from '@/components/CodeBlock';
import type { NavigationProps } from '../../types';

function EventCard({ 
  name, 
  description, 
  payload,
  example 
}: { 
  name: string; 
  description: string;
  payload?: string;
  example?: string;
}) {
  return (
    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
        <code className="text-purple-700 dark:text-purple-400">@{name}</code>
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>
      {payload && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Payload:</p>
          <code className="text-xs text-purple-700 dark:text-purple-400">{payload}</code>
        </div>
      )}
      {example && (
        <CodeBlock code={example} language="javascript" className="text-xs mt-3" />
      )}
    </div>
  );
}

export default function EventsSection({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">События</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          События компонента BlockBuilderComponent для отслеживания изменений блоков
        </p>
      </div>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Общее использование</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Все события используются через директиву <code className="text-blue-700 dark:text-blue-400">@</code> в Vue:
        </p>
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

// Обработчики событий
const handleBlockAdded = (block) => {
  // block - объект созданного блока
}

const handleBlockUpdated = (block) => {
  // block - объект обновленного блока
}

const handleBlockDeleted = (blockId) => {
  // blockId - ID удаленного блока
}

// Переупорядочивание: отслеживайте через onSave или blockManagementUseCase
</script>`}
          language="vue"
          className="mb-4"
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Доступные события</h2>
        <div className="space-y-4">
          <EventCard 
            name="block-added" 
            description="Срабатывает сразу после создания нового блока пользователем"
            payload="block: IBlock - объект созданного блока"
            example={`// Обработчик события
const handleBlockAdded = (block) => {
  console.log('Создан блок:', block)
  
  // Пример: сохранить на сервер
  fetch('/api/blocks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(block)
  })
  
  // Пример: показать уведомление
  showNotification('Блок "' + block.type + '" создан')
}`}
          />
          
          <EventCard 
            name="block-updated" 
            description="Срабатывает при изменении props, settings или других свойств блока"
            payload="block: IBlock - объект обновленного блока"
            example={`// Обработчик события
const handleBlockUpdated = (block) => {
  console.log('Обновлен блок:', block)
  
  // Пример: синхронизация с сервером
  fetch('/api/blocks/' + block.id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(block)
  })
  
  // Пример: автосохранение
  debouncedSave(block)
}`}
          />
          
          <EventCard 
            name="block-deleted" 
            description="Срабатывает после удаления блока пользователем"
            payload="blockId: string - ID удаленного блока"
            example={`// Обработчик события
const handleBlockDeleted = (blockId) => {
  console.log('Удален блок:', blockId)
  
  // Пример: удаление на сервере
  fetch('/api/blocks/' + blockId, {
    method: 'DELETE'
  })
  
  // Пример: показ подтверждения
  showConfirmation('Блок удален')
}`}
          />
          
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Практические примеры</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Синхронизация с бэкендом</h3>
          <CodeBlock
            code={`<template>
  <BlockBuilderComponent 
    :config="config"
    @block-added="syncToBackend"
    @block-updated="syncToBackend"
    @block-deleted="removeFromBackend"
  />
</template>

<script setup>
import { BlockBuilderComponent } from '@mushket-co/block-builder/vue'
import { ref } from 'vue'

const isLoading = ref(false)

const syncToBackend = async (block) => {
  isLoading.value = true
  try {
    const response = await fetch('/api/blocks/' + block.id, {
      method: block.id.startsWith('temp-') ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(block)
    })
    
    if (!response.ok) throw new Error('Ошибка синхронизации')
    
    const savedBlock = await response.json()
    console.log('Синхронизировано:', savedBlock)
  } catch (error) {
    console.error('Ошибка:', error)
    alert('Не удалось сохранить блок')
  } finally {
    isLoading.value = false
  }
}

const removeFromBackend = async (blockId) => {
  try {
    await fetch('/api/blocks/' + blockId, {
      method: 'DELETE'
    })
    console.log('Блок удален с сервера')
  } catch (error) {
    console.error('Ошибка удаления:', error)
  }
}
</script>`}
            language="vue"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Автосохранение с debounce</h3>
          <CodeBlock
            code={`<script setup>
import { ref } from 'vue'
import { BlockBuilderComponent } from '@mushket-co/block-builder/vue'

const pendingBlocks = ref([])
let saveTimer = null

const handleBlockUpdated = (block) => {
  // Добавляем в очередь сохранения
  const index = pendingBlocks.value.findIndex(b => b.id === block.id)
  if (index >= 0) {
    pendingBlocks.value[index] = block
  } else {
    pendingBlocks.value.push(block)
  }
  
  // Отменяем предыдущий таймер
  if (saveTimer) {
    clearTimeout(saveTimer)
  }
  
  // Устанавливаем новый таймер (сохранение через 2 секунды после последнего изменения)
  saveTimer = setTimeout(() => {
    savePendingBlocks()
  }, 2000)
}

const savePendingBlocks = async () => {
  if (pendingBlocks.value.length === 0) return
  
  try {
    await fetch('/api/blocks/batch', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blocks: pendingBlocks.value })
    })
    
    console.log('Сохранено ' + pendingBlocks.value.length + ' блоков')
    pendingBlocks.value = []
  } catch (error) {
    console.error('Ошибка автосохранения:', error)
  }
}
</script>`}
            language="vue"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Аналитика и логирование</h3>
          <CodeBlock
            code={`<script setup>
import { BlockBuilderComponent } from '@mushket-co/block-builder/vue'

// Отслеживание действий пользователя
const handleBlockAdded = (block) => {
  // Google Analytics
  gtag('event', 'block_created', {
    block_type: block.type,
    event_category: 'block_builder'
  })
  
  // Логирование в вашу систему
  logUserAction({
    action: 'create_block',
    blockType: block.type,
    timestamp: Date.now()
  })
}

const handleBlockUpdated = (block) => {
  // Отслеживание изменений
  gtag('event', 'block_updated', {
    block_type: block.type,
    event_category: 'block_builder'
  })
}

const handleBlockDeleted = (blockId) => {
  gtag('event', 'block_deleted', {
    event_category: 'block_builder'
  })
}
</script>`}
            language="vue"
            className="mb-4"
          />
        </div>
      </section>

      <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-4 border-green-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">💡 Советы</h2>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>Используйте <code className="text-green-700 dark:text-green-400">debounce</code> для автосохранения, чтобы не перегружать сервер запросами</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>Для оптимизации можно использовать batch-сохранение нескольких блоков одновременно</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>Обрабатывайте ошибки при сохранении и показывайте пользователю уведомления</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>События срабатывают синхронно с действиями пользователя, используйте их для валидации</span>
          </li>
        </ul>
      </section>
    </div>
  );
}

