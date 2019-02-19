// Karma configuration
// Generated on Sun Feb 17 2019 18:21:38 GMT+0800 (GMT+08:00)
const webpackConfig = require('../../build/webpack.test.config');

module.exports = function (config) {
  config.set({
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    frameworks: ['mocha', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: ['./index.js'],

    // list of files / patterns to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './index.js': ['webpack', 'sourcemap', 'coverage'],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },

    plugins: [
      // Preprocessors
      'karma-webpack',
      'karma-sourcemap-loader',

      // Test Libraries
      'karma-mocha',
      'karma-chai',
      'karma-sinon-chai',

      // Launchers
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',

      // Reporters
      'karma-spec-reporter',
      'karma-coverage',
    ],

    coverageReporter: {
      dir: './coverage',
      reporters: [
        // { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' },
      ],
    },
  });
};
