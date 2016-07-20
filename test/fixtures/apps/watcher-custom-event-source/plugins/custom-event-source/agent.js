'use strict';

module.exports = function(agent) {
  if (agent.config.watcher.type === 'custom') {
    const CustomEventSource = require('./custom');
    const customEventSource = new CustomEventSource(agent);
    agent.watcher.useEventSource(customEventSource);
    customEventSource.ready(agent.readyCallback('alipay event source init'));
  }
};
