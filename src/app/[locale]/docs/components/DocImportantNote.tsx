'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Icon from '@/components/Icon';
import type { ReactNode } from 'react';

interface DocImportantNoteProps {
  children: ReactNode;
  detailHref?: string;
  detailLabel?: string;
  className?: string;
}

export default function DocImportantNote({
  children,
  detailHref,
  detailLabel,
  className = 'mt-4',
}: DocImportantNoteProps) {
  const t = useTranslations('docs.common');
  const label = detailLabel ?? t('learnMore');

  return (
    <div
      className={`bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 border-l-4 border-yellow-400 ${className}`}
    >
      <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
        <Icon name="warning" size={18} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
        <span>
          {children}
          {detailHref ? (
            <>
              {' '}
              <Link
                href={detailHref}
                className="text-primary-600 dark:text-primary-400 hover:underline underline-offset-2 font-medium"
              >
                {label} →
              </Link>
            </>
          ) : null}
        </span>
      </p>
    </div>
  );
}
