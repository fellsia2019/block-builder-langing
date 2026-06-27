/** Зазор между шапкой и заголовком при скролле к якорю */
export const DOCS_SCROLL_GAP = 16;

export const DOCS_HEADER_ID = 'docs-top-nav';

export function getDocsScrollOffset(): number {
  const header = document.getElementById(DOCS_HEADER_ID);
  return (header?.getBoundingClientRect().height ?? 64) + DOCS_SCROLL_GAP;
}
