export interface DocsSearchEntry {
  title: string;
  href: string;
  group: string;
  keywords?: string;
}

const SIDEBAR_ENTRIES: DocsSearchEntry[] = [
  { title: 'Быстрый старт', href: '/docs/get-started', group: 'Начало работы' },
  { title: 'История изменений', href: '/docs/changelog', group: 'Начало работы' },
  { title: 'Обзор API', href: '/docs/core/classes', group: 'Справочник API' },
  { title: 'Методы', href: '/docs/core/methods', group: 'Справочник API' },
  { title: 'Свойства', href: '/docs/core/properties', group: 'Справочник API' },
  { title: 'Поля форм', href: '/docs/core/form-fields', group: 'Справочник API' },
  { title: 'Утилиты', href: '/docs/core/utilities', group: 'Справочник API' },
  { title: 'Типы', href: '/docs/core/types', group: 'Справочник API' },
  { title: 'Быстрый старт', href: '/docs/vue/getting-started', group: 'Vue 3' },
  { title: 'Компоненты', href: '/docs/vue/components', group: 'Vue 3' },
  { title: 'События', href: '/docs/vue/events', group: 'Vue 3' },
  { title: 'Nuxt (SSR)', href: '/docs/nuxt', group: 'Vue 3' },
  { title: 'Быстрый старт', href: '/docs/react/getting-started', group: 'React' },
  { title: 'Компоненты', href: '/docs/react/components', group: 'React' },
  { title: 'Колбэки', href: '/docs/react/events', group: 'React' },
  { title: 'Next.js (SSR)', href: '/docs/next', group: 'React' },
];

const CORE = '/docs/core';
const TYPES = `${CORE}/types`;
const FIELDS = `${CORE}/form-fields`;
const UTILS = `${CORE}/utilities`;
const METHODS = `${CORE}/methods`;

function type(name: string, id: string, keywords?: string): DocsSearchEntry {
  return { title: name, href: `${TYPES}#${id}`, group: 'Типы', keywords };
}

function field(title: string, id: string, keywords?: string): DocsSearchEntry {
  return { title, href: `${FIELDS}#${id}`, group: 'Поля форм', keywords };
}

function util(title: string, id: string, keywords?: string): DocsSearchEntry {
  return { title, href: `${UTILS}#${id}`, group: 'Утилиты', keywords };
}

function method(name: string, keywords?: string): DocsSearchEntry {
  return { title: name, href: `${METHODS}#${name}`, group: 'Методы API', keywords };
}

