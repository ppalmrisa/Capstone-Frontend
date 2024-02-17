module.exports = {
  extends: ['mantine', 'plugin:@next/next/recommended'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)', '!postcss.config.cjs'],
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'import/order': [
      'error',
      {
        // groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
      },
    ],
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-duplicate-imports': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-param-reassign': 'off',
    'import/no-duplicates': ['error', { 'prefer-inline': true }],
    'import/export': 0,
    'consistent-return': 'off',
  },
};
