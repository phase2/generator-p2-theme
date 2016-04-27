'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-p2-theme:css', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/css'))
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'scss/style.scss',
      '.sass-lint.yml'
    ]);
  });
});
