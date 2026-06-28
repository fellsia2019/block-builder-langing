'use client';

import { useTranslations } from 'next-intl';
import AnimateOnScroll from './AnimateOnScroll';
import Icon from './Icon';

export default function Architecture() {
  const t = useTranslations('architecture');

  return (
    <section id="architecture" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animationName="FADE_IN_DOWN" animationDelay={100}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              {t('title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t('subtitle')}</p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <AnimateOnScroll animationName="FADE_IN_LEFT" animationDelay={200}>
              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-primary-600">
                <h3 className="text-xl font-semibold mb-3 text-primary-600 dark:text-primary-400 flex items-center gap-2">
                  <Icon name="target" size={20} />
                  {t('core.title')}
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• {t('core.entities')}</li>
                  <li>• {t('core.useCases')}</li>
                  <li>• {t('core.ports')}</li>
                  <li>• {t('core.dto')}</li>
                </ul>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animationName="FADE_IN_LEFT" animationDelay={400}>
              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-600">
                <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400 flex items-center gap-2">
                  <Icon name="settings" size={20} />
                  {t('infrastructure.title')}
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• {t('infrastructure.repositories')}</li>
                  <li>• {t('infrastructure.http')}</li>
                  <li>• {t('infrastructure.registries')}</li>
                </ul>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animationName="FADE_IN_LEFT" animationDelay={600}>
              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-pink-600">
                <h3 className="text-xl font-semibold mb-3 text-pink-600 dark:text-pink-400 flex items-center gap-2">
                  <Icon name="paintbrush" size={20} />
                  {t('ui.title')}
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• {t('ui.components')}</li>
                  <li>• {t('ui.controllers')}</li>
                  <li>• {t('ui.services')}</li>
                </ul>
              </div>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll
            animationName="FADE_IN_RIGHT"
            animationDelay={300}
            parallaxEnabled={true}
            deltaPercent={0.05}
          >
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-shadow">
              <div className="space-y-4">
                <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">{t('diagram.title')}</div>

                <div className="flex items-center justify-center space-x-4">
                  <div className="flex-1 p-4 bg-pink-100 dark:bg-pink-900 rounded-lg text-center">
                    <div className="font-semibold text-pink-700 dark:text-pink-300">UI</div>
                    <div className="text-xs text-pink-600 dark:text-pink-400 mt-1">Controllers, Components</div>
                  </div>
                  <div className="text-2xl text-gray-400">→</div>
                  <div className="flex-1 p-4 bg-primary-100 dark:bg-primary-900 rounded-lg text-center">
                    <div className="font-semibold text-primary-700 dark:text-primary-300">Core</div>
                    <div className="text-xs text-primary-600 dark:text-primary-400 mt-1">Use Cases, Entities</div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <div className="flex-1 p-4 bg-purple-100 dark:bg-purple-900 rounded-lg text-center">
                    <div className="font-semibold text-purple-700 dark:text-purple-300">Infrastructure</div>
                    <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">Repositories, HTTP</div>
                  </div>
                  <div className="text-2xl text-gray-400">→</div>
                  <div className="flex-1 p-4 bg-primary-100 dark:bg-primary-900 rounded-lg text-center">
                    <div className="font-semibold text-primary-700 dark:text-primary-300">Ports</div>
                    <div className="text-xs text-primary-600 dark:text-primary-400 mt-1">Interfaces</div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border-2 border-green-200 dark:border-green-800">
                  <div className="text-center text-sm font-semibold text-green-700 dark:text-green-300 mb-2 flex items-center justify-center gap-2">
                    <Icon name="check" size={16} />
                    {t('diagram.benefits')}
                  </div>
                  <ul className="text-xs text-green-600 dark:text-green-400 space-y-1">
                    <li>• {t('diagram.benefit1')}</li>
                    <li>• {t('diagram.benefit2')}</li>
                    <li>• {t('diagram.benefit3')}</li>
                    <li>• {t('diagram.benefit4')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimateOnScroll animationName="ZOOM_IN" animationDelay={200}>
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              <div className="mb-2 transform hover:scale-110 transition-transform flex justify-center">
                <Icon name="flask" size={48} className="text-primary-600 dark:text-primary-400" />
              </div>
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-400">{t('stats.tests')}</div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animationName="ZOOM_IN" animationDelay={400}>
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              <div className="mb-2 transform hover:scale-110 transition-transform flex justify-center">
                <Icon name="package" size={48} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">TypeScript</div>
              <div className="text-gray-600 dark:text-gray-400">{t('stats.typescript')}</div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animationName="ZOOM_IN" animationDelay={600}>
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              <div className="mb-2 transform hover:scale-110 transition-transform flex justify-center">
                <Icon name="target" size={48} className="text-pink-600 dark:text-pink-400" />
              </div>
              <div className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-2">SOLID</div>
              <div className="text-gray-600 dark:text-gray-400">{t('stats.solid')}</div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
