'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import FeedbackModal from './FeedbackModal';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  return (
    <footer className="bg-slate-900 text-gray-300 py-12 relative z-[100] border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <Logo size={36} />
              </Link>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Библиотека для создания блочных конструкторов с правильной чистой архитектурой. 
              Поддержка Vue3, Pure JavaScript и TypeScript из коробки.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/mushket-co/block-builder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://www.npmjs.com/package/@mushket-co/block-builder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="NPM"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Документация</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">
                  Документация
                </Link>
              </li>
              <li>
                <Link href="/docs/core/getting-started" className="text-gray-400 hover:text-white transition-colors">
                  Core API
                </Link>
              </li>
              <li>
                <Link href="/docs/vue/getting-started" className="text-gray-400 hover:text-white transition-colors">
                  Vue3
                </Link>
              </li>
              <li>
                <Link href="/docs/react" className="text-gray-400 hover:text-white transition-colors">
                  React
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setIsFeedbackModalOpen(true)}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Обратная связь
                </button>
              </li>
              <li>
                <a href="https://github.com/mushket-co/block-builder/issues" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  GitHub Issues
                </a>
              </li>
              <li>
                <a href="https://github.com/mushket-co/block-builder" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/@mushket-co/block-builder" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  NPM Package
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} BlockBuilder. Распространяется под лицензией MIT.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Лицензия
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Условия использования
            </a>
          </div>
        </div>
      </div>

      <FeedbackModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
      />
    </footer>
  );
}

