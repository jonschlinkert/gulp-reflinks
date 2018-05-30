'use strict';

require('mocha');
const assert = require('assert');
const vfs = require('vinyl-fs');
const reflinks = require('./');

describe('gulp-reflinks', function() {
  it('should export a function', function() {
    assert.equal(typeof reflinks, 'function');
  });

  it('should lint reflinks', function(cb) {
    var files = [];
    vfs.src('fixtures/missing.md')
      .pipe(reflinks())
      .on('data', function(file) {
        files.push(file);
      })
      .on('end', function() {
        assert.equal(files[0].contents.toString(), '[gulp][]\n\n[gulp]: http://gulpjs.com');
        cb();
      });
  });

  it('should not add reflinks that already exist', function(cb) {
    var files = [];
    vfs.src('fixtures/no-dupes.md')
      .pipe(reflinks())
      .on('data', function(file) {
        files.push(file);
      })
      .on('end', function() {
        assert.equal(files[0].contents.toString(), '[gulp][]\n\n[gulp]: http://gulpjs.com');
        cb();
      });
  });

  it('should lint compact reflinks', function(cb) {
    var files = [];
    vfs.src('fixtures/missing-compact.md')
      .pipe(reflinks())
      .on('data', function(file) {
        files.push(file);
      })
      .on('end', function() {
        assert.equal(files[0].contents.toString(), '[gulp]\n\n[gulp]: http://gulpjs.com');
        cb();
      });
  });

  it('should detect multiple missing reflinks', function(cb) {
    var files = [];
    vfs.src('fixtures/multiple.md')
      .pipe(reflinks())
      .on('data', function(file) {
        files.push(file);
      })
      .on('end', function() {
        assert.equal(files[0].contents.toString(), '[assemble][]\n[generate][]\n[verb][]\n\n[assemble]: https://github.com/assemble/assemble\n[generate]: https://github.com/generate/generate\n[verb]: https://github.com/verbose/verb');
        cb();
      });
  });

  it('should ignore reflinks in backticks', function(cb) {
    var files = [];
    vfs.src('fixtures/code.md')
      .pipe(reflinks())
      .on('data', function(file) {
        files.push(file);
      })
      .on('end', function() {
        assert(!/https/.test(files[0].contents.toString()));
        cb();
      });
  });

  it('should ignore reflinks with invalid characters', function(cb) {
    var files = [];
    vfs.src('fixtures/non-reflinks.md')
      .pipe(reflinks())
      .on('data', function(file) {
        files.push(file);
      })
      .on('end', function() {
        assert(!/https/.test(files[0].contents.toString()));
        cb();
      });
  });

  it('should set reflinks on `file._reflinks`', function(cb) {
    var files = [];
    vfs.src('fixtures/missing-compact.md')
      .pipe(reflinks())
      .on('data', function(file) {
        files.push(file);
      })
      .on('end', function() {
        assert.deepEqual(files[0]._reflinks, ['gulp']);
        assert.equal(files[0].contents.toString(), '[gulp]\n\n[gulp]: http://gulpjs.com');
        cb();
      });
  });

  it('should set multiple reflinks on `file._reflinks`', function(cb) {
    var files = [];
    vfs.src('fixtures/multiple.md')
      .pipe(reflinks())
      .on('data', function(file) {
        files.push(file);
      })
      .on('end', function() {
        assert.deepEqual(files[0]._reflinks, ['assemble', 'generate', 'verb']);
        cb();
      });
  });
});
