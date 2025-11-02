'use client';

import NextPageLink from '../../components/NextPageLink';
import CodeBlock from '@/components/CodeBlock';
import type { NavigationProps } from '../../types';

export default function CustomRenderersSection({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Кастомные рендереры</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Создание собственных рендереров полей
        </p>
      </div>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Создание кастомного рендерера</h2>
        <CodeBlock
          code={`class CustomFieldRenderer {
  id = 'my-custom-field'
  name = 'Моё кастомное поле'
  
  render(container, context) {
    const { value, onChange } = context
    // Ваша логика рендеринга
    return {
      element: container,
      getValue: () => value,
      setValue: (v) => onChange(v),
      destroy: () => {}
    }
  }
}

blockBuilder.registerCustomFieldRenderer(new CustomFieldRenderer())`}
          language="javascript"
          className="mb-4"
        />
      </section>
    </div>
  );
}

