export interface Option {
  id: string;
  icon: string;
  iconAlt: string;
  label: string;
  title: string;
}

export interface Question {
  title: string;
  subtitle: string;
  balance: string;
  progress: ('glow' | 'partial' | 'empty')[];
  showBack: boolean;
  options: Option[];
}
