import { render, screen } from '@testing-library/react-native';
import { Text, useColorScheme } from 'react-native';

import { ThemeProvider, useTheme } from '..';

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: jest.fn(() => 'dark'),
}));

const mockedUseColorScheme = jest.mocked(useColorScheme);

function ThemeProbe() {
  const theme = useTheme();
  return <Text>{`${theme.product}:${theme.scheme}:${theme.colors.accent}`}</Text>;
}

describe('ThemeProvider', () => {
  it('switches between MonkSets and MobilityLab themes', async () => {
    const { rerender } = await render(
      <ThemeProvider product="monksets">
        <ThemeProbe />
      </ThemeProvider>,
    );
    expect(screen.getByText('monksets:dark:#FF642D')).toBeOnTheScreen();

    await rerender(
      <ThemeProvider product="mobilitylab">
        <ThemeProbe />
      </ThemeProvider>,
    );
    expect(screen.getByText('mobilitylab:dark:#34D399')).toBeOnTheScreen();
  });

  it('follows the device appearance when appearance is "system"', async () => {
    mockedUseColorScheme.mockReturnValue('light');
    await render(
      <ThemeProvider product="mobilitylab" appearance="system">
        <ThemeProbe />
      </ThemeProvider>,
    );
    expect(screen.getByText('mobilitylab:light:#047857')).toBeOnTheScreen();
  });

  it('uses dark appearance by default regardless of the device setting', async () => {
    mockedUseColorScheme.mockReturnValue('light');
    await render(
      <ThemeProvider product="monksets">
        <ThemeProbe />
      </ThemeProvider>,
    );
    expect(screen.getByText('monksets:dark:#FF642D')).toBeOnTheScreen();
  });

  it('fails loudly when useTheme is used without a provider', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    await expect(render(<ThemeProbe />)).rejects.toThrow(
      'useTheme must be used inside a <ThemeProvider>.',
    );
  });
});
