import { screen, userEvent } from '@testing-library/react-native';

import { AppButton } from '..';
import { renderWithTheme } from '../testing/renderWithTheme';

describe('AppButton', () => {
  it('calls onPress when enabled', async () => {
    const onPress = jest.fn();
    await renderWithTheme(<AppButton title="Start workout" onPress={onPress} />);

    await userEvent.setup().press(screen.getByRole('button', { name: 'Start workout' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('ignores presses and reports the disabled state when disabled', async () => {
    const onPress = jest.fn();
    await renderWithTheme(<AppButton title="Start workout" onPress={onPress} disabled />);
    const button = screen.getByRole('button', { name: 'Start workout' });

    await userEvent.setup().press(button);

    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('shows a spinner, reports busy and blocks presses while loading', async () => {
    const onPress = jest.fn();
    await renderWithTheme(<AppButton title="Save session" onPress={onPress} loading />);
    // The label stays available to screen readers while loading.
    const button = screen.getByRole('button', { name: 'Save session' });

    await userEvent.setup().press(button);

    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeBusy();
    expect(button).toBeDisabled();
    expect(screen.getByTestId('app-button-spinner')).toBeOnTheScreen();
  });

  it('prefers an explicit accessibility label over the visible title', async () => {
    await renderWithTheme(<AppButton title="Go" accessibilityLabel="Start Pull A workout" />);
    expect(screen.getByRole('button', { name: 'Start Pull A workout' })).toBeOnTheScreen();
  });

  it.each([
    ['monksets', '#FF642D'],
    ['mobilitylab', '#34D399'],
  ] as const)('uses the %s accent for primary buttons', async (product, accent) => {
    await renderWithTheme(<AppButton title="Continue" />, product);
    expect(screen.getByRole('button', { name: 'Continue' })).toHaveStyle({
      backgroundColor: accent,
    });
  });
});
