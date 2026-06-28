export type CoreSubSection =
  | 'classes'
  | 'methods'
  | 'properties'
  | 'types'
  | 'form-fields'
  | 'utilities'
  | 'theming-localization';
export type Vue3SubSection = 'getting-started' | 'components' | 'events';
export type ReactSubSection = 'getting-started' | 'components' | 'events';

export interface NavigationProps {
  nextSection: string | null;
  nextTitle: string | null;
  onNavigate: (sub: string) => void;
}
