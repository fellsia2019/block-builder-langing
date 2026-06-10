'use client';

import DocsLayout from '../components/DocsLayout';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function NuxtPage() {
  return (
    <DocsLayout activeSection="nuxt" activeSubSection="getting-started">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Nuxt (SSR)</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Интеграция <code>@mushket-co/block-builder/vue</code> в Nuxt 3/4 с серверным рендерингом контента блоков
          </p>
        </div>

        <section className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/10 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Установка</h2>
          <CodeBlock code="npm install @mushket-co/block-builder" language="bash" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            Стили подключайте в client-only плагине — CSS не должен попадать в SSR-бандл без необходимости.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">nuxt.config</h2>
          <CodeBlock
            language="ts"
            code={`export default defineNuxtConfig({
  build: {
    transpile: ['@mushket-co/block-builder'],
  },
})`}
          />
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
            Entry <code>/vue</code> отдаёт исходные <code>.ts</code> и <code>.vue</code> — без transpile сборка упадёт.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Плагин стилей</h2>
          <CodeBlock
            language="ts"
            code={`// plugins/block-builder.client.ts
import '@mushket-co/block-builder/index.css'`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Страница с SSR</h2>
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
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">API и сохранение</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            На сервере загружайте блоки из БД/файла, при отдаче клиенту обогащайте данные для api-select блоков.
            Перед сохранением сериализуйте без <code>render.component</code> и SSR-кэша.
          </p>
          <CodeBlock
            language="ts"
            code={`// server/api/blocks.get.ts
import { enrichBlocksForSsr } from '../utils/enrichBlocks'
import { readBlocksFromFile } from '../utils/blocksFile'

export default defineEventHandler(async () => {
  return enrichBlocksForSsr(await readBlocksFromFile())
})

// server/api/blocks.post.ts — POST body: { blocks: IBlockDto[] }
// serializeBlocksForStorage(blocks) перед записью в БД`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">SSR-утилиты</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Экспортируются из <code>@mushket-co/block-builder/vue</code>:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 text-sm">
            <li><code>prepareBlocksForDisplay</code> — восстанавливает <code>render</code> из <code>availableBlockTypes</code></li>
            <li><code>enrichBlockForDisplay</code> — обогащение одного блока</li>
            <li><code>seedRepositoryFromBlocks</code> — синхронизация in-memory репозитория</li>
            <li><code>enableViewportBreakpointDetection</code> — пересчёт spacing после гидрации</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
            <code>prepareBlocksForDisplay</code> и <code>seedRepositoryFromBlocks</code> вызываются внутри компонента автоматически.
          </p>
        </section>

        <section className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Примеры в репозитории</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://github.com/mushket-co/block-builder/tree/master/examples/nuxt3" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">
                examples/nuxt3
              </a>
              {' '}— Nuxt 3, порт 3006
            </li>
            <li>
              <a href="https://github.com/mushket-co/block-builder/tree/master/examples/nuxt4" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">
                examples/nuxt4
              </a>
              {' '}— Nuxt 4, порт 3007
            </li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            API компонентов Vue — в разделе{' '}
            <Link href="/docs/vue/getting-started" className="text-green-600 hover:underline">Vue3</Link>.
          </p>
        </section>
      </div>
    </DocsLayout>
  );
}
