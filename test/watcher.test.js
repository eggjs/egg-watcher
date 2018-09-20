'use strict';

const fs = require('fs');
const mm = require('egg-mock');
const assert = require('assert');
const pedding = require('pedding');

describe('test/watcher.test.js', () => {
  let app;

  afterEach(() => app && app.close());

  it('should warn user if config.watcher.type is default', async () => {
    app = mm.app({
      plugin: 'watcher',
      baseDir: 'apps/watcher-type-default',
    });
    await app.ready();
    const content = fs.readFileSync(__dirname + '/fixtures/apps/watcher-type-default/logs/watcher-type-default/egg-agent.log', 'utf8');
    assert(content.includes('defaultEventSource watcher will NOT take effect'));
  });

  it('should work if config.watcher.type is custom', done => {
    done = pedding(done, 2);
    app = mm.app({
      plugin: 'watcher',
      baseDir: 'apps/watcher-custom-event-source',
    });
    app.ready(() => {
      app.watcher.watch('xxxx', info => {
        assert(info.path === 'xxxx');

        // ensure use config.custom
        assert(info.foo === 'bar');

        const content = fs.readFileSync(__dirname + '/fixtures/apps/watcher-custom-event-source/logs/watcher-custom-event-source/egg-agent.log', 'utf8');
        assert(content.includes('warn12345'));
        assert(content.includes('info12345'));
        /*
        // TODO wait unsubscribe implementaion in cluster-client
        co(async () => {
          await app.watcher.unwatch('xxxx');
        })
        .then(done)
        .catch(e => done(e));
        */
        done();
      });

      app.watcher.watch('xxxx', info => {
        // watch again success
        assert(info.path === 'xxxx');
        done();
      });
    });
  });

  it('should work if config.watcher.type is custom(fuzzy)', done => {
    app = mm.app({
      plugin: 'watcher',
      baseDir: 'apps/watcher-custom-event-source-fuzzy',
    });
    app.ready(() => {
      app.watcher.watch([ '/home/admin/xxx' ], info => {
        assert(info.path === '/home/admin');

        // ensure use config.custom
        assert(info.foo === 'bar');

        const content = fs.readFileSync(__dirname + '/fixtures/apps/watcher-custom-event-source-fuzzy/logs/watcher-custom-event-source-fuzzy/egg-agent.log', 'utf8');
        assert(content.includes('warn12345'));
        assert(content.includes('info12345'));
        done();
      });
    });
  });
});
