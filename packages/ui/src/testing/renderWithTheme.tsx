import { ThemeProvider, type ProductId } from '@monklabs/theme';
import { render } from '@testing-library/react-native';
import type { ReactElement } from 'react';

/** Test-only helper (not exported from the package entry point). */
export function renderWithTheme(ui: ReactElement, product: ProductId = 'monksets') {
  return render(<ThemeProvider product={product}>{ui}</ThemeProvider>);
}
