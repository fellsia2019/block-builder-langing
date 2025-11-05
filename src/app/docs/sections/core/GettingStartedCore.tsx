'use client';

import CodeBlock from '@/components/CodeBlock';
import Icon from '@/components/Icon';
import type { NavigationProps } from '../../types';

export default function GettingStartedCore({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Быстрый старт</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Начните использовать BlockBuilder за несколько минут
        </p>
      </div>

      <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Установка</h2>
        <CodeBlock
          code="npm install @mushket-co/block-builder"
          language="bash"
          className="mb-4"
        />
      </section>

      <section className="bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50 dark:from-yellow-900/20 dark:via-yellow-900/10 dark:to-yellow-900/20 rounded-xl p-6 border-2 border-yellow-400">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="star" size={24} className="text-yellow-600 dark:text-yellow-400" />
          FREE и PRO версии
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          BlockBuilder доступен в двух версиях: <strong>FREE</strong> (бесплатная демо-версия) и <strong>PRO</strong> (платная версия с полным функционалом).
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">FREE версия</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>До 5 типов блоков</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Все стандартные типы полей</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Spacing поля с дефолтными брекпоинтами</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Repeater поля</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Все CRUD операции</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-900/20 rounded-lg p-4 border-2 border-yellow-400">
            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <Icon name="star" size={20} className="text-yellow-600 dark:text-yellow-400" />
              PRO версия
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <Icon name="star" size={16} className="text-yellow-500 mr-2" />
                <span><strong>Неограниченное</strong> количество типов блоков</span>
              </li>
              <li className="flex items-start">
                <Icon name="star" size={16} className="text-yellow-500 mr-2" />
                <span><strong>Кастомные поля</strong> (custom type)</span>
              </li>
              <li className="flex items-start">
                <Icon name="star" size={16} className="text-yellow-500 mr-2" />
                <span><strong>API Select поля</strong> для интеграции с внешними API</span>
              </li>
              <li className="flex items-start">
                <Icon name="star" size={16} className="text-yellow-500 mr-2" />
                <span><strong>Кастомные брекпоинты</strong> для spacing полей</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Все возможности FREE версии</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">Автоматическая фильтрация</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            BlockBuilder автоматически скрывает недоступные функции в FREE версии:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-2">
            <li>Кастомные поля (<code className="text-blue-700 dark:text-blue-400">type: 'custom'</code>) не отображаются</li>
            <li>API Select поля (<code className="text-blue-700 dark:text-blue-400">type: 'api-select'</code>) не отображаются</li>
            <li>Кастомные брекпоинты в spacing игнорируются, используются только дефолтные</li>
            <li>Если типов блоков больше 5, лишние скрываются из UI</li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-2 border-green-400 mt-4">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Icon name="key" size={20} className="text-green-600 dark:text-green-400" />
            Тестовый ключ для демо и проверки
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Для демо, проверки и ознакомления с возможностями на <strong>localhost</strong> доступен тестовый ключ PRO лицензии. 
            Вы можете попробовать все функции, потыкать и посмотреть функционал:
          </p>
          <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-3 mb-2">
            <code className="text-green-400 font-mono text-sm">BB-PRO-1234-5678-ABCD</code>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Icon name="warning" size={14} className="text-gray-600 dark:text-gray-400" />
              Этот ключ работает только на <code className="text-gray-700 dark:text-gray-300">localhost</code>. Для production используйте ключ, полученный при покупке.
            </span>
          </p>
        </div>

        <div className="mt-4 bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">Реактивное обновление</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            При переходе с FREE на PRO лицензию, UI автоматически обновляется без перезагрузки страницы. 
            Все PRO функции становятся доступными сразу после активации лицензии.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Основные концепции</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">BlockConfig</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Конфигурация типа блока</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-900 dark:text-green-300 mb-2">BlockBuilder</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Основной класс для работы с блоками</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <h3 className="font-bold text-purple-900 dark:text-purple-300 mb-2">onSave Callback</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Колбэк для сохранения блоков (localStorage, API и т.д.)</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
            <h3 className="font-bold text-orange-900 dark:text-orange-300 mb-2">Field Renderers</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Рендереры для различных типов полей</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Пример использования</h2>
        <CodeBlock
          code={`import { BlockBuilder } from '@mushket-co/block-builder'

const blockConfigs = [
  {
    type: 'text',
    label: 'Текстовый блок',
    fields: [
      {
        name: 'content',
        label: 'Содержимое',
        type: 'text',
        required: true
      }
    ],
    defaultProps: {
      content: 'Привет, мир!'
    },
    spacingOptions: {  // Автоматически добавит поле spacing в форму
      enabled: true,
      spacingTypes: ['padding-top', 'padding-bottom']
    }
  }
]

const blockBuilder = new BlockBuilder({
  containerId: 'my-app',
  blockConfigs: blockConfigs,
  autoInit: true,
  onSave: async (blocks) => {
    // Сохранение блоков через колбэк (например, на сервер или в localStorage)
    localStorage.setItem('blocks', JSON.stringify(blocks))
    return true
  }
})`}
          language="javascript"
          className="mb-4"
        />
      </section>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Структура конфигурации блока</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Каждый блок в <code className="text-blue-700 dark:text-blue-400">blockConfigs</code> должен иметь следующую структуру:
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Полный пример конфигурации</h3>
          <CodeBlock
            code={`const blockConfigs = {
  // Ключ объекта - это type блока (обязательно, уникальный)
  text: {
    // Основные свойства блока
    type: 'text',              // Тип блока (обязательно, должен совпадать с ключом)
    label: 'Текстовый блок',   // Отображаемое название в UI (обязательно)
    title: 'Текстовый блок',   // Альтернативное название (опционально)
    icon: '📝',                // Иконка блока (опционально)
    description: 'Блок для текстового контента', // Описание блока (опционально)
    
    // Конфигурация рендеринга блока
    render: {
      kind: 'html',            // 'html' для Pure JS или 'component' для Vue/React
      template: (props) => {   // Функция шаблона (для kind: 'html')
        return '<div>' + props.content + '</div>'
      },
      // ИЛИ для Vue компонента:
      // kind: 'component',
      // framework: 'vue',
      // component: TextBlockComponent
    },
    
    // Поля формы редактирования
    fields: [
      {
        field: 'content',      // Имя поля (обязательно)
        label: 'Содержимое',   // Метка поля (обязательно)
        type: 'textarea',      // Тип поля (обязательно)
        placeholder: 'Введите текст...',
        defaultValue: '',      // Значение по умолчанию
        rules: [               // Правила валидации
          { type: 'required' },
          { type: 'minLength', value: 10 }
        ]
      }
    ],
    
    // Свойства блока по умолчанию
    defaultProps: {
      content: 'Привет, мир!',
      textAlign: 'left'
    },
    
    // Настройки блока по умолчанию
    defaultSettings: {
      visible: true
    },
    
    // Опции для автоматического добавления spacing полей
    spacingOptions: {
      enabled: true,                    // Включить spacing (по умолчанию true)
      spacingTypes: [                   // Какие типы отступов доступны
        'padding-top',
        'padding-bottom',
        'margin-top',
        'margin-bottom'
      ],
      config: {
        min: 0,                         // Минимальное значение (по умолчанию 0)
        max: 200,                       // Максимальное значение (по умолчанию 200)
        step: 4,                        // Шаг изменения (по умолчанию 1)
        breakpoints: [                  // Кастомные брекпоинты (только PRO)
          { name: 'desktop', label: 'Desktop', maxWidth: undefined },
          { name: 'tablet', label: 'Tablet', maxWidth: 1024 },
          { name: 'mobile', label: 'Mobile', maxWidth: 640 }
        ]
      }
    }
  }
}`}
            language="javascript"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Описание свойств конфигурации</h3>
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-blue-700 dark:text-blue-400">type</code> <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(обязательный)</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Уникальный идентификатор типа блока. Должен совпадать с ключом объекта в <code className="text-blue-700 dark:text-blue-400">blockConfigs</code>.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-blue-700 dark:text-blue-400">label</code> <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(обязательный)</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Отображаемое название блока в UI (например, в списке доступных типов блоков для добавления).
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-blue-700 dark:text-blue-400">title</code> <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(опциональный)</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Альтернативное название блока. Если не указано, используется <code className="text-blue-700 dark:text-blue-400">label</code>.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-blue-700 dark:text-blue-400">icon</code> <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(опциональный)</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Иконка блока (эмодзи или строка). Отображается в UI рядом с названием блока.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-blue-700 dark:text-blue-400">description</code> <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(опциональный)</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Описание блока. Используется для подсказок пользователю о назначении блока.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-blue-700 dark:text-blue-400">render</code> <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(обязательный)</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Конфигурация рендеринга блока. Определяет, как будет отображаться блок.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Для <strong>Pure JS</strong> используйте <code className="text-blue-700 dark:text-blue-400">kind: 'html'</code> с функцией <code className="text-blue-700 dark:text-blue-400">template</code>:
              </p>
              <CodeBlock
                code={`render: {
  kind: 'html',
  template: (props) => '<div>' + props.content + '</div>'
}`}
                language="javascript"
                className="text-xs mb-2"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Для <strong>Vue</strong> используйте <code className="text-blue-700 dark:text-blue-400">kind: 'component'</code>:
              </p>
              <CodeBlock
                code={`render: {
  kind: 'component',
  framework: 'vue',
  component: TextBlockComponent // Vue компонент
}`}
                language="javascript"
                className="text-xs"
              />
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-blue-700 dark:text-blue-400">fields</code> <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(опциональный)</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Массив полей формы для редактирования блока. Подробное описание типов полей см. в разделе "Поля форм".
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-blue-700 dark:text-blue-400">defaultProps</code> <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(опциональный)</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Объект со значениями свойств по умолчанию для нового блока. Эти значения будут использоваться при создании блока.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-blue-700 dark:text-blue-400">defaultSettings</code> <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(опциональный)</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Объект с настройками блока по умолчанию (например, <code className="text-blue-700 dark:text-blue-400">visible: true</code>).
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                <code className="text-blue-700 dark:text-blue-400">spacingOptions</code> <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(опциональный)</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Опции для автоматического добавления spacing полей в форму редактирования. Если <code className="text-blue-700 dark:text-blue-400">enabled: true</code>, 
                BlockBuilder автоматически добавит поля для управления отступами блока с поддержкой адаптивности.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-400">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">💡 Важно</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Ключ объекта в <code className="text-green-700 dark:text-green-400">blockConfigs</code> должен совпадать со значением <code className="text-green-700 dark:text-green-400">type</code></span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Свойства <code className="text-green-700 dark:text-green-400">type</code> и <code className="text-green-700 dark:text-green-400">label</code> являются обязательными</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Свойство <code className="text-green-700 dark:text-green-400">render</code> обязательно для определения способа рендеринга блока</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Все остальные свойства опциональны и используются для дополнительной настройки</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border-l-4 border-purple-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Отступы блоков (Spacing)</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          BlockBuilder автоматически управляет отступами блоков через систему <strong>spacing</strong>. 
          Отступы хранятся в <code className="text-purple-700 dark:text-purple-400">block.props.spacing</code> 
          и автоматически применяются к блоку с поддержкой адаптивности.
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Как это работает</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
            <li>При настройке <code className="text-purple-700 dark:text-purple-400">spacingOptions</code> в конфигурации блока, 
            BlockBuilder автоматически добавляет поле <code className="text-purple-700 dark:text-purple-400">spacing</code> в форму редактирования</li>
            <li>Значения отступов сохраняются в <code className="text-purple-700 dark:text-purple-400">block.props.spacing</code></li>
            <li>Отступы автоматически применяются к HTML элементу блока</li>
            <li><strong>Margin</strong> применяется напрямую через inline стили</li>
            <li><strong>Padding</strong> передается через CSS переменные для использования внутри блока</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Структура spacing данных</h3>
          <CodeBlock
            code={`// block.props.spacing
{
  desktop: {
    'padding-top': 20,
    'padding-bottom': 20,
    'margin-top': 10,
    'margin-bottom': 10
  },
  tablet: {
    'padding-top': 16,
    'padding-bottom': 16,
    'margin-top': 8,
    'margin-bottom': 8
  },
  mobile: {
    'padding-top': 12,
    'padding-bottom': 12,
    'margin-top': 6,
    'margin-bottom': 6
  }
}`}
            language="javascript"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Автоматическое применение в Vue</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            BlockBuilder автоматически применяет spacing к блоку. В Vue компонентах это происходит через 
            автоматическую генерацию inline стилей:
          </p>
          <CodeBlock
            code={`// BlockBuilder автоматически применяет spacing к элементу блока
// Результат:
<div 
  class="block-builder-block" 
  style="
    margin-top: 10px;
    margin-bottom: 10px;
    --spacing-padding-top: 20px;
    --spacing-padding-bottom: 20px;
  "
>
  <!-- Ваш контент блока -->
  <!-- Используйте CSS переменные для padding внутри блока -->
  <div style="padding-top: var(--spacing-padding-top); padding-bottom: var(--spacing-padding-bottom);">
    {{ block.props.content }}
  </div>
</div>`}
            language="html"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Использование в вашем компоненте</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            Если вы создаете свой компонент блока, используйте утилиты BlockBuilder:
          </p>
          <CodeBlock
            code={`// Vue 3 компонент
import { getBlockInlineStyles } from '@mushket-co/block-builder/core';

export default {
  props: ['block'],
  computed: {
    spacingStyles() {
      // Получаем стили для текущего брекпоинта
      return getBlockInlineStyles(
        this.block.props.spacing, 
        'spacing',
        this.customBreakpoints // опционально, свои брекпоинты
      );
    }
  },
  template: '<div :style="spacingStyles"><div style="padding-top: var(--spacing-padding-top);">{{ block.props.content }}</div></div>'
}

// Pure JS
import { applySpacingToElement } from '@mushket-co/block-builder/core';

const element = document.getElementById('my-block');
applySpacingToElement(
  element, 
  block.props.spacing, 
  'spacing',
  customBreakpoints // опционально
);`}
            language="javascript"
            className="mb-4"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">CSS переменные для padding</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            Padding передается через CSS переменные, чтобы вы могли контролировать, куда именно применить padding внутри блока:
          </p>
          <CodeBlock
            code={`/* Используйте CSS переменные в ваших стилях */
.block-content {
  padding-top: var(--spacing-padding-top, 0);
  padding-bottom: var(--spacing-padding-bottom, 0);
}

/* Или напрямую в inline стилях */
<div style="padding-top: var(--spacing-padding-top);">
  Контент блока
</div>`}
            language="css"
            className="mb-4"
          />
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">Адаптивность</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            BlockBuilder автоматически отслеживает изменение размера окна и обновляет отступы в зависимости от текущего брекпоинта. 
            Это происходит без перезагрузки страницы и без дополнительной настройки.
          </p>
        </div>
      </section>

      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="settings" size={24} className="text-indigo-600 dark:text-indigo-400" />
          API эндпоинты для бэкенда
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Для полноценной работы BlockBuilder в продакшене вам необходимо реализовать следующие API эндпоинты на вашем бэкенде:
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">1. Сохранение блоков</h3>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4 border border-gray-200 dark:border-slate-700">
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <code className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-sm font-semibold">POST</code>
                <code className="text-gray-700 dark:text-gray-300 font-mono text-sm">/api/blocks/save</code>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Эндпоинт для сохранения массива блоков. Принимает JSON строку с блоками и сохраняет её в вашей базе данных.
              </p>
            </div>
            
            <div className="mb-3">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Запрос:</h4>
              <CodeBlock
                code={`POST /api/blocks/save
Content-Type: application/json

{
  "blocks": [
    {
      "id": "block-1",
      "type": "text",
      "props": {
        "content": "Текст блока",
        "spacing": {
          "desktop": { "padding-top": 20, "padding-bottom": 20 }
        }
      }
    }
  ]
}`}
                language="http"
                className="text-xs"
              />
            </div>

            <div className="mb-3">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Успешный ответ:</h4>
              <CodeBlock
                code={`HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "message": "Блоки успешно сохранены"
}`}
                language="http"
                className="text-xs"
              />
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 border-l-4 border-yellow-400">
              <p className="text-xs text-gray-700 dark:text-gray-300">
                <strong>Важно:</strong> Блоки передаются как массив объектов. Вы можете сохранять их как JSON строку в базе данных 
                или как отдельные записи для каждого блока. Рекомендуется хранить весь массив блоков как единую JSON строку для конкретной страницы/контекста.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">2. Загрузка блоков</h3>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4 border border-gray-200 dark:border-slate-700">
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <code className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-sm font-semibold">GET</code>
                <code className="text-gray-700 dark:text-gray-300 font-mono text-sm">/api/blocks/load</code>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Эндпоинт для получения сохраненных блоков. Возвращает массив блоков в формате JSON.
              </p>
            </div>
            
            <div className="mb-3">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Запрос:</h4>
              <CodeBlock
                code={`GET /api/blocks/load
Content-Type: application/json`}
                language="http"
                className="text-xs"
              />
            </div>

            <div className="mb-3">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Успешный ответ:</h4>
              <CodeBlock
                code={`HTTP/1.1 200 OK
Content-Type: application/json

{
  "blocks": [
    {
      "id": "block-1",
      "type": "text",
      "props": {
        "content": "Текст блока",
        "spacing": {
          "desktop": { "padding-top": 20, "padding-bottom": 20 }
        }
      }
    }
  ]
}`}
                language="http"
                className="text-xs"
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border-l-4 border-blue-400">
              <p className="text-xs text-gray-700 dark:text-gray-300">
                <strong>Примечание:</strong> Если блоков нет, верните пустой массив <code className="text-blue-700 dark:text-blue-400">[]</code>. 
                Это позволит BlockBuilder корректно инициализироваться с пустым состоянием.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">3. Загрузка изображений</h3>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4 border border-gray-200 dark:border-slate-700">
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <code className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-sm font-semibold">POST</code>
                <code className="text-gray-700 dark:text-gray-300 font-mono text-sm">/api/upload</code>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Эндпоинт для загрузки статических файлов (изображений). Принимает файл через FormData и возвращает URL загруженного файла.
              </p>
            </div>
            
            <div className="mb-3">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Запрос:</h4>
              <CodeBlock
                code={`POST /api/upload
Content-Type: multipart/form-data

FormData:
  file: [изображение]
  (опционально) Authorization: Bearer token`}
                language="http"
                className="text-xs"
              />
            </div>

            <div className="mb-3">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Успешный ответ:</h4>
              <CodeBlock
                code={`HTTP/1.1 200 OK
Content-Type: application/json

{
  "url": "https://example.com/uploads/image.jpg",
  "width": 1920,
  "height": 1080,
  "size": 245678
}`}
                language="http"
                className="text-xs"
              />
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 border-l-4 border-yellow-400 mb-3">
              <p className="text-xs text-gray-700 dark:text-gray-300">
                <strong>Важно:</strong> Ответ сервера <strong>ОБЯЗАТЕЛЬНО</strong> должен содержать поле <code className="text-yellow-700 dark:text-yellow-400">url</code> 
                (или <code className="text-yellow-700 dark:text-yellow-400">src</code>) с URL загруженного файла. Если формат ответа отличается, используйте 
                <code className="text-yellow-700 dark:text-yellow-400">responseMapper</code> в конфигурации поля image для преобразования ответа.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border-l-4 border-green-400">
              <p className="text-xs text-gray-700 dark:text-gray-300">
                <strong>Рекомендация:</strong> Загружайте файлы на статический сервер (CDN, S3, или вашу файловую систему) и возвращайте полный URL. 
                Это позволяет хранить в блоке только ссылку на файл, а не сами данные изображения.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Дополнительные рекомендации</h3>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2 mt-1">•</span>
                <span>
                  <strong>Валидация данных:</strong> Проверяйте структуру блоков на бэкенде перед сохранением. 
                  Убедитесь, что все обязательные поля присутствуют и имеют корректный формат.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2 mt-1">•</span>
                <span>
                  <strong>Обработка ошибок:</strong> Возвращайте понятные сообщения об ошибках с соответствующими HTTP статусами 
                  (400 для ошибок валидации, 500 для серверных ошибок).
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2 mt-1">•</span>
                <span>
                  <strong>Аутентификация:</strong> При необходимости добавьте проверку авторизации для защиты эндпоинтов. 
                  Можно использовать заголовки Authorization или токены в запросах.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2 mt-1">•</span>
                <span>
                  <strong>Ограничения размера файлов:</strong> Для эндпоинта загрузки изображений установите разумные ограничения 
                  на размер файла (например, 5-10MB) и проверяйте тип файла.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2 mt-1">•</span>
                <span>
                  <strong>Хранение данных:</strong> Блоки можно хранить как единую JSON строку для конкретной страницы/контекста, 
                  или как отдельные записи в базе данных. Выберите подход, который лучше подходит для вашей архитектуры.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border-l-4 border-indigo-400">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">Пример обработки ошибок</h4>
          <CodeBlock
            code={`// Ошибка валидации
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "success": false,
  "error": "Неверный формат данных блоков",
  "details": "Поле 'type' обязательно для каждого блока"
}

// Ошибка загрузки файла
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "success": false,
  "error": "Файл слишком большой",
  "maxSize": "5242880"
}

// Серверная ошибка
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "success": false,
  "error": "Внутренняя ошибка сервера"
}`}
            language="http"
            className="text-xs"
          />
        </div>
      </section>
    </div>
  );
}

