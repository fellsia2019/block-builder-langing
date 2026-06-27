'use client';

import Link from 'next/link';
import { DEMO_BB_URL, GITHUB_EXAMPLES } from '@/lib/urls';
import DocsLayout from '../components/DocsLayout';
import CodeBlock from '@/components/CodeBlock';

export default function ReactPage() {
  return (
    <DocsLayout activeSection="react" activeSubSection="getting-started">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Быстрый старт с React</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            BlockBuilder 1.10.0 — React UI с code-splitting и блоками через <code>@mushket-co/block-builder/react</code>
            {' '}(peer: <strong>React 18+</strong> / 19)
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
            После <code>npm install @mushket-co/block-builder</code> импортируйте из{' '}
            <code>@mushket-co/block-builder/react</code> — Vite соберёт entry из npm (исключите пакет из{' '}
            <code>optimizeDeps</code>, если нужно). Живое демо:{' '}
            <a href={DEMO_BB_URL} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">block-builder-demo</a>.
            Alias на исходники — только при разработке самого пакета в monorepo.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">SSR</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Для Next.js App Router — раздел{' '}
            <Link href="/docs/next" className="text-blue-600 hover:underline">Next.js (SSR)</Link>.
            Для Nuxt — <Link href="/docs/nuxt" className="text-blue-600 hover:underline">Nuxt (SSR)</Link>.
            Живые SSR-примеры (не в demo-bb) — в{' '}
            <a href={GITHUB_EXAMPLES} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">block-builder/examples</a>.
          </p>
        </section>

        <section className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-4 border border-cyan-200 dark:border-cyan-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>1.10.0:</strong> поддержка <strong>React 18</strong> (<code>peerDependencies</code>{' '}
            <code>^18.0.0 || ^19.0.0</code>). Примеры в репозитории:{' '}
            <code>examples/react19</code> (:3004) и <code>examples/react18</code> (:3005). Живое demo-bb на React 18.
          </p>
        </section>

        <section className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>1.9.0 (BREAKING):</strong> встроенный Pure JS / DOM UI удалён. Готовый UI — только{' '}
            <code>@mushket-co/block-builder/react</code> + <code>index.esm.css</code>. Core API —{' '}
            <code>@mushket-co/block-builder/core</code>. Тяжёлые form controls подгружаются lazy при открытии формы.
          </p>
        </section>

        <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>1.8.0:</strong> <code>formScope</code> в custom fields, <code>optionsFrom</code> для <code>select</code>,{' '}
            <code>file-import</code> с <code>merge</code>/<code>dedupeBy</code>, <code>persist: false</code>. Демо блока «Form Features» — в{' '}
            <a href={DEMO_BB_URL} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">demo-bb</a>.
          </p>
        </section>

        <section className="bg-sky-50 dark:bg-sky-900/20 rounded-xl p-4 border border-sky-200 dark:border-sky-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>1.7.0:</strong> <code>formHooks</code> — <code>onFormOpen</code> (гидрация формы, loader) и{' '}
            <code>onBeforeSave</code> (финальные props / <code>cancel</code>). Vue 3 и React.
          </p>
        </section>

        <section className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>1.6.0:</strong> поле <code>matrix-table</code> — редактор таблицы в форме; демо блока «Таблица» в{' '}
            <a href={DEMO_BB_URL} className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">demo-bb</a>.
            <code>dependsOn</code> и ToggleControl — Vue 3 и React.
          </p>
        </section>

        <section className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-xl p-4 border border-fuchsia-200 dark:border-fuchsia-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>1.5.5:</strong> <code>select</code> с <code>multiple: true</code> — множественный выбор с тегами и сводкой значений.
          </p>
        </section>

        <section className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4 border border-violet-200 dark:border-violet-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>1.5.0:</strong> поля <code>block-anchor</code> (якорь/URL в форме; скролл — в вашем блоке), <code>file</code>/<code>files</code> с отдельным UI загрузки.
          </p>
        </section>

        <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 border border-teal-200 dark:border-teal-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>1.4.0:</strong> индикатор ошибок валидации в футере модалки и реактивная перевалидация после
            неуспешного submit — включены по умолчанию в <code>BlockBuilderComponent</code> и <code>BlockFormModal</code>.
          </p>
        </section>

        <section className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Полная документация API — в разделе{' '}
            <Link href="/docs/core/form-fields" className="text-blue-600 hover:underline">Поля форм</Link> и{' '}
            <a href="https://github.com/mushket-co/block-builder/blob/master/DOCS.md" className="text-blue-600 hover:underline">DOCS.md</a> репозитория.
          </p>
        </section>
      </div>
    </DocsLayout>
  );
}
