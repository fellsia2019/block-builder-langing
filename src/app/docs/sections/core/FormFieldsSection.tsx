'use client';

import CodeBlock from '@/components/CodeBlock';
import Icon from '@/components/Icon';
import { DEMO_BB_URL } from '@/lib/urls';
import type { NavigationProps } from '../../types';

function FieldTypeCard({ 
  name, 
  description, 
  icon, 
  example,
  parameters
}: { 
  name: string; 
  description: string; 
  icon: string;
  example?: string;
  parameters?: string[];
}) {
  return (
    <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-900/10 rounded-lg p-4 border border-pink-200 dark:border-pink-800 relative">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-2xl flex items-center">
          {icon === '📝' && <Icon name="pen" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '📄' && <Icon name="document" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '📧' && <Icon name="email" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🔗' && <Icon name="link" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🔢' && <Icon name="number" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '📋' && <Icon name="clipboard" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '☑️' && <Icon name="checkbox" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🔘' && <Icon name="radio" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🎨' && <Icon name="paintbrush" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🖼️' && <Icon name="image" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🔧' && <Icon name="settings" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🔌' && <Icon name="plugin" size={28} className="text-pink-600 dark:text-pink-400" />}
        </div>
        <h3 className="font-bold text-gray-900 dark:text-white">
          <code className="text-pink-700 dark:text-pink-400">{name}</code>
        </h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>
      {parameters && parameters.length > 0 && (
        <div className="mb-2">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Параметры:</p>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            {parameters.map((param, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-pink-500 mr-1">•</span>
                <code className="text-xs">{param}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
      {example && (
        <div className="mt-3">
          <CodeBlock code={example} language="javascript" className="text-xs" />
        </div>
      )}
    </div>
  );
}

export default function FormFieldsSection({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Поля форм</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Типы полей и кастомные рендереры для форм редактирования и создания блоков
        </p>
      </div>

      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Что нового в 1.8.0</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
          <li>
            <code className="text-indigo-700 dark:text-indigo-400">formScope</code> в{' '}
            <code className="text-indigo-700 dark:text-indigo-400">ICustomFieldContext</code> — доступ custom field к{' '}
            <code>formData</code>, <code>setField(name, value)</code> и контексту repeater (
            <code>updateItemField</code>). Vue 3 и React
          </li>
          <li>
            <code className="text-indigo-700 dark:text-indigo-400">optionsFrom</code> для <code>select</code> — динамические опции из другого поля формы
            (в т.ч. группы через <code>group</code> на option)
          </li>
          <li>
            <code className="text-indigo-700 dark:text-indigo-400">file-import</code> — action-only поле: POST multipart,{' '}
            <code>fileImportConfig.merge</code> (append/replace + <code>dedupeBy</code>), callback{' '}
            <code>onImport(&#123; data, formScope, mergeStats &#125;)</code>; не сохраняется в props
          </li>
          <li>
            <code className="text-indigo-700 dark:text-indigo-400">persist: false</code> — поле исключается из <code>block.props</code> при save
            (рекурсивно в repeater). У <code>file-import</code> — implicit <code>persist: false</code>
          </li>
          <li>
            Утилиты из <code>core</code>: <code>mergeImportedArray</code>, <code>applyFileImportMergeRules</code>,{' '}
            <code>formatFileImportMergeMessage</code>, <code>resolveDynamicSelectOptions</code>, <code>stripNonPersistedFields</code>
          </li>
          <li>
            Демо блок <strong>formFeaturesDemo</strong> — в{' '}
            <a href="https://block-builder-demo.vercel.app/vue3" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">demo-bb</a>{' '}
            (Vue/React) и <code>block-builder/examples</code>
          </li>
        </ul>
        <div className="mt-4">
          <CodeBlock
            language="javascript"
            code={`{
  field: '_xlsxImport',
  label: 'Импорт из XLSX',
  type: 'file-import',
  fileImportConfig: {
    accept: ['.xlsx'],
    uploadUrl: '/api/demo/parse-xlsx',
    formDataKey: 'file',
    merge: [
      {
        targetField: 'items',
        sourceKey: 'data.cards',
        mode: 'append',
        dedupeBy: 'title',
        mapItem: card => ({ title: card.title, filters: card.filters ?? [] })
      }
    ],
    onImport: ({ data, formScope }) => {
      // Доп. merge в onImport через formScope.setField(...)
    }
  }
},
{
  field: 'categoryFilter',
  label: 'Фильтр',
  type: 'select',
  optionsFrom: {
    source: 'filterOptions',
    when: formData => formData.showFilterOptions,
    map: group => ({
      label: group.name,
      options: group.options.map(o => ({ value: o.name, label: o.name }))
    })
  }
},
{
  field: '_helper',
  label: 'Служебное (не в JSON)',
  type: 'text',
  persist: false
}`}
          />
        </div>
      </section>

      <section className="bg-sky-50 dark:bg-sky-900/20 rounded-xl p-6 border-l-4 border-sky-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Что нового в 1.7.0</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
          <li>
            <code className="text-sky-700 dark:text-sky-400">formHooks</code> в конфиге типа блока — lifecycle модалки create/edit:
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>
                <code>onFormOpen</code> — после defaults/props, до редактирования: async загрузка,{' '}
                <code>setField(name, value)</code>; индикатор <code>isFormHydrating</code>
              </li>
              <li>
                <code>onBeforeSave</code> — после валидации, до записи блока: финальные <code>props</code> или{' '}
                <code>{'{ cancel: true }'}</code>
              </li>
            </ul>
          </li>
          <li>
            <strong>Vue 3 и React</strong> — полная поддержка; <strong>Pure JS не поддерживает</strong> <code>formHooks</code>
          </li>
          <li>
            Экспорт типов: <code>IBlockFormHooks</code>, <code>IBlockFormOpenContext</code>, <code>IBlockFormSaveContext</code>,{' '}
            <code>IBlockFormSaveResult</code>, <code>IBlockTypeConfig</code> — из <code>core</code>, <code>vue</code>, <code>react</code>
          </li>
          <li>
            Кейс test-bb: блок <strong>constructor-form</strong> — repeater + <code>formHooks</code> + mock CRUD формы (без custom field редактора схемы)
          </li>
        </ul>
        <div className="mt-4">
          <CodeBlock
            language="javascript"
            code={`{
  type: 'my-block',
  label: 'Мой блок',
  fields: [/* ... */],
  formHooks: {
    async onFormOpen({ props, setField, mode }) {
      if (mode === 'edit' && props.formId) {
        const data = await fetch(\`/api/forms/\${props.formId}\`).then(r => r.json())
        setField('formFields', data.fields)
      }
    },
    async onBeforeSave({ formData, mode, blockId }) {
      const saved = await saveFormToApi(formData)
      const { formFields, ...rest } = formData
      return { props: { ...rest, formId: saved.id } }
    },
  },
}`}
          />
        </div>
      </section>

      <section className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border-l-4 border-emerald-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Что нового в 1.6.0</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
          <li>
            <code className="text-emerald-700 dark:text-emerald-400">matrix-table</code> — редактор таблицы в форме блока
            (колонки, строки, типы ячеек, изображения). <strong>Vue 3 и React</strong>; в Pure JS — через{' '}
            <code>custom</code>
          </li>
          <li>Единый SVG-спрайт иконок в контролах (стрелки, chevron, check, loader, delete, close)</li>
          <li>Обновлён порядок кнопок блока и UX сворачивания repeater</li>
          <li>
            Демо блока «Таблица» — в{' '}
            <a href={DEMO_BB_URL} className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">
              demo-bb
            </a>{' '}
            (Vue/React) и в <code>block-builder/examples</code> (включая Nuxt)
          </li>
        </ul>
      </section>

      <section className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-xl p-6 border-l-4 border-fuchsia-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Что нового в 1.5.5</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
          <li>
            <code className="text-fuchsia-700 dark:text-fuchsia-400">select</code> с{' '}
            <code className="text-fuchsia-700 dark:text-fuchsia-400">multiple: true</code> — множественный выбор во Vue, React и Pure JS
          </li>
          <li>
            Утилита <code className="text-fuchsia-700 dark:text-fuchsia-400">resolveFormFieldDefaultValue</code> — дефолт{' '}
            <code>[]</code> для multi-select и upload-полей
          </li>
          <li>UX тегов и сводки выбранных значений в CustomDropdown (Vue/React)</li>
          <li>Исправлено восстановление multi-select при редактировании блока в Pure JS</li>
        </ul>
      </section>

      <section className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-6 border-l-4 border-violet-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Что нового в 1.5.0</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
          <li>
            <code className="text-violet-700 dark:text-violet-400">block-anchor</code> — выбор якоря на блок страницы (
            <code>#block-id</code>) или произвольного URL в форме. <strong>Скролл и поведение ссылки — в ваших компонентах блоков</strong>, пакет только сохраняет значение
          </li>
          <li>
            <code className="text-violet-700 dark:text-violet-400">file</code> / <code className="text-violet-700 dark:text-violet-400">files</code> — отдельный UI загрузки файлов (не как у изображений), одиночный и множественный режим, <code>maxCount</code>
          </li>
          <li>Множественные <code>image</code> / <code>file</code> в Pure JS; исправлено сохранение upload-полей</li>
          <li>Кнопки repeater и file-picker на общих стилях <code>bb-btn</code></li>
        </ul>
      </section>

      <section className="bg-slate-50 dark:bg-slate-900/20 rounded-xl p-6 border-l-4 border-slate-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Pure JS: что поддерживается</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Pure JS UI развивается <strong>выборочно</strong> вместе с пакетом — это не «замороженная» ветка 1.0.30.
          Core API и большинство типов полей доступны; отдельные UI-фичи Vue/React переносятся только при наличии pure-js renderer/initializer.
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="text-left p-2 border-b">Функция</th>
                <th className="text-center p-2 border-b">Vue</th>
                <th className="text-center p-2 border-b">React</th>
                <th className="text-center p-2 border-b">Pure JS</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr><td className="p-2 border-b"><code>block-anchor</code>, <code>file</code>, multi-upload</td><td className="text-center p-2 border-b">✓</td><td className="text-center p-2 border-b">✓</td><td className="text-center p-2 border-b">✓ (1.5.0+)</td></tr>
              <tr><td className="p-2 border-b"><code>select</code> + <code>multiple: true</code></td><td className="text-center p-2 border-b">✓</td><td className="text-center p-2 border-b">✓</td><td className="text-center p-2 border-b">✓ (1.5.5+)</td></tr>
              <tr><td className="p-2 border-b"><code>matrix-table</code></td><td className="text-center p-2 border-b">✓</td><td className="text-center p-2 border-b">✓</td><td className="text-center p-2 border-b">—</td></tr>
              <tr><td className="p-2 border-b"><code>dependsOn</code></td><td className="text-center p-2 border-b">✓</td><td className="text-center p-2 border-b">✓</td><td className="text-center p-2 border-b">—</td></tr>
              <tr><td className="p-2 border-b"><code>formHooks</code></td><td className="text-center p-2 border-b">✓</td><td className="text-center p-2 border-b">✓</td><td className="text-center p-2 border-b">—</td></tr>
              <tr><td className="p-2 border-b"><code>formScope</code>, <code>file-import</code>, <code>optionsFrom</code>, <code>persist: false</code></td><td className="text-center p-2 border-b">✓ (1.8.0+)</td><td className="text-center p-2 border-b">✓ (1.8.0+)</td><td className="text-center p-2 border-b">—</td></tr>
              <tr><td className="p-2"><code>ToggleControl</code> (checkbox + зависимые поля)</td><td className="text-center p-2">✓</td><td className="text-center p-2">✓</td><td className="text-center p-2">—</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Для отсутствующих в Pure JS возможностей используйте Vue/React UI или <code>type: &apos;custom&apos;</code> с собственным контролом.
        </p>
      </section>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Что такое поля форм?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Поля форм — это элементы интерфейса, которые используются в <strong>формах редактирования и создания блоков</strong>. 
          При конфигурации типа блока вы указываете массив полей (<code className="text-blue-700 dark:text-blue-400">fields</code>), 
          и BlockBuilder автоматически генерирует форму с соответствующими элементами управления.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Эти формы используются для:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
          <li>Создания новых блоков через UI</li>
          <li>Редактирования существующих блоков</li>
          <li>Настройки свойств (<code className="text-blue-700 dark:text-blue-400">props</code>) блока</li>
        </ul>
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="shield" size={22} className="text-teal-600 dark:text-teal-400" />
          Валидация в UI (1.4.0)
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          В готовых UI (Vue, React, Pure JS) валидация работает из коробки — дополнительная настройка не нужна.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
          <li>
            <strong>Индикатор ошибок в футере модалки</strong> — кнопка с количеством ошибок (
            <code className="text-teal-700 dark:text-teal-400">.bb-validation-error-indicator</code>).
            Клик скроллит к первому полю с ошибкой (тот же UX, что при «Сохранить» с ошибками).
          </li>
          <li>
            <strong>Реактивная валидация</strong> — после неуспешного submit ошибки обновляются при каждом изменении поля.
            Для кастомного UI см. <code className="text-teal-700 dark:text-teal-400">ReactiveFormValidationTracker</code> и{' '}
            <code className="text-teal-700 dark:text-teal-400">applyFormErrors</code> в разделе «Утилиты».
          </li>
          <li>
            <strong>CustomField (Vue/React)</strong> — <code>setError</code> у кастомного рендерера вызывается только при
            изменении текста ошибки: WYSIWYG-редактор не теряет фокус при реактивной валидации.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Пример использования</h2>
        <CodeBlock
          code={`const blockConfigs = {
  text: {
    title: 'Текстовый блок',
    fields: [
      {
        field: 'content',
        label: 'Содержимое',
        type: 'textarea',          // Стандартный тип поля
        placeholder: 'Введите текст...',
        defaultValue: '',
        rules: [
          { type: 'required' },  // message опционально, есть fallback
          { type: 'minLength', value: 1 }  // message опционально
        ]
      },
      {
        field: 'wysiwygContent',
        label: 'Rich Text',
        type: 'custom',            // Кастомный тип поля
        customFieldConfig: {
          rendererId: 'wysiwyg-editor'
        }
      }
    ],
    spacingOptions: {              // Автоматическое добавление spacing поля
      enabled: true,
      spacingTypes: ['padding-top', 'padding-bottom'],
      config: {
        min: 0,
        max: 200,
        step: 4
      }
    }
  }
}`}
          language="javascript"
          className="mb-4"
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Стандартные типы полей</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          BlockBuilder поддерживает набор стандартных типов полей, которые можно использовать сразу из коробки.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldTypeCard 
            name="text" 
            description="Однострочное текстовое поле для ввода короткого текста (заголовки, названия)" 
            icon="📝"
            example={`{
  field: 'title',
  label: 'Заголовок',
  type: 'text',
  placeholder: 'Введите заголовок...',
  defaultValue: ''
}`}
            parameters={['field', 'label', 'type', 'placeholder', 'defaultValue', 'rules']}
          />
          
          <FieldTypeCard 
            name="textarea" 
            description="Многострочное текстовое поле для длинного текста (описания, контент)" 
            icon="📄"
            example={`{
  field: 'content',
  label: 'Содержимое',
  type: 'textarea',
  placeholder: 'Введите текст...',
  defaultValue: ''
}`}
            parameters={['field', 'label', 'type', 'placeholder', 'defaultValue', 'rules']}
          />

          <FieldTypeCard 
            name="email" 
            description="Поле для ввода email адреса с автоматической валидацией формата" 
            icon="📧"
            example={`{
  field: 'contactEmail',
  label: 'Email',
  type: 'email',
  placeholder: 'example@mail.com',
  defaultValue: ''
}`}
            parameters={['field', 'label', 'type', 'placeholder', 'defaultValue', 'rules']}
          />

          <FieldTypeCard 
            name="url" 
            description="Поле для ввода URL адреса с автоматической валидацией формата" 
            icon="🔗"
            example={`{
  field: 'websiteUrl',
  label: 'Сайт',
  type: 'url',
  placeholder: 'https://example.com',
  defaultValue: ''
}`}
            parameters={['field', 'label', 'type', 'placeholder', 'defaultValue', 'rules']}
          />
          
          <FieldTypeCard 
            name="number" 
            description="Числовое поле для ввода чисел (размеры, количество, значения)" 
            icon="🔢"
            example={`{
  field: 'fontSize',
  label: 'Размер шрифта',
  type: 'number',
  defaultValue: 16,
  rules: [
    { type: 'min', value: 8 },
    { type: 'max', value: 72 }
  ]
}`}
            parameters={['field', 'label', 'type', 'defaultValue', 'rules']}
          />
          
          <FieldTypeCard 
            name="select" 
            description="Выпадающий список для выбора одного или нескольких значений из options. Одиночный режим — по умолчанию; множественный выбор через multiple: true (1.5.5+, Vue/React/Pure JS). С 1.8.0 — динамические options через optionsFrom из другого поля формы (Vue/React)."
            icon="📋"
            example={`// Одиночный выбор
{
  field: 'textAlign',
  label: 'Выравнивание',
  type: 'select',
  options: [
    { value: 'left', label: 'По левому краю' },
    { value: 'center', label: 'По центру' },
    { value: 'right', label: 'По правому краю', disabled: true }
  ],
  defaultValue: 'left'
}

// Множественный выбор (1.5.5+)
{
  field: 'topics',
  label: 'Темы',
  type: 'select',
  multiple: true,
  options: [
    { value: 'dev', label: 'Разработка' },
    { value: 'design', label: 'Дизайн' },
    { value: 'marketing', label: 'Маркетинг' }
  ],
  defaultValue: ['dev', 'design']  // массив value
}`}
            parameters={['field', 'label', 'type', 'options', 'multiple', 'defaultValue', 'rules']}
          />
          
          <FieldTypeCard 
            name="checkbox" 
            description="Чекбокс для булевых значений (true/false)" 
            icon="☑️"
            example={`{
  field: 'visible',
  label: 'Видимый',
  type: 'checkbox',
  defaultValue: true
}`}
            parameters={['field', 'label', 'type', 'defaultValue']}
          />
          
          <FieldTypeCard 
            name="radio" 
            description="Радио-кнопки для выбора одного значения из ограниченного набора" 
            icon="🔘"
            example={`{
  field: 'position',
  label: 'Позиция',
  type: 'radio',
  options: [
    { value: 'top', label: 'Сверху' },
    { value: 'bottom', label: 'Снизу' }
  ],
  defaultValue: 'top'
}`}
            parameters={['field', 'label', 'type', 'options', 'defaultValue']}
          />
          
          <FieldTypeCard 
            name="color" 
            description="Выбор цвета через color picker (HEX формат)" 
            icon="🎨"
            example={`{
  field: 'backgroundColor',
  label: 'Цвет фона',
  type: 'color',
  defaultValue: '#ffffff'
}`}
            parameters={['field', 'label', 'type', 'defaultValue']}
          />
          
          <FieldTypeCard 
            name="image" 
            description="Загрузка изображения с поддержкой base64 и серверной загрузки, автоматическим preview и валидацией" 
            icon="🖼️"
            example={`{
  field: 'image',
  label: 'Изображение',
  type: 'image',
  defaultValue: '',
  fileUploadConfig: {
    uploadUrl: '/api/upload',
    maxFileSize: 5 * 1024 * 1024,
    accept: 'image/*',
    responseMapper: (response) => ({
      src: response.url
    })
  }
}`}
            parameters={['field', 'label', 'type', 'defaultValue', 'fileUploadConfig', 'multiple', 'rules']}
          />

          <FieldTypeCard 
            name="file" 
            description="Загрузка файлов (PDF, DOC и др.) с отдельным UI: список имён файлов, не превью изображений. Поддержка multiple и maxCount." 
            icon="📄"
            example={`{
  field: 'files',
  label: 'Файлы',
  type: 'file',
  multiple: true,
  defaultValue: [],
  fileUploadConfig: {
    uploadUrl: '/api/upload',
    accept: '.pdf,.doc,.docx,.zip',
    maxCount: 5,
    responseMapper: (response) => response.url
  }
}`}
            parameters={['field', 'label', 'type', 'defaultValue', 'multiple', 'fileUploadConfig', 'rules']}
          />

          <FieldTypeCard 
            name="file-import" 
            description="Action-only импорт файла: POST multipart на uploadUrl, декларативный merge в другие поля формы (append/replace, dedupeBy) и onImport с formScope. Не сохраняется в block.props. Vue 3 и React (1.8.0+)." 
            icon="📥"
            example={`{
  field: '_import',
  label: 'Импорт данных',
  type: 'file-import',
  fileImportConfig: {
    accept: ['.xlsx', '.csv'],
    uploadUrl: '/api/import',
    formDataKey: 'file',
    maxSizeMb: 10,
    responseMapper: response => response,
    merge: [
      {
        targetField: 'items',
        sourceKey: 'data.items',
        mode: 'append',
        dedupeBy: 'id',
        mapItem: item => ({ id: item.id, title: item.title })
      }
    ],
    onImport: ({ data, formScope, mergeStats }) => {
      console.log('Imported', data, mergeStats)
    }
  }
}`}
            parameters={['field', 'label', 'type', 'fileImportConfig']}
          />

          <FieldTypeCard 
            name="block-anchor" 
            description="Якорь на блок страницы (#id) или URL. В форме — выбор из списка блоков; скролл и поведение ссылки — в вашем компоненте блока." 
            icon="🔗"
            example={`{
  field: 'url',
  label: 'Якорь или URL',
  type: 'block-anchor',
  blockAnchorConfig: {
    placeholder: 'Выберите блок на странице',
    allowCustomUrl: true
  },
  defaultValue: ''
}`}
            parameters={['field', 'label', 'type', 'blockAnchorConfig', 'defaultValue', 'rules']}
          />

          <FieldTypeCard 
            name="matrix-table" 
            description="Редактор таблицы: колонки (тип ячейки, заголовок, nowrap, размер), строки с текстом/HTML и изображениями. Vue 3 и React UI (1.6.0+)." 
            icon="📋"
            example={`{
  field: 'tableMatrix',
  label: 'Таблица',
  type: 'matrix-table',
  defaultValue: { tableHead: [], tableBody: [] },
  matrixTableConfig: {
    imageUploadConfig: { maxFileSize: 5242880 }
  },
  rules: [{ type: 'required', message: 'Заполните таблицу' }]
}`}
            parameters={['field', 'label', 'type', 'defaultValue', 'matrixTableConfig', 'rules']}
          />

          <FieldTypeCard 
            name="custom" 
            description="Кастомное поле с собственным рендерером. Позволяет интегрировать любые UI компоненты. Требует регистрации кастомного рендерера через registerCustomFieldRenderer." 
            icon="🔧"
            example={`{
  field: 'wysiwygContent',
  label: 'Rich Text',
  type: 'custom',
  customFieldConfig: {
    rendererId: 'wysiwyg-editor'
  },
  defaultValue: ''
}`}
            parameters={['field', 'label', 'type', 'customFieldConfig', 'defaultValue', 'rules']}
          />

          <FieldTypeCard 
            name="api-select" 
            description="Выбор элементов из внешнего API с поддержкой поиска и пагинации. Идеально для интеграции с бэкенд API." 
            icon="🔌"
            example={`{
  field: 'categoryId',
  label: 'Категория',
  type: 'api-select',
  apiSelectConfig: {
    url: 'https://api.example.com/categories',
    method: 'GET'
  }
}`}
            parameters={['field', 'label', 'type', 'apiSelectConfig', 'defaultValue', 'rules']}
          />
        </div>
      </section>

      <section className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-xl p-6 border-l-4 border-fuchsia-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Поле select (множественный выбор)</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          С версии <strong>1.5.5</strong> для <code className="text-fuchsia-700 dark:text-fuchsia-400">type: &apos;select&apos;</code> доступен
          режим <code className="text-fuchsia-700 dark:text-fuchsia-400">multiple: true</code> — выбор нескольких опций из статического списка{' '}
          <code>options</code> (без API, в отличие от <code>api-select</code>).
        </p>

        <CodeBlock
          code={`{
  field: 'topics',
  label: 'Темы (select, множественный выбор)',
  type: 'select',
  multiple: true,
  options: [
    { value: 'dev', label: 'Разработка' },
    { value: 'design', label: 'Дизайн' },
    { value: 'marketing', label: 'Маркетинг' },
    { value: 'analytics', label: 'Аналитика' }
  ],
  defaultValue: ['dev', 'design'],
  rules: [{ type: 'required', message: 'Выберите хотя бы одну тему' }]
}`}
          language="javascript"
          className="mb-4"
        />

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Поведение и хранение значения</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>
              При <code>multiple: false</code> (по умолчанию) в <code>props</code> сохраняется одно значение —{' '}
              <code>string</code> или <code>number</code> из <code>options[].value</code>
            </li>
            <li>
              При <code>multiple: true</code> в <code>props</code> сохраняется <strong>массив</strong> выбранных{' '}
              <code>value</code>; <code>defaultValue</code> тоже массив (или пустой <code>[]</code>)
            </li>
            <li>
              Если <code>defaultValue</code> не задан, пакет подставляет <code>[]</code> через{' '}
              <code>resolveFormFieldDefaultValue</code> (так же для multi <code>api-select</code>, <code>image</code>, <code>file</code>)
            </li>
            <li>
              Опции с <code>disabled: true</code> нельзя выбрать; <code>value</code> опции — <code>string</code> или{' '}
              <code>number</code>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">UI по платформам</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>
              <strong>Vue / React:</strong> <code>CustomDropdown</code> с toggle-выбором; в закрытом поле — сводка через запятую
              (до 3 label + <code>+N</code>); под полем — теги с кнопкой удаления (<code>bb-api-select__tag</code>)
            </li>
            <li>
              <strong>Pure JS:</strong> <code>SelectFieldRenderer</code> / <code>SelectControlInitializer</code> — toggle по клику,
              теги, значение в hidden input как JSON-массив
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Отображение в компоненте блока</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            В шаблоне блока обрабатывайте массив самостоятельно — например, бейджи тем:
          </p>
          <CodeBlock
            code={`// Vue
const topicLabels = computed(() =>
  (props.topics ?? []).map(
    (v) => options.find((o) => o.value === v)?.label ?? v
  )
)

// React
const topicLabels = (props.topics ?? []).map(
  (v) => options.find((o) => o.value === v)?.label ?? v
)`}
            language="javascript"
            className="text-xs"
          />
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Живой пример — поле «Темы (select, множественный выбор)» в блоке <code>text</code> в{' '}
          <a href="https://block-builder-demo.vercel.app/" className="text-fuchsia-600 hover:underline" target="_blank" rel="noopener noreferrer">
            block-builder-demo
          </a>{' '}
          и в{' '}
          <a href="https://github.com/mushket-co/block-builder/tree/master/examples" className="text-fuchsia-600 hover:underline" target="_blank" rel="noopener noreferrer">
            block-builder/examples
          </a>.
        </p>
      </section>

      <section className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border-l-4 border-purple-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          Поле отступов (Spacing)
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Поле типа <code className="text-purple-700 dark:text-purple-400">spacing</code> позволяет управлять отступами блока 
          (padding и margin) с поддержкой адаптивности через брекпоинты. Это мощный инструмент для создания responsive дизайна.
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Типы отступов</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            Поддерживаются четыре типа отступов:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
            <li><code className="text-purple-700 dark:text-purple-400">padding-top</code> — верхний внутренний отступ</li>
            <li><code className="text-purple-700 dark:text-purple-400">padding-bottom</code> — нижний внутренний отступ</li>
            <li><code className="text-purple-700 dark:text-purple-400">margin-top</code> — верхний внешний отступ</li>
            <li><code className="text-purple-700 dark:text-purple-400">margin-bottom</code> — нижний внешний отступ</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Стандартные брекпоинты</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            По умолчанию используются три брекпоинта:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 mb-4">
            <li><code className="text-purple-700 dark:text-purple-400">desktop</code> — для больших экранов (без ограничения ширины)</li>
            <li><code className="text-purple-700 dark:text-purple-400">tablet</code> — для планшетов (максимальная ширина: 1024px)</li>
            <li><code className="text-purple-700 dark:text-purple-400">mobile</code> — для мобильных устройств (максимальная ширина: 640px)</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Использование spacing поля</h3>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 mb-3 border-l-4 border-yellow-400">
            <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
              <Icon name="lightbulb" size={18} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Кастомные брекпоинты</strong> (параметр <code className="text-yellow-700 dark:text-yellow-400">breakpoints</code>) доступны только в <strong>пакета</strong>. 
                По умолчанию: desktop, tablet, mobile. Кастомные брекпоинты задаются в <code>spacingOptions.config.breakpoints</code>.
              </span>
            </p>
          </div>
          <CodeBlock
            code={`{
  field: 'spacing',
  label: 'Отступы блока',
  type: 'spacing',
  spacingConfig: {
    spacingTypes: ['padding-top', 'padding-bottom', 'margin-top', 'margin-bottom'],
    min: 0,           // Минимальное значение (по умолчанию 0)
    max: 200,         // Максимальное значение (по умолчанию 200)
    step: 4,          // Шаг изменения (по умолчанию 1)
    breakpoints: [    // Кастомные брекпоинты (опционально)
      { name: 'xlarge', label: 'XL (Desktop)', maxWidth: undefined },
      { name: 'large', label: 'L (Laptop)', maxWidth: 1440 },
      { name: 'medium', label: 'M (Tablet)', maxWidth: 1024 },
      { name: 'small', label: 'S (Mobile)', maxWidth: 640 }
    ]
  },
  defaultValue: {
    desktop: {
      'padding-top': 20,
      'padding-bottom': 20,
      'margin-top': 0,
      'margin-bottom': 0
    },
    tablet: {
      'padding-top': 16,
      'padding-bottom': 16,
      'margin-top': 0,
      'margin-bottom': 0
    },
    mobile: {
      'padding-top': 12,
      'padding-bottom': 12,
      'margin-top': 0,
      'margin-bottom': 0
    }
  }
}`}
            language="javascript"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Автоматическое добавление spacing через spacingOptions</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            Вместо ручного добавления spacing поля, вы можете использовать <code className="text-purple-700 dark:text-purple-400">spacingOptions</code> 
            в конфигурации блока. BlockBuilder автоматически добавит spacing поле в форму.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 mb-3 border-l-4 border-yellow-400">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-1">
                <Icon name="star" size={16} className="text-yellow-600 dark:text-yellow-400" />
                <strong>Кастомные брекпоинты</strong>
              </span> — параметр <code className="text-yellow-700 dark:text-yellow-400">breakpoints</code> в <code className="text-yellow-700 dark:text-yellow-400">config</code>.
            </p>
          </div>
          <CodeBlock
            code={`const blockConfigs = {
  text: {
    title: 'Текстовый блок',
    fields: [
      // Ваши поля...
    ],
    spacingOptions: {
      enabled: true,                    // Включить spacing (по умолчанию true)
      spacingTypes: [                    // Какие типы отступов доступны
        'padding-top',
        'padding-bottom',
        'margin-top',
        'margin-bottom'
      ],
      config: {
        min: 0,                          // Минимальное значение
        max: 120,                        // Максимальное значение
        step: 8,                         // Шаг изменения
        breakpoints: [                   // Кастомные брекпоинты (опционально)
          { name: 'xlarge', label: 'XL', maxWidth: undefined },
          { name: 'large', label: 'L', maxWidth: 1440 },
          { name: 'medium', label: 'M', maxWidth: 1024 },
          { name: 'small', label: 'S', maxWidth: 640 }
        ]
      }
    }
  }
}`}
            language="javascript"
            className="mb-4"
          />
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
              <Icon name="warning" size={18} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Важно:</strong> Если вы используете <code className="text-yellow-700 dark:text-yellow-400">spacingOptions</code>, 
                любые явные поля с типом <code className="text-yellow-700 dark:text-yellow-400">'spacing'</code> в массиве <code className="text-yellow-700 dark:text-yellow-400">fields</code> 
                будут проигнорированы. Чтобы отключить автоматическое добавление, установите <code className="text-yellow-700 dark:text-yellow-400">enabled: false</code>.
              </span>
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Применение spacing в компонентах</h3>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4 border-l-4 border-blue-400">
            <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
              <Icon name="lightbulb" size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Важно:</strong> Утилиты для применения spacing нужны только при использовании <strong>/core</strong> версии BlockBuilder. 
                В <strong>UI версии</strong> отступы применяются автоматически к блоку: margin применяется через inline стили на обертку блока, 
                а padding используется через CSS переменные в вашем пользовательском компоненте.
              </span>
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            Для применения spacing в <strong>/core</strong> версии используйте утилиты BlockBuilder:
          </p>
          <CodeBlock
            code={`import { getBlockInlineStyles, applySpacingToElement } from '@mushket-co/block-builder/core';

// В Vue компоненте
const styles = computed(() => {
  return getBlockInlineStyles(block.props.spacing, 'spacing', customBreakpoints);
});

// В Pure JS
const element = document.getElementById('my-block');
applySpacingToElement(element, block.props.spacing, 'spacing', customBreakpoints);

// Результат: CSS переменные для padding и inline стили для margin
// --spacing-padding-top: 20px;
// --spacing-padding-bottom: 20px;
// margin-top: 0px;
// margin-bottom: 0px;`}
            language="javascript"
            className="mb-4"
          />
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-400">
            <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
              <Icon name="lightbulb" size={18} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>В UI версии:</strong> Margin применяется автоматически на блок-обертку через inline стили. 
                Для padding используйте CSS переменные (<code className="text-green-700 dark:text-green-400">--spacing-padding-top</code>, 
                <code className="text-green-700 dark:text-green-400">--spacing-padding-bottom</code> и т.д.) в стилях вашего компонента. 
                Подробнее об этом см. в документации по использованию UI версии.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Поле повторителя (Repeater)</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Поле типа <code className="text-indigo-700 dark:text-indigo-400">repeater</code> позволяет создавать массивы элементов 
          с одинаковой структурой полей. Идеально подходит для карточек, слайдов, списков элементов и т.д.
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Пример использования</h3>
          <CodeBlock
            code={`{
  field: 'cards',
  label: 'Карточки',
  type: 'repeater',
  repeaterConfig: {
    itemTitle: 'Карточка',              // Заголовок элемента в UI
    addButtonText: 'Добавить карточку',  // Текст кнопки добавления
    removeButtonText: 'Удалить',         // Текст кнопки удаления
    min: 2,                              // Минимальное количество элементов
    max: 20,                             // Максимальное количество элементов
    defaultItemValue: {                  // Значения по умолчанию для нового элемента
      title: '',
      description: '',
      image: ''
    },
    fields: [                            // Поля внутри каждого элемента
      {
        field: 'title',
        label: 'Заголовок',
        type: 'text',
        placeholder: 'Название карточки',
        rules: [
          { type: 'required' }  // message опционально
        ]
      },
      {
        field: 'description',
        label: 'Описание',
        type: 'textarea',
        placeholder: 'Описание карточки...',
        defaultValue: ''
      },
      {
        field: 'image',
        label: 'Изображение',
        type: 'image',
        defaultValue: ''
      }
    ]
  },
  defaultValue: []                      // Массив элементов
}`}
            language="javascript"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Параметры repeaterConfig</h3>
          <div className="space-y-3">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-indigo-700 dark:text-indigo-400">fields</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(обязательный)</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Массив полей, которые будут внутри каждого элемента repeater. 
                Не поддерживаются только поля типа <code className="text-indigo-700 dark:text-indigo-400">spacing</code>. 
                Поддерживаются вложенные репитеры — репитеры внутри репитеров.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-indigo-700 dark:text-indigo-400">maxNestingDepth</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(опциональный)</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Максимальная глубина вложенности репитеров. По умолчанию 2 (то есть можно вкладывать репитеры внутрь репитеров).
                Используется для предотвращения слишком глубокой вложенности и улучшения производительности.
              </p>
              <CodeBlock
                code={`repeaterConfig: {
  maxNestingDepth: 2,  // По умолчанию 2
  fields: [ /* ... */ ]
}`}
                language="javascript"
                className="text-xs mb-2"
              />
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-indigo-700 dark:text-indigo-400">itemTitle</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(опциональный)</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Заголовок элемента в интерфейсе (например, "Карточка", "Слайд", "Элемент списка"). 
                По умолчанию используется порядковый номер.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-indigo-700 dark:text-indigo-400">min</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(опциональный)</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Минимальное количество элементов. Если не указано, определяется автоматически: 
                <code className="text-indigo-700 dark:text-indigo-400">required: true</code> = 1, <code className="text-indigo-700 dark:text-indigo-400">required: false</code> = 0.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-indigo-700 dark:text-indigo-400">max</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(опциональный)</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Максимальное количество элементов. Если не указано, ограничений нет.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-indigo-700 dark:text-indigo-400">countLabelVariants</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(опциональный)</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Локализация счётчика элементов. По умолчанию интерфейс показывает только число. 
                Если указать <code className="text-indigo-700 dark:text-indigo-400">countLabelVariants</code>, отображается «число + слово»:
              </p>
              <CodeBlock
                code={`repeaterConfig: {
  itemTitle: 'Слайд',
  countLabelVariants: { one: 'элемент', few: 'элемента', many: 'элементов', zero: 'пусто' },
  fields: [ /* ... */ ]
}`}
                language="javascript"
                className="text-xs mb-2"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Внутри используется общий util счётчика, единообразный для Vue и Pure‑JS UI.
              </p>
            </div>

          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Вложенные репитеры</h3>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4 border-l-4 border-green-400">
            <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
              <Icon name="lightbulb" size={18} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Возможность:</strong> Поддерживаются вложенные репитеры — репитеры внутри репитеров. 
                Это позволяет создавать сложные вложенные структуры данных, такие как категории с товарами, разделы с подразделами и т.д.
              </span>
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            Для создания вложенного репитера нужно добавить поле типа <code className="text-indigo-700 dark:text-indigo-400">repeater</code> 
            в массив <code className="text-indigo-700 dark:text-indigo-400">fields</code> родительского репитера и указать конфигурацию через свойство <code className="text-indigo-700 dark:text-indigo-400">repeaterConfig</code>:
          </p>
          <CodeBlock
            code={`{
  field: 'categories',
  label: 'Категории',
  type: 'repeater',
  repeaterConfig: {
    itemTitle: 'Категория',
    maxNestingDepth: 2,  // Максимальная глубина вложенности
    fields: [
      {
        field: 'name',
        label: 'Название категории',
        type: 'text',
        rules: [{ type: 'required' }]
      },
      {
        field: 'products',  // Вложенный репитер
        label: 'Товары',
        type: 'repeater',
        repeaterConfig: {  // Конфигурация вложенного репитера
          itemTitle: 'Товар',
          maxNestingDepth: 2,
          fields: [
            {
              field: 'name',
              label: 'Название товара',
              type: 'text',
              rules: [{ type: 'required' }]
            },
            {
              field: 'price',
              label: 'Цена',
              type: 'number',
              rules: [{ type: 'required' }]
            }
          ]
        }
      }
    ]
  },
  defaultValue: []
}`}
            language="javascript"
            className="mb-4"
          />
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-400">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              <strong>Особенности вложенных репитеров:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-2">
              <li>Автоматическое раскрытие аккордеонов при наличии ошибок валидации во вложенных репитерах</li>
              <li>Корректная обработка вложенных путей полей вида <code className="text-blue-700 dark:text-blue-400">categories[0].products[1].name</code></li>
              <li>Ограничение максимальной глубины вложенности через <code className="text-blue-700 dark:text-blue-400">maxNestingDepth</code></li>
              <li>Синхронизация значений при изменении полей во вложенных репитерах</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-6 border-l-4 border-pink-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Поле изображения (Image)</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Поле типа <code className="text-pink-700 dark:text-pink-400">image</code> предоставляет полную поддержку работы с изображениями: 
          загрузку файлов с preview, валидацию, поддержку двух форматов хранения (base64 строка или объект с метаданными), 
          а также настройку серверной загрузки. <strong>Рекомендуется использовать собственный API для загрузки файлов на статический сервер</strong> 
          и хранить в блоке только ссылку на файл, а не данные в base64 формате.
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Два формата хранения данных</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            Поля типа <code className="text-pink-700 dark:text-pink-400">image</code> могут работать как со строками (base64), так и с объектами (серверная загрузка):
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-2 border-yellow-400">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-bold text-gray-900 dark:text-white">Base64 изображения (строка):</h4>
                <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded">Только для разработки</span>
              </div>
              <CodeBlock
                code={`props: {
  image: "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}`}
                language="javascript"
                className="text-xs"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                ⚠️ Формат base64 предназначен <strong>только для тестирования и разработки</strong>. 
                Не рекомендуется использовать в продакшене из-за больших размеров данных.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-2 border-green-400">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-bold text-gray-900 dark:text-white">Серверная загрузка (объект):</h4>
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded">Рекомендуется</span>
              </div>
              <CodeBlock
                code={`props: {
  image: {
    src: "https://example.com/uploads/image.jpg",
    width: 1920,
    height: 1080,
    size: 245678
  }
}`}
                language="javascript"
                className="text-xs"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                ✅ <strong>Рекомендуемый подход:</strong> Загружайте файлы на статический сервер через ваш API, 
                а в блоке храните только ссылку на файл (<code className="text-green-700 dark:text-green-400">src</code>) и метаданные.
              </p>
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-400 mb-4">
            <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
              <Icon name="warning" size={18} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Важно:</strong> Base64 формат сохранения нужен лишь для тестирования и разработки. 
                Мы <strong>рекомендуем использовать собственный API для загрузки файлов</strong> на статический сервер и хранить в блоке только ссылку на файл (поле <code className="text-yellow-700 dark:text-yellow-400">src</code>) вместе с метаданными изображения.
              </span>
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border-l-4 border-blue-400">
            <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
              <Icon name="lightbulb" size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Автоматическое извлечение URL:</strong> Все компоненты автоматически извлекают URL из значения поля. 
                Если значение — строка, используется как есть. Если объект — извлекается поле <code className="text-blue-700 dark:text-blue-400">src</code>.
              </span>
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Конфигурация загрузки на сервер</h3>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4 border-l-4 border-green-400">
            <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
              <Icon name="lightbulb" size={18} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Рекомендация:</strong> Используйте собственный API для загрузки файлов на статический сервер. 
                Это позволяет хранить в блоке только ссылку на файл (поле <code className="text-green-700 dark:text-green-400">src</code>), 
                что значительно уменьшает размер данных и улучшает производительность приложения.
              </span>
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            Для настройки серверной загрузки используйте параметр <code className="text-pink-700 dark:text-pink-400">fileUploadConfig</code>:
          </p>
          <CodeBlock
            code={`{
  field: 'image',
  label: 'Изображение',
  type: 'image',
  fileUploadConfig: {
    uploadUrl: '/api/upload',           // URL для загрузки
    fileParamName: 'file',              // Имя поля в FormData (по умолчанию 'file')
    maxFileSize: 5 * 1024 * 1024,       // Максимальный размер (5MB)
    accept: 'image/*',                   // Разрешенные типы (по умолчанию 'image/*')
    uploadHeaders: {                    // Заголовки запроса
      'Authorization': 'Bearer token'
    },
    responseMapper: (response) => ({    // Преобразование ответа сервера
      src: response.url,               // ОБЯЗАТЕЛЬНО! URL изображения
      width: response.width,
      height: response.height,
      size: response.size
    }),
    onUploadError: (error) => {         // Обработка ошибок
      console.error('Ошибка загрузки:', error);
    }
  },
  defaultValue: ''
}`}
            language="javascript"
            className="mb-4"
          />
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 border-l-4 border-yellow-400">
            <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
              <Icon name="warning" size={18} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Важно:</strong> При использовании <code className="text-yellow-700 dark:text-yellow-400">uploadUrl</code> (загрузка через сервер API клиента) ответ сервера <strong>ОБЯЗАТЕЛЬНО</strong> должен быть объектом с полем 
                <code className="text-yellow-700 dark:text-yellow-400">src</code>, содержащим URL изображения. Если формат ответа отличается, используйте 
                <code className="text-yellow-700 dark:text-yellow-400">responseMapper</code> для преобразования ответа к виду объекта с вашими полями и обязательным полем <code className="text-yellow-700 dark:text-yellow-400">src</code>.
              </span>
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Пример использования в компонентах</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            При работе с полями изображений в ваших компонентах используйте автоматическое извлечение URL:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Vue компонент:</h4>
              <CodeBlock
                code={`<template>
  <img :src="imageUrl" alt="Image" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  image: [String, Object]
})

const imageUrl = computed(() => {
  if (typeof props.image === 'string') return props.image;
  if (typeof props.image === 'object' && props.image !== null) {
    return props.image.src || '';
  }
  return '';
})
</script>`}
                language="vue"
                className="text-xs"
              />
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Pure JS шаблон:</h4>
              <CodeBlock
                code={`template: (props) => {
  const getImageUrl = (img) => {
    if (typeof img === 'string') return img;
    if (typeof img === 'object' && img !== null) {
      return img.src || '';
    }
    return '';
  };
  return '<img src="' + getImageUrl(props.image) + '" />';
}`}
                language="javascript"
                className="text-xs"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Возможности</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>Загрузка файлов с валидацией типа и размера</li>
            <li>Автоматическое preview изображения с возможностью очистки</li>
            <li>Поддержка base64 (только для разработки) и серверной загрузки (рекомендуется для продакшена)</li>
            <li>Хранение метаданных изображения (ширина, высота, размер) при серверной загрузке</li>
            <li>Автоматическое извлечение URL из обоих форматов</li>
            <li>Поддержка repeater полей через data-атрибуты</li>
            <li>Встроенная валидация размера файла и типа</li>
            <li>Рекомендуется использовать собственный API для загрузки файлов на статический сервер</li>
            <li>Режим <code className="text-pink-700 dark:text-pink-400">multiple</code> и ограничение <code className="text-pink-700 dark:text-pink-400">maxCount</code> в <code className="text-pink-700 dark:text-pink-400">fileUploadConfig</code> (1.5.0+)</li>
          </ul>
        </div>
      </section>

      <section className="bg-slate-50 dark:bg-slate-900/20 rounded-xl p-6 border-l-4 border-slate-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Поле файла (File)</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Поле <code className="text-slate-700 dark:text-slate-400">type: &apos;file&apos;</code> предназначено для документов и произвольных файлов.
          В отличие от <code className="text-slate-700 dark:text-slate-400">image</code>, UI показывает список имён файлов с бейджем расширения, а не галерею превью.
          Поддерживаются одиночный и множественный режим (<code>multiple: true</code>), серверная загрузка через <code>fileUploadConfig</code> и лимит <code>maxCount</code>.
        </p>
        <CodeBlock
          code={`{
  field: 'file',
  label: 'Файл (один)',
  type: 'file',
  defaultValue: '',
  fileUploadConfig: {
    uploadUrl: '/api/upload',
    fileParamName: 'file',
    maxFileSize: 5 * 1024 * 1024,
    accept: '.pdf,.doc,.docx,.zip',
    responseMapper: (response) => response.url
  }
}

// Несколько файлов
{
  field: 'files',
  label: 'Файлы',
  type: 'file',
  multiple: true,
  defaultValue: [],
  fileUploadConfig: {
    uploadUrl: '/api/upload',
    maxCount: 5,
    accept: '.pdf,.doc,.docx,.zip',
    responseMapper: (response) => response.url
  }
}`}
          language="javascript"
          className="mb-4"
        />
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          В <code>props</code> сохраняется URL строкой (один файл) или массивом URL (несколько файлов).
          В компоненте блока отображайте ссылки на скачивание самостоятельно.
        </p>
      </section>

      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Поле якоря (block-anchor)</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Поле <code className="text-indigo-700 dark:text-indigo-400">type: &apos;block-anchor&apos;</code> помогает редактору выбрать
          ссылку на другой блок страницы (<code>#block-id</code>) или ввести произвольный URL.
          Список опций строится из блоков на странице; в подписи показываются <code>props.title</code> / <code>props.name</code> блока и тип.
        </p>

        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 mb-6 border-l-4 border-amber-400">
          <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
            <Icon name="warning" size={18} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Ответственность за поведение ссылки — на стороне пользователя.</strong> BlockBuilder в форме только создаёт и сохраняет
              значение (<code>#id</code> или URL). Пакет <strong>не выполняет скролл</strong>, не рендерит целевые блоки и не навешивает обработчики
              в вашем приложении. Реализацию скролла к якорю, <code>preventDefault</code>, плавной прокрутки, роутинга и отображения ссылки
              нужно добавить в <strong>ваших компонентах блоков</strong> (или в обёртке рендера), опираясь на сохранённое значение поля.
            </span>
          </p>
        </div>

        <CodeBlock
          code={`{
  field: 'url',
  label: 'Якорь или URL',
  type: 'block-anchor',
  blockAnchorConfig: {
    placeholder: 'Выберите блок на странице',
    allowCustomUrl: true  // поле «или введите URL»
  },
  rules: [{ type: 'required', message: 'Укажите якорь или URL' }],
  defaultValue: ''
}`}
          language="javascript"
          className="mb-4"
        />

        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Пример: скролл к блоку в Vue-компоненте</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          Целевые блоки на странице должны иметь атрибут <code>data-block-id</code> (BlockBuilder выставляет его при рендере).
          Если в <code>props.url</code> сохранён якорь <code>#block-id</code>, перехватите клик и вызовите <code>scrollIntoView</code> сами:
        </p>
        <CodeBlock
          code={`<a :href="url" @click="handleClick">{{ text }}</a>

<script setup>
const props = defineProps({ url: String, text: String })

const handleClick = (event) => {
  if (!props.url?.startsWith('#')) return
  event.preventDefault()
  const blockId = props.url.slice(1)
  document.querySelector(\`[data-block-id="\${blockId}"]\`)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
</script>`}
          language="vue"
          className="mb-4"
        />

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Для внешних URL (<code>https://...</code>) оставьте обычное поведение ссылки. То же самое относится к React, Pure JS HTML-шаблонам и SSR.
        </p>

        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Контекст для Vue / React</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          <code>BlockBuilder</code> передаёт в поле список блоков страницы (id, type, props). При редактировании блока он исключается из списка якорей.
          В Pure JS контекст собирается в <code>BlockUIController.getBlockAnchorContext()</code>.
        </p>
      </section>

      <section className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border-l-4 border-emerald-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Поле таблицы (matrix-table)</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Поле <code className="text-emerald-700 dark:text-emerald-400">type: &apos;matrix-table&apos;</code> (1.6.0+) — редактор таблицы в форме блока:
          вкладки «Структура» (колонки) и «Строки», типы ячеек по колонке (<code>default</code>, <code>wyz</code>, HTML, <code>image</code>),
          размер текстовой ячейки, nowrap, загрузка изображений в ячейки.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-4 border-l-4 border-blue-400">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Vue 3 и React UI.</strong> В Pure JS нет встроенного контрола — используйте <code>type: &apos;custom&apos;</code> или Vue/React UI.
          </p>
        </div>
        <CodeBlock
          code={`{
  field: 'tableMatrix',
  label: 'Таблица',
  type: 'matrix-table',
  defaultValue: {
    tableHead: [
      { id: 'col-1', type: 'default', name: 'Название', nowrap: false, size: '' }
    ],
    tableBody: []
  },
  matrixTableConfig: {
    imageUploadConfig: { maxFileSize: 5242880 }
  },
  rules: [{ type: 'required', message: 'Заполните таблицу' }]
}`}
          language="javascript"
          className="mb-4"
        />
        <p className="text-gray-600 dark:text-gray-400">
          В <code>props</code> сохраняется объект <code>{'{ tableHead, tableBody }'}</code>.
          Пример блока «Таблица» — в{' '}
          <a href={DEMO_BB_URL} className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">demo-bb</a>{' '}
          (Vue/React) и <code>block-builder/examples</code>.
        </p>
      </section>

      <section className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-6 border-l-4 border-cyan-500 border-2 border-yellow-400">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          Поле выбора из API (API Select)
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 mb-4 border-l-4 border-yellow-400">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="flex items-center gap-1">
              <Icon name="star" size={16} className="text-yellow-600 dark:text-yellow-400" />
              <strong>Примечание:</strong>
            </span> Поле типа <code className="text-yellow-700 dark:text-yellow-400">api-select</code> доступно только в пакета. 
            Поле доступно во всех MIT-сборках пакета.
          </p>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Поле типа <code className="text-cyan-700 dark:text-cyan-400">api-select</code> позволяет выбирать элементы из внешнего API 
          с поддержкой поиска, пагинации и множественного выбора. Идеально для интеграции с вашими бэкенд API.
          С 1.3.1: при закрытом дропдауне показывается только label выбранного значения; поле поиска видно при открытии.
          Кнопка «Загрузить ещё» — только при <code>hasMore: true</code> в ответе API.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          <strong>URL может быть абсолютным</strong> (например, <code className="text-cyan-700 dark:text-cyan-400">https://api.example.com/categories</code>) 
          или <strong>относительным</strong> (например, <code className="text-cyan-700 dark:text-cyan-400">/api/categories</code>). 
          Относительные URL автоматически обрабатываются корректно с сохранением query параметров.
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Пример использования</h3>
          <CodeBlock
            code={`{
  field: 'categoryId',
  label: 'Категория',
  type: 'api-select',
  apiSelectConfig: {
    // Можно использовать абсолютный URL
    url: 'https://api.example.com/categories',
    // Или относительный URL (например, '/api/categories')
    method: 'GET',
    headers: {
      'Authorization': 'Bearer token'
    },
    searchParam: 'search',        // Параметр для поиска (по умолчанию 'search')
    pageParam: 'page',            // Параметр для страницы (по умолчанию 'page')
    limitParam: 'limit',          // Параметр для лимита (по умолчанию 'limit')
    limit: 20,                    // Количество элементов на странице
    debounceMs: 0,                // Задержка поиска в мс (0 — сразу; 1500 — для демо в examples)
    multiple: false,              // Множественный выбор
    idField: 'id',                // Поле ID в ответе
    nameField: 'name',            // Поле name в ответе
    minSearchLength: 2,           // Минимальная длина поиска
    placeholder: 'Поиск категории...',
    noResultsText: 'Категории не найдены',
    loadingText: 'Загрузка...',
    errorText: 'Ошибка загрузки',
    responseMapper: (response) => {  // Функция преобразования ответа
      return {
        data: response.items || response.data || [],
        total: response.total,
        page: response.page,
        hasMore: response.hasMore
      };
    }
  },
  defaultValue: null
}`}
            language="javascript"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Формат ответа API</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            API должен возвращать данные в следующем формате:
          </p>
          <CodeBlock
            code={`// GET /api/categories?search=test&page=1&limit=20
{
  "data": [
    { "id": 1, "name": "Категория 1" },
    { "id": 2, "name": "Категория 2" }
  ],
  "total": 100,
  "page": 1,
  "hasMore": true
}`}
            language="json"
            className="mb-4"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Если формат ответа отличается, используйте <code className="text-cyan-700 dark:text-cyan-400">responseMapper</code> 
            для преобразования или <code className="text-cyan-700 dark:text-cyan-400">dataPath</code> для указания пути к данным.
          </p>
        </div>
      </section>

      <section className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border-l-4 border-emerald-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Условное отображение полей (dependsOn)</h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-4 border-l-4 border-blue-400">
          <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
            <Icon name="lightbulb" size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Vue 3 и React:</strong> Функциональность <code className="text-blue-700 dark:text-blue-400">dependsOn</code> доступна в UI Vue 3 и React (v1.1.0+). 
              Pure JS не скрывает поля по <code>dependsOn</code> — все поля формы остаются видимыми.
            </span>
          </p>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Свойство <code className="text-emerald-700 dark:text-emerald-400">dependsOn</code> позволяет условно отображать поля формы на основе значений других полей. 
          Это полезно для создания динамических форм, где некоторые поля должны показываться только при определенных условиях.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Поля с <code className="text-emerald-700 dark:text-emerald-400">dependsOn</code> автоматически скрываются, если условие не выполнено, 
          и не участвуют в валидации, когда они скрыты.
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Пример использования</h3>
          <CodeBlock
            code={`{
  field: 'autoplay',
  label: 'Автопрокрутка',
  type: 'checkbox',
  defaultValue: true
},
{
  field: 'autoplayDelay',
  label: 'Задержка (мс)',
  type: 'number',
  rules: [
    { type: 'min', value: 1000, message: 'Минимум: 1000мс' },
    { type: 'max', value: 10000, message: 'Максимум: 10000мс' }
  ],
  defaultValue: 3000,
  dependsOn: {
    field: 'autoplay',      // Имя поля, от которого зависит видимость
    value: true,            // Ожидаемое значение
    operator: 'equals'      // Оператор сравнения (по умолчанию 'equals')
  }
}`}
            language="javascript"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Параметры dependsOn</h3>
          <div className="space-y-3">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-emerald-700 dark:text-emerald-400">field</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(обязательный)</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Имя поля, от которого зависит видимость текущего поля. Должно быть полем, определенным в той же конфигурации блока или внутри того же репитера.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-emerald-700 dark:text-emerald-400">value</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(обязательный)</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Ожидаемое значение зависимого поля. Может быть <code className="text-emerald-700 dark:text-emerald-400">boolean</code>, <code className="text-emerald-700 dark:text-emerald-400">string</code> или <code className="text-emerald-700 dark:text-emerald-400">number</code>.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Для операторов <code className="text-emerald-700 dark:text-emerald-400">in</code> и <code className="text-emerald-700 dark:text-emerald-400">notIn</code> значение должно быть массивом.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-emerald-700 dark:text-emerald-400">operator</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(опциональный, по умолчанию 'equals')</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Оператор сравнения для проверки условия:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-4">
                <li><code className="text-emerald-700 dark:text-emerald-400">'equals'</code> (по умолчанию) — поле видимо, если значение равно <code className="text-emerald-700 dark:text-emerald-400">value</code></li>
                <li><code className="text-emerald-700 dark:text-emerald-400">'notEquals'</code> — поле видимо, если значение не равно <code className="text-emerald-700 dark:text-emerald-400">value</code></li>
                <li><code className="text-emerald-700 dark:text-emerald-400">'in'</code> — поле видимо, если значение содержится в массиве <code className="text-emerald-700 dark:text-emerald-400">value</code></li>
                <li><code className="text-emerald-700 dark:text-emerald-400">'notIn'</code> — поле видимо, если значение не содержится в массиве <code className="text-emerald-700 dark:text-emerald-400">value</code></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Примеры использования</h3>
          
          <div className="mb-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Пример 1: Зависимость от checkbox</h4>
            <CodeBlock
              code={`{
  field: 'hasLink',
  label: 'Добавить ссылку',
  type: 'checkbox',
  defaultValue: false
},
{
  field: 'linkUrl',
  label: 'URL ссылки',
  type: 'text',
  rules: [{ type: 'required', message: 'URL ссылки обязателен' }],
  dependsOn: {
    field: 'hasLink',
    value: true
  }
},
{
  field: 'linkText',
  label: 'Текст ссылки',
  type: 'text',
  rules: [{ type: 'required', message: 'Текст ссылки обязателен' }],
  dependsOn: {
    field: 'hasLink',
    value: true
  }
}`}
              language="javascript"
              className="mb-4"
            />
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Пример 2: Зависимость от select</h4>
            <CodeBlock
              code={`{
  field: 'layoutType',
  label: 'Тип макета',
  type: 'select',
  options: [
    { value: 'grid', label: 'Сетка' },
    { value: 'list', label: 'Список' },
    { value: 'carousel', label: 'Карусель' }
  ],
  defaultValue: 'grid'
},
{
  field: 'columnsCount',
  label: 'Количество колонок',
  type: 'number',
  rules: [{ type: 'required' }],
  dependsOn: {
    field: 'layoutType',
    value: 'grid',
    operator: 'equals'
  }
},
{
  field: 'slidesToShow',
  label: 'Слайдов на экране',
  type: 'number',
  rules: [{ type: 'required' }],
  dependsOn: {
    field: 'layoutType',
    value: 'carousel',
    operator: 'equals'
  }
}`}
              language="javascript"
              className="mb-4"
            />
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Пример 3: Использование оператора in</h4>
            <CodeBlock
              code={`{
  field: 'displayMode',
  label: 'Режим отображения',
  type: 'select',
  options: [
    { value: 'light', label: 'Светлый' },
    { value: 'dark', label: 'Темный' },
    { value: 'auto', label: 'Автоматический' }
  ],
  defaultValue: 'light'
},
{
  field: 'customTheme',
  label: 'Пользовательская тема',
  type: 'color',
  dependsOn: {
    field: 'displayMode',
    value: ['light', 'dark'],  // Массив значений
    operator: 'in'              // Поле видимо, если displayMode = 'light' или 'dark'
  }
}`}
              language="javascript"
              className="mb-4"
            />
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Пример 4: Зависимость внутри repeater</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <code className="text-emerald-700 dark:text-emerald-400">dependsOn</code> также работает внутри репитеров — поле проверяет значение другого поля внутри того же элемента репитера:
            </p>
            <CodeBlock
              code={`{
  field: 'items',
  label: 'Элементы',
  type: 'repeater',
  repeaterConfig: {
    fields: [
      {
        field: 'hasImage',
        label: 'Есть изображение',
        type: 'checkbox',
        defaultValue: false
      },
      {
        field: 'imageUrl',
        label: 'URL изображения',
        type: 'text',
        rules: [{ type: 'required' }],
        dependsOn: {
          field: 'hasImage',  // Проверяет значение hasImage внутри того же элемента
          value: true
        }
      }
    ]
  }
}`}
              language="javascript"
              className="mb-4"
            />
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Icon name="warning" size={18} className="text-yellow-600 dark:text-yellow-400" />
            Важные моменты
          </h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>Скрытые поля не участвуют в валидации — это позволяет сохранять формы даже когда toggle отключен</li>
            <li>Внутри репитеров поле проверяет значение другого поля внутри того же элемента репитера</li>
            <li>Функциональность доступна в Vue 3 и React UI (v1.1.0+)</li>
            <li>Pure JS не поддерживает условное отображение полей (<code>dependsOn</code>)</li>
          </ul>
        </div>
      </section>

      <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-4 border-green-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Общие параметры полей</h2>
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">field</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(обязательный)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Имя поля, которое будет использоваться в <code className="text-green-700 dark:text-green-400">props</code> блока. 
              Должно быть уникальным в рамках конфигурации блока.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">label</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(обязательный)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Отображаемое название поля в форме. Используется для пользовательского интерфейса.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">type</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(обязательный)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Тип поля: <code className="text-green-700 dark:text-green-400">'text'</code>, <code className="text-green-700 dark:text-green-400">'textarea'</code>, 
              <code className="text-green-700 dark:text-green-400">'number'</code>, <code className="text-green-700 dark:text-green-400">'email'</code>, 
              <code className="text-green-700 dark:text-green-400">'url'</code>, <code className="text-green-700 dark:text-green-400">'select'</code>, 
              <code className="text-green-700 dark:text-green-400">'checkbox'</code>, <code className="text-green-700 dark:text-green-400">'radio'</code>, 
              <code className="text-green-700 dark:text-green-400">'color'</code>, <code className="text-green-700 dark:text-green-400">'image'</code>, 
              <code className="text-green-700 dark:text-green-400">'file'</code>, <code className="text-green-700 dark:text-green-400">'file-import'</code> (Vue/React, 1.8.0+),
              <code className="text-green-700 dark:text-green-400">'block-anchor'</code>,
              <code className="text-green-700 dark:text-green-400">'matrix-table'</code> (Vue/React, 1.6.0+),
              <code className="text-green-700 dark:text-green-400">'spacing'</code>, 
              <code className="text-green-700 dark:text-green-400">'repeater'</code>, <code className="text-green-700 dark:text-green-400">'api-select'</code>, 
              <code className="text-green-700 dark:text-green-400">'custom'</code>
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">defaultValue</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(опциональный)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Значение по умолчанию, которое будет использоваться при создании нового блока.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">placeholder</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(опциональный)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Подсказка, отображаемая в пустом поле (для типов <code className="text-green-700 dark:text-green-400">text</code>, <code className="text-green-700 dark:text-green-400">textarea</code>, <code className="text-green-700 dark:text-green-400">email</code>, <code className="text-green-700 dark:text-green-400">url</code>).
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">options</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(для select, radio)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Массив опций в формате [{`{ value: '...', label: '...', disabled?: boolean }`}].
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-4">
              <li><strong>value</strong> — значение, сохраняемое в props (string | number)</li>
              <li><strong>label</strong> — отображаемый текст (string)</li>
              <li><strong>disabled</strong> — опционально, отключает опцию для выбора (boolean)</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">multiple</code>{' '}
              <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(для select, image, file; опционально)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Включает множественный режим. По умолчанию <code>false</code>.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-4">
              <li>
                <strong>select (1.5.5+):</strong> значение в <code>props</code> — массив <code>value</code> из{' '}
                <code>options</code>; <code>defaultValue: []</code> или массив начальных значений
              </li>
              <li>
                <strong>image / file:</strong> несколько URL или объектов загрузки; см. разделы Image и File
              </li>
              <li>
                Для <code>api-select</code> множественный выбор задаётся в <code>apiSelectConfig.multiple</code>, не в корне поля
              </li>
            </ul>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Подробнее про <code>select</code> — в разделе «Поле select (множественный выбор)» выше.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">rules</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(опциональный)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Массив правил валидации. Поддерживаемые типы:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-4">
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'required', message?: '...' }`}</code> — поле обязательно (<code className="text-green-700 dark:text-green-400">message</code> опционально, есть fallback)</li>
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'minLength', value: 1, message?: '...' }`}</code> — минимальная длина (<code className="text-green-700 dark:text-green-400">message</code> опционально)</li>
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'maxLength', value: 100, message?: '...' }`}</code> — максимальная длина (<code className="text-green-700 dark:text-green-400">message</code> опционально)</li>
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'min', value: 0, message?: '...' }`}</code> — минимальное значение (для number, <code className="text-green-700 dark:text-green-400">message</code> опционально)</li>
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'max', value: 100, message?: '...' }`}</code> — максимальное значение (для number, <code className="text-green-700 dark:text-green-400">message</code> опционально)</li>
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'pattern', value: 'regex', message?: '...' }`}</code> — регулярное выражение (<code className="text-green-700 dark:text-green-400">message</code> опционально)</li>
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'email', message?: '...' }`}</code> — валидация email (<code className="text-green-700 dark:text-green-400">message</code> опционально)</li>
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'url', message?: '...' }`}</code> — валидация URL (<code className="text-green-700 dark:text-green-400">message</code> опционально)</li>
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'custom', validator: (v) => boolean, message?: '...' }`}</code> — кастомная валидация (<code className="text-green-700 dark:text-green-400">message</code> опционально)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">persist</code>{' '}
              <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(опциональный, 1.8.0+, Vue/React)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              По умолчанию <code>true</code>. При <code>persist: false</code> поле участвует в форме, но не попадает в{' '}
              <code>block.props</code> при save. У типа <code>file-import</code> — implicit <code>persist: false</code>.
              Работает рекурсивно внутри <code>repeater</code>.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">optionsFrom</code>{' '}
              <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(для select, 1.8.0+, Vue/React)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Динамические опции из другого поля: <code>source</code> (имя поля), <code>when</code> (predicate),{' '}
              <code>map</code> (преобразование в options, поддержка групп). Статический <code>options</code> используется как fallback.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">fileImportConfig</code>{' '}
              <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(для type: &apos;file-import&apos;, 1.8.0+)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Конфигурация импорта: <code>uploadUrl</code>, <code>accept</code>, <code>merge[]</code> с{' '}
              <code>targetField</code>, <code>sourceKey</code>, <code>mode</code>, <code>dedupeBy</code>, <code>mapItem</code>, callback{' '}
              <code>onImport</code>. См. карточку типа <code>file-import</code> выше.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">spacingConfig</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(для type: 'spacing')</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Конфигурация для поля отступов. См. раздел "Поле отступов (Spacing)" выше.
              <br />
              <strong className="text-yellow-700 dark:text-yellow-400">Примечание:</strong> Параметр <code className="text-green-700 dark:text-green-400">breakpoints</code> 
              внутри <code className="text-green-700 dark:text-green-400">spacingConfig</code> доступен только в пакета.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">repeaterConfig</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(для type: 'repeater')</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Конфигурация для поля повторителя. См. раздел "Поле повторителя (Repeater)" выше.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">fileUploadConfig</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(для type: &apos;image&apos; или &apos;file&apos;)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Конфигурация загрузки на сервер. См. разделы «Поле изображения (Image)» и «Поле файла (File)».
              <br />
              Параметры: <code className="text-green-700 dark:text-green-400">uploadUrl</code>, <code className="text-green-700 dark:text-green-400">fileParamName</code>, 
              <code className="text-green-700 dark:text-green-400">maxFileSize</code>, <code className="text-green-700 dark:text-green-400">accept</code>, 
              <code className="text-green-700 dark:text-green-400">maxCount</code> (для <code>multiple</code>),
              <code className="text-green-700 dark:text-green-400">uploadHeaders</code>, <code className="text-green-700 dark:text-green-400">responseMapper</code>, 
              <code className="text-green-700 dark:text-green-400">onUploadError</code>.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">blockAnchorConfig</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(для type: &apos;block-anchor&apos;)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <code className="text-green-700 dark:text-green-400">placeholder</code> — подпись пустого выбора;
              <code className="text-green-700 dark:text-green-400"> allowCustomUrl</code> — показать поле произвольного URL.
              Скролл и обработка клика — в компоненте блока пользователя (см. раздел «Поле якоря»).
            </p>
          </div>

          <div className="relative border-2 border-yellow-400 rounded-lg p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/10">
            <div className="absolute top-2 right-2">
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">apiSelectConfig</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(для type: 'api-select', опционально)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Конфигурация для поля выбора из API. См. раздел "Поле выбора из API (API Select)" выше. 
              <strong className="text-yellow-700 dark:text-yellow-400"> Доступно только в пакета.</strong>
            </p>
          </div>

          <div className="relative border-2 border-yellow-400 rounded-lg p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/10">
            <div className="absolute top-2 right-2">
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">customFieldConfig</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(для type: 'custom', опционально)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Конфигурация для кастомного поля. Должен содержать <code className="text-green-700 dark:text-green-400">rendererId</code> — 
              идентификатор зарегистрированного кастомного рендерера.
              <strong className="text-yellow-700 dark:text-yellow-400"> Доступно только в пакета.</strong>
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">dependsOn</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(опциональный, Vue/React UI, v1.1.0+)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Конфигурация условного отображения поля на основе значения другого поля. См. раздел "Условное отображение полей (dependsOn)" выше.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <strong>Vue 3 и React:</strong> Pure JS не поддерживает условное отображение полей.
            </p>
          </div>
        </div>
      </section>

      {/* Кастомные рендереры - оставляю существующий контент */}
      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500 border-2 border-yellow-400">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          Кастомные рендереры полей
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 mb-4 border-l-4 border-yellow-400">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="flex items-center gap-1">
              <Icon name="star" size={16} className="text-yellow-600 dark:text-yellow-400" />
              <strong>Примечание:</strong>
            </span> Кастомные рендереры и поля типа <code className="text-yellow-700 dark:text-yellow-400">custom</code> доступны только в пакета. 
            Поле доступно во всех MIT-сборках пакета.
          </p>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Если стандартных типов полей недостаточно, вы можете создать собственный рендерер поля. 
          Это позволяет внедрять сторонние библиотеки (например, WYSIWYG редакторы, date pickers, color pickers) 
          в формы редактирования блоков.
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Когда использовать кастомные рендереры?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            Кастомные рендереры идеально подходят для случаев, когда стандартных типов полей недостаточно:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li><strong>WYSIWYG редакторы</strong> — для форматирования текста с поддержкой HTML/CSS</li>
            <li><strong>Date/Time pickers</strong> — для выбора даты и времени с календарем</li>
            <li><strong>Сложные компоненты выбора</strong> — многоуровневые меню, tree select, визуальные селекторы</li>
            <li><strong>Интеграция сторонних библиотек</strong> — CodeMirror для редакторов кода, Chart.js для графиков, и т.д.</li>
            <li><strong>Собственные интерактивные элементы</strong> — любые специфические UI компоненты вашего проекта</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Что нужно сделать: пошаговая инструкция</h3>
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-orange-500">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Шаг 1: Создайте класс, реализующий интерфейс ICustomFieldRenderer</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Этот класс должен быть экспортирован из пакета BlockBuilder. Вы <strong>обязаны</strong> реализовать этот интерфейс для создания кастомного рендерера.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Обязательные свойства:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-4 mb-2">
                <li><code className="text-orange-700 dark:text-orange-400">readonly id: string</code> — уникальный идентификатор рендерера (например, 'wysiwyg-editor', 'date-picker')</li>
                <li><code className="text-orange-700 dark:text-orange-400">readonly name: string</code> — название рендерера для отображения (необязательно, но рекомендуется)</li>
                <li><code className="text-orange-700 dark:text-orange-400">render()</code> — метод, который создает и возвращает ваш кастомный компонент</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-orange-500">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Шаг 2: Реализуйте метод render()</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Метод <code className="text-orange-700 dark:text-orange-400">render()</code> получает два параметра:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-4 mb-2">
                <li><code className="text-orange-700 dark:text-orange-400">container: HTMLElement</code> — DOM элемент, куда нужно вставить ваш компонент</li>
                <li><code className="text-orange-700 dark:text-orange-400">context: ICustomFieldContext</code> — контекст с данными поля и callbacks</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Метод должен вернуть объект типа <code className="text-orange-700 dark:text-orange-400">ICustomFieldRenderResult</code> с созданным элементом и опциональными методами.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-orange-500">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Шаг 3: Зарегистрируйте рендерер</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                После создания экземпляра BlockBuilder вызовите <code className="text-orange-700 dark:text-orange-400">registerCustomFieldRenderer()</code>, 
                передав экземпляр вашего класса рендерера. <strong>Важно:</strong> регистрируйте рендереры до инициализации UI (до первого рендеринга формы).
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-orange-500">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Шаг 4: Используйте в конфигурации поля</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                В конфигурации блока создайте поле с <code className="text-orange-700 dark:text-orange-400">type: 'custom'</code> и укажите 
                <code className="text-orange-700 dark:text-orange-400">customFieldConfig.rendererId</code> — ID вашего зарегистрированного рендерера.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Интерфейс ICustomFieldRenderer</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            Это интерфейс из пакета BlockBuilder, который вы <strong>обязаны</strong> реализовать. Он определяет структуру вашего класса рендерера:
          </p>
          <CodeBlock
            code={`// Импортируйте из пакета BlockBuilder
import type { ICustomFieldRenderer, ICustomFieldContext, ICustomFieldRenderResult } from '@mushket-co/block-builder';

// Этот интерфейс вы должны реализовать
interface ICustomFieldRenderer {
  readonly id: string;        // Уникальный ID рендерера (например, 'wysiwyg-editor')
  readonly name: string;      // Название для отображения
  
  // Главный метод - создает ваш кастомный компонент
  render(
    container: HTMLElement,    // DOM элемент, куда вставлять компонент
    context: ICustomFieldContext  // Контекст с данными и callbacks
  ): ICustomFieldRenderResult | Promise<ICustomFieldRenderResult>;
}

// Что передается в метод render() через context
interface ICustomFieldContext {
  fieldName: string;          // Имя поля (из field.field)
  label: string;              // Метка поля (из field.label)
  value: any;                 // Текущее значение поля
  required: boolean;          // Обязательно ли поле (из rules)
  options?: Record<string, any>; // Дополнительные опции из customFieldConfig.options
  onChange: (value: any) => void;    // Callback для обновления значения (обязательно вызывать при изменении!)
  onError?: (error: string | null) => void;  // Callback для отображения ошибок валидации
  formScope?: ICustomFieldFormScope;  // 1.8.0+ — formData, setField, repeater context (Vue/React)
}

interface ICustomFieldFormScope {
  formData: Record<string, any>
  setField: (name: string, value: any) => void
  repeater?: {
    itemIndex: number
    updateItemField: (fieldName: string, value: any) => void
  }
}

// Что должен вернуть метод render()
interface ICustomFieldRenderResult {
  element: HTMLElement | string;  // Созданный DOM элемент или HTML строка (обязательно!)
  getValue?: () => any;           // Функция для получения текущего значения (опционально)
  setValue?: (value: any) => void; // Функция для программной установки значения (опционально)
  validate?: () => string | null;  // Функция валидации: возвращает ошибку (string) или null если валидно (опционально)
  destroy?: () => void;           // Функция очистки ресурсов при удалении поля (опционально, но рекомендуется!)
}`}
            language="typescript"
            className="mb-4"
          />
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 mt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Важно:</strong> Интерфейс <code className="text-yellow-700 dark:text-yellow-400">ICustomFieldRenderer</code> и связанные типы нужно импортировать из пакета BlockBuilder. 
              Они не экспортируются напрямую, но доступны через типы TypeScript.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Полный пример: WYSIWYG редактор с подробными комментариями</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            Рассмотрим создание кастомного рендерера для WYSIWYG редактора (редактор форматированного текста) с объяснением каждого элемента:
          </p>
          <CodeBlock
            code={`// 1. Создаем класс, который реализует интерфейс ICustomFieldRenderer
// Это ОБЯЗАТЕЛЬНО - класс должен соответствовать интерфейсу из BlockBuilder
class WysiwygFieldRenderer implements ICustomFieldRenderer {
  // 2. Уникальный ID рендерера - используется в customFieldConfig.rendererId
  readonly id = 'wysiwyg-editor';
  
  // 3. Название рендерера (необязательно, но полезно для отладки)
  readonly name = 'WYSIWYG Editor';

  // 4. Главный метод - создает ваш кастомный компонент
  // container - DOM элемент, куда нужно вставить ваш компонент
  // context - объект с данными поля и callbacks для взаимодействия
  render(container: HTMLElement, context: ICustomFieldContext) {
    // 5. Извлекаем нужные данные из context
    const { 
      value,        // Текущее значение поля (может быть пустым)
      onChange,     // Callback для обновления значения - ОБЯЗАТЕЛЬНО вызывать при изменении!
      onError,      // Callback для отображения ошибок валидации
      required,     // Является ли поле обязательным
      options       // Дополнительные опции из customFieldConfig.options
    } = context;
    
    // 6. Создаем DOM элемент для нашего редактора
    const editorElement = document.createElement('div');
    editorElement.className = 'wysiwyg-editor';
    editorElement.contentEditable = 'true'; // Делаем элемент редактируемым
    editorElement.innerHTML = value || '';   // Устанавливаем начальное значение
    
    // 7. Применяем опции из конфигурации (если есть)
    if (options?.height) {
      editorElement.style.height = options.height;
    }
    
    // 8. Вешаем обработчик события 'input' для отслеживания изменений
    // ВАЖНО: при каждом изменении вызываем onChange() для уведомления BlockBuilder
    editorElement.addEventListener('input', () => {
      try {
        const newValue = editorElement.innerHTML;
        onChange(newValue);  // Уведомляем BlockBuilder о новом значении
        onError?.(null);      // Очищаем ошибку при успешном изменении
      } catch (error) {
        onError?.(error.message); // Передаем ошибку в BlockBuilder для отображения
      }
    });
    
    // 9. Обработка потери фокуса для валидации
    editorElement.addEventListener('blur', () => {
      if (required && !editorElement.innerHTML.trim()) {
        onError?.('Поле обязательно для заполнения');
      }
    });
    
    // 10. Вставляем созданный элемент в контейнер
    container.appendChild(editorElement);
    
    // 11. Возвращаем объект ICustomFieldRenderResult
    // element - ОБЯЗАТЕЛЬНО! Созданный DOM элемент
    // Остальные методы опциональны, но рекомендуются
    return {
      element: editorElement,  // Созданный элемент (обязательно!)
      
      // Опционально: функция для получения текущего значения
      // Если не указана, значение берется через onChange callback
      getValue: () => editorElement.innerHTML,
      
      // Опционально: функция для программной установки значения
      // Полезно для программного обновления поля
      setValue: (val: string) => {
        editorElement.innerHTML = val || '';
      },
      
      // Опционально: функция валидации
      // Возвращает строку с ошибкой или null если валидно
      validate: () => {
        if (required && !editorElement.innerHTML.trim()) {
          return 'Поле обязательно для заполнения';
        }
        return null; // null = валидация прошла успешно
      },
      
      // Опционально: функция очистки ресурсов
      // ВАЖНО: всегда реализуйте destroy() для очистки event listeners и других ресурсов!
      destroy: () => {
        // Удаляем event listeners (в реальном коде нужно сохранить ссылки на обработчики)
        editorElement.remove(); // Удаляем элемент из DOM
      }
    };
  }
}

// 12. Регистрация рендерера после создания экземпляра BlockBuilder
import { BlockBuilder } from '@mushket-co/block-builder';

const blockBuilder = new BlockBuilder({
  containerId: 'block-container',
  blockConfigs: {
    // ваши конфигурации блоков
  }
});

// Регистрируем наш рендерер ДО инициализации UI
blockBuilder.registerCustomFieldRenderer(new WysiwygFieldRenderer());`}
            language="typescript"
            className="mb-4"
          />
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Ключевые моменты из примера:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li><strong>Класс реализует интерфейс:</strong> <code className="text-blue-700 dark:text-blue-400">implements ICustomFieldRenderer</code> — это обязательное требование</li>
              <li><strong>Метод render():</strong> получает контейнер и контекст, возвращает объект с элементом и методами</li>
              <li><strong>onChange callback:</strong> обязательно вызывайте при каждом изменении значения для синхронизации с BlockBuilder</li>
              <li><strong>onError callback:</strong> используйте для отображения ошибок валидации (доступен в context с версии 1.0.30+)</li>
              <li><strong>validate() метод:</strong> опционально, но рекомендуется для кастомной валидации (доступен в ICustomFieldRenderResult с версии 1.0.30+)</li>
              <li><strong>ControlManager (v1.0.30+):</strong> гарантирует, что элемент уже в DOM при вызове render(), не используйте setTimeout для инициализации</li>
              <li><strong>Wrapper элемент:</strong> рекомендуется возвращать wrapper элемент, а не container напрямую, для лучшей изоляции</li>
              <li><strong>onError callback:</strong> используйте для отображения ошибок валидации пользователю</li>
              <li><strong>Метод destroy():</strong> критически важен для очистки ресурсов и предотвращения утечек памяти</li>
              <li><strong>Регистрация:</strong> регистрируйте рендерер до первого рендеринга формы</li>
              <li><strong>⚠️ Важно для внешних библиотек:</strong> При использовании внешних библиотек (Jodit, TinyMCE и т.д.) храните экземпляр редактора <strong>локально в методе render</strong> (как <code className="text-blue-700 dark:text-blue-400">const editor = ...</code>), а не как свойство класса. Это критично для корректной работы в repeater полях, где создается несколько экземпляров редактора одновременно.</li>
            </ul>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Использование в конфигурации блока</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            После регистрации рендерера вы можете использовать его в конфигурации любого блока. 
            Для этого создайте поле с типом <code className="text-orange-700 dark:text-orange-400">'custom'</code> и укажите ID вашего рендерера в <code className="text-orange-700 dark:text-orange-400">customFieldConfig</code>:
          </p>
          <CodeBlock
            code={`const blockConfigs = {
  richText: {
    title: 'Rich Text блок',
    icon: '📝',
    description: 'Блок с форматированным текстом',
    fields: [
      {
        field: 'content',           // Имя поля - будет доступно в block.props.content
        label: 'Содержимое',        // Метка поля в форме
        type: 'custom',              // ОБЯЗАТЕЛЬНО: указываем тип 'custom'
        customFieldConfig: {
          rendererId: 'wysiwyg-editor',  // ID зарегистрированного рендерера (обязательно!)
          options: {                      // Дополнительные опции передаются в context.options
            height: '300px',             // Высота редактора
            toolbar: true                 // Показать панель инструментов
          }
        },
        defaultValue: '',           // Начальное значение поля
        rules: [                     // Правила валидации
          { type: 'required', message: 'Содержимое обязательно' }
        ]
      }
    ],
    render: {
      kind: 'html',
      template: (props) => '<div class="rich-text">' + (props.content || '') + '</div>'
    }
  }
};`}
            language="javascript"
            className="mb-4"
          />
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 mt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Важно:</strong> Значение <code className="text-yellow-700 dark:text-yellow-400">customFieldConfig.rendererId</code> 
              должно точно совпадать с <code className="text-yellow-700 dark:text-yellow-400">id</code> вашего рендерера. 
              Если рендерер с таким ID не зарегистрирован, поле не будет отображаться корректно.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">API для работы с кастомными рендерерами</h3>
          <div className="space-y-3">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-orange-700 dark:text-orange-400">registerCustomFieldRenderer(renderer)</code>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Регистрация одного кастомного рендерера поля.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-orange-700 dark:text-orange-400">registerCustomFieldRenderers(renderers)</code>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Массовая регистрация нескольких рендереров.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-orange-700 dark:text-orange-400">getCustomFieldRenderer(id)</code>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Получение рендерера по ID. Возвращает <code className="text-orange-700 dark:text-orange-400">ICustomFieldRenderer | null</code>.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-orange-700 dark:text-orange-400">hasCustomFieldRenderer(id)</code>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Проверка наличия рендерера. Возвращает <code className="text-orange-700 dark:text-orange-400">boolean</code>.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-orange-700 dark:text-orange-400">unregisterCustomFieldRenderer(id)</code>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Удаление рендерера по ID. Возвращает <code className="text-orange-700 dark:text-orange-400">boolean</code>.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-orange-700 dark:text-orange-400">getAllCustomFieldRenderers()</code>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Получение всех зарегистрированных рендереров. Возвращает <code className="text-orange-700 dark:text-orange-400">Map&lt;string, ICustomFieldRenderer&gt;</code>.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Icon name="warning" size={18} className="text-yellow-600 dark:text-yellow-400" />
            Важные моменты
          </h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>В методе <code className="text-yellow-700 dark:text-yellow-400">render()</code> возвращайте новый элемент в <code className="text-yellow-700 dark:text-yellow-400">result.element</code>, даже если используете переданный <code className="text-yellow-700 dark:text-yellow-400">container</code></li>
            <li>Всегда реализуйте метод <code className="text-yellow-700 dark:text-yellow-400">destroy()</code> для очистки ресурсов (event listeners, subscriptions)</li>
            <li>Используйте <code className="text-yellow-700 dark:text-yellow-400">onChange</code> для уведомления об изменениях значения</li>
            <li>Используйте <code className="text-yellow-700 dark:text-yellow-400">onError</code> для отображения ошибок валидации</li>
            <li>Метод <code className="text-yellow-700 dark:text-yellow-400">validate()</code> должен возвращать <code className="text-yellow-700 dark:text-yellow-400">string | null</code> (null = валидно)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
