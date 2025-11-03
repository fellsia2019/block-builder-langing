'use client';

import NextPageLink from '../../components/NextPageLink';
import ProBadge from '../../components/ProBadge';
import CodeBlock from '@/components/CodeBlock';
import Icon from '@/components/Icon';
import type { NavigationProps } from '../../types';

function FieldTypeCard({ 
  name, 
  description, 
  icon, 
  example,
  parameters,
  isPro = false
}: { 
  name: string; 
  description: string; 
  icon: string;
  example?: string;
  parameters?: string[];
  isPro?: boolean;
}) {
  const borderClass = isPro ? 'border-2 border-yellow-400' : 'border border-pink-200 dark:border-pink-800';
  
  return (
    <div className={`bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-900/10 rounded-lg p-4 ${borderClass} relative`}>
      {isPro && (
        <div className="absolute top-2 right-2">
          <ProBadge />
        </div>
      )}
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
          { type: 'required', message: 'Текст обязателен' },
          { type: 'minLength', value: 1, message: 'Текст не может быть пустым' }
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
            description="Выпадающий список для выбора одного значения из списка опций" 
            icon="📋"
            example={`{
  field: 'textAlign',
  label: 'Выравнивание',
  type: 'select',
  options: [
    { value: 'left', label: 'По левому краю' },
    { value: 'center', label: 'По центру' },
    { value: 'right', label: 'По правому краю' }
  ],
  defaultValue: 'left'
}`}
            parameters={['field', 'label', 'type', 'options', 'defaultValue', 'rules']}
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
  imageUploadConfig: {
    uploadUrl: '/api/upload',
    maxFileSize: 5 * 1024 * 1024,
    accept: 'image/*',
    responseMapper: (response) => ({
      src: response.url
    })
  }
}`}
            parameters={['field', 'label', 'type', 'defaultValue', 'imageUploadConfig', 'rules']}
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
            isPro={true}
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
            isPro={true}
          />
        </div>
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
                <strong>Кастомные брекпоинты</strong> (параметр <code className="text-yellow-700 dark:text-yellow-400">breakpoints</code>) доступны только в <strong>PRO версии</strong>. 
                В FREE версии используются только стандартные брекпоинты (desktop, tablet, mobile).
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
    breakpoints: [    // Кастомные брекпоинты (только PRO)
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
                <strong>PRO:</strong>
              </span> Параметр <code className="text-yellow-700 dark:text-yellow-400">breakpoints</code> в <code className="text-yellow-700 dark:text-yellow-400">config</code> 
              доступен только в PRO версии. В FREE версии кастомные брекпоинты игнорируются.
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
        breakpoints: [                   // Кастомные брекпоинты (только PRO)
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
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            Для применения spacing в вашем компоненте используйте утилиты BlockBuilder:
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
    collapsible: true,                   // Можно ли сворачивать элементы
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
          { type: 'required', message: 'Заголовок обязателен' }
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
                Не поддерживаются вложенные <code className="text-indigo-700 dark:text-indigo-400">repeater</code> и <code className="text-indigo-700 dark:text-indigo-400">spacing</code> поля.
              </p>
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

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-indigo-700 dark:text-indigo-400">collapsible</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(опциональный)</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Можно ли сворачивать/разворачивать элементы в интерфейсе. По умолчанию <code className="text-indigo-700 dark:text-indigo-400">false</code>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-6 border-l-4 border-pink-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Поле изображения (Image)</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Поле типа <code className="text-pink-700 dark:text-pink-400">image</code> предоставляет полную поддержку работы с изображениями: 
          загрузку файлов с preview, валидацию, поддержку двух форматов хранения (base64 строка или объект с метаданными), 
          а также настройку серверной загрузки.
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Два формата хранения данных</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            Поля типа <code className="text-pink-700 dark:text-pink-400">image</code> могут работать как со строками (base64), так и с объектами (серверная загрузка):
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Base64 изображения (строка):</h4>
              <CodeBlock
                code={`props: {
  image: "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}`}
                language="javascript"
                className="text-xs"
              />
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Серверная загрузка (объект):</h4>
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
            </div>
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
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            Для настройки серверной загрузки используйте параметр <code className="text-pink-700 dark:text-pink-400">imageUploadConfig</code>:
          </p>
          <CodeBlock
            code={`{
  field: 'image',
  label: 'Изображение',
  type: 'image',
  imageUploadConfig: {
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
                <strong>Важно:</strong> При использовании <code className="text-yellow-700 dark:text-yellow-400">uploadUrl</code> через 
                <code className="text-yellow-700 dark:text-yellow-400">responseMapper</code> <strong>ОБЯЗАТЕЛЬНО</strong> верните объект с полем 
                <code className="text-yellow-700 dark:text-yellow-400">src</code>, содержащим URL изображения.
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
  return \`<img src="\${getImageUrl(props.image)}" />\`;
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
            <li>Поддержка base64 (локальное хранение) и серверной загрузки</li>
            <li>Хранение метаданных изображения (ширина, высота, размер)</li>
            <li>Автоматическое извлечение URL из обоих форматов</li>
            <li>Поддержка repeater полей через data-атрибуты</li>
            <li>Встроенная валидация размера файла и типа</li>
          </ul>
        </div>
      </section>

      <section className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-6 border-l-4 border-cyan-500 border-2 border-yellow-400">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          Поле выбора из API (API Select)
          <ProBadge />
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 mb-4 border-l-4 border-yellow-400">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="flex items-center gap-1">
              <Icon name="star" size={16} className="text-yellow-600 dark:text-yellow-400" />
              <strong>PRO только:</strong>
            </span> Поле типа <code className="text-yellow-700 dark:text-yellow-400">api-select</code> доступно только в PRO версии. 
            В FREE версии такие поля автоматически скрываются из форм.
          </p>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Поле типа <code className="text-cyan-700 dark:text-cyan-400">api-select</code> позволяет выбирать элементы из внешнего API 
          с поддержкой поиска, пагинации и множественного выбора. Идеально для интеграции с вашими бэкенд API.
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Пример использования</h3>
          <CodeBlock
            code={`{
  field: 'categoryId',
  label: 'Категория',
  type: 'api-select',
  apiSelectConfig: {
    url: 'https://api.example.com/categories',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer token'
    },
    searchParam: 'search',        // Параметр для поиска (по умолчанию 'search')
    pageParam: 'page',            // Параметр для страницы (по умолчанию 'page')
    limitParam: 'limit',          // Параметр для лимита (по умолчанию 'limit')
    limit: 20,                    // Количество элементов на странице
    debounceMs: 300,              // Задержка для поиска в мс
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
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Массив опций в формате <code className="text-green-700 dark:text-green-400">{`[{ value: '...', label: '...' }]`}</code>. 
              <code className="text-green-700 dark:text-green-400">value</code> — значение, сохраняемое в props, 
              <code className="text-green-700 dark:text-green-400">label</code> — отображаемый текст.
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
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'required', message: '...' }`}</code> — поле обязательно</li>
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'minLength', value: 1, message: '...' }`}</code> — минимальная длина</li>
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'maxLength', value: 100, message: '...' }`}</code> — максимальная длина</li>
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'min', value: 0, message: '...' }`}</code> — минимальное значение (для number)</li>
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'max', value: 100, message: '...' }`}</code> — максимальное значение (для number)</li>
              <li><code className="text-green-700 dark:text-green-400">{`{ type: 'pattern', value: 'regex', message: '...' }`}</code> — регулярное выражение</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">spacingConfig</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(для type: 'spacing')</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Конфигурация для поля отступов. См. раздел "Поле отступов (Spacing)" выше.
              <br />
              <strong className="text-yellow-700 dark:text-yellow-400">Примечание:</strong> Параметр <code className="text-green-700 dark:text-green-400">breakpoints</code> 
              внутри <code className="text-green-700 dark:text-green-400">spacingConfig</code> доступен только в PRO версии.
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
              <code className="text-green-700 dark:text-green-400">imageUploadConfig</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(для type: 'image')</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Конфигурация для загрузки изображений на сервер. См. раздел "Поле изображения (Image)" выше.
              <br />
              Параметры: <code className="text-green-700 dark:text-green-400">uploadUrl</code>, <code className="text-green-700 dark:text-green-400">fileParamName</code>, 
              <code className="text-green-700 dark:text-green-400">maxFileSize</code>, <code className="text-green-700 dark:text-green-400">accept</code>, 
              <code className="text-green-700 dark:text-green-400">uploadHeaders</code>, <code className="text-green-700 dark:text-green-400">responseMapper</code>, 
              <code className="text-green-700 dark:text-green-400">onUploadError</code>.
            </p>
          </div>

          <div className="relative border-2 border-yellow-400 rounded-lg p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/10">
            <div className="absolute top-2 right-2">
              <ProBadge />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">apiSelectConfig</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(для type: 'api-select', только PRO)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Конфигурация для поля выбора из API. См. раздел "Поле выбора из API (API Select)" выше. 
              <strong className="text-yellow-700 dark:text-yellow-400"> Доступно только в PRO версии.</strong>
            </p>
          </div>

          <div className="relative border-2 border-yellow-400 rounded-lg p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/10">
            <div className="absolute top-2 right-2">
              <ProBadge />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-green-700 dark:text-green-400">customFieldConfig</code> <span className="text-gray-600 dark:text-gray-400 text-sm font-normal">(для type: 'custom', только PRO)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Конфигурация для кастомного поля. Должен содержать <code className="text-green-700 dark:text-green-400">rendererId</code> — 
              идентификатор зарегистрированного кастомного рендерера.
              <strong className="text-yellow-700 dark:text-yellow-400"> Доступно только в PRO версии.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Кастомные рендереры - оставляю существующий контент */}
      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500 border-2 border-yellow-400">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          Кастомные рендереры полей
          <ProBadge />
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 mb-4 border-l-4 border-yellow-400">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="flex items-center gap-1">
              <Icon name="star" size={16} className="text-yellow-600 dark:text-yellow-400" />
              <strong>PRO только:</strong>
            </span> Кастомные рендереры и поля типа <code className="text-yellow-700 dark:text-yellow-400">custom</code> доступны только в PRO версии. 
            В FREE версии такие поля автоматически скрываются из форм.
          </p>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Если стандартных типов полей недостаточно, вы можете создать собственный рендерер поля. 
          Это позволяет внедрять сторонние библиотеки (например, WYSIWYG редакторы, date pickers, color pickers) 
          в формы редактирования блоков.
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Когда использовать кастомные рендереры?</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>Нужен WYSIWYG редактор для форматирования текста</li>
            <li>Требуется date/time picker для выбора даты</li>
            <li>Нужен сложный компонент выбора (например, многоуровневое меню)</li>
            <li>Интеграция со сторонними библиотеками UI компонентов</li>
            <li>Создание собственных интерактивных элементов управления</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Интерфейс ICustomFieldRenderer</h3>
          <CodeBlock
            code={`interface ICustomFieldRenderer {
  readonly id: string;        // Уникальный ID рендерера
  readonly name: string;      // Название для отображения
  
  render(
    container: HTMLElement,
    context: ICustomFieldContext
  ): ICustomFieldRenderResult | Promise<ICustomFieldRenderResult>;
}

