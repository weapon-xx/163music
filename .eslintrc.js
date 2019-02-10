/**
 * eslint 配置文件
 *
 */

module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    isBrowser: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/airbnb',
  ],
  rules: {
    // 部分变量允许使用下划线开头和结尾定义变量（主要是因为__INITIAL_STATE__没法改）
    'no-underscore-dangle': ['error', {
      allow: [
        '__INITIAL_STATE__', // Vue同步状态
        '__VUE_SSR_CONTEXT__', // Vue服务端渲染context
      ],
    }],

    /**
         * 覆盖airbnb不允许对参数赋值的规则，可以对参数的属性进行修改
         *
         * @see https://github.com/airbnb/javascript/issues/1217
         * @see https://github.com/airbnb/javascript#functions--mutate-params
         */
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],

    // 函数嵌套层数，最大3层
    'max-nested-callbacks': ['error', 3],

    // 行最大字符数 150
    'max-len': [1, 150, 4]
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
