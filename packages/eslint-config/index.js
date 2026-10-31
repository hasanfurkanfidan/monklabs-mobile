// @ts-check
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier/flat');

/**
 * Shared flat config: Expo's recommended rules + MonkLabs conventions.
 * Prettier owns formatting, so stylistic rules are turned off last.
 */
module.exports = defineConfig([
  expoConfig,
  {
    // eslint-config-expo registers the @typescript-eslint plugin for TypeScript files only.
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
    },
  },
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      // Packages must be consumed through their public entry point only.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@monklabs/*/src', '@monklabs/*/src/*'],
              message:
                'Import from the package entry point (e.g. "@monklabs/ui"), not its source files.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/__tests__/**', '**/*.test.{ts,tsx}'],
    languageOptions: { globals: { jest: 'readonly' } },
  },
  prettierConfig,
]);
