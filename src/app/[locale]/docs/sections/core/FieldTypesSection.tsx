'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import CodeBlock from '@/components/CodeBlock';
import Icon from '@/components/Icon';
import type { NavigationProps } from '../../types';
import { docRichTags, renderDocRichString } from '../../components/docRichTags';

function FieldTypeCard({
  name,
  description,
  icon,
  example,
  parametersLabel,
  parameters,
}: {
  name: string;
  description: string;
  icon: string;
  example?: string;
  parametersLabel: string;
  parameters?: string[];
}) {
  return (
    <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-900/10 rounded-lg p-4 border border-pink-200 dark:border-pink-800">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-2xl flex items-center">
          {icon === '📝' && <Icon name="pen" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '📄' && <Icon name="document" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🔗' && <Icon name="link" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🔢' && <Icon name="number" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '📋' && <Icon name="clipboard" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '☑️' && <Icon name="checkbox" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🔘' && <Icon name="radio" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🎨' && <Icon name="paintbrush" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🖼️' && <Icon name="image" size={28} className="text-pink-600 dark:text-pink-400" />}
        </div>
        <h3 className="font-bold text-gray-900 dark:text-white">
          <code className="text-pink-700 dark:text-pink-400">{name}</code>
        </h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>
      {parameters && parameters.length > 0 ? (
        <div className="mb-2">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">{parametersLabel}</p>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            {parameters.map((param) => (
              <li key={param} className="flex items-start">
                <span className="text-pink-500 mr-1">•</span>
                <code className="text-xs">{param}</code>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {example ? (
        <div className="mt-3">
          <CodeBlock code={example} language="javascript" className="text-xs" />
        </div>
      ) : null}
    </div>
  );
}

const greenCode = (chunks: ReactNode) => (
  <code className="text-green-700 dark:text-green-400">{chunks}</code>
);

export default function FieldTypesSection(_props: NavigationProps) {
  const t = useTranslations('docsPages.core.fieldTypes');

  const fieldCards = [
    'text',
    'textarea',
    'number',
    'select',
    'checkbox',
    'radio',
    'color',
    'image',
    'file',
    'blockAnchor',
    'matrixTable',
  ] as const;

  const paramKeys = [
    'field',
    'label',
    'type',
    'defaultValue',
    'placeholder',
    'options',
    'multiple',
    'rules',
  ] as const;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
      </div>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('whatIs.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {renderDocRichString(t.raw('whatIs.p1') as string, {
            strong: (chunks) => <strong>{chunks}</strong>,
            code: (chunks) => <code className="text-blue-700 dark:text-blue-400">{chunks}</code>,
          })}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('whatIs.p2')}</p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
          <li>{t('whatIs.uses.create')}</li>
          <li>{t('whatIs.uses.edit')}</li>
          <li>
            {renderDocRichString(t.raw('whatIs.uses.props') as string, {
              code: (chunks) => <code className="text-blue-700 dark:text-blue-400">{chunks}</code>,
            })}
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('usageExample.title')}</h2>
        <CodeBlock code={t.raw('usageExample.code')} language="javascript" className="mb-4" />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('availableTypes.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fieldCards.map((key) => (
            <FieldTypeCard
              key={key}
              name={key === 'blockAnchor' ? 'block-anchor' : key === 'matrixTable' ? 'matrix-table' : key}
              description={t(`cards.${key}.description`)}
              icon={t(`cards.${key}.icon`)}
              example={t.raw(`cards.${key}.example`)}
              parametersLabel={t('parametersLabel')}
              parameters={t.raw(`cards.${key}.parameters`) as string[]}
            />
          ))}
        </div>
      </section>

      <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-4 border-green-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('commonParams.title')}</h2>
        <div className="space-y-3">
          {paramKeys.map((key) => (
            <div key={key}>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                {greenCode(key)}{' '}
                <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">
                  {t(`commonParams.${key}.badge`)}
                </span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {key === 'type' || key === 'placeholder' || key === 'options' || key === 'multiple' || key === 'rules'
                  ? renderDocRichString(t.raw(`commonParams.${key}.description`) as string, { code: greenCode })
                  : renderDocRichString(t.raw(`commonParams.${key}.description`) as string, docRichTags)}
              </p>
              {key === 'options' ? (
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-4 mt-2">
                  <li>{renderDocRichString(t.raw('commonParams.options.items.value') as string, { strong: (c) => <strong>{c}</strong>, code: greenCode })}</li>
                  <li>{renderDocRichString(t.raw('commonParams.options.items.label') as string, { strong: (c) => <strong>{c}</strong> })}</li>
                  <li>{renderDocRichString(t.raw('commonParams.options.items.disabled') as string, { strong: (c) => <strong>{c}</strong> })}</li>
                </ul>
              ) : null}
              {key === 'multiple' ? (
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-4 mt-2">
                  <li>{renderDocRichString(t.raw('commonParams.multiple.items.select') as string, { strong: (c) => <strong>{c}</strong>, code: greenCode })}</li>
                  <li>{renderDocRichString(t.raw('commonParams.multiple.items.file') as string, { strong: (c) => <strong>{c}</strong> })}</li>
                </ul>
              ) : null}
              {key === 'rules' ? (
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-4 mt-2">
                  {(['required', 'minLength', 'maxLength', 'min', 'max'] as const).map((ruleKey) => (
                    <li key={ruleKey}>
                      {greenCode(`{ type: '${ruleKey === 'minLength' ? 'minLength' : ruleKey === 'maxLength' ? 'maxLength' : ruleKey}', ... }`)}
                      {' — '}
                      {t(`commonParams.rules.items.${ruleKey}`)}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
