'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import CodeBlock from '@/components/CodeBlock';
import Icon from '@/components/Icon';
import type { NavigationProps } from '../../types';
import DocHeading from '../../components/DocHeading';
import UploadUrlImportantNote from '../../components/UploadUrlImportantNote';
import { Link } from '@/i18n/navigation';
import { docRichTags } from '../../components/docRichTags';

const PROP_KEYS = [
  'blockManagementUseCase',
  'apiSelectUseCase',
  'customFieldRendererRegistry',
  'initialBlocks',
  'onSave',
  'isEdit',
  'controlsContainerClass',
  'controlsFixedPosition',
  'controlsOffset',
  'controlsOffsetVar',
  'locale',
  'uiStrings',
  'theme',
  'themeVars',
  'warnOnPageLeave',
] as const;

const EVENT_KEYS = [
  { name: '@block-added', key: 'blockAdded' as const, signature: '(block: IBlock) => void' },
  { name: '@block-updated', key: 'blockUpdated' as const, signature: '(block: IBlock) => void' },
  { name: '@block-deleted', key: 'blockDeleted' as const, signature: '(blockId: TBlockId) => void' },
] as const;

export default function ComponentsSection(_props: NavigationProps) {
  const t = useTranslations('docsPages.vue3.components');
  const tCommon = useTranslations('docsPages.common');
  const importantItems = t.raw('blockComponents.importantItems') as string[];

  const configTypeCode = useMemo(
    () => `{
  availableBlockTypes?: Array<IBlockType>,  // ${t('code.blockTypesArrayComment')}
}`,
    [t],
  );

  const iblockTypeCode = useMemo(
    () => `{
  type: string,                    // ${t('code.typeComment')}
  label: string,                   // ${t('code.labelComment')}
  title?: string,                  // ${t('code.titleComment')}
  icon?: string,                   // ${t('code.iconComment')}
  render?: {                       // ${t('code.renderComment')}
    kind: 'component' | 'html',
    framework?: 'vue',
    component?: Component,         // ${t('code.componentComment')}
    template?: string | Function    // ${t('code.templateComment')}
  },
  defaultSettings?: Record<string, any>,  // ${t('code.defaultSettingsComment')}
  defaultProps?: Record<string, any>,      // ${t('code.defaultPropsComment')}
  fields?: Array<IFormFieldConfig>,       // ${t('code.fieldsComment')}
  formHooks?: IBlockFormHooks,
  spacingOptions?: {                      // ${t('code.spacingOptionsComment')}
    enabled?: boolean,
    config?: { breakpoints?: Array<IBreakpoint> }
  }
}`,
    [t],
  );

  const onSaveExampleCode = useMemo(
    () => `onSave: async (blocks) => {
  // ${t('code.saveBlocksComment')}
  await fetch('/api/blocks', {
    method: 'POST',
    body: JSON.stringify(blocks)
  })
  return true // ${t('code.orFalseOnError')}
}`,
    [t],
  );

  const isEditExampleCode = useMemo(
    () => `// ${t('code.editModeComment')}
<BlockBuilderComponent :config="config" :isEdit="true" />

// ${t('code.viewModeComment')}
<BlockBuilderComponent :config="config" :isEdit="false" />`,
    [t],
  );

  const basicUsageCode = useMemo(
    () => `<template>
  <BlockBuilderComponent 
    :config="config"
    :initialBlocks="initialBlocks"
    @block-added="handleBlockAdded"
    @block-updated="handleBlockUpdated"
    @block-deleted="handleBlockDeleted"
  />
</template>

<script setup>
import { ref } from 'vue'
import { BlockBuilderComponent } from '@mushket-co/block-builder/vue'

const config = {
  availableBlockTypes: [
    // ${t('code.yourBlockTypesConfigComment')}
  ]
}

const initialBlocks = ref([
  {
    id: 'block-1',
    type: 'text',
    props: { content: '${t('code.initialContent')}' },
    settings: {}
  }
])

const handleBlockAdded = (block) => {
  console.log('${t('code.logCreated')}', block)
}

const handleBlockUpdated = (block) => {
  console.log('${t('code.logUpdated')}', block)
}

const handleBlockDeleted = (blockId) => {
  console.log('${t('code.logDeleted')}', blockId)
}
</script>`,
    [t],
  );

  const serverSaveCode = useMemo(
    () => `<template>
  <BlockBuilderComponent 
    :config="config"
    :initialBlocks="initialBlocks"
    :onSave="saveBlocks"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { BlockBuilderComponent } from '@mushket-co/block-builder/vue'

const config = {
  availableBlockTypes: [
    // ${t('code.yourConfigComment')}
  ]
}

const initialBlocks = ref([])

const loadBlocks = async () => {
  try {
    const response = await fetch('/api/blocks/load', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      const data = await response.json()
      initialBlocks.value = data.blocks || []
    }
  } catch (error) {
    console.error('${t('code.loadError')}', error)
    initialBlocks.value = []
  }
}

const saveBlocks = async (blocks) => {
  try {
    const response = await fetch('/api/blocks/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ blocks })
    })
    
    if (!response.ok) {
      throw new Error('${t('code.saveError')}')
    }
    
    return true
  } catch (error) {
    console.error('${t('code.genericError')}', error)
    return false
  }
}

onMounted(() => {
  loadBlocks()
})
</script>`,
    [t],
  );

  const blockStructureCode = useMemo(
    () => `{
  id: string,
  type: string,
  props: {
    /* ${t('code.customPropsComment')} */
    spacing?: {
      /* ${t('code.spacingDataComment')} */
      'padding-top': { 'desktop': '20px' },
      'margin-bottom': { 'mobile': '10px' }
    }
  },
  settings: {
    /* ${t('code.metadataComment')} */
  }
}`,
    [t],
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
      </div>

      <section className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border-l-4 border-purple-500">
        <DocHeading id="block-builder-component">
          <code className="text-purple-700 dark:text-purple-400">BlockBuilderComponent</code>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('blockBuilderComponent.description')}</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('import')}</h3>
          <CodeBlock
            code={`import { BlockBuilderComponent } from '@mushket-co/block-builder/vue'`}
            language="javascript"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('props')}</h3>
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
                <code className="text-purple-700 dark:text-purple-400">config</code>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                  {t('blockBuilderComponent.props.config.type')}
                </span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {t('blockBuilderComponent.props.config.description')}
              </p>
              <CodeBlock
                code={configTypeCode}
                language="typescript"
                className="mb-2 text-xs"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                <strong>{t('blockBuilderComponent.props.config.iblockTypeLabel')}</strong>
              </p>
              <CodeBlock
                code={iblockTypeCode}
                language="typescript"
                className="mb-2 text-xs"
              />
            </div>

            {PROP_KEYS.map((key) => (
              <div key={key} className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
                  <code className="text-purple-700 dark:text-purple-400">{key}</code>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                    {t(`blockBuilderComponent.props.${key}.type`)}
                  </span>
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t.rich(`blockBuilderComponent.props.${key}.description`, docRichTags)}
                </p>
                {key === 'onSave' && (
                  <CodeBlock
                    code={onSaveExampleCode}
                    language="javascript"
                    className="mb-2 text-xs"
                  />
                )}
                {key === 'isEdit' && (
                  <CodeBlock
                    code={isEditExampleCode}
                    language="vue"
                    className="mb-2 text-xs"
                  />
                )}
                {key === 'themeVars' && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <Link href="/docs/core/theming-localization" className="text-primary-600 dark:text-primary-400 hover:underline">
                      {tCommon('themingLocalization')}
                    </Link>
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4 border border-teal-200 dark:border-teal-800 mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">{t.rich('blockBuilderComponent.notes.blockAnchor', docRichTags)}</p>
          </div>

          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4 border border-teal-200 dark:border-teal-800 mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('blockBuilderComponent.notes.formValidation')}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('events')}</h3>
          <div className="space-y-2 text-sm">
            {EVENT_KEYS.map(({ name, key, signature }) => (
              <div
                key={name}
                className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-200 dark:border-slate-700"
              >
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <code className="text-purple-700 dark:text-purple-400">{name}</code>
                  <code className="text-xs text-gray-500 dark:text-gray-400">{signature}</code>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{t(`blockBuilderComponent.events.${key}`)}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
            <Link href="/docs/vue/events" className="text-primary-600 dark:text-primary-400 hover:underline">
              {tCommon('moreAboutEvents')}
            </Link>
            {' · '}
            <Link href="/docs/core/types#iblock" className="text-primary-600 dark:text-primary-400 hover:underline">
              {tCommon('iblockType')}
            </Link>
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('basicUsage')}</h3>
          <CodeBlock
            code={basicUsageCode}
            language="vue"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('withServerSave')}</h3>
          <CodeBlock
            code={serverSaveCode}
            language="vue"
            className="mb-4"
          />
        </div>
      </section>

      <section>
        <DocHeading id="block-components">{t('blockComponents.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t.rich('blockComponents.description', docRichTags)}</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('blockStructure')}</h3>
          <CodeBlock
            code={blockStructureCode}
            language="javascript"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('blockComponentExample')}</h3>
          <CodeBlock
            code={`<!-- components/HeroBlock.vue -->
<template>
  <section 
    class="hero-block"
  >
    <div class="container">
      <h1>{{ block.props.title }}</h1>
      <p>{{ block.props.subtitle }}</p>
      <a v-if="block.props.buttonText && block.props.buttonUrl" :href="block.props.buttonUrl">
        {{ block.props.buttonText }}
      </a>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.hero-block {
  padding-top: var(--spacing-padding-top, 4rem);
  padding-bottom: var(--spacing-padding-bottom, 4rem);
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
</style>`}
            language="vue"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{tCommon('imageComponentExample')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">{tCommon.rich('imageFieldNote', docRichTags)}</p>
          <CodeBlock
            code={`<!-- components/ImageBlock.vue -->
<template>
  <div class="image-block">
    <img 
      :src="imageUrl" 
      :alt="block.props.alt || 'Image'" 
      :style="{ width: block.props.width + '%' }"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const imageUrl = computed(() => {
  const image = props.block.props.image
  if (typeof image === 'string') {
    return image
  }
  if (typeof image === 'object' && image !== null) {
    return image.src || ''
  }
  return ''
})
</script>

<style scoped>
.image-block {
  padding-top: var(--spacing-padding-top, 1rem);
  padding-bottom: var(--spacing-padding-bottom, 1rem);
}
</style>`}
            language="vue"
            className="mb-4"
          />
          <UploadUrlImportantNote />
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
            <Icon name="lightbulb" size={20} className="text-blue-600 dark:text-blue-400" />
            {tCommon('important')}
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {importantItems.map((_, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>{t.rich(`blockComponents.importantItems.${index}`, docRichTags)}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 pt-3 border-t border-blue-200 dark:border-blue-800">
            <Link href="/docs/core/form-fields#spacing" className="text-primary-600 dark:text-primary-400 hover:underline">
              {tCommon('moreAboutSpacing')}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
