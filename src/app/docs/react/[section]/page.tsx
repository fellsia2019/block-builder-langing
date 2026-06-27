'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useReactNavigation } from '../../hooks/useNavigation';
import type { ReactSubSection } from '../../types';
import DocsSectionFallback from '../../components/DocsSectionFallback';
import NextPageLink from '../../components/NextPageLink';
import Link from 'next/link';

const GettingStartedReact = dynamic(() => import('../../sections/react/GettingStartedReact'), {
  loading: () => <DocsSectionFallback />,
});
const ReactComponentsSection = dynamic(() => import('../../sections/react/ComponentsSection'), {
  loading: () => <DocsSectionFallback />,
});

export default function ReactSectionPage() {
  const params = useParams();
  const section = params.section as string;
  const subSection = section as ReactSubSection;
  const { nextSection, nextTitle } = useReactNavigation(subSection);

  const getNextHref = (next: string | null) => (next ? `/docs/react/${next}` : null);

  return (
    <>
      {getContent(subSection)}
      <NextPageLink
        nextSection={nextSection}
        nextTitle={nextTitle}
        nextHref={getNextHref(nextSection)}
        color="blue"
      />
    </>
  );
}

function getContent(subSection: ReactSubSection) {
  switch (subSection) {
    case 'getting-started':
      return <GettingStartedReact nextSection={null} nextTitle={null} onNavigate={() => {}} />;
    case 'components':
      return <ReactComponentsSection nextSection={null} nextTitle={null} onNavigate={() => {}} />;
    default:
      return (
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Страница не найдена</h1>
          <Link
            href="/docs/react/getting-started"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
          >
            К документации React
          </Link>
        </div>
      );
  }
}
