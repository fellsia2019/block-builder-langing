'use client';

import DocImportantNote from './DocImportantNote';

interface UploadUrlImportantNoteProps {
  className?: string;
}

export default function UploadUrlImportantNote({ className }: UploadUrlImportantNoteProps) {
  return (
    <DocImportantNote
      className={className}
      detailHref="/docs/core/form-fields#image"
      detailLabel="Подробнее — поля image и file"
    >
      <strong>Важно:</strong> При использовании{' '}
      <code className="text-yellow-700 dark:text-yellow-400">uploadUrl</code> (загрузка через сервер API
      клиента) ответ сервера <strong>ОБЯЗАТЕЛЬНО</strong> должен быть объектом с полем{' '}
      <code className="text-yellow-700 dark:text-yellow-400">src</code>, содержащим URL изображения. Если
      формат ответа отличается, используйте{' '}
      <code className="text-yellow-700 dark:text-yellow-400">responseMapper</code> для преобразования ответа к
      виду объекта с вашими полями и обязательным полем{' '}
      <code className="text-yellow-700 dark:text-yellow-400">src</code>.
    </DocImportantNote>
  );
}
