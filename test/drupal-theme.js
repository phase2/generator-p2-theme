'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-p2-theme:drupal-theme', function () {
  describe('Drupal 7', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/drupal-theme'))
      .withOptions({
        drupalDistro: 'drupal',
        drupalDistroVersion: '7.x',
        themeName: 'testtheme',
        projectDescription: 'the theme'
      })
      .on('end', done);
    });

    it('creates files', function () {
      assert.file([
        'testtheme.info',
        'template.php'
      ]);
    });
  });

  describe('Drupal 8', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/drupal-theme'))
      .withOptions({
        drupalDistro: 'drupal',
        drupalDistroVersion: '8.x',
        themeName: 'testtheme',
        projectDescription: 'the theme'

      })
      .on('end', done);
    });

    it('creates files', function () {
      assert.file([
        'testtheme.info.yml',
        'testtheme.libraries.yml',
        'testtheme.theme'
      ]);
    });
  });

  describe('OpenAtrium on Drupal 7', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/drupal-theme'))
      .withOptions({
        drupalDistro: 'openatrium',
        drupalDistroVersion: '7.x',
        themeName: 'testtheme',
        projectDescription: 'the theme'

      })
      .on('end', done);
    });

    it('creates files', function () {
      assert.file([
        'testtheme.info'
      ]);
    });
  });
});
