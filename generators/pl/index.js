'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({

  writing: function () {
    console.log('Installing pattern-lab/edition-drupal-standard');
    this.spawnCommand('composer', [
      'create-project',
      'pattern-lab/edition-drupal-standard',
      'pattern-lab' // directory to place in
    ]);
  }

});
