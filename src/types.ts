export interface Option {
  id: string;
  icon: string;
  iconAlt: string;
  label: string;
  title: string;
}

export type ProgressStep = 'glow' | 'skip' | 'partial' | 'empty';

export interface Question {
  title: string;
  subtitle: string;
  balance: string;
  showBack: boolean;
  options: Option[];
}
