'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { scrollToDocHeading } from './docsScrollOffset';
import { useScrollSpy } from './useScrollSpy';

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const t = useTranslations('docs.common');
  const ids = items.map((item) => item.id);
  const activeId = useScrollSpy(ids);
  const navRef = useRef<HTMLElement>(null);
  const canSyncHash = useRef(false);
  const initialHash = useRef('');

  useEffect(() => {
    initialHash.current = window.location.hash.slice(1);
    canSyncHash.current = false;

    const enable = () => {
      canSyncHash.current = true;
    };

    window.addEventListener('wheel', enable, { once: true, passive: true });
    window.addEventListener('touchstart', enable, { once: true, passive: true });
    window.addEventListener('keydown', enable, { once: true, passive: true });

    const timer = window.setTimeout(enable, 3000);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('wheel', enable);
      window.removeEventListener('touchstart', enable);
      window.removeEventListener('keydown', enable);
    };
  }, [ids.join('|')]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !activeId) return;
    const link = nav.querySelector<HTMLElement>(`[data-toc-id="${activeId}"]`);
    if (!link) return;

    const linkTop = link.offsetTop;
    const linkBottom = linkTop + link.offsetHeight;
    const { scrollTop, clientHeight } = nav;

    if (linkTop < scrollTop) {
      nav.scrollTop = linkTop;
    } else if (linkBottom > scrollTop + clientHeight) {
      nav.scrollTop = linkBottom - clientHeight;
    }
  }, [activeId]);

  useEffect(() => {
    if (!activeId || !canSyncHash.current) return;

    const initial = initialHash.current;
    if (initial) {
      const initialIdx = ids.indexOf(initial);
      const activeIdx = ids.indexOf(activeId);
      if (initialIdx !== -1 && activeIdx !== -1 && activeIdx < initialIdx) return;
    }

    const timer = window.setTimeout(() => {
      const currentHash = window.location.hash.slice(1);
      if (currentHash !== activeId) {
        history.replaceState(null, '', `#${activeId}`);
      }
      initialHash.current = '';
    }, 400);
    return () => window.clearTimeout(timer);
  }, [activeId, ids]);

  if (items.length === 0) return null;

  const scrollToHeading = (id: string) => {
    canSyncHash.current = true;
    if (!scrollToDocHeading(id)) return;
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <nav
      ref={navRef}
      aria-label={t('onThisPage')}
      className="docs-search-scroll hidden xl:block fixed z-30 w-52 overflow-y-auto right-6 bg-white dark:bg-slate-900"
      style={{
        top: 'var(--docs-scroll-offset, 80px)',
        maxHeight: 'calc(100vh - var(--docs-scroll-offset, 80px) - 1.5rem)',
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
        {t('onThisPage')}
      </p>
      <ul className="space-y-1 border-l border-gray-200 dark:border-slate-700">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              data-toc-id={item.id}
              onClick={(e) => {
                e.preventDefault();
                scrollToHeading(item.id);
              }}
              className={`block py-1 text-sm transition-colors border-l-2 -ml-px ${
                item.level === 3 ? 'pl-5' : 'pl-3'
              } ${
                activeId === item.id
                  ? 'border-primary-500 text-primary-700 dark:text-primary-400 font-medium'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
