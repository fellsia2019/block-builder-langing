import type { CoreSubSection, Vue3SubSection, ReactSubSection } from './types';

export const CORE_SECTIONS: CoreSubSection[] = [
  'classes',
  'methods',
  'properties',
  'form-fields',
  'utilities',
  'types',
];

export const VUE3_SECTIONS: Vue3SubSection[] = ['getting-started', 'components', 'events'];

export const REACT_SECTIONS: ReactSubSection[] = ['getting-started', 'components', 'events'];

export const SECTION_TITLES = {
  core: {
    classes: 'Обзор API',
    methods: 'Методы',
    properties: 'Свойства',
    types: 'Типы',
    'form-fields': 'Поля форм',
    utilities: 'Утилиты',
  },
  vue3: {
    'getting-started': 'Быстрый старт',
    components: 'Компоненты',
    events: 'События',
  },
  react: {
    'getting-started': 'Быстрый старт',
    components: 'Компоненты',
    events: 'Колбэки',
  },
};
