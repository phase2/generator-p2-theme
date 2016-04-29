'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({

  writing: function () {
    this.spawnCommand('composer', [
      'create-project',
      'pattern-lab/edition-drupal-standard',
      'pattern-lab'
    ]);
  }

});
