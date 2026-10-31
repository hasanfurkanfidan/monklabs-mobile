import type { TextStyle } from 'react-native';

export type ProductId = 'monksets' | 'mobilitylab';

export type ColorScheme = 'dark' | 'light';

/**
 * Semantic color roles. Components must only use these roles, never raw palette values,
 * so that every product theme can be swapped without touching component code.
 */
export interface ColorTokens {
  /** Screen background. */
  background: string;
  /** Default card / grouped content background. */
  surface: string;
  /** Inputs and nested surfaces placed on top of `surface`. */
  surfaceRaised: string;
  /** Hairlines and default input borders. */
  border: string;
  /** Emphasized borders (focused inputs, highlighted cards). */
  borderStrong: string;

  textPrimary: string;
  textSecondary: string;
  textDisabled: string;

  /** Brand fill color for primary actions and highlights. */
  accent: string;
  /** Text and icons placed on top of `accent`. */
  onAccent: string;
  /** Low-emphasis tinted background derived from the accent. */
  accentSubtle: string;
  /** Accent used as text on `background` / `surface` (always meets WCAG AA). */
  accentText: string;

  success: string;
  warning: string;
  danger: string;

  /** Fill for disabled controls. */
  disabled: string;
}

export interface TypographyStyle {
  fontSize: number;
  lineHeight: number;
  fontWeight: NonNullable<TextStyle['fontWeight']>;
  letterSpacing: number;
  textTransform?: TextStyle['textTransform'];
}

export type TypographyVariant =
  | 'display'
  | 'title'
  | 'heading'
  | 'body'
  | 'bodyStrong'
  | 'label'
  | 'caption'
  | 'overline'
  | 'metric';

export type TypographyTokens = Record<TypographyVariant, TypographyStyle>;

export interface SpacingTokens {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

export interface RadiusTokens {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  pill: number;
}

export interface ElevationStyle {
  shadowColor: string;
  shadowOpacity: number;
  shadowRadius: number;
  shadowOffset: { width: number; height: number };
  /** Android elevation. */
  elevation: number;
}

export interface ElevationTokens {
  none: ElevationStyle;
  card: ElevationStyle;
  overlay: ElevationStyle;
}

export interface SizeTokens {
  /** Minimum touch target recommended by platform accessibility guidelines. */
  minTouchTarget: number;
  controlHeight: number;
  borderWidth: number;
}

export interface Theme {
  product: ProductId;
  scheme: ColorScheme;
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  elevation: ElevationTokens;
  sizes: SizeTokens;
}
