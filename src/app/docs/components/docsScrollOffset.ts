/** Зазор между шапкой и заголовком при скролле к якорю */
export const DOCS_SCROLL_GAP = 16;

export const DOCS_HEADER_ID = 'docs-top-nav';

export const DOCS_ANCHOR_HIGHLIGHT_CLASS = 'docs-anchor-highlight';
export const DOCS_ANCHOR_HIGHLIGHT_MS = 4000;

let highlightTimer: number | null = null;
let highlightedEl: HTMLElement | null = null;
let pendingHighlightTimer: number | null = null;
let pendingHighlightId: string | null = null;

export function getDocsScrollOffset(): number {
  const header = document.getElementById(DOCS_HEADER_ID);
  return (header?.getBoundingClientRect().height ?? 64) + DOCS_SCROLL_GAP;
}

export function clearDocHeadingHighlight(): void {
  if (highlightTimer !== null) {
    window.clearTimeout(highlightTimer);
    highlightTimer = null;
  }
  if (pendingHighlightTimer !== null) {
    window.clearTimeout(pendingHighlightTimer);
    pendingHighlightTimer = null;
    pendingHighlightId = null;
  }
  highlightedEl?.classList.remove(DOCS_ANCHOR_HIGHLIGHT_CLASS);
  highlightedEl = null;
}

export function highlightDocHeading(id: string, force = false): void {
  const el = document.getElementById(id);
  if (!el) return;
  if (!force && highlightedEl === el) return;

  clearDocHeadingHighlight();
  if (force) {
    void el.offsetWidth;
  }
  el.classList.add(DOCS_ANCHOR_HIGHLIGHT_CLASS);
  highlightedEl = el;
  highlightTimer = window.setTimeout(clearDocHeadingHighlight, DOCS_ANCHOR_HIGHLIGHT_MS);
}

export interface ScrollToDocHeadingOptions {
  highlight?: boolean;
  forceHighlight?: boolean;
}

export function scrollToDocHeading(
  id: string,
  behavior: ScrollBehavior = 'smooth',
  options?: ScrollToDocHeadingOptions
): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - getDocsScrollOffset();
  window.scrollTo({ top, behavior });

  if (options?.highlight) {
    const force = options.forceHighlight ?? false;
    if (force || pendingHighlightId !== id || pendingHighlightTimer === null) {
      if (pendingHighlightTimer !== null) {
        window.clearTimeout(pendingHighlightTimer);
      }
      pendingHighlightId = id;
      const delay = behavior === 'smooth' ? 350 : 0;
      pendingHighlightTimer = window.setTimeout(() => {
        pendingHighlightTimer = null;
        pendingHighlightId = null;
        highlightDocHeading(id, force);
      }, delay);
    }
  }

  return true;
}