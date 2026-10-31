# Releasing shared packages

`@monklabs/theme` and `@monklabs/ui` are consumed by independent app repositories as versioned npm packages.
Inside this workspace nothing changes: `package.json` points at `src/`, so the playground keeps live source
imports. At pack/publish time `publishConfig` swaps `main`, `types` and `exports` to the compiled `dist/`.

## How packaging works

- `pnpm build` compiles both packages with `tsc -p tsconfig.build.json` (CommonJS + `.d.ts`, tests excluded).
  `@monklabs/ui` is compiled against `packages/theme/dist`, so `theme` builds first.
- `pnpm verify:packs` builds, packs and checks the **tarballs** (entry files exist, no `workspace:` ranges, no
  `src/`, React stays a peer dependency).
- **Use pnpm to pack/publish.** Only pnpm applies `publishConfig` overrides and rewrites `workspace:` ranges.
  `npm publish` would ship `src/` entry points and an unresolvable `workspace:*` range.
- `@monklabs/theme` is a **peer dependency** of `@monklabs/ui`, so an app always has exactly one theme context.
  Apps must install both packages, plus `react`, `react-native` and `react-native-safe-area-context`.
- Consumers can only import `@monklabs/theme` and `@monklabs/ui` (the `exports` map blocks deep paths).

## Publishing prerequisites (BLOCKER as of 2026-10-31)

GitHub Packages requires the npm scope to equal the lowercase name of the user or organization that owns the
package's repository. This repository lives under the personal account `hasanfurkanfidan`, so GitHub Packages
would only accept `@hasanfurkanfidan/*`. A GitHub organization named `monklabs` already exists (created 2015,
no public members) and is not controlled by this account. Therefore **`@monklabs/*` cannot be published to
GitHub Packages from this repository today.** The packages were not renamed.

Smallest viable options (pick one; none requires renaming the packages except option 4):

1. **Own the `monklabs` GitHub org**: claim it (if it is yours) or ask GitHub support about an abandoned
   namespace, then transfer this repository into it. The `publish-packages` workflow then works unchanged.
2. **npm registry scope**: create the `@monklabs` org on npmjs.com (private packages need a paid plan), publish
   with `--access restricted`, and change the workflow registry and token (`NPM_TOKEN`).
3. **No registry**: attach the `pnpm pack` tarballs to a private GitHub Release and depend on the tarball URL, or
   depend on a git tag. Works with any owner, but gives no semver range resolution.
4. **Rename the scope** to an owned one (for example `@hasanfurkanfidan/*`). Needs an explicit decision because the
   names are approved as `@monklabs/*`.

## Consuming from GitHub Packages (once option 1 is in place)

In each app repository add an `.npmrc` (no token in the file):

```
@monklabs:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Developers export `NODE_AUTH_TOKEN` as a personal access token (classic) with `read:packages`; app CI uses a
token with read access to the packages (a repo `GITHUB_TOKEN` works only if the package grants that repo access).
Then `pnpm add @monklabs/theme @monklabs/ui`.

## Release steps

1. Bump `version` in both package.json files (keep them in step; `ui` peers on `theme` with a `^` range).
2. Run `pnpm verify` and `pnpm expo:check`; merge to `main` through review.
3. Run the **Publish packages** workflow manually. It is a dry run by default; uncheck `dry-run` to publish.
   Versions are immutable: never re-publish a version, bump instead.
4. Tag the release in Git yourself (`git tag v0.1.0`); nothing here tags, commits or pushes automatically.

## Verifying a consumer manually

Create a throwaway Expo app **outside** this repository, install the tarballs produced by `pnpm pack`
(`file:` dependencies), then run `tsc --noEmit` and `expo export --platform android --platform ios`.
