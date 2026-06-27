'use client';

import CodeBlock from '@/components/CodeBlock';
import type { NavigationProps } from '../../types';

export default function PropertiesSection({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Свойства</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Публичные свойства и опции инициализации программного API (<code>BlockBuilder</code>)
        </p>
      </div>

      {/* theme / locale — в API есть, но пока не влияют на поведение
      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-indigo-700 dark:text-indigo-400">theme</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">Текущая тема (light/dark)</p>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <code className="text-sm text-gray-900 dark:text-gray-100">readonly theme: string</code>
        </div>
      </section>

      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-indigo-700 dark:text-indigo-400">locale</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">Текущая локализация</p>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <code className="text-sm text-gray-900 dark:text-gray-100">readonly locale: string</code>
        </div>
      </section>
      */}

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Опции инициализации</h2>

        <div className="space-y-6">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              <code className="text-indigo-700 dark:text-indigo-400">blockConfigs</code>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">(обязательный)</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Конфигурация типов блоков: ключ — <code>type</code>, значение — конфиг полей и метаданных.
            </p>
            <code className="text-sm bg-white dark:bg-slate-800 rounded p-3 block">
              blockConfigs: Record&lt;string, IBlockConfig&gt;
            </code>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              <code className="text-indigo-700 dark:text-indigo-400">autoInit</code>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Автозагрузка <code>initialBlocks</code> при создании экземпляра (по умолчанию: <code>true</code>).
            </p>
            <code className="text-sm bg-white dark:bg-slate-800 rounded p-3 block">autoInit?: boolean</code>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              <code className="text-indigo-700 dark:text-indigo-400">initialBlocks</code>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Начальный набор блоков при инициализации.
            </p>
            <CodeBlock
              language="javascript"
              code={`const blockBuilder = new BlockBuilder({
  blockConfigs,
  initialBlocks: await loadBlocksFromApi(),
})`}
            />
          </div>

          {/* theme / locale — зарезервировано в пакете, пока без эффекта
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              <code className="text-indigo-700 dark:text-indigo-400">theme</code> /{' '}
              <code className="text-indigo-700 dark:text-indigo-400">locale</code>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Опциональные настройки темы и локали при создании.
            </p>
            <CodeBlock
              language="javascript"
              code={`new BlockBuilder({
  blockConfigs,
  theme: 'dark',
  locale: 'ru',
})`}
            />
          </div>
          */}        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
          UI-опции (<code>onSave</code>, <code>isEdit</code>, панель контролов) — в{' '}
          <code>BlockBuilderComponent</code>, см. разделы компонентов.
        </p>
      </section>
    </div>
  );
}
