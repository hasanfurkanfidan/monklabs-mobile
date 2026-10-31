import { mobilitylab } from './products/mobilitylab';
import { monksets } from './products/monksets';
import { elevation, sizes, spacing } from './tokens';
import type { ColorScheme, ProductId, Theme } from './types';

export const PRODUCT_IDS = ['monksets', 'mobilitylab'] as const satisfies readonly ProductId[];
export const COLOR_SCHEMES = ['dark', 'light'] as const satisfies readonly ColorScheme[];

const products = { monksets, mobilitylab } satisfies Record<ProductId, unknown>;

function buildTheme(product: ProductId, scheme: ColorScheme): Theme {
  const definition = products[product];
  return {
    product,
    scheme,
    colors: definition.colors[scheme],
    typography: definition.typography,
    spacing,
    radius: definition.radius,
    elevation: elevation[scheme],
    sizes,
  };
}

/** Every product/scheme combination, built once so theme objects are referentially stable. */
export const themes: Record<ProductId, Record<ColorScheme, Theme>> = {
  monksets: { dark: buildTheme('monksets', 'dark'), light: buildTheme('monksets', 'light') },
  mobilitylab: {
    dark: buildTheme('mobilitylab', 'dark'),
    light: buildTheme('mobilitylab', 'light'),
  },
};

export function getTheme(product: ProductId, scheme: ColorScheme = 'dark'): Theme {
  return themes[product][scheme];
}
