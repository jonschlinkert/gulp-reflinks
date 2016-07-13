'use strict';

var reflinks = require('verb-reflinks');
var through = require('through2');

module.exports = function(options) {
  return through.obj(function(file, enc, next) {
    reflinks(options)(file, next);
  });
};
