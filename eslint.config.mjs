import storybook from 'eslint-plugin-storybook';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import filenames from 'eslint-plugin-filenames';
import importPlugin from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    languageOptions: {
      parser: '@typescript-eslint/parser',
    },
    rules: {
      '@next/next/no-img-element': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
    },
  },
  ...storybook.configs['flat/recommended'],
  {
    plugins: {
      filenames,
      import: importPlugin,
    },
    rules: {
      'filenames/match-regex': ['error', '^[a-z0-9-]+$', true],
      'filenames/match-exported': ['error', 'pascalCase'],
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal'],
            ['sibling', 'parent'],
            ['index'],
          ],
          'newlines-between': 'always',
        },
      ],
    },
  },
  {
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
      'prettier/prettier': 'error',
    },
  },
];

export default eslintConfig;
