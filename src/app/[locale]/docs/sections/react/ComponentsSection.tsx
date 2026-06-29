'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import CodeBlock from '@/components/CodeBlock';
import Icon from '@/components/Icon';
import type { NavigationProps } from '../../types';
import DocHeading from '../../components/DocHeading';
import UploadUrlImportantNote from '../../components/UploadUrlImportantNote';
import { docRichTags, renderDocRichString } from '../../components/docRichTags';

const PROP_KEYS = [
  'blockManagementUseCase',
  'apiSelectUseCase',
  'customFieldRendererRegistry',
  'initialBlocks',
  'onSave',
  'isEdit',
  'controlsContainerClass',
  'controlsFixedPosition',
  'controlsOffset',
  'controlsOffsetVar',
  'locale',
  'uiStrings',
  'theme',
  'themeVars',
  'warnOnPageLeave',
] as const;

const CALLBACK_KEYS = [
  { name: 'onBlockAdded', key: 'onBlockAdded' as const, signature: '(block: IBlock) => void' },
  { name: 'onBlockUpdated', key: 'onBlockUpdated' as const, signature: '(block: IBlock) => void' },
  { name: 'onBlockDeleted', key: 'onBlockDeleted' as const, signature: '(blockId: TBlockId) => void' },
] as const;

const SSR_UTIL_KEYS = [
  'prepareBlocksForDisplay',
  'enrichBlockForDisplay',
  'seedRepositoryFromBlocks',
  'enableViewportBreakpointDetection',
] as const;

