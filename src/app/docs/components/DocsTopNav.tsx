'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import { DOCS_TOP_NAV, DOCS_SIDEBAR, isDocsTopNavActive } from '../nav';
import { DOCS_HEADER_ID } from './docsScrollOffset';
import DocsSearch from './DocsSearch';

function getBreadcrumbs(pathname: string): { label: string; href: string }[] {
  if (!pathname.startsWith('/docs')) return [];

  const docRoot = { label: 'Документация', href: '/docs/get-started' };

  for (const group of DOCS_SIDEBAR) {
    for (const item of group.items) {
      if (pathname === item.href || pathname.startsWith(`${item.href}/`)) {
        if (item.href === docRoot.href) {
          return [{ label: item.title, href: item.href }];
        }
        return [docRoot, { label: item.title, href: item.href }];
      }
    }
  }

  if (pathname.startsWith('/docs/core/')) {
    return [docRoot, { label: 'Справочник API', href: '/docs/core/classes' }];
  }

  return [docRoot];
}

export default function DocsTopNav() {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header
      id={DOCS_HEADER_ID}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-700"
    >
      <div className="h-16 max-w-[1600px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <Link href="/" className="flex items-center shrink-0 hover:opacity-80 transition-opacity">
            <Logo size={28} />
          </Link>
          <span className="hidden sm:inline text-gray-300 dark:text-slate-600">/</span>
          <nav className="hidden sm:flex items-center gap-1 min-w-0 text-sm truncate">
            {breadcrumbs.map((crumb, i) => (
              <span key={`${crumb.href}-${crumb.label}`} className="flex items-center gap-1 min-w-0">
                {i > 0 && <span className="text-gray-300 dark:text-slate-600">/</span>}
                <Link
                  href={crumb.href}
                  className={`truncate ${
                    i === breadcrumbs.length - 1
                      ? 'text-gray-900 dark:text-white font-medium'
                      : 'text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <DocsSearch />
          <nav className="hidden lg:flex items-center gap-1">
            {DOCS_TOP_NAV.map((item) => {
              const isExternal = item.href.startsWith('http');
              const active = !isExternal && isDocsTopNavActive(pathname, item.href);
              const className = `px-2 py-1.5 text-sm whitespace-nowrap rounded-md transition-colors ${
                active
                  ? 'text-primary-700 dark:text-primary-400 font-semibold bg-primary-50 dark:bg-primary-900/20'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`;

              if (isExternal) {
                return (
                  <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
                    {item.title}
                  </a>
                );
              }
              return (
                <Link key={item.href} href={item.href} className={className}>
                  {item.title}
                </Link>
              );
            })}
          </nav>
          <a
            href="https://github.com/mushket-co/block-builder"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors whitespace-nowrap"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
