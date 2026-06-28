'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import CodeBlock from '@/components/CodeBlock';
import type { NavigationProps } from '../../types';
import DocHeading from '../../components/DocHeading';
import { docRichTags } from '../../components/docRichTags';

function PropCard({
  name,
  type,
  required,
  description,
  example,
  requiredLabel,
  optionalLabel,
}: {
  name: string;
  type: string;
  required?: boolean;
  description: string;
  example?: string;
  requiredLabel: string;
  optionalLabel: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
      <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
        <code className="text-blue-700 dark:text-blue-400">{name}</code>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
          {type}
          {required ? requiredLabel : optionalLabel}
        </span>
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{description}</p>
      {example && <CodeBlock code={example} language="typescript" className="text-xs" />}
    </div>
  );
}

const PROP_KEYS = [
  'config',
  'blockManagementUseCase',
  'apiSelectUseCase',
  'customFieldRendererRegistry',
  'initialBlocks',
  'onSave',
  'isEdit',
  'locale',
  'uiStrings',
  'theme',
  'themeVars',
  'warnOnPageLeave',
  'controlsContainerClass',
  'controlsFixedPosition',
  'controlsOffset',
  'controlsOffsetVar',
] as const;

const CALLBACK_KEYS = ['onBlockAdded', 'onBlockUpdated', 'onBlockDeleted'] as const;

const SSR_UTIL_KEYS = [
  'prepareBlocksForDisplay',
  'enrichBlockForDisplay',
  'seedRepositoryFromBlocks',
  'enableViewportBreakpointDetection',
] as const;

export default function ReactComponentsSection(_props: NavigationProps) {
  const t = useTranslations('docsPages.react.components');
  const tCommon = useTranslations('docsPages.common');

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
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('props')}</h3>
          <div className="space-y-4">
            <PropCard
              name="config"
              type="Object"
              required
              description={t('blockBuilderComponent.props.config.description')}
              example={`{
  availableBlockTypes?: Array<IBlockType>
}`}
              requiredLabel={tCommon('required')}
              optionalLabel={tCommon('optional')}
            />
            {PROP_KEYS.slice(1).map((key) => (
              <PropCard
                key={key}
                name={key}
                type={key === 'onSave' ? '(blocks) => Promise<boolean>' : key === 'isEdit' || key === 'warnOnPageLeave' ? 'boolean' : key === 'locale' ? "'ru' | 'en'" : key === 'theme' ? "'dark'" : key === 'controlsFixedPosition' ? "'top' | 'bottom'" : key === 'controlsOffset' ? 'number' : key === 'controlsOffsetVar' || key === 'controlsContainerClass' ? 'string' : key === 'themeVars' ? "Record<'--bb-*', string>" : key === 'uiStrings' ? 'Partial<IUiStrings>' : key === 'initialBlocks' ? 'Array' : key === 'blockManagementUseCase' ? 'BlockManagementUseCase' : key === 'apiSelectUseCase' ? 'ApiSelectUseCase' : key === 'customFieldRendererRegistry' ? 'ICustomFieldRendererRegistry' : 'Object'}
                required={key === 'blockManagementUseCase'}
                description={t(`blockBuilderComponent.props.${key}.description`)}
                example={key === 'onSave' ? `onSave={async (blocks) => {
  await fetch('/api/blocks', {
    method: 'POST',
    body: JSON.stringify({ blocks }),
  })
  return true
}}` : undefined}
                requiredLabel={tCommon('required')}
                optionalLabel={tCommon('optional')}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            <Link href="/docs/core/theming-localization" className="text-blue-600 hover:underline">
              {tCommon('themingLocaleThemeVars')}
            </Link>
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('callbacks')}</h3>
          <div className="space-y-2 text-sm">
            {CALLBACK_KEYS.map((key) => (
              <div
                key={key}
                className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-200 dark:border-slate-700"
              >
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <code className="text-blue-700 dark:text-blue-400">{key}</code>
                  <code className="text-xs text-gray-500 dark:text-gray-400">
                    {key === 'onBlockDeleted' ? '(blockId: TBlockId) => void' : '(block: IBlock) => void'}
                  </code>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {t(`blockBuilderComponent.callbacks.${key}`)}
                </p>
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

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('basicUsage')}</h3>
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
        <DocHeading id="ssr-utils">{tCommon('ssrUtils')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t.rich('ssrUtils.description', docRichTags)}</p>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {SSR_UTIL_KEYS.map((key) => (
            <li key={key} id={key === 'prepareBlocksForDisplay' ? 'prepare-blocks-for-display' : key === 'enrichBlockForDisplay' ? 'enrich-block-for-display' : key === 'seedRepositoryFromBlocks' ? 'seed-repository-from-blocks' : 'enable-viewport-breakpoint-detection'}>
              {t.rich(`ssrUtils.items.${key}`, docRichTags)}
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
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t.rich('blockComponents.description', docRichTags)}</p>
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
          {t.rich('blockComponents.footer', {
            ...docRichTags,
            formFields: (chunks) => (
              <Link href="/docs/core/form-fields" className="text-blue-600 hover:underline">
                {chunks}
              </Link>
            ),
            spacing: (chunks) => (
              <Link href="/docs/core/form-fields#spacing" className="text-blue-600 hover:underline">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </section>
    </div>
  );
}
