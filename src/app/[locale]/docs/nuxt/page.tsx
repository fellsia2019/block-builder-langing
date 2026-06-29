'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import CodeBlock from '@/components/CodeBlock';
import { Link } from '@/i18n/navigation';
import {
  GITHUB_EXAMPLES,
  GITHUB_EXAMPLES_NUXT3,
  GITHUB_EXAMPLES_NUXT4,
} from '@/lib/urls';
import DocHeading from '../components/DocHeading';
import { docRichTags, renderDocRichString } from '../components/docRichTags';

const COMPOSABLE_ITEMS = [
  'blockManagementUseCase',
  'availableBlockTypes',
  'initialBlocks',
  'isEdit',
  'handleSave',
] as const;

const SSR_UTIL_KEYS = [
  'prepareBlocksForDisplay',
  'enrichBlockForDisplay',
  'seedRepositoryFromBlocks',
  'enableViewportBreakpointDetection',
] as const;

export default function NuxtPage() {
  const t = useTranslations('docsPages.nuxt');

  const useBlockBuilderCode = useMemo(
    () => `// composables/useBlockBuilder.ts
import { type Ref, ref } from 'vue'
import { createBlockManagementUseCase } from '@mushket-co/block-builder/vue'
import { blockConfigs } from '~/block-config'
import { serializeBlocksForStorage } from '~/utils/serializeBlocks'

export function useBlockBuilder(initialBlocks: Ref<unknown[] | null | undefined>) {
  const blockManagementUseCase = createBlockManagementUseCase()

  const componentRegistry = blockManagementUseCase.getComponentRegistry()
  for (const [type, config] of Object.entries(blockConfigs)) {
    if (config.render?.component) {
      componentRegistry.register(type, config.render.component)
    }
  }

  const availableBlockTypes = ref(
    Object.entries(blockConfigs).map(([type, cfg]) => ({
      type,
      label: cfg.title,
      icon: cfg.icon,
      render: cfg.render,
      fields: cfg.fields,
      spacingOptions: cfg.spacingOptions,
      defaultProps: Object.fromEntries(
        (cfg.fields ?? []).map((field) => [field.field, field.defaultValue ?? null])
      ),
    }))
  )

  const isEdit = ref(true)

  const handleSave = async (blocks: unknown[]) => {
    try {
      await $fetch('/api/blocks', {
        method: 'POST',
        body: { blocks: serializeBlocksForStorage(blocks) },
      })
      return true
    } catch (error) {
      console.error('${t('code.saveError')}', error)
      return false
    }
  }

  return {
    blockManagementUseCase,
    availableBlockTypes,
    initialBlocks,
    isEdit,
    handleSave,
  }
}`,
    [t],
  );

  const apiSaveCode = useMemo(
    () => `// server/api/blocks.get.ts
import { enrichBlocksForSsr } from '../utils/enrichBlocks'
import { readBlocksFromFile } from '../utils/blocksFile'

export default defineEventHandler(async () => {
  return enrichBlocksForSsr(await readBlocksFromFile())
})

// server/api/blocks.post.ts — POST body: { blocks: IBlockDto[] }
// ${t('code.beforeDbWriteComment')}`,
    [t],
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{renderDocRichString(t.raw('subtitle') as string, docRichTags)}</p>
      </div>

      <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-200 dark:border-green-800">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {renderDocRichString(t.raw('demoNote') as string, {
            ...docRichTags,
            nuxt3: (chunks) => (
              <a href={GITHUB_EXAMPLES_NUXT3} className="text-green-700 dark:text-green-400 hover:underline font-medium" target="_blank" rel="noopener noreferrer">{chunks}</a>
            ),
            nuxt4: (chunks) => (
              <a href={GITHUB_EXAMPLES_NUXT4} className="text-green-700 dark:text-green-400 hover:underline font-medium" target="_blank" rel="noopener noreferrer">{chunks}</a>
            ),
            examples: (chunks) => (
              <a href={GITHUB_EXAMPLES} className="text-green-700 dark:text-green-400 hover:underline font-medium" target="_blank" rel="noopener noreferrer">{chunks}</a>
            ),
          })}
        </p>
      </section>

      <section className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/10 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <DocHeading id="install">{t('headings.install')}</DocHeading>
        <CodeBlock code="npm install @mushket-co/block-builder" language="bash" />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">{t('installNote')}</p>
      </section>

      <section>
        <DocHeading id="nuxt-config">{t('headings.nuxtConfig')}</DocHeading>
        <CodeBlock
          language="ts"
          code={`export default defineNuxtConfig({
  build: {
    transpile: ['@mushket-co/block-builder'],
  },
})`}
        />
        <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">{renderDocRichString(t.raw('nuxtConfigNote') as string, docRichTags)}</p>
      </section>

      <section>
        <DocHeading id="styles-plugin">{t('headings.stylesPlugin')}</DocHeading>
        <CodeBlock
          language="ts"
          code={`// plugins/block-builder.client.ts
import '@mushket-co/block-builder/index.css'`}
        />
      </section>

      <section>
        <DocHeading id="use-block-builder">{t('headings.useBlockBuilder')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('composable.description') as string, docRichTags)}</p>
        <CodeBlock
          language="ts"
          code={useBlockBuilderCode}
        />
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 mt-4 mb-4">
          {COMPOSABLE_ITEMS.map((key) => (
            <li key={key}>{renderDocRichString(t.raw(`composable.items.${key}`) as string, docRichTags)}</li>
          ))}
        </ul>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {renderDocRichString(t.raw('composable.serializeNote') as string, {
            ...docRichTags,
            example: (chunks) => (
              <a href={`${GITHUB_EXAMPLES_NUXT3}/utils/serializeBlocks.ts`} className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">{chunks}</a>
            ),
          })}
        </p>
      </section>

      <section>
        <DocHeading id="ssr-page">{t('headings.ssrPage')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{t('ssrPage.description')}</p>
        <CodeBlock
          language="vue"
          code={`<template>
  <BlockBuilderComponent
    :config="{ availableBlockTypes }"
    :block-management-use-case="blockManagementUseCase"
    :on-save="handleSave"
    :initial-blocks="initialBlocks"
    :is-edit="isEdit"
    :warn-on-page-leave="true"
  />
</template>

<script setup lang="ts">
import { BlockBuilderComponent } from '@mushket-co/block-builder/vue'
import { useBlockBuilder } from '~/composables/useBlockBuilder'

const { data: initialBlocks } = await useAsyncData('bb-blocks', () =>
  $fetch('/api/blocks')
)

const {
  blockManagementUseCase,
  availableBlockTypes,
  isEdit,
  handleSave,
} = useBlockBuilder(initialBlocks)
</script>`}
        />
      </section>

      <section>
        <DocHeading id="api-save">{t('headings.apiSave')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('apiSave.description') as string, docRichTags)}</p>
        <CodeBlock
          language="ts"
          code={apiSaveCode}
        />
      </section>

      <section>
        <DocHeading id="ssr-utils">{t('headings.ssrUtils')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('ssrUtils.description') as string, docRichTags)}</p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 text-sm">
          {SSR_UTIL_KEYS.map((key) => (
            <li key={key} id={key === 'prepareBlocksForDisplay' ? 'prepare-blocks-for-display' : key === 'enrichBlockForDisplay' ? 'enrich-block-for-display' : key === 'seedRepositoryFromBlocks' ? 'seed-repository-from-blocks' : 'enable-viewport-breakpoint-detection'}>
              {renderDocRichString(t.raw(`ssrUtils.items.${key}`) as string, docRichTags)}
            </li>
          ))}
        </ul>
        <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">{renderDocRichString(t.raw('ssrUtils.autoNote') as string, docRichTags)}</p>
      </section>

      <section className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t('liveExamples.title')}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{renderDocRichString(t.raw('liveExamples.runNote') as string, docRichTags)}</p>
        <ul className="space-y-2 text-sm">
          <li>
            {renderDocRichString(t.raw('liveExamples.nuxt3') as string, {
              nuxt3: (chunks) => (
                <a href={GITHUB_EXAMPLES_NUXT3} className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">{chunks}</a>
              ),
            })}
          </li>
          <li>
            {renderDocRichString(t.raw('liveExamples.nuxt4') as string, {
              nuxt4: (chunks) => (
                <a href={GITHUB_EXAMPLES_NUXT4} className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">{chunks}</a>
              ),
            })}
          </li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          {renderDocRichString(t.raw('liveExamples.vueApi') as string, {
            vueLink: (chunks) => (
              <Link href="/docs/vue/getting-started" className="text-green-600 hover:underline">{chunks}</Link>
            ),
          })}
        </p>
      </section>
    </div>
  );
}
