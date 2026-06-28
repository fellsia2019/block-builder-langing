'use client';

import { useTranslations } from 'next-intl';
import CodeBlock from '@/components/CodeBlock';
import { docRichTags } from '../../components/docRichTags';
import type { NavigationProps } from '../../types';

export default function PropertiesSection(_props: NavigationProps) {
  const t = useTranslations('docsPages.core.properties');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t.rich('subtitle', docRichTags)}</p>
      </div>

      {/* theme / locale — в API есть, но пока не влияют на поведение
      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-indigo-700 dark:text-indigo-400">theme</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">Текущая тема (light/dark)</p>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <code className="text-sm text-gray-900 dark:text-gray-100">readonly theme: string</code>
        </div>
      </section>

      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-indigo-700 dark:text-indigo-400">locale</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">Текущая локализация</p>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <code className="text-sm text-gray-900 dark:text-gray-100">readonly locale: string</code>
        </div>
      </section>
      */}

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('initOptions.title')}</h2>

        <div className="space-y-6">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              <code className="text-indigo-700 dark:text-indigo-400">blockConfigs</code>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                {t('initOptions.blockConfigs.required')}
              </span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {t.rich('initOptions.blockConfigs.description', docRichTags)}
            </p>
            <code className="text-sm bg-white dark:bg-slate-800 rounded p-3 block">
              blockConfigs: Record&lt;string, IBlockConfig&gt;
            </code>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              <code className="text-indigo-700 dark:text-indigo-400">autoInit</code>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {t.rich('initOptions.autoInit.description', docRichTags)}
            </p>
            <code className="text-sm bg-white dark:bg-slate-800 rounded p-3 block">autoInit?: boolean</code>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              <code className="text-indigo-700 dark:text-indigo-400">initialBlocks</code>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{t('initOptions.initialBlocks.description')}</p>
            <CodeBlock
              language="javascript"
              code={`const blockBuilder = new BlockBuilder({
  blockConfigs,
  initialBlocks: await loadBlocksFromApi(),
})`}
            />
          </div>

          {/* theme / locale — зарезервировано в пакете, пока без эффекта
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              <code className="text-indigo-700 dark:text-indigo-400">theme</code> /{' '}
              <code className="text-indigo-700 dark:text-indigo-400">locale</code>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Опциональные настройки темы и локали при создании.
            </p>
            <CodeBlock
              language="javascript"
              code={`new BlockBuilder({
  blockConfigs,
  theme: 'dark',
  locale: 'ru',
})`}
            />
          </div>
          */}        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
          {t.rich('initOptions.uiNote', docRichTags)}
        </p>
      </section>
    </div>
  );
}
