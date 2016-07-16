'use strict';

const Base = require('sdk-base');

class DefaultEventSource extends Base {

  constructor(agent) {
    super();

    this.logger = agent.logger;

    this.logger.warn('[egg-watcher] defaultEventSource watcher will NOT take effect');
    this.ready(true);
  }

  watch() {
    this.logger.warn('[egg-watcher] using defaultEventSource watcher.watch does NOTHING');
  }

  unwatch() {
    this.logger.warn('[egg-watcher] using defaultEventSource watcher.unwatch does NOTHING');
  }

}

module.exports = DefaultEventSource;
