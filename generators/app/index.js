'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var myPrompts = require('./prompts.js');
var _ = require('lodash');
var options = {};

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.pkg = require('../../package.json');

    if (!this.options.skipWelcome) {
      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the remarkable ' + chalk.red('P2 Theme') + ' generator! ' + this.pkg.version + '\nPlease be in the folder you want files in now.'
      ));
    }
    options.themePath = '';
    options = _.assign(options, this.options);
  },

  prompting: function () {
    var done = this.async();
    var prompts = [];

    myPrompts.forEach(function (item) {
      if (_.isUndefined(options[item.name])) {
        prompts.push(item);
      }
    });

    this.prompt(prompts, function (props) {
      options = _.assign(options, props);
      done();
    });

    this.composeWith('p2-theme:css', {options: options}, {
      local: path.resolve(__dirname, '../css')
    });

    this.composeWith('p2-theme:js', {options: options}, {
      local: path.resolve(__dirname, '../js')
    });
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
  },

  install: function () {
    if (!options.skipDeps) {// testers may enjoy `yo p2-theme --skipDeps` for speed
      console.log('Running "npm install"...');
      this.npmInstall([
        'bower',
        'gulp',
        'gulp-help',
        'js-yaml',
        'lodash.merge',
        'p2-theme-core',
        'semver'
      ], {
        saveDev: true
      });
      // console.log('Running "composer install"...');
      // this.spawnCommandSync('composer', ['install'], {
      //   cwd: path.join(options.themePath, 'pattern-lab')
      // });
    }
  }

});
