import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import unusedImports  from 'eslint-plugin-unused-imports';
import prettierConfig from './prettier.config.js';
import importPlugin   from 'eslint-plugin-import';

export default defineConfig([

  // TypeScript recommendations
  ...tseslint.configs.strictTypeChecked,
  {
    files: ['./{src,bin}/**/*.{mts,ts,tsx,js}'],
    ignores: ['**/*.json', '**/*.md', '**/*.cjs', '**/*.mjs', './bin/__temp__'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
  },

  // Custom setup
  {
    plugins: {
      'unused-imports': unusedImports,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    rules: {
      'prettier/prettier': ['error', prettierConfig],

      'unused-imports/no-unused-imports': 'error',

      'arrow-body-style': 0,
      'prefer-arrow-callback': 0,
      'prefer-template': 2,
      'object-shorthand': ['error', 'always'],

      'no-console': 2,

      '@typescript-eslint/restrict-template-expressions': 0,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 0,
      '@typescript-eslint/no-misused-promises': 0,
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowNullableBoolean: true, // We do allow this
          allowNumber: false, // Prevents accidental `!0` checks
          allowString: false, // Prevents not handling empty strings correctly
        },
      ],
      '@typescript-eslint/no-unnecessary-type-conversion': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
          allowFunctionsWithoutTypeParameters: true,
          allowIIFEs: true,
        },
      ],
      '@typescript-eslint/no-unsafe-member-access': [
        'error',
        { allowOptionalChaining: true },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'import/export': 2, // No re-exporting the same name
      'import/no-mutable-exports': 2, // Disallow the export of non-constants
      'import/no-self-import': 2, // Prevent a module from importing itself
      'import/no-useless-path-segments': 2, // Prevent unnecessary path segments in import and require statements
    },
  },
  {
    files: ['*.config.ts', 'bin/**/*.ts'],
    rules: {
      'no-console': 0,
    },
  },
  // Test setup
  {
    files: ['src/**/*.test.ts'],
    rules: { '@typescript-eslint/no-unsafe-argument': 0 },
  },
]);
