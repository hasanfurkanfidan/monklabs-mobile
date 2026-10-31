import type {
  ColorScheme,
  ElevationStyle,
  ElevationTokens,
  SizeTokens,
  SpacingTokens,
} from './types';

/** 4pt-based spacing scale shared by every product. */
export const spacing: SpacingTokens = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const sizes: SizeTokens = {
  minTouchTarget: 48,
  controlHeight: 52,
  borderWidth: 1,
};

function shadow(
  opacity: number,
  radius: number,
  offsetY: number,
  elevation: number,
): ElevationStyle {
  return {
    shadowColor: '#000000',
    shadowOpacity: opacity,
    shadowRadius: radius,
    shadowOffset: { width: 0, height: offsetY },
    elevation,
  };
}

/** Shadows are subtle on dark backgrounds, where surface color carries most of the depth. */
export const elevation: Record<ColorScheme, ElevationTokens> = {
  dark: {
    none: shadow(0, 0, 0, 0),
    card: shadow(0.35, 12, 4, 3),
    overlay: shadow(0.5, 24, 12, 8),
  },
  light: {
    none: shadow(0, 0, 0, 0),
    card: shadow(0.08, 12, 4, 2),
    overlay: shadow(0.16, 24, 12, 8),
  },
};
