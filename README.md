# gulp-reflinks [![NPM version](https://img.shields.io/npm/v/gulp-reflinks.svg?style=flat)](https://www.npmjs.com/package/gulp-reflinks) [![NPM downloads](https://img.shields.io/npm/dm/gulp-reflinks.svg?style=flat)](https://npmjs.org/package/gulp-reflinks) [![Build Status](https://img.shields.io/travis/jonschlinkert/gulp-reflinks.svg?style=flat)](https://travis-ci.org/jonschlinkert/gulp-reflinks)

Gulp plugin that lints a markdown string to find missing reflinks for npm package names, resolves the homepage or repository url from npm, and appends a valid reflink to the document.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install gulp-reflinks --save
```

## Usage

**What does this do?**

* Finds reflinks like `[gulp][]` or `[gulp]`
* Resolves the `homepage` or `repository.url` from npm
* Appends `[gulp]: http://gulpjs.com` to the markdown string
* Does not add (duplicate) reflinks that already exist in the document

**Must be a valid npm name**

For reflinks to be fixed, the reflink text must match the name of a valid npm package. For example `[Foo Bar][]` won't be fixed, but `[gulp][]` would.

```js
var gulp = require('gulp');
var reflinks = require('gulp-reflinks');

gulp.task('default', function() {
  return gulp.src('*.md')
    .pipe(reflinks())
    .pipe(gulp.dest('dist/'));
});
```

## Related projects

You might also be interested in these projects:

* [helper-reflinks](https://www.npmjs.com/package/helper-reflinks): Async template helper for generating a list of markdown reference links. | [homepage](https://github.com/helpers/helper-reflinks)
* [reflinks](https://www.npmjs.com/package/reflinks): Generate (relative) reference links for a glob of markdown files, allowing you to more easily… [more](https://www.npmjs.com/package/reflinks) | [homepage](https://github.com/jonschlinkert/reflinks)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/gulp-reflinks/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/gulp-reflinks/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on May 21, 2016._