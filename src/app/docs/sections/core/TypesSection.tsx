'use client';

import CodeBlock from '@/components/CodeBlock';
import type { NavigationProps } from '../../types';

export default function TypesSection({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Типы</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          TypeScript типы и интерфейсы для работы с BlockBuilder
        </p>
      </div>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IBlockBuilderOptions</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Опции для создания BlockBuilder</p>
        <CodeBlock
          code={`interface IBlockBuilderOptions {
  containerId?: string
  blockConfigs: Record<string, any>
  repository?: any // Внутренний тип IBlockRepository (не экспортируется)
  componentRegistry?: any // Внутренний тип IComponentRegistry (не экспортируется)
  httpClient?: any // Внутренний тип IHttpClient (не экспортируется)
  customFieldRendererRegistry?: any // Внутренний тип ICustomFieldRendererRegistry (не экспортируется)
  theme?: 'light' | 'dark'
  locale?: string
  autoInit?: boolean
  onSave?: (blocks: IBlockDto[]) => Promise<boolean> | boolean
  initialBlocks?: IBlockDto[]
  controlsContainerClass?: string
  controlsFixedPosition?: 'top' | 'bottom'
  controlsOffset?: number
  controlsOffsetVar?: string
  warnOnPageLeave?: boolean
  isEdit?: boolean
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IBlock</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Основной интерфейс блока (доменная модель)</p>
        <CodeBlock
          code={`interface IBlock {
  id: TBlockId
  type: string
  settings: Record<string, any>
  props: Record<string, any>
  style?: Record<string, string | number>
  render?: any // Внутренний тип TRenderRef (не экспортируется)
  visible?: boolean
  formConfig?: IFormGenerationConfig
  metadata?: IBlockMetadata
  children?: IBlock[]
  parent?: TBlockId
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IBlockDto</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">DTO для передачи данных блока (без бизнес-логики)</p>
        <CodeBlock
          code={`interface IBlockDto {
  id: string
  type: string
  settings: Record<string, any>
  props: Record<string, any>
  style?: Record<string, string | number>
  render?: any // Внутренний тип TRenderRef (не экспортируется)
  visible?: boolean
  formConfig?: IFormGenerationConfig
  metadata?: IBlockMetadata
  children?: string[] // IDs дочерних блоков
  parent?: string
  order?: number
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">ICreateBlockDto</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">DTO для создания блока (без ID и метаданных)</p>
        <CodeBlock
          code={`interface ICreateBlockDto {
  type: string
  settings: Record<string, any>
  props: Record<string, any>
  style?: Record<string, string | number>
  render?: any // Внутренний тип TRenderRef (не экспортируется)
  visible?: boolean
  formConfig?: IFormGenerationConfig
  parent?: string
  order?: number
  metadata?: IBlockMetadata
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IUpdateBlockDto</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">DTO для обновления блока</p>
        <CodeBlock
          code={`interface IUpdateBlockDto {
  settings?: Partial<Record<string, any>>
  props?: Partial<Record<string, any>>
  style?: Partial<Record<string, string | number>>
  order?: number
  render?: any // Внутренний тип TRenderRef (не экспортируется)
  visible?: boolean
  formConfig?: IFormGenerationConfig
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IBlockMetadata</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Метаданные блока</p>
        <CodeBlock
          code={`interface IBlockMetadata {
  createdAt: Date
  updatedAt: Date
  version: number
  author?: string
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IFormFieldConfig</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Конфигурация поля формы</p>
        <CodeBlock
          code={`interface IFormFieldConfig {
  field: string
  label: string
  type: TFieldType
  placeholder?: string
  defaultValue?: any
  options?: { value: string; label: string }[]
  rules?: IValidationRule[]
  spacingConfig?: any // Внутренний тип (не экспортируется)
  repeaterConfig?: any // Внутренний тип (не экспортируется)
  apiSelectConfig?: IApiSelectConfig
  customFieldConfig?: any // Внутренний тип (не экспортируется)
  fileUploadConfig?: any // Внутренний тип IFileUploadConfig (не экспортируется)
  blockAnchorConfig?: IBlockAnchorConfig // type: 'block-anchor' (1.5.0+)
  matrixTableConfig?: IMatrixTableFieldConfig // type: 'matrix-table' (1.6.0+, Vue/React UI)
  optionsFrom?: IOptionsFromConfig // select — динамические options (1.8.0+, Vue/React)
  fileImportConfig?: IFileImportConfig // type: 'file-import' (1.8.0+, Vue/React)
  persist?: boolean // false — не сохранять в block.props (1.8.0+, Vue/React; file-import — implicit false)
  multiple?: boolean // image, file; select с multiple: true — 1.5.5+
  dependsOn?: IDependsOnConfig // Условное отображение (Vue/React UI, v1.1.0+; не Pure JS)
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IRepeaterFieldConfig</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Конфигурация для поля типа <code className="text-teal-700 dark:text-teal-400">repeater</code>. Свойство <code className="text-teal-700 dark:text-teal-400">countLabelVariants</code> позволяет локализовать счётчик элементов.
          Свойство <code className="text-teal-700 dark:text-teal-400">maxNestingDepth</code> ограничивает максимальную глубину вложенности репитеров.
        </p>
        <CodeBlock
          code={`interface IRepeaterFieldConfig {
  itemTitle?: string
  addButtonText?: string
  removeButtonText?: string
  min?: number
  max?: number
  fields: IFormFieldConfig[]
  countLabelVariants?: { one: string; few: string; many: string; zero?: string }
  maxNestingDepth?: number  // Максимальная глубина вложенности (по умолчанию 2)
}`}
          language="typescript"
          className="mb-2"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          По умолчанию UI показывает только число. Если указать <code className="text-teal-700 dark:text-teal-400">countLabelVariants</code>, будет показано «число + слово».
          Свойство <code className="text-teal-700 dark:text-teal-400">maxNestingDepth</code> ограничивает максимальную глубину вложенности репитеров (по умолчанию 2).
        </p>
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IRepeaterItemFieldConfig</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Конфигурация поля внутри репитера. Поля типа <code className="text-teal-700 dark:text-teal-400">repeater</code> 
          внутри репитера могут иметь собственную конфигурацию через свойство <code className="text-teal-700 dark:text-teal-400">repeaterConfig</code> для создания вложенных репитеров.
        </p>
        <CodeBlock
          code={`interface IRepeaterItemFieldConfig {
  field: string
  label: string
  type: TFieldType
  placeholder?: string
  defaultValue?: any
  rules?: IValidationRule[]
  repeaterConfig?: IRepeaterFieldConfig  // Для вложенных репитеров
  dependsOn?: IDependsOnConfig // Условное отображение поля (только для Vue) (v1.1.0+)
  // ... другие свойства полей
}`}
          language="typescript"
          className="mb-2"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Для создания вложенного репитера укажите поле с типом <code className="text-teal-700 dark:text-teal-400">'repeater'</code> 
          и добавьте конфигурацию через свойство <code className="text-teal-700 dark:text-teal-400">repeaterConfig</code>.
        </p>
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IFormGenerationConfig</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Конфигурация для генерации форм</p>
        <CodeBlock
          code={`interface IFormGenerationConfig {
  title: string
  description?: string
  fields: IFormFieldConfig[]
  submitButtonText?: string
  cancelButtonText?: string
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">TFieldType</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Типы полей форм</p>
        <CodeBlock
          code={`type TFieldType = 
  | 'text' 
  | 'number' 
  | 'email' 
  | 'url' 
  | 'textarea' 
  | 'select' 
  | 'checkbox' 
  | 'color' 
  | 'file' 
  | 'file-import'  // 1.8.0+, Vue/React
  | 'image' 
  | 'block-anchor'
  | 'matrix-table' // 1.6.0+, Vue/React
  | 'spacing'
  | 'repeater' 
  | 'api-select' 
  | 'custom'`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IValidationRule</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Правило валидации поля</p>
        <CodeBlock
          code={`interface IValidationRule {
  type: TValidationRuleType
  field: string
  value?: any
  message?: string
  validator?: (value: any) => boolean
}

type TValidationRuleType = 
  | 'required' 
  | 'email' 
  | 'url' 
  | 'min' 
  | 'max' 
  | 'minLength' 
  | 'maxLength' 
  | 'pattern' 
  | 'custom'`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IApiSelectItem</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Элемент списка из API для api-select поля</p>
        <CodeBlock
          code={`interface IApiSelectItem {
  id: string | number
  name: string
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IApiSelectResponse</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Ответ от API для api-select поля</p>
        <CodeBlock
          code={`interface IApiSelectResponse {
  data: IApiSelectItem[]
  total?: number
  page?: number
  hasMore?: boolean
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IApiRequestParams</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Параметры для HTTP запроса к API</p>
        <CodeBlock
          code={`interface IApiRequestParams {
  search?: string
  page?: number
  limit?: number
  [key: string]: any
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">THttpMethod</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Метод HTTP запроса</p>
        <CodeBlock
          code={`type THttpMethod = 'GET' | 'POST'`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IFieldValidationConfig</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Конфигурация поля с расширенной валидацией</p>
        <CodeBlock
          code={`interface IFieldValidationConfig {
  field: string
  label: string
  type: TFieldType
  placeholder?: string
  options?: Array<{ value: any; label: string }>
  rules: IValidationRule[]
  defaultValue?: any
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IValidationResult</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Результат валидации</p>
        <CodeBlock
          code={`interface IValidationResult {
  isValid: boolean
  errors: Record<string, string[]>
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IApiSelectConfig</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Конфигурация для api-select поля. <code>debounceMs</code> по умолчанию <code>0</code> (запрос сразу при вводе).
        </p>
        <CodeBlock
          code={`interface IApiSelectConfig {
  url: string
  method?: 'GET' | 'POST'
  headers?: Record<string, string>
  searchParam?: string
  pageParam?: string
  limitParam?: string
  limit?: number
  debounceMs?: number  // default: 0
  multiple?: boolean
  responseMapper?: (response: any) => IApiSelectResponse
  dataPath?: string
  idField?: string
  nameField?: string
  minSearchLength?: number
  placeholder?: string
  noResultsText?: string
  loadingText?: string
  errorText?: string
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IBlockAnchorConfig</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Конфигурация для поля <code>block-anchor</code> (1.5.0+). Форма сохраняет <code>#block-id</code> или URL в props;
          скролл к якорю и обработка клика — в компонентах блоков пользователя.
        </p>
        <CodeBlock
          code={`interface IBlockAnchorConfig {
  placeholder?: string
  allowCustomUrl?: boolean      // поле «или введите URL» (default: false)
  excludeEditingBlock?: boolean // исключить редактируемый блок из списка (default: true)
  onlyVisibleBlocks?: boolean    // только видимые блоки на странице (default: true)
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IDependsOnConfig</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Конфигурация условного отображения поля на основе значения другого поля (Vue 3 и React UI, v1.1.0+; не Pure JS)
        </p>
        <CodeBlock
          code={`interface IDependsOnConfig {
  field: string                    // Имя поля, от которого зависит видимость
  value: boolean | string | number // Ожидаемое значение зависимого поля
  operator?: 'equals' | 'notEquals' | 'in' | 'notIn' // Оператор сравнения (по умолчанию 'equals')
}`}
          language="typescript"
          className="mb-4"
        />
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-4">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">Операторы:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li><code className="text-blue-700 dark:text-blue-400">equals</code> (по умолчанию) - поле видимо, если значение равно <code className="text-blue-700 dark:text-blue-400">value</code></li>
            <li><code className="text-blue-700 dark:text-blue-400">notEquals</code> - поле видимо, если значение не равно <code className="text-blue-700 dark:text-blue-400">value</code></li>
            <li><code className="text-blue-700 dark:text-blue-400">in</code> - поле видимо, если значение содержится в массиве <code className="text-blue-700 dark:text-blue-400">value</code></li>
            <li><code className="text-blue-700 dark:text-blue-400">notIn</code> - поле видимо, если значение не содержится в массиве <code className="text-blue-700 dark:text-blue-400">value</code></li>
          </ul>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mt-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Важно:</strong> Функциональность <code className="text-yellow-700 dark:text-yellow-400">dependsOn</code> работает в Vue 3 и React UI. 
            Pure JS не скрывает поля по <code>dependsOn</code>.
          </p>
        </div>
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">ICustomFieldFormScope</code>
          <span className="text-base font-normal text-gray-500 dark:text-gray-400 ml-2">(1.8.0+, Vue/React)</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Контекст формы в <code>ICustomFieldContext.formScope</code> и в <code>fileImportConfig.onImport</code>.
        </p>
        <CodeBlock
          code={`interface ICustomFieldFormScope {
  formData: Record<string, any>
  setField: (name: string, value: any) => void
  repeater?: ICustomFieldRepeaterScope
}

interface ICustomFieldRepeaterScope {
  itemIndex: number
  updateItemField: (fieldName: string, value: any) => void
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IOptionsFromConfig</code>
          <span className="text-base font-normal text-gray-500 dark:text-gray-400 ml-2">(1.8.0+, select, Vue/React)</span>
        </h2>
        <CodeBlock
          code={`interface IOptionsFromConfig {
  source: string
  when?: (formData: Record<string, any>) => boolean
  map: (item: any, formData: Record<string, any>) => ISelectOption | IOptionsFromGroup
}

interface IOptionsFromGroup {
  label: string
  options: ISelectOption[]
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IFileImportConfig</code>
          <span className="text-base font-normal text-gray-500 dark:text-gray-400 ml-2">(1.8.0+, Vue/React)</span>
        </h2>
        <CodeBlock
          code={`interface IFileImportMergeRule {
  targetField: string
  sourceKey?: string
  mode?: 'append' | 'replace'
  dedupeBy?: string | string[]
  mapItem?: (item: any, formData: Record<string, any>) => any
}

interface IFileImportConfig {
  uploadUrl: string
  accept?: string | string[]
  formDataKey?: string
  maxSizeMb?: number
  responseMapper?: (response: any) => any
  merge?: IFileImportMergeRule[]
  onImport?: (ctx: {
    data: any
    formScope: ICustomFieldFormScope
    mergeStats?: Array<{ targetField: string; mode: string; added: number; skipped: number; total: number }>
  }) => void
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">IBlockFormHooks</code>
          <span className="text-base font-normal text-gray-500 dark:text-gray-400 ml-2">(1.7.0+, Vue/React)</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Lifecycle-хуки модалки create/edit блока. Указываются в конфиге типа блока (<code>availableBlockTypes[]</code>).
          В Pure JS (<code>BlockUIController</code>) не поддерживаются.
        </p>
        <CodeBlock
          code={`interface IBlockFormOpenContext {
  mode: 'create' | 'edit'
  blockId?: TBlockId
  props: Record<string, unknown>       // block.props при edit; {} при create
  formData: Record<string, unknown>    // текущее состояние модалки
  setField: (name: string, value: unknown) => void
}

interface IBlockFormSaveContext {
  mode: 'create' | 'edit'
  blockId?: TBlockId
  formData: Record<string, unknown>    // уже прошёл validateForm
}

interface IBlockFormSaveResult {
  props: Record<string, unknown>       // финальные props для block.props
  cancel?: boolean                       // true — не сохранять, модалка открыта
}

interface IBlockFormHooks {
  onFormOpen?: (ctx: IBlockFormOpenContext) => Promise<void> | void
  onBeforeSave?: (ctx: IBlockFormSaveContext) => Promise<IBlockFormSaveResult | void> | IBlockFormSaveResult | void
}

interface IBlockTypeConfig {
  type: string
  label: string
  fields?: IFormFieldConfig[]
  formHooks?: IBlockFormHooks
  // ...render, spacingOptions, defaultProps
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">TBlockId</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Тип ID блока</p>
        <CodeBlock
          code={`type TBlockId = string`}
          language="typescript"
          className="mb-4"
        />
      </section>
    </div>
  );
}

