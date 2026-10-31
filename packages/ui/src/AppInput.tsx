import { useTheme, useThemedStyles, type Theme } from '@monklabs/theme';
import { useState, type ComponentRef, type Ref } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { AppText } from './AppText';

type FocusEvent = Parameters<NonNullable<TextInputProps['onFocus']>>[0];
type BlurEvent = Parameters<NonNullable<TextInputProps['onBlur']>>[0];

export interface AppInputProps extends Omit<TextInputProps, 'style' | 'editable'> {
  label: string;
  /** Validation message. When set, the input is styled as invalid and the message is announced. */
  error?: string;
  helperText?: string;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  ref?: Ref<ComponentRef<typeof TextInput>>;
}

export function AppInput({
  label,
  error,
  helperText,
  disabled = false,
  containerStyle,
  accessibilityLabel,
  accessibilityHint,
  onFocus,
  onBlur,
  ref,
  ...rest
}: AppInputProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const [focused, setFocused] = useState(false);

  const handleFocus = (event: FocusEvent) => {
    setFocused(true);
    onFocus?.(event);
  };
  const handleBlur = (event: BlurEvent) => {
    setFocused(false);
    onBlur?.(event);
  };

  const message = error ?? helperText;

  return (
    <View style={[styles.container, containerStyle]}>
      <AppText variant="label" tone={disabled ? 'disabled' : 'secondary'}>
        {label}
      </AppText>
      <TextInput
        ref={ref}
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityHint={accessibilityHint ?? error ?? helperText}
        accessibilityState={{ disabled }}
        aria-invalid={error ? true : undefined}
        editable={!disabled}
        placeholderTextColor={colors.textDisabled}
        selectionColor={colors.accent}
        cursorColor={colors.accent}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[
          styles.input,
          focused && styles.focused,
          error ? styles.invalid : null,
          disabled && styles.disabled,
        ]}
        {...rest}
      />
      {message ? (
        <AppText
          variant="caption"
          tone={error ? 'danger' : 'secondary'}
          accessibilityLiveRegion={error ? 'polite' : 'none'}
        >
          {message}
        </AppText>
      ) : null}
    </View>
  );
}

function createStyles({ colors, radius, sizes, spacing, typography }: Theme) {
  return StyleSheet.create({
    container: { gap: spacing.xs },
    input: {
      // lineHeight is intentionally omitted: it misaligns single-line TextInput text on iOS.
      fontSize: typography.body.fontSize,
      fontWeight: typography.body.fontWeight,
      minHeight: sizes.controlHeight,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderRadius: radius.md,
      borderWidth: sizes.borderWidth,
      borderColor: colors.border,
      backgroundColor: colors.surfaceRaised,
      color: colors.textPrimary,
    },
    focused: { borderColor: colors.accent },
    invalid: { borderColor: colors.danger },
    disabled: { backgroundColor: colors.disabled, color: colors.textDisabled },
  });
}
