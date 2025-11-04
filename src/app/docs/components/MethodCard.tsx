'use client';

import ProBadge from './ProBadge';

interface MethodCardProps {
  name: string;
  signature: string;
  description: string;
  color?: 'blue' | 'purple' | 'orange' | 'green';
  isPro?: boolean;
}

export default function MethodCard({ 
  name, 
  signature, 
  description, 
  color = 'blue',
  isPro = false
}: MethodCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
    orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  };

  const proBorderClass = isPro ? 'border-2 border-yellow-400' : '';

  return (
    <div className={`rounded-lg p-4 border ${colorClasses[color]} ${proBorderClass} relative`}>
      {isPro && (
        <div className="absolute top-2 right-2">
          <ProBadge />
        </div>
      )}
      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white flex items-center gap-2">
        <code className="text-gray-900 dark:text-white">{name}</code>
      </h3>
      <div className="bg-white dark:bg-slate-800 rounded p-3 mb-2 overflow-x-auto">
        <code className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">{signature}</code>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

