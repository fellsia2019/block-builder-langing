'use client';

import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import CodeBlock from '@/components/CodeBlock';
import DocImportantNote from '../../components/DocImportantNote';
import type { NavigationProps } from '../../types';
import { docRichTags } from '../../components/docRichTags';

const orangeCode = (chunks: ReactNode) => (
  <code className="text-orange-700 dark:text-orange-400">{chunks}</code>
);

export default function CustomRenderersSection(_props: NavigationProps) {
  const t = useTranslations('docsPages.core.customRenderers');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
      </div>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('whatIs.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('whatIs.p1')}</p>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('whatIs.whenTitle')}</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
            <li>{t('whatIs.whenItems.wysiwyg')}</li>
            <li>{t('whatIs.whenItems.datePicker')}</li>
            <li>{t('whatIs.whenItems.libraries')}</li>
            <li>{t('whatIs.whenItems.complexSelect')}</li>
            <li>{t('whatIs.whenItems.customControls')}</li>
          </ul>
        </div>
      </section>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('interface.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t.rich('interface.p1', { code: orangeCode })}
        </p>
        <CodeBlock code={t.raw('interface.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('step1.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t.rich('step1.p1', { code: orangeCode })}
        </p>
        <CodeBlock code={t.raw('step1.code')} language="typescript" className="mb-4" />
        <DocImportantNote>
          {t.rich('step1.important', {
            ...docRichTags,
            strong: (chunks) => <strong>{chunks}</strong>,
            link: (chunks) => (
              <Link
                href="/docs/core/form-fields#custom-renderers"
                className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                {chunks}
              </Link>
            ),
          })}
        </DocImportantNote>
      </section>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('step2.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('step2.p1')}</p>
        <CodeBlock code={t.raw('step2.code')} language="typescript" className="mb-4" />
        <DocImportantNote>
          {t.rich('step2.important', {
            ...docRichTags,
            strong: (chunks) => <strong>{chunks}</strong>,
            link: (chunks) => (
              <Link
                href="/docs/core/form-fields#custom-register"
                className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                {chunks}
              </Link>
            ),
          })}
        </DocImportantNote>
      </section>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('step3.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t.rich('step3.p1', { code: orangeCode })}
        </p>
        <CodeBlock code={t.raw('step3.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('datePicker.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('datePicker.p1')}</p>
        <CodeBlock code={t.raw('datePicker.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('async.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t.rich('async.p1', { code: orangeCode })}
        </p>
        <CodeBlock code={t.raw('async.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('api.title')}</h2>
        <div className="space-y-3">
          {(
            [
              'registerCustomFieldRenderer',
              'registerCustomFieldRenderers',
              'getCustomFieldRenderer',
              'hasCustomFieldRenderer',
              'unregisterCustomFieldRenderer',
              'getAllCustomFieldRenderers',
            ] as const
          ).map((key) => (
            <div key={key} className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-orange-700 dark:text-orange-400">{key}(…)</code>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t.rich(`api.${key}`, { code: orangeCode })}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('bestPractices.title')}</h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
          {(
            [
              'destroy',
              'onChange',
              'onError',
              'validate',
              'asyncRender',
              'options',
            ] as const
          ).map((key) => (
            <li key={key} className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>{t.rich(`bestPractices.${key}`, { code: orangeCode })}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
