module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true
  },
  extends: 'standard-with-typescript',
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: [
      './tsconfig.json'
    ]
  },
  rules: {
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/method-signature-style': 0,
    'no-new': 0
  }
}
