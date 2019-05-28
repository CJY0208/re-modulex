'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/ReModulex.min.js');
} else {
  module.exports = require('./dist/ReModulex.js');
}