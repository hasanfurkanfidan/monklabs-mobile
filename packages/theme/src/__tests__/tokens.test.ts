import { COLOR_SCHEMES, MONKSETS_ACCENT, PRODUCT_IDS, getTheme, themes, type Theme } from '..';

const HEX_COLOR = /^#[0-9A-F]{6}$/;

function relativeLuminance(hex: string): number {
  const channel = (offset: number) => {
    const value = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
}

function contrastRatio(foreground: string, background: string): number {
  const [light, dark] = [relativeLuminance(foreground), relativeLuminance(background)].sort(
    (a, b) => b - a,
  );
  return (light! + 0.05) / (dark! + 0.05);
}

function hue(hex: string): number {
  const [r, g, b] = [1, 3, 5].map(
    (offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255,
  ) as [number, number, number];
  const max = Math.max(r, g, b);
  const delta = max - Math.min(r, g, b);
  if (delta === 0) return 0;
  if (max === r) return (60 * ((g - b) / delta) + 360) % 360;
  if (max === g) return 60 * ((b - r) / delta) + 120;
  return 60 * ((r - g) / delta) + 240;
}

const allThemes: Theme[] = PRODUCT_IDS.flatMap((product) =>
  COLOR_SCHEMES.map((scheme) => getTheme(product, scheme)),
);
const reference = themes.monksets.dark;
const label = (theme: Theme) => `${theme.product}/${theme.scheme}`;

describe('theme token completeness', () => {
  it.each(allThemes.map((theme) => [label(theme), theme] as const))(
    '%s implements the full semantic token interface',
    (_, theme) => {
      expect(Object.keys(theme.colors).sort()).toEqual(Object.keys(reference.colors).sort());
      expect(Object.keys(theme.typography).sort()).toEqual(
        Object.keys(reference.typography).sort(),
      );
      expect(Object.keys(theme.radius).sort()).toEqual(Object.keys(reference.radius).sort());
      expect(Object.keys(theme.elevation).sort()).toEqual(Object.keys(reference.elevation).sort());

      for (const [role, value] of Object.entries(theme.colors)) {
        expect({ role, value }).toEqual({ role, value: expect.stringMatching(HEX_COLOR) });
      }
      for (const style of Object.values(theme.typography)) {
        expect(style.lineHeight).toBeGreaterThanOrEqual(style.fontSize);
      }
    },
  );

  it('shares one spacing scale across products', () => {
    for (const theme of allThemes) {
      expect(theme.spacing).toBe(reference.spacing);
    }
  });

  it('defaults to dark appearance', () => {
    expect(getTheme('mobilitylab').scheme).toBe('dark');
  });
});

describe('product identity', () => {
  it('uses the MonkSets brand accent in every appearance', () => {
    expect(MONKSETS_ACCENT).toBe('#FF642D');
    expect(themes.monksets.dark.colors.accent).toBe('#FF642D');
    expect(themes.monksets.light.colors.accent).toBe('#FF642D');
  });

  it('uses a green accent for MobilityLab', () => {
    for (const scheme of COLOR_SCHEMES) {
      const accentHue = hue(themes.mobilitylab[scheme].colors.accent);
      expect(accentHue).toBeGreaterThan(100);
      expect(accentHue).toBeLessThan(170);
    }
  });
});

describe('accessible color contrast (WCAG 2.1)', () => {
  const AA_TEXT = 4.5;
  const AAA_TEXT = 7;

  it.each(allThemes.map((theme) => [label(theme), theme] as const))(
    '%s meets contrast requirements',
    (_, { colors }) => {
      for (const surface of [colors.background, colors.surface]) {
        expect(contrastRatio(colors.textPrimary, surface)).toBeGreaterThanOrEqual(AAA_TEXT);
        expect(contrastRatio(colors.textSecondary, surface)).toBeGreaterThanOrEqual(AA_TEXT);
        expect(contrastRatio(colors.accentText, surface)).toBeGreaterThanOrEqual(AA_TEXT);
        expect(contrastRatio(colors.danger, surface)).toBeGreaterThanOrEqual(AA_TEXT);
      }
      expect(contrastRatio(colors.textPrimary, colors.surfaceRaised)).toBeGreaterThanOrEqual(
        AAA_TEXT,
      );
      expect(contrastRatio(colors.onAccent, colors.accent)).toBeGreaterThanOrEqual(AA_TEXT);
      expect(contrastRatio(colors.textPrimary, colors.accentSubtle)).toBeGreaterThanOrEqual(
        AAA_TEXT,
      );
    },
  );
});
