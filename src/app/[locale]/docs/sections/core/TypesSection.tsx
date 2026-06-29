'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import CodeBlock from '@/components/CodeBlock';
import type { NavigationProps } from '../../types';
import DocHeading from '../../components/DocHeading';
import { docRichTags, renderDocRichString } from '../../components/docRichTags';

const tealCode = (chunks: ReactNode) => (
  <code className="text-teal-700 dark:text-teal-400">{chunks}</code>
);

export default function TypesSection(_props: NavigationProps) {
  const t = useTranslations('docsPages.core.types');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
      </div>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="iblock-builder-options">
          <code className="text-teal-700 dark:text-teal-400">IBlockBuilderOptions</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('iblockBuilderOptions.description') as string, { code: tealCode })}</p>
        <CodeBlock code={t.raw('iblockBuilderOptions.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="iblock">
          <code className="text-teal-700 dark:text-teal-400">IBlock</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('iblock.description')}</p>
        <CodeBlock code={t.raw('iblock.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="iblock-dto">
          <code className="text-teal-700 dark:text-teal-400">IBlockDto</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('iblockDto.description')}</p>
        <CodeBlock code={t.raw('iblockDto.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="icreate-block-dto">
          <code className="text-teal-700 dark:text-teal-400">ICreateBlockDto</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('icreateBlockDto.description')}</p>
        <CodeBlock code={t.raw('icreateBlockDto.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="iupdate-block-dto">
          <code className="text-teal-700 dark:text-teal-400">IUpdateBlockDto</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('iupdateBlockDto.description')}</p>
        <CodeBlock code={t.raw('iupdateBlockDto.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="iblock-metadata">
          <code className="text-teal-700 dark:text-teal-400">IBlockMetadata</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('iblockMetadata.description')}</p>
        <CodeBlock code={t.raw('iblockMetadata.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="iform-field-config">
          <code className="text-teal-700 dark:text-teal-400">IFormFieldConfig</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('iformFieldConfig.description')}</p>
        <CodeBlock code={t.raw('iformFieldConfig.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="irepeater-field-config">
          <code className="text-teal-700 dark:text-teal-400">IRepeaterFieldConfig</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {renderDocRichString(t.raw('irepeaterFieldConfig.description') as string, { code: tealCode })}
        </p>
        <CodeBlock code={t.raw('irepeaterFieldConfig.code')} language="typescript" className="mb-2" />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {renderDocRichString(t.raw('irepeaterFieldConfig.note') as string, { code: tealCode })}
        </p>
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="irepeater-item-field-config">
          <code className="text-teal-700 dark:text-teal-400">IRepeaterItemFieldConfig</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {renderDocRichString(t.raw('irepeaterItemFieldConfig.description') as string, { code: tealCode })}
        </p>
        <CodeBlock code={t.raw('irepeaterItemFieldConfig.code')} language="typescript" className="mb-2" />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {renderDocRichString(t.raw('irepeaterItemFieldConfig.note') as string, { code: tealCode })}
        </p>
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="iform-generation-config">
          <code className="text-teal-700 dark:text-teal-400">IFormGenerationConfig</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('iformGenerationConfig.description')}</p>
        <CodeBlock code={t.raw('iformGenerationConfig.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="tfield-type">
          <code className="text-teal-700 dark:text-teal-400">TFieldType</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('tfieldType.description')}</p>
        <CodeBlock code={t.raw('tfieldType.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="ivalidation-rule">
          <code className="text-teal-700 dark:text-teal-400">IValidationRule</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('ivalidationRule.description')}</p>
        <CodeBlock code={t.raw('ivalidationRule.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="iapi-select-item">
          <code className="text-teal-700 dark:text-teal-400">IApiSelectItem</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('iapiSelectItem.description')}</p>
        <CodeBlock code={t.raw('iapiSelectItem.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="iapi-select-response">
          <code className="text-teal-700 dark:text-teal-400">IApiSelectResponse</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('iapiSelectResponse.description')}</p>
        <CodeBlock code={t.raw('iapiSelectResponse.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="iapi-request-params">
          <code className="text-teal-700 dark:text-teal-400">IApiRequestParams</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('iapiRequestParams.description')}</p>
        <CodeBlock code={t.raw('iapiRequestParams.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="thttp-method">
          <code className="text-teal-700 dark:text-teal-400">THttpMethod</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('thttpMethod.description')}</p>
        <CodeBlock code={t.raw('thttpMethod.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="ifield-validation-config">
          <code className="text-teal-700 dark:text-teal-400">IFieldValidationConfig</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('ifieldValidationConfig.description')}</p>
        <CodeBlock code={t.raw('ifieldValidationConfig.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="ivalidation-result">
          <code className="text-teal-700 dark:text-teal-400">IValidationResult</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('ivalidationResult.description')}</p>
        <CodeBlock code={t.raw('ivalidationResult.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="iapi-select-config">
          <code className="text-teal-700 dark:text-teal-400">IApiSelectConfig</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {renderDocRichString(t.raw('iapiSelectConfig.description') as string, docRichTags)}
        </p>
        <CodeBlock code={t.raw('iapiSelectConfig.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="iblock-anchor-config">
          <code className="text-teal-700 dark:text-teal-400">IBlockAnchorConfig</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {renderDocRichString(t.raw('iblockAnchorConfig.description') as string, docRichTags)}
        </p>
        <CodeBlock code={t.raw('iblockAnchorConfig.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="idepends-on-config">
          <code className="text-teal-700 dark:text-teal-400">IDependsOnConfig</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('idependsOnConfig.description')}</p>
        <CodeBlock code={t.raw('idependsOnConfig.code')} language="typescript" className="mb-4" />
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-4">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">{t('idependsOnConfig.operatorsTitle')}</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>{renderDocRichString(t.raw('idependsOnConfig.operators.equals') as string, { code: (c) => <code className="text-blue-700 dark:text-blue-400">{c}</code> })}</li>
            <li>{renderDocRichString(t.raw('idependsOnConfig.operators.notEquals') as string, { code: (c) => <code className="text-blue-700 dark:text-blue-400">{c}</code> })}</li>
            <li>{renderDocRichString(t.raw('idependsOnConfig.operators.in') as string, { code: (c) => <code className="text-blue-700 dark:text-blue-400">{c}</code> })}</li>
            <li>{renderDocRichString(t.raw('idependsOnConfig.operators.notIn') as string, { code: (c) => <code className="text-blue-700 dark:text-blue-400">{c}</code> })}</li>
          </ul>
        </div>
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="icustom-field-form-scope">
          <code className="text-teal-700 dark:text-teal-400">ICustomFieldFormScope</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {renderDocRichString(t.raw('icustomFieldFormScope.description') as string, docRichTags)}
        </p>
        <CodeBlock code={t.raw('icustomFieldFormScope.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="ioptions-from-config">
          <code className="text-teal-700 dark:text-teal-400">IOptionsFromConfig</code>
        </DocHeading>
        <CodeBlock code={t.raw('ioptionsFromConfig.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="ifile-import-config">
          <code className="text-teal-700 dark:text-teal-400">IFileImportConfig</code>
        </DocHeading>
        <CodeBlock code={t.raw('ifileImportConfig.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="iblock-type-config">
          <code className="text-teal-700 dark:text-teal-400">IBlockTypeConfig</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {renderDocRichString(t.raw('iblockTypeConfig.description') as string, { code: tealCode })}
        </p>
        <CodeBlock code={t.raw('iblockTypeConfig.code')} language="typescript" className="mb-2" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {renderDocRichString(t.raw('iblockTypeConfig.note') as string, { code: tealCode })}
        </p>
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="iblock-form-hooks">
          <code className="text-teal-700 dark:text-teal-400">IBlockFormHooks</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {renderDocRichString(t.raw('iblockFormHooks.description') as string, docRichTags)}
        </p>
        <CodeBlock code={t.raw('iblockFormHooks.code')} language="typescript" className="mb-4" />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="tblock-id">
          <code className="text-teal-700 dark:text-teal-400">TBlockId</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('tblockId.description')}</p>
        <CodeBlock code={t.raw('tblockId.code')} language="typescript" className="mb-4" />
      </section>
    </div>
  );
}
