'use client';

import type { NavigationProps } from '../../types';

export default function ClassesSection({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">BlockBuilder</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Основной класс программного API для программной работы с блоками
        </p>
      </div>

      <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-4 border-green-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-green-700 dark:text-green-400">BlockBuilder</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          API без UI: CRUD блоков, валидация, кастомные рендереры. Без встроенного UI — редактор
          подключается через <code>@mushket-co/block-builder/vue</code> или <code>/react</code>.
        </p>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
          <code className="text-sm text-gray-900 dark:text-gray-100">
            new BlockBuilder(options: IBlockBuilderOptions)
          </code>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Основные опции:</h3>
          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li><code>blockConfigs</code> — конфигурация типов блоков</li>
            <li><code>initialBlocks</code> — начальные блоки</li>
            <li><code>autoInit</code> — автозагрузка initialBlocks</li>
            <li><code>theme</code>, <code>locale</code> — тема и локализация</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
