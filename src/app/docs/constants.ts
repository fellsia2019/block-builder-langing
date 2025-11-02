import type { CoreSubSection, Vue3SubSection } from './types';

export const CORE_SECTIONS: CoreSubSection[] = [
  'getting-started',
  'classes',
  'methods',
  'properties',
  'types',
  'form-fields'
];

export const VUE3_SECTIONS: Vue3SubSection[] = [
  'getting-started',
  'components',
  'events',
  'api'
];

export const SECTION_TITLES = {
  core: {
    'getting-started': 'Быстрый старт',
    'classes': 'Классы',
    'methods': 'Методы',
    'properties': 'Свойства',
    'types': 'Типы',
    'form-fields': 'Поля форм'
  },
  vue3: {
    'getting-started': 'Быстрый старт',
    'components': 'Компоненты',
    'events': 'События',
    'api': 'API'
  }
};

