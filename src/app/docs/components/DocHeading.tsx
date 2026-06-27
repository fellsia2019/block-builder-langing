import { createElement, type ReactNode } from 'react';

type Level = 2 | 3;

interface DocHeadingProps {
  id: string;
  level?: Level;
  children: ReactNode;
  className?: string;
}

export default function DocHeading({ id, level = 2, children, className = '' }: DocHeadingProps) {
  const base =
    level === 2
      ? 'text-2xl font-bold mb-4 text-gray-900 dark:text-white'
      : 'text-xl font-bold mb-3 text-gray-900 dark:text-white';

  return createElement(
    `h${level}`,
    { id, className: `${base} ${className}`.trim() },
    children
  );
}
