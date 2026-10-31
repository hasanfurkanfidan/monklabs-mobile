// @ts-check
const { defineConfig, globalIgnores } = require('eslint/config');
const monklabs = require('@monklabs/eslint-config');

module.exports = defineConfig([
  globalIgnores([
    '**/node_modules/',
    '**/dist/',
    '**/.expo/',
    '**/coverage/',
    'apps/*/ios/',
    'apps/*/android/',
    '**/expo-env.d.ts',
  ]),
  monklabs,
  {
    // Resolve each workspace's own tsconfig paths (e.g. the playground's "@/*" alias).
    settings: {
      'import/resolver': {
        typescript: { project: ['apps/*/tsconfig.json', 'packages/*/tsconfig.json'] },
      },
    },
  },
]);
