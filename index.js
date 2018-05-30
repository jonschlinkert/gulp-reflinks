'use strict';

const reflinks = require('verb-reflinks');
const through = require('through2');

module.exports = options => {
  const fn = reflinks(options);
  return through.obj((file, enc, next) => {
    if (file.isNull()) {
      next(null, file);
      return;
    }
    fn(file, next);
  });
};
