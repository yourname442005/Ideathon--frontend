export const COLORS = {
  primary: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },
  surface: {
    default: '#FFFFFF',
    muted: '#F9F9FB',
    subtle: '#F4F4F5',
    dim: '#F1F5F9',
  },
  border: {
    default: '#E5E7EB',
    strong: '#D1D5DB',
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#52525B',
    muted: '#A1A1AA',
  },
  violet: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
    900: '#4C1D95',
  },
  emerald: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
  },
  amber: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
  },
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
  },
  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
  },
} as const;

export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
  '3xl': '3rem',
} as const;

export const RADIUS = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.25rem',
  full: '9999px',
} as const;

export const SHADOWS = {
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
} as const;

export const TRANSITIONS = {
  fast: '150ms ease',
  normal: '200ms ease',
  slow: '300ms ease',
} as const;

export const AVATARS = {
  currentUser: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
  sarahChen: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  jamesVance: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
  marcAndre: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  researchAI: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
} as const;

export const USER = {
  name: 'Dr. Alex Rivera',
  role: 'Principal Research Lead',
  institution: 'Stanford AI Labs',
  shortInstitution: 'STANFORD AI LABS',
  roleShort: 'PRINCIPAL PI',
} as const;
