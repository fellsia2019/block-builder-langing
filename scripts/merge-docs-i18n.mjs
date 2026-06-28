#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }
      deepMerge(target[key], value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

for (const locale of ['en', 'ru']) {
  const messagesPath = join(root, 'messages', `${locale}.json`);
  const messages = JSON.parse(readFileSync(messagesPath, 'utf8'));
  const additions = JSON.parse(
    readFileSync(join(__dirname, 'i18n-fragments', `${locale}-additions.json`), 'utf8'),
  );

  if (!messages.docsPages) {
    messages.docsPages = {};
  }
  deepMerge(messages.docsPages, additions);

  writeFileSync(messagesPath, `${JSON.stringify(messages, null, 2)}\n`);
  console.log(`Merged ${locale}-additions.json into messages/${locale}.json`);
}
