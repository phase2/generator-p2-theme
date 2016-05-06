'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var options = {};

module.exports = yeoman.Base.extend({

  initializing: function () {
    options.themePath = '';
    options = _.assign(options, this.options);
  },

  writing: function () {
    // Copy all non-dotfiles
    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationRoot(),
      options
    );

    // Copy all dotfiles
    this.fs.copyTpl(
      this.templatePath('.*'),
      this.destinationRoot(),
      options
    );
  }
  
});
