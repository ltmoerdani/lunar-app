import { Platform } from 'react-native';

/**
 * Creates cross-platform shadow styles that work for both React Native and Web
 * In modern React Native versions, shadow* props are deprecated in favor of boxShadow
 * but we need to handle platform differences
 */
export const createShadow = (
  shadowColor: string = '#000',
  shadowOffset: { width: number; height: number } = { width: 0, height: 2 },
  shadowOpacity: number = 0.04,
  shadowRadius: number = 8,
  elevation: number = 2
) => {
  if (Platform.OS === 'web') {
    // For web, use boxShadow CSS property
    const { width, height } = shadowOffset;
    const rgba = `rgba(0, 0, 0, ${shadowOpacity})`;
    return {
      boxShadow: `${width}px ${height}px ${shadowRadius}px ${rgba}`,
    };
  } else {
    // For native platforms, use traditional shadow props and elevation
    return {
      shadowColor,
      shadowOffset,
      shadowOpacity,
      shadowRadius,
      elevation, // Android shadow
    };
  }
};

// Predefined shadow presets for consistent UI
export const shadowPresets = {
  small: createShadow('#000', { width: 0, height: 1 }, 0.03, 2, 1),
  medium: createShadow('#000', { width: 0, height: 2 }, 0.04, 8, 2),
  large: createShadow('#000', { width: 0, height: 4 }, 0.04, 12, 4),
  card: createShadow('#000', { width: 0, height: 2 }, 0.05, 4, 2),
  focus: createShadow('#000', { width: 0, height: 2 }, 0.1, 8, 3),
};
