import { getTheme, PRODUCT_IDS } from '@monklabs/theme';
import { screen } from '@testing-library/react-native';

import { AppButton, AppCard, AppText, LoadingIndicator, ScreenContainer } from '..';
import { renderWithTheme } from '../testing/renderWithTheme';

// Official mock shipped by react-native-safe-area-context (zero insets, no native module).
jest.mock(
  'react-native-safe-area-context',
  () => jest.requireActual<{ default: object }>('react-native-safe-area-context/jest/mock').default,
);

describe('AppText', () => {
  it('exposes heading variants as headers to assistive technology', async () => {
    await renderWithTheme(
      <>
        <AppText variant="title">Pull A</AppText>
        <AppText>Barbell Deadlift</AppText>
      </>,
    );

    expect(screen.getByRole('header', { name: 'Pull A' })).toBeOnTheScreen();
    expect(screen.queryByRole('header', { name: 'Barbell Deadlift' })).not.toBeOnTheScreen();
  });
});

describe('LoadingIndicator', () => {
  it('announces itself as a busy progress indicator with a label', async () => {
    await renderWithTheme(<LoadingIndicator label="Loading session" hideLabel />);

    const indicator = screen.getByRole('progressbar', { name: 'Loading session' });
    expect(indicator).toBeBusy();
    expect(screen.queryByText('Loading session')).not.toBeOnTheScreen();
  });
});

describe.each(PRODUCT_IDS)('rendering with the %s theme', (product) => {
  const { colors } = getTheme(product);

  it('applies theme colors to a composed screen', async () => {
    await renderWithTheme(
      <ScreenContainer testID="screen">
        <AppCard testID="card" highlighted>
          <AppText variant="heading">Today</AppText>
          <AppButton title="Start" />
        </AppCard>
      </ScreenContainer>,
      product,
    );

    expect(screen.getByTestId('screen')).toHaveStyle({ backgroundColor: colors.background });
    expect(screen.getByTestId('card')).toHaveStyle({
      backgroundColor: colors.accentSubtle,
      borderColor: colors.accent,
    });
    expect(screen.getByRole('header', { name: 'Today' })).toHaveStyle({
      color: colors.textPrimary,
    });
    expect(screen.getByText('Start')).toHaveStyle({ color: colors.onAccent });
  });
});
