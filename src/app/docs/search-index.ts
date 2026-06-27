import { DOCS_SIDEBAR } from './nav';

export interface DocsSearchEntry {
  title: string;
  href: string;
  group: string;
  keywords?: string;
}

const SIDEBAR_ENTRIES: DocsSearchEntry[] = DOCS_SIDEBAR.flatMap((group) =>
  group.items.map((item) => ({
    title: item.title,
    href: item.href,
    group: group.title,
  }))
);

export const DOCS_SEARCH_INDEX: DocsSearchEntry[] = [
  ...SIDEBAR_ENTRIES,
  { title: 'BlockBuilderComponent', href: '/docs/vue/components#block-builder-component', group: 'Vue 3', keywords: 'свойства события компонент' },
  { title: 'BlockBuilderComponent', href: '/docs/react/components#block-builder-component', group: 'React', keywords: 'свойства колбэки компонент' },
  { title: 'Поля форм — select', href: '/docs/core/form-fields#select', group: 'Справочник API', keywords: 'multiple optionsFrom' },
  { title: 'Поля форм — repeater', href: '/docs/core/form-fields#repeater', group: 'Справочник API', keywords: 'nested items' },
  { title: 'Поля форм — spacing', href: '/docs/core/form-fields#spacing', group: 'Справочник API', keywords: 'margin padding breakpoints' },
  { title: 'Поля форм — api-select', href: '/docs/core/form-fields#api-select', group: 'Справочник API', keywords: 'dropdown remote' },
  { title: 'Поля форм — matrix-table', href: '/docs/core/form-fields#matrix-table', group: 'Справочник API', keywords: 'table grid' },
  { title: 'Поля форм — кастомные рендереры', href: '/docs/core/form-fields#custom-renderers', group: 'Справочник API', keywords: 'custom ICustomFieldRenderer formScope rendererId' },
  { title: 'IFormFieldConfig', href: '/docs/core/types#i-form-field-config', group: 'Типы', keywords: 'typescript interface field' },
  { title: 'IBlockFormHooks', href: '/docs/core/types#i-block-form-hooks', group: 'Типы', keywords: 'onFormOpen onBeforeSave' },
  { title: 'Обзор API — BlockBuilder', href: '/docs/core/classes', group: 'Справочник API', keywords: 'core headless createBlockManagementUseCase' },
  { title: 'prepareBlocksForDisplay', href: '/docs/react/components#prepare-blocks-for-display', group: 'React', keywords: 'ssr next nuxt server hydration' },
  { title: 'prepareBlocksForDisplay', href: '/docs/next#prepare-blocks-for-display', group: 'Next.js (SSR)', keywords: 'server hydration ssr-utils' },
  { title: 'prepareBlocksForDisplay', href: '/docs/nuxt#prepare-blocks-for-display', group: 'Nuxt (SSR)', keywords: 'server hydration ssr-utils vue' },
  { title: 'enrichBlockForDisplay', href: '/docs/react/components#enrich-block-for-display', group: 'React', keywords: 'ssr server hydration' },
  { title: 'seedRepositoryFromBlocks', href: '/docs/react/components#seed-repository-from-blocks', group: 'React', keywords: 'ssr server hydration repository' },
];

export function searchDocs(query: string, limit = 12): DocsSearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return DOCS_SEARCH_INDEX.slice(0, limit);

  const scored = DOCS_SEARCH_INDEX.map((entry) => {
    const haystack = `${entry.title} ${entry.group} ${entry.keywords ?? ''} ${entry.href}`.toLowerCase();
    let score = 0;
    if (entry.title.toLowerCase().startsWith(q)) score += 10;
    if (entry.title.toLowerCase().includes(q)) score += 5;
    if (haystack.includes(q)) score += 2;
    q.split(/\s+/).forEach((word) => {
      if (word.length > 1 && haystack.includes(word)) score += 1;
    });
    return { entry, score };
  })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  const seen = new Set<string>();
  const results: DocsSearchEntry[] = [];
  for (const { entry } of scored) {
    const key = `${entry.href}|${entry.title}`;
    if (seen.has(key)) continue;
    seen.add(key);
    results.push(entry);
    if (results.length >= limit) break;
  }
  return results;
}
