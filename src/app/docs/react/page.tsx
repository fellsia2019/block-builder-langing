'use client';

import DocsLayout from '../components/DocsLayout';

export default function ReactPage() {
  return (
    <DocsLayout 
      activeSection="react" 
      activeSubSection="getting-started"
    >
      <div className="space-y-8">
        <section>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
            <div className="text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                React поддержка в разработке
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                Поддержка React компонентов находится в активной разработке и будет доступна в ближайших версиях.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Следите за обновлениями на <a href="https://github.com/mushket-co/block-builder" className="text-blue-600 dark:text-blue-400 hover:underline">GitHub</a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}

