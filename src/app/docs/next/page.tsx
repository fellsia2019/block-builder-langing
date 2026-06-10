'use client';

import DocsLayout from '../components/DocsLayout';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function NextPage() {
  return (
    <DocsLayout activeSection="next" activeSubSection="getting-started">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Next.js (SSR)</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Интеграция <code>@mushket-co/block-builder/react</code> в App Router с серверной загрузкой блоков
          </p>
        </div>

        <section className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-800/50 dark:to-gray-900/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Установка</h2>
          <CodeBlock code="npm install @mushket-co/block-builder" language="bash" />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">next.config</h2>
          <CodeBlock
            language="ts"
            code={`import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@mushket-co/block-builder'],
}

export default nextConfig`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Server + Client Component</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Server Component загружает и обогащает блоки → Client Component рендерит редактор с <code>initialBlocks</code>.
          </p>
          <CodeBlock
            language="tsx"
            code={`// app/page.tsx — Server Component
import { BlockBuilderEditor } from './BlockBuilderEditor'
import { enrichBlocksForSsr } from '@/lib/enrichBlocks'
import { readBlocksFromFile } from '@/lib/blocksFile'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const initialBlocks = enrichBlocksForSsr(await readBlocksFromFile())
  return <BlockBuilderEditor initialBlocks={initialBlocks} />
}`}
          />
          <div className="mt-4">
            <CodeBlock
              language="tsx"
              code={`// app/BlockBuilderEditor.tsx — Client Component
'use client'

import '@mushket-co/block-builder/index.esm.css'
import { useEffect, useMemo } from 'react'
import {
  BlockBuilderComponent,
  createBlockManagementUseCase,
} from '@mushket-co/block-builder/react'
import { blockConfigs } from './block-config'

export function BlockBuilderEditor({ initialBlocks }: { initialBlocks: unknown[] }) {
  const blockManagementUseCase = useMemo(() => createBlockManagementUseCase(), [])

  useEffect(() => {
    const registry = blockManagementUseCase.getComponentRegistry()
    Object.entries(blockConfigs).forEach(([type, cfg]) => {
      if (cfg.render?.component) registry.register(type, cfg.render.component)
    })
  }, [blockManagementUseCase])

  const availableBlockTypes = useMemo(
    () => Object.entries(blockConfigs).map(([type, cfg]) => ({
      type,
      label: cfg.title,
      render: cfg.render,
      fields: cfg.fields,
      defaultProps: cfg.fields?.reduce((acc, f) => ({ ...acc, [f.field]: f.defaultValue }), {}),
    })),
    []
  )

  return (
    <BlockBuilderComponent
      config={{ availableBlockTypes }}
      blockManagementUseCase={blockManagementUseCase}
      initialBlocks={initialBlocks}
      isEdit
      warnOnPageLeave
      onSave={async (blocks) => {
        await fetch('/api/blocks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ blocks }),
        })
        return true
      }}
    />
  )
}`}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">API Route Handlers</h2>
          <CodeBlock
            language="ts"
            code={`// app/api/blocks/route.ts
import { NextResponse } from 'next/server'
import { enrichBlocksForSsr } from '@/lib/enrichBlocks'
import { readBlocksFromFile, writeBlocksToFile } from '@/lib/blocksFile'
import { serializeBlocksForStorage } from '@/lib/serializeBlocks'

export async function GET() {
  const blocks = await readBlocksFromFile()
  return NextResponse.json(enrichBlocksForSsr(blocks))
}

export async function POST(request: Request) {
  const { blocks } = await request.json()
  await writeBlocksToFile(serializeBlocksForStorage(blocks))
  return NextResponse.json({ ok: true })
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">SSR-утилиты</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Экспортируются из <code>@mushket-co/block-builder/react</code>:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 text-sm">
            <li><code>prepareBlocksForDisplay</code> — восстанавливает <code>render</code> из конфигурации типов</li>
            <li><code>enrichBlockForDisplay</code> — обогащение одного блока</li>
            <li><code>seedRepositoryFromBlocks</code> — синхронизация репозитория после гидрации</li>
            <li><code>enableViewportBreakpointDetection</code> — spacing после гидрации</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
            <code>enrichBlocksForSsr</code> в примере — проектная функция для предзагрузки api-select данных (newsList и т.п.) на сервере.
          </p>
        </section>

        <section className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Пример в репозитории</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <a href="https://github.com/mushket-co/block-builder/tree/master/examples/next" className="text-slate-700 dark:text-slate-300 hover:underline font-medium" target="_blank" rel="noopener noreferrer">
              examples/next
            </a>
            {' '}— App Router, Route Handlers, порт 3008
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            Базовый React API — в разделе{' '}
            <Link href="/docs/react" className="text-slate-700 dark:text-slate-300 hover:underline">React</Link>.
          </p>
        </section>
      </div>
    </DocsLayout>
  );
}
