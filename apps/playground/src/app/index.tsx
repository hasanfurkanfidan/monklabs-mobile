import { useTheme, type AppearancePreference, type ProductId } from '@monklabs/theme';
import { AppButton, AppCard, AppText, LoadingIndicator, ScreenContainer } from '@monklabs/ui';
import { View } from 'react-native';

import { FormExample } from '@/showcase/FormExample';
import { MobilitySessionCard } from '@/showcase/MobilitySessionCard';
import { Section } from '@/showcase/Section';
import { SegmentedControl, type SegmentOption } from '@/showcase/SegmentedControl';
import { usePlaygroundSettings } from '@/showcase/settings';
import { WorkoutExampleCard } from '@/showcase/WorkoutExampleCard';

const PRODUCT_OPTIONS: readonly SegmentOption<ProductId>[] = [
  { value: 'monksets', label: 'MonkSets' },
  { value: 'mobilitylab', label: 'MobilityLab' },
];

const APPEARANCE_OPTIONS: readonly SegmentOption<AppearancePreference>[] = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'system', label: 'System' },
];

const PRODUCT_TAGLINES: Record<ProductId, string> = {
  monksets: 'Strength training, progressive overload and analytics.',
  mobilitylab: 'Guided mobility routines, stretching and joint health.',
};

export default function ShowcaseScreen() {
  const { product, appearance, setProduct, setAppearance } = usePlaygroundSettings();
  const { spacing } = useTheme();

  return (
    <ScreenContainer>
      <View style={{ gap: spacing.xs }}>
        <AppText variant="overline" tone="accent">
          MonkLabs UI Playground
        </AppText>
        <AppText variant="display">{product === 'monksets' ? 'MonkSets' : 'MobilityLab'}</AppText>
        <AppText tone="secondary">{PRODUCT_TAGLINES[product]}</AppText>
      </View>

      <View style={{ gap: spacing.sm }}>
        <SegmentedControl
          label="Product theme"
          options={PRODUCT_OPTIONS}
          value={product}
          onChange={setProduct}
        />
        <SegmentedControl
          label="Appearance"
          options={APPEARANCE_OPTIONS}
          value={appearance}
          onChange={setAppearance}
        />
      </View>

      <Section title="Product example">
        {product === 'monksets' ? <WorkoutExampleCard /> : <MobilitySessionCard />}
      </Section>

      <Section title="Typography">
        <AppCard>
          <AppText variant="display">Display</AppText>
          <AppText variant="title">Title</AppText>
          <AppText variant="heading">Heading</AppText>
          <AppText variant="metric">3,150 kg</AppText>
          <AppText variant="body">Body text for instructions and descriptions.</AppText>
          <AppText variant="bodyStrong">Body strong</AppText>
          <AppText variant="label" tone="accent">
            Accent label
          </AppText>
          <AppText variant="caption" tone="secondary">
            Caption · secondary
          </AppText>
          <AppText variant="overline" tone="secondary">
            Overline
          </AppText>
        </AppCard>
      </Section>

      <Section title="Buttons">
        <AppCard>
          <AppButton title="Primary" fullWidth />
          <AppButton title="Secondary" variant="secondary" fullWidth />
          <AppButton title="Ghost" variant="ghost" fullWidth />
          <AppButton title="Disabled" disabled fullWidth />
          <AppButton title="Loading" loading fullWidth />
        </AppCard>
      </Section>

      <Section title="Inputs">
        <FormExample />
      </Section>

      <Section title="Loading">
        <AppCard>
          <LoadingIndicator label="Loading your history" />
        </AppCard>
      </Section>
    </ScreenContainer>
  );
}
