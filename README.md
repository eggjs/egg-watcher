# egg-watcher
File watcher plugin for egg

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-watcher.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-watcher
[travis-image]: https://img.shields.io/travis/eggjs/egg-watcher.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-watcher
[codecov-image]: https://codecov.io/github/eggjs/egg-watcher/coverage.svg?branch=master
[codecov-url]: https://codecov.io/github/eggjs/egg-watcher?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-watcher.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-watcher
[snyk-image]: https://snyk.io/test/npm/egg-watcher/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-watcher
[download-image]: https://img.shields.io/npm/dm/egg-watcher.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-watcher

## Usage

In worker process:

### app.watcher.watch(path, listener)
Start watching file(s).

- path(String|Array): file path(s)
- listener(Function): file change callback

### app.watcher.unwatch(path[, listener])
Stop watching file(s).

- path(String|Array): file path(s)
- listener(Function): file change callback

In agent process:

### agent.watcher.watch(path, listener)
Start watching file(s).

- path(String|Array): file path(s)
- listener(Function): file change callback

### agent.watcher.unwatch(path[, listener])
Stop watching file(s).

- path(String|Array): file path(s)
- listener(Function): file change callback

## watch mode

[development mode](https://github.com/eggjs/egg-watcher/blob/master/lib/event-sources/development.js) is included.

### development Mode

When your app is running at local(env is `local`), it will be in `development mode`. Once local file is modified it will emit `change` event immediately.

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
