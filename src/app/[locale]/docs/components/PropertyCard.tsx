'use client';

import type { ReactNode } from 'react';

interface PropertyCardProps {
  name: string;
  type: ReactNode;
  description: ReactNode;
  seeAlso?: ReactNode;
  defaultValue?: string;
  required?: boolean;
  requiredLabel?: string;
  anchorId?: string;
  color?: 'blue' | 'indigo';
}

export default function PropertyCard({
  name,
  type,
  description,
  seeAlso,
  defaultValue,
  required,
  requiredLabel = 'required',
  anchorId,
  color = 'indigo',
}: PropertyCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800',
  };

  return (
    <div id={anchorId ?? name} className={`rounded-lg p-4 border ${colorClasses[color]}`}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
        <code className="font-bold text-lg text-gray-900 dark:text-white">{name}</code>
        {required && (
          <span className="text-xs font-medium text-red-600 dark:text-red-400">{requiredLabel}</span>
        )}
        {defaultValue && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            default: <code className="text-gray-700 dark:text-gray-300">{defaultValue}</code>
          </span>
        )}
      </div>
      <div className="bg-white dark:bg-slate-800 rounded p-2 mb-2 overflow-x-auto text-sm font-mono text-gray-900 dark:text-gray-100">
        {type}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
        <p>{description}</p>
        {seeAlso ? (
          <p className="text-xs text-gray-500 dark:text-gray-500">{seeAlso}</p>
        ) : null}
      </div>
    </div>
  );
}
