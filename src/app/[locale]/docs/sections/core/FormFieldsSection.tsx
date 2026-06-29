'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import CodeBlock from '@/components/CodeBlock';
import Icon from '@/components/Icon';
import { GITHUB_EXAMPLES, GITHUB_EXAMPLES_API_USAGE } from '@/lib/urls';
import DocHeading from '../../components/DocHeading';
import DocAnchor from '../../components/DocAnchor';
import DocImportantNote from '../../components/DocImportantNote';
import { docRichTags, renderDocRichString } from '../../components/docRichTags';
import type { NavigationProps } from '../../types';

function ParamDoc({
  name,
  badge,
  children,
}: {
  name: string;
  badge?: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-slate-800/60 rounded-lg p-4 border border-green-200/60 dark:border-green-800/40">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5">
        <code className="text-green-700 dark:text-green-400">{name}</code>
        {badge ? (
          <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">{badge}</span>
        ) : null}
      </h3>
      <div className="text-sm text-gray-600 dark:text-gray-400">{children}</div>
    </div>
  );
}

function FieldTypeCard({
  name,
  description,
  icon,
  example,
}: {
  name: string;
  description: string;
  icon: string;
  example?: string;
}) {
  return (
    <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-900/10 rounded-lg p-4 border border-pink-200 dark:border-pink-800 relative">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-2xl flex items-center">
          {icon === '📝' && <Icon name="pen" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '📄' && <Icon name="document" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '📧' && <Icon name="email" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🔗' && <Icon name="link" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🔢' && <Icon name="number" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '📋' && <Icon name="clipboard" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '☑️' && <Icon name="checkbox" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🔘' && <Icon name="radio" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🎨' && <Icon name="paintbrush" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🖼️' && <Icon name="image" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🔧' && <Icon name="settings" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🔌' && <Icon name="plugin" size={28} className="text-pink-600 dark:text-pink-400" />}
        </div>
        <h3 className="font-bold text-gray-900 dark:text-white">
          <code className="text-pink-700 dark:text-pink-400">{name}</code>
        </h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>
      {example ? (
        <div className="mt-3">
          <CodeBlock code={example} language="javascript" className="text-xs" />
        </div>
      ) : null}
    </div>
  );
}

function makeAnchorTag(labels: Record<string, string>) {
  return (chunks: ReactNode) => {
    const id = String(chunks);
    return <DocAnchor id={id}>{labels[id] ?? chunks}</DocAnchor>;
  };
}

const blueCode = (chunks: ReactNode) => (
  <code className="text-blue-700 dark:text-blue-400">{chunks}</code>
);

const tealCode = (chunks: ReactNode) => (
  <code className="text-teal-700 dark:text-teal-400">{chunks}</code>
);

const greenCode = (chunks: ReactNode) => (
  <code className="text-green-700 dark:text-green-400">{chunks}</code>
);

const yellowCode = (chunks: ReactNode) => (
  <code className="text-yellow-700 dark:text-yellow-400">{chunks}</code>
);

const docLink = (chunks: ReactNode) => {
  const href = String(chunks);
  if (href.startsWith('/docs')) {
    return (
      <Link href={href} className="text-primary-600 dark:text-primary-400 hover:underline">
        {chunks}
      </Link>
    );
  }
  if (href === 'examples/vue3') {
    return (
      <a
        href={`${GITHUB_EXAMPLES}/vue3`}
        className="text-primary-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {chunks}
      </a>
    );
  }
  if (href === 'examples/api-usage') {
    return (
      <a
        href={GITHUB_EXAMPLES_API_USAGE}
        className="text-primary-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {chunks}
      </a>
    );
  }
  return (
    <a href={href} className="text-primary-600 hover:underline">
      {chunks}
    </a>
  );
};

const FIELD_TYPE_CARDS = [
  { key: 'text', icon: '📝' },
  { key: 'textarea', icon: '📄' },
  { key: 'email', icon: '📧' },
  { key: 'url', icon: '🔗' },
  { key: 'number', icon: '🔢' },
  { key: 'select', icon: '📋' },
  { key: 'checkbox', icon: '☑️' },
  { key: 'radio', icon: '🔘' },
  { key: 'color', icon: '🎨' },
  { key: 'image', icon: '🖼️' },
  { key: 'file', icon: '📄' },
  { key: 'fileImport', icon: '📄' },
  { key: 'blockAnchor', icon: '🔗' },
  { key: 'matrixTable', icon: '📋' },
  { key: 'custom', icon: '🔧' },
  { key: 'apiSelect', icon: '🔌' },
] as const;

function fieldTypeName(key: (typeof FIELD_TYPE_CARDS)[number]['key']): string {
  const names: Record<string, string> = {
    blockAnchor: 'block-anchor',
    matrixTable: 'matrix-table',
    fileImport: 'file-import',
    apiSelect: 'api-select',
  };
  return names[key] ?? key;
}

const RULE_ITEM_KEYS = ['required', 'minLength', 'min', 'pattern', 'email', 'custom'] as const;

const WHEN_ITEM_KEYS = ['rating', 'apiData', 'checkFirst'] as const;

export default function FormFieldsSection(_props: NavigationProps) {
  const t = useTranslations('docsPages.core.formFields');

  const anchorLabels: Record<string, string> = {
    'field-params': t('fieldParams.title'),
    'field-types': t('fieldTypes.title'),
    'api-select': t('apiSelect.title'),
    'depends-on': t('dependsOn.title'),
    spacing: t('spacing.title'),
    repeater: t('repeater.title'),
    image: t('image.title'),
    file: t('file.title'),
    'block-anchor': t('blockAnchor.title'),
    'matrix-table': t('matrixTable.title'),
    'custom-renderers': t('customRenderers.title'),
    'custom-register': t('customRenderers.registerTitle'),
  };
  const anchorTag = makeAnchorTag(anchorLabels);

  const greenRich = { ...docRichTags, code: greenCode, anchor: anchorTag };
  const blueRich = { ...docRichTags, code: blueCode, anchor: anchorTag };
  const tealRich = { ...docRichTags, code: tealCode };
  const footerRich = { ...docRichTags, code: greenCode, link: docLink };
  const customRich = {
    ...docRichTags,
    code: greenCode,
    strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
    anchor: anchorTag,
  };
  const importantRich = {
    ...docRichTags,
    code: yellowCode,
    strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
    anchor: anchorTag,
  };

  const flowStepCount = (t.raw('customRenderers.flowSteps') as string[]).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
      </div>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <DocHeading id="overview">{t('overview.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400">{renderDocRichString(t.raw('overview.description') as string, blueRich)}</p>
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="validation" className="flex items-center gap-2">
          <Icon name="shield" size={22} className="text-teal-600 dark:text-teal-400" />
          <span>{t('validation.title')}</span>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('validation.description') as string, tealRich)}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('usageExample.title')}</h2>
        <CodeBlock code={t.raw('usageExample.code')} language="javascript" className="mb-4" />
      </section>

      <section>
        <DocHeading id="field-types">{t('fieldTypes.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('fieldTypes.description') as string, greenRich)}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FIELD_TYPE_CARDS.map(({ key, icon }) => (
            <FieldTypeCard
              key={key}
              name={fieldTypeName(key)}
              description={t(`fieldTypes.cards.${key}.description`)}
              icon={icon}
              example={t.raw(`fieldTypes.cards.${key}.example`)}
            />
          ))}
        </div>
      </section>

      <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-4 border-green-500">
        <DocHeading id="field-params">{t('fieldParams.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{renderDocRichString(t.raw('fieldParams.intro') as string, greenRich)}</p>

        <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">{t('fieldParams.basic.title')}</h3>
        <div className="space-y-3 mb-8">
          <ParamDoc name="field" badge={t('fieldParams.basic.field.badge')}>
            <p>{renderDocRichString(t.raw('fieldParams.basic.field.description') as string, greenRich)}</p>
          </ParamDoc>
          <ParamDoc name="label" badge={t('fieldParams.basic.label.badge')}>
            <p>{renderDocRichString(t.raw('fieldParams.basic.label.description') as string, greenRich)}</p>
          </ParamDoc>
          <ParamDoc name="type" badge={t('fieldParams.basic.type.badge')}>
            <p>{renderDocRichString(t.raw('fieldParams.basic.type.description') as string, greenRich)}</p>
          </ParamDoc>
          <ParamDoc name="defaultValue" badge={t('fieldParams.basic.defaultValue.badge')}>
            <p>{renderDocRichString(t.raw('fieldParams.basic.defaultValue.description') as string, greenRich)}</p>
          </ParamDoc>
          <ParamDoc name="placeholder" badge={t('fieldParams.basic.placeholder.badge')}>
            <p>{renderDocRichString(t.raw('fieldParams.basic.placeholder.description') as string, greenRich)}</p>
          </ParamDoc>
        </div>

        <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
          {t('fieldParams.valueSelection.title')}
        </h3>
        <div className="space-y-3 mb-8">
          <ParamDoc name="options" badge={t('fieldParams.valueSelection.options.badge')}>
            <p>{renderDocRichString(t.raw('fieldParams.valueSelection.options.description') as string, greenRich)}</p>
          </ParamDoc>
          <ParamDoc name="multiple" badge={t('fieldParams.valueSelection.multiple.badge')}>
            <p>{renderDocRichString(t.raw('fieldParams.valueSelection.multiple.description') as string, greenRich)}</p>
          </ParamDoc>
          <ParamDoc name="optionsFrom" badge={t('fieldParams.valueSelection.optionsFrom.badge')}>
            <p>{renderDocRichString(t.raw('fieldParams.valueSelection.optionsFrom.description') as string, greenRich)}</p>
          </ParamDoc>
        </div>

        <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
          {t('fieldParams.validationVisibility.title')}
        </h3>
        <div className="space-y-3 mb-8">
          <ParamDoc name="rules" badge={t('fieldParams.validationVisibility.rules.badge')}>
            <p className="mb-2">{renderDocRichString(t.raw('fieldParams.validationVisibility.rules.description') as string, greenRich)}</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {RULE_ITEM_KEYS.map((key) => (
                <li key={key}>{renderDocRichString(t.raw(`fieldParams.validationVisibility.rules.items.${key}`) as string, greenRich)}</li>
              ))}
            </ul>
          </ParamDoc>
          <ParamDoc name="dependsOn" badge={t('fieldParams.validationVisibility.dependsOn.badge')}>
            <p>{renderDocRichString(t.raw('fieldParams.validationVisibility.dependsOn.description') as string, greenRich)}</p>
          </ParamDoc>
          <ParamDoc name="persist" badge={t('fieldParams.validationVisibility.persist.badge')}>
            <p>{renderDocRichString(t.raw('fieldParams.validationVisibility.persist.description') as string, greenRich)}</p>
          </ParamDoc>
        </div>

        <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">{t('fieldParams.typeConfigs.title')}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t('fieldParams.typeConfigs.intro')}</p>
        <div className="space-y-3">
          <ParamDoc name="spacingConfig / spacingOptions">
            <p>{renderDocRichString(t.raw('fieldParams.typeConfigs.spacingConfig.description') as string, greenRich)}</p>
          </ParamDoc>
          <ParamDoc name="repeaterConfig">
            <p>{renderDocRichString(t.raw('fieldParams.typeConfigs.repeaterConfig.description') as string, greenRich)}</p>
          </ParamDoc>
          <ParamDoc name="fileUploadConfig">
            <p>{renderDocRichString(t.raw('fieldParams.typeConfigs.fileUploadConfig.description') as string, greenRich)}</p>
          </ParamDoc>
          <ParamDoc name="fileImportConfig">
            <p>{renderDocRichString(t.raw('fieldParams.typeConfigs.fileImportConfig.description') as string, greenRich)}</p>
          </ParamDoc>
          <ParamDoc name="blockAnchorConfig">
            <p>{renderDocRichString(t.raw('fieldParams.typeConfigs.blockAnchorConfig.description') as string, greenRich)}</p>
          </ParamDoc>
          <ParamDoc name="matrixTableConfig">
            <p>{renderDocRichString(t.raw('fieldParams.typeConfigs.matrixTableConfig.description') as string, greenRich)}</p>
          </ParamDoc>
          <ParamDoc name="apiSelectConfig">
            <p>{renderDocRichString(t.raw('fieldParams.typeConfigs.apiSelectConfig.description') as string, greenRich)}</p>
          </ParamDoc>
          <ParamDoc name="customFieldConfig">
            <p>{renderDocRichString(t.raw('fieldParams.typeConfigs.customFieldConfig.description') as string, greenRich)}</p>
          </ParamDoc>
        </div>
      </section>

      <section className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-xl p-6 border-l-4 border-fuchsia-500">
        <DocHeading id="select">{t('select.title')}</DocHeading>

        <CodeBlock code={t.raw('select.code')} language="javascript" className="mb-4" />

        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
          <li>{renderDocRichString(t.raw('select.items.single') as string, docRichTags)}</li>
          <li>{renderDocRichString(t.raw('select.items.multiple') as string, docRichTags)}</li>
        </ul>

        <CodeBlock code={t.raw('select.displayLabelCode')} language="javascript" className="text-xs" />
      </section>

      <section className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border-l-4 border-purple-500">
        <DocHeading id="spacing">{t('spacing.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('spacing.description') as string, docRichTags)}</p>
        <CodeBlock code={t.raw('spacing.code')} language="javascript" className="mb-4" />
        <p className="text-sm text-gray-600 dark:text-gray-400">{renderDocRichString(t.raw('spacing.note') as string, docRichTags)}</p>
      </section>

      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
        <DocHeading id="repeater">{t('repeater.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('repeater.description') as string, docRichTags)}</p>

        <CodeBlock code={t.raw('repeater.code')} language="javascript" className="mb-4" />

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{renderDocRichString(t.raw('repeater.notes') as string, docRichTags)}</p>

        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{t('repeater.nestedTitle')}</h3>
        <CodeBlock code={t.raw('repeater.nestedCode')} language="javascript" />
      </section>

      <section className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-6 border-l-4 border-pink-500">
        <DocHeading id="image">{t('image.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('image.description') as string, docRichTags)}</p>
        <CodeBlock code={t.raw('image.code')} language="javascript" className="mb-4" />
        <DocImportantNote>{renderDocRichString(t.raw('image.importantNote') as string, importantRich)}</DocImportantNote>
        <CodeBlock code={t.raw('image.urlHelperCode')} language="javascript" className="text-xs" />
      </section>

      <section className="bg-slate-50 dark:bg-slate-900/20 rounded-xl p-6 border-l-4 border-slate-500">
        <DocHeading id="file">{t('file.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('file.description') as string, docRichTags)}</p>
        <CodeBlock code={t.raw('file.code')} language="javascript" className="mb-4" />
      </section>

      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
        <DocHeading id="block-anchor">{t('blockAnchor.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('blockAnchor.description') as string, docRichTags)}</p>

        <CodeBlock code={t.raw('blockAnchor.code')} language="javascript" className="mb-4" />

        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
          {t('blockAnchor.scrollExampleTitle')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          {renderDocRichString(t.raw('blockAnchor.scrollExampleIntro') as string, docRichTags)}
        </p>
        <CodeBlock code={t.raw('blockAnchor.scrollExampleCode')} language="vue" className="mb-4" />
      </section>

      <section className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border-l-4 border-emerald-500">
        <DocHeading id="matrix-table">{t('matrixTable.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('matrixTable.description') as string, docRichTags)}</p>
        <CodeBlock code={t.raw('matrixTable.code')} language="javascript" />
      </section>

      <section className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-6 border-l-4 border-cyan-500">
        <DocHeading id="api-select">{t('apiSelect.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('apiSelect.description') as string, docRichTags)}</p>

        <CodeBlock code={t.raw('apiSelect.code')} language="javascript" className="mb-4" />

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('apiSelect.responseFormatLabel')}</p>
        <CodeBlock code={t.raw('apiSelect.responseExample')} language="json" />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{renderDocRichString(t.raw('apiSelect.notes') as string, docRichTags)}</p>
      </section>

      <section className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border-l-4 border-emerald-500">
        <DocHeading id="depends-on">{t('dependsOn.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('dependsOn.description') as string, docRichTags)}</p>

        <CodeBlock code={t.raw('dependsOn.code')} language="javascript" className="mb-4" />

        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{t('dependsOn.repeaterTitle')}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {renderDocRichString(t.raw('dependsOn.repeaterDescription') as string, docRichTags)}
          </p>
          <CodeBlock code={t.raw('dependsOn.repeaterCode')} language="javascript" />
        </div>
      </section>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <DocHeading id="custom-renderers">{t('customRenderers.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('customRenderers.description') as string, customRich)}</p>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4 border border-orange-200 dark:border-orange-800">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{t('customRenderers.whenTitle')}</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
            {WHEN_ITEM_KEYS.map((key) => (
              <li key={key}>{renderDocRichString(t.raw(`customRenderers.whenItems.${key}`) as string, customRich)}</li>
            ))}
          </ul>
        </div>

        <DocHeading id="custom-flow" level={3}>
          {t('customRenderers.flowTitle')}
        </DocHeading>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-4">
          {Array.from({ length: flowStepCount }, (_, index) => (
            <li key={index}>{renderDocRichString(t.raw(`customRenderers.flowSteps.${index}`) as string, customRich)}</li>
          ))}
        </ol>

        <DocHeading id="custom-interface" level={3}>
          {t('customRenderers.interfaceTitle')}
        </DocHeading>
        <CodeBlock code={t.raw('customRenderers.interfaceCode')} language="typescript" className="mb-4" />
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {renderDocRichString(t.raw('customRenderers.interfaceNote') as string, customRich)}
        </p>

        <DocHeading id="custom-register" level={3}>
          {t('customRenderers.registerTitle')}
        </DocHeading>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {renderDocRichString(t.raw('customRenderers.registerCoreLabel') as string, customRich)}
        </p>
        <CodeBlock code={t.raw('customRenderers.registerCoreCode')} language="typescript" className="mb-4" />
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {renderDocRichString(t.raw('customRenderers.registerFrameworkLabel') as string, customRich)}
        </p>
        <CodeBlock code={t.raw('customRenderers.registerFrameworkCode')} language="tsx" className="mb-4" />

        <DocImportantNote>{renderDocRichString(t.raw('customRenderers.importantNote') as string, importantRich)}</DocImportantNote>

        <DocHeading id="custom-example" level={3}>
          {t('customRenderers.exampleTitle')}
        </DocHeading>
        <CodeBlock code={t.raw('customRenderers.exampleCode')} language="typescript" className="mb-4" />

        <CodeBlock code={t.raw('customRenderers.configExampleCode')} language="javascript" className="mb-4" />

        <ParamDoc name="customFieldConfig">
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>{renderDocRichString(t.raw('customRenderers.customFieldConfig.rendererId') as string, customRich)}</li>
            <li>{renderDocRichString(t.raw('customRenderers.customFieldConfig.options') as string, customRich)}</li>
          </ul>
        </ParamDoc>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          {renderDocRichString(t.raw('customRenderers.footerNote') as string, footerRich)}
        </p>
      </section>
    </div>
  );
}
