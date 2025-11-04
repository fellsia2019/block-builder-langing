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
  license?: ILicenseConfig
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
  imageUploadConfig?: any // Внутренний тип (не экспортируется)
}`}
          language="typescript"
          className="mb-4"
        />
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
  | 'image' 
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
          <code className="text-teal-700 dark:text-teal-400">ILicenseConfig</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Конфигурация лицензии</p>
        <CodeBlock
          code={`interface ILicenseConfig {
  type?: TLicenseType
  key?: string
  maxBlockTypes?: number
}

enum TLicenseType {
  FREE = 'free',
  PRO = 'pro'
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">ILicenseInfo</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Информация о лицензии</p>
        <CodeBlock
          code={`interface ILicenseInfo {
  isPro: boolean
  maxBlockTypes: number
  currentTypesCount: number
}`}
          language="typescript"
          className="mb-4"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          <code className="text-teal-700 dark:text-teal-400">LicenseFeature</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Типы функций, которые могут быть ограничены лицензией</p>
        <CodeBlock
          code={`enum LicenseFeature {
  CUSTOM_FIELDS = 'customFields',
  API_SELECT = 'apiSelect',
  UNLIMITED_BLOCK_TYPES = 'unlimitedBlockTypes',
  ADVANCED_SPACING = 'advancedSpacing'
}`}
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
        <p className="text-gray-600 dark:text-gray-400 mb-4">Конфигурация для api-select поля (PRO функция)</p>
        <CodeBlock
          code={`interface IApiSelectConfig {
  url: string
  method?: 'GET' | 'POST'
  headers?: Record<string, string>
  searchParam?: string
  pageParam?: string
  limitParam?: string
  limit?: number
  debounceMs?: number
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

