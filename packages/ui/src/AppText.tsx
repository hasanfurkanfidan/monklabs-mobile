import { useTheme, type Theme, type TypographyVariant } from '@monklabs/theme';
import { Text, type TextProps } from 'react-native';

export type TextTone =
  'primary' | 'secondary' | 'disabled' | 'accent' | 'onAccent' | 'success' | 'warning' | 'danger';

export interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  tone?: TextTone;
  align?: 'auto' | 'left' | 'center' | 'right';
}

const HEADER_VARIANTS: readonly TypographyVariant[] = ['display', 'title', 'heading'];

function toneColor(colors: Theme['colors'], tone: TextTone): string {
  switch (tone) {
    case 'primary':
      return colors.textPrimary;
    case 'secondary':
      return colors.textSecondary;
    case 'disabled':
      return colors.textDisabled;
    case 'accent':
      return colors.accentText;
    case 'onAccent':
      return colors.onAccent;
    case 'success':
      return colors.success;
    case 'warning':
      return colors.warning;
    case 'danger':
      return colors.danger;
  }
}

/**
 * Themed text. Heading-like variants are exposed to screen readers as headers
 * unless an explicit `accessibilityRole` is passed.
 */
export function AppText({
  variant = 'body',
  tone = 'primary',
  align,
  style,
  accessibilityRole,
  ...rest
}: AppTextProps) {
  const { typography, colors } = useTheme();
  const role = accessibilityRole ?? (HEADER_VARIANTS.includes(variant) ? 'header' : undefined);

  return (
    <Text
      accessibilityRole={role}
      style={[typography[variant], { color: toneColor(colors, tone), textAlign: align }, style]}
      {...rest}
    />
  );
}
