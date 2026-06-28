'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import CodeBlock from '@/components/CodeBlock';
import Icon from '@/components/Icon';
import DocHeading from '../../components/DocHeading';
import { docRichTags } from '../../components/docRichTags';
import type { NavigationProps } from '../../types';

export default function ThemingLocalizationSection(_props: NavigationProps) {
  const t = useTranslations('docsPages.core.themingLocalization');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t.rich('subtitle', docRichTags)}</p>
      </div>

      <section className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-6 border-l-4 border-violet-500">
        <DocHeading id="locale-ui-strings">{t('locale.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t.rich('locale.p1', docRichTags)}</p>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <li>{t.rich('locale.localeItem', docRichTags)}</li>
          <li>{t.rich('locale.uiStringsItem', docRichTags)}</li>
          <li>{t.rich('locale.exportsItem', docRichTags)}</li>
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
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">{t.rich('locale.hooksNote', docRichTags)}</p>
      </section>

      <section className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-6 border-l-4 border-cyan-500">
        <DocHeading id="theme-presets">{t('themePreset.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t.rich('themePreset.p1', docRichTags)}</p>
        <CodeBlock language="vue" code={`<BlockBuilderComponent theme="dark" ... />`} />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">{t.rich('themePreset.coreNote', docRichTags)}</p>
      </section>

      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
        <DocHeading id="theme-vars">{t('themeVars.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t.rich('themeVars.description', docRichTags)}</p>
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
        <DocHeading id="teleported-ui">{t('teleportedUi.title')}</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t.rich('teleportedUi.p1', docRichTags)}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{t.rich('teleportedUi.p2', docRichTags)}</p>
      </section>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="link" size={22} className="text-blue-600 dark:text-blue-400" />
          {t('seeAlso.title')}
        </h2>
        <ul className="space-y-2 text-sm">
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
