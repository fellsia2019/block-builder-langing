'use client';

import { useTranslations } from 'next-intl';
import AnimateOnScroll from './AnimateOnScroll';
import Icon from './Icon';
import { GITHUB_EXAMPLES } from '@/lib/urls';

const featureKeys = [
  'cleanArchitecture',
  'solid',
  'ui',
  'ssr',
  'plugins',
  'autoUi',
] as const;

const iconNames = {
  cleanArchitecture: 'building',
  solid: 'target',
  ui: 'paintbrush',
  ssr: 'zap',
  plugins: 'plugin',
  autoUi: 'theater',
} as const;

const animations = ['FADE_IN_UP', 'FADE_IN_LEFT', 'FADE_IN_RIGHT', 'ZOOM_IN', 'SCALE_UP'] as const;

export default function Features() {
  const t = useTranslations('features');

  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animationName="FADE_IN_DOWN" animationDelay={100}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              {t('title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t('subtitle')}</p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureKeys.map((key, index) => (
            <AnimateOnScroll
              key={key}
              animationName={animations[index % animations.length]}
              animationDelay={index * 100}
              animationTime={600}
              className="h-full"
              innerClassName="h-full"
            >
              <div className="h-full p-6 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-slate-700">
                <div className="mb-4 transform hover:scale-110 transition-transform duration-300">
                  <Icon
                    name={iconNames[key]}
                    size={48}
                    className="text-primary-600 dark:text-primary-400"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {key === 'ssr'
                    ? t.rich(`items.${key}.description`, {
                        link: (chunks) => (
                          <a
                            href={GITHUB_EXAMPLES}
                            className="text-primary-600 dark:text-primary-400 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {chunks}
                          </a>
                        ),
                      })
                    : t(`items.${key}.description`)}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
