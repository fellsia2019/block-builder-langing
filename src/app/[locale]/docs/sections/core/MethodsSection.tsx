'use client';

import { useTranslations } from 'next-intl';
import { renderDocRichString } from '../../components/docRichTags';
import MethodCard from '../../components/MethodCard';
import type { NavigationProps } from '../../types';

export default function MethodsSection(_props: NavigationProps) {
  const t = useTranslations('docsPages.core.methods');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          {t('crud.title')}
        </h2>
        <div className="space-y-4">
          <MethodCard name="createBlock" signature="blockBuilder.createBlock(block: CreateBlockDto): Promise&lt;Block&gt;" description={t('crud.createBlock')} color="blue" />
          <MethodCard name="getBlock" signature="blockBuilder.getBlock(id: string): Promise&lt;Block | null&gt;" description={t('crud.getBlock')} color="blue" />
          <MethodCard name="getAllBlocks" signature="blockBuilder.getAllBlocks(): Promise&lt;Block[]&gt;" description={t('crud.getAllBlocks')} color="blue" />
          <MethodCard name="updateBlock" signature="blockBuilder.updateBlock(id: string, updates: UpdateBlockDto): Promise&lt;Block&gt;" description={t('crud.updateBlock')} color="blue" />
          <MethodCard name="deleteBlock" signature="blockBuilder.deleteBlock(id: string): Promise&lt;boolean&gt;" description={t('crud.deleteBlock')} color="blue" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          {t('utility.title')}
        </h2>
        <div className="space-y-4">
          <MethodCard name="duplicateBlock" signature="blockBuilder.duplicateBlock(id: string): Promise&lt;Block&gt;" description={t('utility.duplicateBlock')} color="purple" />
          <MethodCard name="getBlocksCount" signature="blockBuilder.getBlocksCount(): Promise&lt;number&gt;" description={t('utility.getBlocksCount')} color="purple" />
          <MethodCard name="getBlocksByType" signature="blockBuilder.getBlocksByType(type: string): Promise&lt;Block[]&gt;" description={t('utility.getBlocksByType')} color="purple" />
          <MethodCard name="exportBlocks" signature="blockBuilder.exportBlocks(): string" description={t('utility.exportBlocks')} color="purple" />
          <MethodCard name="importBlocks" signature="blockBuilder.importBlocks(json: string): boolean" description={t('utility.importBlocks')} color="purple" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          {t('editMode.title')}
        </h2>
        <div className="space-y-4">
          <MethodCard name="setIsEdit" signature="blockBuilder.setIsEdit(isEdit: boolean): void" description={t('editMode.setIsEdit')} color="green" />
          <MethodCard name="getIsEdit" signature="blockBuilder.getIsEdit(): boolean" description={t('editMode.getIsEdit')} color="green" />
        </div>
        <div className="mt-4 bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {renderDocRichString(t.raw('editMode.note') as string, {
              code: (chunks) => (
                <code className="text-green-700 dark:text-green-400">{chunks}</code>
              ),
            })}
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
          {t('customRenderers.title')}
        </h2>
        <div className="space-y-4">
          <MethodCard name="registerCustomFieldRenderer" signature="blockBuilder.registerCustomFieldRenderer(renderer: CustomFieldRenderer): void" description={t('customRenderers.registerCustomFieldRenderer')} color="orange" />
          <MethodCard name="registerCustomFieldRenderers" signature="blockBuilder.registerCustomFieldRenderers(renderers: CustomFieldRenderer[]): void" description={t('customRenderers.registerCustomFieldRenderers')} color="orange" />
          <MethodCard name="getCustomFieldRenderer" signature="blockBuilder.getCustomFieldRenderer(id: string): CustomFieldRenderer | null" description={t('customRenderers.getCustomFieldRenderer')} color="orange" />
          <MethodCard name="hasCustomFieldRenderer" signature="blockBuilder.hasCustomFieldRenderer(id: string): boolean" description={t('customRenderers.hasCustomFieldRenderer')} color="orange" />
          <MethodCard name="getAllCustomFieldRenderers" signature="blockBuilder.getAllCustomFieldRenderers(): Map&lt;string, CustomFieldRenderer&gt;" description={t('customRenderers.getAllCustomFieldRenderers')} color="orange" />
          <MethodCard name="unregisterCustomFieldRenderer" signature="blockBuilder.unregisterCustomFieldRenderer(id: string): boolean" description={t('customRenderers.unregisterCustomFieldRenderer')} color="orange" />
        </div>
      </section>
    </div>
  );
}
