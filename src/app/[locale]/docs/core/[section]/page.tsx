'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCoreNavigation } from '../../hooks/useNavigation';
import type { CoreSubSection } from '../../types';
import DocsSectionFallback from '../../components/DocsSectionFallback';
import NextPageLink from '../../components/NextPageLink';
import DocsNotFound from '../../components/DocsNotFound';

const ClassesSection = dynamic(() => import('../../sections/core/ClassesSection'), {
  loading: () => <DocsSectionFallback />,
});
const MethodsSection = dynamic(() => import('../../sections/core/MethodsSection'), {
  loading: () => <DocsSectionFallback />,
});
const PropertiesSection = dynamic(() => import('../../sections/core/PropertiesSection'), {
  loading: () => <DocsSectionFallback />,
});
const TypesSection = dynamic(() => import('../../sections/core/TypesSection'), {
  loading: () => <DocsSectionFallback />,
});
const FormFieldsSection = dynamic(() => import('../../sections/core/FormFieldsSection'), {
  loading: () => <DocsSectionFallback />,
});
const UtilitiesSection = dynamic(() => import('../../sections/core/UtilitiesSection'), {
  loading: () => <DocsSectionFallback />,
});
const ThemingLocalizationSection = dynamic(
  () => import('../../sections/core/ThemingLocalizationSection'),
  { loading: () => <DocsSectionFallback /> }
);

export default function CoreSectionPage() {
  const params = useParams();
  const tNav = useTranslations('docs.nav');
  const section = params.section as string;
  const subSection = section as CoreSubSection;
  const { nextSection, nextTitle } = useCoreNavigation(subSection);

  const nextHref =
    subSection === 'types'
      ? '/docs/vue/getting-started'
      : nextSection
        ? `/docs/core/${nextSection}`
        : null;
  const resolvedNextTitle =
    subSection === 'types' ? `${tNav('vue')} — ${tNav('getStarted')}` : nextTitle;
  const resolvedNextSection = subSection === 'types' ? 'vue-getting-started' : nextSection;

  return (
    <>
      {getContent(subSection)}
      <NextPageLink
        nextSection={resolvedNextSection}
        nextTitle={resolvedNextTitle}
        nextHref={nextHref}
        color="primary"
      />
    </>
  );
}

function getContent(subSection: CoreSubSection) {
  const noop = () => {};
  const nav = { nextSection: null, nextTitle: null, onNavigate: noop };

  switch (subSection) {
    case 'classes':
      return <ClassesSection {...nav} />;
    case 'methods':
      return <MethodsSection {...nav} />;
    case 'properties':
      return <PropertiesSection {...nav} />;
    case 'types':
      return <TypesSection {...nav} />;
    case 'form-fields':
      return <FormFieldsSection {...nav} />;
    case 'theming-localization':
      return <ThemingLocalizationSection {...nav} />;
    case 'utilities':
      return <UtilitiesSection {...nav} />;
    default:
      return (
        <DocsNotFound backHref="/docs/get-started" />
      );
  }
}
