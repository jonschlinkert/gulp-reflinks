'use strict';

var debug = require('debug')('gulp-reflinks');
var reflinks = require('reflinks');
var through = require('through2');

/**
 * Lint a markdown string for missing reflinks and append them
 * to the end of the string.
 */

module.exports = function(options) {
  debug('initializing from <%s>', module.parent.id);
  options = options || [];

  var regex = /((?!`)\[[^\]]+\]\[\](?!`)|(?!`)\[[^\]]+\](?= |$))/g;
  var count = 0;
  var arr = [];

  if (Array.isArray(options.reflinks)) {
    arr = options.reflinks;
  }

  return through.obj(function(file, enc, next) {
    if (!file.isBuffer()) {
      next();
      return;
    }

    var str = file.contents.toString();
    var matches = str.match(regex);

    if (matches && matches.length) {
      matches.forEach(function(match) {
        var idx = match.indexOf(']');
        var name = match.slice(1, idx).trim().toLowerCase();
        if (name && arr.indexOf(name) === -1) {
          arr.push(name);
          count++;
        }
      });
    }

    debug('found %s missing reflink(s): %j', arr.length, arr);

    if (count === 0) {
      next(null, file);
      return;
    }

    file._reflinks = arr;

    reflinks(arr, options, function(err, links) {
      if (err) return next(err);

      links = links.filter(function(link) {
        return str.indexOf(link) === -1;
      });

      if (links.length === 0) {
        next(null, file);
        return;
      }

      str += '\n\n' + links.join('\n');
      file.contents = new Buffer(str);
      next(null, file);
    });
  });
};

