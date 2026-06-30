'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { DOCS_SIDEBAR, isDocsSidebarActive } from '../nav';

interface SidebarProps {
  isOpen: boolean;
  onLinkClick?: () => void;
}

function scrollActiveLinkIntoView(container: HTMLElement, link: HTMLElement) {
  const linkTop = link.offsetTop;
  const linkBottom = linkTop + link.offsetHeight;
  const { scrollTop, clientHeight } = container;

  if (linkTop < scrollTop) {
    container.scrollTop = linkTop;
  } else if (linkBottom > scrollTop + clientHeight) {
    container.scrollTop = linkBottom - clientHeight;
  }
}

export default function Sidebar({ isOpen, onLinkClick }: SidebarProps) {
  const t = useTranslations('docs');
  const pathname = usePathname();
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const aside = asideRef.current;
    if (!aside) return;

    const scroll = () => {
      const link = aside.querySelector<HTMLElement>('[data-sidebar-active="true"]');
      if (link) scrollActiveLinkIntoView(aside, link);
    };

    scroll();
    requestAnimationFrame(scroll);
  }, [pathname, isOpen]);

  return (
    <aside
      ref={asideRef}
      className={`docs-search-scroll fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 overflow-y-auto z-40 transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <div className="p-4 pb-20 space-y-6">
        {DOCS_SIDEBAR.map((group) => (
          <div key={group.titleKey}>
            <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-100">
              {t(group.titleKey)}
            </p>
            <nav className="space-y-0.5">
              {group.items.map((item) => {
                const active = isDocsSidebarActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onLinkClick}
                    data-sidebar-active={active ? 'true' : undefined}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors border-l-2 ${
                      active
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 font-medium'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700/60 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    {t(item.titleKey)}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
