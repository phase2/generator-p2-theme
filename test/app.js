'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-p2-theme:app', function () {
  this.timeout(5000);
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '.gitignore',
      'bower.json',
      'gulpfile.js',
      'package.json',
      'README.md'
    ]);
  });
});
