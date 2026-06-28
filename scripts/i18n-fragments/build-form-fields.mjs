export function buildFormFields(locale) {
  const isRu = locale === 'ru';
  const L = (ru, en) => (isRu ? ru : en);

  return {
    title: L('Поля форм', 'Form fields'),
    subtitle: L(
      'Типы полей и кастомные рендереры для форм редактирования и создания блоков',
      'Field types and custom renderers for block editing and creation forms',
    ),
    overview: {
      title: L('Обзор', 'Overview'),
      description: L(
        'В конфигурации типа блока задаёте массив <code>fields</code> — BlockBuilder строит форму создания и редактирования и сохраняет значения в <code>props</code>.',
        'In block type configuration you define a <code>fields</code> array — BlockBuilder builds the create/edit form and saves values in <code>props</code>.',
      ),
    },
    validation: {
      title: L('Валидация в UI', 'UI validation'),
      description: L(
        'Ошибки показываются в футере модалки и обновляются при изменении полей после неуспешного сохранения. Для своей формы без <code>BlockBuilderComponent</code> — <code>ReactiveFormValidationTracker</code> в разделе «Утилиты». У кастомного рендерера <code>setError</code> вызывается только при смене текста ошибки.',
        'Errors appear in the modal footer and update when fields change after a failed save. For custom forms without <code>BlockBuilderComponent</code> — use <code>ReactiveFormValidationTracker</code> in the Utilities section. For custom renderers, <code>setError</code> is called only when the error text changes.',
      ),
    },
    usageExample: {
      title: L('Пример использования', 'Usage example'),
      code: `const blockConfigs = {
  text: {
    title: '${L('Текстовый блок', 'Text block')}',
    fields: [
      {
        field: 'content',
        label: '${L('Содержимое', 'Content')}',
        type: 'textarea',          // ${L('Стандартный тип поля', 'Standard field type')}
        placeholder: '${L('Введите текст...', 'Enter text...')}',
        defaultValue: '',
        rules: [
          { type: 'required' },  // ${L('message опционально, есть fallback', 'message optional, fallback available')}
          { type: 'minLength', value: 1 }  // ${L('message опционально', 'message optional')}
        ]
      },
      {
        field: 'rating',
        label: '${L('Рейтинг', 'Rating')}',
        type: 'custom',
        customFieldConfig: {
          rendererId: 'star-rating'
        },
        defaultValue: 0
      }
    ],
    spacingOptions: {              // ${L('Автоматическое добавление spacing поля', 'Automatic spacing field addition')}
      enabled: true,
      spacingTypes: ['padding-top', 'padding-bottom'],
      config: {
        min: 0,
        max: 200,
        step: 4
      }
    }
  }
}`,
    },
    fieldTypes: {
      title: L('Стандартные типы полей', 'Standard field types'),
      description: L(
        'Встроенные контролы для <code>fields</code>. Описание параметров — в разделе <anchor>field-params</anchor> ниже.',
        'Built-in controls for <code>fields</code>. Parameter details — in the <anchor>field-params</anchor> section below.',
      ),
      fieldParamsAnchor: L('Параметры полей', 'Field parameters'),
      cards: {
        text: {
          description: L('Заголовки и короткие строки', 'Headings and short strings'),
          example: `{
  field: 'title',
  label: '${L('Заголовок', 'Title')}',
  type: 'text',
  placeholder: '${L('Введите заголовок...', 'Enter title...')}',
  defaultValue: ''
}`,
        },
        textarea: {
          description: L('Длинный текст, описания, контент', 'Long text, descriptions, content'),
          example: `{
  field: 'content',
  label: '${L('Содержимое', 'Content')}',
  type: 'textarea',
  placeholder: '${L('Введите текст...', 'Enter text...')}',
  defaultValue: ''
}`,
        },
        email: {
          description: L('Контактный email с проверкой формата', 'Contact email with format validation'),
          example: `{
  field: 'contactEmail',
  label: 'Email',
  type: 'email',
  placeholder: 'example@mail.com',
  defaultValue: ''
}`,
        },
        url: {
          description: L('Ссылка с проверкой формата', 'Link with format validation'),
          example: `{
  field: 'websiteUrl',
  label: '${L('Сайт', 'Website')}',
  type: 'url',
  placeholder: 'https://example.com',
  defaultValue: ''
}`,
        },
        number: {
          description: L('Размеры, счётчики, числовые настройки', 'Sizes, counters, numeric settings'),
          example: `{
  field: 'fontSize',
  label: '${L('Размер шрифта', 'Font size')}',
  type: 'number',
  defaultValue: 16,
  rules: [
    { type: 'min', value: 8 },
    { type: 'max', value: 72 }
  ]
}`,
        },
        select: {
          description: L('Выбор из фиксированного списка options', 'Selection from a fixed options list'),
          example: `{
  field: 'textAlign',
  label: '${L('Выравнивание', 'Alignment')}',
  type: 'select',
  options: [
    { value: 'left', label: '${L('По левому краю', 'Left')}' },
    { value: 'center', label: '${L('По центру', 'Center')}' }
  ],
  defaultValue: 'left'
}`,
        },
        checkbox: {
          description: L('Включено / выключено, видимость, флаги', 'On/off, visibility, flags'),
          example: `{
  field: 'visible',
  label: '${L('Видимый', 'Visible')}',
  type: 'checkbox',
  defaultValue: true
}`,
        },
        radio: {
          description: L('Один вариант из options, все опции видны сразу', 'One option from options, all options visible at once'),
          example: `{
  field: 'position',
  label: '${L('Позиция', 'Position')}',
  type: 'radio',
  options: [
    { value: 'top', label: '${L('Сверху', 'Top')}' },
    { value: 'bottom', label: '${L('Снизу', 'Bottom')}' }
  ],
  defaultValue: 'top'
}`,
        },
        color: {
          description: L('Цвет фона, текста, акцентов (HEX)', 'Background, text, accent colors (HEX)'),
          example: `{
  field: 'backgroundColor',
  label: '${L('Цвет фона', 'Background color')}',
  type: 'color',
  defaultValue: '#ffffff'
}`,
        },
        image: {
          description: L('Картинка блока с preview и загрузкой на сервер', 'Block image with preview and server upload'),
          example: `{
  field: 'image',
  label: '${L('Изображение', 'Image')}',
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
}`,
        },
        file: {
          description: L('Документы и архивы — список файлов, без preview', 'Documents and archives — file list, no preview'),
          example: `{
  field: 'files',
  label: '${L('Файлы', 'Files')}',
  type: 'file',
  multiple: true,
  defaultValue: [],
  fileUploadConfig: {
    uploadUrl: '/api/upload',
    accept: '.pdf,.doc,.docx,.zip',
    maxCount: 5,
    responseMapper: (response) => response.url
  }
}`,
        },
        fileImport: {
          description: L(
            'Кнопка импорта: данные из файла попадают в другие поля формы',
            'Import button: file data merges into other form fields',
          ),
          example: `{
  field: '_import',
  label: '${L('Импорт данных', 'Import data')}',
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
}`,
        },
        blockAnchor: {
          description: L('Ссылка на блок страницы (#id) или внешний URL', 'Link to page block (#id) or external URL'),
          example: `{
  field: 'url',
  label: '${L('Якорь или URL', 'Anchor or URL')}',
  type: 'block-anchor',
  blockAnchorConfig: {
    placeholder: '${L('Выберите блок на странице', 'Select a block on the page')}',
    allowCustomUrl: true
  },
  defaultValue: ''
}`,
        },
        matrixTable: {
          description: L('Таблица с заголовками, HTML и картинками в ячейках', 'Table with headers, HTML and images in cells'),
          example: `{
  field: 'tableMatrix',
  label: '${L('Таблица', 'Table')}',
  type: 'matrix-table',
  defaultValue: { tableHead: [], tableBody: [] },
  matrixTableConfig: {
    imageUploadConfig: { maxFileSize: 5242880 }
  },
  rules: [{ type: 'required', message: '${L('Заполните таблицу', 'Fill in the table')}' }]
}`,
        },
        custom: {
          description: L('Произвольный UI — свой рендерер по rendererId', 'Custom UI — your renderer by rendererId'),
          example: `{
  field: 'rating',
  label: '${L('Рейтинг', 'Rating')}',
  type: 'custom',
  customFieldConfig: {
    rendererId: 'star-rating'
  },
  defaultValue: 0
}`,
        },
        apiSelect: {
          description: L('Справочники с бэкенда: поиск и подгрузка страниц', 'Backend lookups: search and pagination'),
          example: `{
  field: 'categoryId',
  label: '${L('Категория', 'Category')}',
  type: 'api-select',
  apiSelectConfig: {
    url: 'https://api.example.com/categories',
    method: 'GET'
  }
}`,
        },
      },
    },
    fieldParams: {
      title: L('Параметры полей', 'Field parameters'),
      intro: L(
        'Каждый объект в массиве <code>fields</code> описывает одно поле формы. При сохранении блока значения попадают в <code>block.props</code> под ключом <code>field</code> (кроме полей с <code>persist: false</code>).',
        'Each object in the <code>fields</code> array describes one form field. On block save, values go to <code>block.props</code> under the <code>field</code> key (except fields with <code>persist: false</code>).',
      ),
      basic: {
        title: L('Базовые', 'Basic'),
        field: {
          badge: L('обязательный', 'required'),
          description: L(
            'Имя свойства в <code>props</code> блока. По нему читаете значение в render-компоненте (<code>props.title</code>, <code>props.cards</code>). Должно быть уникальным в рамках типа блока.',
            'Property name in block <code>props</code>. Use it to read values in the render component (<code>props.title</code>, <code>props.cards</code>). Must be unique within the block type.',
          ),
        },
        label: {
          badge: L('обязательный', 'required'),
          description: L(
            'Подпись поля в форме редактирования. На сохранённые данные не влияет.',
            'Field label in the edit form. Does not affect saved data.',
          ),
        },
        type: {
          badge: L('обязательный', 'required'),
          description: L(
            'Какой контрол показать и как хранить значение. От типа зависят допустимые параметры: для <code>select</code> нужен <code>options</code>, для <code>image</code> — <code>fileUploadConfig</code> и т.д. Список типов — в разделе <anchor>field-types</anchor>.',
            'Which control to show and how to store the value. Allowed parameters depend on type: <code>select</code> needs <code>options</code>, <code>image</code> needs <code>fileUploadConfig</code>, etc. Type list — in <anchor>field-types</anchor> section.',
          ),
        },
        defaultValue: {
          badge: L('опциональный', 'optional'),
          description: L(
            'Значение сразу после создания нового блока. Без него — пустая строка, <code>0</code>, <code>false</code> или <code>[]</code> в зависимости от типа. Для <code>repeater</code> — массив элементов; для <code>select</code> с <code>multiple</code> — массив <code>value</code>.',
            'Value right after creating a new block. Without it — empty string, <code>0</code>, <code>false</code> or <code>[]</code> depending on type. For <code>repeater</code> — array of items; for <code>select</code> with <code>multiple</code> — array of <code>value</code>.',
          ),
        },
        placeholder: {
          badge: L('опциональный', 'optional'),
          description: L(
            'Серая подсказка в пустом поле ввода. Работает для <code>text</code>, <code>textarea</code>, <code>email</code>, <code>url</code>.',
            'Gray hint in an empty input field. Works for <code>text</code>, <code>textarea</code>, <code>email</code>, <code>url</code>.',
          ),
        },
      },
      valueSelection: {
        title: L('Выбор значений', 'Value selection'),
        options: {
          badge: L('select, radio', 'select, radio'),
          description: L(
            'Статический список вариантов. <code>value</code> пишется в <code>props</code>, <code>label</code> видит пользователь. <code>disabled: true</code> — опция отображается, но недоступна для выбора.',
            'Static list of options. <code>value</code> is written to <code>props</code>, <code>label</code> is shown to the user. <code>disabled: true</code> — option is displayed but not selectable.',
          ),
        },
        multiple: {
          badge: L('select, image, file', 'select, image, file'),
          description: L(
            'Несколько значений вместо одного: в <code>select</code> — массив <code>value</code>, в <code>image</code>/<code>file</code> — несколько загрузок. У <anchor>api-select</anchor> множественный режим задаётся в <code>apiSelectConfig.multiple</code>, не здесь.',
            'Multiple values instead of one: in <code>select</code> — array of <code>value</code>, in <code>image</code>/<code>file</code> — multiple uploads. For <anchor>api-select</anchor>, multiple mode is set in <code>apiSelectConfig.multiple</code>, not here.',
          ),
        },
        optionsFrom: {
          badge: L('select', 'select'),
          description: L(
            'Опции строятся из значения другого поля — для зависимых списков (страна → город) без ручного дублирования <code>options</code>. <code>source</code> — имя поля-источника, <code>when</code> — условие, <code>map</code> — преобразование в массив options. Статический <code>options</code> остаётся fallback.',
            'Options are built from another field value — for dependent lists (country → city) without manually duplicating <code>options</code>. <code>source</code> — source field name, <code>when</code> — condition, <code>map</code> — transform to options array. Static <code>options</code> remains fallback.',
          ),
        },
      },
      validationVisibility: {
        title: L('Валидация и видимость', 'Validation and visibility'),
        rules: {
          badge: L('опциональный', 'optional'),
          description: L(
            'Проверки перед сохранением. Ошибки показываются в футере модалки. У каждого правила опциональный <code>message</code> — иначе используется текст по умолчанию.',
            'Checks before save. Errors appear in the modal footer. Each rule has optional <code>message</code> — otherwise default text is used.',
          ),
          items: {
            required: L('<code>required</code> — поле не пустое', '<code>required</code> — field is not empty'),
            minLength: L('<code>minLength</code> / <code>maxLength</code> — длина строки (<code>value</code> — число)', '<code>minLength</code> / <code>maxLength</code> — string length (<code>value</code> — number)'),
            min: L('<code>min</code> / <code>max</code> — диапазон для <code>number</code>', '<code>min</code> / <code>max</code> — range for <code>number</code>'),
            pattern: L('<code>pattern</code> — регулярное выражение (<code>value</code> — строка regex)', '<code>pattern</code> — regular expression (<code>value</code> — regex string)'),
            email: L('<code>email</code> / <code>url</code> — формат адреса', '<code>email</code> / <code>url</code> — address format'),
            custom: L('<code>custom</code> — <code>validator: (value) =&gt; boolean</code>', '<code>custom</code> — <code>validator: (value) =&gt; boolean</code>'),
          },
        },
        dependsOn: {
          badge: L('опциональный', 'optional'),
          description: L(
            'Поле видно только когда другое поле совпадает с условием. Скрытые поля не валидируются и не мешают сохранению. Подробнее — <anchor>depends-on</anchor>.',
            'Field is visible only when another field matches a condition. Hidden fields are not validated and do not block save. More — <anchor>depends-on</anchor>.',
          ),
        },
        persist: {
          badge: L('опциональный, по умолчанию true', 'optional, default true'),
          description: L(
            '<code>false</code> — поле участвует в форме, но не попадает в <code>block.props</code> при save. Нужно для служебных UI: кнопка импорта, переключатели настройки формы. У <code>file-import</code> persist выключен по умолчанию. Работает и внутри <code>repeater</code>.',
            '<code>false</code> — field participates in the form but does not go to <code>block.props</code> on save. For service UI: import button, form settings toggles. <code>file-import</code> has persist off by default. Works inside <code>repeater</code> too.',
          ),
        },
      },
      typeConfigs: {
        title: L('Конфиги по типам поля', 'Type-specific configs'),
        intro: L(
          'Дополнительные объекты — только когда стандартных параметров недостаточно:',
          'Additional objects — only when standard parameters are not enough:',
        ),
        spacingConfig: {
          description: L(
            'Отступы блока (padding/margin) по брекпоинтам. <code>spacingOptions</code> на уровне конфига типа блока добавляет поле автоматически; <code>spacingConfig</code> — при ручном <code>type: \'spacing\'</code>. См. <anchor>spacing</anchor>.',
            'Block spacing (padding/margin) by breakpoint. <code>spacingOptions</code> at block type config level adds the field automatically; <code>spacingConfig</code> — for manual <code>type: \'spacing\'</code>. See <anchor>spacing</anchor>.',
          ),
        },
        repeaterConfig: {
          description: L(
            'Структура массива однотипных элементов: вложенные <code>fields</code>, лимиты min/max, подписи кнопок. См. <anchor>repeater</anchor>.',
            'Structure of same-type item array: nested <code>fields</code>, min/max limits, button labels. See <anchor>repeater</anchor>.',
          ),
        },
        fileUploadConfig: {
          description: L(
            'POST файла на ваш сервер (<code>uploadUrl</code>, <code>responseMapper</code>) вместо хранения base64 в props. Для <anchor>image</anchor> и <anchor>file</anchor>.',
            'POST file to your server (<code>uploadUrl</code>, <code>responseMapper</code>) instead of storing base64 in props. For <anchor>image</anchor> and <anchor>file</anchor>.',
          ),
        },
        fileImportConfig: {
          description: L(
            'Загрузка файла как действие: ответ API сливается в другие поля формы через <code>merge</code> (append/replace, dedupe). Само поле в props не сохраняется.',
            'File upload as action: API response merges into other form fields via <code>merge</code> (append/replace, dedupe). The field itself is not saved in props.',
          ),
        },
        blockAnchorConfig: {
          description: L(
            'Выбор якоря <code>#block-id</code> или произвольного URL в форме. Скролл и клик — в вашем компоненте блока. См. <anchor>block-anchor</anchor>.',
            'Select anchor <code>#block-id</code> or custom URL in form. Scroll and click — in your block component. See <anchor>block-anchor</anchor>.',
          ),
        },
        matrixTableConfig: {
          description: L(
            'Настройки редактора таблицы (подписи вкладок, лимит размера картинок в ячейках). См. <anchor>matrix-table</anchor>.',
            'Table editor settings (tab labels, image size limit in cells). See <anchor>matrix-table</anchor>.',
          ),
        },
        apiSelectConfig: {
          description: L(
            'URL API, параметры поиска/пагинации, маппинг ответа. См. <anchor>api-select</anchor>.',
            'API URL, search/pagination parameters, response mapping. See <anchor>api-select</anchor>.',
          ),
        },
        customFieldConfig: {
          description: L(
            '<code>rendererId</code> — id зарегистрированного рендерера; <code>options</code> — произвольные настройки, доступные в <code>context.options</code>. См. <anchor>custom-renderers</anchor>.',
            '<code>rendererId</code> — registered renderer id; <code>options</code> — arbitrary settings available in <code>context.options</code>. See <anchor>custom-renderers</anchor>.',
          ),
        },
      },
    },
    select: {
      title: L('Поле - список (select)', 'Field — list (select)'),
      code: `{
  field: 'topics',
  label: '${L('Темы', 'Topics')}',
  type: 'select',
  multiple: true,
  options: [
    { value: 'dev', label: '${L('Разработка', 'Development')}' },
    { value: 'design', label: '${L('Дизайн', 'Design')}' },
    { value: 'marketing', label: '${L('Маркетинг', 'Marketing')}' },
    { value: 'analytics', label: '${L('Аналитика', 'Analytics')}' }
  ],
  defaultValue: ['dev', 'design'],
  rules: [{ type: 'required', message: '${L('Выберите хотя бы одну тему', 'Select at least one topic')}' }]
}`,
      items: {
        single: L(
          'Без <code>multiple</code> в <code>props</code> — одно <code>value</code> из <code>options</code>',
          'Without <code>multiple</code>, <code>props</code> holds one <code>value</code> from <code>options</code>',
        ),
        multiple: L(
          'С <code>multiple: true</code> — массив <code>value</code>; <code>defaultValue</code> тоже массив (или <code>[]</code>)',
          'With <code>multiple: true</code> — array of <code>value</code>; <code>defaultValue</code> is also an array (or <code>[]</code>)',
        ),
      },
      displayLabelCode: `// ${L('Отображение label по value в компоненте блока', 'Display label by value in block component')}
const topicLabels = (props.topics ?? []).map(
  (v) => options.find((o) => o.value === v)?.label ?? v
)`,
    },
    spacing: {
      title: L('Поле - отступы (spacing)', 'Field — spacing'),
      description: L(
        'Отступы блока по брекпоинтам. Удобнее подключать через <code>spacingOptions</code> в конфиге типа блока, чем полем <code>spacing</code> в <code>fields</code>.',
        'Block spacing by breakpoint. Easier to connect via <code>spacingOptions</code> in block type config than a <code>spacing</code> field in <code>fields</code>.',
      ),
      code: `const blockConfigs = {
  text: {
    fields: [/* ... */],
    spacingOptions: {
      enabled: true,
      spacingTypes: ['padding-top', 'padding-bottom', 'margin-top', 'margin-bottom'],
      config: { min: 0, max: 120, step: 8 }
    }
  }
}`,
      note: L(
        'Явное поле <code>type: \'spacing\'</code> в <code>fields</code> игнорируется, если задано <code>spacingOptions</code>. Отступы в UI: margin на обёртку блока, padding — CSS-переменные <code>--spacing-padding-*</code> в вашем компоненте.',
        'Explicit <code>type: \'spacing\'</code> field in <code>fields</code> is ignored when <code>spacingOptions</code> is set. Spacing in UI: margin on block wrapper, padding — CSS variables <code>--spacing-padding-*</code> in your component.',
      ),
    },
    repeater: {
      title: L('Поле - повторитель (repeater)', 'Field — repeater'),
      description: L(
        'Массив однотипных элементов — карточки, слайды, строки списка. Вложенные репитеры поддерживаются (<code>maxNestingDepth</code>, по умолчанию 2).',
        'Array of same-type items — cards, slides, list rows. Nested repeaters supported (<code>maxNestingDepth</code>, default 2).',
      ),
      code: `{
  field: 'cards',
  label: '${L('Карточки', 'Cards')}',
  type: 'repeater',
  repeaterConfig: {
    itemTitle: '${L('Карточка', 'Card')}',
    addButtonText: '${L('Добавить карточку', 'Add card')}',
    min: 2,
    max: 20,
    defaultItemValue: { title: '', description: '', image: '' },
    fields: [
      { field: 'title', label: '${L('Заголовок', 'Title')}', type: 'text', rules: [{ type: 'required' }] },
      { field: 'description', label: '${L('Описание', 'Description')}', type: 'textarea' },
      { field: 'image', label: '${L('Изображение', 'Image')}', type: 'image', defaultValue: '' }
    ]
  },
  defaultValue: []
}`,
      notes: L(
        '<code>repeaterConfig.fields</code> — любые типы кроме <code>spacing</code>. <code>min</code> без явного значения: 1 при required, иначе 0. <code>countLabelVariants</code> — склонение счётчика («1 элемент», «2 элемента»).',
        '<code>repeaterConfig.fields</code> — any types except <code>spacing</code>. <code>min</code> without explicit value: 1 when required, else 0. <code>countLabelVariants</code> — counter pluralization ("1 item", "2 items").',
      ),
      nestedTitle: L('Вложенный repeater', 'Nested repeater'),
      nestedCode: `repeaterConfig: {
  itemTitle: '${L('Категория', 'Category')}',
  fields: [
    { field: 'name', label: '${L('Название', 'Name')}', type: 'text', rules: [{ type: 'required' }] },
    {
      field: 'products',
      label: '${L('Товары', 'Products')}',
      type: 'repeater',
      repeaterConfig: {
        itemTitle: '${L('Товар', 'Product')}',
        fields: [
          { field: 'name', label: '${L('Название', 'Name')}', type: 'text', rules: [{ type: 'required' }] },
          { field: 'price', label: '${L('Цена', 'Price')}', type: 'number', rules: [{ type: 'required' }] }
        ]
      }
    }
  ]
}`,
    },
    image: {
      title: L('Поле - изображение (image)', 'Field — image'),
      description: L(
        'Загрузка с preview. В <code>props</code> — URL строкой или объект <code>{ src, width, height, size }</code> после серверной загрузки. Base64 только для разработки; в продакшене — <code>fileUploadConfig.uploadUrl</code>.',
        'Upload with preview. In <code>props</code> — URL string or object <code>{ src, width, height, size }</code> after server upload. Base64 for development only; in production — <code>fileUploadConfig.uploadUrl</code>.',
      ),
      code: `{
  field: 'image',
  label: '${L('Изображение', 'Image')}',
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
}`,
      importantNote: L(
        '<strong>Важно:</strong> при <code>uploadUrl</code> ответ сервера для <code>image</code> должен содержать <code>src</code> с URL. Другой формат API — <code>responseMapper</code> в <code>fileUploadConfig</code>. <anchor>file</anchor>',
        '<strong>Important:</strong> with <code>uploadUrl</code>, the server response for <code>image</code> must include <code>src</code> with a URL. For a different API format — <code>responseMapper</code> in <code>fileUploadConfig</code>. <anchor>file</anchor>',
      ),
      urlHelperCode: `// ${L('URL из string или object.src', 'URL from string or object.src')}
const imageUrl = typeof props.image === 'string'
  ? props.image
  : props.image?.src ?? ''`,
    },
    file: {
      title: L('Поле - файл (file)', 'Field — file'),
      description: L(
        'Загрузка документов и произвольных файлов. Список имён в форме, без превью как у <code>image</code>. В <code>props</code> — URL строкой или массив URL при <code>multiple: true</code>.',
        'Upload documents and arbitrary files. Name list in form, no preview like <code>image</code>. In <code>props</code> — URL string or URL array with <code>multiple: true</code>.',
      ),
      code: `{
  field: 'file',
  label: '${L('Файл (один)', 'File (single)')}',
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

// ${L('Несколько файлов', 'Multiple files')}
{
  field: 'files',
  label: '${L('Файлы', 'Files')}',
  type: 'file',
  multiple: true,
  defaultValue: [],
  fileUploadConfig: {
    uploadUrl: '/api/upload',
    maxCount: 5,
    accept: '.pdf,.doc,.docx,.zip',
    responseMapper: (response) => response.url
  }
}`,
    },
    blockAnchor: {
      title: L('Поле - якорь (block-anchor)', 'Field — anchor (block-anchor)'),
      description: L(
        'Выбор блока страницы (<code>#block-id</code>) или произвольного URL. Скролл и поведение ссылки — в вашем компоненте блока; форма только сохраняет значение.',
        'Select page block (<code>#block-id</code>) or custom URL. Scroll and link behavior — in your block component; the form only saves the value.',
      ),
      code: `{
  field: 'url',
  label: '${L('Якорь или URL', 'Anchor or URL')}',
  type: 'block-anchor',
  blockAnchorConfig: {
    placeholder: '${L('Выберите блок на странице', 'Select a block on the page')}',
    allowCustomUrl: true  // ${L('поле «или введите URL»', '"or enter URL" field')}
  },
  rules: [{ type: 'required', message: '${L('Укажите якорь или URL', 'Specify anchor or URL')}' }],
  defaultValue: ''
}`,
      scrollExampleTitle: L('Пример скролла к блоку', 'Block scroll example'),
      scrollExampleIntro: L(
        'Целевой блок должен иметь <code>data-block-id</code> (BlockBuilder выставляет при рендере):',
        'Target block must have <code>data-block-id</code> (BlockBuilder sets it on render):',
      ),
      scrollExampleCode: `<a :href="url" @click="handleClick">{{ text }}</a>

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
</script>`,
    },
    matrixTable: {
      title: L('Поле - таблица (matrix-table)', 'Field — table (matrix-table)'),
      description: L(
        'Редактор таблицы: колонки и строки, типы ячеек (<code>default</code>, HTML, <code>image</code>). В <code>props</code> — <code>{ tableHead, tableBody }</code>.',
        'Table editor: columns and rows, cell types (<code>default</code>, HTML, <code>image</code>). In <code>props</code> — <code>{ tableHead, tableBody }</code>.',
      ),
      code: `{
  field: 'tableMatrix',
  label: '${L('Таблица', 'Table')}',
  type: 'matrix-table',
  defaultValue: {
    tableHead: [
      { id: 'col-1', type: 'default', name: '${L('Название', 'Name')}', nowrap: false, size: '' }
    ],
    tableBody: []
  },
  matrixTableConfig: {
    imageUploadConfig: { maxFileSize: 5242880 }
  },
  rules: [{ type: 'required', message: '${L('Заполните таблицу', 'Fill in the table')}' }]
}`,
    },
    apiSelect: {
      title: L('Поле - выбор из API (api-select)', 'Field — API selection (api-select)'),
      description: L(
        'Поиск и пагинация по внешнему API. «Загрузить ещё» — при <code>hasMore: true</code> в ответе.',
        'Search and pagination via external API. "Load more" — when <code>hasMore: true</code> in response.',
      ),
      code: `{
  field: 'categoryId',
  label: '${L('Категория', 'Category')}',
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
}`,
      responseFormatLabel: L('Ожидаемый формат ответа:', 'Expected response format:'),
      responseExample: `{
  "data": [{ "id": 1, "name": "${L('Категория 1', 'Category 1')}" }],
  "total": 100,
  "page": 1,
  "hasMore": true
}`,
      notes: L(
        'Другой формат — <code>responseMapper</code> или <code>dataPath</code>. Множественный выбор — <code>apiSelectConfig.multiple</code>.',
        'Different format — <code>responseMapper</code> or <code>dataPath</code>. Multiple selection — <code>apiSelectConfig.multiple</code>.',
      ),
    },
    dependsOn: {
      title: L('Поле - условное отображение (dependsOn)', 'Field — conditional visibility (dependsOn)'),
      description: L(
        'Поле показывается, если другое поле совпадает с условием. Скрытые поля не валидируются.',
        'Field is shown when another field matches a condition. Hidden fields are not validated.',
      ),
      code: `{
  field: 'autoplayDelay',
  label: '${L('Задержка (мс)', 'Delay (ms)')}',
  type: 'number',
  defaultValue: 3000,
  dependsOn: {
    field: 'autoplay',
    value: true,
    operator: 'equals'  // equals | notEquals | in | notIn
  }
}`,
      repeaterTitle: L('Внутри repeater', 'Inside repeater'),
      repeaterDescription: L(
        '<code>dependsOn.field</code> ссылается на поле того же элемента репитера.',
        '<code>dependsOn.field</code> refers to a field in the same repeater item.',
      ),
      repeaterCode: `repeaterConfig: {
  fields: [
    { field: 'hasImage', label: '${L('Есть изображение', 'Has image')}', type: 'checkbox' },
    {
      field: 'imageUrl',
      label: 'URL',
      type: 'text',
      dependsOn: { field: 'hasImage', value: true }
    }
  ]
}`,
    },
    customRenderers: {
      title: L('Кастомные рендереры полей', 'Custom field renderers'),
      description: L(
        'Поле <code>type: \'custom\'</code> — когда стандартных типов из раздела <anchor>field-types</anchor> недостаточно: свой виджет, интеграция библиотеки, сложный интерактив. Это <strong>не</strong> отдельный тип блока и не замена компонента блока на канвасе — только UI поля в модалке create/edit.',
        'Field <code>type: \'custom\'</code> — when standard types from <anchor>field-types</anchor> are not enough: custom widget, library integration, complex interactivity. This is <strong>not</strong> a separate block type or canvas block component replacement — only field UI in create/edit modal.',
      ),
      fieldTypesAnchor: L('Стандартные типы полей', 'Standard field types'),
      whenTitle: L('Когда нужен custom', 'When custom is needed'),
      whenItems: {
        rating: L('Рейтинг, color picker, карта координат, редактор кода', 'Rating, color picker, coordinate map, code editor'),
        apiData: L(
          'Данные из вашего API внутри одного поля (не путать с <anchor>api-select</anchor>)',
          'Data from your API inside one field (not to be confused with <anchor>api-select</anchor>)',
        ),
        checkFirst: L(
          'Сначала проверьте <code>select</code>, <code>repeater</code>, <code>matrix-table</code> — часто хватает без custom',
          'First check <code>select</code>, <code>repeater</code>, <code>matrix-table</code> — often enough without custom',
        ),
      },
      flowTitle: L('Цепочка: конфиг → регистрация → форма', 'Chain: config → registration → form'),
      flowSteps: [
        L('Класс с <code>ICustomFieldRenderer</code> (уникальный <code>id</code>)', 'Class with <code>ICustomFieldRenderer</code> (unique <code>id</code>)'),
        L('Регистрация в реестре <strong>до</strong> первого открытия формы', 'Register in registry <strong>before</strong> first form open'),
        L('В <code>fields</code> — <code>type: \'custom\'</code> и <code>customFieldConfig.rendererId</code>', 'In <code>fields</code> — <code>type: \'custom\'</code> and <code>customFieldConfig.rendererId</code>'),
      ],
      interfaceTitle: L('ICustomFieldRenderer и контекст', 'ICustomFieldRenderer and context'),
      interfaceCode: `interface ICustomFieldRenderer {
  readonly id: string
  readonly name: string
  render(
    container: HTMLElement,
    context: ICustomFieldContext
  ): ICustomFieldRenderResult | Promise<ICustomFieldRenderResult>
}

interface ICustomFieldContext {
  fieldName: string
  label: string
  value: unknown
  required: boolean
  options?: Record<string, unknown>  // ${L('из customFieldConfig.options', 'from customFieldConfig.options')}
  error?: string                      // ${L('текст ошибки валидации', 'validation error text')}
  formScope?: ICustomFieldFormScope    // ${L('formData, setField, repeater', 'formData, setField, repeater')}
  onChange: (value: unknown) => void
  onError?: (error: string | null) => void
}

interface ICustomFieldRenderResult {
  element: HTMLElement | string
  getValue?: () => unknown
  setValue?: (value: unknown) => void
  setError?: (error: string | null) => void  // ${L('без пересоздания DOM', 'without recreating DOM')}
  validate?: () => string | null
  destroy?: () => void
}`,
      interfaceNote: L(
        '<code>formScope.setField</code> — изменить другое поле формы (например, сбросить зависимое). В repeater доступны <code>formScope.repeater.updateItemField</code> и live-ссылка на <code>item</code>. <code>setError</code> на результате вызывается фреймворком при смене текста ошибки — не дублируйте лишние перерисовки.',
        '<code>formScope.setField</code> — change another form field (e.g. reset dependent). In repeater, <code>formScope.repeater.updateItemField</code> and live <code>item</code> reference are available. <code>setError</code> on result is called by the framework when error text changes — avoid redundant re-renders.',
      ),
      registerTitle: L('Регистрация', 'Registration'),
      registerCoreLabel: L('<strong>Core / свой UI:</strong>', '<strong>Core / custom UI:</strong>'),
      registerCoreCode: `import { BlockBuilder } from '@mushket-co/block-builder/core'

const blockBuilder = new BlockBuilder({ blockConfigs })
blockBuilder.registerCustomFieldRenderer(new StarRatingRenderer())`,
      registerFrameworkLabel: L(
        '<strong>Vue / React</strong> — отдельный реестр, проп <code>customFieldRendererRegistry</code> у <code>BlockBuilderComponent</code>:',
        '<strong>Vue / React</strong> — separate registry, <code>customFieldRendererRegistry</code> prop on <code>BlockBuilderComponent</code>:',
      ),
      registerFrameworkCode: `import {
  BlockBuilderComponent,
  createBlockManagementUseCase,
  CustomFieldRendererRegistry,
} from '@mushket-co/block-builder/vue' // ${L('или /react', 'or /react')}

const registry = new CustomFieldRendererRegistry()
registry.register(new StarRatingRenderer())

<BlockBuilderComponent
  customFieldRendererRegistry={registry}
  blockManagementUseCase={createBlockManagementUseCase()}
  /* ... */
/>`,
      importantNote: L(
        '<strong>Важно:</strong> регистрируйте рендереры <strong>до</strong> первого открытия формы. При внешних библиотеках храните инстанс локально в <code>render()</code>, не в свойстве класса; инициализируйте синхронно — без <code>setTimeout</code>. <anchor>custom-register</anchor>',
        '<strong>Important:</strong> register renderers <strong>before</strong> first form open. With external libraries store instance locally in <code>render()</code>, not as class property; initialize synchronously — without <code>setTimeout</code>. <anchor>custom-register</anchor>',
      ),
      exampleTitle: L('Пример: star-rating', 'Example: star-rating'),
      exampleCode: `class StarRatingRenderer implements ICustomFieldRenderer {
  readonly id = 'star-rating'
  readonly name = 'Star Rating'

  render(container: HTMLElement, context: ICustomFieldContext): ICustomFieldRenderResult {
    const { value, onChange, options } = context
    const max = Number(options?.max ?? 5)
    const root = document.createElement('div')
    root.className = 'flex gap-1'

    const setRating = (n: number) => {
      root.querySelectorAll('button').forEach((btn, i) => {
        btn.setAttribute('aria-pressed', String(i < n))
      })
      onChange(n)
    }

    for (let i = 1; i <= max; i++) {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.textContent = '★'
      btn.addEventListener('click', () => setRating(i))
      root.appendChild(btn)
    }

    setRating(Number(value ?? 0))
    container.appendChild(root)

    return {
      element: root,
      getValue: () => Number(value ?? 0),
      destroy: () => root.remove(),
    }
  }
}`,
      configExampleCode: `{
  field: 'rating',
  label: '${L('Рейтинг', 'Rating')}',
  type: 'custom',
  customFieldConfig: {
    rendererId: 'star-rating',
    options: { max: 5 },
  },
  defaultValue: 0,
  rules: [{ type: 'required' }],
}`,
      customFieldConfig: {
        rendererId: L(
          '<code>rendererId</code> — совпадает с <code>ICustomFieldRenderer.id</code>',
          '<code>rendererId</code> — matches <code>ICustomFieldRenderer.id</code>',
        ),
        options: L(
          '<code>options</code> — произвольный объект, доступен в <code>context.options</code>',
          '<code>options</code> — arbitrary object, available in <code>context.options</code>',
        ),
      },
      footerNote: L(
        'API реестра: <code>registerCustomFieldRenderer</code>, <code>registerCustomFieldRenderers</code>, <code>getCustomFieldRenderer</code>, <code>hasCustomFieldRenderer</code>, <code>unregisterCustomFieldRenderer</code>, <code>getAllCustomFieldRenderers</code> — см. <link>/docs/core/methods</link>. В repeater храните DOM/инстанс виджета локально в <code>render()</code>, в <code>destroy</code> снимайте слушатели. Живые примеры — <link>examples/vue3</link>, <link>examples/api-usage</link>.',
        'Registry API: <code>registerCustomFieldRenderer</code>, <code>registerCustomFieldRenderers</code>, <code>getCustomFieldRenderer</code>, <code>hasCustomFieldRenderer</code>, <code>unregisterCustomFieldRenderer</code>, <code>getAllCustomFieldRenderers</code> — see <link>/docs/core/methods</link>. In repeater store DOM/widget instance locally in <code>render()</code>, remove listeners in <code>destroy</code>. Live examples — <link>examples/vue3</link>, <link>examples/api-usage</link>.',
      ),
    },
  };
}
