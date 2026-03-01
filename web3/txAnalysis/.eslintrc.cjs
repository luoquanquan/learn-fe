module.exports = {
  root: false,
  extends: ['../../.eslintrc.js'],
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
      },
      rules: {}
    }
  ]
}
