'use client';

import CodeBlock from '@/components/CodeBlock';
import Icon from '@/components/Icon';
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
    <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-900/10 rounded-lg p-4 border border-pink-200 dark:border-pink-800">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-2xl flex items-center">
          {icon === '📝' && <Icon name="pen" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '📄' && <Icon name="document" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🔢' && <Icon name="number" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '📋' && <Icon name="clipboard" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '☑️' && <Icon name="checkbox" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🔘' && <Icon name="radio" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🎨' && <Icon name="paintbrush" size={28} className="text-pink-600 dark:text-pink-400" />}
          {icon === '🖼️' && <Icon name="image" size={28} className="text-pink-600 dark:text-pink-400" />}
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

export default function FieldTypesSection({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Типы полей</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Поддерживаемые типы полей для форм редактирования и создания блоков
        </p>
      </div>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Что такое типы полей?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Типы полей — это элементы интерфейса, которые используются в <strong>формах редактирования и создания блоков</strong>. 
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
        type: 'textarea',          // Тип поля
        placeholder: 'Введите текст...',
        defaultValue: '',
        rules: [
          { type: 'required', message: 'Текст обязателен' },
          { type: 'minLength', value: 1, message: 'Текст не может быть пустым' }
        ]
      },
      {
        field: 'fontSize',
        label: 'Размер шрифта',
        type: 'number',
        defaultValue: 16,
        rules: [
          { type: 'required', message: 'Размер обязателен' },
          { type: 'min', value: 8, message: 'Минимум: 8px' },
          { type: 'max', value: 72, message: 'Максимум: 72px' }
        ]
      },
      {
        field: 'color',
        label: 'Цвет текста',
        type: 'color',
        defaultValue: '#333333'
      },
      {
        field: 'textAlign',
        label: 'Выравнивание',
        type: 'select',
        options: [
          { value: 'left', label: 'По левому краю' },
          { value: 'center', label: 'По центру' },
          { value: 'right', label: 'По правому краю' }
        ],
        defaultValue: 'left'
      }
    ]
  }
}`}
          language="javascript"
          className="mb-4"
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Доступные типы полей</h2>
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
            description="Выпадающий список для выбора одного или нескольких значений из options. Множественный выбор: multiple: true." 
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

// Множественный выбор
{
  field: 'topics',
  label: 'Темы',
  type: 'select',
  multiple: true,
  options: [
    { value: 'dev', label: 'Разработка' },
    { value: 'design', label: 'Дизайн' }
  ],
  defaultValue: ['dev']
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
            description="Загрузка файлов с отдельным UI (список имён, не превью). multiple и maxCount." 
            icon="📄"
            example={`{
  field: 'files',
  label: 'Файлы',
  type: 'file',
  multiple: true,
  fileUploadConfig: { uploadUrl: '/api/upload', maxCount: 5 }
}`}
            parameters={['field', 'label', 'type', 'multiple', 'fileUploadConfig', 'rules']}
          />

          <FieldTypeCard 
            name="block-anchor" 
            description="Якорь #block-id или URL в форме. Скролл, preventDefault и поведение ссылки — в компоненте блока пользователя." 
            icon="🔗"
            example={`{
  field: 'url',
  type: 'block-anchor',
  blockAnchorConfig: { allowCustomUrl: true }
}`}
            parameters={['field', 'label', 'type', 'blockAnchorConfig', 'rules']}
          />

          <FieldTypeCard 
            name="matrix-table" 
            description="Редактор таблицы (колонки + строки)" 
            icon="📋"
            example={`{
  field: 'tableMatrix',
  type: 'matrix-table',
  matrixTableConfig: { imageUploadConfig: { maxFileSize: 5242880 } }
}`}
            parameters={['field', 'label', 'type', 'matrixTableConfig', 'defaultValue', 'rules']}
          />
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
              <code className="text-green-700 dark:text-green-400">'number'</code>, <code className="text-green-700 dark:text-green-400">'select'</code>, 
              <code className="text-green-700 dark:text-green-400">'checkbox'</code>, <code className="text-green-700 dark:text-green-400">'radio'</code>, 
              <code className="text-green-700 dark:text-green-400">'color'</code>, <code className="text-green-700 dark:text-green-400">'image'</code>,
              <code className="text-green-700 dark:text-green-400">'file'</code>, <code className="text-green-700 dark:text-green-400">'block-anchor'</code>,
              <code className="text-green-700 dark:text-green-400">'matrix-table'</code>
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
              Подсказка, отображаемая в пустом поле (для типов <code className="text-green-700 dark:text-green-400">text</code> и <code className="text-green-700 dark:text-green-400">textarea</code>).
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
                <strong>select:</strong> в <code>props</code> — массив <code>value</code>;{' '}
                <code>defaultValue: []</code> или массив начальных значений
              </li>
              <li>
                <strong>image / file:</strong> несколько загруженных файлов
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">rules</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(опциональный)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Массив правил валидации. Поддерживаемые типы:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-4">
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'required', message: '...' }`}</code> — поле обязательно</li>
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'minLength', value: 1, message: '...' }`}</code> — минимальная длина</li>
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'maxLength', value: 100, message: '...' }`}</code> — максимальная длина</li>
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'min', value: 0, message: '...' }`}</code> — минимальное значение (для number)</li>
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'max', value: 100, message: '...' }`}</code> — максимальное значение (для number)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
