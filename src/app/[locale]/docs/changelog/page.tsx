'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { docRichTags, renderDocRichString } from '../components/docRichTags';

type Release = {
  version: string;
  date: string;
  highlights: string[];
};

export default function ChangelogPage() {
  const t = useTranslations('docsPages.changelog');
  const releases = t.raw('releases') as Release[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {renderDocRichString(t.raw('subtitle') as string, {
            ...docRichTags,
            changelog: (chunks) => (
              <a
                href="https://github.com/mushket-co/block-builder/blob/master/CHANGELOG.md"
                className="text-primary-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>

      <div className="space-y-6">
        {releases.map((release) => (
          <section
            key={release.version}
            className="rounded-xl border border-gray-200 dark:border-slate-700 p-5 bg-white dark:bg-slate-800/30"
          >
            <div className="flex flex-wrap items-baseline gap-3 mb-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{release.version}</h2>
              <time className="text-sm text-gray-500 dark:text-gray-400">{release.date}</time>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
              {release.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        {renderDocRichString(t.raw('getStarted') as string, {
          link: (chunks) => (
            <Link href="/docs/get-started" className="text-primary-600 hover:underline">
              {chunks}
            </Link>
          ),
        })}
      </p>
    </div>
  );
}
