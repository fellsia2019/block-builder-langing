'use client';

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

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500 mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            <code className="text-indigo-700 dark:text-indigo-400">blockConfigs</code>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">(обязательный)</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Конфигурация типов блоков. Объект, где ключ — это тип блока (type), а значение — конфигурация блока.
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
            <code className="text-sm text-gray-900 dark:text-gray-100">blockConfigs: Record&lt;string, IBlockConfig&gt;</code>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Подробное описание структуры конфигурации блока см. в разделе "Конфигурация блоков".
          </p>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500 mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            <code className="text-indigo-700 dark:text-indigo-400">containerId</code>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">(опциональный)</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            ID HTML элемента, в который будет рендериться UI BlockBuilder. Необходим только для полной версии с UI.
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
            <code className="text-sm text-gray-900 dark:text-gray-100">containerId?: string</code>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Для <code className="text-indigo-700 dark:text-indigo-400">/core</code> версии этот параметр не требуется.
          </p>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500 mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            <code className="text-indigo-700 dark:text-indigo-400">autoInit</code>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">(опциональный, default: true)</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Автоматическая инициализация UI при создании экземпляра BlockBuilder.
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
            <code className="text-sm text-gray-900 dark:text-gray-100">autoInit?: boolean (default: true)</code>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Если установлено <code className="text-indigo-700 dark:text-indigo-400">false</code>, UI нужно будет инициализировать вручную через метод <code className="text-indigo-700 dark:text-indigo-400">init()</code>.
          </p>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500 mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            <code className="text-indigo-700 dark:text-indigo-400">onSave</code>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">(опциональный)</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Callback функция для сохранения блоков. Вызывается при сохранении через UI или программно.
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
            <code className="text-sm text-gray-900 dark:text-gray-100">onSave?: (blocks: IBlockDto[]) =&gt; Promise&lt;boolean&gt; | boolean</code>
          </div>
          <CodeBlock
            code={`onSave: async (blocks) => {
  // Сохранение на сервер
  try {
    await fetch('/api/blocks/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blocks })
    })
    return true // Успешное сохранение
  } catch (error) {
    console.error('Ошибка сохранения:', error)
    return false // Ошибка сохранения
  }
}`}
            language="javascript"
            className="mb-2"
          />
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500 mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            <code className="text-indigo-700 dark:text-indigo-400">initialBlocks</code>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">(опциональный)</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Массив начальных блоков для загрузки при инициализации. Используется для восстановления ранее сохраненных блоков.
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
            <code className="text-sm text-gray-900 dark:text-gray-100">initialBlocks?: IBlockDto[]</code>
          </div>
          <CodeBlock
            code={`// Загрузка блоков с сервера
const loadBlocks = async () => {
  const response = await fetch('/api/blocks/load')
  const data = await response.json()
  return data.blocks || []
}

const blockBuilder = new BlockBuilder({
  containerId: 'my-app',
  blockConfigs: blockConfigs,
  initialBlocks: await loadBlocks()
})`}
            language="javascript"
            className="mb-2"
          />
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500 mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            <code className="text-indigo-700 dark:text-indigo-400">theme</code>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">(опциональный)</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Тема интерфейса BlockBuilder. По умолчанию используется системная тема.
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
            <code className="text-sm text-gray-900 dark:text-gray-100">theme?: 'light' | 'dark'</code>
          </div>
          <CodeBlock
            code={`const blockBuilder = new BlockBuilder({
  containerId: 'my-app',
  blockConfigs: blockConfigs,
  theme: 'dark' // или 'light'
})`}
            language="javascript"
            className="mb-2"
          />
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500 mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            <code className="text-indigo-700 dark:text-indigo-400">locale</code>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">(опциональный)</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Локализация интерфейса BlockBuilder. По умолчанию используется 'ru'.
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
            <code className="text-sm text-gray-900 dark:text-gray-100">locale?: string</code>
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500 mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            <code className="text-indigo-700 dark:text-indigo-400">license</code>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">(опциональный)</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Конфигурация лицензии для активации PRO функций.
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
            <code className="text-sm text-gray-900 dark:text-gray-100">license?: ILicenseConfig</code>
          </div>
          <CodeBlock
            code={`license: {
  type: 'pro', // или 'free'
  key: 'your-license-key', // Ключ лицензии для PRO версии
  maxBlockTypes?: number // Максимальное количество типов блоков (для FREE)
}`}
            language="javascript"
            className="mb-2"
          />
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500 mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            <code className="text-indigo-700 dark:text-indigo-400">controlsContainerClass</code>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">(опциональный)</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Кастомный CSS класс для контейнера контролов (кнопки добавления блоков и статистика).
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
            <code className="text-sm text-gray-900 dark:text-gray-100">controlsContainerClass?: string</code>
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500 mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            <code className="text-indigo-700 dark:text-indigo-400">controlsFixedPosition</code>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">(опциональный)</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Фиксирует панель управления (кнопки + статистика) сверху или снизу экрана при прокрутке.
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
            <code className="text-sm text-gray-900 dark:text-gray-100">controlsFixedPosition?: 'top' | 'bottom'</code>
          </div>
          <CodeBlock
            code={`const blockBuilder = new BlockBuilder({
  containerId: 'my-app',
  blockConfigs: blockConfigs,
  controlsFixedPosition: 'top' // или 'bottom'
})`}
            language="javascript"
            className="mb-2"
          />
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500 mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            <code className="text-indigo-700 dark:text-indigo-400">controlsOffset</code>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">(опциональный)</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Отступ панели управления от края экрана в пикселях (при использовании controlsFixedPosition).
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
            <code className="text-sm text-gray-900 dark:text-gray-100">controlsOffset?: number (default: 0)</code>
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500 mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            <code className="text-indigo-700 dark:text-indigo-400">controlsOffsetVar</code>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">(опциональный)</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            CSS переменная для учета высоты шапки/футера при фиксированной позиции контролов. Используется вместо controlsOffset для динамического отступа.
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
            <code className="text-sm text-gray-900 dark:text-gray-100">controlsOffsetVar?: string</code>
          </div>
          <CodeBlock
            code={`// В CSS
:root {
  --header-height: 80px;
}

// В JavaScript
const blockBuilder = new BlockBuilder({
  containerId: 'my-app',
  blockConfigs: blockConfigs,
  controlsFixedPosition: 'top',
  controlsOffsetVar: '--header-height' // Панель будет учитывать высоту шапки
})`}
            language="javascript"
            className="mb-2"
          />
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            <code className="text-indigo-700 dark:text-indigo-400">isEdit</code>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Режим редактирования. По умолчанию <code className="text-indigo-700 dark:text-indigo-400">true</code> (режим редактирования).
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Если установлено <code className="text-indigo-700 dark:text-indigo-400">false</code>, все контролы редактирования скрываются, остаётся только пользовательская верстка блоков в обёртке BlockBuilder.
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
            <code className="text-sm text-gray-900 dark:text-gray-100">isEdit?: boolean (default: true)</code>
          </div>
          <CodeBlock
            code={`const blockBuilder = new BlockBuilder({
  containerId: 'my-app',  // Только для полной версии с UI
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
    </div>
  );
}

