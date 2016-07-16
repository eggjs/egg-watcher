'use strict';

module.exports = function(app) {
  app.watcher = app.createAppWorkerClient('watcher', {

    watch(path, listener) {
      if (!path) return;

      if (Array.isArray(path)) {
        path.forEach(function(p) {
          this.watch(p, listener);
        }, this);
        return;
      }

      this._subscribe(path, listener);
      return;
    },

    unwatch(path, listener) {
      if (!path) return;

      if (Array.isArray(path)) {
        path.forEach(function(p) {
          this.unwatch(p, listener);
        }, this);
        return;
      }

      this._unSubscribe(path, listener);
    },

  }, app.config.watcher);
};
