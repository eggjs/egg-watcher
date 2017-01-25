'use strict';

const fs = require('fs');
const mm = require('egg-mock');
const assert = require('assert');

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
      assert(content.includes('defaultEventSource watcher will NOT take effect'));
      done();
    });
  });

  it('should work if config.watcher.type is custom', done => {
    app = mm.app({
      plugin: 'watcher',
      baseDir: 'apps/watcher-custom-event-source',
    });
    app.ready(() => {
      app.watcher.watch('xxxx', info => {
        assert(info.path === 'xxxx');
        /*
        // TODO wait unsubscribe implementaion in cluster-client
        co(function* () {
          yield app.watcher.unwatch('xxxx');
        })
        .then(done)
        .catch(e => done(e));
        */
        done();
      });
    });
  });
});
