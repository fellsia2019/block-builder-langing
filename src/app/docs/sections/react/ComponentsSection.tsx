'use client';

import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import type { NavigationProps } from '../../types';
import DocHeading from '../../components/DocHeading';

function PropCard({
  name,
  type,
  required,
  description,
  example,
}: {
  name: string;
  type: string;
  required?: boolean;
  description: string;
  example?: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
      <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
        <code className="text-blue-700 dark:text-blue-400">{name}</code>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
          {type}
          {required ? ', обязательный' : ', опциональный'}
        </span>
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{description}</p>
      {example && <CodeBlock code={example} language="typescript" className="text-xs" />}
    </div>
  );
}

export default function ReactComponentsSection({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Компоненты</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          React-компоненты BlockBuilder и их API
        </p>
      </div>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <DocHeading id="block-builder-component">
          <code className="text-blue-700 dark:text-blue-400">BlockBuilderComponent</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Готовый UI редактора: добавление, редактирование, удаление и смена порядка блоков (кнопки вверх/вниз), формы полей, сохранение.
        </p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Импорт</h3>
          <CodeBlock
            code={`import { BlockBuilderComponent } from '@mushket-co/block-builder/react'`}
            language="javascript"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Свойства (props)</h3>
          <div className="space-y-4">
            <PropCard
              name="config"
              type="Object"
              required
              description="Конфигурация с availableBlockTypes"
              example={`{
  availableBlockTypes?: Array<IBlockType>
}`}
            />
            <PropCard
              name="blockManagementUseCase"
              type="BlockManagementUseCase"
              required
              description="Создаётся через createBlockManagementUseCase()"
            />
            <PropCard
              name="apiSelectUseCase"
              type="ApiSelectUseCase"
              description="Для полей type: 'api-select'"
            />
            <PropCard
              name="customFieldRendererRegistry"
              type="ICustomFieldRendererRegistry"
              description="Реестр кастомных рендереров (type: 'custom')"
            />
            <PropCard
              name="initialBlocks"
              type="Array"
              description="Начальные блоки при монтировании"
            />
            <PropCard
              name="onSave"
              type="(blocks) => Promise<boolean>"
              description="Обратный вызов сохранения блоков"
              example={`onSave={async (blocks) => {
  await fetch('/api/blocks', {
    method: 'POST',
    body: JSON.stringify({ blocks }),
  })
  return true
}}`}
            />
            <PropCard
              name="isEdit"
              type="boolean"
              description="Режим редактирования (по умолчанию: true). false — только просмотр блоков"
            />
            <PropCard
              name="warnOnPageLeave"
              type="boolean"
              description="Предупреждение при уходе с несохранёнными блоками"
            />
            <PropCard
              name="controlsContainerClass"
              type="string"
              description="CSS-класс контейнера панели управления"
            />
            <PropCard
              name="controlsFixedPosition"
              type="'top' | 'bottom'"
              description="Фиксация панели управления"
            />
            <PropCard
              name="controlsOffset"
              type="number"
              description="Отступ панели от края (px)"
            />
            <PropCard
              name="controlsOffsetVar"
              type="string"
              description="CSS-переменная для учёта высоты header/footer"
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Колбэки</h3>
          <div className="space-y-2 text-sm">
            {(
              [
                {
                  name: 'onBlockAdded',
                  signature: '(block: IBlock) => void',
                  description: 'Создан или продублирован блок — полный объект блока',
                },
                {
                  name: 'onBlockUpdated',
                  signature: '(block: IBlock) => void',
                  description: 'Обновлён блок — актуальный объект после изменения',
                },
                {
                  name: 'onBlockDeleted',
                  signature: '(blockId: TBlockId) => void',
                  description: 'Удалён блок — только id (строка), не объект',
                },
              ] as const
            ).map(({ name, signature, description }) => (
              <div
                key={name}
                className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-200 dark:border-slate-700"
              >
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <code className="text-blue-700 dark:text-blue-400">{name}</code>
                  <code className="text-xs text-gray-500 dark:text-gray-400">{signature}</code>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{description}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
            <Link href="/docs/core/types#iblock" className="text-primary-600 dark:text-primary-400 hover:underline">
              тип IBlock →
            </Link>
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Базовое использование</h3>
          <CodeBlock
            language="tsx"
            code={`export function Editor() {
  const blockManagementUseCase = useMemo(() => createBlockManagementUseCase(), [])

  useEffect(() => {
    const registry = blockManagementUseCase.getComponentRegistry()
    registry.register('text', TextBlock)
  }, [blockManagementUseCase])

  return (
    <BlockBuilderComponent
      config={{ availableBlockTypes }}
      blockManagementUseCase={blockManagementUseCase}
      initialBlocks={[]}
      isEdit
      onSave={async (blocks) => true}
      onBlockAdded={(block) => console.log('added', block)}
      onBlockUpdated={(block) => console.log('updated', block)}
      onBlockDeleted={(blockId) => console.log('deleted', blockId)}
    />
  )
}`}
          />
        </div>
      </section>

      <section>
        <DocHeading id="ssr-utils">SSR-утилиты</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Экспортируются из <code>@mushket-co/block-builder/react</code>:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <code>prepareBlocksForDisplay</code> — восстанавливает render из конфигурации типов
          </li>
          <li>
            <code>enrichBlockForDisplay</code> — обогащение одного блока
          </li>
          <li>
            <code>seedRepositoryFromBlocks</code> — синхронизация репозитория после гидрации
          </li>
          <li>
            <code>enableViewportBreakpointDetection</code> — spacing после гидрации
          </li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          Подробное руководство по SSR —{' '}
          <Link href="/docs/next" className="text-blue-600 hover:underline">
            Next.js (SSR)
          </Link>
          .
        </p>
      </section>

      <section>
        <DocHeading id="block-components">Компоненты блоков</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Каждый тип блока рендерится вашим React-компонентом с prop <code>block</code>.
        </p>
        <CodeBlock
          language="tsx"
          code={`type BlockProps = { block: { id: string; type: string; props: Record<string, unknown> } }

export function TextBlock({ block }: BlockProps) {
  return (
    <div
      style={{
        paddingTop: 'var(--spacing-padding-top, 1rem)',
        paddingBottom: 'var(--spacing-padding-bottom, 1rem)',
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: String(block.props.content ?? '') }} />
    </div>
  )
}`}
        />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
          Полный список props типов блоков — в{' '}
          <Link href="/docs/core/form-fields" className="text-blue-600 hover:underline">
            Поля форм
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
