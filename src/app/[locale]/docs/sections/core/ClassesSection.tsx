'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import CodeBlock from '@/components/CodeBlock';
import { GITHUB_EXAMPLES_API_USAGE, GITHUB_EXAMPLES_VUE3_CORE_API } from '@/lib/urls';
import DocHeading from '../../components/DocHeading';
import { docRichTags, renderDocRichString } from '../../components/docRichTags';
import type { NavigationProps } from '../../types';

export default function ClassesSection(_props: NavigationProps) {
  const t = useTranslations('docsPages.core.classes');
  const tSidebar = useTranslations('docs.sidebar');
  const sampleContent = t.raw('example.code.sampleContent') as string;

  const importCode = useMemo(
    () => `import { BlockBuilder } from '@mushket-co/block-builder/core'
import type { IBlockBuilderOptions } from '@mushket-co/block-builder/core'

const blockBuilder = new BlockBuilder({
  blockConfigs,       // ${t('import.code.blockConfigsComment')}
  initialBlocks,      // ${t('import.code.initialBlocksComment')}
  autoInit: true,     // ${t('import.code.autoInitComment')}
} satisfies IBlockBuilderOptions)`,
    [t],
  );

  const exampleCode = useMemo(
    () => `const blockConfigs = {
  text: {
    title: '${t('example.code.blockTitle')}',
    fields: [
      {
        field: 'content',
        label: '${t('example.code.fieldLabel')}',
        type: 'textarea',
        rules: [{ type: 'required', field: 'content' }],
      },
    ],
  },
}

const blockBuilder = new BlockBuilder({ blockConfigs, initialBlocks: [] })

const block = await blockBuilder.createBlock({
  type: 'text',
  props: { content: '${sampleContent}' },
  settings: {},
})

const all = await blockBuilder.getAllBlocks()
const json = await blockBuilder.exportBlocks()`,
    [t, sampleContent],
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {renderDocRichString(t.raw('subtitle') as string, docRichTags)}
        </p>
      </div>

      <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-4 border-green-500">
        <DocHeading id="why">{t('why.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('why.p1') as string, docRichTags)}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{t('why.p2')}</p>
      </section>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <DocHeading id="when">{t('when.title')}</DocHeading>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('when.intro')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-white/60 dark:bg-slate-800/40 p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              <code>BlockBuilderComponent</code> (Vue / React)
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">{t('when.componentDesc')}</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>
                {t('when.componentSsrPrefix')}{' '}
                <Link href="/docs/nuxt" className="text-primary-600 hover:underline">
                  Nuxt
                </Link>
                ,{' '}
                <Link href="/docs/next" className="text-primary-600 hover:underline">
                  Next.js
                </Link>{' '}
                {t('when.componentSsrSuffix')}
              </li>
              <li>
                <Link href="/docs/vue/getting-started" className="text-primary-600 hover:underline">
                  Vue
                </Link>
                {' / '}
                <Link href="/docs/react/getting-started" className="text-primary-600 hover:underline">
                  React
                </Link>{' '}
                {t('when.componentDocs')}
              </li>
            </ul>
          </div>
          <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-white/60 dark:bg-slate-800/40 p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              <code>BlockBuilder</code> (core)
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">{t('when.coreDesc')}</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>{t('when.coreAdminUi')}</li>
              <li>{t('when.coreCustomEditor')}</li>
              <li>{t('when.coreDataOnly')}</li>
              <li>
                {t('when.coreExamples')}{' '}
                <a
                  href={GITHUB_EXAMPLES_API_USAGE}
                  className="text-primary-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  examples/api-usage
                </a>
                ,{' '}
                <a
                  href={GITHUB_EXAMPLES_VUE3_CORE_API}
                  className="text-primary-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  vue3-core-api
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <DocHeading id="import">{t('import.title')}</DocHeading>
        <CodeBlock language="typescript" code={importCode} className="mb-4" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t('import.noteBeforeTypes')}{' '}
          <Link href="/docs/core/types" className="text-primary-600 hover:underline">
            IBlockBuilderOptions
          </Link>
          {t('import.noteBeforeProperties')}{' '}
          <Link href="/docs/core/properties" className="text-primary-600 hover:underline">
            {tSidebar('properties')}
          </Link>
          {t('import.noteAfterProperties')}
        </p>
      </section>

      <section>
        <DocHeading id="example">{t('example.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('example.intro')}</p>
        <CodeBlock language="typescript" code={exampleCode} className="mb-4" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t('example.noteBeforeFormFields')}{' '}
          <Link href="/docs/core/form-fields" className="text-primary-600 hover:underline">
            {tSidebar('formFields')}
          </Link>
          {t('example.noteBeforeMethods')}{' '}
          <Link href="/docs/core/methods" className="text-primary-600 hover:underline">
            {tSidebar('methods')}
          </Link>
          {t('example.noteAfterMethods')}
        </p>
      </section>

      <section className="rounded-xl p-6 border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
        <DocHeading id="map">{t('map.title')}</DocHeading>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            →{' '}
            <Link href="/docs/core/methods" className="text-primary-600 hover:underline">
              {tSidebar('methods')}
            </Link>{' '}
            {t('map.methods')}
          </li>
          <li>
            →{' '}
            <Link href="/docs/core/properties" className="text-primary-600 hover:underline">
              {tSidebar('properties')}
            </Link>{' '}
            {renderDocRichString(t.raw('map.properties') as string, docRichTags)}
          </li>
          <li>
            →{' '}
            <Link href="/docs/core/types" className="text-primary-600 hover:underline">
              {tSidebar('types')}
            </Link>{' '}
            {t('map.types')}
          </li>
          <li>
            →{' '}
            <Link href="/docs/core/form-fields" className="text-primary-600 hover:underline">
              {tSidebar('formFields')}
            </Link>{' '}
            {t('map.formFields')}
          </li>
          <li>
            →{' '}
            <Link href="/docs/core/utilities" className="text-primary-600 hover:underline">
              {tSidebar('utilities')}
            </Link>{' '}
            {t('map.utilities')}
          </li>
        </ul>
      </section>
    </div>
  );
}
