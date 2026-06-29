'use client';

import { useTranslations } from 'next-intl';
import DocImportantNote from './DocImportantNote';
import { docRichTags, renderDocRichString } from './docRichTags';

interface UploadUrlImportantNoteProps {
  className?: string;
}

export default function UploadUrlImportantNote({ className }: UploadUrlImportantNoteProps) {
  const t = useTranslations('docsPages.components.uploadUrlImportantNote');

  return (
    <DocImportantNote
      className={className}
      detailHref="/docs/core/form-fields#image"
      detailLabel={t('detailLabel')}
    >
      {renderDocRichString(t.raw('text') as string, {
        ...docRichTags,
        strong: (chunks) => <strong>{chunks}</strong>,
      })}
    </DocImportantNote>
  );
}
