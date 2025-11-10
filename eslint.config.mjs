import { default as pluginJs } from '@eslint/js';
import tsEslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';

/** @import { Linter } from "eslint" */

/** @type {Linter.Config[]} */
const config = [
  { ignores: ['next.config.js', '.next/'] },
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
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
];
export default config;
