/* eslint-disable import/no-extraneous-dependencies */
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const paths = {
  source: path.resolve(__dirname, '../app'),
  build: path.resolve(__dirname, '../static'),
};

const NODE_ENV = process.env.NODE_ENV || 'local';
const IS_DEVELOPMENT = NODE_ENV === 'development';
const IS_PRODUCTION = NODE_ENV === 'production';
const IS_STAGING = NODE_ENV === 'staging';


let API_URL = 'http://localhost:3000/v1';

const IS_DEPLOYED = IS_PRODUCTION || IS_STAGING || IS_DEVELOPMENT;

if (IS_PRODUCTION) {

} else if (IS_STAGING) {

} else {
  API_URL = 'http://localhost:3000/v1';
}

// ----------
// PLUGINS
// ----------

// Shared plugins
const definePluginConfig = {
  // Injects env variables to our app
  'process.env': {
    NODE_ENV: JSON.stringify(IS_DEPLOYED ? 'production' : 'development'),
  },
  API_URL: JSON.stringify(API_URL),
};

const plugins = [
  new CleanWebpackPlugin([
    path.join(paths.build, '*.js'),
    path.join(paths.build, '*.js.map'),
    path.join(paths.build, '*.js.gz'),
    path.join(paths.build, '*.js.map.gz'),
    path.join(paths.build, 'index.html'),
  ], { root: paths.build }),
];

plugins.push(new webpack.DefinePlugin(definePluginConfig));

plugins.push(new HtmlWebpackPlugin({
  title: 'Remote Legal',
  template: path.join(paths.build, 'template.html'),
  filename: path.join(paths.build, 'index.html'),
}));

const rules = [{
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    presets: ['env', 'react', 'stage-2'],
  },
}, {
  test: /\.css$/,
  exclude: /node_modules/,
  use: ['style-loader', 'css-loader?url=false'],
}, {
  // Preprocess our own .scss files
  test: /\.scss$/,
  exclude: /node_modules/,
  use: ['style-loader', 'css-loader?url=false', 'sass-loader'],
},
{
  // Preprocess 3rd party .css files located in node_modules
  test: /\.css$/,
  include: /node_modules/,
  use: ['style-loader', 'css-loader?url=false'],
}, {
  test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
  use: 'url-loader?limit=10000',
}];

const minimizer = [
  new UglifyJsPlugin({
    parallel: true,
    cache: true,
    uglifyOptions: {
      // TODO: inlining is broken sometimes where inlined function uses the same variable name as inlining function.
      // See https://github.com/mishoo/UglifyJS2/issues/2842, https://github.com/mishoo/UglifyJS2/issues/2843,
      // https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/264
      compress: { inline: false },
    },
  }),
];

const optimization = {
  runtimeChunk: {
    name: 'manifest',
  },
};

if (IS_PRODUCTION || IS_STAGING) {
  optimization.minimizer = minimizer;
} else {
  optimization.minimize = false;
}

const resolve = {
  alias: {
    '~': path.resolve(__dirname, '..', 'app'),
    static: path.resolve(__dirname, '../static/'),
  },
};

module.exports = {
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  IS_DEPLOYED,
  IS_STAGING,
  NODE_ENV,
  paths,
  plugins,
  rules,
  optimization,
  resolve,
};
