'use strict';

const Watcher = require('./lib/watcher');

module.exports = app => {
  const logger = app.coreLogger;
  const config = app.config.watcher;

  const watcher = app.watcher = app.cluster(Watcher)
      .delegate('watch', 'subscribe')
      .create(config)
      .on('error', e => logger.error(e));

  app.beforeStart(function* () {
    yield watcher.ready();
    logger.info('[egg-watcher:app] watcher start success');
  });
};
