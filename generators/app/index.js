'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var request = require('request');
var chalk = require('chalk');
var updateNotifier = require('update-notifier');
var yaml = require('js-yaml');
var yosay = require('yosay');
var myPrompts = require('./prompts.js');
var _ = require('lodash');
var pkg = require('../../package.json');
var options = {};
var config = {};

module.exports = yeoman.Base.extend({
  initializing: function () {
    var done = this.async();
    this.pkg = pkg;

    // check for package updates
    updateNotifier({
      pkg
    }).notify({
      defer: false
    });

    request('https://raw.githubusercontent.com/phase2/p2-theme-core/master/config.default.yml', function (err, response, body) {
      if (!err && response.statusCode === 200 && body.length) {
        config = yaml.safeLoad(body);
        done();
      }
    });

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
    // console.log(1);
    // notifier.notify();
    // console.log(2);
    // console.log(notifier.update);
    // console.log(3);
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
      };
    }

    if (options.drupalDistro !== 'none') {
      this.composeWith('p2-theme:drupal-theme', {options: options}, {
        local: path.resolve(__dirname, '../drupal-theme')
      });
    }

    if (_.includes(options.themeFeatures, 'pl')) {
      config.patternLab.enabled = true;
      config.patternLab.src.root = 'pattern-lab';
      config.browserSync.enabled = true;
      config.browserSync.startPath = 'pattern-lab/public';
      this.composeWith('p2-theme:pl', {options: options}, {
        local: path.resolve(__dirname, '../pl')
      });
    } else {
      config.patternLab = {
        enabled: false
      };
    }

    if (_.includes(options.themeFeatures, 'icons')) {
      config.icons.enabled = true;
      config.icons.src = 'images/icons/src/*.svg';

      if (_.includes(options.themeFeatures, 'css')) {
        config.icons.templates.css = {
          src: 'images/icons/templates/_icons.scss',
          dest: 'scss/00-config/'
        };
      } else {
        delete config.icons.templates.css;
      }

      if (_.includes(options.themeFeatures, 'pl')) {
        config.icons.templates.demo = {
          src: 'images/icons/templates/icons.twig',
          dest: 'pattern-lab/source/_patterns/00-atoms/images/'
        };
      } else {
        delete config.icons.templates.pl;
      }

      this.composeWith('p2-theme:icons', {
        options: options,
        config: config
      }, {
        local: path.resolve(__dirname, '../icons')
      });
    } else {
      config.icons = {
        enabled: false
      };
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
    if (options.installDeps) {
      this.npmInstall();
    }
  },

  end: function () {
    if (!options.skipGoodbye) {
      this.log('\nAll done!\n' +
        'Run `' + chalk.red('npm start') + '` to begin!');
    }
  }

});
