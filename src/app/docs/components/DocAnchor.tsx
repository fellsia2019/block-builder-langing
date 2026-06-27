'use client';

import type { MouseEvent, ReactNode } from 'react';
import { getDocsScrollOffset } from './docsScrollOffset';

interface DocAnchorProps {
  id: string;
  children: ReactNode;
}

export default function DocAnchor({ id, children }: DocAnchorProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - getDocsScrollOffset();
    window.scrollTo({ top, behavior: 'smooth' });
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <a
      href={`#${id}`}
      onClick={handleClick}
      className="text-primary-600 dark:text-primary-400 hover:underline underline-offset-2"
    >
      {children}
    </a>
  );
}
