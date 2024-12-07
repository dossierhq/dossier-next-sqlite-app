import { FlatCompat } from '@eslint/eslintrc';
import { default as js, default as pluginJs } from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tsEslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/** @import { Linter } from "eslint" */

/** @type {Linter.Config[]} */
const config = [
  { ignores: ['next.config.js', '.next/'] },
  ...compat.extends('next', 'next/core-web-vitals'),
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'local',
          args: 'after-used',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
];
export default config;
