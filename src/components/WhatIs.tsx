'use client';

import { useTranslations } from 'next-intl';
import AnimateOnScroll from './AnimateOnScroll';
import Icon from './Icon';
import type { IconName } from './Icon';

const whatYouGetKeys = ['readyUi', 'blockConfig', 'coreApi', 'ssr'] as const;
const whatYouGetIcons: Record<(typeof whatYouGetKeys)[number], IconName> = {
  readyUi: 'paintbrush',
  blockConfig: 'layers',
  coreApi: 'package',
  ssr: 'globe',
};

const useCaseKeys = ['cms', 'landing', 'admin', 'marketing'] as const;
const useCaseIcons: Record<(typeof useCaseKeys)[number], IconName> = {
  cms: 'document',
  landing: 'home',
  admin: 'settings',
  marketing: 'rocket',
};

const stepKeys = ['1', '2', '3', '4'] as const;

export default function WhatIs() {
  const t = useTranslations('whatIs');

  return (
    <section id="what-is" className="py-20 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animationName="FADE_IN_DOWN" animationDelay={100}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              {t('title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {t('lead')}
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <AnimateOnScroll animationName="FADE_IN_LEFT" animationDelay={200} className="h-full" innerClassName="h-full">
            <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border border-red-100 dark:border-red-900/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                  <Icon name="warning" size={20} className="text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('problem.title')}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{t('problem.description')}</p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animationName="FADE_IN_RIGHT" animationDelay={300} className="h-full" innerClassName="h-full">
            <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-100 dark:border-green-900/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                  <Icon name="lightbulb" size={20} className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('solution.title')}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{t('solution.description')}</p>
            </div>
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={100}>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {t('whatYouGet.title')}
          </h3>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {whatYouGetKeys.map((key, index) => (
            <AnimateOnScroll
              key={key}
              animationName="SCALE_UP"
              animationDelay={index * 100}
              animationTime={600}
              className="h-full"
              innerClassName="h-full"
            >
              <div className="h-full p-6 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 text-center">
                <div className="mb-4 flex justify-center">
                  <Icon
                    name={whatYouGetIcons[key]}
                    size={40}
                    className="text-primary-600 dark:text-primary-400"
                  />
                </div>
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">{t(`whatYouGet.items.${key}.title`)}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t(`whatYouGet.items.${key}.description`)}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={100}>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {t('useCases.title')}
          </h3>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {useCaseKeys.map((key, index) => (
            <AnimateOnScroll
              key={key}
              animationName="FADE_IN_UP"
              animationDelay={index * 80}
              animationTime={600}
              className="h-full"
              innerClassName="h-full"
            >
              <div className="h-full p-5 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 flex gap-4">
                <Icon
                  name={useCaseIcons[key]}
                  size={28}
                  className="text-purple-600 dark:text-purple-400 shrink-0 mt-0.5"
                />
                <div>
                  <h4 className="font-semibold mb-1 text-gray-900 dark:text-white">{t(`useCases.items.${key}.title`)}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t(`useCases.items.${key}.description`)}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll animationName="FADE_IN_UP" animationDelay={100}>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            {t('howItWorks.title')}
          </h3>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stepKeys.map((key, index) => (
            <AnimateOnScroll
              key={key}
              animationName="FADE_IN_UP"
              animationDelay={index * 120}
              animationTime={600}
              className="h-full"
              innerClassName="h-full"
            >
              <div className="relative h-full p-6 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-slate-800 dark:to-purple-950/40 rounded-xl border border-primary-100 dark:border-primary-900/50">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center text-sm shadow-lg">
                  {key}
                </div>
                <h4 className="font-semibold mb-2 mt-2 text-gray-900 dark:text-white">
                  {t(`howItWorks.steps.${key}.title`)}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t(`howItWorks.steps.${key}.description`)}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
