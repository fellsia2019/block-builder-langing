'use client';

import { useMemo, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import CodeBlock from '@/components/CodeBlock';
import { DEMO_BB_URL, GITHUB_EXAMPLES } from '@/lib/urls';
import { docRichTags, renderDocRichString } from '../components/docRichTags';

export default function GetStartedSection() {
  const t = useTranslations('docsPages.getStarted');
  const tSidebar = useTranslations('docs.sidebar');

  const minimalExampleCode = useMemo(
    () => `<script setup>
import '@mushket-co/block-builder/index.esm.css'
import {
  BlockBuilderComponent,
  createBlockManagementUseCase,
} from '@mushket-co/block-builder/vue'
import TextBlock from './components/TextBlock.vue'

const blockManagementUseCase = createBlockManagementUseCase()
blockManagementUseCase.getComponentRegistry().register('text', TextBlock)

const config = {
  availableBlockTypes: [{
    type: 'text',
    label: '${t('minimalExample.blockLabel')}',
    render: { kind: 'component', framework: 'vue', component: TextBlock },
    fields: [
      { field: 'content', label: '${t('minimalExample.fieldLabel')}', type: 'textarea',
        rules: [{ type: 'required', field: 'content' }] },
    ],
  }],
}

const onSave = async (blocks) => { console.log(blocks); return true }
</script>

<template>
  <BlockBuilderComponent
    :config="config"
    :block-management-use-case="blockManagementUseCase"
    :on-save="onSave"
    :initial-blocks="[]"
    is-edit
  />
</template>`,
    [t],
  );

  const richTags = {
    ...docRichTags,
    reactLink: (chunks: ReactNode) => (
      <Link href="/docs/react/getting-started" className="text-primary-600 hover:underline">
        {chunks}
      </Link>
    ),
    vueLink: (chunks: ReactNode) => (
      <Link href="/docs/vue/getting-started" className="text-primary-600 hover:underline">
        {chunks}
      </Link>
    ),
    link: (chunks: ReactNode) => (
      <a
        href={GITHUB_EXAMPLES}
        className="text-primary-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {chunks}
      </a>
    ),
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
      </div>

      <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('install.title')}</h2>
        <CodeBlock code="npm install @mushket-co/block-builder" language="bash" />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          {t('install.stylesNote')}{' '}
          <code className="text-primary-700 dark:text-primary-400">
            import &apos;@mushket-co/block-builder/index.esm.css&apos;
          </code>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('architecture.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl p-5 border-2 border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-900/10">
            <h3 className="font-bold text-primary-800 dark:text-primary-300 mb-2">{t('architecture.core.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {renderDocRichString(t.raw('architecture.core.description') as string, docRichTags)}
            </p>
            <Link href="/docs/core/classes" className="text-sm text-primary-600 hover:underline">
              {t('architecture.core.link')}
            </Link>
          </div>
          <div className="rounded-xl p-5 border-2 border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/10">
            <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-2">{t('architecture.vue.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {renderDocRichString(t.raw('architecture.vue.description') as string, docRichTags)}
            </p>
            <Link href="/docs/vue/getting-started" className="text-sm text-purple-600 hover:underline">
              {t('architecture.vue.link')}
            </Link>
          </div>
          <div className="rounded-xl p-5 border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10">
            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">{t('architecture.react.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {renderDocRichString(t.raw('architecture.react.description') as string, docRichTags)}
            </p>
            <Link href="/docs/react/getting-started" className="text-sm text-blue-600 hover:underline">
              {t('architecture.react.link')}
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('minimalExample.title')}</h2>
        <CodeBlock language="vue" code={minimalExampleCode} />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
          {renderDocRichString(t.raw('minimalExample.afterNote') as string, richTags)}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('ssr.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('ssr.description') as string, richTags)}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/docs/nuxt"
            className="px-4 py-2 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-sm hover:bg-green-100 dark:hover:bg-green-900/30"
          >
            {tSidebar('nuxt')}
          </Link>
          <Link
            href="/docs/next"
            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {tSidebar('next')}
          </Link>
        </div>
      </section>

      <section className="rounded-xl p-6 border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t('whatsNext.title')}</h2>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            →{' '}
            <Link href="/docs/core/theming-localization#locale-ui-strings" className="text-primary-600 hover:underline">
              {t('whatsNext.theming')}
            </Link>
          </li>
          <li>
            →{' '}
            <Link href="/docs/core/form-fields" className="text-primary-600 hover:underline">
              {t('whatsNext.formFields')}
            </Link>
          </li>
          <li>
            →{' '}
            <a href={DEMO_BB_URL} className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
              {t('whatsNext.demo')}
            </a>
          </li>
          <li>
            →{' '}
            <Link href="/docs/changelog" className="text-primary-600 hover:underline">
              {t('whatsNext.changelog')}
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
