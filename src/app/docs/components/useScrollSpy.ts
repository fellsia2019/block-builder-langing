'use client';

import { useEffect, useState } from 'react';
import { getDocsScrollOffset } from './docsScrollOffset';

function getHeadingTop(el: HTMLElement): number {
  return el.getBoundingClientRect().top + window.scrollY;
}

/**
 * Активный пункт TOC — последний заголовок, чья верхняя граница
 * уже прошла линию под fixed-шапкой.
 */
export function useScrollSpy(ids: string[]): string {
  const [activeId, setActiveId] = useState(ids[0] ?? '');

  useEffect(() => {
    if (ids.length === 0) return;

    const update = () => {
      const scrollLine = window.scrollY + getDocsScrollOffset();
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 48;

      if (nearBottom) {
        setActiveId(ids[ids.length - 1]);
        return;
      }

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && getHeadingTop(el) <= scrollLine) {
          current = id;
        }
      }
      setActiveId(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    document.addEventListener('scroll', update, { passive: true, capture: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      document.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [ids.join('|')]);

  return activeId;
}
