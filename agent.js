'use strict';

const Watcher = require('./lib/watcher');

module.exports = agent => {
  const logger = agent.coreLogger;
  const config = agent.config.watcher;
  const type = config.type;

  const watcher = agent.watcher = agent.cluster(Watcher)
    .delegate('watch', 'subscribe')
    .delegate('useEventSource')
    .create(config)
    .on('error', e => logger.error(e));

  try {
    const EventSource = require('./lib/event-sources/' + type);
    watcher.useEventSource(new EventSource(agent));
  } catch (e) {
    // event source of type should be implemented
    // won't throw error any way, allow other plugin implement.
  }

  agent.beforeStart(function* () {
    yield watcher.ready();
    logger.info('[egg-watcher:agent] watcher start success');
  });
};
