import { light, dark, mapping } from '@eva-design/eva';

// Islamic-inspired color palette
const islamicColors = {
  primary: {
    100: '#E8F5E8',
    200: '#C3E9C3',
    300: '#9CDD9C',
    400: '#75D175',
    500: '#4FC3F7', // Teal primary
    600: '#26A69A',
    700: '#00897B',
    800: '#00695C',
    900: '#004D40',
  },
  secondary: {
    100: '#FFF8E1',
    200: '#FFECB3',
    300: '#FFE082',
    400: '#FFD54F',
    500: '#FFCA28', // Gold secondary
    600: '#FFB300',
    700: '#FF8F00',
    800: '#FF6F00',
    900: '#E65100',
  },
  success: {
    100: '#E8F5E8',
    200: '#C8E6C9',
    300: '#A5D6A7',
    400: '#81C784',
    500: '#66BB6A',
    600: '#4CAF50',
    700: '#43A047',
    800: '#388E3C',
    900: '#2E7D32',
  },
  warning: {
    100: '#FFF3E0',
    200: '#FFE0B2',
    300: '#FFCC80',
    400: '#FFB74D',
    500: '#FFA726',
    600: '#FF9800',
    700: '#FB8C00',
    800: '#F57C00',
    900: '#E65100',
  },
  danger: {
    100: '#FFEBEE',
    200: '#FFCDD2',
    300: '#EF9A9A',
    400: '#E57373',
    500: '#EF5350',
    600: '#F44336',
    700: '#E53935',
    800: '#D32F2F',
    900: '#B71C1C',
  },
  info: {
    100: '#E3F2FD',
    200: '#BBDEFB',
    300: '#90CAF9',
    400: '#64B5F6',
    500: '#42A5F5',
    600: '#2196F3',
    700: '#1E88E5',
    800: '#1976D2',
    900: '#0D47A1',
  },
};

// Custom light theme
export const lunarLightTheme = {
  ...light,
  'color-primary-100': islamicColors.primary[100],
  'color-primary-200': islamicColors.primary[200],
  'color-primary-300': islamicColors.primary[300],
  'color-primary-400': islamicColors.primary[400],
  'color-primary-500': islamicColors.primary[500],
  'color-primary-600': islamicColors.primary[600],
  'color-primary-700': islamicColors.primary[700],
  'color-primary-800': islamicColors.primary[800],
  'color-primary-900': islamicColors.primary[900],
  
  'color-success-100': islamicColors.success[100],
  'color-success-200': islamicColors.success[200],
  'color-success-300': islamicColors.success[300],
  'color-success-400': islamicColors.success[400],
  'color-success-500': islamicColors.success[500],
  'color-success-600': islamicColors.success[600],
  'color-success-700': islamicColors.success[700],
  'color-success-800': islamicColors.success[800],
  'color-success-900': islamicColors.success[900],

  'color-warning-100': islamicColors.warning[100],
  'color-warning-200': islamicColors.warning[200],
  'color-warning-300': islamicColors.warning[300],
  'color-warning-400': islamicColors.warning[400],
  'color-warning-500': islamicColors.warning[500],
  'color-warning-600': islamicColors.warning[600],
  'color-warning-700': islamicColors.warning[700],
  'color-warning-800': islamicColors.warning[800],
  'color-warning-900': islamicColors.warning[900],

  'color-danger-100': islamicColors.danger[100],
  'color-danger-200': islamicColors.danger[200],
  'color-danger-300': islamicColors.danger[300],
  'color-danger-400': islamicColors.danger[400],
  'color-danger-500': islamicColors.danger[500],
  'color-danger-600': islamicColors.danger[600],
  'color-danger-700': islamicColors.danger[700],
  'color-danger-800': islamicColors.danger[800],
  'color-danger-900': islamicColors.danger[900],

  'color-info-100': islamicColors.info[100],
  'color-info-200': islamicColors.info[200],
  'color-info-300': islamicColors.info[300],
  'color-info-400': islamicColors.info[400],
  'color-info-500': islamicColors.info[500],
  'color-info-600': islamicColors.info[600],
  'color-info-700': islamicColors.info[700],
  'color-info-800': islamicColors.info[800],
  'color-info-900': islamicColors.info[900],

  // Typography
  'text-font-family': 'Poppins-Regular',
  'text-heading-font-family': 'Poppins-Bold',
  'text-subtitle-font-family': 'Poppins-Medium',
  'text-caption-font-family': 'Poppins-Regular',

  // Border radius
  'border-radius': 12,
  'border-radius-small': 8,
  'border-radius-large': 16,
};

// Custom dark theme
export const lunarDarkTheme = {
  ...dark,
  ...lunarLightTheme, // Use same colors but with dark base
};

export const customMapping = {
  ...mapping,
  strict: {
    ...mapping.strict,
    'text-font-family': 'Poppins-Regular',
    'text-heading-font-family': 'Poppins-Bold',
    'text-subtitle-font-family': 'Poppins-Medium',
  },
};