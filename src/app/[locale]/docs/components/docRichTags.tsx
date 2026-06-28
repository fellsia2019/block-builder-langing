import type { ReactNode } from 'react';

export const docRichTags = {
  code: (chunks: ReactNode) => (
    <code className="text-primary-700 dark:text-primary-400">{chunks}</code>
  ),
  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
};
