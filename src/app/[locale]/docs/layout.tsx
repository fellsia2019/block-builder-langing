import type { ReactNode } from 'react';
import Script from 'next/script';
import DocsLayout from './components/DocsLayout';

export default function DocsRootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Script id="docs-scroll-init" strategy="beforeInteractive">
        {`if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
document.documentElement.style.setProperty('--docs-scroll-offset', '80px');
document.documentElement.style.scrollBehavior = 'auto';
scrollTo({ top: 0, left: 0, behavior: 'instant' });`}
      </Script>
      <DocsLayout>{children}</DocsLayout>
    </>
  );
}
