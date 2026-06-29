'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import CodeBlock from '@/components/CodeBlock';
import { docRichTags, renderDocRichString } from '../../components/docRichTags';
import type { NavigationProps } from '../../types';

function EventCard({
  name,
  description,
  payload,
  example,
  payloadLabel,
}: {
  name: string;
  description: string;
  payload?: string;
  example?: string;
  payloadLabel: string;
}) {
  return (
    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
        <code className="text-purple-700 dark:text-purple-400">@{name}</code>
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>
      {payload && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">{payloadLabel}</p>
          <code className="text-xs text-purple-700 dark:text-purple-400">{payload}</code>
        </div>
      )}
      {example && <CodeBlock code={example} language="javascript" className="text-xs mt-3" />}
    </div>
  );
}

export default function EventsSection(_props: NavigationProps) {
  const t = useTranslations('docsPages.vue3.events');
  const tCommon = useTranslations('docsPages.common');

  const blockAddedExample = useMemo(
    () => `// ${t('code.eventHandlerComment')}
const handleBlockAdded = (block) => {
  console.log('${t('code.blockAdded.logCreated')}', block)
  
  // ${t('code.blockAdded.saveExampleComment')}
  fetch('/api/blocks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(block)
  })
  
  // ${t('code.blockAdded.notificationExampleComment')}
  showNotification('${t('code.blockAdded.notificationPrefix')}' + block.type + '${t('code.blockAdded.notificationSuffix')}')
}`,
    [t],
  );

  const blockUpdatedExample = useMemo(
    () => `// ${t('code.eventHandlerComment')}
const handleBlockUpdated = (block) => {
  console.log('${t('code.blockUpdated.logUpdated')}', block)
  
  // ${t('code.blockUpdated.syncExampleComment')}
  fetch('/api/blocks/' + block.id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(block)
  })
  
  // ${t('code.blockUpdated.autosaveExampleComment')}
  debouncedSave(block)
}`,
    [t],
  );

  const blockDeletedExample = useMemo(
    () => `// ${t('code.eventHandlerComment')}
const handleBlockDeleted = (blockId) => {
  console.log('${t('code.blockDeleted.logDeleted')}', blockId)
  
  // ${t('code.blockDeleted.deleteExampleComment')}
  fetch('/api/blocks/' + blockId, {
    method: 'DELETE'
  })
  
  // ${t('code.blockDeleted.confirmationExampleComment')}
  showConfirmation('${t('code.blockDeleted.confirmationMessage')}')
}`,
    [t],
  );

  const generalUsageCode = useMemo(
    () => `<template>
  <BlockBuilderComponent 
    :config="config"
    @block-added="handleBlockAdded"
    @block-updated="handleBlockUpdated"
    @block-deleted="handleBlockDeleted"
  />
</template>

<script setup>
import { BlockBuilderComponent } from '@mushket-co/block-builder/vue'

// ${t('code.eventHandlersComment')}
const handleBlockAdded = (block) => {
  // ${t('code.blockCreatedComment')}
}

const handleBlockUpdated = (block) => {
  // ${t('code.blockUpdatedComment')}
}

const handleBlockDeleted = (blockId) => {
  // ${t('code.blockIdDeletedComment')}
}

// ${t('reorderNote')}
</script>`,
    [t],
  );

  const syncBackendCode = useMemo(
    () => `<template>
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
    
    if (!response.ok) throw new Error('${t('code.syncError')}')
    
    const savedBlock = await response.json()
    console.log('${t('code.synced')}', savedBlock)
  } catch (error) {
    console.error('${t('code.genericError')}', error)
    alert('${t('code.saveFailedAlert')}')
  } finally {
    isLoading.value = false
  }
}

const removeFromBackend = async (blockId) => {
  try {
    await fetch('/api/blocks/' + blockId, {
      method: 'DELETE'
    })
    console.log('${t('code.deletedFromServer')}')
  } catch (error) {
    console.error('${t('code.deleteError')}', error)
  }
}
</script>`,
    [t],
  );

  const autosaveCode = useMemo(
    () => `<script setup>
import { ref } from 'vue'
import { BlockBuilderComponent } from '@mushket-co/block-builder/vue'

const pendingBlocks = ref([])
let saveTimer = null

const handleBlockUpdated = (block) => {
  const index = pendingBlocks.value.findIndex(b => b.id === block.id)
  if (index >= 0) {
    pendingBlocks.value[index] = block
  } else {
    pendingBlocks.value.push(block)
  }
  
  if (saveTimer) {
    clearTimeout(saveTimer)
  }
  
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
    
    console.log('${t('code.savedBlocksCount')} ' + pendingBlocks.value.length + ' ${t('code.blocksWord')}')
    pendingBlocks.value = []
  } catch (error) {
    console.error('${t('code.autosaveError')}', error)
  }
}
</script>`,
    [t],
  );

  const eventCards = [
    {
      name: 'block-added',
      key: 'blockAdded' as const,
      example: blockAddedExample,
    },
    {
      name: 'block-updated',
      key: 'blockUpdated' as const,
      example: blockUpdatedExample,
    },
    {
      name: 'block-deleted',
      key: 'blockDeleted' as const,
      example: blockDeletedExample,
    },
  ];

  const tipItems = t.raw('tips.items') as string[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
      </div>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{tCommon('generalUsage')}</h2>
        <CodeBlock
          code={generalUsageCode}
          language="vue"
          className="mb-4"
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{tCommon('availableEvents')}</h2>
        <div className="space-y-4">
          {eventCards.map(({ name, key, example }) => (
            <EventCard
              key={name}
              name={name}
              description={t(`cards.${key}.description`)}
              payload={t(`cards.${key}.payload`)}
              example={example}
              payloadLabel={tCommon('payload')}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{tCommon('practicalExamples')}</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('syncWithBackend')}</h3>
          <CodeBlock
            code={syncBackendCode}
            language="vue"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('autosaveDebounce')}</h3>
          <CodeBlock
            code={autosaveCode}
            language="vue"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('analyticsLogging')}</h3>
          <CodeBlock
            code={`<script setup>
import { BlockBuilderComponent } from '@mushket-co/block-builder/vue'

const handleBlockAdded = (block) => {
  gtag('event', 'block_created', {
    block_type: block.type,
    event_category: 'block_builder'
  })
  
  logUserAction({
    action: 'create_block',
    blockType: block.type,
    timestamp: Date.now()
  })
}

const handleBlockUpdated = (block) => {
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
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('tips.title')}</h2>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {tipItems.map((_, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>{renderDocRichString(t.raw(`tips.items.${index}`) as string, docRichTags)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
