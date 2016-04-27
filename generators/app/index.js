'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the super-duper ' + chalk.red('p2-theme') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someAnswer;

      done();
    }.bind(this));
  },

  writing: function () {
    // Copy all non-dotfiles
    this.fs.copy(
      this.templatePath('**/*'),
      this.destinationRoot()
    );

    // Copy all dotfiles
    this.fs.copy(
      this.templatePath('.*'),
      this.destinationRoot()
    );
  },

  install: function () {
    // this.installDependencies();
  }
});
