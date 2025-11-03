'use client';

import NextPageLink from '../../components/NextPageLink';
import CodeBlock from '@/components/CodeBlock';
import type { NavigationProps } from '../../types';

export default function PropertiesSection({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Свойства</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Публичные свойства класса BlockBuilder
        </p>
      </div>

      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-indigo-700 dark:text-indigo-400">theme</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Текущая тема интерфейса (light/dark)
        </p>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <code className="text-sm text-gray-900 dark:text-gray-100">readonly theme: string</code>
        </div>
      </section>

      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-indigo-700 dark:text-indigo-400">locale</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Текущая локализация интерфейса
        </p>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <code className="text-sm text-gray-900 dark:text-gray-100">readonly locale: string</code>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Опции инициализации</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
          Параметры, передаваемые при создании экземпляра BlockBuilder
        </p>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            <code className="text-indigo-700 dark:text-indigo-400">isEdit</code>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Режим редактирования. По умолчанию <code className="text-indigo-700 dark:text-indigo-400">true</code> (режим редактирования).
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Если установлено <code className="text-indigo-700 dark:text-indigo-400">false</code>, все операции создания/редактирования/удаления блоков блокируются. 
            Остаётся доступной только функция копирования ID блока.
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
            <code className="text-sm text-gray-900 dark:text-gray-100">isEdit?: boolean (default: true)</code>
          </div>
          <CodeBlock
            code={`const blockBuilder = new BlockBuilder({
  containerId: 'my-app',
  blockConfigs: blockConfigs,
  isEdit: false // режим только просмотра
})`}
            language="javascript"
            className="mb-2"
          />
          <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              При изменении режима на элемент <code className="text-blue-700 dark:text-blue-400">body</code> автоматически добавляется/удаляется CSS класс <code className="text-blue-700 dark:text-blue-400">bb-is-edit-mode</code> для возможности кастомизации стилей в зависимости от режима работы.
            </p>
          </div>
        </div>
      </section>

      <NextPageLink nextSection={nextSection} nextTitle={nextTitle} nextHref={nextSection ? `/docs/core/${nextSection}` : null} color="primary" />
    </div>
  );
}

