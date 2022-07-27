/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

// 引用文件别名
const webpackAlias = config => {
  config.resolve.alias['@'] = path.resolve(__dirname, 'src');
};

// 注入全局样式
const webpackScssPrepend = config => {
  const commonScssPrependString = '@import "@/styles/mixins.scss"; @import "@/styles/variables.scss";';
  config.module.rules[1].oneOf[7].use[4].options.additionalData = commonScssPrependString;
  config.module.rules[1].oneOf[8].use[4].options.additionalData = commonScssPrependString;
};

module.exports = {
  webpack(config) {
    webpackAlias(config); // 引用文件别名
    webpackScssPrepend(config); // 注入全局样式
    return config;
  }
};
