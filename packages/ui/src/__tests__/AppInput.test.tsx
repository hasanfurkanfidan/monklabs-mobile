import { screen, userEvent } from '@testing-library/react-native';
import { useState } from 'react';

import { AppInput } from '..';
import { renderWithTheme } from '../testing/renderWithTheme';

function ControlledInput({ onChangeText }: { onChangeText: (text: string) => void }) {
  const [value, setValue] = useState('');
  return (
    <AppInput
      label="Working weight (kg)"
      value={value}
      onChangeText={(text) => {
        setValue(text);
        onChangeText(text);
      }}
    />
  );
}

describe('AppInput', () => {
  it('reports text changes and displays the typed value', async () => {
    const onChangeText = jest.fn();
    await renderWithTheme(<ControlledInput onChangeText={onChangeText} />);
    const input = screen.getByLabelText('Working weight (kg)');

    await userEvent.setup().type(input, '102.5');

    expect(onChangeText).toHaveBeenLastCalledWith('102.5');
    expect(input).toHaveDisplayValue('102.5');
  });

  it('shows the validation error and exposes it to screen readers', async () => {
    await renderWithTheme(
      <AppInput label="Reps" value="0" helperText="Completed reps" error="Enter at least 1 rep" />,
    );

    expect(screen.getByText('Enter at least 1 rep')).toBeOnTheScreen();
    expect(screen.queryByText('Completed reps')).not.toBeOnTheScreen();
    expect(screen.getByLabelText('Reps')).toHaveProp('accessibilityHint', 'Enter at least 1 rep');
  });

  it('is not editable when disabled', async () => {
    await renderWithTheme(<AppInput label="Session name" disabled />);
    expect(screen.getByLabelText('Session name')).toBeDisabled();
  });
});