const EXTRA_ENTRIES: DocsSearchEntry[] = [
  // —— Обзор API ——
  { title: 'BlockBuilder (core)', href: `${CORE}/classes`, group: 'Справочник API', keywords: 'headless createBlockManagementUseCase программный api' },
  { title: 'Импорт и конструктор', href: `${CORE}/classes#import`, group: 'Справочник API', keywords: 'new BlockBuilder import constructor' },
  { title: 'blockConfigs', href: `${CORE}/properties`, group: 'Справочник API', keywords: 'конфигурация типов блоков initialBlocks autoInit' },

  // —— Валидация ——
  field('Валидация в UI', 'validation', 'validation validate валидация ошибки required pattern custom rules'),
  util('UniversalValidator', 'universal-validator', 'validation validate валидация правила required email url min max pattern'),
  util('ReactiveFormValidationTracker', 'reactive-form-validation', 'validation validate валидация ошибки форма touch revalidate'),
  type('IValidationRule', 'ivalidation-rule', 'validation validate required min max pattern custom'),
  type('IFieldValidationConfig', 'ifield-validation-config', 'validation rules валидация'),
  type('IValidationResult', 'ivalidation-result', 'validation errors isValid'),

  // —— Поля форм ——
  field('Обзор полей форм', 'overview', 'form fields IFormFieldConfig props'),
  field('Стандартные типы полей', 'field-types', 'text number checkbox radio textarea color range'),
  field('Параметры полей', 'field-params', 'label placeholder defaultValue required hidden disabled'),
  field('select', 'select', 'список options multiple optionsFrom ISelectOption'),
  field('repeater', 'repeater', 'повторитель nested items вложенные'),
  field('spacing', 'spacing', 'margin padding breakpoints отступы DEFAULT_BREAKPOINTS'),
  field('image', 'image', 'изображение upload url preview'),
  field('file', 'file', 'файл upload import IFileImportConfig'),
  field('block-anchor', 'block-anchor', 'якорь anchor scroll hash ссылка'),
  field('matrix-table', 'matrix-table', 'таблица grid matrix'),
  field('api-select', 'api-select', 'api dropdown remote fetch autocomplete'),
  field('dependsOn', 'depends-on', 'условное отображение visible when operator equals'),
  field('Кастомные рендереры', 'custom-renderers', 'ICustomFieldRenderer custom rendererId formScope'),
  field('Регистрация кастомного рендерера', 'custom-register', 'registerCustomFieldRenderer rendererId'),

  // —— Типы ——
  type('IBlock', 'iblock', 'block id type props metadata'),
  type('IBlockDto', 'iblock-dto', 'dto serialize storage json'),
  type('ICreateBlockDto', 'icreate-block-dto', 'create block dto'),
  type('IUpdateBlockDto', 'iupdate-block-dto', 'update block dto'),
  type('IBlockMetadata', 'iblock-metadata', 'metadata visible locked'),
  type('IBlockBuilderOptions', 'iblock-builder-options', 'options constructor init'),
  type('IFormFieldConfig', 'iform-field-config', 'field config type label validation'),
  type('IRepeaterFieldConfig', 'irepeater-field-config', 'repeater nested fields'),
  type('IRepeaterItemFieldConfig', 'irepeater-item-field-config', 'repeater item field'),
  type('IFormGenerationConfig', 'iform-generation-config', 'form generation'),
  type('TFieldType', 'tfield-type', 'field type text select repeater spacing'),
  type('IApiSelectConfig', 'iapi-select-config', 'api-select url method headers'),
  type('IApiSelectItem', 'iapi-select-item', 'api select item label value'),
  type('IApiSelectResponse', 'iapi-select-response', 'api select response items total'),
  type('IApiRequestParams', 'iapi-request-params', 'api request params search page'),
  type('THttpMethod', 'thttp-method', 'GET POST PUT DELETE http'),
  type('IBlockAnchorConfig', 'iblock-anchor-config', 'block anchor config'),
  type('IDependsOnConfig', 'idepends-on-config', 'dependsOn field operator value'),
  type('IBlockFormHooks', 'iblock-form-hooks', 'onFormOpen onBeforeSave formHooks lifecycle'),
  type('IBlockTypeConfig', 'iblock-type-config', 'block type config render fields spacingOptions IBlockType'),
  type('ICustomFieldFormScope', 'icustom-field-form-scope', 'custom renderer formScope setField repeater'),
  type('IOptionsFromConfig', 'ioptions-from-config', 'select optionsFrom dynamic options'),
  type('IFileImportConfig', 'ifile-import-config', 'file import upload merge onImport'),
  type('TBlockId', 'tblock-id', 'block id string'),

  // —— Методы ——
  method('createBlock', 'создать блок crud'),
  method('getBlock', 'получить блок по id'),
  method('getAllBlocks', 'список всех блоков'),
  method('updateBlock', 'обновить блок'),
  method('deleteBlock', 'удалить блок'),
  method('duplicateBlock', 'дублировать копировать'),
  method('exportBlocks', 'экспорт json'),
  method('importBlocks', 'импорт json'),
  method('setIsEdit', 'режим редактирования isEdit preview просмотр'),
  method('getIsEdit', 'режим редактирования isEdit'),
  method('registerCustomFieldRenderer', 'кастомный рендерер поля'),
  method('registerCustomFieldRenderers', 'кастомные рендереры массово'),

  // —— Утилиты ——
  util('Блокировка скролла', 'scroll-lock', 'scroll lock modal lockBodyScroll setScrollLockHandlers'),
  util('buildBlockHierarchy', 'block-hierarchy-utils', 'hierarchy parent children cloneBlock getAllChildren isChildOf'),
  util('generateSpacingCSS', 'spacing-utils', 'spacing margin padding breakpoints css variables validateSpacing'),
  util('filterBlocksForDisplay', 'filter-blocks', 'visible hidden isEdit opacity'),
  util('haveBlocksChanged', 'unsaved-changes', 'несохранённые изменения page leave warnOnPageLeave tracker'),
  util('usePageLeaveWarning', 'unsaved-changes', 'vue react warn leave beforeunload'),

  // —— Темизация / локализация ——
  { title: 'Темизация и локализация UI', href: '/docs/core/theming-localization', group: 'Справочник API', keywords: 'theme themeVars locale uiStrings dark glass css variables i18n' },
  { title: 'themeVars', href: '/docs/core/theming-localization#theme-vars', group: 'Справочник API', keywords: 'bb-color-primary surface custom theme' },
  { title: 'locale uiStrings', href: '/docs/core/theming-localization#locale-ui-strings', group: 'Справочник API', keywords: 'локализация i18n ru en UI_STRINGS' },

  // —— Vue ——
  { title: 'BlockBuilderComponent', href: '/docs/vue/components#block-builder-component', group: 'Vue 3', keywords: 'компонент props события emit' },
  { title: 'onSave', href: '/docs/vue/events', group: 'Vue 3', keywords: 'сохранение save blocks sync backend' },
  { title: 'onBlockAdded', href: '/docs/vue/events', group: 'Vue 3', keywords: 'событие added created duplicate' },
  { title: 'createBlockManagementUseCase', href: '/docs/vue/getting-started', group: 'Vue 3', keywords: 'use case composable setup' },

  // —— React ——
  { title: 'BlockBuilderComponent', href: '/docs/react/components#block-builder-component', group: 'React', keywords: 'компонент props колбэки' },
  { title: 'onSave', href: '/docs/react/events', group: 'React', keywords: 'сохранение save blocks sync backend' },
  { title: 'onBlockAdded', href: '/docs/react/events', group: 'React', keywords: 'колбэк added created duplicate' },
  { title: 'onBlockUpdated', href: '/docs/react/events', group: 'React', keywords: 'колбэк updated changed' },
  { title: 'onBlockDeleted', href: '/docs/react/events', group: 'React', keywords: 'колбэк deleted removed' },
  { title: 'createBlockManagementUseCase', href: '/docs/react/getting-started', group: 'React', keywords: 'use case useMemo hook' },

  // —— SSR ——
  { title: 'prepareBlocksForDisplay', href: '/docs/react/components#prepare-blocks-for-display', group: 'React', keywords: 'ssr server hydration render' },
  { title: 'prepareBlocksForDisplay', href: '/docs/next#prepare-blocks-for-display', group: 'Next.js (SSR)', keywords: 'ssr server hydration' },
  { title: 'prepareBlocksForDisplay', href: '/docs/nuxt#prepare-blocks-for-display', group: 'Nuxt (SSR)', keywords: 'ssr server hydration vue' },
  { title: 'enrichBlockForDisplay', href: '/docs/react/components#enrich-block-for-display', group: 'React', keywords: 'ssr enrich display' },
  { title: 'seedRepositoryFromBlocks', href: '/docs/react/components#seed-repository-from-blocks', group: 'React', keywords: 'ssr repository hydration' },
  { title: 'enableViewportBreakpointDetection', href: '/docs/react/components#enable-viewport-breakpoint-detection', group: 'React', keywords: 'ssr spacing breakpoints viewport' },
  { title: 'Next.js SSR', href: '/docs/next#server-client', group: 'Next.js (SSR)', keywords: 'app router server client component' },
  { title: 'Nuxt SSR', href: '/docs/nuxt#ssr-page', group: 'Nuxt (SSR)', keywords: 'nuxt server ssr page' },
  { title: 'serializeBlocksForStorage', href: '/docs/next#api-routes', group: 'Next.js (SSR)', keywords: 'save storage api route json' },
];

