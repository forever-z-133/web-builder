/* config-overrides.js */
const path = require('path');
const lodash = require('lodash');

module.exports = {
  webpack: config => {
    config.resolve.extensions = lodash.union(config.resolve.extensions, ['.scss']);
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  }
};