export default function ReactComponentsSection(_props: NavigationProps) {
  const t = useTranslations('docsPages.react.components');
  const tCommon = useTranslations('docsPages.common');
  const importantItems = t.raw('blockComponents.importantItems') as string[];

  const configTypeCode = useMemo(
    () => `{
  availableBlockTypes?: Array<IBlockType>,  // ${t('code.blockTypesArrayComment')}
}`,
    [t],
  );

  const iblockTypeCode = useMemo(
    () => `{
  type: string,                    // ${t('code.typeComment')}
  label: string,                   // ${t('code.labelComment')}
  title?: string,                  // ${t('code.titleComment')}
  icon?: string,                   // ${t('code.iconComment')}
  render?: {                       // ${t('code.renderComment')}
    kind: 'component' | 'html',
    framework?: 'react',
    component?: Component,         // ${t('code.componentComment')}
    template?: string | Function    // ${t('code.templateComment')}
  },
  defaultSettings?: Record<string, any>,  // ${t('code.defaultSettingsComment')}
  defaultProps?: Record<string, any>,      // ${t('code.defaultPropsComment')}
  fields?: Array<IFormFieldConfig>,       // ${t('code.fieldsComment')}
  formHooks?: IBlockFormHooks,
  spacingOptions?: {                      // ${t('code.spacingOptionsComment')}
    enabled?: boolean,
    config?: { breakpoints?: Array<IBreakpoint> }
  }
}`,
    [t],
  );

  const onSaveExampleCode = useMemo(
    () => `onSave={async (blocks) => {
  // ${t('code.saveBlocksComment')}
  await fetch('/api/blocks', {
    method: 'POST',
    body: JSON.stringify(blocks),
  })
  return true // ${t('code.orFalseOnError')}
}}`,
    [t],
  );

  const isEditExampleCode = useMemo(
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

  const basicUsageCode = useMemo(
    () => `import { useEffect, useMemo, useState } from 'react'
import {
  BlockBuilderComponent,
  createBlockManagementUseCase,
} from '@mushket-co/block-builder/react'
import { TextBlock } from './components/blocks/TextBlock'

export function Editor() {
  const [initialBlocks] = useState([
    {
      id: 'block-1',
      type: 'text',
      props: { content: '${t('code.initialContent')}' },
      settings: {},
    },
  ])
  const blockManagementUseCase = useMemo(() => createBlockManagementUseCase(), [])

  useEffect(() => {
    blockManagementUseCase.getComponentRegistry().register('text', TextBlock)
  }, [blockManagementUseCase])

  return (
    <BlockBuilderComponent
      config={{ availableBlockTypes }}
      blockManagementUseCase={blockManagementUseCase}
      initialBlocks={initialBlocks}
      onBlockAdded={(block) => console.log('${t('code.logCreated')}', block)}
      onBlockUpdated={(block) => console.log('${t('code.logUpdated')}', block)}
      onBlockDeleted={(blockId) => console.log('${t('code.logDeleted')}', blockId)}
    />
  )
}`,
    [t],
  );

  const serverSaveCode = useMemo(
    () => `import { useEffect, useMemo, useState } from 'react'
import {
  BlockBuilderComponent,
  createBlockManagementUseCase,
} from '@mushket-co/block-builder/react'

export function Editor() {
  const [initialBlocks, setInitialBlocks] = useState([])
  const blockManagementUseCase = useMemo(() => createBlockManagementUseCase(), [])

  useEffect(() => {
    const loadBlocks = async () => {
      try {
        const response = await fetch('/api/blocks/load')
        if (response.ok) {
          const data = await response.json()
          setInitialBlocks(data.blocks || [])
        }
      } catch (error) {
        console.error('${t('code.loadError')}', error)
        setInitialBlocks([])
      }
    }
    loadBlocks()
  }, [])

  const saveBlocks = async (blocks) => {
    try {
      const response = await fetch('/api/blocks/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blocks }),
      })
      if (!response.ok) throw new Error('${t('code.saveError')}')
      return true
    } catch (error) {
      console.error('${t('code.genericError')}', error)
      return false
    }
  }

  return (
    <BlockBuilderComponent
      config={{ availableBlockTypes }}
      blockManagementUseCase={blockManagementUseCase}
      initialBlocks={initialBlocks}
      onSave={saveBlocks}
    />
  )
}`,
    [t],
  );

  const blockStructureCode = useMemo(
    () => `{
  id: string,
  type: string,
  props: {
    /* ${t('code.customPropsComment')} */
    spacing?: {
      /* ${t('code.spacingDataComment')} */
      'padding-top': { 'desktop': '20px' },
      'margin-bottom': { 'mobile': '10px' }
    }
  },
  settings: {
    /* ${t('code.metadataComment')} */
  }
}`,
    [t],
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
      </div>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <DocHeading id="block-builder-component">
          <code className="text-blue-700 dark:text-blue-400">BlockBuilderComponent</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('blockBuilderComponent.description')}</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('import')}</h3>
          <CodeBlock
            code={`import { BlockBuilderComponent } from '@mushket-co/block-builder/react'`}
            language="javascript"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('props')}</h3>
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
                <code className="text-blue-700 dark:text-blue-400">config</code>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                  {t('blockBuilderComponent.props.config.type')}
                </span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {t('blockBuilderComponent.props.config.description')}
              </p>
              <CodeBlock code={configTypeCode} language="typescript" className="mb-2 text-xs" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                <strong>{t('blockBuilderComponent.props.config.iblockTypeLabel')}</strong>
              </p>
              <CodeBlock code={iblockTypeCode} language="typescript" className="mb-2 text-xs" />
            </div>

            {PROP_KEYS.map((key) => (
              <div key={key} className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
                  <code className="text-blue-700 dark:text-blue-400">{key}</code>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                    {t.raw(`blockBuilderComponent.props.${key}.type`) as string}
                  </span>
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {renderDocRichString(
                    t.raw(`blockBuilderComponent.props.${key}.description`) as string,
                  )}
                </p>
                {key === 'onSave' && (
                  <CodeBlock code={onSaveExampleCode} language="tsx" className="mb-2 text-xs" />
                )}
                {key === 'isEdit' && (
                  <CodeBlock code={isEditExampleCode} language="tsx" className="mb-2 text-xs" />
                )}
                {key === 'themeVars' && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <Link href="/docs/core/theming-localization#theme-vars" className="text-primary-600 dark:text-primary-400 hover:underline">
                      {tCommon('themingLocalization')}
                    </Link>
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4 border border-teal-200 dark:border-teal-800 mt-4">
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">{t('blockBuilderComponent.notes.title')}</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>{renderDocRichString(t.raw('blockBuilderComponent.notes.formValidation') as string)}</li>
              <li>{renderDocRichString(t.raw('blockBuilderComponent.notes.blockAnchor') as string)}</li>
            </ul>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              <Link href="/docs/core/form-fields" className="text-primary-600 dark:text-primary-400 hover:underline">
                {tCommon('linkFormFields')}
              </Link>
              {' · '}
              <Link href="/docs/core/utilities#reactive-validation" className="text-primary-600 dark:text-primary-400 hover:underline">
                {tCommon('linkReactiveValidation')}
              </Link>
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('callbacks')}</h3>
          <div className="space-y-2 text-sm">
            {CALLBACK_KEYS.map(({ name, key, signature }) => (
              <div
                key={name}
                className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-200 dark:border-slate-700"
              >
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <code className="text-blue-700 dark:text-blue-400">{name}</code>
                  <code className="text-xs text-gray-500 dark:text-gray-400">{signature}</code>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{t(`blockBuilderComponent.callbacks.${key}`)}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
            <Link href="/docs/react/events" className="text-primary-600 dark:text-primary-400 hover:underline">
              {tCommon('moreAboutCallbacks')}
            </Link>
            {' · '}
            <Link href="/docs/core/types#iblock" className="text-primary-600 dark:text-primary-400 hover:underline">
              {tCommon('iblockType')}
            </Link>
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('basicUsage')}</h3>
          <CodeBlock code={basicUsageCode} language="tsx" className="mb-4" />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('withServerSave')}</h3>
          <CodeBlock code={serverSaveCode} language="tsx" className="mb-4" />
        </div>
      </section>

      <section>
        <DocHeading id="ssr-utils">{tCommon('ssrUtils')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('ssrUtils.description') as string, docRichTags)}</p>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {SSR_UTIL_KEYS.map((key) => (
            <li
              key={key}
              id={
                key === 'prepareBlocksForDisplay'
                  ? 'prepare-blocks-for-display'
                  : key === 'enrichBlockForDisplay'
                    ? 'enrich-block-for-display'
                    : key === 'seedRepositoryFromBlocks'
                      ? 'seed-repository-from-blocks'
                      : 'enable-viewport-breakpoint-detection'
              }
            >
              {renderDocRichString(t.raw(`ssrUtils.items.${key}`) as string, docRichTags)}
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          {t('ssrUtils.footer')}{' '}
          <Link href="/docs/next" className="text-blue-600 hover:underline">
            Next.js (SSR)
          </Link>
          .
        </p>
      </section>

      <section>
        <DocHeading id="block-components">{t('blockComponents.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('blockComponents.description') as string, docRichTags)}</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('blockStructure')}</h3>
          <CodeBlock code={blockStructureCode} language="javascript" className="mb-4" />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('blockComponentExample')}</h3>
          <CodeBlock
            language="tsx"
            className="mb-4"
            code={`// components/blocks/HeroBlock.tsx
type BlockProps = {
  block: { id: string; type: string; props: Record<string, unknown> }
}

export function HeroBlock({ block }: BlockProps) {
  return (
    <section
      className="hero-block"
      style={{
        paddingTop: 'var(--spacing-padding-top, 4rem)',
        paddingBottom: 'var(--spacing-padding-bottom, 4rem)',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
      }}
    >
      <div className="container">
        <h1>{String(block.props.title ?? '')}</h1>
        <p>{String(block.props.subtitle ?? '')}</p>
        {block.props.buttonText && block.props.buttonUrl ? (
          <a href={String(block.props.buttonUrl)}>{String(block.props.buttonText)}</a>
        ) : null}
      </div>
    </section>
  )
}`}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('imageComponentExample')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            {renderDocRichString(tCommon.raw('imageFieldNote') as string)}
          </p>
          <CodeBlock
            language="tsx"
            className="mb-4"
            code={`// components/blocks/ImageBlock.tsx
type BlockProps = {
  block: { id: string; type: string; props: Record<string, unknown> }
}

function getImageUrl(image: unknown): string {
  if (typeof image === 'string') return image
  if (typeof image === 'object' && image !== null && 'src' in image) {
    return String((image as { src?: string }).src ?? '')
  }
  return ''
}

export function ImageBlock({ block }: BlockProps) {
  const imageUrl = getImageUrl(block.props.image)

  return (
    <div
      style={{
        paddingTop: 'var(--spacing-padding-top, 1rem)',
        paddingBottom: 'var(--spacing-padding-bottom, 1rem)',
      }}
    >
      <img
        src={imageUrl}
        alt={String(block.props.alt ?? 'Image')}
        style={{ width: \`\${block.props.width ?? 100}%\` }}
      />
    </div>
  )
}`}
          />
          <UploadUrlImportantNote />
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
            <Icon name="lightbulb" size={20} className="text-blue-600 dark:text-blue-400" />
            {tCommon('important')}
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {importantItems.map((_, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>{renderDocRichString(t.raw(`blockComponents.importantItems.${index}`) as string, docRichTags)}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 pt-3 border-t border-blue-200 dark:border-blue-800">
            {renderDocRichString(t.raw('blockComponents.footer') as string, {
              ...docRichTags,
              formFields: (chunks) => (
                <Link href="/docs/core/form-fields" className="text-primary-600 dark:text-primary-400 hover:underline">
                  {chunks}
                </Link>
              ),
              spacing: (chunks) => (
                <Link href="/docs/core/form-fields#spacing" className="text-primary-600 dark:text-primary-400 hover:underline">
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>
      </section>
    </div>
  );
}
