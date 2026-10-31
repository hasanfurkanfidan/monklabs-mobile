import { useTheme } from '@monklabs/theme';
import { AppText } from '@monklabs/ui';
import type { ReactNode } from 'react';
import { View } from 'react-native';

export function Section({ title, children }: { title: string; children: ReactNode }) {
  const { spacing } = useTheme();
  return (
    <View style={{ gap: spacing.md }}>
      <AppText variant="overline" tone="secondary" accessibilityRole="header">
        {title}
      </AppText>
      {children}
    </View>
  );
}
