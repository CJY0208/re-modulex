'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/reduxModule.min.js');
} else {
  module.exports = require('./dist/reduxModule.js');
}