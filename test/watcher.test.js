'use strict';

require('should');
const mm = require('egg-mock');
const fs = require('fs');

describe('test/watcher.test.js', () => {
  let app;

  afterEach(() => {
    app && app.close();
  });

  it('should warn user if config.watcher.type is default', done => {
    app = mm.cluster({
      plugin: 'watcher',
      baseDir: 'apps/watcher-type-default',
    });
    app.ready(() => {
      const content = fs.readFileSync(__dirname + '/fixtures/apps/watcher-type-default/logs/watcher-type-default/egg-agent.log').toString();
      content.should.containEql('defaultEventSource watcher will NOT take effect');
      done();
    });
  });

  it('should warn user if config.watcher.type is custom', done => {
    const app = mm.app({
      plugin: 'watcher',
      baseDir: 'apps/watcher-custom-event-source',
    });
    app.ready(() => {
      app.watcher.watch('xxxx', info => {
        info.path.should.equal('xxxx');
        app.watcher.unwatch();
        done();
      });
    });
  });
});
