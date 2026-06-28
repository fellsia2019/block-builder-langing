export interface DocsNavItem {
  titleKey: string;
  href: string;
}

export interface DocsNavGroup {
  titleKey: string;
  items: DocsNavItem[];
}

export const DOCS_TOP_NAV: DocsNavItem[] = [
  { titleKey: 'nav.getStarted', href: '/docs/get-started' },
  { titleKey: 'nav.api', href: '/docs/core/classes' },
  { titleKey: 'nav.vue', href: '/docs/vue/getting-started' },
  { titleKey: 'nav.react', href: '/docs/react/getting-started' },
  { titleKey: 'nav.demo', href: 'https://block-builder-demo.vercel.app/' },
  { titleKey: 'nav.changelog', href: '/docs/changelog' },
];

export const DOCS_SIDEBAR: DocsNavGroup[] = [
  {
    titleKey: 'sidebar.gettingStarted',
    items: [
      { titleKey: 'nav.getStarted', href: '/docs/get-started' },
      { titleKey: 'nav.changelog', href: '/docs/changelog' },
    ],
  },
  {
    titleKey: 'sidebar.apiReference',
    items: [
      { titleKey: 'sidebar.overview', href: '/docs/core/classes' },
      { titleKey: 'sidebar.methods', href: '/docs/core/methods' },
      { titleKey: 'sidebar.properties', href: '/docs/core/properties' },
      { titleKey: 'sidebar.formFields', href: '/docs/core/form-fields' },
      { titleKey: 'sidebar.theming', href: '/docs/core/theming-localization' },
      { titleKey: 'sidebar.utilities', href: '/docs/core/utilities' },
      { titleKey: 'sidebar.types', href: '/docs/core/types' },
    ],
  },
  {
    titleKey: 'sidebar.vue3',
    items: [
      { titleKey: 'nav.getStarted', href: '/docs/vue/getting-started' },
      { titleKey: 'sidebar.components', href: '/docs/vue/components' },
      { titleKey: 'sidebar.events', href: '/docs/vue/events' },
      { titleKey: 'sidebar.nuxt', href: '/docs/nuxt' },
    ],
  },
  {
    titleKey: 'sidebar.react',
    items: [
      { titleKey: 'nav.getStarted', href: '/docs/react/getting-started' },
      { titleKey: 'sidebar.components', href: '/docs/react/components' },
      { titleKey: 'sidebar.callbacks', href: '/docs/react/events' },
      { titleKey: 'sidebar.next', href: '/docs/next' },
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
