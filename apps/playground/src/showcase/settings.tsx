import { ThemeProvider, type AppearancePreference, type ProductId } from '@monklabs/theme';
import { createContext, useContext, useState, type ReactNode } from 'react';

/**
 * Playground-only state. Real product apps pass a fixed `product` to ThemeProvider
 * and never switch it at runtime.
 */
interface PlaygroundSettings {
  product: ProductId;
  appearance: AppearancePreference;
  setProduct: (product: ProductId) => void;
  setAppearance: (appearance: AppearancePreference) => void;
}

const PlaygroundSettingsContext = createContext<PlaygroundSettings | null>(null);

function PlaygroundSettingsProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<ProductId>('monksets');
  const [appearance, setAppearance] = useState<AppearancePreference>('dark');

  return (
    <PlaygroundSettingsContext value={{ product, appearance, setProduct, setAppearance }}>
      {children}
    </PlaygroundSettingsContext>
  );
}

export function usePlaygroundSettings(): PlaygroundSettings {
  const settings = useContext(PlaygroundSettingsContext);
  if (!settings) {
    throw new Error('usePlaygroundSettings must be used inside <PlaygroundProviders>.');
  }
  return settings;
}

function SettingsThemeProvider({ children }: { children: ReactNode }) {
  const { product, appearance } = usePlaygroundSettings();
  return (
    <ThemeProvider product={product} appearance={appearance}>
      {children}
    </ThemeProvider>
  );
}

/** Playground settings plus the ThemeProvider driven by them. */
export function PlaygroundProviders({ children }: { children: ReactNode }) {
  return (
    <PlaygroundSettingsProvider>
      <SettingsThemeProvider>{children}</SettingsThemeProvider>
    </PlaygroundSettingsProvider>
  );
}
