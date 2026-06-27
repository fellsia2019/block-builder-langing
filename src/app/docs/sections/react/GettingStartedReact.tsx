'use client';

import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import { DEMO_BB_URL, GITHUB_EXAMPLES } from '@/lib/urls';
import type { NavigationProps } from '../../types';

export default function GettingStartedReact({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Быстрый старт с React</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          BlockBuilder UI через <code>@mushket-co/block-builder/react</code> (зависимость: React 18+ / 19)
        </p>
      </div>

      <section className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Установка</h2>
        <CodeBlock code="npm install @mushket-co/block-builder" language="bash" />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          Подключите стили: <code>import &apos;@mushket-co/block-builder/index.esm.css&apos;</code>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Базовый пример</h2>
        <CodeBlock
          language="tsx"
          code={`import '@mushket-co/block-builder/index.esm.css'
import {
  BlockBuilderComponent,
  createBlockManagementUseCase,
} from '@mushket-co/block-builder/react'
import { TextBlock } from './components/blocks/TextBlock'

const blockManagementUseCase = createBlockManagementUseCase()
blockManagementUseCase.getComponentRegistry().register('text', TextBlock)

const availableBlockTypes = [{
  type: 'text',
  label: 'Текст',
  render: { kind: 'component', framework: 'react', component: TextBlock },
  fields: [
    { field: 'content', label: 'Содержимое', type: 'textarea',
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
      onBlockAdded={(b) => console.log('added', b)}
      onBlockUpdated={(b) => console.log('updated', b)}
      onBlockDeleted={(id) => console.log('deleted', id)}
    />
  )
}`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Vite</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Импортируйте из <code>@mushket-co/block-builder/react</code> — Vite соберёт пакет из npm.
          Живое демо:{' '}
          <a href={DEMO_BB_URL} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            demo-bb
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">SSR</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Next.js App Router —{' '}
          <Link href="/docs/next" className="text-blue-600 hover:underline">
            Next.js (SSR)
          </Link>
          . Живые SSR-примеры —{' '}
          <a href={GITHUB_EXAMPLES} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            block-builder/examples
          </a>
          .
        </p>
      </section>

      <section className="rounded-xl p-6 border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Что дальше?</h2>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            →{' '}
            <Link href="/docs/react/components" className="text-blue-600 hover:underline">
              API BlockBuilderComponent
            </Link>
          </li>
          <li>
            →{' '}
            <Link href="/docs/react/events" className="text-blue-600 hover:underline">
              Колбэки onBlockAdded / Updated / Deleted
            </Link>
          </li>
          <li>
            →{' '}
            <Link href="/docs/core/form-fields" className="text-blue-600 hover:underline">
              Поля форм
            </Link>
          </li>
          <li>
            →{' '}
            <Link href="/docs/changelog" className="text-blue-600 hover:underline">
              История изменений
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
