const path = require('path');

const { devServer } = require('./webpack/dev-server');
const { resolve, paths, rules, plugins, optimization, IS_DEPLOYED } = require('./webpack/config');

const config = {
  mode: IS_DEPLOYED ? 'production' : 'development',
  entry: ['babel-polyfill', 'whatwg-fetch', path.join(paths.source, 'main.js')],
  output: {
    filename: '[name].[chunkhash].js',
    path: paths.build,
    publicPath: '/',
  },
  plugins,
  devtool: IS_DEPLOYED ? false : 'source-map',
  optimization,
  module: { rules },
  performance: { hints: false },
  resolve,
};

if (!IS_DEPLOYED) {
  config.devServer = devServer;
}

module.exports = config;
