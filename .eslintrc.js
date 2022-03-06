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
    "arrow-parens": [2, "as-needed"],
    "react/prop-types": [1, {
      "ignore": ["className", "ref", "style", "children", "history"]
    }],
    "linebreak-style": 0, // 兼容 windows 的换行与 mac 不同
    "indent": [2, 2, { "SwitchCase": 1 }],
    "no-unused-vars": 0,
  },
};
