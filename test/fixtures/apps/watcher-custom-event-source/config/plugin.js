'use strict';

const path = require('path');

exports['custom-event-source'] = {
  enable: true,
  path: path.join(__dirname, '../plugins/custom-event-source'),
};
