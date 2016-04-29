'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({

  writing: function () {
    if (this.options.drupalDistro === 'drupal') {
      // Start Drupal 7
      if (this.options.drupalDistroVersion === '7.x') {
        this.fs.copyTpl(
          this.templatePath('drupal-7.x/theme.info'),
          this.destinationPath(this.options.themeName + '.info'),
          this.options
        );
        this.fs.copyTpl(
          this.templatePath('drupal-7.x/template.php'),
          this.destinationPath('template.php'),
          this.options
        );
        this.fs.copy(
          this.templatePath('drupal-7.x/screenshot.png'),
          this.destinationPath('screenshot.png')
        );
      }
      // End Drupal 7

      // Start Drupal 8
      if (this.options.drupalDistroVersion === '8.x') {
        this.fs.copyTpl(
          this.templatePath('drupal-8.x/theme.info.yml'),
          this.destinationPath(this.options.themeName + '.info.yml'),
          this.options
        );
        this.fs.copyTpl(
          this.templatePath('drupal-8.x/theme.libraries.yml'),
          this.destinationPath(this.options.themeName + '.libraries.yml'),
          this.options
        );
        this.fs.copyTpl(
          this.templatePath('drupal-8.x/theme.theme'),
          this.destinationPath(this.options.themeName + '.theme'),
          this.options
        );
        this.fs.copy(
          this.templatePath('drupal-8.x/screenshot.png'),
          this.destinationPath('screenshot.png')
        );
      }
      // End Drupal 8
    }
    if (this.options.drupalDistro === 'openatrium') {
      // Start OpenAtrium on Drupal 7
      if (this.options.drupalDistroVersion === '7.x') {
        this.fs.copyTpl(
          this.templatePath('openatrium-7.x/theme.info'),
          this.destinationPath(this.options.themeName + '.info'),
          this.options
        );
      }
      // End OpenAtrium on Drupal 7
    }
  }

});
