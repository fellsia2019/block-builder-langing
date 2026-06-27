'use client';

import { useEffect, useState, type RefObject } from 'react';
import type { TocItem } from './TableOfContents';

function slugify(text: string): string {
  return (
    text
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\u0400-\u04ff]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'section'
  );
}

function collectTocItems(container: HTMLElement): TocItem[] {
  const used = new Set<string>();
  const items: TocItem[] = [];

  container.querySelectorAll('h2, h3').forEach((node) => {
    if (!(node instanceof HTMLElement)) return;

    if (!node.id) {
      const base = slugify(node.textContent ?? 'section');
      let id = base;
      let n = 2;
      while (used.has(id) || document.getElementById(id)) {
        id = `${base}-${n++}`;
      }
      node.id = id;
    }

    used.add(node.id);
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
      attributes: true,
      attributeFilter: ['id'],
    });

    window.addEventListener('resize', update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [containerRef, pathname]);

  return items;
}
