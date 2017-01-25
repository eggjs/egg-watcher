'use strict';

const fs = require('fs');
const mm = require('egg-mock');
const utils = require('./utils');
const assert = require('assert');
const sleep = require('ko-sleep');
const request = require('supertest');

const file_path1 = utils.getFilePath('apps/watcher-development-app/tmp.txt');
const file_path2 = utils.getFilePath('apps/watcher-development-app/tmp/tmp.txt');
const file_path1_agent = utils.getFilePath('apps/watcher-development-app/tmp-agent.txt');

describe('test/development.test.js', () => {
  let app;

  before(done => {
    app = mm.cluster({
      plugin: 'watcher',
      baseDir: 'apps/watcher-development-app',
    });
    app.ready(done);
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('should app watcher work', function* () {
    const server = app.callback();
    let count = 0;

    yield request(server)
      .get('/app-watch')
      .expect(200)
      .expect('app watch success');


    yield sleep(100);
    fs.writeFileSync(file_path1, 'aaa');
    yield sleep(100);

    let res = yield request(server)
      .get('/app-msg')
      .expect(200);

    let lastCount = count;
    count = parseInt(res.text);
    assert(count > lastCount);

    fs.writeFileSync(file_path2, 'aaa');
    yield sleep(100);

    res = yield request(server)
      .get('/app-msg')
      .expect(200);

    lastCount = count;
    count = parseInt(res.text);
    assert(count > lastCount);

    /*
    // TODO wait unsubscribe implementation of cluster-client
    yield request(server)
      .get('/app-unwatch')
      .expect(200)
      .expect('app unwatch success');

    yield sleep(100);
    fs.writeFileSync(file_path2, 'aaa');
    fs.writeFileSync(file_path1, 'aaa');
    yield sleep(100);

    res = yield request(server)
      .get('/app-msg')
      .expect(200);

    lastCount = count;
    count = parseInt(res.text);
    assert(count === lastCount);
    */
  });

  it('should agent watcher work', function* () {
    let count = 0;

    yield request(app.callback())
      .get('/agent-watch')
      .expect(200)
      .expect('agent watch success');

    yield sleep(100);
    fs.writeFileSync(file_path1_agent, 'bbb');
    yield sleep(100);

    const res = yield request(app.callback())
      .get('/agent-msg')
      .expect(200);

    const lastCount = count;
    count = parseInt(res.text);
    assert(count > lastCount);

    /*
    // TODO wait unsubscribe implementation of cluster-client
    yield request(app.callback())
      .get('/agent-unwatch')
      .expect(200)
      .expect('agent unwatch success');

    yield sleep(100);
    fs.writeFileSync(file_path1_agent, 'bbb');
    yield sleep(100);

    res = yield request(app.callback())
      .get('/agent-msg')
      .expect(200);

    lastCount = count;
    count = parseInt(res.text);
    assert(count === lastCount);
    */
  });
});
