'use strict';

const Base = require('sdk-base');

class CustomEventSource extends Base {

  constructor(options) {
    super();
    this._options = options;
    this.ready(true);
  }

  watch(path) {
    this._h = setInterval(() => {
      this.emit('change', {
        path,
        foo: this._options.foo,
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
