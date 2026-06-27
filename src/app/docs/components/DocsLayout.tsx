'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import DocsTopNav from './DocsTopNav';
import Sidebar from './Sidebar';
import TableOfContents from './TableOfContents';
import { useAutoToc } from './useAutoToc';
import { getDocsScrollOffset } from './docsScrollOffset';

interface DocsLayoutProps {
  children: ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const toc = useAutoToc(contentRef, pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    setIsSidebarOpen(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsSidebarOpen(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const syncOffset = () => {
      document.documentElement.style.setProperty(
        '--docs-scroll-offset',
        `${getDocsScrollOffset()}px`
      );
    };

    syncOffset();
    window.addEventListener('resize', syncOffset, { passive: true });
    return () => window.removeEventListener('resize', syncOffset);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 overflow-x-hidden">
      <DocsTopNav />

      <div className="relative flex pt-16 overflow-x-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onLinkClick={() => {
            if (window.innerWidth < 768) {
              setIsSidebarOpen(false);
            }
          }}
        />

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`fixed ${isSidebarOpen ? 'left-64' : 'left-0'} top-20 z-50 p-3 bg-slate-100 dark:bg-slate-800 border-r border-b border-gray-200 dark:border-slate-700 rounded-r-lg transition-all md:hidden shadow-lg hover:bg-slate-200 dark:hover:bg-slate-700`}
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isSidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            )}
          </svg>
        </button>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className="flex-1 transition-all md:ml-64 min-h-[calc(100vh-4rem)] w-0 overflow-x-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-10 pt-8 pb-24">
            <div className={toc.length > 0 ? 'flex gap-8 xl:gap-12' : undefined}>
              <div
                ref={contentRef}
                className={`docs-content min-w-0 flex-1 max-w-4xl ${toc.length === 0 ? 'mx-auto' : ''}`}
              >
                {children}
              </div>
              {toc.length > 0 && (
                <aside className="hidden xl:block w-52 shrink-0">
                  <TableOfContents items={toc} />
                </aside>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
