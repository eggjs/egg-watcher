'use strict';

module.exports = function(agent) {
  if (agent.config.watcher.type === 'custom') {
    const CustomEventSource = require('./custom');
    const customEventSource = new CustomEventSource(agent);

    agent.beforeStart(function* () {
      yield customEventSource.ready();
      agent.watcher.useEventSource(customEventSource);
    });
  }
};
