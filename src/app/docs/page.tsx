'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function DocsPage() {
  const router = useRouter();

  useEffect(() => {
    // Редирект на страницу Core по умолчанию
    router.replace('/docs/core/getting-started');
  }, [router]);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            description="Поддержка React (в разработке)"
            href="/docs/react"
            color="blue"
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
  color: 'primary' | 'purple' | 'blue';
}) {
  const colorClasses = {
    primary: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/30',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30',
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30',
  };

  const textColorClasses = {
    primary: 'text-primary-700 dark:text-primary-400',
    purple: 'text-purple-700 dark:text-purple-400',
    blue: 'text-blue-700 dark:text-blue-400',
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
