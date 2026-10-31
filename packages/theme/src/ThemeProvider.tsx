import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { getTheme } from './themes';
import type { ColorScheme, ProductId, Theme } from './types';

/** `system` follows the device setting; apps default to `dark`. */
export type AppearancePreference = ColorScheme | 'system';

const ThemeContext = createContext<Theme | null>(null);

export interface ThemeProviderProps {
  product: ProductId;
  appearance?: AppearancePreference;
  children: ReactNode;
}

export function ThemeProvider({ product, appearance = 'dark', children }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const scheme: ColorScheme =
    appearance === 'system' ? (systemScheme === 'light' ? 'light' : 'dark') : appearance;

  return <ThemeContext value={getTheme(product, scheme)}>{children}</ThemeContext>;
}

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used inside a <ThemeProvider>.');
  }
  return theme;
}

/**
 * Builds styles from the active theme and recomputes them only when the theme changes.
 * Pass a module-level factory (not an inline function) so the memo stays effective.
 */
export function useThemedStyles<T>(factory: (theme: Theme) => T): T {
  const theme = useTheme();
  return useMemo(() => factory(theme), [factory, theme]);
}
