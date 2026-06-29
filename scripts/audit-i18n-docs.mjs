#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { parse } from '@formatjs/icu-messageformat-parser';

const LOCALES = ['ru', 'en'];
const ROOTS = ['docsPages', 'docs'];

function flattenMessages(obj, prefix = '') {
  const entries = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      entries.push(...flattenMessages(value, path));
    } else if (typeof value === 'string') {
      entries.push([path, value]);
    } else if (Array.isArray(value) && value.every((v) => typeof v === 'string')) {
      value.forEach((item, index) => entries.push([`${path}.${index}`, item]));
    }
  }
  return entries;
}

function tryParse(message, locale) {
  try {
    parse(message, { ignoreTag: false });
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
}

function riskHints(message) {
  const hints = [];
  if (/<code>[^<]*'[^<]*<\/code>/.test(message)) hints.push('single-quotes-in-code');
  if (/<[A-Za-z][A-Za-z0-9]*>/.test(message.replace(/<code>[\s\S]*?<\/code>/g, ''))) {
    hints.push('angle-brackets-outside-code');
  }
  if (/Partial<|Record<|Promise<|Array<|Map</.test(message)) hints.push('typescript-generics');
  if (/<code>[^<]*\[[^\]]*\][^<]*<\/code>/.test(message)) hints.push('brackets-in-code');
  return hints;
}

const allFailures = [];

for (const locale of LOCALES) {
  const messages = JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), 'utf8'));
  const entries = ROOTS.flatMap((root) => {
    if (!messages[root]) return [];
    return flattenMessages(messages[root], root).map(([path, value]) => ({ locale, path, value }));
  });

  for (const { locale: loc, path, value } of entries) {
    const error = tryParse(value, loc);
    if (error) {
      allFailures.push({ locale: loc, path, error, hints: riskHints(value), value: value.slice(0, 120) });
    }
  }
}

console.log(`Checked ${LOCALES.length} locales under ${ROOTS.join(', ')}`);
console.log(`Failures: ${allFailures.length}\n`);

if (allFailures.length === 0) {
  console.log('No ICU parse failures found.');
  process.exit(0);
}

const grouped = new Map();
for (const item of allFailures) {
  const key = item.path.replace(/\.(ru|en)$/, '');
  if (!grouped.has(item.path)) grouped.set(item.path, []);
  grouped.get(item.path).push(item);
}

for (const [path, items] of [...grouped.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  console.log(`\n${path}`);
  for (const item of items) {
    console.log(`  [${item.locale}] ${item.error}`);
    if (item.hints.length) console.log(`    hints: ${item.hints.join(', ')}`);
    console.log(`    preview: ${JSON.stringify(item.value)}`);
  }
}

process.exit(1);
