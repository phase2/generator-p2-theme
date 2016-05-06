'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({

  writing: function () {
    this.fs.copy(
      this.templatePath(),
      this.destinationRoot('images/icons/')
    );
  }

});
