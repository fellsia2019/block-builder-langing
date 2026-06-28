'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import CodeBlock from '@/components/CodeBlock';
import Icon from '@/components/Icon';
import DocHeading from '../../components/DocHeading';
import DocImportantNote from '../../components/DocImportantNote';
import DocAnchor from '../../components/DocAnchor';
import { docRichTags } from '../../components/docRichTags';
import type { NavigationProps } from '../../types';

export default function UtilitiesSection(_props: NavigationProps) {
  const t = useTranslations('docsPages.core.utilities');

  const scrollLockExampleCode = useMemo(
    () => `import { setScrollLockHandlers, lockBodyScroll, unlockBodyScroll } from '@mushket-co/block-builder/core';

setScrollLockHandlers({
  lock: () => document.body.classList.add('bb-scroll-locked'),
  unlock: () => document.body.classList.remove('bb-scroll-locked'),
});

${t('scrollLock.modalComment')}
lockBodyScroll();
${t('scrollLock.modalOpenComment')}
unlockBodyScroll();`,
    [t],
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
      </div>

      <section className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border-l-4 border-emerald-500">
        <DocHeading id="scroll-lock" level={2} className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="lock" size={22} className="text-emerald-600 dark:text-emerald-400" />
          {t('scrollLock.title')}
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-3">{t.rich('scrollLock.description', docRichTags)}</p>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{t('signatures')}</h3>
          <CodeBlock
            code={`function setScrollLockHandlers(handlers: { lock?: () => void; unlock?: () => void }): void
function lockBodyScroll(): void
function unlockBodyScroll(): void`}
            language="typescript"
            className="mb-2"
          />
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>{t.rich('scrollLock.setScrollLockHandlers', docRichTags)}</li>
            <li>{t.rich('scrollLock.lockBodyScroll', docRichTags)}</li>
          </ul>
        </div>
        <CodeBlock code={scrollLockExampleCode} language="javascript" className="mb-3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-emerald-100 dark:bg-emerald-900/20 rounded-lg p-3 border border-emerald-200 dark:border-emerald-800">
            <h4 className="font-semibold text-emerald-900 dark:text-emerald-300 mb-1 text-sm">{t('scrollLock.tipsTitle')}</h4>
            <ul className="list-disc list-inside text-xs text-gray-700 dark:text-gray-300 space-y-1">
              <li>{t('scrollLock.tip1')}</li>
              <li>{t('scrollLock.tip2')}</li>
            </ul>
          </div>
          <DocImportantNote className="">
            {t.rich('scrollLock.importantNote', docRichTags)}{' '}
            <DocAnchor id="scroll-lock">{t('scrollLock.importantAnchor')}</DocAnchor>
          </DocImportantNote>
        </div>
      </section>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <DocHeading id="block-hierarchy-utils" level={2} className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="layers" size={22} className="text-blue-600 dark:text-blue-400" />
          {t('blockHierarchy.title')}
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-3">{t.rich('blockHierarchy.description', docRichTags)}</p>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{t('signatures')}</h3>
          <CodeBlock
            code={`function buildBlockHierarchy(blocks: IBlockDto[]): Array<IBlockDto & { children: IBlockDto[] }>
function cloneBlock<T extends object>(block: T): T
function getAllChildren(blocks: IBlockDto[], parentId: string): IBlockDto[]
function isChildOf(blocks: IBlockDto[], childId: string, parentId: string): boolean`}
            language="typescript"
            className="mb-2"
          />
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>{t.rich('blockHierarchy.buildBlockHierarchy', docRichTags)}</li>
            <li>{t.rich('blockHierarchy.cloneBlock', docRichTags)}</li>
            <li>{t.rich('blockHierarchy.getAllChildren', docRichTags)}</li>
            <li>{t.rich('blockHierarchy.isChildOf', docRichTags)}</li>
          </ul>
        </div>
        <CodeBlock
          code={`import { buildBlockHierarchy, cloneBlock, getAllChildren, isChildOf } from '@mushket-co/block-builder/core';

const hierarchy = buildBlockHierarchy(blocks);
const copy = cloneBlock(block);
const children = getAllChildren(blocks, parentId);
const inside = isChildOf(blocks, childId, parentId);`}
          language="javascript"
          className="mb-3"
        />
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border-l-4 border-blue-400">
          <p className="text-xs text-gray-700 dark:text-gray-300">{t.rich('blockHierarchy.normalizeNote', docRichTags)}</p>
        </div>
      </section>

      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
        <DocHeading id="spacing-utils" level={2} className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="settings" size={22} className="text-indigo-600 dark:text-indigo-400" />
          {t('spacing.title')}
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-3">{t.rich('spacing.description', docRichTags)}</p>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{t('signatures')}</h3>
          <CodeBlock
            code={`const DEFAULT_BREAKPOINTS: Array<{ name: string; label: string; maxWidth?: number }>
function generateSpacingCSS(spacing: any, prefix?: string): string
function generateSpacingCSSVariables(spacing: any, prefix?: string): Record<string, string>
function getSpacingValue(spacing: any, breakpoint: string, type: 'padding-top' | 'padding-bottom' | 'margin-top' | 'margin-bottom'): number | undefined
function setSpacingValue(spacing: any, breakpoint: string, type: 'padding-top' | 'padding-bottom' | 'margin-top' | 'margin-bottom', value: number): any
function mergeSpacing(base: any, patch: any): any
function validateSpacing(spacing: any): { valid: boolean; errors: string[] }`}
            language="typescript"
            className="mb-2"
          />
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>{t.rich('spacing.generateSpacingCSSVariables', docRichTags)}</li>
            <li>{t.rich('spacing.generateSpacingCSS', docRichTags)}</li>
            <li>{t.rich('spacing.mergeSpacing', docRichTags)}</li>
            <li>{t.rich('spacing.validateSpacing', docRichTags)}</li>
          </ul>
        </div>
        <CodeBlock
          code={`import { DEFAULT_BREAKPOINTS, generateSpacingCSSVariables, mergeSpacing } from '@mushket-co/block-builder/core';

const cssVars = generateSpacingCSSVariables(spacing);
const merged = mergeSpacing(baseSpacing, patch);`}
          language="javascript"
          className="mb-3"
        />
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 border-l-4 border-indigo-400">
          <p className="text-xs text-gray-700 dark:text-gray-300">{t('spacing.uiNote')}</p>
        </div>
      </section>

      <section className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border-l-4 border-amber-500">
        <DocHeading id="filter-blocks" level={2} className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="target" size={22} className="text-amber-600 dark:text-amber-400" />
          {t('filterBlocks.title')}
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-3">{t.rich('filterBlocks.description', docRichTags)}</p>
        <CodeBlock
          code={`import { filterBlocksForDisplay } from '@mushket-co/block-builder/core'

const visibleBlocks = filterBlocksForDisplay(blocks, isEdit)`}
          language="javascript"
        />
      </section>

      <section className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-6 border-l-4 border-rose-500">
        <DocHeading id="unsaved-changes" level={2} className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="warning" size={22} className="text-rose-600 dark:text-rose-400" />
          {t('unsavedChanges.title')}
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-3">{t.rich('unsavedChanges.description', docRichTags)}</p>
        <CodeBlock
          code={`import {
  haveBlocksChanged,
  attachPageLeaveWarning,
  createUnsavedChangesTracker,
  shouldActivatePageLeaveWarning,
} from '@mushket-co/block-builder/core'

// Vue: usePageLeaveWarning
// React: usePageLeaveWarning`}
          language="typescript"
        />
      </section>

      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border-l-4 border-teal-500">
        <DocHeading id="reactive-form-validation" level={2} className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="shield" size={22} className="text-teal-600 dark:text-teal-400" />
          {t('reactiveValidation.title')}
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-3">{t.rich('reactiveValidation.description', docRichTags)}</p>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{t('signatures')}</h3>
          <CodeBlock
            code={`class ReactiveFormValidationTracker {
  reset(): void
  touch(): void
  get isTouched(): boolean
  revalidateIfTouched(
    formData: IFormData,
    formFields: IFormFieldConfig[],
    isFieldVisible?: (field, itemData?) => boolean
  ): Record<string, string[]> | null
}

function applyFormErrors(
  target: Record<string, string[]>,
  errors: Record<string, string[]>
): void`}
            language="typescript"
            className="mb-2"
          />
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>{t.rich('reactiveValidation.touch', docRichTags)}</li>
            <li>{t.rich('reactiveValidation.revalidateIfTouched', docRichTags)}</li>
            <li>{t.rich('reactiveValidation.applyFormErrors', docRichTags)}</li>
          </ul>
        </div>
        <CodeBlock
          code={`import {
  applyFormErrors,
  ReactiveFormValidationTracker,
  UniversalValidator,
} from '@mushket-co/block-builder/core'

const tracker = new ReactiveFormValidationTracker()
const formErrors: Record<string, string[]> = {}

function onSubmit(formData, formFields) {
  const { isValid, errors } = UniversalValidator.validateForm(formData, formFields)
  if (!isValid) {
    tracker.touch()
    applyFormErrors(formErrors, errors)
    return
  }
  tracker.reset()
}

function onFieldChange(formData, formFields) {
  const nextErrors = tracker.revalidateIfTouched(formData, formFields)
  if (nextErrors) applyFormErrors(formErrors, nextErrors)
}`}
          language="typescript"
        />
      </section>

      <section className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border-l-4 border-purple-500">
        <DocHeading id="universal-validator" level={2} className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="shield" size={22} className="text-purple-600 dark:text-purple-400" />
          {t('universalValidator.title')}
        </DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-3">{t.rich('universalValidator.description', docRichTags)}</p>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{t('signatures')}</h3>
          <CodeBlock
            code={`class UniversalValidator {
  constructor(rules: IValidationRule[])
  validate(values: Record<string, any>): { isValid: boolean; errors: Record<string, string[]> }
}`}
            language="typescript"
            className="mb-2"
          />
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>{t.rich('universalValidator.rules', docRichTags)}</li>
            <li>{t.rich('universalValidator.message', docRichTags)}</li>
          </ul>
        </div>
        <CodeBlock
          code={`import { UniversalValidator } from '@mushket-co/block-builder/core';

const validator = new UniversalValidator(rules);
const { isValid, errors } = validator.validate(values);`}
          language="javascript"
          className="mb-3"
        />
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border-l-4 border-purple-500">
          <p className="text-xs text-gray-700 dark:text-gray-300">{t.rich('universalValidator.customNote', docRichTags)}</p>
        </div>
      </section>
    </div>
  );
}
