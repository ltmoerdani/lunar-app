import { light, mapping } from '@eva-design/eva';

// Minimalist color palette with white base
const minimalistColors = {
  primary: {
    100: '#F8FFFE',
    200: '#E8F8F5',
    300: '#D1F2EB',
    400: '#A3E4D7',
    500: '#52C4A0', // Clean teal
    600: '#48B394',
    700: '#3E9B82',
    800: '#34836F',
    900: '#2A6B5C',
  },
  secondary: {
    100: '#FFFEF8',
    200: '#FFF9E8',
    300: '#FFF2D1',
    400: '#FFE4A3',
    500: '#FFD152', // Clean gold
    600: '#E6BC4A',
    700: '#CCA742',
    800: '#B39239',
    900: '#997D31',
  },
  neutral: {
    50: '#FFFFFF',
    100: '#FAFAFA',
    200: '#F5F5F5',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  success: {
    100: '#F1F8E9',
    200: '#DCEDC8',
    300: '#C5E1A5',
    400: '#AED581',
    500: '#8BC34A',
    600: '#7CB342',
    700: '#689F38',
    800: '#558B2F',
    900: '#33691E',
  },
  warning: {
    100: '#FFF8E1',
    200: '#FFECB3',
    300: '#FFE082',
    400: '#FFD54F',
    500: '#FFC107',
    600: '#FFB300',
    700: '#FFA000',
    800: '#FF8F00',
    900: '#FF6F00',
  },
  danger: {
    100: '#FFEBEE',
    200: '#FFCDD2',
    300: '#EF9A9A',
    400: '#E57373',
    500: '#F44336',
    600: '#E53935',
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C',
  },
};

// Minimalist light theme
export const lunarLightTheme = {
  ...light,
  
  // Primary colors
  'color-primary-100': minimalistColors.primary[100],
  'color-primary-200': minimalistColors.primary[200],
  'color-primary-300': minimalistColors.primary[300],
  'color-primary-400': minimalistColors.primary[400],
  'color-primary-500': minimalistColors.primary[500],
  'color-primary-600': minimalistColors.primary[600],
  'color-primary-700': minimalistColors.primary[700],
  'color-primary-800': minimalistColors.primary[800],
  'color-primary-900': minimalistColors.primary[900],
  
  // Background colors - clean white base
  'color-basic-100': minimalistColors.neutral[50], // Pure white
  'color-basic-200': minimalistColors.neutral[100], // Off white
  'color-basic-300': minimalistColors.neutral[200], // Light gray
  'color-basic-400': minimalistColors.neutral[300],
  'color-basic-500': minimalistColors.neutral[400],
  'color-basic-600': minimalistColors.neutral[500],
  'color-basic-700': minimalistColors.neutral[600],
  'color-basic-800': minimalistColors.neutral[700],
  'color-basic-900': minimalistColors.neutral[800],
  'color-basic-1000': minimalistColors.neutral[900],
  
  // Success colors
  'color-success-100': minimalistColors.success[100],
  'color-success-200': minimalistColors.success[200],
  'color-success-300': minimalistColors.success[300],
  'color-success-400': minimalistColors.success[400],
  'color-success-500': minimalistColors.success[500],
  'color-success-600': minimalistColors.success[600],
  'color-success-700': minimalistColors.success[700],
  'color-success-800': minimalistColors.success[800],
  'color-success-900': minimalistColors.success[900],

  // Warning colors
  'color-warning-100': minimalistColors.warning[100],
  'color-warning-200': minimalistColors.warning[200],
  'color-warning-300': minimalistColors.warning[300],
  'color-warning-400': minimalistColors.warning[400],
  'color-warning-500': minimalistColors.warning[500],
  'color-warning-600': minimalistColors.warning[600],
  'color-warning-700': minimalistColors.warning[700],
  'color-warning-800': minimalistColors.warning[800],
  'color-warning-900': minimalistColors.warning[900],

  // Danger colors
  'color-danger-100': minimalistColors.danger[100],
  'color-danger-200': minimalistColors.danger[200],
  'color-danger-300': minimalistColors.danger[300],
  'color-danger-400': minimalistColors.danger[400],
  'color-danger-500': minimalistColors.danger[500],
  'color-danger-600': minimalistColors.danger[600],
  'color-danger-700': minimalistColors.danger[700],
  'color-danger-800': minimalistColors.danger[800],
  'color-danger-900': minimalistColors.danger[900],

  // Typography - clean and minimal
  'text-font-family': 'Inter-Regular',
  'text-heading-font-family': 'Inter-SemiBold',
  'text-subtitle-font-family': 'Inter-Medium',
  'text-caption-font-family': 'Inter-Regular',

  // Minimal border radius
  'border-radius': 8,
  'border-radius-small': 4,
  'border-radius-large': 12,
  
  // Clean shadows
  'shadow-color': 'rgba(0, 0, 0, 0.04)',
  'elevation-1': 2,
  'elevation-2': 4,
  'elevation-3': 8,
};

export const customMapping = {
  ...mapping,
  strict: {
    ...mapping.strict,
    'text-font-family': 'Inter-Regular',
    'text-heading-font-family': 'Inter-SemiBold',
    'text-subtitle-font-family': 'Inter-Medium',
  },
};