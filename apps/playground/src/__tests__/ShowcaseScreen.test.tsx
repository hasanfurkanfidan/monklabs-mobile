import { render, screen, userEvent } from '@testing-library/react-native';

import ShowcaseScreen from '@/app/index';
import { PlaygroundProviders } from '@/showcase/settings';

jest.mock(
  'react-native-safe-area-context',
  () => jest.requireActual<{ default: object }>('react-native-safe-area-context/jest/mock').default,
);

describe('ShowcaseScreen', () => {
  it('switches the product theme and its example content', async () => {
    await render(
      <PlaygroundProviders>
        <ShowcaseScreen />
      </PlaygroundProviders>,
    );
    const user = userEvent.setup();

    expect(screen.getByRole('radio', { name: 'MonkSets' })).toBeChecked();
    expect(screen.getByTestId('workout-example-card')).toBeOnTheScreen();

    await user.press(screen.getByRole('radio', { name: 'MobilityLab' }));

    expect(screen.getByRole('radio', { name: 'MobilityLab' })).toBeChecked();
    expect(screen.getByTestId('mobility-session-card')).toBeOnTheScreen();
    expect(screen.queryByTestId('workout-example-card')).not.toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Resume routine' })).toHaveStyle({
      backgroundColor: '#34D399',
    });
  });

  it('validates the weight input before saving', async () => {
    await render(
      <PlaygroundProviders>
        <ShowcaseScreen />
      </PlaygroundProviders>,
    );

    await userEvent.setup().press(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText('Enter a weight.')).toBeOnTheScreen();
  });
});