export const DOCS_SEARCH_INDEX: DocsSearchEntry[] = [...SIDEBAR_ENTRIES, ...EXTRA_ENTRIES];

const GROUP_EN: Record<string, string> = {
  'Начало работы': 'Getting started',
  'Справочник API': 'API Reference',
  'Vue 3': 'Vue 3',
  'React': 'React',
  'Типы': 'Types',
  'Поля форм': 'Form fields',
  'Утилиты': 'Utilities',
  'Методы API': 'API Methods',
  'Next.js (SSR)': 'Next.js (SSR)',
  'Nuxt (SSR)': 'Nuxt (SSR)',
};

const TITLE_EN: Record<string, string> = {
  'Быстрый старт': 'Getting started',
  'История изменений': 'Changelog',
  'Обзор API': 'API overview',
  'Методы': 'Methods',
  'Свойства': 'Properties',
  'Поля форм': 'Form fields',
  'Темизация и локализация': 'Theming & localization',
  'Темизация и локализация UI': 'UI theming & localization',
  'Утилиты': 'Utilities',
  'Типы': 'Types',
  'Компоненты': 'Components',
  'События': 'Events',
  'Колбэки': 'Callbacks',
  'Импорт и конструктор': 'Import & constructor',
  'Валидация в UI': 'Validation in UI',
  'Обзор полей форм': 'Form fields overview',
  'Стандартные типы полей': 'Standard field types',
  'Параметры полей': 'Field parameters',
  'Кастомные рендереры': 'Custom renderers',
  'Регистрация кастомного рендерера': 'Register custom renderer',
  'Блокировка скролла': 'Scroll lock',
};

