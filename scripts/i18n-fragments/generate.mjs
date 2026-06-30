#!/usr/bin/env node
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function countKeys(obj, prefix = '') {
  let count = 0;
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      count += countKeys(value, prefix ? `${prefix}.${key}` : key);
    } else {
      count += 1;
    }
  }
  return count;
}

const ru = {
  components: {
    uploadUrlImportantNote: {
      detailLabel: 'Подробнее — поля image и file',
      text: '<strong>Важно:</strong> при использовании <code>uploadUrl</code> (загрузка через сервер API клиента) ответ сервера <strong>ОБЯЗАТЕЛЬНО</strong> должен быть объектом с полем <code>src</code>, содержащим URL изображения. Если формат ответа отличается, используйте <code>responseMapper</code> для преобразования ответа к виду объекта с вашими полями и обязательным полем <code>src</code>.',
    },
  },
  common: {
    badges: {
      required: 'обязательный',
      optional: 'опциональный',
      defaultTrue: 'опциональный, по умолчанию true',
      selectRadio: 'select, radio',
      selectImageFile: 'select, image, file',
      selectOnly: 'select',
      forSelectRadio: '(для select, radio)',
      forSelectImageFile: '(для select, image, file; опционально)',
      parenRequired: '(обязательный)',
      parenOptional: '(опциональный)',
    },
    important: 'Важно',
    methods: 'Методы',
  },
  core: {},
};

const en = {
  components: {
    uploadUrlImportantNote: {
      detailLabel: 'Learn more — image and file fields',
      text: '<strong>Important:</strong> when using <code>uploadUrl</code> (upload via client API server), the server response <strong>must</strong> be an object with a <code>src</code> field containing the image URL. If the response format differs, use <code>responseMapper</code> to transform the response into an object with your fields and the required <code>src</code> field.',
    },
  },
  common: {
    badges: {
      required: 'required',
      optional: 'optional',
      defaultTrue: 'optional, default true',
      selectRadio: 'select, radio',
      selectImageFile: 'select, image, file',
      selectOnly: 'select',
      forSelectRadio: '(for select, radio)',
      forSelectImageFile: '(for select, image, file; optional)',
      parenRequired: '(required)',
      parenOptional: '(optional)',
    },
    important: 'Important',
    methods: 'Methods',
  },
  core: {},
};

