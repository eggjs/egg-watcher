'use strict';

const Watcher = require('./lib/watcher');

module.exports = function(agent) {
  const done = agent.readyCallback('agent_watcher');
  const logger = agent.logger;
  const config = agent.config.watcher;

  agent.watcher = new Watcher(config)
    .on('error', function(e) {
      logger.error(e);
    });

  const type = config.type;
  if (!type) {
    throw new Error('config.watcher.type is required!');
  }

  try {
    const EventSource = require('./lib/event-sources/' + type);
    agent.watcher.useEventSource(new EventSource(agent));
  } catch (e) {
    // event source of type should be implemented
    // won't throw error any way, allow other plugin implement.
  }

  agent.startAgent({
    name: 'watcher',
    client: agent.watcher,
    subscribe(path, listener) {
      agent.watcher.watch(path, listener);
    },
  });

  agent.watcher.ready(() => {
    logger.info('[egg:watcher:agent] watcher start success');
    done();
  });
};
