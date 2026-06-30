/** Default light-theme values — mirror `block-builder/src/shared/styles/_variables.scss` + `uiTheme.ts`. */
export type ThemeToken = {
  var: string;
  default: string;
  usageKey: string;
};

export type ThemeTokenGroup = {
  key: string;
  tokens: ThemeToken[];
};

export const THEME_TOKEN_GROUPS: ThemeTokenGroup[] = [
  {
    key: 'brand',
    tokens: [
      { var: '--bb-color-primary', default: '#2d2079', usageKey: 'colorPrimary' },
      { var: '--bb-color-primary-dark', default: '#120c39', usageKey: 'colorPrimaryDark' },
      { var: '--bb-color-primary-light', default: '#e0f0ff', usageKey: 'colorPrimaryLight' },
      { var: '--bb-color-primary-alpha-10', default: 'rgba(45, 32, 121, 0.1)', usageKey: 'colorPrimaryAlpha10' },
      { var: '--bb-color-primary-alpha-15', default: 'rgba(45, 32, 121, 0.15)', usageKey: 'colorPrimaryAlpha15' },
      { var: '--bb-color-primary-alpha-20', default: 'rgba(45, 32, 121, 0.2)', usageKey: 'colorPrimaryAlpha20' },
      { var: '--bb-color-primary-alpha-30', default: 'rgba(45, 32, 121, 0.3)', usageKey: 'colorPrimaryAlpha30' },
    ],
  },
  {
    key: 'surfaces',
    tokens: [
      { var: '--bb-color-white', default: '#ffffff', usageKey: 'colorWhite' },
      { var: '--bb-color-surface', default: '#ffffff', usageKey: 'colorSurface' },
      { var: '--bb-color-black', default: '#000000', usageKey: 'colorBlack' },
      { var: '--bb-color-neutral-1', default: '#f8f9fa', usageKey: 'colorNeutral1' },
      { var: '--bb-color-neutral-2', default: '#e9ecef', usageKey: 'colorNeutral2' },
      { var: '--bb-color-neutral-3', default: '#dddddd', usageKey: 'colorNeutral3' },
      { var: '--bb-color-neutral-4', default: '#ced4da', usageKey: 'colorNeutral4' },
      { var: '--bb-color-neutral-5', default: '#999999', usageKey: 'colorNeutral5' },
      { var: '--bb-color-neutral-6', default: '#666666', usageKey: 'colorNeutral6' },
      { var: '--bb-color-neutral-7', default: '#495057', usageKey: 'colorNeutral7' },
      { var: '--bb-color-neutral-8', default: '#0e2133', usageKey: 'colorNeutral8' },
      { var: '--bb-color-neutral-8-rgb', default: '44, 62, 80', usageKey: 'colorNeutral8Rgb' },
      { var: '--bb-color-neutral-alpha-30', default: 'rgba(153, 153, 153, 0.3)', usageKey: 'colorNeutralAlpha30' },
      { var: '--bb-color-neutral-alpha-50', default: 'rgba(153, 153, 153, 0.5)', usageKey: 'colorNeutralAlpha50' },
    ],
  },
  {
    key: 'accent',
    tokens: [
      { var: '--bb-color-dark', default: '#111243', usageKey: 'colorDark' },
      { var: '--bb-color-dark-alpha-20', default: 'rgba(17, 18, 67, 0.2)', usageKey: 'colorDarkAlpha20' },
      { var: '--bb-color-secondary', default: '#6c757d', usageKey: 'colorSecondary' },
      { var: '--bb-color-secondary-dark', default: '#5a6268', usageKey: 'colorSecondaryDark' },
    ],
  },
  {
    key: 'status',
    tokens: [
      { var: '--bb-color-danger', default: '#dc3545', usageKey: 'colorDanger' },
      { var: '--bb-color-danger-dark', default: '#c82333', usageKey: 'colorDangerDark' },
      { var: '--bb-color-danger-light', default: '#feeeee', usageKey: 'colorDangerLight' },
      { var: '--bb-color-danger-border', default: '#f5c6cb', usageKey: 'colorDangerBorder' },
      { var: '--bb-color-danger-bg', default: '#fff5f5', usageKey: 'colorDangerBg' },
      { var: '--bb-color-danger-alpha-10', default: 'rgba(220, 53, 69, 0.1)', usageKey: 'colorDangerAlpha10' },
      { var: '--bb-color-success', default: '#28a745', usageKey: 'colorSuccess' },
      { var: '--bb-color-success-dark', default: '#218838', usageKey: 'colorSuccessDark' },
      { var: '--bb-color-success-alpha-30', default: 'rgba(40, 167, 69, 0.3)', usageKey: 'colorSuccessAlpha30' },
      { var: '--bb-color-success-alpha-40', default: 'rgba(16, 185, 129, 0.4)', usageKey: 'colorSuccessAlpha40' },
      { var: '--bb-color-warning', default: '#ffc107', usageKey: 'colorWarning' },
      { var: '--bb-color-warning-border', default: '#ff9800', usageKey: 'colorWarningBorder' },
      { var: '--bb-color-warning-bg', default: '#fff3cd', usageKey: 'colorWarningBg' },
      { var: '--bb-color-warning-text', default: '#856404', usageKey: 'colorWarningText' },
      { var: '--bb-color-info', default: '#17a2b8', usageKey: 'colorInfo' },
    ],
  },
  {
    key: 'overlays',
    tokens: [
      { var: '--bb-color-overlay', default: 'rgba(0, 0, 0, 0.5)', usageKey: 'colorOverlay' },
      { var: '--bb-color-overlay-medium', default: 'rgba(0, 0, 0, 0.7)', usageKey: 'colorOverlayMedium' },
      { var: '--bb-color-overlay-dark', default: 'rgba(0, 0, 0, 0.9)', usageKey: 'colorOverlayDark' },
      { var: '--bb-color-overlay-alpha-10', default: 'rgba(0, 0, 0, 0.1)', usageKey: 'colorOverlayAlpha10' },
    ],
  },
  {
    key: 'utility',
    tokens: [
      { var: '--bb-color-code-1', default: '#282c34', usageKey: 'colorCode1' },
      { var: '--bb-color-code-2', default: '#abb2bf', usageKey: 'colorCode2' },
      { var: '--bb-color-gradient-1', default: '#667eea', usageKey: 'colorGradient1' },
      { var: '--bb-color-gradient-2', default: '#764ba2', usageKey: 'colorGradient2' },
      { var: '--bb-color-gradient-success-1', default: '#10b981', usageKey: 'colorGradientSuccess1' },
      { var: '--bb-color-gradient-success-2', default: '#059669', usageKey: 'colorGradientSuccess2' },
    ],
  },
  {
    key: 'spacing',
    tokens: [
      { var: '--bb-spacing-xs', default: '4px', usageKey: 'spacingXs' },
      { var: '--bb-spacing-sm', default: '8px', usageKey: 'spacingSm' },
      { var: '--bb-spacing-md', default: '12px', usageKey: 'spacingMd' },
      { var: '--bb-spacing-lg', default: '16px', usageKey: 'spacingLg' },
      { var: '--bb-spacing-xl', default: '20px', usageKey: 'spacingXl' },
      { var: '--bb-spacing-2xl', default: '24px', usageKey: 'spacing2xl' },
    ],
  },
  {
    key: 'radius',
    tokens: [
      { var: '--bb-radius-sm', default: '4px', usageKey: 'radiusSm' },
      { var: '--bb-radius-md', default: '8px', usageKey: 'radiusMd' },
      { var: '--bb-radius-lg', default: '16px', usageKey: 'radiusLg' },
    ],
  },
  {
    key: 'typography',
    tokens: [
      { var: '--bb-font-family', default: 'system-ui, sans-serif', usageKey: 'fontFamily' },
      { var: '--bb-font-size-xs', default: '12px', usageKey: 'fontSizeXs' },
      { var: '--bb-font-size-sm', default: '14px', usageKey: 'fontSizeSm' },
      { var: '--bb-font-size-md', default: '16px', usageKey: 'fontSizeMd' },
      { var: '--bb-font-size-lg', default: '18px', usageKey: 'fontSizeLg' },
      { var: '--bb-font-size-xl', default: '20px', usageKey: 'fontSizeXl' },
    ],
  },
  {
    key: 'shadows',
    tokens: [
      { var: '--bb-shadow-sm', default: '0 2px 4px rgba(0, 0, 0, 0.1)', usageKey: 'shadowSm' },
      { var: '--bb-shadow-md', default: '0 4px 12px rgba(0, 0, 0, 0.15)', usageKey: 'shadowMd' },
      { var: '--bb-shadow-lg', default: '0 10px 30px rgba(0, 0, 0, 0.3)', usageKey: 'shadowLg' },
      { var: '--bb-shadow-sm-light', default: '0 2px 8px rgba(0, 0, 0, 0.08)', usageKey: 'shadowSmLight' },
      { var: '--bb-shadow-primary', default: '0 4px 12px rgba(102, 126, 234, 0.4)', usageKey: 'shadowPrimary' },
    ],
  },
  {
    key: 'motion',
    tokens: [
      { var: '--bb-transition-fast', default: '0.15s ease', usageKey: 'transitionFast' },
      { var: '--bb-transition-base', default: '0.2s ease', usageKey: 'transitionBase' },
      { var: '--bb-transition-slow', default: '0.3s ease', usageKey: 'transitionSlow' },
    ],
  },
  {
    key: 'zIndex',
    tokens: [
      { var: '--bb-z-index-dropdown', default: '100', usageKey: 'zIndexDropdown' },
      { var: '--bb-z-index-modal', default: '1000', usageKey: 'zIndexModal' },
      { var: '--bb-z-index-tooltip', default: '1100', usageKey: 'zIndexTooltip' },
    ],
  },
  {
    key: 'form',
    tokens: [
      { var: '--bb-form-control-height', default: '40px', usageKey: 'formControlHeight' },
      { var: '--bb-form-control-border-width', default: '2px', usageKey: 'formControlBorderWidth' },
      { var: '--bb-form-control-padding-x', default: '12px', usageKey: 'formControlPaddingX' },
      { var: '--bb-form-control-radius', default: 'var(--bb-radius-md)', usageKey: 'formControlRadius' },
      { var: '--bb-form-control-font-size', default: 'var(--bb-font-size-sm)', usageKey: 'formControlFontSize' },
      { var: '--bb-form-label-font-size', default: 'var(--bb-font-size-sm)', usageKey: 'formLabelFontSize' },
      { var: '--bb-form-label-font-weight', default: '500', usageKey: 'formLabelFontWeight' },
      { var: '--bb-form-error-font-size', default: 'var(--bb-font-size-xs)', usageKey: 'formErrorFontSize' },
    ],
  },
  {
    key: 'modal',
    tokens: [
      { var: '--bb-modal-max-width', default: '650px', usageKey: 'modalMaxWidth' },
      { var: '--bb-modal-radius', default: 'var(--bb-radius-lg)', usageKey: 'modalRadius' },
    ],
  },
  {
    key: 'buttons',
    tokens: [
      { var: '--bb-btn-padding-y', default: '10px', usageKey: 'btnPaddingY' },
      { var: '--bb-btn-padding-x', default: '20px', usageKey: 'btnPaddingX' },
    ],
  },
];

