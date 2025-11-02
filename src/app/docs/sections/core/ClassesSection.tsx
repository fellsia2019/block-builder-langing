'use client';

import NextPageLink from '../../components/NextPageLink';
import type { NavigationProps } from '../../types';

export default function ClassesSection({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Классы</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Основные классы библиотеки BlockBuilder
        </p>
      </div>

      <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-4 border-green-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-green-700 dark:text-green-400">BlockBuilder</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Основной класс для работы с блоками. Создает экземпляр конструктора с указанной конфигурацией.
        </p>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
          <code className="text-sm text-gray-900 dark:text-gray-100">
            new BlockBuilder(options: BlockBuilderOptions)
          </code>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Параметры:</h3>
          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li><code className="text-gray-900 dark:text-gray-100">containerId</code> - ID контейнера для UI</li>
            <li><code className="text-gray-900 dark:text-gray-100">blockConfigs</code> - Конфигурация типов блоков</li>
            <li><code className="text-gray-900 dark:text-gray-100">storage</code> - Тип хранилища (localStorage/sessionStorage)</li>
            <li><code className="text-gray-900 dark:text-gray-100">autoRender</code> - Автоматический рендеринг UI</li>
          </ul>
        </div>
      </section>

      <NextPageLink nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} color="primary" />
    </div>
  );
}

