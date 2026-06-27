export interface DocsNavItem {
  title: string;
  href: string;
}

export interface DocsNavGroup {
  title: string;
  items: DocsNavItem[];
}

export const DOCS_TOP_NAV: DocsNavItem[] = [
  { title: 'Быстрый старт', href: '/docs/get-started' },
  { title: 'API', href: '/docs/core/classes' },
  { title: 'Vue', href: '/docs/vue/getting-started' },
  { title: 'React', href: '/docs/react/getting-started' },
  { title: 'Демо', href: 'https://block-builder-demo.vercel.app/' },
  { title: 'История изменений', href: '/docs/changelog' },
];

export const DOCS_SIDEBAR: DocsNavGroup[] = [
  {
    title: 'Начало работы',
    items: [
      { title: 'Быстрый старт', href: '/docs/get-started' },
      { title: 'История изменений', href: '/docs/changelog' },
    ],
  },
  {
    title: 'Справочник API',
    items: [
      { title: 'BlockBuilder', href: '/docs/core/classes' },
      { title: 'Методы', href: '/docs/core/methods' },
      { title: 'Свойства', href: '/docs/core/properties' },
      { title: 'Типы', href: '/docs/core/types' },
      { title: 'Поля форм', href: '/docs/core/form-fields' },
      { title: 'Утилиты', href: '/docs/core/utilities' },
    ],
  },
  {
    title: 'Vue 3',
    items: [
      { title: 'Быстрый старт', href: '/docs/vue/getting-started' },
      { title: 'Компоненты', href: '/docs/vue/components' },
      { title: 'События', href: '/docs/vue/events' },
      { title: 'Программный API', href: '/docs/vue/api' },
      { title: 'Nuxt (SSR)', href: '/docs/nuxt' },
    ],
  },
  {
    title: 'React',
    items: [
      { title: 'Быстрый старт', href: '/docs/react/getting-started' },
      { title: 'Компоненты', href: '/docs/react/components' },
      { title: 'Next.js (SSR)', href: '/docs/next' },
    ],
  },
];

export function isDocsTopNavActive(pathname: string, href: string): boolean {
  if (href.startsWith('http')) return false;
  if (pathname === href) return true;
  if (href === '/docs/core/classes' && pathname === '/docs/core/getting-started') return true;
  if (
    href === '/docs/vue/getting-started' &&
    (pathname.startsWith('/docs/vue') || pathname.startsWith('/docs/nuxt'))
  ) {
    return true;
  }
  if (
    href === '/docs/react/getting-started' &&
    (pathname.startsWith('/docs/react') || pathname.startsWith('/docs/next'))
  ) {
    return true;
  }
  return pathname.startsWith(`${href}/`);
}

/** Точное совпадение маршрута — для бокового меню (без «родительского» Vue/React). */
export function isDocsSidebarActive(pathname: string, href: string): boolean {
  if (href.startsWith('http')) return false;
  if (pathname === href) return true;
  if (href === '/docs/core/classes' && pathname === '/docs/core/getting-started') return true;
  return pathname.startsWith(`${href}/`);
}

/** @deprecated Используйте isDocsTopNavActive или isDocsSidebarActive */
export function isDocsNavActive(pathname: string, href: string): boolean {
  return isDocsTopNavActive(pathname, href);
}
