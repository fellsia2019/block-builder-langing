#!/usr/bin/env node
/**
 * Finds translation keys that would show as raw paths in the UI:
 * - used via t() / t.rich() (not t.raw)
 * - string fails ICU parse OR key is missing
 */
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

/** ICU treats `<tag>...</tag>` as rich placeholders — unsafe with plain t(). */
function hasRichTagPlaceholders(message) {
  const withoutCode = message.replace(/<code>[\s\S]*?<\/code>/g, '');
  return /<([a-zA-Z][\w-]*)>/.test(withoutCode);
}

function extractTranslatorBindings(source) {
  const bindings = [];
  const re = /(?:const|let)\s+(\w+)\s*=\s*useTranslations\(\s*['"`]([^'"`]+)['"`]\s*\)/g;
  let match;
  while ((match = re.exec(source))) {
    bindings.push({ varName: match[1], namespace: match[2] });
  }
  return bindings;
}

function resolveNamespace(varName, bindings) {
  return bindings.find((b) => b.varName === varName)?.namespace ?? null;
}

const docsFiles = walk(join(ROOT, 'src/app/[locale]/docs'));
const broken = [];

for (const file of docsFiles) {
  const source = readFileSync(file, 'utf8');
  const rel = relative(ROOT, file);
  const bindings = extractTranslatorBindings(source);

  // t('key') or t("key") — not t.raw
  const patterns = [
    /\b(\w+)\(\s*['"`]([^'"`$]+)['"`]\s*(?:,\s*\{[^}]*\})?\s*\)/g,
    /\$\{\s*(\w+)\(\s*['"`]([^'"`$]+)['"`]\s*(?:,\s*\{[^}]*\})?\s*\)\s*\}/g,
  ];

  for (const tCallRe of patterns) {
  let match;
  while ((match = tCallRe.exec(source))) {
    const varName = match[1];
    const key = match[2];
    const start = match.index;
    const before = source.slice(Math.max(0, start - 8), start);
    if (before.endsWith('.raw')) continue;

    const namespace = resolveNamespace(varName, bindings);
    if (!namespace) continue;
    if (!namespace.startsWith('docsPages') && !namespace.startsWith('docs.')) continue;

    const fullPath = `${namespace}.${key}`;

    for (const locale of LOCALES) {
      const value = getByPath(messagesByLocale[locale], fullPath);
      if (typeof value !== 'string') {
        broken.push({ file: rel, fullPath, locale, issue: 'MISSING', mode: 't()', preview: null });
        continue;
      }
      const error = tryParse(value);
      const richTags = hasRichTagPlaceholders(value);
      if (error || richTags) {
        broken.push({
          file: rel,
          fullPath,
          locale,
          issue: error ?? 'RICH_TAG_PLACEHOLDER',
          mode: 't()',
          preview: value.slice(0, 100),
        });
      }
    }
  }
  }
}

const unique = new Map();
for (const item of broken) {
  unique.set(`${item.fullPath}|${item.issue}`, item);
}

console.log(`Scanned ${docsFiles.length} docs files`);
console.log(`User-visible broken keys: ${unique.size}\n`);

if (unique.size === 0) {
  console.log('All t() usages resolve to valid ICU strings.');
  process.exit(0);
}

for (const item of [...unique.values()].sort((a, b) => a.fullPath.localeCompare(b.fullPath))) {
  console.log(`${item.fullPath}`);
  console.log(`  ${item.issue}`);
  console.log(`  ${item.file}`);
  if (item.preview) console.log(`  preview: ${JSON.stringify(item.preview)}`);
  console.log('');
}

process.exit(1);
