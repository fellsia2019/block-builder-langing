'use client';

import NextPageLink from '../../components/NextPageLink';
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
            <h3 className="font-bold text-purple-900 dark:text-purple-300 mb-2">Storage</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Хранилище для данных блоков</p>
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
  storage: 'localStorage',
  autoRender: true
})`}
          language="javascript"
          className="mb-4"
        />
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
  template: \`
    <div :style="spacingStyles">
      <!-- Используйте CSS переменные для padding -->
      <div style="padding-top: var(--spacing-padding-top);">
        {{ block.props.content }}
      </div>
    </div>
  \`
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

      <NextPageLink nextSection={nextSection} nextTitle={nextTitle} nextHref={nextSection ? `/docs/core/${nextSection}` : null} color="primary" />
    </div>
  );
}

