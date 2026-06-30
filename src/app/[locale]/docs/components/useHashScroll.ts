'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  clearDocHeadingHighlight,
  scrollToDocHeading,
  scrollToDocHeadingWhenReady,
  syncDocsScrollOffset,
} from './docsScrollOffset';

if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function scrollToCurrentHash(behavior: ScrollBehavior = 'smooth'): boolean {
  const id = window.location.hash.slice(1);
  if (!id) return true;
  return scrollToDocHeading(id, behavior, { highlight: true });
}

export function useHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    syncDocsScrollOffset();

    const id = window.location.hash.slice(1);
    if (!id) {
      clearDocHeadingHighlight();
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    return scrollToDocHeadingWhenReady(id, { highlight: true });
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => scrollToCurrentHash();
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
}
