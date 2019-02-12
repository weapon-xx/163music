const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const IS_NODE = process.env.TARGET === 'node';

const config = {
  // 解决开发环境配置 host 而导致 'Invalid Host Header'
  devServer: {
    disableHostCheck: true,
  },
  configureWebpack: {
    // 将 entry 指向应用程序的 server / client 文件
    entry: IS_NODE ? './server/entry-server.js' : './src/entry-client.js',
    // 对 bundle renderer 提供 source map 支持
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
    extract: false    // 不分离单独 css 文件，防止 mini-css-extract-plugin 在插入样式文件时报错
  },
};

if(IS_NODE) {
  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // 外置化应用程序依赖模块。可以使服务器构建速度更快，并生成较小的 bundle 文件。
  config.configureWebpack.externals = nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/,
  });  
}

module.exports = config;
