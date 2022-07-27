module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    'jest'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  settings: {
    react: {
      version: 'detect',
    }
  },
  rules: {
    semi: 2, // 结尾分号
    quotes: [2, 'single'], // 全部用单引号
    indent: [2, 2, { SwitchCase: 1 }], // 缩进
    'quote-props': [2, 'as-needed'], // 对象键的引号
    'no-multi-spaces': 2, // 无多余空格
    'no-trailing-spaces': 2, // 尾部无空格
    'no-unused-vars': 0, // 未使用的变量
    '@typescript-eslint/no-unused-vars': 1,
    'eol-last': 2, // 尾部空行
    'arrow-parens': [2, 'as-needed'], // 单个参数省略括号
    'no-empty': [2, { allowEmptyCatch: true }], // 无意义空白
    '@typescript-eslint/no-empty-function': 0,
    'object-shorthand': 2, // 对象缩写
    'no-param-reassign': 0, // 允许修改形参的值
    'react/prop-types': [1, {
      ignore: ['className', 'style', 'children', 'history', 'ref'],
    }],
    '@typescript-eslint/no-explicit-any': 0, // 允许 ts any
    '@typescript-eslint/ban-ts-comment': 0, // 允许 @ts-ignore
  },
};
