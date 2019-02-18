const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const webpack = require('webpack');

const webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  devtool: '#inline-source-map',
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"testing"',
      'process.env.VUE_ENV': '"client"'
    }),
  ],
});

// no need for app entry during tests
delete webpackConfig.entry;

module.exports = webpackConfig;

