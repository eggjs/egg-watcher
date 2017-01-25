'use strict';

const Watcher = require('./lib/watcher');

module.exports = agent => {
  const logger = agent.coreLogger;
  const config = agent.config.watcher;
  config.logger = agent.coreLogger;

  const watcher = agent.watcher = agent.cluster(Watcher)
    .delegate('watch', 'subscribe')
    .create(config)
    .on('error', e => logger.error(e));

  agent.beforeStart(function* () {
    yield watcher.ready();
    logger.info('[egg-watcher:agent] watcher start success');
  });
};
