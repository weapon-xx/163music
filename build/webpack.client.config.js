const webpack = require('webpack');
const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const path = require('path');
const base = require('./webpack.base.config');

const clientConfig = merge(base, {
  target: 'web',
  entry: {
    app: './src/entry-client.js',
  },
  output: {
    path: path.resolve('dist'),
    filename: 'js/[name].[hash:8].bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
});

module.exports = clientConfig;
