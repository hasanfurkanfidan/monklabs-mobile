import type { ColorScheme, ColorTokens, RadiusTokens, TypographyTokens } from '../types';

/** MonkSets brand accent. Do not change without product approval. */
export const MONKSETS_ACCENT = '#FF642D';

const colors: Record<ColorScheme, ColorTokens> = {
  dark: {
    background: '#0E0F11',
    surface: '#17191C',
    surfaceRaised: '#212429',
    border: '#2A2E33',
    borderStrong: '#3B4047',
    textPrimary: '#F5F6F7',
    textSecondary: '#A9AFB7',
    textDisabled: '#5F656D',
    accent: MONKSETS_ACCENT,
    // Dark text on the orange fill: 7.1:1, while white would only reach ~3:1.
    onAccent: '#140700',
    accentSubtle: '#2A1810',
    accentText: MONKSETS_ACCENT,
    success: '#3FB950',
    warning: '#F5B83D',
    danger: '#FF5A5F',
    disabled: '#2A2E33',
  },
  light: {
    background: '#F6F6F7',
    surface: '#FFFFFF',
    surfaceRaised: '#F0F1F3',
    border: '#E1E3E6',
    borderStrong: '#C5C9CE',
    textPrimary: '#121316',
    textSecondary: '#545A62',
    textDisabled: '#A3A8AF',
    accent: MONKSETS_ACCENT,
    onAccent: '#140700',
    accentSubtle: '#FFEDE5',
    // The brand orange is too light for text on white; a deeper shade keeps WCAG AA.
    accentText: '#B23C0C',
    success: '#1E7F3A',
    warning: '#8A5A00',
    danger: '#C4262E',
    disabled: '#E4E6E9',
  },
};

/** Heavy, tight typography for a strong, athletic feel. */
const typography: TypographyTokens = {
  display: { fontSize: 34, lineHeight: 40, fontWeight: '800', letterSpacing: -0.5 },
  title: { fontSize: 24, lineHeight: 30, fontWeight: '800', letterSpacing: -0.3 },
  heading: { fontSize: 18, lineHeight: 24, fontWeight: '700', letterSpacing: 0 },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400', letterSpacing: 0 },
  bodyStrong: { fontSize: 16, lineHeight: 24, fontWeight: '600', letterSpacing: 0 },
  label: { fontSize: 14, lineHeight: 20, fontWeight: '600', letterSpacing: 0.1 },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '500', letterSpacing: 0.2 },
  overline: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  metric: { fontSize: 28, lineHeight: 32, fontWeight: '800', letterSpacing: -0.4 },
};

const radius: RadiusTokens = { sm: 6, md: 10, lg: 14, xl: 20, pill: 999 };

export const monksets = { colors, typography, radius };
