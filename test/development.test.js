'use strict';

const fs = require('fs');
const mm = require('egg-mock');
const assert = require('assert');
const sleep = require('mz-modules/sleep');
const utils = require('./utils');

const file_path1 = utils.getFilePath('apps/watcher-development-app/tmp.txt');
const file_path2 = utils.getFilePath('apps/watcher-development-app/tmp/tmp.txt');
const file_path1_agent = utils.getFilePath('apps/watcher-development-app/tmp-agent.txt');

describe('test/development.test.js', () => {
  let app;

  before(done => {
    app = mm.app({
      plugin: 'watcher',
      baseDir: 'apps/watcher-development-app',
    });
    app.ready(done);
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('should app watcher work', async () => {
    let count = 0;

    await app.httpRequest()
      .get('/app-watch')
      .expect(200)
      .expect('app watch success');


    await sleep(100);
    fs.writeFileSync(file_path1, 'aaa');
    await sleep(100);

    let res = await app.httpRequest()
      .get('/app-msg')
      .expect(200);

    let lastCount = count;
    count = parseInt(res.text);
    assert(count > lastCount);

    fs.writeFileSync(file_path2, 'aaa');
    await sleep(100);

    res = await app.httpRequest()
      .get('/app-msg')
      .expect(200);

    lastCount = count;
    count = parseInt(res.text);
    assert(count > lastCount);

    /*
    // TODO wait unsubscribe implementation of cluster-client
    await request(server)
      .get('/app-unwatch')
      .expect(200)
      .expect('app unwatch success');

    await sleep(100);
    fs.writeFileSync(file_path2, 'aaa');
    fs.writeFileSync(file_path1, 'aaa');
    await sleep(100);

    res = await request(server)
      .get('/app-msg')
      .expect(200);

    lastCount = count;
    count = parseInt(res.text);
    assert(count === lastCount);
    */
  });

  it('should agent watcher work', async () => {
    let count = 0;

    await app.httpRequest()
      .get('/agent-watch')
      .expect(200)
      .expect('agent watch success');

    await sleep(100);
    fs.writeFileSync(file_path1_agent, 'bbb');
    await sleep(100);

    const res = await app.httpRequest()
      .get('/agent-msg')
      .expect(200);

    const lastCount = count;
    count = parseInt(res.text);
    assert(count > lastCount);

    /*
    // TODO wait unsubscribe implementation of cluster-client
    await request(app.callback())
      .get('/agent-unwatch')
      .expect(200)
      .expect('agent unwatch success');

    await sleep(100);
    fs.writeFileSync(file_path1_agent, 'bbb');
    await sleep(100);

    res = await request(app.callback())
      .get('/agent-msg')
      .expect(200);

    lastCount = count;
    count = parseInt(res.text);
    assert(count === lastCount);
    */
  });
});
