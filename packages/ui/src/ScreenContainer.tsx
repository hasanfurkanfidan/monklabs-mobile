import { useThemedStyles, type Theme } from '@monklabs/theme';
import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

export interface ScreenContainerProps {
  children: ReactNode;
  /** Scrollable screens get keyboard-friendly tap handling. Defaults to `true`. */
  scrollable?: boolean;
  /** Safe-area edges to pad. Omit `top` when a navigation header already handles it. */
  edges?: readonly Edge[];
  contentStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

const DEFAULT_EDGES: readonly Edge[] = ['top', 'left', 'right', 'bottom'];

/**
 * Root container for a screen: themed background, safe-area insets, consistent horizontal
 * padding and keyboard avoidance so focused inputs are not hidden by the software keyboard.
 */
export function ScreenContainer({
  children,
  scrollable = true,
  edges = DEFAULT_EDGES,
  contentStyle,
  testID,
}: ScreenContainerProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <SafeAreaView edges={edges} style={styles.safeArea} testID={testID}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {scrollable ? (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={[styles.content, contentStyle]}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.flex, styles.content, contentStyle]}>{children}</View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function createStyles({ colors, spacing }: Theme) {
  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    flex: { flex: 1 },
    content: {
      flexGrow: 1,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      gap: spacing.xl,
    },
  });
}
