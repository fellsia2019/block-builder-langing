'use client';

import NextPageLink from '../../components/NextPageLink';
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

      <NextPageLink nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} color="primary" />
    </div>
  );
}

