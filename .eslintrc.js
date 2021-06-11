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
  parserOptions: {
    "ecmaVersion": 12,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  rules: {
    "semi": 2,
    "react/prop-types": [1, {
      "ignore": ["className", "style", "children", "history"]
    }],
    // "linebreak-style": "off", // 兼容 windows 的换行与 mac 不同
    // "react/display-name": 0,
    // "indent": ["error", 2],
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
