'use strict';
var _ = require('lodash');

module.exports = [
  {
    name: 'themeName',
    message: 'What would you like to name the theme?',
    default: _.last(process.cwd().split('/')),
    filter: function (response) {
      return response.replace(/[ |-]/g, '_');
    }
  },
  {
    name: 'drupalDistro',
    message: 'What distribution of Drupal is installed?',
    type: 'list',
    default: 'drupal',
    choices: [
      'drupal',
      'openatrium',
      'none'
    ]
  },
  {
    name: 'drupalDistroVersion',
    message: 'What version of Drupal is installed?',
    type: 'list',
    default: '7.x',
    when: function (response) {
      return response.drupalDistro !== 'none';
    },
    choices: [
      '7.x',
      '8.x'
    ]
  },
  {
    name: 'projectDescription',
    message: 'Description of project?'
  },
  {
    name: 'themeFeatures',
    message: 'What features would you like enabled in the theme?',
    type: 'checkbox',
    choices: [
      {
        name: 'Scss Compiling',
        value: 'css',
        checked: true
      }, {
        name: 'JS Compiling with Babel',
        value: 'js',
        checked: true
      }, {
        name: 'Pattern Lab',
        value: 'pl',
        checked: true
      }, {
        name: 'Icon System (SVGs => Font Icons)',
        value: 'icons',
        checked: true
      }
    ]
  },
  {
    name: 'installDeps',
    message: 'Want to install dependencies afterwards?',
    type: 'confirm'
  }
];
