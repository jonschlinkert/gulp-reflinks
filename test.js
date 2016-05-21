'use strict';

require('mocha');
var assert = require('assert');
var reflinks = require('./');

describe('gulp-reflinks', function() {
  it('should export a function', function() {
    assert.equal(typeof reflinks, 'function');
  });

  it('should export an object', function() {
    assert(reflinks);
    assert.equal(typeof reflinks, 'object');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      reflinks();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected first argument to be a string');
      assert.equal(err.message, 'expected callback to be a function');
      cb();
    }
  });
});
