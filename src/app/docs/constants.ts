import type { CoreSubSection, Vue3SubSection, ReactSubSection } from './types';

export const CORE_SECTIONS: CoreSubSection[] = [
  'classes',
  'methods',
  'properties',
  'types',
  'form-fields',
  'utilities',
];

export const VUE3_SECTIONS: Vue3SubSection[] = [
  'getting-started',
  'components',
  'events',
  'api',
];

export const REACT_SECTIONS: ReactSubSection[] = ['getting-started', 'components'];

export const SECTION_TITLES = {
  core: {
    classes: 'BlockBuilder',
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
    api: 'Программный API',
  },
  react: {
    'getting-started': 'Быстрый старт',
    components: 'Компоненты',
  },
};
