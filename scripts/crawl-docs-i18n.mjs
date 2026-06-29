#!/usr/bin/env node
/**
 * Crawl rendered doc pages and detect leaked translation keys (docsPages.*).
 */
const LOCALES = ['ru', 'en'];
const BASE = process.env.DOCS_BASE ?? 'http://localhost:3000';

const PATHS = [
  '/docs',
  '/docs/get-started',
  '/docs/changelog',
  '/docs/next',
  '/docs/nuxt',
  '/docs/react/getting-started',
  '/docs/react/components',
  '/docs/react/events',
  '/docs/vue/getting-started',
  '/docs/vue/components',
  '/docs/vue/events',
  '/docs/core/classes',
  '/docs/core/methods',
  '/docs/core/properties',
  '/docs/core/types',
  '/docs/core/form-fields',
  '/docs/core/utilities',
];

const KEY_RE = /docsPages\.[a-zA-Z0-9_.-]+/g;

async function fetchPage(url) {
  const res = await fetch(url, { headers: { Accept: 'text/html' } });
  const html = await res.text();
  return { url, status: res.status, html };
}

async function main() {
  const leaks = [];

  for (const locale of LOCALES) {
    for (const path of PATHS) {
      const url = `${BASE}/${locale}${path}`;
      try {
        const { status, html } = await fetchPage(url);
        const matches = [...new Set(html.match(KEY_RE) ?? [])];
        if (matches.length) {
          leaks.push({ url, status, keys: matches });
        }
        if (status !== 200) {
          console.warn(`WARN ${status} ${url}`);
        }
      } catch (error) {
        console.error(`FAIL ${url}:`, error.message);
        process.exitCode = 1;
        return;
      }
    }
  }

  if (leaks.length === 0) {
    console.log(`OK: no leaked docsPages.* keys on ${PATHS.length * LOCALES.length} pages`);
    return;
  }

  console.log(`Leaked keys on ${leaks.length} page(s):\n`);
  for (const { url, keys } of leaks) {
    console.log(url);
    keys.forEach((k) => console.log(`  ${k}`));
    console.log('');
  }
  process.exitCode = 1;
}

main();
