'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var request = require('request');
var chalk = require('chalk');
var yaml = require('js-yaml');
var yosay = require('yosay');
var myPrompts = require('./prompts.js');
var _ = require('lodash');
var options = {};
var config = {};

module.exports = yeoman.Base.extend({
  initializing: function () {
    var done = this.async();
    request('https://raw.githubusercontent.com/phase2/p2-theme-core/master/config.default.yml', function (err, response, body) {
      if (!err && response.statusCode === 200 && body.length) {
        config = yaml.safeLoad(body);
        done();
      }
    });

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

  },

  configuring: function () {
    if (_.includes(options.themeFeatures, 'css')) {
      config.css.enabled = true;
      config.css.src = [
        'scss/**/*.scss'
      ];
      this.composeWith('p2-theme:css', {options: options}, {
        local: path.resolve(__dirname, '../css')
      });
    } else {
      config.css = {
        enabled: false
      };
    }

    if (_.includes(options.themeFeatures, 'js')) {
      config.js.enabled = true;
      config.js.src = [
        'js/**/*.js'
      ];
      this.composeWith('p2-theme:js', {options: options}, {
        local: path.resolve(__dirname, '../js')
      });
    } else {
      config.js = {
        enabled: false
      }
    }

    if (_.includes(options.themeFeatures, 'pl')) {
      config.patternLab.enabled = true;
      this.composeWith('p2-theme:pl', {options: options}, {
        local: path.resolve(__dirname, '../pl')
      });
    } else {
      config.patternLab = {
        enabled: false
      }
    }
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

    this.fs.write(this.destinationPath('config.yml'), yaml.safeDump(config));
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
