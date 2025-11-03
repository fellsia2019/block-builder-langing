'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Sidebar from './Sidebar';

interface DocsLayoutProps {
  activeSection: 'core' | 'vue' | 'react';
  activeSubSection: string;
  children: React.ReactNode;
}

export default function DocsLayout({ activeSection, activeSubSection, children }: DocsLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
            {children}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

