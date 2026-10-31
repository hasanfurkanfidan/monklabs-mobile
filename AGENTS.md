# AGENTS.md

Persistent rules for AI coding agents and developers working in `monklabs-mobile`. Keep changes small, explicit and verified.

## Purpose and scope

`monklabs-mobile` is shared mobile infrastructure (MonkLabs) for two independent commercial apps:

- **MonkSets** – strength training, hypertrophy, workout tracking, progressive overload, analytics. Accent `#FF642D`.
- **MobilityLab** – mobility training, stretching, guided routines, progress tracking. Accent `#34D399` (dark) / `#047857` (light).

The apps own their identity, API, app configuration and release lifecycle. Shared packages must never contain
product business logic, API endpoints, secrets or app-specific configuration.

- `apps/playground` is a development/visual verification app, **not** a product. Keep demo content there.
- Use `MonkLabs` for shared infrastructure and `@monklabs/*` for packages. Do not introduce any other company,
  organization or legal-entity name, and no placeholder branding.
- All code, identifiers, comments, docs and commit messages are in English.

## Module boundaries

```
@monklabs/theme          (react, react-native peers only)
@monklabs/ui        ──>  @monklabs/theme
@monklabs/eslint-config  (tooling only)
apps/playground     ──>  @monklabs/ui, @monklabs/theme
```

- No circular dependencies. `theme` must never import `ui`. Packages never import from `apps/`.
- Import other packages only through their entry point (`@monklabs/ui`), never `@monklabs/ui/src/...`
  (enforced by ESLint `no-restricted-imports`). Every public symbol is exported from `src/index.ts`.
- Internal workspace dependencies use `workspace:*`. `react`, `react-native` and other native modules are
  `peerDependencies` of packages, so each app controls exactly one copy.
- Do not create a package until there is a concrete consumer (no empty `api-client`/`auth`/`forms` placeholders).

## TypeScript and code style

- Strict TypeScript (`strict`, `noUncheckedIndexedAccess`). No `any` (lint error), no `@ts-ignore`/`@ts-expect-error`
  or `eslint-disable` without a comment that justifies it.
- Functional components and hooks. Small, readable files; extract a component when a file stops being easy to scan.
- No speculative abstractions, generic wrappers or premature memoization. `useThemedStyles` memoizes styles per theme;
  pass it a module-level factory.
- State: local state first, React Context when a subtree needs it. Add TanStack Query only for real server state,
  React Hook Form + Zod only for real forms, Zustand only with a documented justification.
- Prettier owns formatting; run `pnpm format` instead of hand-formatting.

## Theme and UI rules

- Components use **semantic tokens only** (`theme.colors.accent`, `theme.spacing.lg`, ...). No hard-coded colors,
  font sizes or spacing in `packages/ui`. Adding a token means adding it to `ColorTokens` (etc.) for **every** product
  and scheme; the token tests enforce this.
- Both products must keep the same token interface. Dark mode is the primary appearance.
- Keep the component set small. Add a variant only when a real screen needs it.
- Prefer React Native primitives; do not add a UI framework.

## Accessibility (required)

- Interactive elements expose `accessibilityRole`, an accessible name and `accessibilityState` (`disabled`, `busy`,
  `checked`, ...). Touch targets are at least `theme.sizes.minTouchTarget` (48dp).
- Text colors must meet WCAG AA (4.5:1) on their surfaces; `textPrimary` meets 7:1. The contrast test must stay green.
- Validation errors are visible text and are announced (`accessibilityLiveRegion`, `accessibilityHint`).

## Tests

- Every new shared component or token change comes with behavior-focused tests (Jest + React Native Testing Library).
  Query by role/label like a user would; avoid snapshots.
- Do not add tests that only inflate counts. Do not delete or weaken a failing test to make CI pass.

## Package compatibility

- Expo SDK-managed packages (`expo`, `react`, `react-native`, `expo-*`, `react-native-*`) are versioned by the SDK.
  Add or upgrade them with `pnpm exec expo install <pkg>` from `apps/playground` (or the consuming app), then copy the
  resolved range into the `catalog:` in `pnpm-workspace.yaml` if packages share it.
- Never install `latest` blindly. Check the SDK compatibility and peer ranges first.
- After dependency changes run `pnpm expo:check` and `pnpm dlx expo-doctor@<pinned>` from `apps/playground`.
- Do not add custom Metro configuration unless an Expo-documented compatibility need requires it.
- pnpm blocks dependency build scripts; decide explicitly in `allowBuilds` (`pnpm-workspace.yaml`).

## Security

- Never commit secrets, API keys, signing keys, keystores or `.env` files. Configuration that differs per app or
  environment belongs in that app (`app.config.ts`, EAS secrets), not in shared packages.

## Workflow

- **Never commit or push automatically.** Leave changes for a human to review.
- Before reporting success run `pnpm verify` (typecheck, lint, format check, tests, Expo checks) and report the real
  output. Never claim a device, emulator, native or EAS build succeeded unless it actually ran; Metro starting is not
  a native build.
