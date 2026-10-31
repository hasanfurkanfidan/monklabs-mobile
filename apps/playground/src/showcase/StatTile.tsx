import { useThemedStyles, type Theme } from '@monklabs/theme';
import { AppText } from '@monklabs/ui';
import { StyleSheet, View } from 'react-native';

export function StatTile({ label, value }: { label: string; value: string }) {
  const styles = useThemedStyles(createStyles);
  return (
    <View style={styles.tile} accessible accessibilityLabel={`${label}: ${value}`}>
      <AppText variant="caption" tone="secondary" numberOfLines={1}>
        {label}
      </AppText>
      <AppText variant="heading" numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </AppText>
    </View>
  );
}

function createStyles({ colors, radius, spacing }: Theme) {
  return StyleSheet.create({
    tile: {
      flex: 1,
      minWidth: 88,
      gap: spacing.xxs,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: radius.md,
      backgroundColor: colors.surfaceRaised,
    },
  });
}
