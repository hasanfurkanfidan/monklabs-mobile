import { useThemedStyles, type Theme } from '@monklabs/theme';
import { AppText } from '@monklabs/ui';
import { Pressable, StyleSheet, View } from 'react-native';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  /** Accessible name of the whole group. */
  label: string;
  options: readonly SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

/** Single-select segmented control, exposed to screen readers as a radio group. */
export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  const styles = useThemedStyles(createStyles);

  return (
    <View accessibilityRole="radiogroup" accessibilityLabel={label} style={styles.track}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            accessibilityLabel={option.label}
            onPress={() => onChange(option.value)}
            style={[styles.segment, selected && styles.selected]}
          >
            <AppText variant="label" tone={selected ? 'onAccent' : 'secondary'} numberOfLines={1}>
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

function createStyles({ colors, radius, sizes, spacing }: Theme) {
  return StyleSheet.create({
    track: {
      flexDirection: 'row',
      padding: spacing.xs,
      gap: spacing.xs,
      borderRadius: radius.pill,
      backgroundColor: colors.surface,
      borderWidth: sizes.borderWidth,
      borderColor: colors.border,
    },
    segment: {
      flex: 1,
      minHeight: sizes.minTouchTarget - spacing.sm,
      paddingHorizontal: spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.pill,
    },
    selected: { backgroundColor: colors.accent },
  });
}