// Types section
function buildTypes(locale) {
  const isRu = locale === 'ru';
  return {
    title: isRu ? 'Типы' : 'Types',
    subtitle: isRu
      ? 'TypeScript типы и интерфейсы для работы с BlockBuilder'
      : 'TypeScript types and interfaces for working with BlockBuilder',
    iblockBuilderOptions: {
      description: isRu ? 'Опции для создания BlockBuilder' : 'Options for creating BlockBuilder',
      code: `interface IBlockBuilderOptions {
  blockConfigs: Record<string, any>
  repository?: any
  componentRegistry?: any
  httpClient?: any
  customFieldRendererRegistry?: any
  // theme?: 'light' | 'dark'   // ${isRu ? 'зарезервировано, пока не используется' : 'reserved, not used yet'}
  // locale?: string
  autoInit?: boolean
  initialBlocks?: IBlockDto[]
}`,
    },
    iblock: {
      description: isRu ? 'Основной интерфейс блока (доменная модель)' : 'Main block interface (domain model)',
      code: `interface IBlock {
  id: TBlockId
  type: string
  settings: Record<string, any>
  props: Record<string, any>
  style?: Record<string, string | number>
  render?: any // ${isRu ? 'Внутренний тип TRenderRef (не экспортируется)' : 'Internal TRenderRef type (not exported)'}
  visible?: boolean
  formConfig?: IFormGenerationConfig
  metadata?: IBlockMetadata
  children?: IBlock[]
  parent?: TBlockId
}`,
    },
    iblockDto: {
      description: isRu ? 'DTO для передачи данных блока (без бизнес-логики)' : 'DTO for transferring block data (no business logic)',
      code: `interface IBlockDto {
  id: string
  type: string
  settings: Record<string, any>
  props: Record<string, any>
  style?: Record<string, string | number>
  render?: any // ${isRu ? 'Внутренний тип TRenderRef (не экспортируется)' : 'Internal TRenderRef type (not exported)'}
  visible?: boolean
  formConfig?: IFormGenerationConfig
  metadata?: IBlockMetadata
  children?: string[] // ${isRu ? 'IDs дочерних блоков' : 'Child block IDs'}
  parent?: string
  order?: number
}`,
    },
    icreateBlockDto: {
      description: isRu ? 'DTO для создания блока (без ID и метаданных)' : 'DTO for creating a block (without ID and metadata)',
      code: `interface ICreateBlockDto {
  type: string
  settings: Record<string, any>
  props: Record<string, any>
  style?: Record<string, string | number>
  render?: any // ${isRu ? 'Внутренний тип TRenderRef (не экспортируется)' : 'Internal TRenderRef type (not exported)'}
  visible?: boolean
  formConfig?: IFormGenerationConfig
  parent?: string
  order?: number
  metadata?: IBlockMetadata
}`,
    },
    iupdateBlockDto: {
      description: isRu ? 'DTO для обновления блока' : 'DTO for updating a block',
      code: `interface IUpdateBlockDto {
  settings?: Partial<Record<string, any>>
  props?: Partial<Record<string, any>>
  style?: Partial<Record<string, string | number>>
  order?: number
  render?: any // ${isRu ? 'Внутренний тип TRenderRef (не экспортируется)' : 'Internal TRenderRef type (not exported)'}
  visible?: boolean
  formConfig?: IFormGenerationConfig
}`,
    },
    iblockMetadata: {
      description: isRu ? 'Метаданные блока' : 'Block metadata',
      code: `interface IBlockMetadata {
  createdAt: Date
  updatedAt: Date
  version: number
  author?: string
}`,
    },
    iformFieldConfig: {
      description: isRu ? 'Конфигурация поля формы' : 'Form field configuration',
      code: `interface IFormFieldConfig {
  field: string
  label: string
  type: TFieldType
  placeholder?: string
  defaultValue?: any
  options?: { value: string; label: string }[]
  rules?: IValidationRule[]
  spacingConfig?: any // ${isRu ? 'Внутренний тип (не экспортируется)' : 'Internal type (not exported)'}
  repeaterConfig?: any // ${isRu ? 'Внутренний тип (не экспортируется)' : 'Internal type (not exported)'}
  apiSelectConfig?: IApiSelectConfig
  customFieldConfig?: any // ${isRu ? 'Внутренний тип (не экспортируется)' : 'Internal type (not exported)'}
  fileUploadConfig?: any // ${isRu ? 'Внутренний тип IFileUploadConfig (не экспортируется)' : 'Internal IFileUploadConfig type (not exported)'}
  blockAnchorConfig?: IBlockAnchorConfig // type: 'block-anchor'
  matrixTableConfig?: IMatrixTableFieldConfig // type: 'matrix-table'
  optionsFrom?: IOptionsFromConfig // ${isRu ? 'select — динамические options' : 'select — dynamic options'}
  fileImportConfig?: IFileImportConfig // type: 'file-import'
  persist?: boolean // ${isRu ? 'false — не сохранять в block.props' : 'false — do not save to block.props'}
  multiple?: boolean // ${isRu ? 'image, file; select с multiple: true' : 'image, file; select with multiple: true'}
  dependsOn?: IDependsOnConfig // ${isRu ? 'Условное отображение полей' : 'Conditional field visibility'}
}`,
    },
    irepeaterFieldConfig: {
      description: isRu
        ? 'Конфигурация для поля типа <code>repeater</code>. Свойство <code>countLabelVariants</code> позволяет локализовать счётчик элементов. Свойство <code>maxNestingDepth</code> ограничивает максимальную глубину вложенности репитеров.'
        : 'Configuration for a <code>repeater</code> field. The <code>countLabelVariants</code> property localizes the item counter. The <code>maxNestingDepth</code> property limits maximum repeater nesting depth.',
      code: `interface IRepeaterFieldConfig {
  itemTitle?: string
  addButtonText?: string
  removeButtonText?: string
  min?: number
  max?: number
  fields: IFormFieldConfig[]
  countLabelVariants?: { one: string; few: string; many: string; zero?: string }
  maxNestingDepth?: number  // ${isRu ? 'Максимальная глубина вложенности (по умолчанию 2)' : 'Maximum nesting depth (default 2)'}
}`,
      note: isRu
        ? 'По умолчанию UI показывает только число. Если указать <code>countLabelVariants</code>, будет показано «число + слово». Свойство <code>maxNestingDepth</code> ограничивает максимальную глубину вложенности репитеров (по умолчанию 2).'
        : 'By default the UI shows only the number. If <code>countLabelVariants</code> is set, it shows "number + word". The <code>maxNestingDepth</code> property limits maximum repeater nesting depth (default 2).',
    },
    irepeaterItemFieldConfig: {
      description: isRu
        ? 'Конфигурация поля внутри репитера. Поля типа <code>repeater</code> внутри репитера могут иметь собственную конфигурацию через свойство <code>repeaterConfig</code> для создания вложенных репитеров.'
        : 'Field configuration inside a repeater. Fields of type <code>repeater</code> inside a repeater can have their own configuration via <code>repeaterConfig</code> for nested repeaters.',
      code: `interface IRepeaterItemFieldConfig {
  field: string
  label: string
  type: TFieldType
  placeholder?: string
  defaultValue?: any
  rules?: IValidationRule[]
  repeaterConfig?: IRepeaterFieldConfig  // ${isRu ? 'Для вложенных репитеров' : 'For nested repeaters'}
  dependsOn?: IDependsOnConfig // ${isRu ? 'Условное отображение поля' : 'Conditional field visibility'}
  // ... ${isRu ? 'другие свойства полей' : 'other field properties'}
}`,
      note: isRu
        ? 'Для создания вложенного репитера укажите поле с типом <code>\'repeater\'</code> и добавьте конфигурацию через свойство <code>repeaterConfig</code>.'
        : 'To create a nested repeater, specify a field with type <code>\'repeater\'</code> and add configuration via the <code>repeaterConfig</code> property.',
    },
    iformGenerationConfig: {
      description: isRu ? 'Конфигурация для генерации форм' : 'Configuration for form generation',
      code: `interface IFormGenerationConfig {
  title: string
  description?: string
  fields: IFormFieldConfig[]
  submitButtonText?: string
  cancelButtonText?: string
}`,
    },
    tfieldType: {
      description: isRu ? 'Типы полей форм' : 'Form field types',
      code: `type TFieldType = 
  | 'text' 
  | 'number' 
  | 'email' 
  | 'url' 
  | 'textarea' 
  | 'select' 
  | 'checkbox' 
  | 'color' 
  | 'file' 
  | 'file-import'
  | 'image' 
  | 'block-anchor'
  | 'matrix-table'
  | 'spacing'
  | 'repeater' 
  | 'api-select' 
  | 'custom'`,
    },
    ivalidationRule: {
      description: isRu ? 'Правило валидации поля' : 'Field validation rule',
      code: `interface IValidationRule {
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
  | 'custom'`,
    },
    iapiSelectItem: {
      description: isRu ? 'Элемент списка из API для api-select поля' : 'API list item for api-select field',
      code: `interface IApiSelectItem {
  id: string | number
  name: string
}`,
    },
    iapiSelectResponse: {
      description: isRu ? 'Ответ от API для api-select поля' : 'API response for api-select field',
      code: `interface IApiSelectResponse {
  data: IApiSelectItem[]
  total?: number
  page?: number
  hasMore?: boolean
}`,
    },
    iapiRequestParams: {
      description: isRu ? 'Параметры для HTTP запроса к API' : 'Parameters for HTTP API request',
      code: `interface IApiRequestParams {
  search?: string
  page?: number
  limit?: number
  [key: string]: any
}`,
    },
    thttpMethod: {
      description: isRu ? 'Метод HTTP запроса' : 'HTTP request method',
      code: `type THttpMethod = 'GET' | 'POST'`,
    },
    ifieldValidationConfig: {
      description: isRu ? 'Конфигурация поля с расширенной валидацией' : 'Field configuration with extended validation',
      code: `interface IFieldValidationConfig {
  field: string
  label: string
  type: TFieldType
  placeholder?: string
  options?: Array<{ value: any; label: string }>
  rules: IValidationRule[]
  defaultValue?: any
}`,
    },
    ivalidationResult: {
      description: isRu ? 'Результат валидации' : 'Validation result',
      code: `interface IValidationResult {
  isValid: boolean
  errors: Record<string, string[]>
}`,
    },
    iapiSelectConfig: {
      description: isRu
        ? 'Конфигурация для api-select поля. <code>debounceMs</code> по умолчанию <code>0</code> (запрос сразу при вводе).'
        : 'Configuration for api-select field. <code>debounceMs</code> defaults to <code>0</code> (request immediately on input).',
      code: `interface IApiSelectConfig {
  url: string
  method?: 'GET' | 'POST'
  headers?: Record<string, string>
  searchParam?: string
  pageParam?: string
  limitParam?: string
  limit?: number
  debounceMs?: number  // ${isRu ? 'по умолчанию: 0' : 'default: 0'}
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
}`,
    },
    iblockAnchorConfig: {
      description: isRu
        ? 'Конфигурация для поля <code>block-anchor</code>. Форма сохраняет <code>#block-id</code> или URL в props; скролл к якорю и обработка клика — в компонентах блоков пользователя.'
        : 'Configuration for <code>block-anchor</code> field. The form saves <code>#block-id</code> or URL in props; anchor scroll and click handling are in user block components.',
      code: `interface IBlockAnchorConfig {
  placeholder?: string
  allowCustomUrl?: boolean      // ${isRu ? 'поле «или введите URL» (по умолчанию: false)' : '"or enter URL" field (default: false)'}
  excludeEditingBlock?: boolean // ${isRu ? 'исключить редактируемый блок из списка (по умолчанию: true)' : 'exclude editing block from list (default: true)'}
  onlyVisibleBlocks?: boolean    // ${isRu ? 'только видимые блоки на странице (по умолчанию: true)' : 'only visible blocks on page (default: true)'}
}`,
    },
    idependsOnConfig: {
      description: isRu
        ? 'Конфигурация условного отображения поля на основе значения другого поля'
        : 'Conditional field visibility configuration based on another field value',
      code: `interface IDependsOnConfig {
  field: string                    // ${isRu ? 'Имя поля, от которого зависит видимость' : 'Field name that controls visibility'}
  value: boolean | string | number // ${isRu ? 'Ожидаемое значение зависимого поля' : 'Expected value of dependent field'}
  operator?: 'equals' | 'notEquals' | 'in' | 'notIn' // ${isRu ? 'Оператор сравнения (по умолчанию \'equals\')' : 'Comparison operator (default \'equals\')'}
}`,
      operatorsTitle: isRu ? 'Операторы:' : 'Operators:',
      operators: {
        equals: isRu
          ? '<code>equals</code> (по умолчанию) - поле видимо, если значение равно <code>value</code>'
          : '<code>equals</code> (default) — field is visible when value equals <code>value</code>',
        notEquals: isRu
          ? '<code>notEquals</code> - поле видимо, если значение не равно <code>value</code>'
          : '<code>notEquals</code> — field is visible when value does not equal <code>value</code>',
        in: isRu
          ? '<code>in</code> - поле видимо, если значение содержится в массиве <code>value</code>'
          : '<code>in</code> — field is visible when value is in array <code>value</code>',
        notIn: isRu
          ? '<code>notIn</code> - поле видимо, если значение не содержится в массиве <code>value</code>'
          : '<code>notIn</code> — field is visible when value is not in array <code>value</code>',
      },
    },
    icustomFieldFormScope: {
      description: isRu
        ? 'Контекст формы в <code>ICustomFieldContext.formScope</code> и в <code>fileImportConfig.onImport</code>.'
        : 'Form context in <code>ICustomFieldContext.formScope</code> and in <code>fileImportConfig.onImport</code>.',
      code: `interface ICustomFieldFormScope {
  formData: Record<string, any>
  setField: (name: string, value: any) => void
  repeater?: ICustomFieldRepeaterScope
}

interface ICustomFieldRepeaterScope {
  itemIndex: number
  updateItemField: (fieldName: string, value: any) => void
}`,
    },
    ioptionsFromConfig: {
      code: `interface IOptionsFromConfig {
  source: string
  when?: (formData: Record<string, any>) => boolean
  map: (item: any, formData: Record<string, any>) => ISelectOption | IOptionsFromGroup
}

interface IOptionsFromGroup {
  label: string
  options: ISelectOption[]
}`,
    },
    ifileImportConfig: {
      code: `interface IFileImportMergeRule {
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
}`,
    },
    iblockFormHooks: {
      description: isRu
        ? 'Lifecycle-хуки модалки create/edit блока. Указываются в конфиге типа блока (<code>availableBlockTypes[]</code>).'
        : 'Create/edit block modal lifecycle hooks. Specified in block type config (<code>availableBlockTypes[]</code>).',
      code: `interface IBlockFormOpenContext {
  mode: 'create' | 'edit'
  blockId?: TBlockId
  props: Record<string, unknown>       // ${isRu ? 'block.props при edit; {} при create' : 'block.props on edit; {} on create'}
  formData: Record<string, unknown>    // ${isRu ? 'текущее состояние модалки' : 'current modal state'}
  setField: (name: string, value: unknown) => void
}

interface IBlockFormSaveContext {
  mode: 'create' | 'edit'
  blockId?: TBlockId
  formData: Record<string, unknown>    // ${isRu ? 'уже прошёл validateForm' : 'already passed validateForm'}
}

interface IBlockFormSaveResult {
  props: Record<string, unknown>       // ${isRu ? 'финальные props для block.props' : 'final props for block.props'}
  cancel?: boolean                       // ${isRu ? 'true — не сохранять, модалка открыта' : 'true — do not save, modal stays open'}
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
}`,
    },
    tblockId: {
      description: isRu ? 'Тип ID блока' : 'Block ID type',
      code: `type TBlockId = string`,
    },
  };
}

import { buildFormFields } from './build-form-fields.mjs';

ru.core.types = buildTypes('ru');
en.core.types = buildTypes('en');
ru.core.formFields = buildFormFields('ru');
en.core.formFields = buildFormFields('en');

writeFileSync(join(__dirname, 'ru-additions.json'), JSON.stringify(ru, null, 2));
writeFileSync(join(__dirname, 'en-additions.json'), JSON.stringify(en, null, 2));

const ruCount = countKeys(ru);
const enCount = countKeys(en);

console.log('Written ru-additions.json and en-additions.json');
console.log('Total leaf keys RU:', ruCount, 'EN:', enCount);
console.log('Breakdown:');
for (const section of ['components', 'common', 'core']) {
  console.log(`  ${section}: RU=${countKeys(ru[section])} EN=${countKeys(en[section])}`);
}
for (const section of ['types', 'formFields']) {
  console.log(`  core.${section}: RU=${countKeys(ru.core[section])} EN=${countKeys(en.core[section])}`);
}
