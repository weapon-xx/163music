const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const IS_NODE = process.env.TARGET === 'node';
const IS_DEV = process.env.NODE_ENV === 'dev';

const config = {
  // 解决开发环境配置 host 而导致 'Invalid Host Header'
  devServer: {
    disableHostCheck: true,
  },
  configureWebpack: {
    entry: IS_NODE ? './server/entry-server.js' : './src/entry-client.js',
    devtool: 'source-map',
    target: IS_NODE ? 'node' : 'web',
    node: IS_NODE ? undefined : false,
    output: {
      libraryTarget: IS_NODE ? 'commonjs2' : undefined,
    },
    plugins: [
      IS_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin(),
      new webpack.DefinePlugin({
        isBrowser: typeof document === 'object',
      }),
    ],
  },
  css: {
    // https://github.com/vuejs/vue-ssr-docs/issues/196
    // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/90#issuecomment-380796867
    // fix mini-css-extract-plugin bug - document is not defined
    extract: false,
  },
};

if (IS_NODE) {
  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  config.configureWebpack.externals = nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/,
  });
}

module.exports = config;