function localizeEntry(entry: DocsSearchEntry, locale: string): DocsSearchEntry {
  if (locale !== 'en') return entry;
  return {
    ...entry,
    title: TITLE_EN[entry.title] ?? entry.title,
    group: GROUP_EN[entry.group] ?? entry.group,
  };
}

function getSearchIndex(locale: string): DocsSearchEntry[] {
  if (locale === 'en') {
    return DOCS_SEARCH_INDEX.map((entry) => localizeEntry(entry, 'en'));
  }
  return DOCS_SEARCH_INDEX;
}

export function searchDocs(query: string, locale = 'ru', limit = 16): DocsSearchEntry[] {
  const index = getSearchIndex(locale);
  const q = query.trim().toLowerCase();
  if (!q) return index.slice(0, limit);

  const words = q.split(/\s+/).filter((word) => word.length > 1);

  const scored = index.map((entry) => {
    const haystack = `${entry.title} ${entry.group} ${entry.keywords ?? ''} ${entry.href}`.toLowerCase();
    let score = 0;

    if (entry.title.toLowerCase() === q) score += 20;
    else if (entry.title.toLowerCase().startsWith(q)) score += 12;
    else if (entry.title.toLowerCase().includes(q)) score += 6;

    if (haystack.includes(q)) score += 3;

    for (const word of words) {
      if (entry.title.toLowerCase().includes(word)) score += 4;
      if (haystack.includes(word)) score += 2;
    }

    return { entry, score };
  })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  const seen = new Set<string>();
  const results: DocsSearchEntry[] = [];
  for (const { entry } of scored) {
    const key = `${entry.href}|${entry.title}|${entry.group}`;
    if (seen.has(key)) continue;
    seen.add(key);
    results.push(entry);
    if (results.length >= limit) break;
  }
  return results;
}
