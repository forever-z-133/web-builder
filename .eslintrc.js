module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  parserOptions: {
    "ecmaVersion": 12,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  rules: {
    "semi": 2,
    // "no-param-reassign": 0,
    // "complexity": [2, 20],
    "arrow-parens": [2, "as-needed"],
    // "no-nested-ternary": 0,
    // "no-underscore-dangle": 0,
    // "no-restricted-properties": 0,
    "react/prop-types": [1, {
      "ignore": ["className", "ref", "style", "children", "history"]
    }],
    "linebreak-style": 0, // 兼容 windows 的换行与 mac 不同
    "indent": [2, 2, { "SwitchCase": 1 }],
    // "react/display-name": 0,
    // "no-plusplus": 1,
    // "no-unused-vars": 0,
    // "camelcase": 0,
    // "no-underscore-dangle": "off", // 允许 _var 命名
    // "prefer-destructuring": ["error", { array: false }], // 允许 arr[0]
    // "no-param-reassign": "off", // 允许修改形参的值
    // "complexity": ["error", 20],
    // "arrow-parens": [2, "as-needed"],
    // "no-nested-ternary": 0,
  },
};
