'use client';

import { useState } from 'react';
import AnimateOnScroll from './AnimateOnScroll';
import Icon from './Icon';
import FeedbackModal from './FeedbackModal';

export default function Installation() {
  const [copied, setCopied] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install @mushket-co/block-builder');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="installation" className="py-20 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animationName="FADE_IN_DOWN" animationDelay={100}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Начните прямо сейчас
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Установка и настройка займет всего несколько минут
            </p>
          </div>
        </AnimateOnScroll>

        <div className="max-w-4xl mx-auto space-y-8">
          <AnimateOnScroll animationName="SCALE_UP" animationDelay={200}>
            {/* Installation command */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow">
            <div className="bg-gradient-to-r from-primary-600 to-purple-600 px-6 py-4">
              <h3 className="text-xl font-semibold text-white">Установка</h3>
            </div>
            <div className="p-6">
              <div className="relative flex flex-col sm:flex-row sm:items-center bg-slate-900 rounded-lg px-6 py-4 gap-3 sm:gap-0">
                <code className="flex-1 text-gray-100 font-mono break-all">
                  npm install @mushket-co/block-builder
                </code>
                <button
                  onClick={handleCopy}
                  className="sm:ml-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
                >
                  {copied ? (
                    <>
                      <span>✓</span>
                      <span>Скопировано</span>
                    </>
                  ) : (
                    <>
                      <Icon name="clipboard" size={16} />
                      <span>Копировать</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          </AnimateOnScroll>

          {/* Quick Start Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimateOnScroll animationName="FADE_IN_LEFT" animationDelay={400}>
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Установите пакет
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Используйте npm или yarn для установки библиотеки
              </p>
            </div>
            </AnimateOnScroll>

            <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={500}>
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  Настройте блоки
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Создайте конфигурацию с типами блоков и их полями
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animationName="FADE_IN_RIGHT" animationDelay={600}>
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  Готово!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Начните создавать блоки с автоматическим UI
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={700}>
            {/* Resources */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white text-center">
              Полезные ресурсы
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/docs"
                className="flex items-center p-4 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg hover:shadow-md transition-shadow border border-primary-200 dark:border-primary-800"
              >
                <Icon name="book" size={32} className="mr-3 text-primary-600 dark:text-primary-400" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Документация</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Полное руководство по API</div>
                </div>
              </a>

              <a
                href="https://github.com/mushket-co/block-builder"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg hover:shadow-md transition-shadow border border-purple-200 dark:border-purple-800"
              >
                <Icon name="monitor" size={32} className="mr-3 text-purple-600 dark:text-purple-400" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">GitHub</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Исходный код и примеры</div>
                </div>
              </a>

              <a
                href="https://demo.deep-bb.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg hover:shadow-md transition-shadow border border-green-200 dark:border-green-800"
              >
                <Icon name="graduation" size={32} className="mr-3 text-green-600 dark:text-green-400" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Примеры</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Готовые решения</div>
                </div>
              </a>

              <button
                onClick={() => setIsFeedbackModalOpen(true)}
                className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg hover:shadow-md transition-shadow border border-orange-200 dark:border-orange-800 w-full text-left cursor-pointer"
              >
                <Icon name="message" size={32} className="mr-3 text-orange-600 dark:text-orange-400" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Поддержка</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Задайте вопрос</div>
                </div>
              </button>
            </div>
          </div>
          </AnimateOnScroll>
        </div>
      </div>

      <FeedbackModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
      />
    </section>
  );
}