export const UI_STRING_GROUPS = [
  { key: 'toolbar', keys: ['save', 'clearAll', 'blocksTotal', 'addBlock', 'addBlockTitle'] },
  {
    key: 'blockActions',
    keys: ['edit', 'moveUp', 'moveDown', 'duplicate', 'delete', 'hide', 'show', 'expand', 'collapse', 'copyIdTitle'],
  },
  {
    key: 'modals',
    keys: [
      'createBlock',
      'editBlock',
      'submitCreate',
      'submitSave',
      'cancelButtonText',
      'blockTypeSelectionTitle',
      'deleteBlockConfirmTitle',
      'deleteBlockConfirmMessage',
      'clearAllBlocksConfirmTitle',
      'clearAllBlocksConfirmMessage',
      'deleteBlockSimpleConfirm',
      'clearAllSimpleConfirm',
    ],
  },
  {
    key: 'forms',
    keys: [
      'selectPlaceholder',
      'dropdownPlaceholder',
      'dropdownLoading',
      'dropdownEmpty',
      'apiSelectPlaceholder',
      'apiSelectLoading',
      'apiSelectNoResults',
      'apiSelectError',
      'apiSelectConfigMissing',
      'apiSelectLoadMore',
      'chooseFile',
      'chooseImage',
      'replaceFile',
      'changeImage',
      'addFile',
      'add',
      'remove',
      'removeFile',
      'removeImage',
      'imageAlt',
      'validationErrorsAriaLabel',
    ],
  },
  {
    key: 'repeater',
    keys: ['repeaterAdd', 'repeaterRemove', 'repeaterItem', 'repeaterMin', 'repeaterMax'],
  },
  {
    key: 'matrix',
    keys: [
      'matrixStructureTab',
      'matrixContentTab',
      'matrixColumn',
      'matrixRow',
      'matrixDeleteColumn',
      'matrixDeleteRow',
    ],
  },
  {
    key: 'spacing',
    keys: [
      'spacingDefaultLabel',
      'spacingCssVariablesPreview',
      'breakpointDesktop',
      'breakpointTablet',
      'breakpointMobile',
      'spacingPaddingTop',
      'spacingPaddingBottom',
      'spacingMarginTop',
      'spacingMarginBottom',
    ],
  },
  {
    key: 'errors',
    keys: [
      'loading',
      'saveNotEnabled',
      'errorSaveFailed',
      'successSaved',
      'unknownError',
      'blockConfigNotFound',
      'blockCreationError',
      'blockUpdateError',
      'blockDuplicateError',
      'blockDeleteError',
      'blocksClearError',
      'initialBlocksLoadError',
      'formLoadError',
      'formSaveError',
      'apiSelectRequired',
      'apiSelectUnavailable',
      'customFieldRequired',
      'customFieldsUnavailable',
      'uploadServerError',
      'uploadFileError',
      'fileImportError',
      'fileReadError',
      'invalidImageFile',
      'customFieldInitError',
      'blockIdCopied',
      'copyIdError',
      'blockAnchorPlaceholder',
      'blockAnchorCustomUrlPlaceholder',
    ],
  },
] as const;
