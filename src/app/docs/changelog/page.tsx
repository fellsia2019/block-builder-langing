import Link from 'next/link';

const RELEASES = [
  {
    version: '1.10.0',
    date: '2026-06-27',
    highlights: [
      'React UI: поддержка React 18 и 19',
      'Примеры examples/react18 и examples/react19',
      'Компонентные тесты React UI на обе major-версии',
    ],
  },
  {
    version: '1.9.0',
    date: '2026-06-25',
    highlights: [
      'Программный API и отдельные entry Vue/React UI',
      'Разделение кода тяжёлых элементов форм',
      'npm run size — отчёт initial vs async chunks',
    ],
  },
  {
    version: '1.8.0',
    date: '2026-06-21',
    highlights: [
      'formScope в кастомных полях',
      'optionsFrom для select',
      'file-import с merge/dedupeBy',
      'persist: false',
    ],
  },
  {
    version: '1.7.0',
    date: '2026-06-15',
    highlights: ['formHooks: onFormOpen, onBeforeSave'],
  },
  {
    version: '1.6.0',
    date: '2026-06-10',
    highlights: ['matrix-table — редактор таблицы в форме'],
  },
  {
    version: '1.5.0',
    date: '2026-05-28',
    highlights: [
      'block-anchor',
      'поля загрузки file/files',
      'множественный select (1.5.5)',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">История изменений</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Краткая история релизов. Полный список — в{' '}
          <a
            href="https://github.com/mushket-co/block-builder/blob/master/CHANGELOG.md"
            className="text-primary-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            CHANGELOG.md
          </a>{' '}
          репозитория.
        </p>
      </div>

      <div className="space-y-6">
        {RELEASES.map((release) => (
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
        Начать работу —{' '}
        <Link href="/docs/get-started" className="text-primary-600 hover:underline">
          Быстрый старт
        </Link>
        .
      </p>
    </div>
  );
}
