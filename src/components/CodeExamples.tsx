'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import AnimateOnScroll from './AnimateOnScroll';
import CodeBlock from './CodeBlock';
import Icon from './Icon';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { DEMO_BB_URL, GITHUB_EXAMPLES } from '@/lib/urls';

type LocalizedSamples = {
  nextRegisterComponents: string;
  nextSaveToServer: string;
  apiOnlyNoCssComment: string;
  apiOnlyBlockTitle: string;
  apiOnlyFieldLabel: string;
  apiOnlyDefaultValue: string;
  apiOnlyLogMessage: string;
  vue3BlockLabel: string;
  vue3FieldLabel: string;
};

function buildExamples(samples: LocalizedSamples) {
  return [
  {
    tabKey: 'vue3' as const,
    language: 'vue',
    code: `<template>
  <BlockBuilderComponent
    :config="{ availableBlockTypes }"
    :block-management-use-case="blockManagementUseCase"
    :on-save="handleSave"
    :initial-blocks="initialBlocks"
    :is-edit="isEdit"
  />
</template>

<script setup>
import { ref } from 'vue'
import {
  BlockBuilderComponent,
  createBlockManagementUseCase,
} from '@mushket-co/block-builder/vue'
import YourTextBlock from './components/YourTextBlock.vue'

const blockManagementUseCase = createBlockManagementUseCase()
blockManagementUseCase.getComponentRegistry().register('text', YourTextBlock)

const availableBlockTypes = ref([
  {
    type: 'text',
    label: '${samples.vue3BlockLabel}',
    render: { kind: 'component', framework: 'vue', component: YourTextBlock },
    fields: [
      { field: 'content', label: '${samples.vue3FieldLabel}', type: 'textarea', defaultValue: 'Hello' }
    ],
    defaultProps: { content: 'Hello' }
  }
])

const isEdit = ref(true)
const initialBlocks = ref([])

const handleSave = async (blocks) => {
  localStorage.setItem('saved-blocks', JSON.stringify(blocks))
  return true
}
</script>`,
  },
  {
    tabKey: 'react' as const,
    language: 'tsx',
    code: `import '@mushket-co/block-builder/index.esm.css'
import {
  BlockBuilderComponent,
  createBlockManagementUseCase,
} from '@mushket-co/block-builder/react'
import { TextBlock } from './components/blocks/TextBlock'

const blockManagementUseCase = createBlockManagementUseCase()
blockManagementUseCase.getComponentRegistry().register('text', TextBlock)

const availableBlockTypes = [{
  type: 'text',
  label: '${samples.vue3BlockLabel}',
  render: { kind: 'component', framework: 'react', component: TextBlock },
  fields: [
    { field: 'content', label: '${samples.vue3FieldLabel}', type: 'textarea',
      rules: [{ type: 'required', field: 'content' }] },
  ],
}]

export function App() {
  return (
    <BlockBuilderComponent
      config={{ availableBlockTypes }}
      blockManagementUseCase={blockManagementUseCase}
      onSave={async (blocks) => { console.log(blocks); return true }}
      initialBlocks={[]}
      isEdit
      warnOnPageLeave
    />
  )
}`,
  },
  {
    tabKey: 'nuxt' as const,
    isSsr: true,
    language: 'vue',
    code: `<template>
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
</script>`,
  },
  {
    tabKey: 'next' as const,
    isSsr: true,
    language: 'tsx',
    code: `// app/page.tsx — Server Component
import { BlockBuilderEditor } from './BlockBuilderEditor'
import { enrichBlocksForSsr } from '@/lib/enrichBlocks'
import { readBlocksFromFile } from '@/lib/blocksFile'

export default async function HomePage() {
  const initialBlocks = enrichBlocksForSsr(await readBlocksFromFile())
  return <BlockBuilderEditor initialBlocks={initialBlocks} />
}

// app/BlockBuilderEditor.tsx — Client Component
'use client'

import '@mushket-co/block-builder/index.esm.css'
import { BlockBuilderComponent, createBlockManagementUseCase } from '@mushket-co/block-builder/react'

export function BlockBuilderEditor({ initialBlocks }) {
  const blockManagementUseCase = createBlockManagementUseCase()
  ${samples.nextRegisterComponents}

  return (
    <BlockBuilderComponent
      config={{ availableBlockTypes }}
      blockManagementUseCase={blockManagementUseCase}
      initialBlocks={initialBlocks}
      isEdit
      onSave={async (blocks) => { ${samples.nextSaveToServer} return true }}
    />
  )
}`,
  },
  {
    tabKey: 'apiOnly' as const,
    language: 'javascript',
    code: `import { BlockBuilder } from '@mushket-co/block-builder/core'
${samples.apiOnlyNoCssComment}

const blockConfigs = {
  text: {
    title: '${samples.apiOnlyBlockTitle}',
    fields: [
      {
        field: 'content',
        label: '${samples.apiOnlyFieldLabel}',
        type: 'textarea',
        defaultValue: '${samples.apiOnlyDefaultValue}'
      }
    ]
  }
}

const blockBuilder = new BlockBuilder({
  blockConfigs,
  autoInit: false
})

await blockBuilder.createBlock({
  type: 'text',
  props: { content: 'Hello World' },
  settings: {}
})

const blocks = await blockBuilder.getAllBlocks()
console.log('${samples.apiOnlyLogMessage}', blocks)`,
  },
  ] as const;
}

