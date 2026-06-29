#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parse } from '@formatjs/icu-messageformat-parser';

const ROOT = new URL('..', import.meta.url).pathname;
const LOCALES = ['ru', 'en'];

const messagesByLocale = Object.fromEntries(
  LOCALES.map((locale) => [
    locale,
    JSON.parse(readFileSync(join(ROOT, `messages/${locale}.json`), 'utf8')),
  ]),
);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (/\.tsx?$/.test(entry)) files.push(full);
  }
  return files;
}

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

function tryParse(message) {
  try {
    parse(message, { ignoreTag: false });
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
}

const docsFiles = walk(join(ROOT, 'src/app/[locale]/docs'));

const usagePatterns = [
  { mode: 'rich', re: /\bt(?:Common)?\.rich\(\s*['`]([^'"`]+)['`]/g },
  { mode: 'rich-template', re: /\bt(?:Common)?\.rich\(\s*`([^`]+)`/g },
  { mode: 't', re: /\bt(?:Common)?\(\s*['`]([^'"`]+)['`]/g },
  { mode: 't-template', re: /\bt(?:Common)?\(\s*`([^`]+)`/g },
];

const namespacePatterns = [
  { re: /useTranslations\(\s*['`](docsPages\.[^'"`]+)['`]/g, prefix: '' },
  { re: /useTranslations\(\s*['`](docs\.[^'"`]+)['`]/g, prefix: '' },
];

const usages = [];

for (const file of docsFiles) {
  const source = readFileSync(file, 'utf8');
  const rel = relative(ROOT, file);

  const namespaces = [];
  for (const { re } of namespacePatterns) {
    re.lastIndex = 0;
    let match;
    while ((match = re.exec(source))) namespaces.push(match[1]);
  }
  if (!namespaces.length) continue;

  for (const ns of [...new Set(namespaces)]) {
    for (const { mode, re } of usagePatterns) {
      re.lastIndex = 0;
      let match;
      while ((match = re.exec(source))) {
        const key = match[1];
        if (key.includes('${')) continue;
        usages.push({ file: rel, namespace: ns, key, mode });
      }
    }
  }
}

const broken = [];

for (const usage of usages) {
  if (usage.mode === 'rich-template' || usage.mode === 't-template') continue;
  const fullPath = `${usage.namespace}.${usage.key}`;

  for (const locale of LOCALES) {
    const value = getByPath(messagesByLocale[locale], fullPath);
    if (typeof value !== 'string') {
      broken.push({ ...usage, locale, issue: 'MISSING', fullPath, preview: null });
      continue;
    }
    const error = tryParse(value);
    if (error) {
      broken.push({ ...usage, locale, issue: error, fullPath, preview: value.slice(0, 100) });
    }
  }
}

const unique = new Map();
for (const item of broken) {
  unique.set(`${item.fullPath}|${item.mode}|${item.issue}`, item);
}

console.log(`Scanned ${docsFiles.length} docs files, ${usages.length} translation usages`);
console.log(`Broken visible usages: ${unique.size}\n`);

for (const item of [...unique.values()].sort((a, b) => a.fullPath.localeCompare(b.fullPath))) {
  console.log(`${item.fullPath}`);
  console.log(`  mode: ${item.mode}, issue: ${item.issue}`);
  console.log(`  file: ${item.file}`);
  if (item.preview) console.log(`  preview: ${JSON.stringify(item.preview)}`);
  console.log('');
}

process.exit(unique.size ? 1 : 0);
