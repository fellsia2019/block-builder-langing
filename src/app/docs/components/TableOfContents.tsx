'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { getDocsScrollOffset } from './docsScrollOffset';
import { useScrollSpy } from './useScrollSpy';

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  items: TocItem[];
  anchorRef: RefObject<HTMLElement | null>;
}

export default function TableOfContents({ items, anchorRef }: TableOfContentsProps) {
  const ids = items.map((item) => item.id);
  const activeId = useScrollSpy(ids);
  const navRef = useRef<HTMLElement>(null);
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const sync = () => {
      setLeft(anchor.getBoundingClientRect().left);
    };

    sync();
    window.addEventListener('resize', sync, { passive: true });
    window.addEventListener('scroll', sync, { passive: true });

    const observer = new ResizeObserver(sync);
    observer.observe(anchor);

    return () => {
      window.removeEventListener('resize', sync);
      window.removeEventListener('scroll', sync);
      observer.disconnect();
    };
  }, [anchorRef, items.length]);

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

  if (items.length === 0 || left === null) return null;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - getDocsScrollOffset();
    window.scrollTo({ top, behavior: 'smooth' });
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <nav
      ref={navRef}
      aria-label="На этой странице"
      className="docs-search-scroll hidden xl:block fixed z-30 w-52 overflow-y-auto"
      style={{
        top: 'var(--docs-scroll-offset, 5rem)',
        left,
        maxHeight: 'calc(100vh - var(--docs-scroll-offset, 5rem) - 1.5rem)',
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
        На этой странице
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