export default function CodeExamples() {
  const t = useTranslations('codeExamples');
  const locale = useLocale();
  const docsLink =
    locale === routing.defaultLocale
      ? '/docs/nuxt#use-block-builder'
      : `/${locale}/docs/nuxt#use-block-builder`;
  const nuxtCommentPrefix = t('samples.nuxtComposableCommentPrefix');
  const nuxtPlainComment = `${nuxtCommentPrefix}${docsLink}`;
  const examples = useMemo(
    () =>
      buildExamples({
        nextRegisterComponents: t('samples.nextRegisterComponents'),
        nextSaveToServer: t('samples.nextSaveToServer'),
        apiOnlyNoCssComment: t('samples.apiOnlyNoCssComment'),
        apiOnlyBlockTitle: t('samples.apiOnlyBlockTitle'),
        apiOnlyFieldLabel: t('samples.apiOnlyFieldLabel'),
        apiOnlyDefaultValue: t('samples.apiOnlyDefaultValue'),
        apiOnlyLogMessage: t('samples.apiOnlyLogMessage'),
        vue3BlockLabel: t('samples.vue3BlockLabel'),
        vue3FieldLabel: t('samples.vue3FieldLabel'),
      }),
    [t],
  );
  const [activeTab, setActiveTab] = useState(0);
  const activeExample = examples[activeTab];
  const isNuxtExample = activeExample.tabKey === 'nuxt';
  const nuxtCopyText = isNuxtExample
    ? `${nuxtPlainComment}\n${activeExample.code.trim()}`
    : undefined;

  return (
    <section id="examples" className="py-20 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animationName="FADE_IN_DOWN" animationDelay={100}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              {t('title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t('subtitle')}</p>
          </div>
        </AnimateOnScroll>

        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={200}>
            <div className="flex flex-wrap gap-2 mb-6">
            {examples.map((example, index) => (
              <button
                key={example.tabKey}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === index
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                }`}
              >
                {t(`tabs.${example.tabKey}`)}
              </button>
            ))}
          </div>
          </AnimateOnScroll>

          <AnimateOnScroll animationName="SCALE_UP" animationDelay={400}>
            <div className="relative bg-slate-900 rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow">
              <div className="flex items-center justify-between px-6 py-3 bg-slate-800">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-sm text-gray-400">{t(`tabs.${activeExample.tabKey}`)}</div>
              </div>
              <div className="px-6 pb-6">
                {isNuxtExample && (
                  <div className="font-mono text-sm leading-6 px-4 pt-4 bg-[#1e293b] text-[#6a9955]">
                    {nuxtCommentPrefix}
                    <Link
                      href="/docs/nuxt#use-block-builder"
                      className="text-[#9cdcfe] hover:underline"
                    >
                      {docsLink}
                    </Link>
                  </div>
                )}
                <CodeBlock
                  code={activeExample.code}
                  language={activeExample.language}
                  className="rounded-none"
                  copyText={nuxtCopyText}
                  denseTop={isNuxtExample}
                />
              </div>
            </div>
          </AnimateOnScroll>

          {'isSsr' in activeExample && activeExample.isSsr && (
            <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={500}>
              <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 text-sm text-gray-700 dark:text-gray-300">
                {t('ssrNote', { framework: t(`tabs.${activeExample.tabKey}`).replace(' (SSR)', '') })}{' '}
                <a href={GITHUB_EXAMPLES} className="text-primary-600 dark:text-primary-400 hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                  github.com/mushket-co/block-builder/tree/master/examples
                </a>
              </div>
            </AnimateOnScroll>
          )}

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={600} className='h-full' innerClassName='h-full'>
              <div className="h-full p-6 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl border border-primary-200 dark:border-primary-800 hover:scale-105 transition-transform">
                <div className="mb-2">
                  <Icon name="zap" size={32} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t('cards.quickStart.title')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('cards.quickStart.description')}
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={700} className='h-full' innerClassName='h-full'>
              <div className="h-full p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl border border-green-200 dark:border-green-800 hover:scale-105 transition-transform">
                <div className="mb-2">
                  <Icon name="plugin" size={32} className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t('cards.flexibility.title')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('cards.flexibility.description')}
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={800} className='h-full' innerClassName='h-full'>
              <div className="h-full p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800 hover:scale-105 transition-transform">
                <div className="mb-2">
                  <Icon name="monitor" size={32} className="text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t('cards.ssr.title')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.rich('cards.ssr.description', {
                    link: (chunks) => (
                      <a href={GITHUB_EXAMPLES} className="text-orange-600 dark:text-orange-400 hover:underline" target="_blank" rel="noopener noreferrer">
                        {chunks}
                      </a>
                    ),
                  })}
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={900} innerClassName="h-full" className="h-full">
              <a
                href={DEMO_BB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="will-change-transform block h-full p-8 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-[1.02] text-white text-center group"
              >
                <div className="flex flex-col items-center">
                  <Icon name="monitor" size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-2">{t('demo.title')}</h3>
                  <p className="text-lg text-white/90 mb-4">{t('demo.subtitle')}</p>
                  <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg font-semibold group-hover:bg-white/30 transition-colors">
                    {t('demo.cta')}
                  </div>
                </div>
              </a>
            </AnimateOnScroll>
            <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={1000} innerClassName="h-full" className="h-full">
              <a
                href={GITHUB_EXAMPLES}
                target="_blank"
                rel="noopener noreferrer"
                className="will-change-transform block h-full p-8 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-[1.02] text-white text-center group"
              >
                <div className="flex flex-col items-center">
                  <Icon name="zap" size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-2">{t('ssrExamples.title')}</h3>
                  <p className="text-lg text-white/90 mb-4">{t('ssrExamples.subtitle')}</p>
                  <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg font-semibold group-hover:bg-white/30 transition-colors">
                    {t('ssrExamples.cta')}
                  </div>
                </div>
              </a>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

