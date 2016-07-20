'use strict';

const path = require('path');
const fixtures = path.join(__dirname, 'fixtures');

exports.getFilePath = function(name) {
  return path.join(fixtures, name);
};
