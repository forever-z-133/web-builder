/* config-overrides.js */

const path = require('path');

module.exports = {
  webpack: function (config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    const commonScssPrependString = '@import "@/styles/mixins.scss"; @import "@/styles/variables.scss";';
    config.module.rules[1].oneOf[6].use[4].options.additionalData = commonScssPrependString;
    config.module.rules[1].oneOf[7].use[4].options.additionalData = commonScssPrependString;
    return config;
  }
};
