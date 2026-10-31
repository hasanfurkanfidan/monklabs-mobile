import { useThemedStyles, type Theme } from '@monklabs/theme';
import { AppButton, AppCard, AppText } from '@monklabs/ui';
import { StyleSheet, View } from 'react-native';

import { StatTile } from './StatTile';

interface Movement {
  name: string;
  prescription: string;
}

// Static sample data: the playground has no backend.
const MOVEMENTS: readonly Movement[] = [
  { name: 'Cat–Cow', prescription: '60 s' },
  { name: 'Deep Squat Hold', prescription: '60 s' },
  { name: '90/90 Hip Switch', prescription: '45 s each side' },
  { name: "World's Greatest Stretch", prescription: '40 s each side' },
  { name: 'Couch Stretch', prescription: '60 s each side' },
  { name: 'Pigeon Pose', prescription: '60 s each side' },
];
const CURRENT_INDEX = 2;

/** MobilityLab sample: a guided routine with the current movement and coaching cues. */
export function MobilitySessionCard() {
  const styles = useThemedStyles(createStyles);
  const current = MOVEMENTS[CURRENT_INDEX];
  const next = MOVEMENTS[CURRENT_INDEX + 1];
  const progress = CURRENT_INDEX / MOVEMENTS.length;

  return (
    <AppCard testID="mobility-session-card">
      <View>
        <AppText variant="overline" tone="accent">
          Guided routine · Hips
        </AppText>
        <AppText variant="title">Hip Opener Flow</AppText>
      </View>

      <View style={styles.statsRow}>
        <StatTile label="Duration" value="14 min" />
        <StatTile label="Movements" value={String(MOVEMENTS.length)} />
        <StatTile label="Focus" value="Hips" />
      </View>

      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel="Routine progress"
        accessibilityValue={{ min: 0, max: MOVEMENTS.length, now: CURRENT_INDEX }}
        style={styles.progressBlock}
      >
        <View style={styles.progressLabels}>
          <AppText variant="caption" tone="secondary">
            Movement {CURRENT_INDEX + 1} of {MOVEMENTS.length}
          </AppText>
          <AppText variant="caption" tone="accent">
            {Math.round(progress * 100)}%
          </AppText>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      {current ? (
        <AppCard highlighted style={styles.current}>
          <AppText variant="caption" tone="accent">
            Now
          </AppText>
          <AppText variant="heading">{current.name}</AppText>
          <AppText variant="body" tone="secondary">
            {current.prescription}. Keep your chest tall and rotate from the hips, not the lower
            back.
          </AppText>
        </AppCard>
      ) : null}

      {next ? (
        <AppText variant="label" tone="secondary">
          Up next: {next.name} · {next.prescription}
        </AppText>
      ) : null}

      <AppButton title="Resume routine" fullWidth />
    </AppCard>
  );
}

function createStyles({ colors, radius, spacing }: Theme) {
  return StyleSheet.create({
    statsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    progressBlock: { gap: spacing.xs },
    progressLabels: { flexDirection: 'row', justifyContent: 'space-between' },
    progressTrack: {
      height: 6,
      borderRadius: radius.pill,
      backgroundColor: colors.surfaceRaised,
      overflow: 'hidden',
    },
    progressFill: { height: '100%', borderRadius: radius.pill, backgroundColor: colors.accent },
    current: { gap: spacing.xs },
  });
}
