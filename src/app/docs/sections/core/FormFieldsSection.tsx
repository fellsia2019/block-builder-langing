'use client';

import CodeBlock from '@/components/CodeBlock';
import Icon from '@/components/Icon';
import type { NavigationProps } from '../../types';
import DocHeading from '../../components/DocHeading';
import type { ReactNode } from 'react';
import DocAnchor from '../../components/DocAnchor';

function ParamDoc({
  name,
  badge,
  children,
}: {
  name: string;
  badge?: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-slate-800/60 rounded-lg p-4 border border-green-200/60 dark:border-green-800/40">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5">
        <code className="text-green-700 dark:text-green-400">{name}</code>
        {badge ? (
          <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">{badge}</span>
        ) : null}
      </h3>
      <div className="text-sm text-gray-600 dark:text-gray-400">{children}</div>
    </div>
  );
}

function FieldTypeCard({
  name,
  description,
  icon,
  example,
}: {
  name: string;
  description: string;
  icon: string;
  example?: string;
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
      {example ? (
        <div className="mt-3">
          <CodeBlock code={example} language="javascript" className="text-xs" />
        </div>
      ) : null}
    </div>
  );
}

export default function FormFieldsSection(_props: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Поля форм</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Типы полей и кастомные рендереры для форм редактирования и создания блоков
        </p>
      </div>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <DocHeading id="overview">Обзор</DocHeading>
        <p className="text-gray-600 dark:text-gray-400">
          В конфигурации типа блока задаёте массив <code className="text-blue-700 dark:text-blue-400">fields</code> —
          BlockBuilder строит форму создания и редактирования и сохраняет значения в <code className="text-blue-700 dark:text-blue-400">props</code>.
        </p>
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="validation" className="flex items-center gap-2">
          <Icon name="shield" size={22} className="text-teal-600 dark:text-teal-400" />
          <span>Валидация в UI</span>
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Ошибки показываются в футере модалки и обновляются при изменении полей после неуспешного сохранения.
          Для своей формы без <code>BlockBuilderComponent</code> —{' '}
          <code className="text-teal-700 dark:text-teal-400">ReactiveFormValidationTracker</code> в разделе «Утилиты».
          У кастомного рендерера <code>setError</code> вызывается только при смене текста ошибки.
        </p>
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
        field: 'rating',
        label: 'Рейтинг',
        type: 'custom',
        customFieldConfig: {
          rendererId: 'star-rating'
        },
        defaultValue: 0
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
        <DocHeading id="field-types">Стандартные типы полей</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Встроенные контролы для <code>fields</code>. Описание параметров — в разделе{' '}
          <DocAnchor id="field-params">Параметры полей</DocAnchor> ниже.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldTypeCard
            name="text"
            description="Заголовки и короткие строки"
            icon="📝"
            example={`{
  field: 'title',
  label: 'Заголовок',
  type: 'text',
  placeholder: 'Введите заголовок...',
  defaultValue: ''
}`}
          />
          
          <FieldTypeCard 
            name="textarea" 
            description="Длинный текст, описания, контент" 
            icon="📄"
            example={`{
  field: 'content',
  label: 'Содержимое',
  type: 'textarea',
  placeholder: 'Введите текст...',
  defaultValue: ''
}`}
          />

          <FieldTypeCard 
            name="email" 
            description="Контактный email с проверкой формата" 
            icon="📧"
            example={`{
  field: 'contactEmail',
  label: 'Email',
  type: 'email',
  placeholder: 'example@mail.com',
  defaultValue: ''
}`}
          />

          <FieldTypeCard 
            name="url" 
            description="Ссылка с проверкой формата" 
            icon="🔗"
            example={`{
  field: 'websiteUrl',
  label: 'Сайт',
  type: 'url',
  placeholder: 'https://example.com',
  defaultValue: ''
}`}
          />
          
          <FieldTypeCard 
            name="number" 
            description="Размеры, счётчики, числовые настройки" 
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
          />
          
          <FieldTypeCard 
            name="select" 
            description="Выбор из фиксированного списка options"
            icon="📋"
            example={`{
  field: 'textAlign',
  label: 'Выравнивание',
  type: 'select',
  options: [
    { value: 'left', label: 'По левому краю' },
    { value: 'center', label: 'По центру' }
  ],
  defaultValue: 'left'
}`}
          />
          
          <FieldTypeCard 
            name="checkbox" 
            description="Включено / выключено, видимость, флаги" 
            icon="☑️"
            example={`{
  field: 'visible',
  label: 'Видимый',
  type: 'checkbox',
  defaultValue: true
}`}
          />
          
          <FieldTypeCard 
            name="radio" 
            description="Один вариант из options, все опции видны сразу" 
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
          />
          
          <FieldTypeCard 
            name="color" 
            description="Цвет фона, текста, акцентов (HEX)" 
            icon="🎨"
            example={`{
  field: 'backgroundColor',
  label: 'Цвет фона',
  type: 'color',
  defaultValue: '#ffffff'
}`}
          />
          
          <FieldTypeCard 
            name="image" 
            description="Картинка блока с preview и загрузкой на сервер" 
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
          />

          <FieldTypeCard 
            name="file" 
            description="Документы и архивы — список файлов, без preview" 
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
          />

          <FieldTypeCard 
            name="file-import" 
            description="Кнопка импорта: данные из файла попадают в другие поля формы"
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
          />

          <FieldTypeCard 
            name="block-anchor" 
            description="Ссылка на блок страницы (#id) или внешний URL" 
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
          />

          <FieldTypeCard 
            name="matrix-table" 
            description="Таблица с заголовками, HTML и картинками в ячейках" 
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
          />

          <FieldTypeCard 
            name="custom" 
            description="Произвольный UI — свой рендерер по rendererId" 
            icon="🔧"
            example={`{
  field: 'rating',
  label: 'Рейтинг',
  type: 'custom',
  customFieldConfig: {
    rendererId: 'star-rating'
  },
  defaultValue: 0
}`}
          />

          <FieldTypeCard 
            name="api-select" 
            description="Справочники с бэкенда: поиск и подгрузка страниц" 
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
          />
        </div>
      </section>
      <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-4 border-green-500">
        <DocHeading id="field-params">Параметры полей</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Каждый объект в массиве <code>fields</code> описывает одно поле формы. При сохранении блока значения попадают
          в <code>block.props</code> под ключом <code>field</code> (кроме полей с <code>persist: false</code>).
        </p>

        <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Базовые</h3>
        <div className="space-y-3 mb-8">
          <ParamDoc name="field" badge="обязательный">
            <p>
              Имя свойства в <code>props</code> блока. По нему читаете значение в render-компоненте (
              <code>props.title</code>, <code>props.cards</code>). Должно быть уникальным в рамках типа блока.
            </p>
          </ParamDoc>
          <ParamDoc name="label" badge="обязательный">
            <p>Подпись поля в форме редактирования. На сохранённые данные не влияет.</p>
          </ParamDoc>
          <ParamDoc name="type" badge="обязательный">
            <p>
              Какой контрол показать и как хранить значение. От типа зависят допустимые параметры: для{' '}
              <code>select</code> нужен <code>options</code>, для <code>image</code> — <code>fileUploadConfig</code> и т.д.
              Список типов — в разделе <DocAnchor id="field-types">Стандартные типы полей</DocAnchor>.
            </p>
          </ParamDoc>
          <ParamDoc name="defaultValue" badge="опциональный">
            <p>
              Значение сразу после создания нового блока. Без него — пустая строка, <code>0</code>, <code>false</code> или{' '}
              <code>[]</code> в зависимости от типа. Для <code>repeater</code> — массив элементов; для{' '}
              <code>select</code> с <code>multiple</code> — массив <code>value</code>.
            </p>
          </ParamDoc>
          <ParamDoc name="placeholder" badge="опциональный">
            <p>Серая подсказка в пустом поле ввода. Работает для <code>text</code>, <code>textarea</code>, <code>email</code>, <code>url</code>.</p>
          </ParamDoc>
        </div>

        <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Выбор значений</h3>
        <div className="space-y-3 mb-8">
          <ParamDoc name="options" badge="select, radio">
            <p>
              Статический список вариантов. <code>value</code> пишется в <code>props</code>, <code>label</code> видит
              пользователь. <code>disabled: true</code> — опция отображается, но недоступна для выбора.
            </p>
          </ParamDoc>
          <ParamDoc name="multiple" badge="select, image, file">
            <p>
              Несколько значений вместо одного: в <code>select</code> — массив <code>value</code>, в{' '}
              <code>image</code>/<code>file</code> — несколько загрузок. У{' '}
              <DocAnchor id="api-select">api-select</DocAnchor> множественный режим задаётся в{' '}
              <code>apiSelectConfig.multiple</code>, не здесь.
            </p>
          </ParamDoc>
          <ParamDoc name="optionsFrom" badge="select">
            <p>
              Опции строятся из значения другого поля — для зависимых списков (страна → город) без ручного
              дублирования <code>options</code>. <code>source</code> — имя поля-источника, <code>when</code> — условие,
              <code>map</code> — преобразование в массив options. Статический <code>options</code> остаётся fallback.
            </p>
          </ParamDoc>
        </div>

        <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Валидация и видимость</h3>
        <div className="space-y-3 mb-8">
          <ParamDoc name="rules" badge="опциональный">
            <p className="mb-2">
              Проверки перед сохранением. Ошибки показываются в футере модалки. У каждого правила опциональный{' '}
              <code>message</code> — иначе используется текст по умолчанию.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><code>required</code> — поле не пустое</li>
              <li><code>minLength</code> / <code>maxLength</code> — длина строки (<code>value</code> — число)</li>
              <li><code>min</code> / <code>max</code> — диапазон для <code>number</code></li>
              <li><code>pattern</code> — регулярное выражение (<code>value</code> — строка regex)</li>
              <li><code>email</code> / <code>url</code> — формат адреса</li>
              <li><code>custom</code> — <code>validator: (value) =&gt; boolean</code></li>
            </ul>
          </ParamDoc>
          <ParamDoc name="dependsOn" badge="опциональный">
            <p>
              Поле видно только когда другое поле совпадает с условием. Скрытые поля не валидируются и не мешают
              сохранению. Подробнее — <DocAnchor id="depends-on">Условное отображение</DocAnchor>.
            </p>
          </ParamDoc>
          <ParamDoc name="persist" badge="опциональный, по умолчанию true">
            <p>
              <code>false</code> — поле участвует в форме, но не попадает в <code>block.props</code> при save.
              Нужно для служебных UI: кнопка импорта, переключатели настройки формы. У <code>file-import</code>{' '}
              persist выключен по умолчанию. Работает и внутри <code>repeater</code>.
            </p>
          </ParamDoc>
        </div>

        <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Конфиги по типам поля</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Дополнительные объекты — только когда стандартных параметров недостаточно:
        </p>
        <div className="space-y-3">
          <ParamDoc name="spacingConfig / spacingOptions">
            <p>
              Отступы блока (padding/margin) по брекпоинтам. <code>spacingOptions</code> на уровне конфига типа блока
              добавляет поле автоматически; <code>spacingConfig</code> — при ручном <code>type: &apos;spacing&apos;</code>.
              См. <DocAnchor id="spacing">Spacing</DocAnchor>.
            </p>
          </ParamDoc>
          <ParamDoc name="repeaterConfig">
            <p>
              Структура массива однотипных элементов: вложенные <code>fields</code>, лимиты min/max, подписи кнопок.
              См. <DocAnchor id="repeater">Repeater</DocAnchor>.
            </p>
          </ParamDoc>
          <ParamDoc name="fileUploadConfig">
            <p>
              POST файла на ваш сервер (<code>uploadUrl</code>, <code>responseMapper</code>) вместо хранения base64 в props.
              Для <DocAnchor id="image">image</DocAnchor> и <DocAnchor id="file">file</DocAnchor>.
            </p>
          </ParamDoc>
          <ParamDoc name="fileImportConfig">
            <p>
              Загрузка файла как действие: ответ API сливается в другие поля формы через <code>merge</code> (append/replace,
              dedupe). Само поле в props не сохраняется.
            </p>
          </ParamDoc>
          <ParamDoc name="blockAnchorConfig">
            <p>
              Выбор якоря <code>#block-id</code> или произвольного URL в форме. Скролл и клик — в вашем компоненте блока.
              См. <DocAnchor id="block-anchor">block-anchor</DocAnchor>.
            </p>
          </ParamDoc>
          <ParamDoc name="matrixTableConfig">
            <p>
              Настройки редактора таблицы (подписи вкладок, лимит размера картинок в ячейках). См.{' '}
              <DocAnchor id="matrix-table">matrix-table</DocAnchor>.
            </p>
          </ParamDoc>
          <ParamDoc name="apiSelectConfig">
            <p>
              URL API, параметры поиска/пагинации, маппинг ответа. См.{' '}
              <DocAnchor id="api-select">api-select</DocAnchor>.
            </p>
          </ParamDoc>
          <ParamDoc name="customFieldConfig">
            <p>
              <code>rendererId</code> — id зарегистрированного рендерера; <code>options</code> — произвольные настройки,
              доступные в <code>context.options</code>. См.{' '}
              <DocAnchor id="custom-renderers">кастомные рендереры</DocAnchor>.
            </p>
          </ParamDoc>
        </div>
      </section>

      <section className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-xl p-6 border-l-4 border-fuchsia-500">
        <DocHeading id="select">Поле - список (select)</DocHeading>

        <CodeBlock
          code={`{
  field: 'topics',
  label: 'Темы',
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

        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
          <li>
            Без <code>multiple</code> в <code>props</code> — одно <code>value</code> из <code>options</code>
          </li>
          <li>
            С <code>multiple: true</code> — массив <code>value</code>; <code>defaultValue</code> тоже массив (или <code>[]</code>)
          </li>
        </ul>

        <CodeBlock
          code={`// Отображение label по value в компоненте блока
const topicLabels = (props.topics ?? []).map(
  (v) => options.find((o) => o.value === v)?.label ?? v
)`}
          language="javascript"
          className="text-xs"
        />
      </section>

      <section className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border-l-4 border-purple-500">
        <DocHeading id="spacing" className="flex items-center gap-2">
          Поле - отступы (spacing)
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Отступы блока по брекпоинтам. Удобнее подключать через <code>spacingOptions</code> в конфиге типа блока, чем полем <code>spacing</code> в <code>fields</code>.
        </p>
          <CodeBlock
            code={`const blockConfigs = {
  text: {
    fields: [/* ... */],
    spacingOptions: {
      enabled: true,
      spacingTypes: ['padding-top', 'padding-bottom', 'margin-top', 'margin-bottom'],
      config: { min: 0, max: 120, step: 8 }
    }
  }
}`}
            language="javascript"
            className="mb-4"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Явное поле <code>type: &apos;spacing&apos;</code> в <code>fields</code> игнорируется, если задано <code>spacingOptions</code>.
            Отступы в UI: margin на обёртку блока, padding — CSS-переменные <code>--spacing-padding-*</code> в вашем компоненте.
          </p>
      </section>

      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
        <DocHeading id="repeater">Поле - повторитель (repeater)</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Массив однотипных элементов — карточки, слайды, строки списка. Вложенные репитеры поддерживаются (<code>maxNestingDepth</code>, по умолчанию 2).
        </p>

        <CodeBlock
          code={`{
  field: 'cards',
  label: 'Карточки',
  type: 'repeater',
  repeaterConfig: {
    itemTitle: 'Карточка',
    addButtonText: 'Добавить карточку',
    min: 2,
    max: 20,
    defaultItemValue: { title: '', description: '', image: '' },
    fields: [
      { field: 'title', label: 'Заголовок', type: 'text', rules: [{ type: 'required' }] },
      { field: 'description', label: 'Описание', type: 'textarea' },
      { field: 'image', label: 'Изображение', type: 'image', defaultValue: '' }
    ]
  },
  defaultValue: []
}`}
          language="javascript"
          className="mb-4"
        />

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          <code>repeaterConfig.fields</code> — любые типы кроме <code>spacing</code>.
          <code> min</code> без явного значения: 1 при required, иначе 0.
          <code> countLabelVariants</code> — склонение счётчика («1 элемент», «2 элемента»).
        </p>

        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Вложенный repeater</h3>
        <CodeBlock
          code={`repeaterConfig: {
  itemTitle: 'Категория',
  fields: [
    { field: 'name', label: 'Название', type: 'text', rules: [{ type: 'required' }] },
    {
      field: 'products',
      label: 'Товары',
      type: 'repeater',
      repeaterConfig: {
        itemTitle: 'Товар',
        fields: [
          { field: 'name', label: 'Название', type: 'text', rules: [{ type: 'required' }] },
          { field: 'price', label: 'Цена', type: 'number', rules: [{ type: 'required' }] }
        ]
      }
    }
  ]
}`}
          language="javascript"
        />
      </section>

      <section className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-6 border-l-4 border-pink-500">
        <DocHeading id="image">Поле - изображение (image)</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Загрузка с preview. В <code>props</code> — URL строкой или объект <code>{'{ src, width, height, size }'}</code> после
          серверной загрузки. Base64 только для разработки; в продакшене — <code>fileUploadConfig.uploadUrl</code>.
        </p>
        <CodeBlock
          code={`{
  field: 'image',
  label: 'Изображение',
  type: 'image',
  fileUploadConfig: {
    uploadUrl: '/api/upload',
    maxFileSize: 5 * 1024 * 1024,
    accept: 'image/*',
    responseMapper: (response) => ({
      src: response.url,
      width: response.width,
      height: response.height,
    }),
  },
  defaultValue: ''
}`}
          language="javascript"
          className="mb-4"
        />
        <CodeBlock
          code={`// URL из string или object.src
const imageUrl = typeof props.image === 'string'
  ? props.image
  : props.image?.src ?? ''`}
          language="javascript"
          className="text-xs"
        />
      </section>

      <section className="bg-slate-50 dark:bg-slate-900/20 rounded-xl p-6 border-l-4 border-slate-500">
        <DocHeading id="file">Поле - файл (file)</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Загрузка документов и произвольных файлов. Список имён в форме, без превью как у <code>image</code>.
          В <code>props</code> — URL строкой или массив URL при <code>multiple: true</code>.
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
      </section>

      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
        <DocHeading id="block-anchor">Поле - якорь (block-anchor)</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Выбор блока страницы (<code>#block-id</code>) или произвольного URL. Скролл и поведение ссылки — в вашем компоненте блока;
          форма только сохраняет значение.
        </p>

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

        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Пример скролла к блоку</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          Целевой блок должен иметь <code>data-block-id</code> (BlockBuilder выставляет при рендере):
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
      </section>

      <section className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border-l-4 border-emerald-500">
        <DocHeading id="matrix-table">Поле - таблица (matrix-table)</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Редактор таблицы: колонки и строки, типы ячеек (<code>default</code>, HTML, <code>image</code>).
          В <code>props</code> — <code>{'{ tableHead, tableBody }'}</code>.
        </p>
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
        />
      </section>

      <section className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-6 border-l-4 border-cyan-500">
        <DocHeading id="api-select">Поле - выбор из API (api-select)</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Поиск и пагинация по внешнему API. «Загрузить ещё» — при <code>hasMore: true</code> в ответе.
        </p>

        <CodeBlock
          code={`{
  field: 'categoryId',
  label: 'Категория',
  type: 'api-select',
  apiSelectConfig: {
    url: '/api/categories',
    searchParam: 'search',
    pageParam: 'page',
    limitParam: 'limit',
    limit: 20,
    idField: 'id',
    nameField: 'name',
    minSearchLength: 2,
    responseMapper: (response) => ({
      data: response.items ?? response.data ?? [],
      total: response.total,
      page: response.page,
      hasMore: response.hasMore
    })
  },
  defaultValue: null
}`}
          language="javascript"
          className="mb-4"
        />

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Ожидаемый формат ответа:</p>
        <CodeBlock
          code={`{
  "data": [{ "id": 1, "name": "Категория 1" }],
  "total": 100,
  "page": 1,
  "hasMore": true
}`}
          language="json"
        />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Другой формат — <code>responseMapper</code> или <code>dataPath</code>.
          Множественный выбор — <code>apiSelectConfig.multiple</code>.
        </p>
      </section>

      <section className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border-l-4 border-emerald-500">
        <DocHeading id="depends-on">Поле - условное отображение (dependsOn)</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Поле показывается, если другое поле совпадает с условием. Скрытые поля не валидируются.
        </p>

        <CodeBlock
          code={`{
  field: 'autoplayDelay',
  label: 'Задержка (мс)',
  type: 'number',
  defaultValue: 3000,
  dependsOn: {
    field: 'autoplay',
    value: true,
    operator: 'equals'  // equals | notEquals | in | notIn
  }
}`}
          language="javascript"
          className="mb-4"
        />

        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Внутри repeater</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            <code>dependsOn.field</code> ссылается на поле того же элемента репитера.
          </p>
          <CodeBlock
            code={`repeaterConfig: {
  fields: [
    { field: 'hasImage', label: 'Есть изображение', type: 'checkbox' },
    {
      field: 'imageUrl',
      label: 'URL',
      type: 'text',
      dependsOn: { field: 'hasImage', value: true }
    }
  ]
}`}
            language="javascript"
          />
        </div>
      </section>


      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <DocHeading id="custom-renderers">Кастомные рендереры полей</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Для <code>type: &apos;custom&apos;</code>: реализуйте <code>ICustomFieldRenderer</code>, зарегистрируйте через{' '}
          <code>registerCustomFieldRenderer</code> до первого рендера формы.
        </p>

        <CodeBlock
          code={`import type { ICustomFieldRenderer, ICustomFieldContext, ICustomFieldRenderResult } from '@mushket-co/block-builder';

class StarRatingRenderer implements ICustomFieldRenderer {
  readonly id = 'star-rating';
  readonly name = 'Star Rating';

  render(container: HTMLElement, context: ICustomFieldContext): ICustomFieldRenderResult {
    const { value, onChange } = context;
    const root = document.createElement('div');

    // ваш UI: React/Vue mount, сторонняя библиотека, plain DOM — на выбор
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.max = '5';
    input.value = String(value ?? 0);
    input.addEventListener('input', () => onChange(Number(input.value)));

    root.appendChild(input);
    container.appendChild(root);

    return {
      element: root,
      getValue: () => Number(input.value),
      destroy: () => root.remove(),
    };
  }
}

blockBuilder.registerCustomFieldRenderer(new StarRatingRenderer());`}
          language="typescript"
          className="mb-4"
        />

        <CodeBlock
          code={`{
  field: 'rating',
  label: 'Рейтинг',
  type: 'custom',
  customFieldConfig: {
    rendererId: 'star-rating',
    options: { max: 5 }
  },
  defaultValue: 0,
  rules: [{ type: 'required' }]
}`}
          language="javascript"
          className="mb-4"
        />

        <p className="text-sm text-gray-600 dark:text-gray-400">
          API: <code>registerCustomFieldRenderer</code>, <code>registerCustomFieldRenderers</code>,{' '}
          <code>getCustomFieldRenderer</code>, <code>hasCustomFieldRenderer</code>,{' '}
          <code>unregisterCustomFieldRenderer</code>, <code>getAllCustomFieldRenderers</code>.
          В repeater храните экземпляр редактора локально в <code>render()</code>, не в поле класса.
        </p>
      </section>
    </div>
  );
}

