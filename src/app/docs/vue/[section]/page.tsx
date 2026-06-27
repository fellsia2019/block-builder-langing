'use client';

import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { useVue3Navigation } from '../../hooks/useNavigation';
import type { Vue3SubSection } from '../../types';
import DocsSectionFallback from '../../components/DocsSectionFallback';
import NextPageLink from '../../components/NextPageLink';
import Link from 'next/link';

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
  const section = params.section as string;
  const subSection = section as Vue3SubSection;
  const { nextSection, nextTitle } = useVue3Navigation(subSection);

  const getNextHref = (next: string | null) => {
    if (!next) return null;
    return `/docs/vue/${next}`;
  };

  return (
    <>
      {getContent(subSection, nextSection, nextTitle, (sub) => router.push(`/docs/vue/${sub}`))}
      <NextPageLink
        nextSection={nextSection}
        nextTitle={nextTitle}
        nextHref={getNextHref(nextSection)}
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
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Страница не найдена</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              Раздел &quot;{subSection}&quot; не найден.
            </p>
            <Link
              href="/docs/vue/getting-started"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-block"
            >
              Вернуться к началу
            </Link>
          </div>
        </div>
      );
  }
}
