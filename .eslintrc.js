/**
 * eslint config
 *
 */

module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    // 
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'airbnb',
  ],
  rules: {
    // 4 space indent
    // 'indent': ['error', 4],

    // max character in single line
    'max-len': [1, 150, 4],

    // allow console
    'no-console': 0,

    // allow debugger in development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // allow alert in development
    'no-alert':  process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // max nest callback 3
    'max-nested-callbacks': ['error', 3],

    // allow underscore variable
    // such as: __INITIAL_STATE__, __VUE_SSR_CONTEXT__
    'no-underscore-dangle': ['error', {
      allow: [
        '__INITIAL_STATE__',
        '__VUE_SSR_CONTEXT__',
      ],
    }],

    // allow modify param property
    'no-param-reassign': ['error', { 'props': false }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
