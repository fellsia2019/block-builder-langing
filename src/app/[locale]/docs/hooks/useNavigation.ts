import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import type { CoreSubSection, Vue3SubSection, ReactSubSection } from '../types';
import { CORE_SECTIONS, VUE3_SECTIONS, REACT_SECTIONS } from '../constants';

const CORE_TITLE_KEYS: Record<CoreSubSection, string> = {
  classes: 'overview',
  methods: 'methods',
  properties: 'properties',
  types: 'types',
  'form-fields': 'formFields',
  'theming-localization': 'theming',
  utilities: 'utilities',
};

const VUE3_TITLE_KEYS: Record<Vue3SubSection, string> = {
  'getting-started': 'getStarted',
  components: 'components',
  events: 'events',
};

const REACT_TITLE_KEYS: Record<ReactSubSection, string> = {
  'getting-started': 'getStarted',
  components: 'components',
  events: 'callbacks',
};

export function useCoreNavigation(subSection: CoreSubSection) {
  const t = useTranslations('docs.sidebar');

  return useMemo(() => {
    const currentIndex = CORE_SECTIONS.indexOf(subSection);
    const nextSection = currentIndex < CORE_SECTIONS.length - 1 ? CORE_SECTIONS[currentIndex + 1] : null;
    const nextTitle = nextSection
      ? t(CORE_TITLE_KEYS[nextSection as CoreSubSection] as 'overview')
      : null;

    return { nextSection, nextTitle };
  }, [subSection, t]);
}

export function useVue3Navigation(subSection: Vue3SubSection) {
  const t = useTranslations('docs.sidebar');

  return useMemo(() => {
    const currentIndex = VUE3_SECTIONS.indexOf(subSection);
    const nextSection = currentIndex < VUE3_SECTIONS.length - 1 ? VUE3_SECTIONS[currentIndex + 1] : null;
    const nextTitle = nextSection ? t(VUE3_TITLE_KEYS[nextSection] as 'getStarted') : null;

    return { nextSection, nextTitle };
  }, [subSection, t]);
}

export function useReactNavigation(subSection: ReactSubSection) {
  const t = useTranslations('docs.sidebar');

  return useMemo(() => {
    const currentIndex = REACT_SECTIONS.indexOf(subSection);
    const nextSection = currentIndex < REACT_SECTIONS.length - 1 ? REACT_SECTIONS[currentIndex + 1] : null;
    const nextTitle = nextSection ? t(REACT_TITLE_KEYS[nextSection] as 'getStarted') : null;

    return { nextSection, nextTitle };
  }, [subSection, t]);
}
