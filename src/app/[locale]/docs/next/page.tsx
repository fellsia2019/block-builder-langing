'use client';

import { useTranslations } from 'next-intl';
import CodeBlock from '@/components/CodeBlock';
import { Link } from '@/i18n/navigation';
import { GITHUB_EXAMPLES, GITHUB_EXAMPLES_NEXT } from '@/lib/urls';
import DocHeading from '../components/DocHeading';
import { docRichTags, renderDocRichString } from '../components/docRichTags';

const SSR_UTIL_KEYS = [
  'prepareBlocksForDisplay',
  'enrichBlockForDisplay',
  'seedRepositoryFromBlocks',
  'enableViewportBreakpointDetection',
] as const;

export default function NextPage() {
  const t = useTranslations('docsPages.next');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{renderDocRichString(t.raw('subtitle') as string, docRichTags)}</p>
      </div>

      <section className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {renderDocRichString(t.raw('demoNote') as string, {
            ...docRichTags,
            nextExample: (chunks) => (
              <a href={GITHUB_EXAMPLES_NEXT} className="text-slate-800 dark:text-slate-200 hover:underline font-medium" target="_blank" rel="noopener noreferrer">{chunks}</a>
            ),
            examples: (chunks) => (
              <a href={GITHUB_EXAMPLES} className="text-slate-800 dark:text-slate-200 hover:underline font-medium" target="_blank" rel="noopener noreferrer">{chunks}</a>
            ),
          })}
        </p>
      </section>

      <section className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-800/50 dark:to-gray-900/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <DocHeading id="install">{t('headings.install')}</DocHeading>
        <CodeBlock code="npm install @mushket-co/block-builder" language="bash" />
      </section>

      <section>
        <DocHeading id="next-config">{t('headings.nextConfig')}</DocHeading>
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
        <DocHeading id="server-client">{t('headings.serverClient')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('serverClient.description') as string, docRichTags)}</p>
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
        <DocHeading id="api-routes">{t('headings.apiRoutes')}</DocHeading>
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
        <DocHeading id="ssr-utils">{t('headings.ssrUtils')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{renderDocRichString(t.raw('ssrUtils.description') as string, docRichTags)}</p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 text-sm">
          {SSR_UTIL_KEYS.map((key) => (
            <li key={key} id={key === 'prepareBlocksForDisplay' ? 'prepare-blocks-for-display' : key === 'enrichBlockForDisplay' ? 'enrich-block-for-display' : key === 'seedRepositoryFromBlocks' ? 'seed-repository-from-blocks' : 'enable-viewport-breakpoint-detection'}>
              {renderDocRichString(t.raw(`ssrUtils.items.${key}`) as string, docRichTags)}
            </li>
          ))}
        </ul>
        <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">{renderDocRichString(t.raw('ssrUtils.enrichNote') as string, docRichTags)}</p>
      </section>

      <section className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t('liveExample.title')}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {renderDocRichString(t.raw('liveExample.description') as string, {
            example: (chunks) => (
              <a href={GITHUB_EXAMPLES_NEXT} className="text-slate-700 dark:text-slate-300 hover:underline font-medium" target="_blank" rel="noopener noreferrer">{chunks}</a>
            ),
          })}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          {renderDocRichString(t.raw('liveExample.reactApi') as string, {
            reactLink: (chunks) => (
              <Link href="/docs/react/getting-started" className="text-slate-700 dark:text-slate-300 hover:underline">{chunks}</Link>
            ),
          })}
        </p>
      </section>
    </div>
  );
}
