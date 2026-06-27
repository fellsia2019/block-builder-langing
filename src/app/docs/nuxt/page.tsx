'use client';

import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';
import {
  GITHUB_EXAMPLES,
  GITHUB_EXAMPLES_NUXT3,
  GITHUB_EXAMPLES_NUXT4,
} from '@/lib/urls';
import DocHeading from '../components/DocHeading';
export default function NuxtPage() {
  return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Nuxt (SSR)</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Интеграция <code>@mushket-co/block-builder/vue</code> в Nuxt 3/4 с серверным рендерингом контента блоков
          </p>
        </div>

        <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-200 dark:border-green-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Живое SSR-демо</strong> для Nuxt нет в интерактивном demo-bb (там Vue 3 и React 18).
            Запустите готовые проекты из репозитория пакета:{' '}
            <a href={GITHUB_EXAMPLES_NUXT3} className="text-green-700 dark:text-green-400 hover:underline font-medium" target="_blank" rel="noopener noreferrer">examples/nuxt3</a>
            {' '}и{' '}
            <a href={GITHUB_EXAMPLES_NUXT4} className="text-green-700 dark:text-green-400 hover:underline font-medium" target="_blank" rel="noopener noreferrer">examples/nuxt4</a>
            {' '}в{' '}
            <a href={GITHUB_EXAMPLES} className="text-green-700 dark:text-green-400 hover:underline font-medium" target="_blank" rel="noopener noreferrer">block-builder/examples</a>.
          </p>
        </section>

        <section className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/10 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <DocHeading id="install">Установка</DocHeading>
          <CodeBlock code="npm install @mushket-co/block-builder" language="bash" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            Стили подключайте в client-only плагине — CSS не должен попадать в SSR-бандл без необходимости.
          </p>
        </section>

        <section>
          <DocHeading id="nuxt-config">nuxt.config</DocHeading>
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
          <DocHeading id="styles-plugin">Плагин стилей</DocHeading>
          <CodeBlock
            language="ts"
            code={`// plugins/block-builder.client.ts
import '@mushket-co/block-builder/index.css'`}
          />
        </section>

        <section>
          <DocHeading id="use-block-builder">composables/useBlockBuilder.ts</DocHeading>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Файл <strong>создаёте сами</strong> — в пакете composable нет. Он собирает зависимости для{' '}
            <code>BlockBuilderComponent</code>: use case, типы блоков из <code>block-config</code>, режим редактирования
            и сохранение на API.
          </p>
          <CodeBlock
            language="ts"
            code={`// composables/useBlockBuilder.ts
import { type Ref, ref } from 'vue'
import { createBlockManagementUseCase } from '@mushket-co/block-builder/vue'
import { blockConfigs } from '~/block-config'
import { serializeBlocksForStorage } from '~/utils/serializeBlocks'

export function useBlockBuilder(initialBlocks: Ref<unknown[] | null | undefined>) {
  // CRUD блоков + реестр Vue-компонентов для preview в редакторе
  const blockManagementUseCase = createBlockManagementUseCase()

  const componentRegistry = blockManagementUseCase.getComponentRegistry()
  for (const [type, config] of Object.entries(blockConfigs)) {
    if (config.render?.component) {
      componentRegistry.register(type, config.render.component)
    }
  }

  // Палитра блоков и схемы полей в UI
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
      console.error('Ошибка сохранения:', error)
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
}`}
          />
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 mt-4 mb-4">
            <li><code>blockManagementUseCase</code> — создание, обновление, удаление блоков</li>
            <li><code>availableBlockTypes</code> — конфиг типов для палитры и форм</li>
            <li><code>initialBlocks</code> — ref из <code>useAsyncData</code>, стартовые данные страницы</li>
            <li><code>isEdit</code> — режим редактора (<code>false</code> — только просмотр)</li>
            <li><code>handleSave</code> — колбэк сохранения; вернуть <code>true</code> при успехе</li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <code>serializeBlocksForStorage</code> — утилита проекта: убирает <code>render.component</code> и base64
            перед JSON.             Пример —{' '}
            <a href={`${GITHUB_EXAMPLES_NUXT3}/utils/serializeBlocks.ts`} className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">
              examples/nuxt3/utils/serializeBlocks.ts
            </a>
            . Для api-select и кастомных полей в примере также подключают{' '}
            <code>ApiSelectUseCase</code> и <code>CustomFieldRendererRegistry</code>.
          </p>
        </section>

        <section>
          <DocHeading id="ssr-page">Страница с SSR</DocHeading>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            На сервере загружаем блоки, composable из предыдущего шага передаёт props в компонент.
          </p>
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
          <DocHeading id="api-save">API и сохранение</DocHeading>
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
          <DocHeading id="ssr-utils">SSR-утилиты</DocHeading>
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
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Живые примеры в репозитории</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Из корня monorepo: <code className="text-green-700 dark:text-green-400">npm run example:nuxt3</code> или{' '}
            <code className="text-green-700 dark:text-green-400">npm run example:nuxt4</code>
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={GITHUB_EXAMPLES_NUXT3} className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">
                examples/nuxt3
              </a>
              {' '}— Nuxt 3, порт 3006
            </li>
            <li>
              <a href={GITHUB_EXAMPLES_NUXT4} className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">
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
  );
}
