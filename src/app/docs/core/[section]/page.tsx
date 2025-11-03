'use client';

import { useParams } from 'next/navigation';
import DocsLayout from '../../components/DocsLayout';
import { useCoreNavigation } from '../../hooks/useNavigation';
import type { CoreSubSection } from '../../types';
import {
  GettingStartedCore,
  ClassesSection,
  MethodsSection,
  PropertiesSection,
  TypesSection
} from '../../sections/core';
import FormFieldsSection from '../../sections/core/FormFieldsSection';
import NextPageLink from '../../components/NextPageLink';
import Link from 'next/link';

export default function CoreSectionPage() {
  const params = useParams();
  const section = params.section as string;
  const subSection = section as CoreSubSection;
  const { nextSection, nextTitle } = useCoreNavigation(subSection);

  const getNextHref = (next: string | null) => {
    if (!next) return null;
    return `/docs/core/${next}`;
  };

  const handleNavigate = (next: string) => {
    window.location.href = `/docs/core/${next}`;
  };

  return (
    <DocsLayout 
      activeSection="core" 
      activeSubSection={subSection}
    >
      {getContent(subSection, nextSection, nextTitle, handleNavigate)}
      <NextPageLink
        nextSection={nextSection}
        nextTitle={nextTitle}
        nextHref={getNextHref(nextSection)}
        color="primary"
      />
    </DocsLayout>
  );
}

function getContent(
  subSection: CoreSubSection,
  nextSection: string | null,
  nextTitle: string | null,
  onNavigate: (sub: string) => void
) {
  switch (subSection) {
    case 'getting-started':
      return <GettingStartedCore nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} />;
    case 'classes':
      return <ClassesSection nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} />;
    case 'methods':
      return <MethodsSection nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} />;
    case 'properties':
      return <PropertiesSection nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} />;
    case 'types':
      return <TypesSection nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} />;
    case 'form-fields':
      return <FormFieldsSection nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} />;
    default:
      return (
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Страница не найдена</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              Раздел "{subSection}" не найден.
            </p>
            <Link 
              href="/docs/core/getting-started"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors inline-block"
            >
              Вернуться к началу
            </Link>
          </div>
        </div>
      );
  }
}

