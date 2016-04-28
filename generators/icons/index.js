'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.Base.extend({

  writing: function () {
    this.fs.copy(
      this.templatePath(),
      this.destinationRoot('images/icons/')
    );
  },

  install: function () {

  }
});
