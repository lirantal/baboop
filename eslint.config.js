import pluginSecurity from 'eslint-plugin-security'
import neostandard, { resolveIgnoresFromGitignore, plugins } from 'neostandard'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  ...tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended
  ),
  ...neostandard({ ignores: resolveIgnoresFromGitignore() }),
  {
    files: [
      '**/*.ts',
      '**/*.js',
      '**.*.mjs',
    ],
    ignores: [
      '**/*.d.ts',
    ],
  },

  plugins.n.configs['flat/recommended-script'],
  pluginSecurity.configs.recommended,
  {
    rules: {
      'node/no-unsupported-features': 'off',
      'node/no-unpublished-require': 'off',
      'security/detect-non-literal-fs-filename': 'error',
      'security/detect-unsafe-regex': 'error',
      'security/detect-buffer-noassert': 'error',
      'security/detect-child-process': 'error',
      'security/detect-disable-mustache-escape': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-non-literal-regexp': 'error',
      'security/detect-object-injection': 'warn',
      'security/detect-possible-timing-attacks': 'error',
      'security/detect-pseudoRandomBytes': 'error',
    },
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
    },
  },
]
