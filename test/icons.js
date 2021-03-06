'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-p2-theme:icons', function () {
  this.timeout(5000);
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/icons'))
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'src/close.svg'
    ]);
  });
});
