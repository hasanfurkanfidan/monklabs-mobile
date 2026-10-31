import { useThemedStyles, type Theme } from '@monklabs/theme';
import { AppButton, AppCard, AppText } from '@monklabs/ui';
import { StyleSheet, View } from 'react-native';

import { StatTile } from './StatTile';

type SetStatus = 'done' | 'current' | 'pending';

interface WorkoutSet {
  index: number;
  kind: 'Warm-up' | 'Working' | 'To failure';
  reps: number;
  weightKg: number;
  previous: string;
  status: SetStatus;
}

// Static sample data: the playground has no backend.
const SETS: readonly WorkoutSet[] = [
  { index: 1, kind: 'Warm-up', reps: 8, weightKg: 60, previous: '8 × 55 kg', status: 'done' },
  { index: 2, kind: 'Working', reps: 5, weightKg: 90, previous: '6 × 85 kg', status: 'done' },
  { index: 3, kind: 'Working', reps: 5, weightKg: 100, previous: '5 × 95 kg', status: 'current' },
  {
    index: 4,
    kind: 'To failure',
    reps: 6,
    weightKg: 92.5,
    previous: '7 × 90 kg',
    status: 'pending',
  },
];

/** MonkSets sample: an in-progress strength session with progressive-overload context. */
export function WorkoutExampleCard() {
  const styles = useThemedStyles(createStyles);

  return (
    <AppCard testID="workout-example-card">
      <View style={styles.headerRow}>
        <View style={styles.flexShrink}>
          <AppText variant="overline" tone="accent">
            Session in progress
          </AppText>
          <AppText variant="title">Pull A</AppText>
        </View>
        <View
          style={styles.restBadge}
          accessible
          accessibilityLabel="Rest timer: 1 minute 4 seconds"
        >
          <AppText variant="bodyStrong" tone="onAccent">
            1:04
          </AppText>
          <AppText variant="caption" tone="onAccent">
            Rest
          </AppText>
        </View>
      </View>

      <View style={styles.statsRow}>
        <StatTile label="Duration" value="56:00" />
        <StatTile label="Volume" value="3,150 kg" />
        <StatTile label="Reps" value="13" />
      </View>

      <View style={styles.exercise}>
        <AppText variant="heading" tone="accent">
          Barbell Deadlift
        </AppText>
        <AppText variant="caption" tone="secondary">
          Lower back · Setup: hips a little higher, felt better last time.
        </AppText>
      </View>

      <View style={styles.sets}>
        {SETS.map((set) => (
          <SetRow key={set.index} set={set} />
        ))}
      </View>

      <AppButton
        title="Log set 3"
        fullWidth
        accessibilityLabel="Log set 3: 5 reps at 100 kilograms"
      />
    </AppCard>
  );
}

function SetRow({ set }: { set: WorkoutSet }) {
  const styles = useThemedStyles(createStyles);
  const isCurrent = set.status === 'current';
  const summary = `Set ${set.index}, ${set.kind}, ${set.reps} reps at ${set.weightKg} kg, ${set.status}. Last time ${set.previous}.`;

  return (
    <View
      accessible
      accessibilityLabel={summary}
      style={[styles.setRow, isCurrent && styles.setRowCurrent]}
    >
      <View style={[styles.setIndex, set.status === 'done' && styles.setIndexDone]}>
        <AppText variant="label" tone={set.status === 'done' ? 'onAccent' : 'secondary'}>
          {set.status === 'done' ? '✓' : String(set.index)}
        </AppText>
      </View>
      <View style={styles.setMain}>
        <AppText variant="bodyStrong">
          {set.reps} × {set.weightKg} kg
        </AppText>
        <AppText variant="caption" tone="secondary">
          {set.kind}
        </AppText>
      </View>
      <View style={styles.previous}>
        <AppText variant="caption" tone="secondary">
          Last time
        </AppText>
        <AppText variant="label" tone="accent">
          {set.previous}
        </AppText>
      </View>
    </View>
  );
}

function createStyles({ colors, radius, sizes, spacing }: Theme) {
  return StyleSheet.create({
    headerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    flexShrink: { flex: 1 },
    restBadge: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 64,
      height: 64,
      borderRadius: radius.pill,
      backgroundColor: colors.accent,
    },
    statsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    exercise: { gap: spacing.xxs },
    sets: { gap: spacing.sm },
    setRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      padding: spacing.md,
      borderRadius: radius.md,
      borderWidth: sizes.borderWidth,
      borderColor: colors.border,
      backgroundColor: colors.surfaceRaised,
    },
    setRowCurrent: { borderColor: colors.accent, backgroundColor: colors.accentSubtle },
    setIndex: {
      width: 28,
      height: 28,
      borderRadius: radius.pill,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: sizes.borderWidth,
      borderColor: colors.borderStrong,
    },
    setIndexDone: { backgroundColor: colors.accent, borderColor: colors.accent },
    setMain: { flex: 1, minWidth: 0 },
    previous: { alignItems: 'flex-end', flexShrink: 1 },
  });
}
