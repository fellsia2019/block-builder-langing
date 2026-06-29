#!/usr/bin/env node
/**
 * View-source audit: fetch rendered HTML for every docs page × locale,
 * strip embedded JS/RSC payloads, then search for i18n key paths.
 *
 * If a full key like `docsPages.core.classes.title` appears in the
 * remaining HTML, next-intl failed and showed the key instead of text.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
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

/** Message roots used on /docs pages */
const MESSAGE_ROOTS = ['docsPages', 'docs'];

function flattenMessages(obj, prefix = '') {
  const paths = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      paths.push(path);
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      paths.push(...flattenMessages(value, path));
    } else if (Array.isArray(value) && value.every((v) => typeof v === 'string')) {
      value.forEach((_, index) => paths.push(`${path}.${index}`));
    }
  }
  return paths;
}

function loadKeySet(locale) {
  const messages = JSON.parse(readFileSync(join(ROOT, `messages/${locale}.json`), 'utf8'));
  const keys = new Set();
  for (const root of MESSAGE_ROOTS) {
    if (!messages[root]) continue;
    for (const rel of flattenMessages(messages[root], root)) {
      keys.add(rel);
    }
  }
  return keys;
}

/** Remove payloads where the whole locale JSON is embedded (false positives). */
function visibleHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '');
}

function visibleText(html) {
  return visibleHtml(html)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function findLeakedKeys(html, keySet) {
  const body = visibleHtml(html);
  const text = visibleText(html);
  const leaked = [];

  for (const key of keySet) {
    // Keys only leak as full dotted paths, not as JSON property names alone.
    if (body.includes(key) || text.includes(key)) {
      leaked.push(key);
    }
  }

  return leaked.sort();
}

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { Accept: 'text/html' },
    redirect: 'follow',
  });
  return { status: res.status, html: await res.text(), url: res.url };
}

async function main() {
  const keySets = Object.fromEntries(LOCALES.map((locale) => [locale, loadKeySet(locale)]));
  const totalKeys = keySets[LOCALES[0]].size;
  const leaks = [];

  console.log(`Loaded ${totalKeys} keys per locale from ${MESSAGE_ROOTS.join(', ')}`);
  console.log(`Crawling ${PATHS.length} paths × ${LOCALES.length} locales...\n`);

  for (const locale of LOCALES) {
    for (const path of PATHS) {
      const url = `${BASE}/${locale}${path}`;
      try {
        const { status, html, url: finalUrl } = await fetchPage(url);
        if (status !== 200) {
          console.warn(`WARN HTTP ${status} ${url}`);
          continue;
        }

        const found = findLeakedKeys(html, keySets[locale]);
        if (found.length) {
          leaks.push({ url: finalUrl, locale, keys: found });
        }
      } catch (error) {
        console.error(`FAIL ${url}: ${error.message}`);
        console.error('Start dev server: npm run dev');
        process.exitCode = 1;
        return;
      }
    }
  }

  const pages = PATHS.length * LOCALES.length;
  if (leaks.length === 0) {
    console.log(`OK: no locale keys in visible HTML on ${pages} pages`);
    return;
  }

  console.log(`Leaked keys on ${leaks.length} page(s):\n`);
  for (const { url, keys } of leaks) {
    console.log(url);
    for (const key of keys) console.log(`  ${key}`);
    console.log('');
  }
  process.exitCode = 1;
}

main();
