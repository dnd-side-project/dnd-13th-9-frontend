import storybook from 'eslint-plugin-storybook';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from 'eslint-plugin-import';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import nextPlugin from '@next/eslint-plugin-next';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      next: nextPlugin,
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'next/no-img-element': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      'prettier/prettier': 'error',
    },
  },
  ...storybook.configs['flat/recommended'],
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], ['internal'], ['sibling', 'parent'], ['index']],
          'newlines-between': 'always',
        },
      ],
    },
  },
];

export default eslintConfig;
