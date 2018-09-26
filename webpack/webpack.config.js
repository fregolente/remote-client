import path from 'path';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';

process.noDeprecation = true;
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

const rootFolder = path.resolve(__dirname, '..');
const config = {
  context: rootFolder,
  mode: 'none',
  entry: {
    main: './src/client'
  },
  output: {
    path: path.resolve(rootFolder, 'static/assets'),
    publicPath: '/assets/',
    chunkFilename: '[name].bundle.js',
    filename: '[name].[hash].js'
  },
  cache: true,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        exclude: [/node_modules/],
        loader: 'eslint-loader',
        options: {
          quiet: true,
        }
      },
      {
        test: /\.js?$/,
        exclude: [/node_modules/, /webpack/],
        use: 'happypack/loader?id=js',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        use: 'url-loader?limit=10000'
      },
      {
        test: /\.(eot|ttf)$/,
        use: 'file-loader'
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options:
          {
            sourceMap: false,
            importLoaders: 2,
            modules: true,
            localIdentName: '[local]__[hash:base64:5]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: false
          }
        },
        {
          loader: 'sass-loader',
          options: {
            outputStyle: 'expanded',
            sourceMap: false
          }
        }],
      },
      {
        test: /\.(css)$/,
        use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            sourceMap: false
          }
        },
        {
          loader: 'postcss-loader'
        }]
      },
      {
        test: /\.md$/,
        use: 'raw-loader'
      }
    ]
  },

  plugins: [
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory=true']
    }),
    new Dotenv({
      systemvars: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  resolve: {
    extensions: ['*', '.js'],
    // modules: ['src', 'node_modules'],
    alias: {
      'ba-components': path.resolve(__dirname, '../src/app/styles/components/'),
      'ba-helpers': path.resolve(__dirname, '../src/app/styles/helpers/'),
      'ba-utils': path.resolve(__dirname, '../src/app/utils/'),
      'ba-images': path.resolve(__dirname, '../static/images/'),
      'ba-vendor': path.resolve(__dirname, '../node_modules/'),
    }
  }
};

export default config;
