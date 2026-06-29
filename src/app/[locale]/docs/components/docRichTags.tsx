import type { ReactNode } from 'react';

export const docRichTags = {
  code: (chunks: ReactNode) => (
    <code className="text-primary-700 dark:text-primary-400">{chunks}</code>
  ),
  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
};

type RichTagHandler = (chunks: ReactNode) => ReactNode;

function buildTagPattern(tagNames: string[]) {
  const escaped = tagNames.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return new RegExp(`<(${escaped.join('|')})>([\\s\\S]*?)<\\/\\1>`, 'g');
}

/** Renders doc strings with rich tags without ICU parsing (avoids broken translation keys). */
export function renderDocRichString(
  text: string,
  tags: Record<string, RichTagHandler> = {},
): ReactNode {
  const handlers: Record<string, RichTagHandler> = { ...docRichTags, ...tags };
  const pattern = buildTagPattern(Object.keys(handlers));

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  pattern.lastIndex = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, tag, content] = match;
    const render = handlers[tag];
    if (render) {
      parts.push(<span key={key++}>{render(content)}</span>);
    } else {
      parts.push(text.slice(match.index, match.index + match[0].length));
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : parts;
}
