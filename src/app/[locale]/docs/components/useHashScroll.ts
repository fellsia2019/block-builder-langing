'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { clearDocHeadingHighlight, scrollToDocHeading } from './docsScrollOffset';

const MAX_ATTEMPTS = 30;
const RETRY_MS = 50;

function scrollToCurrentHash(behavior: ScrollBehavior = 'smooth'): boolean {
  const id = window.location.hash.slice(1);
  if (!id) return true;
  return scrollToDocHeading(id, behavior, { highlight: true });
}

export function useHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) {
      clearDocHeadingHighlight();
      return;
    }

    let highlightUsed = false;

    const tryScroll = (): boolean => {
      const ok = scrollToDocHeading(id, 'smooth', highlightUsed ? undefined : { highlight: true });
      if (ok) highlightUsed = true;
      return ok;
    };

    if (tryScroll()) return;

    let attempts = 0;
    const timer = window.setInterval(() => {
      if (tryScroll() || ++attempts >= MAX_ATTEMPTS) {
        window.clearInterval(timer);
      }
    }, RETRY_MS);

    return () => window.clearInterval(timer);
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => scrollToCurrentHash();
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
}
