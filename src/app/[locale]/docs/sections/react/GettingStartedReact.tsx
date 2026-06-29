'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import CodeBlock from '@/components/CodeBlock';
import { DEMO_BB_URL, GITHUB_EXAMPLES_NEXT, GITHUB_EXAMPLES_REACT18 } from '@/lib/urls';
import { docRichTags, renderDocRichString } from '../../components/docRichTags';
import UploadUrlImportantNote from '../../components/UploadUrlImportantNote';
import type { NavigationProps } from '../../types';

export default function GettingStartedReact(_props: NavigationProps) {
  const t = useTranslations('docsPages.react.gettingStarted');
  const tCommon = useTranslations('docsPages.common');

  const tipItems = t.raw('tips.items') as string[];
  const viewModeItems = t.raw('editMode.viewMode.items') as string[];

  const helloWorldHtml = t.raw('code.helloWorldHtml') as string;

  const step2Code = useMemo(
    () => `import '@mushket-co/block-builder/index.esm.css'
import { useEffect, useMemo } from 'react'
import {
  BlockBuilderComponent,
  createBlockManagementUseCase,
} from '@mushket-co/block-builder/react'
import { TextBlock } from './components/blocks/TextBlock'

const availableBlockTypes = [{
  type: 'text',
  label: '${t('code.textBlockLabel')}',
  render: { kind: 'component', framework: 'react', component: TextBlock },
  fields: [
    {
      field: 'content',
      label: '${t('code.contentLabel')}',
      type: 'textarea',
      rules: [{ type: 'required', field: 'content' }],
      defaultValue: '${helloWorldHtml}',
    },
  ],
  defaultProps: { content: '${helloWorldHtml}' },
  spacingOptions: {
    enabled: true,
    spacingTypes: ['padding-top', 'padding-bottom', 'margin-top', 'margin-bottom'],
  },
}]

export function App() {
  const blockManagementUseCase = useMemo(() => createBlockManagementUseCase(), [])

  useEffect(() => {
    blockManagementUseCase.getComponentRegistry().register('text', TextBlock)
  }, [blockManagementUseCase])

  return (
    <BlockBuilderComponent
      config={{ availableBlockTypes }}
      blockManagementUseCase={blockManagementUseCase}
      onSave={async (blocks) => { console.log(blocks); return true }}
      initialBlocks={[]}
      isEdit
      warnOnPageLeave
      onBlockAdded={(b) => console.log('${t('code.logBlockCreated')}', b)}
      onBlockUpdated={(b) => console.log('${t('code.logBlockUpdated')}', b)}
      onBlockDeleted={(id) => console.log('${t('code.logBlockDeleted')}', id)}
    />
  )
}`,
    [t, helloWorldHtml],
  );

  const multipleTypesCode = useMemo(
    () => `import { useEffect, useMemo } from 'react'
import {
  BlockBuilderComponent,
  createBlockManagementUseCase,
} from '@mushket-co/block-builder/react'
import { TextBlock } from './components/blocks/TextBlock'
import { ImageBlock } from './components/blocks/ImageBlock'
import { ButtonBlock } from './components/blocks/ButtonBlock'

const availableBlockTypes = [
  {
    type: 'text',
    label: '${t('code.textBlockLabel')}',
    render: { kind: 'component', framework: 'react', component: TextBlock },
    fields: [
      {
        field: 'content',
        label: '${t('code.contentLabel')}',
        type: 'textarea',
        rules: [{ type: 'required', field: 'content' }],
      },
      {
        field: 'textAlign',
        label: '${t('code.textAlignLabel')}',
        type: 'select',
        options: [
          { value: 'left', label: '${t('code.alignLeft')}' },
          { value: 'center', label: '${t('code.alignCenter')}' },
          { value: 'right', label: '${t('code.alignRight')}' },
        ],
      },
    ],
  },
  {
    type: 'image',
    label: '${t('code.imageLabel')}',
    render: { kind: 'component', framework: 'react', component: ImageBlock },
    fields: [
      {
        field: 'image',
        label: '${t('code.imageLabel')}',
        type: 'image',
        rules: [{ type: 'required', field: 'image' }],
        fileUploadConfig: {
          uploadUrl: '/api/upload',
          maxFileSize: 5 * 1024 * 1024,
          accept: 'image/*',
          responseMapper: (response) => ({ src: response.url }),
        },
      },
      { field: 'alt', label: '${t('code.altTextLabel')}', type: 'text' },
      { field: 'width', label: '${t('code.widthLabel')}', type: 'number', defaultValue: 100 },
    ],
  },
  {
    type: 'button',
    label: '${t('code.buttonLabel')}',
    render: { kind: 'component', framework: 'react', component: ButtonBlock },
    fields: [
      {
        field: 'text',
        label: '${t('code.buttonTextLabel')}',
        type: 'text',
        rules: [{ type: 'required', field: 'text' }],
      },
      { field: 'url', label: '${t('code.urlLabel')}', type: 'url' },
      {
        field: 'variant',
        label: '${t('code.styleLabel')}',
        type: 'select',
        options: [
          { value: 'primary', label: '${t('code.variantPrimary')}' },
          { value: 'secondary', label: '${t('code.variantSecondary')}' },
          { value: 'outline', label: '${t('code.variantOutline')}' },
        ],
      },
    ],
  },
]

export function Editor() {
  const blockManagementUseCase = useMemo(() => createBlockManagementUseCase(), [])

  useEffect(() => {
    const registry = blockManagementUseCase.getComponentRegistry()
    registry.register('text', TextBlock)
    registry.register('image', ImageBlock)
    registry.register('button', ButtonBlock)
  }, [blockManagementUseCase])

  return (
    <BlockBuilderComponent
      config={{ availableBlockTypes }}
      blockManagementUseCase={blockManagementUseCase}
      onSave={async (blocks) => true}
    />
  )
}`,
    [t],
  );

  const editModeCode = useMemo(
    () => `// ${t('code.editModeComment')}
<BlockBuilderComponent
  config={config}
  blockManagementUseCase={blockManagementUseCase}
  isEdit
/>

// ${t('code.viewModeComment')}
<BlockBuilderComponent
  config={config}
  blockManagementUseCase={blockManagementUseCase}
  isEdit={false}
/>`,
    [t],
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{renderDocRichString(t.raw('subtitle') as string, docRichTags)}</p>
      </div>

      <section className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{tCommon('install')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('install.description')}</p>
        <CodeBlock code="npm install @mushket-co/block-builder" language="bash" className="mb-4" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {renderDocRichString(t.raw('install.stylesNote') as string)}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t('install.typescriptNote')}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('concepts.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">{t('concepts.blockBuilderComponent.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('concepts.blockBuilderComponent.description')}</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <h3 className="font-bold text-purple-900 dark:text-purple-300 mb-2">{t('concepts.yourComponents.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{renderDocRichString(t.raw('concepts.yourComponents.description') as string, docRichTags)}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-900 dark:text-green-300 mb-2">{t('concepts.config.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('concepts.config.description')}</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
            <h3 className="font-bold text-orange-900 dark:text-orange-300 mb-2">{t('concepts.callbacks.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{renderDocRichString(t.raw('concepts.callbacks.description') as string, docRichTags)}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('basicExample.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('basicExample.description')}</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t('basicExample.step1.title')}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {renderDocRichString(t.raw('basicExample.step1.spacingNote') as string, {
              ...docRichTags,
              link: (chunks) => (
                <Link href="/docs/core/form-fields#spacing" className="text-primary-600 dark:text-primary-400 hover:underline">
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <CodeBlock
            language="tsx"
            className="mb-4"
            code={`// components/blocks/TextBlock.tsx
type BlockProps = {
  block: { id: string; type: string; props: Record<string, unknown> }
}

export function TextBlock({ block }: BlockProps) {
  return (
    <div
      className="text-block"
      style={{
        paddingTop: 'var(--spacing-padding-top, 1rem)',
        paddingBottom: 'var(--spacing-padding-bottom, 1rem)',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: String(block.props.content ?? '') }} />
    </div>
  )
}`}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t('basicExample.step2.title')}</h3>
          <CodeBlock language="tsx" code={step2Code} className="mb-4" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('multipleTypes.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('multipleTypes.description')}</p>
        <CodeBlock language="tsx" code={multipleTypesCode} className="mb-4" />
        <UploadUrlImportantNote />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('editMode.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('editMode.description') as string, docRichTags)}</p>
        <CodeBlock language="tsx" code={editModeCode} className="mb-4" />
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">{t('editMode.viewMode.title')}</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
            {viewModeItems.map((_, index) => (
              <li key={index}>{renderDocRichString(t.raw(`editMode.viewMode.items.${index}`) as string, docRichTags)}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('tips.title')}</h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
          {tipItems.map((_, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>{renderDocRichString(t.raw(`tips.items.${index}`) as string, docRichTags)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl p-6 border border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-900/10">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t('coreWithoutComponent.title')}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('coreWithoutComponent.description') as string, docRichTags)}</p>
        <CodeBlock
          language="tsx"
          className="mb-4 text-xs"
          code={`import { useEffect, useRef } from 'react'
import { BlockBuilder } from '@mushket-co/block-builder/core'

export function HeadlessEditor() {
  const blockBuilderRef = useRef<BlockBuilder | null>(null)

  useEffect(() => {
    blockBuilderRef.current = new BlockBuilder({ blockConfigs })
  }, [])

  // await blockBuilderRef.current?.createBlock(...)
  return null
}`}
        />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {renderDocRichString(t.raw('coreWithoutComponent.footer') as string, {
            apiOverview: (chunks) => (
              <Link href="/docs/core/classes" className="text-primary-600 hover:underline">{chunks}</Link>
            ),
            methods: (chunks) => (
              <Link href="/docs/core/methods" className="text-primary-600 hover:underline">{chunks}</Link>
            ),
            example: (chunks) => (
              <a href={GITHUB_EXAMPLES_REACT18} className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">{chunks}</a>
            ),
          })}
        </p>
      </section>

      <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t('next.title')}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {renderDocRichString(t.raw('next.description') as string, {
            nextLink: (chunks) => (
              <Link href="/docs/next" className="text-green-600 hover:underline">{chunks}</Link>
            ),
            nextExample: (chunks) => (
              <a href={GITHUB_EXAMPLES_NEXT} className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">{chunks}</a>
            ),
          })}
        </p>
      </section>

      <section className="rounded-xl p-6 border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t('whatsNext.title')}</h2>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            →{' '}
            <Link href="/docs/react/components" className="text-blue-600 hover:underline">
              {t('whatsNext.items.components')}
            </Link>
          </li>
          <li>
            →{' '}
            <Link href="/docs/react/events" className="text-blue-600 hover:underline">
              {t('whatsNext.items.events')}
            </Link>
          </li>
          <li>
            →{' '}
            <Link href="/docs/core/form-fields" className="text-blue-600 hover:underline">
              {t('whatsNext.items.formFields')}
            </Link>
          </li>
          <li>
            →{' '}
            <a href={DEMO_BB_URL} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              {t('whatsNext.items.demo')}
            </a>
          </li>
          <li>
            →{' '}
            <Link href="/docs/changelog" className="text-blue-600 hover:underline">
              {t('whatsNext.items.changelog')}
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
