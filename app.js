'use strict';

const Watcher = require('./lib/watcher');

module.exports = app => {
  const logger = app.coreLogger;

  const watcher = app.watcher = app.cluster(Watcher)
    .delegate('watch', 'subscribe')
    .create(app.config)
    .on('info', logger.info.bind(logger))
    .on('warn', logger.warn.bind(logger))
    .on('error', logger.error.bind(logger));

  app.beforeStart(function* () {
    yield watcher.ready();
    logger.info('[egg-watcher:app] watcher start success');
  });
};
