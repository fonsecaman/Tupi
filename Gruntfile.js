// Gruntfile.js
//
//

module.exports = function (grunt) {
  'use strict';

  // Project configuration
  grunt.initConfig({

    // Metadata
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'src/js/**/*.js']
    }

  });


  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // load jshint task
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task
  grunt.registerTask('test', ['jshint']);

  // Default task
  grunt.registerTask('default', ['test']);

};
