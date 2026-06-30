/** Зазор между шапкой и заголовком при скролле к якорю */
export const DOCS_SCROLL_GAP = 16;

/** Высота шапки docs — DocsTopNav inner `h-16` */
export const DOCS_HEADER_HEIGHT_PX = 64;

export const DOCS_SCROLL_OFFSET_PX = DOCS_HEADER_HEIGHT_PX + DOCS_SCROLL_GAP;

export const DOCS_HEADER_ID = 'docs-top-nav';

export const DOCS_ANCHOR_HIGHLIGHT_CLASS = 'docs-anchor-highlight';
export const DOCS_ANCHOR_HIGHLIGHT_MS = 4000;

const DOCS_CONTENT_SELECTOR = '.docs-content';

let highlightTimer: number | null = null;
let highlightedEl: HTMLElement | null = null;
let pendingHighlightTimer: number | null = null;
let pendingHighlightId: string | null = null;

export function syncDocsScrollOffset(): void {
  document.documentElement.style.setProperty('--docs-scroll-offset', `${DOCS_SCROLL_OFFSET_PX}px`);
}

export function getDocsScrollOffset(): number {
  return DOCS_SCROLL_OFFSET_PX;
}

export function findDocHeading(id: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(
    `${DOCS_CONTENT_SELECTOR} #${CSS.escape(id)}`
  );
}

export function isDocHeadingAtOffset(id: string, tolerance = 8): boolean {
  const el = findDocHeading(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top;
  return Math.abs(top - getDocsScrollOffset()) <= tolerance;
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
  const el = findDocHeading(id);
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

function getDocHeadingScrollTop(el: HTMLElement): number {
  return Math.max(0, el.getBoundingClientRect().top + window.scrollY - getDocsScrollOffset());
}

export function scrollToDocHeading(
  id: string,
  behavior: ScrollBehavior = 'smooth',
  options?: ScrollToDocHeadingOptions
): boolean {
  const el = findDocHeading(id);
  if (!el) return false;

  syncDocsScrollOffset();

  const html = document.documentElement;
  const prevBehavior = html.style.scrollBehavior;
  if (behavior === 'instant') {
    html.style.scrollBehavior = 'auto';
  }

  window.scrollTo({ top: getDocHeadingScrollTop(el), left: 0, behavior });

  if (behavior === 'instant') {
    requestAnimationFrame(() => {
      html.style.scrollBehavior = prevBehavior;
    });
  }

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

const DOM_QUIET_MS = 300;
const MAX_WAIT_MS = 15000;
const VERIFY_DELAYS_MS = [0, 100, 300, 600, 1200];
const LAYOUT_WATCH_MS = 4000;

/**
 * Скролл к якорю после dynamic import: ждём появления заголовка и паузу без мутаций DOM.
 */
export function scrollToDocHeadingWhenReady(
  id: string,
  options?: { highlight?: boolean }
): () => void {
  let cancelled = false;
  let aligned = false;
  let quietTimer = 0;
  let maxTimer = 0;
  let layoutWatchTimer = 0;
  let resizeQuietTimer = 0;
  let verifyTimers: number[] = [];
  let observer: MutationObserver | null = null;
  let resizeObserver: ResizeObserver | null = null;

  const clearVerifyTimers = () => {
    for (const timer of verifyTimers) window.clearTimeout(timer);
    verifyTimers = [];
  };

  const align = () => {
    if (cancelled) return false;
    return scrollToDocHeading(id, 'instant');
  };

  const verify = (isLast: boolean) => {
    if (cancelled) return;
    if (!findDocHeading(id)) return;

    if (!isDocHeadingAtOffset(id)) {
      align();
      return;
    }

    if (isLast && options?.highlight) {
      highlightDocHeading(id);
    }
  };

  const scheduleVerify = () => {
    clearVerifyTimers();
    const lastIdx = VERIFY_DELAYS_MS.length - 1;
    verifyTimers = VERIFY_DELAYS_MS.map((delay, index) =>
      window.setTimeout(() => verify(index === lastIdx), delay)
    );
  };

  const stopLayoutWatch = () => {
    resizeObserver?.disconnect();
    resizeObserver = null;
    window.clearTimeout(resizeQuietTimer);
    window.clearTimeout(layoutWatchTimer);
  };

  const onLayoutShift = () => {
    if (cancelled || !aligned) return;
    window.clearTimeout(resizeQuietTimer);
    resizeQuietTimer = window.setTimeout(() => {
      if (!isDocHeadingAtOffset(id)) align();
    }, 80);
  };

  const startLayoutWatch = (container: Element) => {
    stopLayoutWatch();
    resizeObserver = new ResizeObserver(onLayoutShift);
    resizeObserver.observe(container);
    layoutWatchTimer = window.setTimeout(stopLayoutWatch, LAYOUT_WATCH_MS);
  };

  const onReady = () => {
    if (cancelled || aligned) return;
    if (!findDocHeading(id)) return;

    aligned = true;
    observer?.disconnect();
    observer = null;
    window.clearTimeout(quietTimer);

    align();
    scheduleVerify();

    const container = document.querySelector(DOCS_CONTENT_SELECTOR);
    if (container) startLayoutWatch(container);
  };

  const schedule = () => {
    if (cancelled || aligned) return;
    window.clearTimeout(quietTimer);
    quietTimer = window.setTimeout(onReady, DOM_QUIET_MS);
  };

  const container = document.querySelector(DOCS_CONTENT_SELECTOR);
  if (container) {
    observer = new MutationObserver(schedule);
    observer.observe(container, { childList: true, subtree: true });
  }

  schedule();

  maxTimer = window.setTimeout(() => {
    if (!aligned) onReady();
  }, MAX_WAIT_MS);

  return () => {
    cancelled = true;
    observer?.disconnect();
    stopLayoutWatch();
    window.clearTimeout(quietTimer);
    window.clearTimeout(maxTimer);
    clearVerifyTimers();
  };
}
