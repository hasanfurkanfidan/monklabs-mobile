import { useThemedStyles, type Theme } from '@monklabs/theme';
import { StyleSheet, View, type ViewProps } from 'react-native';

export interface AppCardProps extends ViewProps {
  /** Draws attention to the card with an accent border and tinted background (e.g. an active item). */
  highlighted?: boolean;
}

export function AppCard({ highlighted = false, style, ...rest }: AppCardProps) {
  const styles = useThemedStyles(createStyles);
  return <View style={[styles.card, highlighted && styles.highlighted, style]} {...rest} />;
}

function createStyles({ colors, elevation, radius, sizes, spacing }: Theme) {
  return StyleSheet.create({
    card: {
      ...elevation.card,
      padding: spacing.lg,
      gap: spacing.md,
      borderRadius: radius.lg,
      borderWidth: sizes.borderWidth,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    highlighted: {
      borderColor: colors.accent,
      backgroundColor: colors.accentSubtle,
    },
  });
}
