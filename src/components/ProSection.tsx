'use client';

import { useState } from 'react';
import FeedbackModal from './FeedbackModal';
import Icon from './Icon';

export default function ProSection() {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  return (
    <>
      <section className="relative py-20 bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full filter blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full filter blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
            <Icon name="sparkles" size={20} className="text-yellow-300" />
            <span className="text-sm font-semibold">PRO версия</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Приобретите PRO версию
          </h2>

          <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto">
            Получите доступ ко всем возможностям BlockBuilder
          </p>

          <ul className="mb-10 text-left max-w-2xl mx-auto space-y-4">
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-lg">API Select поля для интеграции с внешними API</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-lg">Приоритетная поддержка</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-lg">Расширенные возможности кастомизации</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-lg">Обновления и новые функции</span>
            </li>
          </ul>

          <button
            onClick={() => setIsFeedbackModalOpen(true)}
            className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl text-lg"
          >
            Связаться с нами для покупки PRO
          </button>
        </div>
      </section>

      <FeedbackModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
      />
    </>
  );
}

