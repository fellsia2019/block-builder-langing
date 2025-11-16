export type Section = 'core' | 'vue3' | 'react';
export type CoreSubSection = 'getting-started' | 'classes' | 'methods' | 'properties' | 'types' | 'form-fields' | 'utilities';
export type Vue3SubSection = 'getting-started' | 'components' | 'events' | 'api';

export interface NavigationProps {
  nextSection: string | null;
  nextTitle: string | null;
  onNavigate: (sub: string) => void;
}

