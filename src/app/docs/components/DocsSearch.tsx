'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname, useRouter } from 'next/navigation';
import { searchDocs } from '../search-index';
import { scrollToDocHeading } from './docsScrollOffset';

function normalizeDocsPath(path: string): string {
  const withoutHash = path.split('#')[0] ?? path;
  return withoutHash.replace(/\/$/, '') || '/';
}

export default function DocsSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingSamePageScrollRef = useRef<string | null>(null);
  const scrollLockYRef = useRef(0);

  const trimmedQuery = query.trim();
  const results = trimmedQuery ? searchDocs(trimmedQuery) : [];

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
  }, []);

  const navigateToResult = useCallback(
    (href: string) => {
      const hashIdx = href.indexOf('#');
      if (hashIdx === -1) {
        pendingSamePageScrollRef.current = null;
        close();
        router.push(href);
        return;
      }

      const path = href.slice(0, hashIdx);
      const id = href.slice(hashIdx + 1);

      if (normalizeDocsPath(path) === normalizeDocsPath(pathname)) {
        const currentHash = window.location.hash.slice(1);
        if (currentHash !== id) {
          window.history.replaceState(null, '', `#${id}`);
        }
        pendingSamePageScrollRef.current = id;
        close();
        return;
      }

      pendingSamePageScrollRef.current = null;
      close();
      router.push(href, { scroll: false });
    },
    [close, pathname, router],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [close]);

  useEffect(() => {
    if (!open) return;

    scrollLockYRef.current = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollLockYRef.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.classList.add('scrollbar-is-locked');

    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));

    return () => {
      const lockedScrollY = scrollLockYRef.current;
      const pendingId = pendingSamePageScrollRef.current;
      pendingSamePageScrollRef.current = null;

      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.classList.remove('scrollbar-is-locked');

      window.scrollTo({ top: lockedScrollY, behavior: 'instant' });

      if (pendingId) {
        requestAnimationFrame(() => {
          scrollToDocHeading(pendingId, 'smooth', { highlight: true, forceHighlight: true });
        });
      }
    };
  }, [open]);

  const modal =
    open && mounted
      ? createPortal(
          <div className="fixed inset-0 z-[200] flex items-start justify-center p-4 sm:pt-[min(15vh,8rem)]">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={close}
              aria-hidden
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Поиск по документации"
              className="relative z-10 flex w-full max-w-xl flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-slate-600 dark:bg-slate-900"
            >
              <div className="flex shrink-0 items-center gap-3 border-b border-gray-200 px-4 dark:border-slate-700">
                <svg
                  className="h-5 w-5 shrink-0 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Поиск страниц и разделов…"
                  className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
                />
                <kbd className="hidden shrink-0 rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500 dark:bg-slate-800 dark:text-slate-400 sm:inline">
                  Esc
                </kbd>
              </div>

              <ul className="docs-search-scroll m-0 max-h-[min(24rem,50vh)] list-none overflow-y-auto p-2">
                {!trimmedQuery ? (
                  <li className="px-3 py-8 text-center text-sm text-gray-500 dark:text-slate-400">
                    Введите название страницы или раздела
                  </li>
                ) : results.length === 0 ? (
                  <li className="px-3 py-8 text-center text-sm text-gray-500 dark:text-slate-400">
                    Ничего не найдено
                  </li>
                ) : (
                  results.map((item) => (
                    <li key={`${item.href}|${item.title}|${item.group}`}>
                      <button
                        type="button"
                        onClick={() => navigateToResult(item.href)}
                        className="block w-full rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-gray-100 dark:hover:bg-slate-800"
                      >
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</div>
                        <div className="text-xs text-gray-500 dark:text-slate-400">{item.group}</div>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-lg border border-gray-200 bg-white/50 px-3 py-1.5 text-sm text-gray-500 hover:border-gray-300 dark:border-slate-600 dark:bg-slate-800/50 dark:text-gray-400 dark:hover:border-slate-500 sm:flex"
        aria-label="Поиск по документации"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span>Поиск</span>
        <kbd className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500 dark:bg-slate-700 dark:text-gray-400">
          ⌘K
        </kbd>
      </button>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white sm:hidden"
        aria-label="Поиск"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      {modal}
    </>
  );
}
