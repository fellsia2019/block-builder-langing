'use client';

import { useEffect, useState, type RefObject } from 'react';
import type { TocItem } from './TableOfContents';

function collectTocItems(container: HTMLElement): TocItem[] {
  const items: TocItem[] = [];

  container.querySelectorAll('h2[id], h3[id]').forEach((node) => {
    if (!(node instanceof HTMLElement) || !node.id) return;

    items.push({
      id: node.id,
      title: node.textContent?.replace(/\s+/g, ' ').trim() ?? node.id,
      level: node.tagName === 'H3' ? 3 : 2,
    });
  });

  return items.length >= 1 ? items : [];
}

export function useAutoToc(
  containerRef: RefObject<HTMLElement | null>,
  pathname: string
): TocItem[] {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      setItems(collectTocItems(container));
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    window.addEventListener('resize', update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [containerRef, pathname]);

  return items;
}
