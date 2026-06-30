'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
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
          <MethodCard name="createBlock" signature="blockBuilder.createBlock(block: ICreateBlockDto): Promise&lt;IBlockDto&gt;" description={t('crud.createBlock')} color="blue" />
          <MethodCard name="getBlock" signature="blockBuilder.getBlock(id: string): Promise&lt;IBlockDto | null&gt;" description={t('crud.getBlock')} color="blue" />
          <MethodCard name="getAllBlocks" signature="blockBuilder.getAllBlocks(): Promise&lt;IBlockDto[]&gt;" description={t('crud.getAllBlocks')} color="blue" />
          <MethodCard name="updateBlock" signature="blockBuilder.updateBlock(id: string, updates: IUpdateBlockDto): Promise&lt;IBlockDto | null&gt;" description={t('crud.updateBlock')} color="blue" />
          <MethodCard name="deleteBlock" signature="blockBuilder.deleteBlock(id: string): Promise&lt;boolean&gt;" description={t('crud.deleteBlock')} color="blue" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-500"></span>
          {t('blockState.title')}
        </h2>
        <div className="space-y-4">
          <MethodCard name="setBlockLocked" signature="blockBuilder.setBlockLocked(id: string, locked: boolean): Promise&lt;IBlockDto | null&gt;" description={t('blockState.setBlockLocked')} color="teal" />
          <MethodCard name="setBlockVisible" signature="blockBuilder.setBlockVisible(id: string, visible: boolean): Promise&lt;IBlockDto | null&gt;" description={t('blockState.setBlockVisible')} color="teal" />
          <MethodCard name="reorderBlocks" signature="blockBuilder.reorderBlocks(blockIds: string[]): Promise&lt;boolean&gt;" description={t('blockState.reorderBlocks')} color="teal" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          {t('utility.title')}
        </h2>
        <div className="space-y-4">
          <MethodCard name="duplicateBlock" signature="blockBuilder.duplicateBlock(id: string): Promise&lt;IBlockDto | null&gt;" description={t('utility.duplicateBlock')} color="purple" />
          <MethodCard name="getBlocksCount" signature="blockBuilder.getBlocksCount(): Promise&lt;number&gt;" description={t('utility.getBlocksCount')} color="purple" />
          <MethodCard name="getBlocksByType" signature="blockBuilder.getBlocksByType(type: string): Promise&lt;IBlockDto[]&gt;" description={t('utility.getBlocksByType')} color="purple" />
          <MethodCard name="clearAllBlocks" signature="blockBuilder.clearAllBlocks(): Promise&lt;void&gt;" description={t('utility.clearAllBlocks')} color="purple" />
          <MethodCard name="exportBlocks" signature="blockBuilder.exportBlocks(): Promise&lt;string&gt;" description={t('utility.exportBlocks')} color="purple" />
          <MethodCard name="importBlocks" signature="blockBuilder.importBlocks(json: string): Promise&lt;boolean&gt;" description={t('utility.importBlocks')} color="purple" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
          {t('config.title')}
        </h2>
        <div className="space-y-4">
          <MethodCard name="getBlockConfigs" signature="blockBuilder.getBlockConfigs(): Record&lt;string, IBlockTypeConfig&gt;" description={t('config.getBlockConfigs')} color="indigo" />
          <MethodCard name="getBlockConfig" signature="blockBuilder.getBlockConfig(type: string): IBlockTypeConfig | undefined" description={t('config.getBlockConfig')} color="indigo" />
          <MethodCard name="hasBlockType" signature="blockBuilder.hasBlockType(type: string): boolean" description={t('config.hasBlockType')} color="indigo" />
          <MethodCard name="getAvailableBlockTypes" signature="blockBuilder.getAvailableBlockTypes(): string[]" description={t('config.getAvailableBlockTypes')} color="indigo" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-500"></span>
          {t('components.title')}
        </h2>
        <div className="space-y-4">
          <MethodCard name="registerComponent" signature="blockBuilder.registerComponent(name: string, component: unknown): void" description={t('components.registerComponent')} color="slate" />
          <MethodCard name="registerComponents" signature="blockBuilder.registerComponents(components: Record&lt;string, unknown&gt;): void" description={t('components.registerComponents')} color="slate" />
          <MethodCard name="getComponent" signature="blockBuilder.getComponent(name: string): unknown | null" description={t('components.getComponent')} color="slate" />
          <MethodCard name="hasComponent" signature="blockBuilder.hasComponent(name: string): boolean" description={t('components.hasComponent')} color="slate" />
          <MethodCard name="getAllComponents" signature="blockBuilder.getAllComponents(): Record&lt;string, unknown&gt;" description={t('components.getAllComponents')} color="slate" />
          <MethodCard name="unregisterComponent" signature="blockBuilder.unregisterComponent(name: string): boolean" description={t('components.unregisterComponent')} color="slate" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
          {t('customRenderers.title')}
        </h2>
        <div className="space-y-4">
          <MethodCard name="registerCustomFieldRenderer" signature="blockBuilder.registerCustomFieldRenderer(renderer: ICustomFieldRenderer): void" description={t('customRenderers.registerCustomFieldRenderer')} color="orange" />
          <MethodCard name="registerCustomFieldRenderers" signature="blockBuilder.registerCustomFieldRenderers(renderers: ICustomFieldRenderer[]): void" description={t('customRenderers.registerCustomFieldRenderers')} color="orange" />
          <MethodCard name="getCustomFieldRenderer" signature="blockBuilder.getCustomFieldRenderer(id: string): ICustomFieldRenderer | null" description={t('customRenderers.getCustomFieldRenderer')} color="orange" />
          <MethodCard name="hasCustomFieldRenderer" signature="blockBuilder.hasCustomFieldRenderer(id: string): boolean" description={t('customRenderers.hasCustomFieldRenderer')} color="orange" />
          <MethodCard name="getAllCustomFieldRenderers" signature="blockBuilder.getAllCustomFieldRenderers(): Map&lt;string, ICustomFieldRenderer&gt;" description={t('customRenderers.getAllCustomFieldRenderers')} color="orange" />
          <MethodCard name="unregisterCustomFieldRenderer" signature="blockBuilder.unregisterCustomFieldRenderer(id: string): boolean" description={t('customRenderers.unregisterCustomFieldRenderer')} color="orange" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
          {t('vueHelpers.title')}
        </h2>
        <div className="space-y-4">
          <MethodCard name="createVueBlock" signature="blockBuilder.createVueBlock(type, componentName, componentProps?, settings?): Promise&lt;IBlockDto&gt;" description={t('vueHelpers.createVueBlock')} color="green" />
          <MethodCard name="updateVueComponent" signature="blockBuilder.updateVueComponent(blockId, componentName, componentProps): Promise&lt;IBlockDto | null&gt;" description={t('vueHelpers.updateVueComponent')} color="green" />
        </div>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{t('vueHelpers.note')}</p>
      </section>

      <section className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
        <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{t('editMode.title')}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t('editMode.coreNote')}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {renderDocRichString(t.raw('editMode.note') as string, {
            code: (chunks) => (
              <code className="text-green-700 dark:text-green-400">{chunks}</code>
            ),
            vueLink: (chunks) => (
              <Link href="/docs/vue/components#block-builder-component" className="text-primary-600 hover:underline">
                {chunks}
              </Link>
            ),
            reactLink: (chunks) => (
              <Link href="/docs/react/components#block-builder-component" className="text-primary-600 hover:underline">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </section>
    </div>
  );
}
