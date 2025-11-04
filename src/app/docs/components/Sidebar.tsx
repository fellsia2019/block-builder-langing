'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  activeSection: 'core' | 'vue' | 'react';
  activeSubSection: string;
  isOpen: boolean;
  onLinkClick?: () => void;
}

export default function Sidebar({
  activeSection,
  activeSubSection,
  isOpen,
  onLinkClick
}: SidebarProps) {
  const pathname = usePathname();
  
  // Определяем активную секцию из pathname
  const currentSection = pathname.startsWith('/docs/core') ? 'core' 
    : pathname.startsWith('/docs/vue') ? 'vue'
    : pathname.startsWith('/docs/react') ? 'react'
    : activeSection;
  
  // Определяем активный подраздел из pathname
  const pathParts = pathname.split('/');
  const currentSubSection = pathParts.length > 3 ? pathParts[3] : activeSubSection;

  return (
    <aside className={`fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 overflow-y-auto z-40 transition-transform ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0`}>
      <div className="p-4 pb-20">
        {/* Section Tabs */}
        <div className="flex flex-col gap-2 mb-6">
          <SectionLink
            active={currentSection === 'core'}
            href="/docs/core/getting-started"
            color="primary"
            onLinkClick={onLinkClick}
          >
            Core API
          </SectionLink>
          <SectionLink
            active={currentSection === 'vue'}
            href="/docs/vue/getting-started"
            color="purple"
            onLinkClick={onLinkClick}
          >
            Vue3
          </SectionLink>
          <SectionLink
            active={currentSection === 'react'}
            href="/docs/react"
            color="blue"
            onLinkClick={onLinkClick}
          >
            React
          </SectionLink>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {currentSection === 'core' && (
            <>
              <NavLink active={currentSubSection === 'getting-started'} href="/docs/core/getting-started" color="primary" onLinkClick={onLinkClick}>Быстрый старт</NavLink>
              <NavLink active={currentSubSection === 'classes'} href="/docs/core/classes" color="primary" onLinkClick={onLinkClick}>Классы</NavLink>
              <NavLink active={currentSubSection === 'methods'} href="/docs/core/methods" color="primary" onLinkClick={onLinkClick}>Методы</NavLink>
              <NavLink active={currentSubSection === 'properties'} href="/docs/core/properties" color="primary" onLinkClick={onLinkClick}>Свойства</NavLink>
              <NavLink active={currentSubSection === 'types'} href="/docs/core/types" color="primary" onLinkClick={onLinkClick}>Типы</NavLink>
              <NavLink active={currentSubSection === 'form-fields'} href="/docs/core/form-fields" color="primary" onLinkClick={onLinkClick}>Поля форм</NavLink>
            </>
          )}
          
          {currentSection === 'vue' && (
            <>
              <NavLink active={currentSubSection === 'getting-started'} href="/docs/vue/getting-started" color="purple" onLinkClick={onLinkClick}>Быстрый старт</NavLink>
              <NavLink active={currentSubSection === 'components'} href="/docs/vue/components" color="purple" onLinkClick={onLinkClick}>Компоненты</NavLink>
              <NavLink active={currentSubSection === 'events'} href="/docs/vue/events" color="purple" onLinkClick={onLinkClick}>События</NavLink>
              <NavLink active={currentSubSection === 'api'} href="/docs/vue/api" color="purple" onLinkClick={onLinkClick}>API</NavLink>
            </>
          )}

          {currentSection === 'react' && (
            <NavLink active={true} href="/docs/react" color="blue" onLinkClick={onLinkClick}>React поддержка</NavLink>
          )}
        </nav>
      </div>
    </aside>
  );
}

function SectionLink({ 
  active, 
  href,
  color,
  children,
  onLinkClick
}: { 
  active: boolean; 
  href: string; 
  color: 'primary' | 'purple' | 'blue';
  children: React.ReactNode;
  onLinkClick?: () => void;
}) {
  const colorClasses = {
    primary: active ? 'bg-primary-600 text-white' : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600',
    purple: active ? 'bg-purple-600 text-white' : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600',
    blue: active ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600',
  };

  return (
    <Link
      href={href}
      onClick={onLinkClick}
      className={`px-4 py-2 rounded-lg font-semibold text-left transition-colors block ${colorClasses[color]}`}
    >
      {children}
    </Link>
  );
}

function NavLink({ 
  active, 
  href,
  color,
  children,
  onLinkClick
}: { 
  active: boolean; 
  href: string; 
  color: 'primary' | 'purple' | 'blue';
  children: React.ReactNode;
  onLinkClick?: () => void;
}) {
  const colorClasses = {
    primary: active ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 border-primary-500' : 'hover:bg-gray-100 dark:hover:bg-slate-700',
    purple: active ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-500' : 'hover:bg-gray-100 dark:hover:bg-slate-700',
    blue: active ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-500' : 'hover:bg-gray-100 dark:hover:bg-slate-700',
  };

  return (
    <Link
      href={href}
      onClick={onLinkClick}
      className={`w-full px-4 py-2 rounded-lg text-left text-sm font-medium transition-colors border-l-4 block ${
        active ? colorClasses[color] : 'text-gray-600 dark:text-gray-400 border-transparent'
      }`}
    >
      {children}
    </Link>
  );
}

