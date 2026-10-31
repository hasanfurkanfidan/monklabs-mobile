import { useTheme } from '@monklabs/theme';
import { AppButton, AppCard, AppInput } from '@monklabs/ui';
import { useRef, useState, type ComponentRef } from 'react';
import type { TextInput } from 'react-native';

function validateWeight(value: string): string | undefined {
  if (value.trim() === '') return 'Enter a weight.';
  const weight = Number(value.replace(',', '.'));
  if (!Number.isFinite(weight) || weight <= 0) return 'Weight must be a positive number.';
  return undefined;
}

/**
 * Plain controlled inputs: no form library until real forms exist.
 * Demonstrates keyboard flow (return key moves focus), validation and the loading state.
 */
export function FormExample() {
  const { spacing } = useTheme();
  const weightRef = useRef<ComponentRef<typeof TextInput>>(null);
  const [name, setName] = useState('Pull A');
  const [weight, setWeight] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const weightError = submitted ? validateWeight(weight) : undefined;

  const save = () => {
    setSubmitted(true);
    if (validateWeight(weight)) return;
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <AppCard style={{ gap: spacing.lg }}>
      <AppInput
        label="Session name"
        value={name}
        onChangeText={setName}
        helperText="Shown in your history."
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => weightRef.current?.focus()}
      />
      <AppInput
        ref={weightRef}
        label="Working weight (kg)"
        value={weight}
        onChangeText={setWeight}
        placeholder="e.g. 100"
        keyboardType="decimal-pad"
        returnKeyType="done"
        onSubmitEditing={save}
        error={weightError}
      />
      <AppInput label="Coach notes" value="Available on Pro plans" disabled />
      <AppButton title="Save" onPress={save} loading={saving} fullWidth />
    </AppCard>
  );
}
