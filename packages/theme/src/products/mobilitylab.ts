import type { ColorScheme, ColorTokens, RadiusTokens, TypographyTokens } from '../types';

/**
 * MobilityLab brand accent ("MobilityLab Mint").
 * Used as the accent fill in dark mode (10:1 against the dark background).
 */
export const MOBILITYLAB_ACCENT = '#34D399';

/**
 * Deeper MobilityLab green used as the accent in light mode, where the mint
 * does not reach WCAG AA against white (white text on it: 5.5:1).
 */
export const MOBILITYLAB_ACCENT_DEEP = '#047857';

const colors: Record<ColorScheme, ColorTokens> = {
  dark: {
    // Slightly cooler charcoal than MonkSets for a calmer tone.
    background: '#0D1114',
    surface: '#161B20',
    surfaceRaised: '#1F262C',
    border: '#28313A',
    borderStrong: '#3A4652',
    textPrimary: '#F2F5F4',
    textSecondary: '#A3AEB4',
    textDisabled: '#5C676E',
    accent: MOBILITYLAB_ACCENT,
    onAccent: '#04241A',
    accentSubtle: '#0F2620',
    accentText: MOBILITYLAB_ACCENT,
    success: '#4ADE80',
    warning: '#F5C452',
    danger: '#FF6B6B',
    disabled: '#28313A',
  },
  light: {
    background: '#F4F7F6',
    surface: '#FFFFFF',
    surfaceRaised: '#EEF2F1',
    border: '#DDE4E2',
    borderStrong: '#BFCAC7',
    textPrimary: '#0F1716',
    textSecondary: '#4D5B58',
    textDisabled: '#9FAAA7',
    accent: MOBILITYLAB_ACCENT_DEEP,
    onAccent: '#FFFFFF',
    accentSubtle: '#E3F5EE',
    accentText: MOBILITYLAB_ACCENT_DEEP,
    success: '#15803D',
    warning: '#8A5A00',
    danger: '#C4262E',
    disabled: '#E2E7E6',
  },
};

/** Lighter weights and roomier line heights for a calm, guided feel. */
const typography: TypographyTokens = {
  display: { fontSize: 32, lineHeight: 40, fontWeight: '600', letterSpacing: -0.3 },
  title: { fontSize: 24, lineHeight: 32, fontWeight: '600', letterSpacing: -0.2 },
  heading: { fontSize: 18, lineHeight: 26, fontWeight: '600', letterSpacing: 0 },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400', letterSpacing: 0 },
  bodyStrong: { fontSize: 16, lineHeight: 24, fontWeight: '500', letterSpacing: 0 },
  label: { fontSize: 14, lineHeight: 20, fontWeight: '500', letterSpacing: 0.1 },
  caption: { fontSize: 12, lineHeight: 18, fontWeight: '400', letterSpacing: 0.2 },
  overline: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  metric: { fontSize: 28, lineHeight: 34, fontWeight: '600', letterSpacing: -0.2 },
};

const radius: RadiusTokens = { sm: 8, md: 14, lg: 20, xl: 28, pill: 999 };

export const mobilitylab = { colors, typography, radius };
