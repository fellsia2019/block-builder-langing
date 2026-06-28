'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import CodeBlock from '@/components/CodeBlock';
import { DEMO_BB_URL, GITHUB_EXAMPLES } from '@/lib/urls';
import { docRichTags } from '../../components/docRichTags';
import type { NavigationProps } from '../../types';

export default function GettingStartedReact(_props: NavigationProps) {
  const t = useTranslations('docsPages.react.gettingStarted');
  const tCommon = useTranslations('docsPages.common');

  const basicExampleCode = useMemo(
    () => `import '@mushket-co/block-builder/index.esm.css'
import {
  BlockBuilderComponent,
  createBlockManagementUseCase,
} from '@mushket-co/block-builder/react'
import { TextBlock } from './components/blocks/TextBlock'

const blockManagementUseCase = createBlockManagementUseCase()
blockManagementUseCase.getComponentRegistry().register('text', TextBlock)

const availableBlockTypes = [{
  type: 'text',
  label: '${t('code.textLabel')}',
  render: { kind: 'component', framework: 'react', component: TextBlock },
  fields: [
    { field: 'content', label: '${t('code.contentLabel')}', type: 'textarea',
      rules: [{ type: 'required', field: 'content' }] },
  ],
}]

export function App() {
  return (
    <BlockBuilderComponent
      config={{ availableBlockTypes }}
      blockManagementUseCase={blockManagementUseCase}
      onSave={async (blocks) => { console.log(blocks); return true }}
      initialBlocks={[]}
      isEdit
      warnOnPageLeave
      onBlockAdded={(b) => console.log('added', b)}
      onBlockUpdated={(b) => console.log('updated', b)}
      onBlockDeleted={(id) => console.log('deleted', id)}
    />
  )
}`,
    [t],
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t.rich('subtitle', docRichTags)}</p>
      </div>

      <section className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{tCommon('install')}</h2>
        <CodeBlock code="npm install @mushket-co/block-builder" language="bash" />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">{t.rich('stylesNote', docRichTags)}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('basicExample')}</h2>
        <CodeBlock
          language="tsx"
          code={basicExampleCode}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('vite.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t.rich('vite.description', {
            ...docRichTags,
            demo: (chunks) => (
              <a
                href={DEMO_BB_URL}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('ssr.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t.rich('ssr.description', {
            nextLink: (chunks) => (
              <Link href="/docs/next" className="text-blue-600 hover:underline">
                {chunks}
              </Link>
            ),
            examples: (chunks) => (
              <a
                href={GITHUB_EXAMPLES}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chunks}
              </a>
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
            <Link href="/docs/changelog" className="text-blue-600 hover:underline">
              {t('whatsNext.items.changelog')}
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
