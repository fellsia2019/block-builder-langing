export function buildFieldTypes(locale) {
  const isRu = locale === 'ru';
  const L = (ru, en) => (isRu ? ru : en);

  const usageCode = `const blockConfigs = {
  text: {
    title: '${L('Текстовый блок', 'Text block')}',
    fields: [
      {
        field: 'content',
        label: '${L('Содержимое', 'Content')}',
        type: 'textarea',          // ${L('Тип поля', 'Field type')}
        placeholder: '${L('Введите текст...', 'Enter text...')}',
        defaultValue: '',
        rules: [
          { type: 'required', message: '${L('Текст обязателен', 'Text is required')}' },
          { type: 'minLength', value: 1, message: '${L('Текст не может быть пустым', 'Text cannot be empty')}' }
        ]
      },
      {
        field: 'fontSize',
        label: '${L('Размер шрифта', 'Font size')}',
        type: 'number',
        defaultValue: 16,
        rules: [
          { type: 'required', message: '${L('Размер обязателен', 'Size is required')}' },
          { type: 'min', value: 8, message: '${L('Минимум: 8px', 'Minimum: 8px')}' },
          { type: 'max', value: 72, message: '${L('Максимум: 72px', 'Maximum: 72px')}' }
        ]
      },
      {
        field: 'color',
        label: '${L('Цвет текста', 'Text color')}',
        type: 'color',
        defaultValue: '#333333'
      },
      {
        field: 'textAlign',
        label: '${L('Выравнивание', 'Alignment')}',
        type: 'select',
        options: [
          { value: 'left', label: '${L('По левому краю', 'Left')}' },
          { value: 'center', label: '${L('По центру', 'Center')}' },
          { value: 'right', label: '${L('По правому краю', 'Right')}' }
        ],
        defaultValue: 'left'
      }
    ]
  }
}`;

  const cards = {
    text: {
      description: L(
        'Однострочное текстовое поле для ввода короткого текста (заголовки, названия)',
        'Single-line text field for short text (headings, titles)',
      ),
      icon: '📝',
      example: `{
  field: 'title',
  label: '${L('Заголовок', 'Title')}',
  type: 'text',
  placeholder: '${L('Введите заголовок...', 'Enter title...')}',
  defaultValue: ''
}`,
      parameters: ['field', 'label', 'type', 'placeholder', 'defaultValue', 'rules'],
    },
    textarea: {
      description: L(
        'Многострочное текстовое поле для длинного текста (описания, контент)',
        'Multi-line text field for long text (descriptions, content)',
      ),
      icon: '📄',
      example: `{
  field: 'content',
  label: '${L('Содержимое', 'Content')}',
  type: 'textarea',
  placeholder: '${L('Введите текст...', 'Enter text...')}',
  defaultValue: ''
}`,
      parameters: ['field', 'label', 'type', 'placeholder', 'defaultValue', 'rules'],
    },
    number: {
      description: L(
        'Числовое поле для ввода чисел (размеры, количество, значения)',
        'Number field for numeric input (sizes, counts, values)',
      ),
      icon: '🔢',
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
      parameters: ['field', 'label', 'type', 'defaultValue', 'rules'],
    },
    select: {
      description: L(
        'Выпадающий список для выбора одного или нескольких значений из options. Множественный выбор: multiple: true.',
        'Dropdown for selecting one or multiple values from options. Multiple selection: multiple: true.',
      ),
      icon: '📋',
      example: `// ${L('Одиночный выбор', 'Single selection')}
{
  field: 'textAlign',
  label: '${L('Выравнивание', 'Alignment')}',
  type: 'select',
  options: [
    { value: 'left', label: '${L('По левому краю', 'Left')}' },
    { value: 'center', label: '${L('По центру', 'Center')}' },
    { value: 'right', label: '${L('По правому краю', 'Right')}', disabled: true }
  ],
  defaultValue: 'left'
}

// ${L('Множественный выбор', 'Multiple selection')}
{
  field: 'topics',
  label: '${L('Темы', 'Topics')}',
  type: 'select',
  multiple: true,
  options: [
    { value: 'dev', label: '${L('Разработка', 'Development')}' },
    { value: 'design', label: '${L('Дизайн', 'Design')}' }
  ],
  defaultValue: ['dev']
}`,
      parameters: ['field', 'label', 'type', 'options', 'multiple', 'defaultValue', 'rules'],
    },
    checkbox: {
      description: L('Чекбокс для булевых значений (true/false)', 'Checkbox for boolean values (true/false)'),
      icon: '☑️',
      example: `{
  field: 'visible',
  label: '${L('Видимый', 'Visible')}',
  type: 'checkbox',
  defaultValue: true
}`,
      parameters: ['field', 'label', 'type', 'defaultValue'],
    },
    radio: {
      description: L(
        'Радио-кнопки для выбора одного значения из ограниченного набора',
        'Radio buttons for selecting one value from a limited set',
      ),
      icon: '🔘',
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
      parameters: ['field', 'label', 'type', 'options', 'defaultValue'],
    },
    color: {
      description: L('Выбор цвета через color picker (HEX формат)', 'Color selection via color picker (HEX format)'),
      icon: '🎨',
      example: `{
  field: 'backgroundColor',
  label: '${L('Цвет фона', 'Background color')}',
  type: 'color',
  defaultValue: '#ffffff'
}`,
      parameters: ['field', 'label', 'type', 'defaultValue'],
    },
    image: {
      description: L(
        'Загрузка изображения с поддержкой base64 и серверной загрузки, автоматическим preview и валидацией',
        'Image upload with base64 and server upload support, automatic preview and validation',
      ),
      icon: '🖼️',
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
      parameters: ['field', 'label', 'type', 'defaultValue', 'fileUploadConfig', 'multiple', 'rules'],
    },
    file: {
      description: L(
        'Загрузка файлов с отдельным UI (список имён, не превью). multiple и maxCount.',
        'File upload with separate UI (name list, no preview). multiple and maxCount.',
      ),
      icon: '📄',
      example: `{
  field: 'files',
  label: '${L('Файлы', 'Files')}',
  type: 'file',
  multiple: true,
  fileUploadConfig: { uploadUrl: '/api/upload', maxCount: 5 }
}`,
      parameters: ['field', 'label', 'type', 'multiple', 'fileUploadConfig', 'rules'],
    },
    blockAnchor: {
      description: L(
        'Якорь #block-id или URL в форме. Скролл, preventDefault и поведение ссылки — в компоненте блока пользователя.',
        'Anchor #block-id or URL in form. Scroll, preventDefault and link behavior — in user block component.',
      ),
      icon: '🔗',
      example: `{
  field: 'url',
  type: 'block-anchor',
  blockAnchorConfig: { allowCustomUrl: true }
}`,
      parameters: ['field', 'label', 'type', 'blockAnchorConfig', 'rules'],
    },
    matrixTable: {
      description: L('Редактор таблицы (колонки + строки)', 'Table editor (columns + rows)'),
      icon: '📋',
      example: `{
  field: 'tableMatrix',
  type: 'matrix-table',
  matrixTableConfig: { imageUploadConfig: { maxFileSize: 5242880 } }
}`,
      parameters: ['field', 'label', 'type', 'matrixTableConfig', 'defaultValue', 'rules'],
    },
  };

  return {
    title: L('Типы полей', 'Field types'),
    subtitle: L(
      'Поддерживаемые типы полей для форм редактирования и создания блоков',
      'Supported field types for block editing and creation forms',
    ),
    whatIs: {
      title: L('Что такое типы полей?', 'What are field types?'),
      p1: L(
        'Типы полей — это элементы интерфейса, которые используются в <strong>формах редактирования и создания блоков</strong>. При конфигурации типа блока вы указываете массив полей (<code>fields</code>), и BlockBuilder автоматически генерирует форму с соответствующими элементами управления.',
        'Field types are UI elements used in <strong>block editing and creation forms</strong>. When configuring a block type you specify a <code>fields</code> array, and BlockBuilder automatically generates a form with the corresponding controls.',
      ),
      p2: L('Эти формы используются для:', 'These forms are used for:'),
      uses: {
        create: L('Создания новых блоков через UI', 'Creating new blocks via UI'),
        edit: L('Редактирования существующих блоков', 'Editing existing blocks'),
        props: L(
          'Настройки свойств (<code>props</code>) блока',
          'Configuring block <code>props</code>',
        ),
      },
    },
    usageExample: {
      title: L('Пример использования', 'Usage example'),
      code: usageCode,
    },
    availableTypes: {
      title: L('Доступные типы полей', 'Available field types'),
    },
    parametersLabel: L('Параметры:', 'Parameters:'),
    cards,
    commonParams: {
      title: L('Общие параметры полей', 'Common field parameters'),
      field: {
        badge: L('(обязательный)', '(required)'),
        description: L(
          'Имя поля, которое будет использоваться в <code>props</code> блока. Должно быть уникальным в рамках конфигурации блока.',
          'Field name used in block <code>props</code>. Must be unique within the block configuration.',
        ),
      },
      label: {
        badge: L('(обязательный)', '(required)'),
        description: L(
          'Отображаемое название поля в форме. Используется для пользовательского интерфейса.',
          'Display name of the field in the form. Used for the user interface.',
        ),
      },
      type: {
        badge: L('(обязательный)', '(required)'),
        description: L(
          'Тип поля: <code>\'text\'</code>, <code>\'textarea\'</code>, <code>\'number\'</code>, <code>\'select\'</code>, <code>\'checkbox\'</code>, <code>\'radio\'</code>, <code>\'color\'</code>, <code>\'image\'</code>, <code>\'file\'</code>, <code>\'block-anchor\'</code>, <code>\'matrix-table\'</code>',
          'Field type: <code>\'text\'</code>, <code>\'textarea\'</code>, <code>\'number\'</code>, <code>\'select\'</code>, <code>\'checkbox\'</code>, <code>\'radio\'</code>, <code>\'color\'</code>, <code>\'image\'</code>, <code>\'file\'</code>, <code>\'block-anchor\'</code>, <code>\'matrix-table\'</code>',
        ),
      },
      defaultValue: {
        badge: L('(опциональный)', '(optional)'),
        description: L(
          'Значение по умолчанию, которое будет использоваться при создании нового блока.',
          'Default value used when creating a new block.',
        ),
      },
      placeholder: {
        badge: L('(опциональный)', '(optional)'),
        description: L(
          'Подсказка, отображаемая в пустом поле (для типов <code>text</code> и <code>textarea</code>).',
          'Hint displayed in an empty field (for <code>text</code> and <code>textarea</code> types).',
        ),
      },
      options: {
        badge: L('(для select, radio)', '(for select, radio)'),
        description: L(
          'Массив опций в формате [{ value: \'...\', label: \'...\', disabled?: boolean }].',
          'Array of options in format [{ value: \'...\', label: \'...\', disabled?: boolean }].',
        ),
        items: {
          value: L(
            '<strong>value</strong> — значение, сохраняемое в props (string | number)',
            '<strong>value</strong> — value saved in props (string | number)',
          ),
          label: L('<strong>label</strong> — отображаемый текст (string)', '<strong>label</strong> — display text (string)'),
          disabled: L(
            '<strong>disabled</strong> — опционально, отключает опцию для выбора (boolean)',
            '<strong>disabled</strong> — optional, disables option for selection (boolean)',
          ),
        },
      },
      multiple: {
        badge: L('(для select, image, file; опционально)', '(for select, image, file; optional)'),
        description: L(
          'Включает множественный режим. По умолчанию <code>false</code>.',
          'Enables multiple mode. Defaults to <code>false</code>.',
        ),
        items: {
          select: L(
            '<strong>select:</strong> в <code>props</code> — массив <code>value</code>; <code>defaultValue: []</code> или массив начальных значений',
            '<strong>select:</strong> in <code>props</code> — array of <code>value</code>; <code>defaultValue: []</code> or array of initial values',
          ),
          file: L(
            '<strong>image / file:</strong> несколько загруженных файлов',
            '<strong>image / file:</strong> multiple uploaded files',
          ),
        },
      },
      rules: {
        badge: L('(опциональный)', '(optional)'),
        description: L('Массив правил валидации. Поддерживаемые типы:', 'Array of validation rules. Supported types:'),
        items: {
          required: L('поле обязательно', 'field is required'),
          minLength: L('минимальная длина', 'minimum length'),
          maxLength: L('максимальная длина', 'maximum length'),
          min: L('минимальное значение (для number)', 'minimum value (for number)'),
          max: L('максимальное значение (для number)', 'maximum value (for number)'),
        },
      },
    },
  };
}
