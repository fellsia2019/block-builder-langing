#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const LOCALES = ['ru', 'en'];

function sanitizeMessage(value) {
  if (typeof value !== 'string') return value;

  let next = value.replace(/<code>([\s\S]*?)<\/code>/g, (_, inner) => {
    return `<code>${inner.replace(/'/g, '"')}</code>`;
  });

  // ICU treats { as placeholder start — reword common object-literal snippets in prose
  next = next
    .replace(/<code>\{\s*src,\s*width,\s*height,\s*size\s*\}<\/code>/g, '<code>src, width, height, size</code>')
    .replace(/<code>\{\s*value:\s*'\.\.\.'[^<]*\}<\/code>/g, '<code>value, label, disabled?</code>')
    .replace(/format \[\{ value:/g, 'format [value, label, disabled?] — e.g. [{ value:');

  return next;
}

function walkStrings(obj) {
  if (typeof obj === 'string') return sanitizeMessage(obj);
  if (Array.isArray(obj)) return obj.map(walkStrings);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, walkStrings(v)]));
  }
  return obj;
}

for (const locale of LOCALES) {
  const path = join(ROOT, `messages/${locale}.json`);
  const json = JSON.parse(readFileSync(path, 'utf8'));
  if (json.docsPages) json.docsPages = walkStrings(json.docsPages);
  writeFileSync(path, `${JSON.stringify(json, null, 2)}\n`, 'utf8');
  console.log(`Sanitized messages/${locale}.json`);
}

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (/\.tsx?$/.test(entry)) files.push(full);
  }
  return files;
}

const docsDir = join(ROOT, 'src/app/[locale]/docs');
const files = walk(docsDir);

for (const file of files) {
  let source = readFileSync(file, 'utf8');
  const original = source;

  if (!source.includes('t.rich(') && !source.includes('tCommon.rich(')) continue;

  if (!source.includes('renderDocRichString') && source.includes('docRichTags')) {
    source = source.replace(
      /import \{ docRichTags \} from ('[^']+'|"[^"]+");/,
      "import { docRichTags, renderDocRichString } from $1;",
    );
  } else if (!source.includes('renderDocRichString') && source.includes("from '../../components/docRichTags'") || source.includes("from '../components/docRichTags'")) {
    source = source.replace(
      /import \{([^}]+)\} from ('(?:@\/|\.\.)[^']*docRichTags');/,
      (match, imports, path) => {
        if (imports.includes('renderDocRichString')) return match;
        return `import {${imports.trim()}, renderDocRichString } from ${path};`;
      },
    );
  }

  source = source.replace(/\btCommon\.rich\(\s*(`[^`]+`|'[^']+'|"[^"]+")/g, 'renderDocRichString(tCommon.raw($1) as string');
  source = source.replace(/\bt\.rich\(\s*(`(?:\\`|[^`])+`|'[^']+'|"[^"]+")/g, 'renderDocRichString(t.raw($1) as string');

  if (source !== original) {
    writeFileSync(file, source, 'utf8');
    console.log(`Updated ${file.replace(ROOT, '')}`);
  }
}

console.log('Done');
