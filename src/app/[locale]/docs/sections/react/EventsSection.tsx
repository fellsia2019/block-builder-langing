'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import CodeBlock from '@/components/CodeBlock';
import { docRichTags, renderDocRichString } from '../../components/docRichTags';
import type { NavigationProps } from '../../types';

function CallbackCard({
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
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
        <code className="text-blue-700 dark:text-blue-400">{name}</code>
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>
      {payload ? (
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">{payloadLabel}</p>
          <code className="text-xs text-blue-700 dark:text-blue-400">{payload}</code>
        </div>
      ) : null}
      {example ? <CodeBlock code={example} language="tsx" className="text-xs mt-3" /> : null}
    </div>
  );
}

export default function ReactEventsSection(_props: NavigationProps) {
  const t = useTranslations('docsPages.react.events');
  const tCommon = useTranslations('docsPages.common');

  const onBlockAddedExample = useMemo(
    () => `const handleBlockAdded = (block: IBlock) => {
  console.log('${t('code.onBlockAdded.logCreated')}', block)

  fetch('/api/blocks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(block),
  })

  toast.success(\`${t('code.onBlockAdded.notificationPrefix')}\${block.type}${t('code.onBlockAdded.notificationSuffix')}\`)
}`,
    [t],
  );

  const onBlockUpdatedExample = useMemo(
    () => `const handleBlockUpdated = (block: IBlock) => {
  console.log('${t('code.onBlockUpdated.logUpdated')}', block)

  fetch(\`/api/blocks/\${block.id}\`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(block),
  })

  debouncedSave(block)
}`,
    [t],
  );

  const onBlockDeletedExample = useMemo(
    () => `const handleBlockDeleted = (blockId: TBlockId) => {
  console.log('${t('code.onBlockDeleted.logDeleted')}', blockId)

  fetch(\`/api/blocks/\${blockId}\`, { method: 'DELETE' })

  toast.info('${t('code.onBlockDeleted.toastMessage')}')
}`,
    [t],
  );

  const generalUsageCode = useMemo(
    () => `import {
  BlockBuilderComponent,
  createBlockManagementUseCase,
} from '@mushket-co/block-builder/react'

export function Editor() {
  const blockManagementUseCase = useMemo(() => createBlockManagementUseCase(), [])

  return (
    <BlockBuilderComponent
      config={{ availableBlockTypes }}
      blockManagementUseCase={blockManagementUseCase}
      onBlockAdded={(block) => {
        // ${t('code.blockCreatedComment')}
      }}
      onBlockUpdated={(block) => {
        // ${t('code.blockUpdatedComment')}
      }}
      onBlockDeleted={(blockId) => {
        // ${t('code.blockIdDeletedComment')}
      }}
    />
  )
}

// ${t('reorderNote')}`,
    [t],
  );

  const syncBackendCode = useMemo(
    () => `export function Editor() {
  const [isLoading, setIsLoading] = useState(false)
  const blockManagementUseCase = useMemo(() => createBlockManagementUseCase(), [])

  const syncToBackend = async (block: IBlock) => {
    setIsLoading(true)
    try {
      const response = await fetch(\`/api/blocks/\${block.id}\`, {
        method: block.id.startsWith('temp-') ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(block),
      })
      if (!response.ok) throw new Error('${t('code.syncError')}')
      console.log('${t('code.synced')}', await response.json())
    } catch (error) {
      console.error(error)
      alert('${t('code.saveFailedAlert')}')
    } finally {
      setIsLoading(false)
    }
  }

  const removeFromBackend = async (blockId: TBlockId) => {
    try {
      await fetch(\`/api/blocks/\${blockId}\`, { method: 'DELETE' })
    } catch (error) {
      console.error('${t('code.deleteError')}', error)
    }
  }

  return (
    <BlockBuilderComponent
      config={{ availableBlockTypes }}
      blockManagementUseCase={blockManagementUseCase}
      onBlockAdded={syncToBackend}
      onBlockUpdated={syncToBackend}
      onBlockDeleted={removeFromBackend}
    />
  )
}`,
    [t],
  );

  const callbackCards = [
    {
      name: 'onBlockAdded',
      key: 'onBlockAdded' as const,
      example: onBlockAddedExample,
    },
    {
      name: 'onBlockUpdated',
      key: 'onBlockUpdated' as const,
      example: onBlockUpdatedExample,
    },
    {
      name: 'onBlockDeleted',
      key: 'onBlockDeleted' as const,
      example: onBlockDeletedExample,
    },
  ];

  const tipItems = t.raw('tips.items') as string[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{renderDocRichString(t.raw('subtitle') as string, docRichTags)}</p>
      </div>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{tCommon('generalUsage')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('generalUsageIntro') as string, docRichTags)}</p>
        <CodeBlock
          language="tsx"
          code={generalUsageCode}
          className="mb-4"
        />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {renderDocRichString(t.raw('typesNote') as string, {
            iblock: (chunks) => (
              <Link href="/docs/core/types#iblock" className="text-primary-600 dark:text-primary-400 hover:underline">
                {chunks}
              </Link>
            ),
            tblockId: (chunks) => (
              <Link href="/docs/core/types#tblock-id" className="text-primary-600 dark:text-primary-400 hover:underline">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{tCommon('availableCallbacks')}</h2>
        <div className="space-y-4">
          {callbackCards.map(({ name, key, example }) => (
            <CallbackCard
              key={name}
              name={name}
              description={t(`cards.${key}.description`)}
              payload={t(`cards.${key}.payload`)}
              example={example}
              payloadLabel={tCommon('argument')}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{tCommon('practicalExamples')}</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('syncWithBackend')}</h3>
          <CodeBlock
            language="tsx"
            code={syncBackendCode}
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('autosaveDebounce')}</h3>
          <CodeBlock
            language="tsx"
            code={`const pendingRef = useRef<IBlock[]>([])
const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

const handleBlockUpdated = (block: IBlock) => {
  const list = pendingRef.current
  const index = list.findIndex((b) => b.id === block.id)
  if (index >= 0) list[index] = block
  else list.push(block)

  if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
  saveTimerRef.current = setTimeout(savePendingBlocks, 2000)
}

const savePendingBlocks = async () => {
  const blocks = pendingRef.current
  if (blocks.length === 0) return

  await fetch('/api/blocks/batch', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ blocks }),
  })

  pendingRef.current = []
}`}
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('onSaveVsCallbacks')}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {renderDocRichString(t.raw('onSaveVsCallbacks.description') as string, docRichTags)}
          </p>
          <CodeBlock
            language="tsx"
            code={`onSave={async (blocks) => {
  const ok = await fetch('/api/pages/1/blocks', {
    method: 'PUT',
    body: JSON.stringify({ blocks }),
  }).then((r) => r.ok)
  return ok
}}`}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('analyticsLogging')}</h3>
          <CodeBlock
            language="tsx"
            code={`const handleBlockAdded = (block: IBlock) => {
  gtag('event', 'block_created', {
    block_type: block.type,
    event_category: 'block_builder',
  })

  logUserAction({
    action: 'create_block',
    blockType: block.type,
    timestamp: Date.now(),
  })
}

const handleBlockUpdated = (block: IBlock) => {
  gtag('event', 'block_updated', {
    block_type: block.type,
    event_category: 'block_builder',
  })
}

const handleBlockDeleted = (blockId: TBlockId) => {
  gtag('event', 'block_deleted', {
    event_category: 'block_builder',
  })
}`}
            className="mb-4"
          />
        </div>
      </section>

      <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-4 border-green-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{tCommon('tips')}</h2>
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
