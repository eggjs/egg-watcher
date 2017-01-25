'use strict';

const Base = require('sdk-base');

class CustomEventSource extends Base {

  constructor(/* options */) {
    super();
    this.ready(true);
  }

  watch(path) {
    this._h = setInterval(() => {
      this.emit('change', {
        path,
      });
    }, 1000);
  }

  unwatch() {
    if (this._h) {
      clearInterval(this._h);
    }
  }
}

module.exports = CustomEventSource;
