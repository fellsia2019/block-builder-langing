'use client';

import { useParams } from 'next/navigation';
import { useCoreNavigation } from '../../hooks/useNavigation';
import type { CoreSubSection } from '../../types';
import {
  ClassesSection,
  MethodsSection,
  PropertiesSection,
  TypesSection,
  UtilitiesSection,
} from '../../sections/core';
import FormFieldsSection from '../../sections/core/FormFieldsSection';
import NextPageLink from '../../components/NextPageLink';
import Link from 'next/link';

export default function CoreSectionPage() {
  const params = useParams();
  const section = params.section as string;
  const subSection = section as CoreSubSection;
  const { nextSection, nextTitle } = useCoreNavigation(subSection);

  const getNextHref = (next: string | null) => (next ? `/docs/core/${next}` : null);

  return (
    <>
      {getContent(subSection)}
      <NextPageLink
        nextSection={nextSection}
        nextTitle={nextTitle}
        nextHref={getNextHref(nextSection)}
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
    case 'utilities':
      return <UtilitiesSection {...nav} />;
    default:
      return (
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Страница не найдена</h1>
          <Link
            href="/docs/get-started"
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 inline-block"
          >
            К документации
          </Link>
        </div>
      );
  }
}
