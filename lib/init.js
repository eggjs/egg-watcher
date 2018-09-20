'use strict';

const Watcher = require('./watcher');

module.exports = appOrAgent => {
  const logger = appOrAgent.coreLogger;

  const watcher = appOrAgent.watcher = appOrAgent.cluster(Watcher)
    .delegate('watch', 'subscribe')
    .create(appOrAgent.config)
    .on('info', logger.info.bind(logger))
    .on('warn', logger.warn.bind(logger))
    .on('error', logger.error.bind(logger));

  appOrAgent.beforeStart(async () => {
    await watcher.ready();
    logger.info('[egg-watcher:%s] watcher start success', appOrAgent.type);
  });
};
