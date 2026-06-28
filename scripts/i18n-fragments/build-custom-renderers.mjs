export function buildCustomRenderers(locale) {
  const isRu = locale === 'ru';
  const reqMsg = isRu ? 'Поле обязательно для заполнения' : 'Field is required';
  const contentReq = isRu ? 'Содержимое обязательно' : 'Content is required';
  const dateReq = isRu ? 'Дата обязательна' : 'Date is required';

  return {
    title: isRu ? 'Кастомные рендереры' : 'Custom renderers',
    subtitle: isRu
      ? 'Создание собственных рендереров полей для расширения функциональности форм'
      : 'Creating custom field renderers to extend form functionality',
    whatIs: {
      title: isRu ? 'Что такое кастомный рендерер?' : 'What is a custom renderer?',
      p1: isRu
        ? 'Кастомный рендерер позволяет создать собственный UI компонент для редактирования поля в форме блока. Это особенно полезно когда стандартных типов полей недостаточно для ваших задач.'
        : 'A custom renderer lets you create your own UI component for editing a field in a block form. This is especially useful when standard field types are not enough for your needs.',
      whenTitle: isRu ? 'Когда использовать:' : 'When to use:',
      whenItems: {
        wysiwyg: isRu ? 'WYSIWYG-редактор для форматированного текста' : 'WYSIWYG editor for formatted text',
        datePicker: isRu ? 'Выбор даты и времени (date/time picker)' : 'Date and time selection (date/time picker)',
        libraries: isRu
          ? 'Интеграция со сторонними библиотеками (например, Chart.js, CodeMirror)'
          : 'Integration with third-party libraries (e.g. Chart.js, CodeMirror)',
        complexSelect: isRu
          ? 'Сложные компоненты выбора (многоуровневые меню, древовидный select)'
          : 'Complex selection components (multi-level menus, tree select)',
        customControls: isRu ? 'Собственные интерактивные элементы управления' : 'Custom interactive controls',
      },
    },
    interface: {
      title: isRu ? 'Интерфейс ICustomFieldRenderer' : 'ICustomFieldRenderer interface',
      p1: isRu
        ? 'Кастомный рендерер должен реализовывать интерфейс <code>ICustomFieldRenderer</code>:'
        : 'A custom renderer must implement the <code>ICustomFieldRenderer</code> interface:',
      code: `interface ICustomFieldRenderer {
  readonly id: string;        // ${isRu ? 'Уникальный ID рендерера' : 'Unique renderer ID'}
  readonly name: string;      // ${isRu ? 'Название для отображения' : 'Display name'}
  
  render(
    container: HTMLElement,
    context: ICustomFieldContext
  ): ICustomFieldRenderResult | Promise<ICustomFieldRenderResult>;
}

interface ICustomFieldContext {
  fieldName: string;          // ${isRu ? 'Имя поля (из field.field)' : 'Field name (from field.field)'}
  label: string;              // ${isRu ? 'Метка поля' : 'Field label'}
  value: any;                 // ${isRu ? 'Текущее значение поля' : 'Current field value'}
  required: boolean;          // ${isRu ? 'Обязательно ли поле' : 'Whether field is required'}
  options?: Record<string, any>; // ${isRu ? 'Дополнительные опции из customFieldConfig.options' : 'Additional options from customFieldConfig.options'}
  onChange: (value: any) => void;    // ${isRu ? 'Обратный вызов для обновления значения' : 'Callback to update value'}
  onError?: (error: string | null) => void;  // ${isRu ? 'Обратный вызов для обработки ошибок' : 'Callback for error handling'}
}

interface ICustomFieldRenderResult {
  element: HTMLElement | string;  // ${isRu ? 'DOM элемент или HTML строка' : 'DOM element or HTML string'}
  getValue?: () => any;           // ${isRu ? 'Получить текущее значение (опционально)' : 'Get current value (optional)'}
  setValue?: (value: any) => void; // ${isRu ? 'Установить значение программно (опционально)' : 'Set value programmatically (optional)'}
  validate?: () => string | null;  // ${isRu ? 'Валидация (вернуть ошибку или null) (опционально)' : 'Validation (return error or null) (optional)'}
  destroy?: () => void;           // ${isRu ? 'Очистка ресурсов при удалении (опционально)' : 'Cleanup on removal (optional)'}
}`,
    },
    step1: {
      title: isRu ? 'Шаг 1: Создание класса рендерера' : 'Step 1: Create renderer class',
      p1: isRu
        ? 'Создайте класс, реализующий интерфейс <code>ICustomFieldRenderer</code>:'
        : 'Create a class implementing the <code>ICustomFieldRenderer</code> interface:',
      code: `class WysiwygFieldRenderer implements ICustomFieldRenderer {
  readonly id = 'wysiwyg-editor';
  readonly name = 'WYSIWYG Editor';

  render(container: HTMLElement, context: ICustomFieldContext) {
    const { value, onChange, onError, required, options } = context;
    
    // ${isRu ? 'Создаем элемент для редактора' : 'Create editor element'}
    const editorElement = document.createElement('div');
    editorElement.className = 'wysiwyg-editor';
    editorElement.contentEditable = 'true';
    editorElement.innerHTML = value || '';
    
    // ${isRu ? 'Применяем стили из options если есть' : 'Apply styles from options if present'}
    if (options?.height) {
      editorElement.style.height = options.height;
    }
    
    // ${isRu ? 'Обработка изменений' : 'Handle changes'}
    editorElement.addEventListener('input', () => {
      try {
        const newValue = editorElement.innerHTML;
        onChange(newValue);
        onError?.(null); // ${isRu ? 'Очищаем ошибку при успешном изменении' : 'Clear error on successful change'}
      } catch (error) {
        onError?.(error.message);
      }
    });
    
    // ${isRu ? 'Обработка потери фокуса для валидации' : 'Handle blur for validation'}
    editorElement.addEventListener('blur', () => {
      if (required && !editorElement.innerHTML.trim()) {
        onError?.('${reqMsg}');
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
        if (required && !editorElement.innerHTML.trim()) {
          return '${reqMsg}';
        }
        return null;
      },
      destroy: () => {
        // ${isRu ? 'Очистка event listeners и ресурсов' : 'Cleanup event listeners and resources'}
        editorElement.remove();
      }
    };
  }
}`,
      important: isRu
        ? '<strong>Важно для внешних библиотек:</strong> храните экземпляр редактора локально в методе <code>render()</code>, а не как свойство класса — критично для repeater. ControlManager гарантирует DOM при вызове <code>render()</code>: инициализируйте синхронно, без <code>setTimeout</code>. <link>Подробнее — кастомные рендереры →</link>'
        : '<strong>Important for external libraries:</strong> store the editor instance locally in <code>render()</code>, not as a class property — critical for repeater. ControlManager guarantees DOM when <code>render()</code> is called: initialize synchronously, without <code>setTimeout</code>. <link>More — custom renderers →</link>',
    },
    step2: {
      title: isRu ? 'Шаг 2: Регистрация рендерера' : 'Step 2: Register renderer',
      p1: isRu
        ? 'После создания экземпляра BlockBuilder зарегистрируйте ваш рендерер:'
        : 'After creating a BlockBuilder instance, register your renderer:',
      code: `import { BlockBuilder } from '@mushket-co/block-builder';

// ${isRu ? 'Создание экземпляра BlockBuilder' : 'Create BlockBuilder instance'}
const blockBuilder = new BlockBuilder({
  blockConfigs: {
    // ${isRu ? 'ваши конфигурации блоков' : 'your block configs'}
  },
});

// ${isRu ? 'Регистрация одного рендерера' : 'Register single renderer'}
blockBuilder.registerCustomFieldRenderer(new WysiwygFieldRenderer());

// ${isRu ? 'Или массовая регистрация нескольких рендереров' : 'Or bulk register multiple renderers'}
blockBuilder.registerCustomFieldRenderers([
  new WysiwygFieldRenderer(),
  new DatePickerFieldRenderer(),
  new ColorPickerFieldRenderer()
]);`,
      important: isRu
        ? '<strong>Важно:</strong> регистрируйте рендереры <strong>ДО</strong> инициализации UI (до <code>autoInit: true</code> или создания компонентов). При <code>autoInit: false</code> — перед первым рендерингом формы. <link>Подробнее — регистрация →</link>'
        : '<strong>Important:</strong> register renderers <strong>BEFORE</strong> UI initialization (before <code>autoInit: true</code> or creating components). With <code>autoInit: false</code> — before the first form render. <link>More — registration →</link>',
    },
    step3: {
      title: isRu ? 'Шаг 3: Использование в конфигурации блока' : 'Step 3: Use in block configuration',
      p1: isRu
        ? 'Используйте тип поля <code>\'custom\'</code> и укажите <code>customFieldConfig</code>:'
        : 'Use field type <code>\'custom\'</code> and specify <code>customFieldConfig</code>:',
      code: `const blockConfigs = {
  richText: {
    title: '${isRu ? 'Rich Text блок' : 'Rich Text block'}',
    icon: '📝',
    description: '${isRu ? 'Блок с форматированным текстом' : 'Block with formatted text'}',
    fields: [
      {
        field: 'content',
        label: '${isRu ? 'Содержимое' : 'Content'}',
        type: 'custom',
        customFieldConfig: {
          rendererId: 'wysiwyg-editor',  // ${isRu ? 'ID зарегистрированного рендерера' : 'Registered renderer ID'}
          options: {                      // ${isRu ? 'Дополнительные опции передаются в context.options' : 'Additional options passed to context.options'}
            height: '300px',
            toolbar: true
          }
        },
        defaultValue: '',
        rules: [
          { type: 'required', message: '${contentReq}' }
        ]
      }
    ],
    render: {
      kind: 'html',
      template: (props) => '<div class="rich-text">' + (props.content || '') + '</div>'
    }
  }
};`,
    },
    datePicker: {
      title: isRu ? 'Полный пример: Date Picker' : 'Full example: Date Picker',
      p1: isRu ? 'Пример создания кастомного рендерера для выбора даты:' : 'Example of creating a custom renderer for date selection:',
      code: `class DatePickerFieldRenderer implements ICustomFieldRenderer {
  readonly id = 'date-picker';
  readonly name = 'Date Picker';

  render(container: HTMLElement, context: ICustomFieldContext) {
    const { value, onChange, onError, required, options } = context;
    
    // ${isRu ? 'Создаем input элемент' : 'Create input element'}
    const input = document.createElement('input');
    input.type = 'date';
    input.value = value || '';
    input.className = 'date-picker-input';
    input.required = required;
    
    // ${isRu ? 'Применяем опции' : 'Apply options'}
    if (options?.minDate) {
      input.min = options.minDate;
    }
    if (options?.maxDate) {
      input.max = options.maxDate;
    }
    
    // ${isRu ? 'Обработка изменений' : 'Handle changes'}
    input.addEventListener('change', (e) => {
      const newValue = (e.target as HTMLInputElement).value;
      onChange(newValue);
      
      // ${isRu ? 'Валидация' : 'Validation'}
      if (required && !newValue) {
        onError?.('${reqMsg}');
      } else {
        onError?.(null);
      }
    });
    
    container.appendChild(input);
    
    return {
      element: input,
      getValue: () => input.value,
      setValue: (val: string) => {
        input.value = val || '';
      },
      validate: () => {
        if (required && !input.value) {
          return '${reqMsg}';
        }
        return null;
      },
      destroy: () => {
        input.remove();
      }
    };
  }
}

// ${isRu ? 'Регистрация' : 'Registration'}
blockBuilder.registerCustomFieldRenderer(new DatePickerFieldRenderer());

// ${isRu ? 'Использование в конфигурации' : 'Usage in configuration'}
const blockConfigs = {
  event: {
    title: '${isRu ? 'Событие' : 'Event'}',
    fields: [
      {
        field: 'date',
        label: '${isRu ? 'Дата события' : 'Event date'}',
        type: 'custom',
        customFieldConfig: {
          rendererId: 'date-picker',
          options: {
            minDate: new Date().toISOString().split('T')[0] // ${isRu ? 'Минимум сегодня' : 'Minimum today'}
          }
        },
        defaultValue: '',
        rules: [
          { type: 'required', message: '${dateReq}' }
        ]
      }
    ]
  }
};`,
    },
    async: {
      title: isRu ? 'Асинхронная инициализация' : 'Async initialization',
      p1: isRu
        ? 'Если ваш рендерер требует асинхронной инициализации (например, загрузка библиотек), метод <code>render</code> может возвращать Promise:'
        : 'If your renderer requires async initialization (e.g. loading libraries), the <code>render</code> method can return a Promise:',
      code: `class AsyncCodeEditorRenderer implements ICustomFieldRenderer {
  readonly id = 'code-editor';
  readonly name = 'Code Editor';

  async render(container: HTMLElement, context: ICustomFieldContext): Promise<ICustomFieldRenderResult> {
    const { value, onChange, options } = context;
    
    // ${isRu ? 'Динамическая загрузка библиотеки' : 'Dynamic library loading'}
    const CodeMirror = await import('codemirror');
    await import('codemirror/mode/javascript/javascript');
    
    // ${isRu ? 'Создание редактора' : 'Create editor'}
    const textarea = document.createElement('textarea');
    container.appendChild(textarea);
    
    const editor = CodeMirror.fromTextArea(textarea, {
      mode: options?.mode || 'javascript',
      lineNumbers: true,
      theme: options?.theme || 'default'
    });
    
    editor.setValue(value || '');
    editor.on('change', () => {
      onChange(editor.getValue());
    });
    
    return {
      element: container,
      getValue: () => editor.getValue(),
      setValue: (val: string) => editor.setValue(val),
      destroy: () => {
        editor.toTextArea();
      }
    };
  }
}`,
    },
    api: {
      title: isRu ? 'API для работы с рендерерами' : 'Renderer API',
      registerCustomFieldRenderer: isRu
        ? 'Регистрация одного кастомного рендерера поля. Принимает объект, реализующий <code>ICustomFieldRenderer</code>.'
        : 'Register a single custom field renderer. Accepts an object implementing <code>ICustomFieldRenderer</code>.',
      registerCustomFieldRenderers: isRu
        ? 'Массовая регистрация нескольких рендереров. Принимает массив рендереров.'
        : 'Bulk register multiple renderers. Accepts an array of renderers.',
      getCustomFieldRenderer: isRu
        ? 'Получение рендерера по ID. Возвращает <code>ICustomFieldRenderer | null</code>.'
        : 'Get renderer by ID. Returns <code>ICustomFieldRenderer | null</code>.',
      hasCustomFieldRenderer: isRu
        ? 'Проверка существования рендерера по ID. Возвращает <code>boolean</code>.'
        : 'Check if renderer exists by ID. Returns <code>boolean</code>.',
      unregisterCustomFieldRenderer: isRu
        ? 'Удаление рендерера по ID. Возвращает <code>boolean</code> (успешно ли удалено).'
        : 'Remove renderer by ID. Returns <code>boolean</code> (whether removal succeeded).',
      getAllCustomFieldRenderers: isRu
        ? 'Получение всех зарегистрированных рендереров. Возвращает <code>Map&lt;string, ICustomFieldRenderer&gt;</code>.'
        : 'Get all registered renderers. Returns <code>Map&lt;string, ICustomFieldRenderer&gt;</code>.',
    },
    bestPractices: {
      title: isRu ? 'Рекомендации и лучшие практики' : 'Recommendations and best practices',
      destroy: isRu
        ? 'Всегда очищайте ресурсы в методе <code>destroy</code> (удаляйте event listeners, таймеры и т.д.)'
        : 'Always clean up resources in <code>destroy</code> (remove event listeners, timers, etc.)',
      onChange: isRu
        ? 'Используйте <code>onChange</code> для уведомления об изменениях значения'
        : 'Use <code>onChange</code> to notify about value changes',
      onError: isRu
        ? 'Используйте <code>onError</code> для отображения ошибок валидации'
        : 'Use <code>onError</code> to display validation errors',
      validate: isRu
        ? 'Метод <code>validate</code> должен возвращать <code>null</code> если валидация прошла успешно'
        : 'The <code>validate</code> method should return <code>null</code> when validation succeeds',
      asyncRender: isRu
        ? 'Для сложных компонентов используйте асинхронный <code>render</code> с Promise'
        : 'For complex components use async <code>render</code> with Promise',
      options: isRu
        ? 'Используйте <code>options</code> для передачи дополнительных параметров конфигурации'
        : 'Use <code>options</code> to pass additional configuration parameters',
    },
  };
}
