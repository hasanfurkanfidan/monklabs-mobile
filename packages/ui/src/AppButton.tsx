import { useThemedStyles, type Theme } from '@monklabs/theme';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type GestureResponderEvent,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { AppText } from './AppText';

export type AppButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface AppButtonProps extends Omit<PressableProps, 'children' | 'style' | 'disabled'> {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: AppButtonVariant;
  disabled?: boolean;
  /** Shows a spinner and blocks presses while keeping the button's size and label for screen readers. */
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function AppButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  accessibilityLabel,
  ...rest
}: AppButtonProps) {
  const styles = useThemedStyles(createStyles);
  const inactive = disabled || loading;
  const variantStyle = styles.variants[variant];
  const labelTone = disabled ? 'disabled' : variant === 'primary' ? 'onAccent' : 'accent';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: inactive, busy: loading }}
      disabled={inactive}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variantStyle.container,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
      {...rest}
    >
      {/* The label stays mounted while loading so the button never changes size. */}
      <View style={loading && styles.hidden}>
        <AppText variant="label" tone={labelTone} numberOfLines={1}>
          {title}
        </AppText>
      </View>
      {loading ? (
        <ActivityIndicator
          testID="app-button-spinner"
          color={variantStyle.spinnerColor}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
    </Pressable>
  );
}

interface VariantStyle {
  container: ViewStyle;
  spinnerColor: string;
}

function createStyles({ colors, radius, sizes, spacing }: Theme) {
  const variants: Record<AppButtonVariant, VariantStyle> = {
    primary: {
      container: { backgroundColor: colors.accent, borderColor: colors.accent },
      spinnerColor: colors.onAccent,
    },
    secondary: {
      container: { backgroundColor: colors.surfaceRaised, borderColor: colors.borderStrong },
      spinnerColor: colors.accentText,
    },
    ghost: {
      container: { backgroundColor: 'transparent' },
      spinnerColor: colors.accentText,
    },
  };

  return {
    variants,
    ...StyleSheet.create({
      base: {
        minHeight: sizes.minTouchTarget,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        borderRadius: radius.md,
        borderWidth: sizes.borderWidth,
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
      },
      fullWidth: { alignSelf: 'stretch' },
      disabled: { backgroundColor: colors.disabled, borderColor: colors.disabled },
      pressed: { opacity: 0.8 },
      hidden: { opacity: 0 },
    }),
  };
}
