# monklabs-mobile

Shared mobile foundation (MonkLabs) for two independent Expo apps:

| App             | Focus                                                    | Accent                           |
| --------------- | -------------------------------------------------------- | -------------------------------- |
| **MonkSets**    | Strength training, hypertrophy, progressive overload     | `#FF642D`                        |
| **MobilityLab** | Mobility, stretching, guided routines, progress tracking | `#34D399` dark / `#047857` light |

Each app keeps its own identity, API, configuration and release lifecycle. This repository provides the shared theme,
UI components and tooling, plus a **playground** app for visual verification (not a product).

## Prerequisites

- **Node.js 26 LTS** (`.nvmrc`; `^24.3.0 || ^26.0.0` is supported via `engines`)
- **pnpm 12.16.1** – pinned in `package.json#packageManager`. Node 25+ no longer ships Corepack, so install it with
  `npm install -g pnpm@12.16.1 --allow-scripts=pnpm` (or let `pnpm/action-setup` do it in CI).
- To run the playground: **Expo Go** (SDK 58) on a phone, or an Android emulator (Android Studio) / iOS Simulator
  (macOS + Xcode). No Docker – Docker is only used for backend services.

## Installation

```bash
pnpm install --frozen-lockfile
```

## Workspace structure

```
monklabs-mobile/
├── apps/
│   └── playground/          Expo Router app showing both product themes (dev only)
│       ├── src/app/         routes (_layout.tsx, index.tsx)
│       ├── src/showcase/    playground-only components and sample data
│       ├── app.json, eas.json
├── packages/
│   ├── theme/               @monklabs/theme – tokens, product themes, ThemeProvider/useTheme
│   ├── ui/                  @monklabs/ui – AppText, AppButton, AppInput, AppCard, ScreenContainer, LoadingIndicator
│   └── eslint-config/       @monklabs/eslint-config – shared ESLint flat config
├── .github/workflows/ci.yml
├── eslint.config.js, .prettierrc.json, tsconfig.base.json
├── pnpm-workspace.yaml      workspaces, version catalog, overrides, allowBuilds
└── AGENTS.md                rules for AI agents and contributors
```

`api-client`, `auth` and `forms` are intentionally **not** created yet: there is no concrete consumer in Phase 1.
Add them together with the first feature that needs them (TanStack Query, React Hook Form + Zod).

## Development commands

All commands run from the repository root and are exactly what CI runs.

| Command           | What it does                                                          |
| ----------------- | --------------------------------------------------------------------- |
| `pnpm playground` | Start the Expo dev server for the playground                          |
| `pnpm typecheck`  | `tsc --noEmit` in every workspace (strict mode)                       |
| `pnpm lint`       | ESLint (Expo rules + MonkLabs rules), zero warnings allowed           |
| `pnpm format`     | Format with Prettier (`format:check` to verify only)                  |
| `pnpm test`       | Jest + React Native Testing Library in every workspace                |
| `pnpm expo:check` | `expo install --check` (SDK compatibility) + `expo config` validation |
| `pnpm verify`     | All of the above in sequence                                          |

Additional checks (also run in CI) from `apps/playground`:

```bash
pnpm dlx expo-doctor@1.21.5
```

```bash
pnpm exec expo export --platform android --platform ios --output-dir dist
```

## Launching the playground

```bash
pnpm playground
```

Then press `a` (Android emulator), `i` (iOS Simulator, macOS only) or scan the QR code with Expo Go. The playground only
uses modules included in Expo Go, so no development build is needed.

For an installable build use EAS (`apps/playground/eas.json`, `preview` profile). It requires an Expo account and
`eas init` once to link a project ID:

```bash
pnpm dlx eas-cli@latest build --profile preview --platform android
```

## Switching themes

In the playground, use the **Product theme** (MonkSets / MobilityLab) and **Appearance** (Dark / Light / System)
controls at the top of the screen. Dark is the default.

In code, the product is chosen once at the root of an app:

```tsx
import { ThemeProvider } from '@monklabs/theme';

<ThemeProvider product="monksets" appearance="dark">
  {/* app */}
</ThemeProvider>;
```

Components read tokens with `useTheme()` or build styles with `useThemedStyles(createStyles)`. Both products share the
same `Theme` interface (`colors`, `typography`, `spacing`, `radius`, `elevation`, `sizes`), so shared components never
branch on the product.

## Consuming the shared packages from a new Expo app

1. Create the app under `apps/` (e.g. `apps/monksets`) with `npx create-expo-app@latest --template default@sdk-58`.
2. Add the packages:

   ```json
   "dependencies": {
     "@monklabs/theme": "workspace:*",
     "@monklabs/ui": "workspace:*",
     "react-native-safe-area-context": "catalog:"
   }
   ```

3. Wrap the root layout in `<ThemeProvider product="...">` and import components from `@monklabs/ui`.
4. Run `pnpm install`, then `pnpm exec expo install --check` inside the app.

Packages are published as TypeScript source (`exports` → `src/index.ts`); Metro and Jest compile them. Expo SDK 52+
configures Metro for monorepos automatically, so **no custom `metro.config.js` is needed**. React and React Native are
peer dependencies of the packages, so each app has exactly one copy.

## Testing and linting

- Tests live next to the code in `src/__tests__/` and use `jest-expo` + `@testing-library/react-native` v14
  (`await render(...)`, `userEvent`). They are behavior-focused: theme completeness, WCAG contrast of every theme,
  product switching, button disabled/loading, input changes/validation and accessibility roles.
- ESLint uses `eslint-config-expo` plus rules forbidding `any` and deep imports into other packages' `src/`.

## Version compatibility

| Tool / package                | Version              |
| ----------------------------- | -------------------- |
| Node.js                       | 26.13.0 (LTS)        |
| pnpm                          | 12.16.1              |
| Expo SDK                      | 58 (`expo ~58.0.21`) |
| React Native                  | 0.88.1               |
| React                         | 19.3.0               |
| Expo Router                   | ~58.0.28             |
| TypeScript                    | ~6.0.3               |
| Jest / jest-expo              | ~30.5.2 / ~58.0.13   |
| @testing-library/react-native | ^14.1.0              |
| ESLint / eslint-config-expo   | ~9.39.5 / ~58.0.4    |
| Prettier                      | 3.9.10               |

Policy:

- The Expo SDK decides the versions of `react`, `react-native`, `expo-*` and native modules. Use `expo install`; never
  bump them independently. Upgrade the SDK as a deliberate, separate change (one SDK at a time) after the release has
  had a few weeks to stabilize.
- Shared versions live in the `catalog:` section of `pnpm-workspace.yaml` so every workspace uses the same version.
- ESLint stays on 9.x until `eslint-plugin-react` and `eslint-plugin-import` (used by `eslint-config-expo`) support 10.
- GitHub Actions use the Node 24-based majors (`actions/checkout@v7`, `actions/setup-node@v7`, `pnpm/action-setup@v6`).

## Distribution

The shared packages are packed for consumption by separate app repositories. See [docs/RELEASING.md](docs/RELEASING.md)
for the build, pack and publish flow and the open registry/scope blocker.

## Known limitations

- The playground has only been verified via Jest, `expo export` and Metro serving the bundle. A native Android/iOS
  build and on-device launch have not been executed in this repository yet (see the Phase 1 report).
- No web target: `react-native-web` is not installed (`platforms: ["ios", "android"]`).
- System fonts only; custom brand fonts are a later decision per product.
- `com.monklabs.playground` is the playground's bundle identifier; product apps will define their own.
- EAS needs `eas init` (Expo account) before the first cloud build.
