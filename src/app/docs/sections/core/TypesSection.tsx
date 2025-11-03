'use client';

import NextPageLink from '../../components/NextPageLink';
import CodeBlock from '@/components/CodeBlock';
import type { NavigationProps } from '../../types';

export default function TypesSection({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Типы</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          TypeScript типы и интерфейсы
        </p>
      </div>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">BlockBuilderOptions</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Опции для создания BlockBuilder</p>
        <CodeBlock
          code={`interface BlockBuilderOptions {
  containerId?: string
  blockConfigs: Record<string, BlockConfig>
  storage?: 'localStorage' | 'sessionStorage'
  autoRender?: boolean
  theme?: 'light' | 'dark'
  locale?: string
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">Block</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Представляет блок в системе</p>
        <CodeBlock
          code={`interface Block {
  id: string
  type: string
  props: Record<string, any>
  settings?: Record<string, any>
  visible?: boolean
  locked?: boolean
  metadata?: {
    createdAt: Date
    updatedAt: Date
  }
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <NextPageLink nextSection={nextSection} nextTitle={nextTitle} nextHref={nextSection ? `/docs/core/${nextSection}` : null} color="primary" />
    </div>
  );
}

