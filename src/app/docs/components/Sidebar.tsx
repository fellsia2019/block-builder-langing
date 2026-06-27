'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DOCS_SIDEBAR, isDocsSidebarActive } from '../nav';

interface SidebarProps {
  isOpen: boolean;
  onLinkClick?: () => void;
}

export default function Sidebar({ isOpen, onLinkClick }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 overflow-y-auto z-40 transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <div className="p-4 pb-20 space-y-6">
        {DOCS_SIDEBAR.map((group) => (
          <div key={group.title}>
            <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-100">
              {group.title}
            </p>
            <nav className="space-y-0.5">
              {group.items.map((item) => {
                const active = isDocsSidebarActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onLinkClick}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors border-l-2 ${
                      active
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 font-medium'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700/60 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    {item.title}
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
