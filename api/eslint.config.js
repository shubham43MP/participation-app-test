import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
  ...tseslint.config({
    files: ['**/*.ts'],
    extends: [...tseslint.configs.recommended, prettier],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
  }),
];
