'use client';

import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useVue3Navigation } from '../../hooks/useNavigation';
import type { Vue3SubSection } from '../../types';
import DocsSectionFallback from '../../components/DocsSectionFallback';
import NextPageLink from '../../components/NextPageLink';
import DocsNotFound from '../../components/DocsNotFound';

const GettingStartedVue3 = dynamic(() => import('../../sections/vue3/GettingStartedVue3'), {
  loading: () => <DocsSectionFallback />,
});
const ComponentsSection = dynamic(() => import('../../sections/vue3/ComponentsSection'), {
  loading: () => <DocsSectionFallback />,
});
const EventsSection = dynamic(() => import('../../sections/vue3/EventsSection'), {
  loading: () => <DocsSectionFallback />,
});

export default function VueSectionPage() {
  const params = useParams();
  const router = useRouter();
  const tSidebar = useTranslations('docs.sidebar');
  const section = params.section as string;
  const subSection = section as Vue3SubSection;
  const { nextSection, nextTitle } = useVue3Navigation(subSection);

  const nextHref =
    subSection === 'events' ? '/docs/nuxt' : nextSection ? `/docs/vue/${nextSection}` : null;
  const resolvedNextTitle = subSection === 'events' ? tSidebar('nuxt') : nextTitle;
  const resolvedNextSection = subSection === 'events' ? 'nuxt' : nextSection;

  return (
    <>
      {getContent(subSection, resolvedNextSection, resolvedNextTitle, (sub) => router.push(`/docs/vue/${sub}`))}
      <NextPageLink
        nextSection={resolvedNextSection}
        nextTitle={resolvedNextTitle}
        nextHref={nextHref}
        color="purple"
      />
    </>
  );
}

function getContent(
  subSection: Vue3SubSection,
  nextSection: string | null,
  nextTitle: string | null,
  handleNavigate: (sub: string) => void
) {
  switch (subSection) {
    case 'getting-started':
      return <GettingStartedVue3 nextSection={nextSection} nextTitle={nextTitle} onNavigate={handleNavigate} />;
    case 'components':
      return <ComponentsSection nextSection={nextSection} nextTitle={nextTitle} onNavigate={handleNavigate} />;
    case 'events':
      return <EventsSection nextSection={nextSection} nextTitle={nextTitle} onNavigate={handleNavigate} />;
    default:
      return (
        <DocsNotFound
          backHref="/docs/vue/getting-started"
          backClassName="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-block"
          section={subSection}
        />
      );
  }
}
