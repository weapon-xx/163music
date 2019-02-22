const webpack = require('webpack');
const chalk = require('chalk');
const clientConfig = require('./webpack.client.config');
const serverConfig = require('./webpack.server.config');

const s = Date.now();
const { log } = console;
let clientStats; let
    serverStats;

log(chalk.green('Start building...'));

function handle(err, stats) {
    if (err) { throw err; }
    /**
   * @see https://webpack.docschina.org/configuration/stats/#src/components/Sidebar/Sidebar.jsx
   * stats config
   */
    process.stdout.write(stats.toString({
        colors: true,
        builtAt: true,
        errors: false,
        warnings: false,
        timings: true,
        performance: true,
        chunks: false,
        assets: true,
    }));
    log('');
    const result = stats.toJson();
    if (stats.hasErrors()) {
        log(chalk.red('ERROR: '));
        result.errors.forEach((error) => {
            log(chalk.red(error));
            log('--------');
        });
    }
    if (stats.hasWarnings()) {
        log(chalk.yellow('WARNING: '));
        result.warnings.forEach((warn) => {
            log(chalk.yellow(warn));
            log('--------');
        });
    }
}

function done() {
    if (clientStats && serverStats) {
        const time = clientStats.endTime > serverStats.endTime ? clientStats.endTime : serverStats.endTime;
        log(chalk.green(`Build successfully, whole time: ${(time - s) / 1000}s`));
    }
}

// client build
const clientCompiler = webpack(clientConfig);

clientCompiler.run((err, stats) => {
    clientStats = stats;
    handle(err, stats);
    done();
});

// server build
const serverCompiler = webpack(serverConfig);

serverCompiler.run((err, stats) => {
    serverStats = stats;
    handle(err, stats);
    done();
});
