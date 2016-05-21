/*!
 * gulp-reflinks (https://github.com/jonschlinkert/gulp-reflinks)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var debug = require('debug')('gulp-reflinks');

module.exports = function(config) {
  return function(app) {
    if (this.isRegistered('gulp-reflinks')) return;
    debug('initializing "%s", from "%s"', __filename, module.parent.id);

    this.define('reflinks', function() {
      debug('running reflinks');
      
    });
  };
};