interface ICustomFieldContext {
  fieldName: string;          // Имя поля
  label: string;              // Лейбл поля
  value: any;                 // Текущее значение
  required: boolean;          // Обязательно ли поле
  rendererId: string;        // ID renderer'а
  options?: Record<string, any>; // Дополнительные опции
  onChange: (value: any) => void;    // Callback при изменении
  onError?: (error: string | null) => void;  // Callback для ошибок
}

interface ICustomFieldRenderResult {
  element: HTMLElement | string;  // DOM элемент или HTML строка
  getValue?: () => any;           // Получить текущее значение
  setValue?: (value: any) => void; // Установить значение
  validate?: () => string | null;  // Валидация (вернуть ошибку или null)
  destroy?: () => void;           // Очистка ресурсов
}`}
            language="typescript"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Пример создания кастомного рендерера</h3>
          <CodeBlock
            code={`class WysiwygFieldRenderer implements ICustomFieldRenderer {
  readonly id = 'wysiwyg-editor';
  readonly name = 'WYSIWYG Editor';

  render(container: HTMLElement, context: ICustomFieldContext) {
    const { value, onChange, onError } = context;
    
    // Создаем элемент для редактора
    const editorElement = document.createElement('div');
    editorElement.className = 'wysiwyg-editor';
    editorElement.innerHTML = value || '';
    editorElement.contentEditable = 'true';
    
    // Обработка изменений
    editorElement.addEventListener('input', () => {
      try {
        const newValue = editorElement.innerHTML;
        onChange(newValue);
        onError?.(null); // Очищаем ошибку при успешном изменении
      } catch (error) {
        onError?.(error.message);
      }
    });
    
    container.appendChild(editorElement);
    
    return {
      element: editorElement,
      getValue: () => editorElement.innerHTML,
      setValue: (val: string) => {
        editorElement.innerHTML = val || '';
      },
      validate: () => {
        if (context.required && !editorElement.innerHTML.trim()) {
          return 'Поле обязательно для заполнения';
        }
        return null;
      },
      destroy: () => {
        editorElement.remove();
      }
    };
  }
}

// Регистрация рендерера
const blockBuilder = new BlockBuilder({ /* ... */ });
blockBuilder.registerCustomFieldRenderer(new WysiwygFieldRenderer());`}
            language="typescript"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Использование в конфигурации блока</h3>
          <CodeBlock
            code={`const blockConfigs = {
  richText: {
    title: 'Rich Text блок',
    fields: [
      {
        field: 'content',
        label: 'Содержимое',
        type: 'custom',
        customFieldConfig: {
          rendererId: 'wysiwyg-editor'  // ID зарегистрированного рендерера
        },
        defaultValue: '',
        rules: [
          { type: 'required', message: 'Содержимое обязательно' }
        ]
      }
    ]
  }
};`}
            language="javascript"
            className="mb-4"
          />
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

      <NextPageLink nextSection={nextSection} nextTitle={nextTitle} nextHref={nextSection ? `/docs/core/${nextSection}` : null} color="primary" />
    </div>
  );
}
