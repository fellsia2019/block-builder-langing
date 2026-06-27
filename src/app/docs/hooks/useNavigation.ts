import { useMemo } from 'react';
import type { CoreSubSection, Vue3SubSection, ReactSubSection } from '../types';
import { CORE_SECTIONS, VUE3_SECTIONS, REACT_SECTIONS, SECTION_TITLES } from '../constants';

export function useCoreNavigation(subSection: CoreSubSection) {
  return useMemo(() => {
    const currentIndex = CORE_SECTIONS.indexOf(subSection);
    const nextSection = currentIndex < CORE_SECTIONS.length - 1 ? CORE_SECTIONS[currentIndex + 1] : null;
    const nextTitle = nextSection
      ? SECTION_TITLES.core[nextSection as keyof typeof SECTION_TITLES.core]
      : null;

    return { nextSection, nextTitle };
  }, [subSection]);
}

export function useVue3Navigation(subSection: Vue3SubSection) {
  return useMemo(() => {
    const currentIndex = VUE3_SECTIONS.indexOf(subSection);
    const nextSection = currentIndex < VUE3_SECTIONS.length - 1 ? VUE3_SECTIONS[currentIndex + 1] : null;
    const nextTitle = nextSection ? SECTION_TITLES.vue3[nextSection as Vue3SubSection] : null;

    return { nextSection, nextTitle };
  }, [subSection]);
}

export function useReactNavigation(subSection: ReactSubSection) {
  return useMemo(() => {
    const currentIndex = REACT_SECTIONS.indexOf(subSection);
    const nextSection = currentIndex < REACT_SECTIONS.length - 1 ? REACT_SECTIONS[currentIndex + 1] : null;
    const nextTitle = nextSection ? SECTION_TITLES.react[nextSection as ReactSubSection] : null;

    return { nextSection, nextTitle };
  }, [subSection]);
}
