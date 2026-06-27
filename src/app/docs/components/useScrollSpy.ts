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

    let rafId = 0;

    const update = () => {
      const scrollLine = window.scrollY + getDocsScrollOffset();
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 48;

      const next = nearBottom
        ? ids[ids.length - 1]
        : ids.reduce((current, id) => {
            const el = document.getElementById(id);
            return el && getHeadingTop(el) <= scrollLine ? id : current;
          }, ids[0]);

      setActiveId((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids.join('|')]);

  return activeId;
}
