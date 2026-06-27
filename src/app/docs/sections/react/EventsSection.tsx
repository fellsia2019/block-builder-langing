'use client';

import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import type { NavigationProps } from '../../types';

function CallbackCard({
  name,
  description,
  payload,
  example,
}: {
  name: string;
  description: string;
  payload?: string;
  example?: string;
}) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
        <code className="text-blue-700 dark:text-blue-400">{name}</code>
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>
      {payload ? (
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Аргумент:</p>
          <code className="text-xs text-blue-700 dark:text-blue-400">{payload}</code>
        </div>
      ) : null}
      {example ? <CodeBlock code={example} language="tsx" className="text-xs mt-3" /> : null}
    </div>
  );
}

export default function ReactEventsSection({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Колбэки</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Колбэки <code className="text-blue-700 dark:text-blue-400">BlockBuilderComponent</code> для отслеживания
          изменений блоков
        </p>
      </div>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Общее использование</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Передайте функции в props <code className="text-blue-700 dark:text-blue-400">BlockBuilderComponent</code>:
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
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
        // block — полный объект созданного или продублированного блока
      }}
      onBlockUpdated={(block) => {
        // block — актуальный объект после изменения
      }}
      onBlockDeleted={(blockId) => {
        // blockId — id удалённого блока (строка), не объект
      }}
    />
  )
}

// Смена порядка блоков — через onSave или blockManagementUseCase`}
          className="mb-4"
        />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Типы аргументов —{' '}
          <Link href="/docs/core/types#iblock" className="text-primary-600 dark:text-primary-400 hover:underline">
            IBlock
          </Link>
          ,{' '}
          <Link href="/docs/core/types#tblock-id" className="text-primary-600 dark:text-primary-400 hover:underline">
            TBlockId
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Доступные колбэки</h2>
        <div className="space-y-4">
          <CallbackCard
            name="onBlockAdded"
            description="Срабатывает после создания нового блока или дублирования существующего"
            payload="block: IBlock — полный объект блока"
            example={`const handleBlockAdded = (block: IBlock) => {
  console.log('Создан блок:', block)

  fetch('/api/blocks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(block),
  })

  toast.success(\`Блок "\${block.type}" создан\`)
}`}
          />

          <CallbackCard
            name="onBlockUpdated"
            description="Срабатывает при изменении props, settings или других полей блока"
            payload="block: IBlock — актуальный объект после изменения"
            example={`const handleBlockUpdated = (block: IBlock) => {
  console.log('Обновлён блок:', block)

  fetch(\`/api/blocks/\${block.id}\`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(block),
  })

  debouncedSave(block)
}`}
          />

          <CallbackCard
            name="onBlockDeleted"
            description="Срабатывает после удаления блока пользователем"
            payload="blockId: TBlockId — id удалённого блока (строка)"
            example={`const handleBlockDeleted = (blockId: TBlockId) => {
  console.log('Удалён блок:', blockId)

  fetch(\`/api/blocks/\${blockId}\`, { method: 'DELETE' })

  toast.info('Блок удалён')
}`}
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Практические примеры</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Синхронизация с бэкендом</h3>
          <CodeBlock
            language="tsx"
            code={`export function Editor() {
  const [isLoading, setIsLoading] = useState(false)

  const syncToBackend = async (block: IBlock) => {
    setIsLoading(true)
    try {
      const response = await fetch(\`/api/blocks/\${block.id}\`, {
        method: block.id.startsWith('temp-') ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(block),
      })
      if (!response.ok) throw new Error('Ошибка синхронизации')
      console.log('Синхронизировано:', await response.json())
    } catch (error) {
      console.error(error)
      alert('Не удалось сохранить блок')
    } finally {
      setIsLoading(false)
    }
  }

  const removeFromBackend = async (blockId: TBlockId) => {
    try {
      await fetch(\`/api/blocks/\${blockId}\`, { method: 'DELETE' })
    } catch (error) {
      console.error('Ошибка удаления:', error)
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
}`}
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Автосохранение с debounce</h3>
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
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">onSave vs колбэки</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            <code className="text-blue-700 dark:text-blue-400">onBlockAdded</code> /{' '}
            <code className="text-blue-700 dark:text-blue-400">onBlockUpdated</code> /{' '}
            <code className="text-blue-700 dark:text-blue-400">onBlockDeleted</code> — точечные реакции на действия
            пользователя. <code className="text-blue-700 dark:text-blue-400">onSave</code> получает{' '}
            <strong>весь массив блоков</strong> при явном сохранении (кнопка «Сохранить») и может вернуть{' '}
            <code>false</code>, чтобы оставить несохранённое состояние.
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
      </section>

      <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-4 border-green-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Советы</h2>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>
              Для автосохранения используйте <code className="text-green-700 dark:text-green-400">debounce</code> в{' '}
              <code className="text-green-700 dark:text-green-400">onBlockUpdated</code>
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>При удалении сохраняйте только id — объект блока уже недоступен</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>Дублирование блока тоже вызывает <code className="text-green-700 dark:text-green-400">onBlockAdded</code></span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>Колбэки срабатывают синхронно с действиями пользователя в UI</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
