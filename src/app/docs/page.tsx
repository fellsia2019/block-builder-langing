'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function DocsPage() {

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Документация BlockBuilder
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Выберите раздел документации для начала работы
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DocCard
            title="Core API"
            description="Основной API для работы с блоками и формами"
            href="/docs/core/getting-started"
            color="primary"
          />
          <DocCard
            title="Vue3"
            description="Интеграция с Vue3 и готовые компоненты"
            href="/docs/vue/getting-started"
            color="purple"
          />
          <DocCard
            title="React"
            description="React 18/19, BlockBuilderComponent"
            href="/docs/react"
            color="blue"
          />
          <DocCard
            title="Nuxt"
            description="SSR с Nuxt 3/4, useAsyncData, Nitro API"
            href="/docs/nuxt"
            color="green"
          />
          <DocCard
            title="Next.js"
            description="SSR с App Router, Server + Client Components"
            href="/docs/next"
            color="slate"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

function DocCard({ 
  title, 
  description, 
  href, 
  color 
}: { 
  title: string; 
  description: string; 
  href: string;
  color: 'primary' | 'purple' | 'blue' | 'green' | 'slate';
}) {
  const colorClasses = {
    primary: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/30',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30',
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30',
    slate: 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800',
  };

  const textColorClasses = {
    primary: 'text-primary-700 dark:text-primary-400',
    purple: 'text-purple-700 dark:text-purple-400',
    blue: 'text-blue-700 dark:text-blue-400',
    green: 'text-green-700 dark:text-green-400',
    slate: 'text-slate-700 dark:text-slate-300',
  };

  return (
    <Link
      href={href}
      className={`p-6 rounded-xl border-2 transition-all ${colorClasses[color]} block`}
    >
      <h2 className={`text-2xl font-bold mb-2 ${textColorClasses[color]}`}>
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </Link>
  );
}
