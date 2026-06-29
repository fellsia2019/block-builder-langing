'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { docRichTags, renderDocRichString } from '../../components/docRichTags';
import PropertyCard from '../../components/PropertyCard';
import type { NavigationProps } from '../../types';

const DOC_LINK_CLASS = 'text-primary-600 dark:text-primary-400 hover:underline';

const TYPE_ANCHORS: Record<string, string> = {
  IBlockBuilderOptions: 'iblock-builder-options',
  IBlockDto: 'iblock-dto',
  IBlockTypeConfig: 'iblock-type-config',
  IBlockConfig: 'iblock-type-config',
};

function TypeLink({ name }: { name: string }) {
  const anchor = TYPE_ANCHORS[name];
  if (!anchor) return <>{name}</>;
  return (
    <Link href={`/docs/core/types#${anchor}`} className={DOC_LINK_CLASS}>
      {name}
    </Link>
  );
}

export default function PropertiesSection(_props: NavigationProps) {
  const t = useTranslations('docsPages.core.properties');
  const tCommon = useTranslations('docsPages.common');

  const rich = {
    ...docRichTags,
    typeLink: (chunks: ReactNode) => <TypeLink name={String(chunks)} />,
    themeVarsLink: (chunks: ReactNode) => (
      <Link href="/docs/core/theming-localization#theme-vars" className={DOC_LINK_CLASS}>
        {chunks}
      </Link>
    ),
    themingLink: (chunks: ReactNode) => (
      <Link href="/docs/core/theming-localization" className={DOC_LINK_CLASS}>
        {chunks}
      </Link>
    ),
    classesImportLink: (chunks: ReactNode) => (
      <Link href="/docs/core/classes#import" className={DOC_LINK_CLASS}>
        {chunks}
      </Link>
    ),
    classesExampleLink: (chunks: ReactNode) => (
      <Link href="/docs/core/classes#example" className={DOC_LINK_CLASS}>
        {chunks}
      </Link>
    ),
    formFieldsLink: (chunks: ReactNode) => (
      <Link href="/docs/core/form-fields" className={DOC_LINK_CLASS}>
        {chunks}
      </Link>
    ),
    customRegisterLink: (chunks: ReactNode) => (
      <Link href="/docs/core/form-fields#custom-register" className={DOC_LINK_CLASS}>
        {chunks}
      </Link>
    ),
    componentLink: (chunks: ReactNode) => (
      <Link href="/docs/vue/components#block-builder-component" className={DOC_LINK_CLASS}>
        {chunks}
      </Link>
    ),
    vueComponentsLink: (chunks: ReactNode) => (
      <Link href="/docs/vue/components" className={DOC_LINK_CLASS}>
        {chunks}
      </Link>
    ),
    reactComponentsLink: (chunks: ReactNode) => (
      <Link href="/docs/react/components" className={DOC_LINK_CLASS}>
        {chunks}
      </Link>
    ),
  };

  const renderParam = (base: string) => ({
    description: renderDocRichString(t.raw(`${base}.description`) as string, rich),
    seeAlso: renderDocRichString(t.raw(`${base}.seeAlso`) as string, rich),
  });

  const blockConfigs = renderParam('parameters.blockConfigs');
  const autoInit = renderParam('parameters.autoInit');
  const initialBlocks = renderParam('parameters.initialBlocks');
  const theme = renderParam('parameters.theme');
  const locale = renderParam('parameters.locale');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {renderDocRichString(t.raw('subtitle') as string, rich)}
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{t('parameters.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {renderDocRichString(t.raw('parameters.intro') as string, rich)}
        </p>
        <div className="space-y-4">
          <PropertyCard
            name="blockConfigs"
            type={
              <>
                Record&lt;string, <TypeLink name="IBlockTypeConfig" />&gt;
              </>
            }
            required
            requiredLabel={tCommon('badges.required')}
            description={blockConfigs.description}
            seeAlso={blockConfigs.seeAlso}
          />
          <PropertyCard
            name="autoInit"
            type="boolean"
            defaultValue="true"
            description={autoInit.description}
            seeAlso={autoInit.seeAlso}
          />
          <PropertyCard
            name="initialBlocks"
            type={
              <>
                <TypeLink name="IBlockDto" />[]
              </>
            }
            description={initialBlocks.description}
            seeAlso={initialBlocks.seeAlso}
          />
          <PropertyCard
            name="theme"
            type="TUiTheme"
            defaultValue="default"
            description={theme.description}
            seeAlso={theme.seeAlso}
          />
          <PropertyCard
            name="locale"
            type="'ru' | 'en'"
            defaultValue="ru"
            description={locale.description}
            seeAlso={locale.seeAlso}
          />
        </div>
      </section>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p>{renderDocRichString(t.raw('footnote.uiNote') as string, rich)}</p>
      </div>
    </div>
  );
}
