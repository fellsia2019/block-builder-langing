'use client';

import { useEffect, useState } from 'react';
import { findDocHeading, getDocsScrollOffset } from './docsScrollOffset';

function getHeadingTop(el: HTMLElement): number {
  return el.getBoundingClientRect().top + window.scrollY;
}

function resolveActiveId(ids: string[]): string {
  const hash = window.location.hash.slice(1);
  if (hash && ids.includes(hash) && findDocHeading(hash)) {
    const el = findDocHeading(hash)!;
    const top = el.getBoundingClientRect().top;
    const offset = getDocsScrollOffset();
    if (top >= offset - 32 && top <= offset + 240) {
      return hash;
    }
  }

  const scrollLine = window.scrollY + getDocsScrollOffset();
  const nearBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 48;

  if (nearBottom) return ids[ids.length - 1];

  return ids.reduce((current, id) => {
    const el = findDocHeading(id);
    return el && getHeadingTop(el) <= scrollLine ? id : current;
  }, ids[0]);
}

function getInitialActiveId(ids: string[]): string {
  if (typeof window === 'undefined' || ids.length === 0) return '';
  const hash = window.location.hash.slice(1);
  if (hash && ids.includes(hash)) return hash;
  return ids[0];
}

export function useScrollSpy(ids: string[]): string {
  const [activeId, setActiveId] = useState(() => getInitialActiveId(ids));

  useEffect(() => {
    if (ids.length === 0) return;

    setActiveId(getInitialActiveId(ids));

    let rafId = 0;

    const update = () => {
      const next = resolveActiveId(ids);
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
