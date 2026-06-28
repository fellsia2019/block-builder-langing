'use client';

import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import Icon from '@/components/Icon';
import type { NavigationProps } from '../../types';
import DocHeading from '../../components/DocHeading';

export default function ThemingLocalizationSection({
  nextSection,
  nextTitle,
  onNavigate,
}: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Темизация и локализация UI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          BlockBuilder (Vue/React) поддерживает встроенную
          локализацию строк и переопределение внешнего вида через CSS custom properties на{' '}
          <code className="text-primary-600 dark:text-primary-400">.bb-app</code>.
        </p>
      </div>

      <section className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-6 border-l-4 border-violet-500">
        <DocHeading id="locale-ui-strings">Локализация UI</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Пакет локализует только свой UI (кнопки, подписи контролов, сообщения валидации). Подписи полей
          в <code>block-config</code> задаёт приложение.
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <li>
            <code>locale</code> — <code>&apos;ru&apos;</code> (по умолчанию) или <code>&apos;en&apos;</code>
          </li>
          <li>
            <code>uiStrings</code> / <code>:ui-strings</code> — точечные переопределения отдельных строк
          </li>
          <li>
            Экспорт: <code>UI_STRINGS_RU</code>, <code>UI_STRINGS_EN</code>, <code>resolveUiStrings</code>,{' '}
            <code>IUiStrings</code>
          </li>
        </ul>
        <CodeBlock
          language="vue"
          code={`<BlockBuilderComponent
  locale="en"
  :ui-strings="{ save: 'Publish', cancel: 'Close' }"
  ...
/>`}
        />
        <CodeBlock
          language="tsx"
          className="mt-4"
          code={`<BlockBuilderComponent
  locale="en"
  uiStrings={{ save: 'Publish', cancel: 'Close' }}
  ...
/>`}
        />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          React: хук <code>useUiStrings()</code> внутри UI. Vue: <code>useUiStrings()</code> через
          provide/inject.
        </p>
      </section>

      <section className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-6 border-l-4 border-cyan-500">
        <DocHeading id="theme-presets">Пресет theme=&quot;dark&quot;</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Встроенная тёмная палитра применяется через prop <code>theme</code>. Переменные записываются на
          корневой элемент <code>.bb-app</code>.
        </p>
        <CodeBlock
          language="vue"
          code={`<BlockBuilderComponent theme="dark" ... />`}
        />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          Core API (<code>BlockBuilder</code> фасад) UI не рендерит — props <code>theme</code> /{' '}
          <code>locale</code> там не используются.
        </p>
      </section>

      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
        <DocHeading id="theme-vars">Кастомизация themeVars</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Любые токены <code>--bb-*</code> можно переопределить объектом <code>themeVars</code>.
        </p>
        <CodeBlock
          language="typescript"
          code={`import {
  UI_THEME_COLORS_DEFAULT,
  UI_THEME_COLORS_DARK,
  resolveThemeVars,
} from '@mushket-co/block-builder/vue'

const brandVars = {
  '--bb-color-primary': '#0f766e',
  '--bb-color-primary-dark': '#115e59',
  '--bb-color-surface': '#f0fdfa',
  '--bb-form-control-height': '44px',
  '--bb-radius-lg': '18px',
}`}
        />
        <CodeBlock
          language="vue"
          className="mt-4"
          code={`<BlockBuilderComponent
  :theme-vars="brandVars"
  ...
/>`}
        />
      </section>

      <section className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border-l-4 border-emerald-500">
        <DocHeading id="teleported-ui">Teleported UI (dropdown)</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Панели <code>CustomDropdown</code> монтируются в <code>body</code> и теряют наследование CSS
          variables. Пакет автоматически копирует theme vars с ближайшего <code>.bb-app</code> при
          открытии dropdown (Vue/React <code>CustomDropdown</code>).
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Для своего teleported UI можно использовать внутренний хелпер{' '}
          <code>readBbThemeVarsFromClosestApp</code> из <code>shared/theme/bbThemeContext</code> (паттерн
          пакета).
        </p>
      </section>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="link" size={22} className="text-blue-600 dark:text-blue-400" />
          См. также
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/docs/vue/components" className="text-primary-600 hover:underline">
              Vue — BlockBuilderComponent (props)
            </Link>
          </li>
          <li>
            <Link href="/docs/react/components" className="text-primary-600 hover:underline">
              React — BlockBuilderComponent (props)
            </Link>
          </li>
          <li>
            <Link href="/docs/changelog" className="text-primary-600 hover:underline">
              История изменений 1.11.0
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
