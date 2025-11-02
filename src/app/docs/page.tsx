'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Sidebar from './components/Sidebar';
import { useCoreNavigation, useVue3Navigation } from './hooks/useNavigation';
import type { Section, CoreSubSection, Vue3SubSection } from './types';

// Core Sections
import {
  GettingStartedCore,
  ClassesSection,
  MethodsSection,
  PropertiesSection,
  TypesSection
} from './sections/core';
import FormFieldsSection from './sections/core/FormFieldsSection';

// Vue3 Sections - пока используем заглушки из старого кода, потом вынесем
import GettingStartedVue3 from './sections/vue3/GettingStartedVue3';
import ComponentsSection from './sections/vue3/ComponentsSection';
import EventsSection from './sections/vue3/EventsSection';
import Vue3ApiSection from './sections/vue3/Vue3ApiSection';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<Section>('core');
  const [activeSubSection, setActiveSubSection] = useState<string>('getting-started');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setActiveSubSection('getting-started');
  }, [activeSection]);

  // Auto-open sidebar on desktop
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    setIsSidebarOpen(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsSidebarOpen(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />
      
      <div className="relative flex pt-16">
        <Sidebar
          activeSection={activeSection}
          activeSubSection={activeSubSection}
          onSectionChange={setActiveSection}
          onSubSectionChange={setActiveSubSection}
          isOpen={isSidebarOpen}
        />

        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`fixed ${isSidebarOpen ? 'left-64' : 'left-0'} top-20 z-50 p-2 bg-slate-100 dark:bg-slate-800 border-r border-b border-gray-200 dark:border-slate-700 rounded-r-lg transition-all md:hidden`}
        >
          {isSidebarOpen ? '◀' : '▶'}
        </button>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 transition-all md:ml-64 min-h-[calc(100vh-4rem)]">
          <div className="max-w-4xl mx-auto px-6 py-12 pb-24">
            <Content 
              section={activeSection} 
              subSection={activeSubSection}
              onNavigate={setActiveSubSection}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Content({ section, subSection, onNavigate }: { 
  section: Section; 
  subSection: string; 
  onNavigate: (sub: string) => void;
}) {
  if (section === 'core') {
    return <CoreContent subSection={subSection as CoreSubSection} onNavigate={onNavigate} />;
  }
  if (section === 'vue3') {
    return <Vue3Content subSection={subSection as Vue3SubSection} onNavigate={onNavigate} />;
  }
  return <ReactPlaceholder />;
}

function CoreContent({ subSection, onNavigate }: { 
  subSection: CoreSubSection; 
  onNavigate: (sub: string) => void;
}) {
  const { nextSection, nextTitle } = useCoreNavigation(subSection);

  switch (subSection) {
    case 'getting-started':
      return <GettingStartedCore nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} />;
    case 'classes':
      return <ClassesSection nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} />;
    case 'methods':
      return <MethodsSection nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} />;
    case 'properties':
      return <PropertiesSection nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} />;
    case 'types':
      return <TypesSection nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} />;
    case 'form-fields':
      return <FormFieldsSection nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} />;
    default:
      return <GettingStartedCore nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} />;
  }
}

function Vue3Content({ subSection, onNavigate }: { 
  subSection: Vue3SubSection; 
  onNavigate: (sub: string) => void;
}) {
  const { nextSection, nextTitle } = useVue3Navigation(subSection);

  switch (subSection) {
    case 'getting-started':
      return <GettingStartedVue3 nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} />;
    case 'components':
      return <ComponentsSection nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} />;
    case 'events':
      return <EventsSection nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} />;
    case 'api':
      return <Vue3ApiSection nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} />;
    default:
      return <GettingStartedVue3 nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} />;
  }
}

function ReactPlaceholder() {
  return (
    <div className="space-y-8">
      <section>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
          <div className="text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              React поддержка в разработке
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              Поддержка React компонентов находится в активной разработке и будет доступна в ближайших версиях.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
