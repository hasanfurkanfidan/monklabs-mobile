import { useTheme } from '@monklabs/theme';
import { ActivityIndicator, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { AppText } from './AppText';

export interface LoadingIndicatorProps {
  /** Visible text and screen-reader label. Defaults to "Loading". */
  label?: string;
  /** Hide the visible label while keeping it available to screen readers. */
  hideLabel?: boolean;
  size?: 'small' | 'large';
  style?: StyleProp<ViewStyle>;
}

export function LoadingIndicator({
  label = 'Loading',
  hideLabel = false,
  size = 'large',
  style,
}: LoadingIndicatorProps) {
  const { colors, spacing } = useTheme();

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityState={{ busy: true }}
      style={[styles.container, { gap: spacing.sm }, style]}
    >
      <ActivityIndicator size={size} color={colors.accent} />
      {hideLabel ? null : (
        <AppText variant="caption" tone="secondary">
          {label}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
});
