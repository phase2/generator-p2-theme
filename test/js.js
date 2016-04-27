'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-p2-theme:js', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/js'))
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'js/script.js'
    ]);
  });
});
