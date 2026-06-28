'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface DocsNotFoundProps {
  backHref: string;
  backClassName?: string;
  section?: string;
}

export default function DocsNotFound({
  backHref,
  backClassName = 'px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 inline-block',
  section,
}: DocsNotFoundProps) {
  const t = useTranslations('docs.common');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('notFound')}</h1>
        {section ? (
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{t('sectionNotFound', { section })}</p>
        ) : null}
        <Link href={backHref} className={backClassName}>
          {backHref.includes('/react')
            ? t('backToReactDocs')
            : section
              ? t('backToStart')
              : t('backToDocs')}
        </Link>
      </div>
    </div>
  );
}
