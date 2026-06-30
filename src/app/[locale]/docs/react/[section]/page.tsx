'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useReactNavigation } from '../../hooks/useNavigation';
import type { ReactSubSection } from '../../types';
import DocsSectionFallback from '../../components/DocsSectionFallback';
import NextPageLink from '../../components/NextPageLink';
import DocsNotFound from '../../components/DocsNotFound';

const GettingStartedReact = dynamic(() => import('../../sections/react/GettingStartedReact'), {
  loading: () => <DocsSectionFallback />,
});
const ReactComponentsSection = dynamic(() => import('../../sections/react/ComponentsSection'), {
  loading: () => <DocsSectionFallback />,
});
const ReactEventsSection = dynamic(() => import('../../sections/react/EventsSection'), {
  loading: () => <DocsSectionFallback />,
});

export default function ReactSectionPage() {
  const params = useParams();
  const tSidebar = useTranslations('docs.sidebar');
  const section = params.section as string;
  const subSection = section as ReactSubSection;
  const { nextSection, nextTitle } = useReactNavigation(subSection);

  const nextHref =
    subSection === 'events' ? '/docs/next' : nextSection ? `/docs/react/${nextSection}` : null;
  const resolvedNextTitle = subSection === 'events' ? tSidebar('next') : nextTitle;
  const resolvedNextSection = subSection === 'events' ? 'next' : nextSection;

  return (
    <>
      {getContent(subSection)}
      <NextPageLink
        nextSection={resolvedNextSection}
        nextTitle={resolvedNextTitle}
        nextHref={nextHref}
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
    case 'events':
      return <ReactEventsSection nextSection={null} nextTitle={null} onNavigate={() => {}} />;
    default:
      return <DocsNotFound backHref="/docs/react/getting-started" backClassName="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block" />;
  }
}
