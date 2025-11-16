'use client';

import CodeBlock from '@/components/CodeBlock';
import Icon from '@/components/Icon';
import type { NavigationProps } from '../../types';

export default function UtilitiesSection({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Утилиты</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Вспомогательные функции, экспортируемые из пакета и доступные для использования в вашем приложении
        </p>
      </div>

      <section className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border-l-4 border-emerald-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="lock" size={22} className="text-emerald-600 dark:text-emerald-400" />
          Блокировка скролла
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          Управление блокировкой прокрутки документа. Экспортируется из <code className="text-emerald-700 dark:text-emerald-400">@mushket-co/block-builder/core</code>.
        </p>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Сигнатуры</h3>
          <CodeBlock
            code={`function setScrollLockHandlers(handlers: { lock?: () => void; unlock?: () => void }): void
function lockBodyScroll(): void
function unlockBodyScroll(): void`}
            language="typescript"
            className="mb-2"
          />
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li><code>setScrollLockHandlers</code> — глобально переопределяет обработчики блокировки/разблокировки.</li>
            <li><code>lockBodyScroll</code>/<code>unlockBodyScroll</code> — дефолтные реализации: добавляют/убирают CSS‑класс, учитывают ширину скроллбара.</li>
          </ul>
        </div>
        <CodeBlock
          code={`import { setScrollLockHandlers, lockBodyScroll, unlockBodyScroll } from '@mushket-co/block-builder/core';

setScrollLockHandlers({
  lock: () => document.body.classList.add('bb-scroll-locked'),
  unlock: () => document.body.classList.remove('bb-scroll-locked'),
});

// Пример использования в модалке
lockBodyScroll();
// ... открыта модалка ...
unlockBodyScroll();`}
          language="javascript"
          className="mb-3"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-emerald-100 dark:bg-emerald-900/20 rounded-lg p-3 border border-emerald-200 dark:border-emerald-800">
            <h4 className="font-semibold text-emerald-900 dark:text-emerald-300 mb-1 text-sm">Советы</h4>
            <ul className="list-disc list-inside text-xs text-gray-700 dark:text-gray-300 space-y-1">
              <li>Задайте одинаковую стратегию для модалок, дропдаунов, оверлеев — не миксуйте подходы.</li>
              <li>При кастомной реализации учитывайте компенсацию ширины скроллбара (padding-right).</li>
            </ul>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 border-l-4 border-yellow-400">
            <p className="text-xs text-gray-700 dark:text-gray-300">
              Если ваш фреймворк уже управляет блокировкой (например, сторонняя библиотека модалок), переопределите хендлеры через <code>setScrollLockHandlers</code> и делегируйте в библиотеку.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="layers" size={22} className="text-blue-600 dark:text-blue-400" />
          Вспомогательные функции блоков
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          Экспортируются из <code className="text-blue-700 dark:text-blue-400">@mushket-co/block-builder/core</code>:
          <code className="text-blue-700 dark:text-blue-400"> buildBlockHierarchy, cloneBlock, getAllChildren, isChildOf</code>.
        </p>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Сигнатуры</h3>
          <CodeBlock
            code={`function buildBlockHierarchy(blocks: IBlockDto[]): Array<IBlockDto & { children: IBlockDto[] }>
function cloneBlock<T extends object>(block: T): T
function getAllChildren(blocks: IBlockDto[], parentId: string): IBlockDto[]
function isChildOf(blocks: IBlockDto[], childId: string, parentId: string): boolean`}
            language="typescript"
            className="mb-2"
          />
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li><code>buildBlockHierarchy</code> — преобразует плоский список в дерево по полям <code>parent</code>/<code>children</code>.</li>
            <li><code>cloneBlock</code> — глубоко клонирует объект блока (без ссылок на оригинал).</li>
            <li><code>getAllChildren</code> — возвращает всех потомков (в любом уровне вложенности).</li>
            <li><code>isChildOf</code> — быстро проверяет отношение принадлежности к родителю.</li>
          </ul>
        </div>
        <CodeBlock
          code={`import { buildBlockHierarchy, cloneBlock, getAllChildren, isChildOf } from '@mushket-co/block-builder/core';

const hierarchy = buildBlockHierarchy(blocks);
const copy = cloneBlock(block);
const children = getAllChildren(blocks, parentId);
const inside = isChildOf(blocks, childId, parentId);`}
          language="javascript"
          className="mb-3"
        />
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border-l-4 border-blue-400">
          <p className="text-xs text-gray-700 dark:text-gray-300">
            Рекомендуется нормализовать входные данные: гарантировать уникальные <code>id</code> и согласованность связей <code>parent</code>⇄<code>children</code> перед вызовами helper’ов.
          </p>
        </div>
      </section>

      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="settings" size={22} className="text-indigo-600 dark:text-indigo-400" />
          Spacing helpers
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          Экспортируются из <code className="text-indigo-700 dark:text-indigo-400">@mushket-co/block-builder/core</code>:
          <code className="text-indigo-700 dark:text-indigo-400"> DEFAULT_BREAKPOINTS, generateSpacingCSS, generateSpacingCSSVariables, getSpacingValue, mergeSpacing, setSpacingValue, validateSpacing</code>.
        </p>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Сигнатуры</h3>
          <CodeBlock
            code={`const DEFAULT_BREAKPOINTS: Array<{ name: string; label: string; maxWidth?: number }>
function generateSpacingCSS(spacing: any, prefix?: string): string
function generateSpacingCSSVariables(spacing: any, prefix?: string): Record<string, string>
function getSpacingValue(spacing: any, breakpoint: string, type: 'padding-top' | 'padding-bottom' | 'margin-top' | 'margin-bottom'): number | undefined
function setSpacingValue(spacing: any, breakpoint: string, type: 'padding-top' | 'padding-bottom' | 'margin-top' | 'margin-bottom', value: number): any
function mergeSpacing(base: any, patch: any): any
function validateSpacing(spacing: any): { valid: boolean; errors: string[] }`}
            language="typescript"
            className="mb-2"
          />
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li><code>generateSpacingCSSVariables</code> — удобно для передачи padding через CSS‑переменные в компонент.</li>
            <li><code>generateSpacingCSS</code> — пригодно для SSR/инъекции стилей на страницу (e.g. style‑tag).</li>
            <li><code>mergeSpacing</code> — аккуратно объединяет конфигурации (не затирая отсутствующие ключи).</li>
            <li><code>validateSpacing</code> — используйте в бек‑ или CI‑валидации конфигураций.</li>
          </ul>
        </div>
        <CodeBlock
          code={`import { DEFAULT_BREAKPOINTS, generateSpacingCSSVariables, mergeSpacing } from '@mushket-co/block-builder/core';

const cssVars = generateSpacingCSSVariables(spacing);
const merged = mergeSpacing(baseSpacing, patch);`}
          language="javascript"
          className="mb-3"
        />
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 border-l-4 border-indigo-400">
          <p className="text-xs text-gray-700 dark:text-gray-300">
            В UI‑версии BlockBuilder применяет spacing автоматически. Эти helper’ы полезны при ручной интеграции (/core) или для генерации стилей вне UI компонентов.
          </p>
        </div>
      </section>

      <section className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border-l-4 border-purple-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="shield" size={22} className="text-purple-600 dark:text-purple-400" />
          UniversalValidator
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          Единый валидатор для форм; экспортируется из <code className="text-purple-700 dark:text-purple-400">@mushket-co/block-builder/core</code>.
        </p>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Сигнатуры</h3>
          <CodeBlock
            code={`class UniversalValidator {
  constructor(rules: IValidationRule[])
  validate(values: Record<string, any>): { isValid: boolean; errors: Record<string, string[]> }
}`}
            language="typescript"
            className="mb-2"
          />
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>Поддерживаются правила: <code>required</code>, <code>email</code>, <code>url</code>, <code>min</code>/<code>max</code>, <code>minLength</code>/<code>maxLength</code>, <code>pattern</code>, <code>custom</code>.</li>
            <li>Сообщение <code>message</code> опционально; есть тексты по умолчанию.</li>
          </ul>
        </div>
        <CodeBlock
          code={`import { UniversalValidator } from '@mushket-co/block-builder/core';

const validator = new UniversalValidator(rules);
const { isValid, errors } = validator.validate(values);`}
          language="javascript"
          className="mb-3"
        />
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border-l-4 border-purple-500">
          <p className="text-xs text-gray-700 dark:text-gray-300">
            Для сложных кейсов используйте правило <code>custom</code> с собственной функцией проверки. Возвращайте <code>false</code> при неуспехе и задайте <code>message</code> для читаемой ошибки.
          </p>
        </div>
      </section>


    </div>
  );
}


