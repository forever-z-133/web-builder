module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: ['plugin:react/recommended'],
  parserOptions: {
    "sourceType": "module"
  },
  rules: {
    // "indent": ["error", 2],
    // 'no-plusplus': 1,
    // 'no-unused-vars': 0,
    // 'camelcase': 0,
    // 'no-underscore-dangle': 'off', // 允许 _var 命名
    // 'prefer-destructuring': ['error', { array: false }], // 允许 arr[0]
    // 'no-param-reassign': 'off', // 允许修改形参的值
    // 'complexity': ['error', 20],
    // 'arrow-parens': [2, 'as-needed'],
    // 'no-nested-ternary': 0,
    'react/prop-types': 1,
    // 'react/display-name': 0,
    'linebreak-style': 'off', // 兼容 windows 的换行与 mac 不同
  },
};
