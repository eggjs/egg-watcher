'use strict';

const Watcher = require('./lib/watcher');

module.exports = agent => {
  const logger = agent.coreLogger;

  const watcher = agent.watcher = agent.cluster(Watcher)
    .delegate('watch', 'subscribe')
    .create(agent.config)
    .on('info', logger.info.bind(logger))
    .on('warn', logger.warn.bind(logger))
    .on('error', logger.error.bind(logger));

  agent.beforeStart(function* () {
    yield watcher.ready();
    logger.info('[egg-watcher:agent] watcher start success');
  });
};
