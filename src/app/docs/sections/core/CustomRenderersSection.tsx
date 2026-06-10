'use client';

import CodeBlock from '@/components/CodeBlock';
import Icon from '@/components/Icon';
import type { NavigationProps } from '../../types';

export default function CustomRenderersSection({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Кастомные рендереры</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Создание собственных рендереров полей для расширения функциональности форм
        </p>
      </div>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Что такое кастомный рендерер?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Кастомный рендерер позволяет создать собственный UI компонент для редактирования поля в форме блока. 
          Это особенно полезно когда стандартных типов полей недостаточно для ваших задач.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Когда использовать:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
            <li>WYSIWYG редактор для форматированного текста</li>
            <li>Date/Time picker для выбора даты и времени</li>
            <li>Интеграция со сторонними библиотеками (например, Chart.js, CodeMirror)</li>
            <li>Сложные компоненты выбора (многоуровневые меню, tree select)</li>
            <li>Собственные интерактивные элементы управления</li>
          </ul>
        </div>
      </section>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Интерфейс ICustomFieldRenderer</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Кастомный рендерер должен реализовывать интерфейс <code className="text-orange-700 dark:text-orange-400">ICustomFieldRenderer</code>:
        </p>
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
  fieldName: string;          // Имя поля (из field.field)
  label: string;              // Метка поля
  value: any;                 // Текущее значение поля
  required: boolean;          // Обязательно ли поле
  options?: Record<string, any>; // Дополнительные опции из customFieldConfig.options
  onChange: (value: any) => void;    // Callback для обновления значения
  onError?: (error: string | null) => void;  // Callback для обработки ошибок
}

interface ICustomFieldRenderResult {
  element: HTMLElement | string;  // DOM элемент или HTML строка
  getValue?: () => any;           // Получить текущее значение (опционально)
  setValue?: (value: any) => void; // Установить значение программно (опционально)
  validate?: () => string | null;  // Валидация (вернуть ошибку или null) (опционально)
  destroy?: () => void;           // Очистка ресурсов при удалении (опционально)
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Шаг 1: Создание класса рендерера</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Создайте класс, реализующий интерфейс <code className="text-orange-700 dark:text-orange-400">ICustomFieldRenderer</code>:
        </p>
        <CodeBlock
          code={`class WysiwygFieldRenderer implements ICustomFieldRenderer {
  readonly id = 'wysiwyg-editor';
  readonly name = 'WYSIWYG Editor';

  render(container: HTMLElement, context: ICustomFieldContext) {
    const { value, onChange, onError, required, options } = context;
    
    // Создаем элемент для редактора
    const editorElement = document.createElement('div');
    editorElement.className = 'wysiwyg-editor';
    editorElement.contentEditable = 'true';
    editorElement.innerHTML = value || '';
    
    // Применяем стили из options если есть
    if (options?.height) {
      editorElement.style.height = options.height;
    }
    
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
    
    // Обработка потери фокуса для валидации
    editorElement.addEventListener('blur', () => {
      if (required && !editorElement.innerHTML.trim()) {
        onError?.('Поле обязательно для заполнения');
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
          return 'Поле обязательно для заполнения';
        }
        return null;
      },
      destroy: () => {
        // Очистка event listeners и ресурсов
        editorElement.remove();
      }
    };
  }
}`}
          language="typescript"
          className="mb-4"
        />
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mt-4 border-l-4 border-yellow-500">
          <h4 className="font-bold text-yellow-900 dark:text-yellow-200 mb-2">⚠️ Важно для внешних библиотек:</h4>
          <p className="text-sm text-yellow-800 dark:text-yellow-300 mb-2">
            При использовании внешних библиотек (Jodit, TinyMCE и т.д.) <strong>храните экземпляр редактора локально в методе render</strong> (как <code className="text-yellow-700 dark:text-yellow-400">const editor = ...</code>), а не как свойство класса. Это критично для корректной работы в repeater полях, где создается несколько экземпляров редактора одновременно.
          </p>
          <p className="text-sm text-yellow-800 dark:text-yellow-300 mb-2">
            <strong>Пример правильного подхода:</strong> <code className="text-yellow-700 dark:text-yellow-400">const editor = new Jodit(...)</code> внутри метода <code className="text-yellow-700 dark:text-yellow-400">render()</code>, а не <code className="text-yellow-700 dark:text-yellow-400">this.editor = new Jodit(...)</code>.
          </p>
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            <strong>Важно (v1.0.30+):</strong> ControlManager гарантирует, что элемент уже находится в DOM при вызове <code className="text-yellow-700 dark:text-yellow-400">render()</code>, поэтому <strong>не используйте setTimeout</strong> для инициализации. Инициализируйте библиотеки синхронно сразу после создания элементов.
          </p>
        </div>
      </section>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Шаг 2: Регистрация рендерера</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          После создания экземпляра BlockBuilder зарегистрируйте ваш рендерер:
        </p>
        <CodeBlock
          code={`import { BlockBuilder } from '@mushket-co/block-builder';

// Создание экземпляра BlockBuilder
const blockBuilder = new BlockBuilder({
  containerId: 'block-container',  // Только для полной версии с UI
  blockConfigs: {
    // ваши конфигурации блоков
  },
});

// Регистрация одного рендерера
blockBuilder.registerCustomFieldRenderer(new WysiwygFieldRenderer());

// Или массовая регистрация нескольких рендереров
blockBuilder.registerCustomFieldRenderers([
  new WysiwygFieldRenderer(),
  new DatePickerFieldRenderer(),
  new ColorPickerFieldRenderer()
]);`}
          language="typescript"
          className="mb-4"
        />
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 border-l-4 border-yellow-400 mt-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
            <Icon name="warning" size={18} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Важно:</strong> Регистрируйте рендереры <strong>ДО</strong> инициализации UI (до вызова <code className="text-yellow-700 dark:text-yellow-400">autoInit: true</code> или создания компонентов). 
              Если используется <code className="text-yellow-700 dark:text-yellow-400">autoInit: false</code>, регистрируйте рендереры перед первым рендерингом формы.
            </span>
          </p>
        </div>
      </section>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Шаг 3: Использование в конфигурации блока</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Используйте тип поля <code className="text-orange-700 dark:text-orange-400">'custom'</code> и укажите <code className="text-orange-700 dark:text-orange-400">customFieldConfig</code>:
        </p>
        <CodeBlock
          code={`const blockConfigs = {
  richText: {
    title: 'Rich Text блок',
    icon: '📝',
    description: 'Блок с форматированным текстом',
    fields: [
      {
        field: 'content',
        label: 'Содержимое',
        type: 'custom',
        customFieldConfig: {
          rendererId: 'wysiwyg-editor',  // ID зарегистрированного рендерера
          options: {                      // Дополнительные опции передаются в context.options
            height: '300px',
            toolbar: true
          }
        },
        defaultValue: '',
        rules: [
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
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Полный пример: Date Picker</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Пример создания кастомного рендерера для выбора даты:
        </p>
        <CodeBlock
          code={`class DatePickerFieldRenderer implements ICustomFieldRenderer {
  readonly id = 'date-picker';
  readonly name = 'Date Picker';

  render(container: HTMLElement, context: ICustomFieldContext) {
    const { value, onChange, onError, required, options } = context;
    
    // Создаем input элемент
    const input = document.createElement('input');
    input.type = 'date';
    input.value = value || '';
    input.className = 'date-picker-input';
    input.required = required;
    
    // Применяем опции
    if (options?.minDate) {
      input.min = options.minDate;
    }
    if (options?.maxDate) {
      input.max = options.maxDate;
    }
    
    // Обработка изменений
    input.addEventListener('change', (e) => {
      const newValue = (e.target as HTMLInputElement).value;
      onChange(newValue);
      
      // Валидация
      if (required && !newValue) {
        onError?.('Поле обязательно для заполнения');
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
          return 'Поле обязательно для заполнения';
        }
        return null;
      },
      destroy: () => {
        input.remove();
      }
    };
  }
}

// Регистрация
blockBuilder.registerCustomFieldRenderer(new DatePickerFieldRenderer());

// Использование в конфигурации
const blockConfigs = {
  event: {
    title: 'Событие',
    fields: [
      {
        field: 'date',
        label: 'Дата события',
        type: 'custom',
        customFieldConfig: {
          rendererId: 'date-picker',
          options: {
            minDate: new Date().toISOString().split('T')[0] // Минимум сегодня
          }
        },
        defaultValue: '',
        rules: [
          { type: 'required', message: 'Дата обязательна' }
        ]
      }
    ]
  }
};`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Асинхронная инициализация</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Если ваш рендерер требует асинхронной инициализации (например, загрузка библиотек), 
          метод <code className="text-orange-700 dark:text-orange-400">render</code> может возвращать Promise:
        </p>
        <CodeBlock
          code={`class AsyncCodeEditorRenderer implements ICustomFieldRenderer {
  readonly id = 'code-editor';
  readonly name = 'Code Editor';

  async render(container: HTMLElement, context: ICustomFieldContext): Promise<ICustomFieldRenderResult> {
    const { value, onChange, options } = context;
    
    // Динамическая загрузка библиотеки
    const CodeMirror = await import('codemirror');
    await import('codemirror/mode/javascript/javascript');
    
    // Создание редактора
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
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">API для работы с рендерерами</h2>
        <div className="space-y-3">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-orange-700 dark:text-orange-400">registerCustomFieldRenderer(renderer)</code>
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Регистрация одного кастомного рендерера поля. Принимает объект, реализующий <code className="text-orange-700 dark:text-orange-400">ICustomFieldRenderer</code>.
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-orange-700 dark:text-orange-400">registerCustomFieldRenderers(renderers)</code>
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Массовая регистрация нескольких рендереров. Принимает массив рендереров.
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
              Проверка существования рендерера по ID. Возвращает <code className="text-orange-700 dark:text-orange-400">boolean</code>.
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
              <code className="text-orange-700 dark:text-orange-400">unregisterCustomFieldRenderer(id)</code>
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Удаление рендерера по ID. Возвращает <code className="text-orange-700 dark:text-orange-400">boolean</code> (успешно ли удалено).
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
      </section>

      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Рекомендации и лучшие практики</h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Всегда очищайте ресурсы в методе <code className="text-orange-700 dark:text-orange-400">destroy</code> (удаляйте event listeners, таймеры и т.д.)</span>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Используйте <code className="text-orange-700 dark:text-orange-400">onChange</code> для уведомления об изменениях значения</span>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Используйте <code className="text-orange-700 dark:text-orange-400">onError</code> для отображения ошибок валидации</span>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Метод <code className="text-orange-700 dark:text-orange-400">validate</code> должен возвращать <code className="text-orange-700 dark:text-orange-400">null</code> если валидация прошла успешно</span>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Для сложных компонентов используйте асинхронный <code className="text-orange-700 dark:text-orange-400">render</code> с Promise</span>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Используйте <code className="text-orange-700 dark:text-orange-400">options</code> для передачи дополнительных параметров конфигурации</span>
          </li>
        </ul>
      </section>
    </div>
  );
}

