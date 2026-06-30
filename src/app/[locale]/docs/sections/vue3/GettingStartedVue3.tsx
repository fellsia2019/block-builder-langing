'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import CodeBlock from '@/components/CodeBlock';
import { GITHUB_EXAMPLES_VUE3_CORE_API } from '@/lib/urls';
import type { NavigationProps } from '../../types';
import UploadUrlImportantNote from '../../components/UploadUrlImportantNote';
import { docRichTags, renderDocRichString } from '../../components/docRichTags';

export default function GettingStartedVue3(_props: NavigationProps) {
  const t = useTranslations('docsPages.vue3.gettingStarted');
  const tCommon = useTranslations('docsPages.common');

  const tipItems = t.raw('tips.items') as string[];
  const viewModeItems = t.raw('editMode.viewMode.items') as string[];

  const helloWorldHtml = t.raw('code.helloWorldHtml') as string;

  const step2Code = useMemo(
    () => `<template>
  <BlockBuilderComponent
    :config="config"
    :block-management-use-case="blockManagementUseCase"
    @block-added="handleBlockAdded"
    @block-updated="handleBlockUpdated"
    @block-deleted="handleBlockDeleted"
  />
</template>

<script setup>
import '@mushket-co/block-builder/index.esm.css'
import {
  BlockBuilderComponent,
  createBlockManagementUseCase,
} from '@mushket-co/block-builder/vue'
import TextBlock from './components/TextBlock.vue'

const blockManagementUseCase = createBlockManagementUseCase()
blockManagementUseCase.getComponentRegistry().register('text', TextBlock)

const config = {
  availableBlockTypes: [
    {
      type: 'text',
      label: '${t('code.textBlockLabel')}',
      render: {
        kind: 'component',
        framework: 'vue',
        component: TextBlock
      },
      fields: [
        {
          field: 'content',
          label: '${t('code.contentLabel')}',
          type: 'textarea',
          rules: [{ type: 'required', field: 'content' }],
          defaultValue: '${helloWorldHtml}'
        }
      ],
      defaultProps: {
        content: '${helloWorldHtml}'
      },
      spacingOptions: {
        enabled: true,
        spacingTypes: ['padding-top', 'padding-bottom', 'margin-top', 'margin-bottom']
      }
    }
  ],
}

const handleBlockAdded = (block) => {
  console.log('${t('code.logBlockCreated')}', block)
}

const handleBlockUpdated = (block) => {
  console.log('${t('code.logBlockUpdated')}', block)
}

const handleBlockDeleted = (blockId) => {
  console.log('${t('code.logBlockDeleted')}', blockId)
}
</script>`,
    [t, helloWorldHtml],
  );

  const multipleTypesCode = useMemo(
    () => `<script setup>
import '@mushket-co/block-builder/index.esm.css'
import {
  BlockBuilderComponent,
  createBlockManagementUseCase,
} from '@mushket-co/block-builder/vue'
import TextBlock from './components/TextBlock.vue'
import ImageBlock from './components/ImageBlock.vue'
import ButtonBlock from './components/ButtonBlock.vue'

const blockManagementUseCase = createBlockManagementUseCase()
blockManagementUseCase.getComponentRegistry().register('text', TextBlock)
blockManagementUseCase.getComponentRegistry().register('image', ImageBlock)
blockManagementUseCase.getComponentRegistry().register('button', ButtonBlock)

const config = {
  availableBlockTypes: [
    {
      type: 'text',
      label: '${t('code.textBlockLabel')}',
      render: {
        kind: 'component',
        framework: 'vue',
        component: TextBlock
      },
      fields: [
        {
          field: 'content',
          label: '${t('code.contentLabel')}',
          type: 'textarea',
          rules: [{ type: 'required', field: 'content' }]
        },
        {
          field: 'textAlign',
          label: '${t('code.textAlignLabel')}',
          type: 'select',
          options: [
            { value: 'left', label: '${t('code.alignLeft')}' },
            { value: 'center', label: '${t('code.alignCenter')}' },
            { value: 'right', label: '${t('code.alignRight')}' }
          ]
        }
      ]
    },
    {
      type: 'image',
      label: '${t('code.imageLabel')}',
      render: {
        kind: 'component',
        framework: 'vue',
        component: ImageBlock
      },
      fields: [
        {
          field: 'image',
          label: '${t('code.imageLabel')}',
          type: 'image',
          rules: [{ type: 'required', field: 'image' }],
          fileUploadConfig: {
            uploadUrl: '/api/upload',
            maxFileSize: 5 * 1024 * 1024,
            accept: 'image/*',
            responseMapper: (response) => ({
              src: response.url
            })
          }
        },
        {
          field: 'alt',
          label: '${t('code.altTextLabel')}',
          type: 'text'
        },
        {
          field: 'width',
          label: '${t('code.widthLabel')}',
          type: 'number',
          defaultValue: 100
        }
      ]
    },
    {
      type: 'button',
      label: '${t('code.buttonLabel')}',
      render: {
        kind: 'component',
        framework: 'vue',
        component: ButtonBlock
      },
      fields: [
        {
          field: 'text',
          label: '${t('code.buttonTextLabel')}',
          type: 'text',
          rules: [{ type: 'required', field: 'text' }]
        },
        {
          field: 'url',
          label: '${t('code.urlLabel')}',
          type: 'url'
        },
        {
          field: 'variant',
          label: '${t('code.styleLabel')}',
          type: 'select',
          options: [
            { value: 'primary', label: '${t('code.variantPrimary')}' },
            { value: 'secondary', label: '${t('code.variantSecondary')}' },
            { value: 'outline', label: '${t('code.variantOutline')}' }
          ]
        }
      ]
    }
  ],
}
</script>`,
    [t],
  );

  const editModeCode = useMemo(
    () => `<template>
  <!-- ${t('code.editModeComment')} -->
  <BlockBuilderComponent
    :config="config"
    :block-management-use-case="blockManagementUseCase"
    :isEdit="true"
  />

  <!-- ${t('code.viewModeComment')} -->
  <BlockBuilderComponent
    :config="config"
    :block-management-use-case="blockManagementUseCase"
    :isEdit="false"
  />
</template>

<script setup>
import '@mushket-co/block-builder/index.esm.css'
import {
  BlockBuilderComponent,
  createBlockManagementUseCase,
} from '@mushket-co/block-builder/vue'

const blockManagementUseCase = createBlockManagementUseCase()
// blockManagementUseCase.getComponentRegistry().register(...)

const config = {
  availableBlockTypes: [
    // ${t('code.yourConfigComment')}
  ],
}
</script>`,
    [t],
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
      </div>

      <section className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{tCommon('install')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('install.description')}</p>
        <CodeBlock
          code="npm install @mushket-co/block-builder"
          language="bash"
          className="mb-4"
        />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t('install.typescriptNote')}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('concepts.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <h3 className="font-bold text-purple-900 dark:text-purple-300 mb-2">{t('concepts.blockBuilderComponent.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('concepts.blockBuilderComponent.description')}</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">{t('concepts.yourComponents.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('concepts.yourComponents.description')}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-900 dark:text-green-300 mb-2">{t('concepts.config.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('concepts.config.description')}</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
            <h3 className="font-bold text-orange-900 dark:text-orange-300 mb-2">{t('concepts.events.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('concepts.events.description')}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('basicExample.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('basicExample.description')}</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t('basicExample.step1.title')}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {renderDocRichString(t.raw('basicExample.step1.spacingNote') as string, {
              ...docRichTags,
              link: (chunks) => (
                <Link href="/docs/core/form-fields#spacing" className="text-primary-600 dark:text-primary-400 hover:underline">
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <CodeBlock
            code={`<!-- components/TextBlock.vue -->
<template>
  <div class="text-block">
    <div v-html="block.props.content"></div>
  </div>
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
.text-block {
  padding-top: var(--spacing-padding-top, 1rem);
  padding-bottom: var(--spacing-padding-bottom, 1rem);
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>`}
            language="vue"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t('basicExample.step2.title')}</h3>
          <CodeBlock
            code={step2Code}
            language="vue"
            className="mb-4"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('multipleTypes.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('multipleTypes.description')}</p>
        <CodeBlock
          code={multipleTypesCode}
          language="vue"
          className="mb-4"
        />
        <UploadUrlImportantNote />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('editMode.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('editMode.description') as string, docRichTags)}</p>
        <CodeBlock
          code={editModeCode}
          language="vue"
          className="mb-4"
        />
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">{t('editMode.viewMode.title')}</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
            {viewModeItems.map((_, index) => (
              <li key={index}>{renderDocRichString(t.raw(`editMode.viewMode.items.${index}`) as string, docRichTags)}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('tips.title')}</h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
          {tipItems.map((_, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>{renderDocRichString(t.raw(`tips.items.${index}`) as string, docRichTags)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl p-6 border border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-900/10">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t('coreWithoutComponent.title')}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('coreWithoutComponent.description') as string, docRichTags)}</p>
        <CodeBlock
          language="vue"
          className="mb-4 text-xs"
          code={`<script setup>
import { onMounted, ref } from 'vue'
import { BlockBuilder } from '@mushket-co/block-builder/core'

const blockBuilder = ref(null)

onMounted(() => {
  blockBuilder.value = new BlockBuilder({ blockConfigs })
})
</script>`}
        />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {renderDocRichString(t.raw('coreWithoutComponent.footer') as string, {
            apiOverview: (chunks) => (
              <Link href="/docs/core/classes" className="text-primary-600 hover:underline">{chunks}</Link>
            ),
            methods: (chunks) => (
              <Link href="/docs/core/methods" className="text-primary-600 hover:underline">{chunks}</Link>
            ),
            example: (chunks) => (
              <a href={GITHUB_EXAMPLES_VUE3_CORE_API} className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">{chunks}</a>
            ),
          })}
        </p>
      </section>

      <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t('nuxt.title')}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {renderDocRichString(t.raw('nuxt.description') as string, {
            nuxtLink: (chunks) => (
              <Link href="/docs/nuxt" className="text-green-600 hover:underline">{chunks}</Link>
            ),
            nuxt3: (chunks) => (
              <a href="https://github.com/mushket-co/block-builder/tree/master/examples/nuxt3" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">{chunks}</a>
            ),
            nuxt4: (chunks) => (
              <a href="https://github.com/mushket-co/block-builder/tree/master/examples/nuxt4" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">{chunks}</a>
            ),
          })}
        </p>
      </section>
    </div>
  );
}
