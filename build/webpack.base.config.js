const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const inlineLimit = 4096;
const isProd = process.env.NODE_ENV === 'production';

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'hidden-source-map' : 'cheap-module-eval-source-map',
    output: {
        publicPath: '/dist/',
    },
    resolve: {
        extensions: ['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm', '.scss'],
        alias: {
            '@': resolve('src'),
            vue$: 'vue/dist/vue.runtime.esm.js',
        },
        modules: [
            'node_modules',
            resolve('node_modules'),
            resolve('node_modules/@vue/cli-service/node_modules'),
        ],
    },
    module: {
        noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false,
                    },
                },
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: inlineLimit,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[hash:8].[ext]',
                        },
                    },
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/i,
                loader: 'url-loader',
                options: {
                    limit: inlineLimit,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[hash:8].[ext]',
                        },
                    },
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: inlineLimit,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: 'media/[name].[hash:8].[ext]',
                        },
                    },
                },
            },
            {
                enforce: 'pre',
                test: /\.(vue|(j|t)sx?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            extensions: ['.js', '.vue'],
                            cache: true,
                            emitWarning: true,
                            emitError: false,
                        },
                    },
                ],
            },
        ],
    },
    /**
   * @see https://webpack.docschina.org/configuration/performance/#src/components/Sidebar/Sidebar.jsx
   */
    performance: {
    // maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false,
    },
    plugins: isProd
        ? [
            new VueLoaderPlugin(),
            /**
             * @see https://webpack.docschina.org/plugins/module-concatenation-plugin/#src/components/Sidebar/Sidebar.jsx
             */
            new webpack.optimize.ModuleConcatenationPlugin(),
        ]
        : [
            new VueLoaderPlugin(),
            new FriendlyErrorsPlugin(),
        ],
};
