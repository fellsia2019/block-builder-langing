'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import CodeBlock from '@/components/CodeBlock';
import Icon from '@/components/Icon';
import DocHeading from '../../components/DocHeading';
import { docRichTags, renderDocRichString } from '../../components/docRichTags';
import type { NavigationProps } from '../../types';
import { THEME_TOKEN_GROUPS, UI_STRING_GROUPS } from './themeTokenData';

const CUSTOMIZABLE_UI_KEYS = [
  'controls',
  'blockToolbar',
  'modals',
  'forms',
  'dropdowns',
  'upload',
  'repeater',
  'matrix',
  'spacing',
  'confirm',
] as const;

const THEME_TIP_KEYS = ['brand', 'forms', 'glass', 'alpha'] as const;

function TokenTable({ groupKey }: { groupKey: string }) {
  const t = useTranslations('docsPages.core.themingLocalization');
  const group = THEME_TOKEN_GROUPS.find((g) => g.key === groupKey);
  if (!group) return null;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800/80 text-left">
            <th className="px-3 py-2 font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
              {t('tokenReference.columns.token')}
            </th>
            <th className="px-3 py-2 font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap hidden sm:table-cell">
              {t('tokenReference.columns.default')}
            </th>
            <th className="px-3 py-2 font-semibold text-gray-700 dark:text-gray-300">
              {t('tokenReference.columns.usage')}
            </th>
          </tr>
        </thead>
        <tbody>
          {group.tokens.map((token) => (
            <tr
              key={token.var}
              className="border-t border-gray-100 dark:border-gray-800 align-top"
            >
              <td className="px-3 py-2">
                <code className="text-xs text-primary-700 dark:text-primary-400 break-all">{token.var}</code>
              </td>
              <td className="px-3 py-2 text-gray-500 dark:text-gray-400 text-xs font-mono hidden sm:table-cell max-w-[180px] break-all">
                {token.default}
              </td>
              <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                {t(`tokenGroups.${groupKey}.tokens.${token.usageKey}`)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ThemingLocalizationSection(_props: NavigationProps) {
  const t = useTranslations('docsPages.core.themingLocalization');

  const exampleRich = {
    ...docRichTags,
    link: (chunks: ReactNode) => (
      <a
        href="https://github.com/mushket-co/block-builder/tree/master/examples/vue3-theme"
        className="text-primary-600 dark:text-primary-400 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {chunks}
      </a>
    ),
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {renderDocRichString(t.raw('subtitle') as string, docRichTags)}
        </p>
      </div>

      <section className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-6 border-l-4 border-slate-500">
        <DocHeading id="how-it-works">{t('howItWorks.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          {renderDocRichString(t.raw('howItWorks.p1') as string, docRichTags)}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {renderDocRichString(t.raw('howItWorks.p2') as string, docRichTags)}
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {(['scope', 'notCore', 'merge'] as const).map((key) => (
            <li key={key}>{renderDocRichString(t.raw(`howItWorks.items.${key}`) as string, docRichTags)}</li>
          ))}
        </ul>
      </section>

      <section className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border-l-4 border-amber-500">
        <DocHeading id="customizable-ui">{t('customizableUi.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {renderDocRichString(t.raw('customizableUi.description') as string, docRichTags)}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
          {CUSTOMIZABLE_UI_KEYS.map((key) => (
            <div key={key} className="flex gap-2 items-start">
              <span className="text-amber-600 dark:text-amber-400 mt-0.5">•</span>
              <span>{t(`customizableUi.items.${key}`)}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <DocHeading id="theme-methods">{t('themeMethods.title')}</DocHeading>
        <div className="space-y-4">
          {(['preset', 'themeVars', 'css'] as const).map((key) => (
            <div
              key={key}
              className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900/40"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t(`themeMethods.${key}.title`)}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {renderDocRichString(t.raw(`themeMethods.${key}.description`) as string, docRichTags)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-6 border-l-4 border-cyan-500">
        <DocHeading id="theme-presets">{t('themePreset.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {renderDocRichString(t.raw('themePreset.p1') as string, docRichTags)}
        </p>
        <CodeBlock language="vue" code={`<BlockBuilderComponent theme="dark" ... />`} />
        <CodeBlock
          language="tsx"
          className="mt-4"
          code={`<BlockBuilderComponent theme="dark" ... />`}
        />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          {renderDocRichString(t.raw('themePreset.darkNote') as string, docRichTags)}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {renderDocRichString(t.raw('themePreset.coreNote') as string, docRichTags)}
        </p>
      </section>

      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
        <DocHeading id="theme-vars">{t('themeVars.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {renderDocRichString(t.raw('themeVars.description') as string, docRichTags)}
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
  '--bb-color-neutral-8': '#134e4a',
  '--bb-form-control-height': '44px',
  '--bb-radius-lg': '18px',
  '--bb-font-family': '"Space Grotesk", system-ui, sans-serif',
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
        <CodeBlock
          language="tsx"
          className="mt-4"
          code={`<BlockBuilderComponent
  themeVars={brandVars}
  ...
/>`}
        />
        <CodeBlock
          language="css"
          className="mt-4"
          code={`${t('examples.cssCodeComment')}
.bb-app {
  --bb-color-primary: #0f766e;
  --bb-color-surface: #f0fdfa;
}`}
        />
        <h3 className="text-lg font-bold mt-6 mb-2 text-gray-900 dark:text-white">{t('themeVars.exportsTitle')}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {renderDocRichString(t.raw('themeVars.exports') as string, docRichTags)}
        </p>
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{t('themeVars.tipsTitle')}</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
          {THEME_TIP_KEYS.map((key) => (
            <li key={key}>{renderDocRichString(t.raw(`themeVars.tips.${key}`) as string, docRichTags)}</li>
          ))}
        </ul>
      </section>

      <section>
        <DocHeading id="token-reference">{t('tokenReference.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {renderDocRichString(t.raw('tokenReference.description') as string, docRichTags)}
        </p>
        <div className="space-y-8">
          {THEME_TOKEN_GROUPS.map((group) => (
            <div key={group.key}>
              <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white" id={`tokens-${group.key}`}>
                {t(`tokenGroups.${group.key}.title`)}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {t(`tokenGroups.${group.key}.description`)}
              </p>
              <TokenTable groupKey={group.key} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border-l-4 border-emerald-500">
        <DocHeading id="examples">{t('examples.title')}</DocHeading>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {renderDocRichString(t.raw('examples.liveExample') as string, exampleRich)}
        </p>
        <CodeBlock
          language="vue"
          code={`<BlockBuilderComponent
  theme="dark"
  :theme-vars="{
    '--bb-color-primary': '#c084fc',
    '--bb-color-surface': 'rgba(32, 34, 42, 0.52)',
    '--bb-modal-radius': '28px',
  }"
/>`}
        />
      </section>

      <section className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-6 border-l-4 border-violet-500">
        <DocHeading id="locale-ui-strings">{t('locale.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {renderDocRichString(t.raw('locale.p1') as string, docRichTags)}
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <li>{renderDocRichString(t.raw('locale.localeItem') as string, docRichTags)}</li>
          <li>{renderDocRichString(t.raw('locale.uiStringsItem') as string, docRichTags)}</li>
          <li>{renderDocRichString(t.raw('locale.exportsItem') as string, docRichTags)}</li>
        </ul>
        <CodeBlock
          language="vue"
          code={`<BlockBuilderComponent
  locale="en"
  :ui-strings="{ save: 'Publish', cancelButtonText: 'Close' }"
  ...
/>`}
        />
        <CodeBlock
          language="tsx"
          className="mt-4"
          code={`<BlockBuilderComponent
  locale="en"
  uiStrings={{ save: 'Publish', cancelButtonText: 'Close' }}
  ...
/>`}
        />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          {renderDocRichString(t.raw('locale.hooksNote') as string, docRichTags)}
        </p>

        <h3 className="text-lg font-bold mt-6 mb-2 text-gray-900 dark:text-white">{t('uiStringGroups.title')}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {renderDocRichString(t.raw('uiStringGroups.description') as string, docRichTags)}
        </p>
        <div className="space-y-4">
          {UI_STRING_GROUPS.map((group) => (
            <div key={group.key}>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                {t(`uiStringGroups.${group.key}`)}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono break-all">
                {group.keys.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border-l-4 border-emerald-500">
        <DocHeading id="teleported-ui">{t('teleportedUi.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {renderDocRichString(t.raw('teleportedUi.p1') as string, docRichTags)}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {renderDocRichString(t.raw('teleportedUi.p2') as string, docRichTags)}
        </p>
      </section>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="link" size={22} className="text-blue-600 dark:text-blue-400" />
          {t('seeAlso.title')}
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/docs/core/properties" className="text-primary-600 hover:underline">
              {t('seeAlso.properties')}
            </Link>
          </li>
          <li>
            <Link href="/docs/vue/components" className="text-primary-600 hover:underline">
              {t('seeAlso.vueComponents')}
            </Link>
          </li>
          <li>
            <Link href="/docs/react/components" className="text-primary-600 hover:underline">
              {t('seeAlso.reactComponents')}
            </Link>
          </li>
          <li>
            <Link href="/docs/changelog" className="text-primary-600 hover:underline">
              {t('seeAlso.changelog')}
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
