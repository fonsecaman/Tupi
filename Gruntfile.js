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
      compileCore: {
        files: {
          'dist/css/tupi.css': 'src/less/build.less'
        }
      },
      compileDocs: {
        files: {
          'docs/css/tupi.docs.css': 'src/less/themes/docs.less'
        }
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          'dist/css/tupi.min.css': 'dist/css/tupi.css',
          'docs/css/tupi.docs.min.css': 'docs/css/tupi.docs.css'
        }
      }
    },

    /************************************
     * grunt-contrib-concat
     * Concatenate files
     ************************************/
    concat: {
      bootstrap: {
        src: [
          'src/js/transition.js',
          'src/js/alert.js',
          'src/js/button.js',
          'src/js/carousel.js',
          'src/js/collapse.js',
          'src/js/dropdown.js',
          'src/js/modal.js',
          'src/js/tooltip.js',
          'src/js/popover.js',
          'src/js/scrollspy.js',
          'src/js/tab.js',
          'src/js/affix.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    /************************************
     * grunt-contrib-uglify
     * Minify files
     ************************************/
    uglify: {
      options: {
        report: 'min'
      },
      bootstrap: {
        src: 'dist/js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },


    /************************************
     * grunt-contrib-jshint
     * Validate files with JSHint
     ************************************/
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'src/js/**/*.js']
    },

    /************************************
     * grunt-shell
     * Run shell commands
     ************************************/
    shell : {
      jekyll : {
        command : 'jekyll serve --baseurl "" --w'
      },
      deployDocs : {
        command: 'git subtree push --prefix docs/ origin gh-pages'
      }
    },

    /************************************
     * grunt-contrib-watch
     * Watch some files and tasks
     ************************************/
    watch: {
      html: {
        files: '/**/*.html',
        options: {
          livereload: true
        }
      },
      stylesheets: {
        files: '/src/less/**/*.less',
        tasks: ['less'],
        options: {
          livereload: true
        }
      }
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
        commitFiles: ['package.json', 'bower.json', 'dist/', 'docs/css/'], // '-a' for all files
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

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS dist task
  grunt.registerTask('dist-stylesheets', ['less']);

  // Default task
  grunt.registerTask('test', ['jshint']);

  // Use grunt-bump for changing version number
  grunt.loadNpmTasks('grunt-bump');

  // Deploy task
  grunt.registerTask('deploy', ['shell:deployDocs']);

  // Default task
  grunt.registerTask('default', ['dist-stylesheets', 'dist-js', 'shell:jekyll', 'watch']);

};
