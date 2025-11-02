'use client';

import type { Section } from '../types';

interface SidebarProps {
  activeSection: Section;
  activeSubSection: string;
  onSectionChange: (section: Section) => void;
  onSubSectionChange: (sub: string) => void;
  isOpen: boolean;
}

export default function Sidebar({
  activeSection,
  activeSubSection,
  onSectionChange,
  onSubSectionChange,
  isOpen
}: SidebarProps) {
  return (
    <aside className={`fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 overflow-y-auto z-40 transition-transform ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0`}>
      <div className="p-4 pb-20">
        {/* Section Tabs */}
        <div className="flex flex-col gap-2 mb-6">
          <SectionButton
            active={activeSection === 'core'}
            onClick={() => onSectionChange('core')}
            color="primary"
          >
            Core API
          </SectionButton>
          <SectionButton
            active={activeSection === 'vue3'}
            onClick={() => onSectionChange('vue3')}
            color="purple"
          >
            Vue3
          </SectionButton>
          <SectionButton
            active={activeSection === 'react'}
            onClick={() => onSectionChange('react')}
            color="blue"
          >
            React
          </SectionButton>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {activeSection === 'core' && (
            <>
              <NavLink active={activeSubSection === 'getting-started'} onClick={() => onSubSectionChange('getting-started')} color="primary">Быстрый старт</NavLink>
              <NavLink active={activeSubSection === 'classes'} onClick={() => onSubSectionChange('classes')} color="primary">Классы</NavLink>
              <NavLink active={activeSubSection === 'methods'} onClick={() => onSubSectionChange('methods')} color="primary">Методы</NavLink>
              <NavLink active={activeSubSection === 'properties'} onClick={() => onSubSectionChange('properties')} color="primary">Свойства</NavLink>
              <NavLink active={activeSubSection === 'types'} onClick={() => onSubSectionChange('types')} color="primary">Типы</NavLink>
              <NavLink active={activeSubSection === 'form-fields'} onClick={() => onSubSectionChange('form-fields')} color="primary">Поля форм</NavLink>
            </>
          )}
          
          {activeSection === 'vue3' && (
            <>
              <NavLink active={activeSubSection === 'getting-started'} onClick={() => onSubSectionChange('getting-started')} color="purple">Быстрый старт</NavLink>
              <NavLink active={activeSubSection === 'components'} onClick={() => onSubSectionChange('components')} color="purple">Компоненты</NavLink>
              <NavLink active={activeSubSection === 'events'} onClick={() => onSubSectionChange('events')} color="purple">События</NavLink>
              <NavLink active={activeSubSection === 'api'} onClick={() => onSubSectionChange('api')} color="purple">API</NavLink>
            </>
          )}

          {activeSection === 'react' && (
            <NavLink active={activeSubSection === 'getting-started'} onClick={() => onSubSectionChange('getting-started')} color="blue">React поддержка</NavLink>
          )}
        </nav>
      </div>
    </aside>
  );
}

function SectionButton({ 
  active, 
  onClick, 
  color,
  children 
}: { 
  active: boolean; 
  onClick: () => void; 
  color: 'primary' | 'purple' | 'blue';
  children: React.ReactNode;
}) {
  const colorClasses = {
    primary: active ? 'bg-primary-600 text-white' : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600',
    purple: active ? 'bg-purple-600 text-white' : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600',
    blue: active ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600',
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-lg font-semibold text-left transition-colors ${colorClasses[color]}`}
    >
      {children}
    </button>
  );
}

function NavLink({ 
  active, 
  onClick, 
  color,
  children 
}: { 
  active: boolean; 
  onClick: () => void; 
  color: 'primary' | 'purple' | 'blue';
  children: React.ReactNode;
}) {
  const colorClasses = {
    primary: active ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 border-primary-500' : 'hover:bg-gray-100 dark:hover:bg-slate-700',
    purple: active ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-500' : 'hover:bg-gray-100 dark:hover:bg-slate-700',
    blue: active ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-500' : 'hover:bg-gray-100 dark:hover:bg-slate-700',
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full px-4 py-2 rounded-lg text-left text-sm font-medium transition-colors border-l-4 ${
        active ? colorClasses[color] : 'text-gray-600 dark:text-gray-400 border-transparent'
      }`}
    >
      {children}
    </button>
  );
}

