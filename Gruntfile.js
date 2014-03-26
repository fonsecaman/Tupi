// Gruntfile.js
//
//

module.exports = function (grunt) {
  'use strict';

  // Project configuration
  grunt.initConfig({

    // Metadata
    pkg: grunt.file.readJSON('package.json'),

    /************************************
     * grunt-contrib-less
     * LESS Task, compile and minify stylesheets
     ************************************/
    less: {
      compile: {
        files: {
          'dist/css/tupi.css': 'src/less/build.less'
        }
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          'dist/css/tupi.min.css': 'dist/css/tupi.css'
        }
      }
    },


    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'src/js/**/*.js']
    },

    /************************************
     * grunt-bump
     * Bump package version, create tag, commit, push...
     ************************************/
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: '%VERSION%',
        commitFiles: ['package.json', 'bower.json', 'dist/'], // '-a' for all files
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: '%VERSION%',
        push: true,
        pushTo: 'master',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
      }
    }

  });


  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // CSS dist task
  grunt.registerTask('dist-stylesheets', ['less']);

  // load jshint task
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task
  grunt.registerTask('test', ['jshint']);

  // Use grunt-bump for changing version number
  grunt.loadNpmTasks('grunt-bump');

  // Default task
  grunt.registerTask('default', ['dist-stylesheets', 'test']);

};
