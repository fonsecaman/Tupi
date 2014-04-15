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
          'docs/css/tupi.docs.css': 'src/less/themes/docs/theme.less'
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
      plugins: {
        src: [
          'bower_components/classie/classie.js'
        ],
        dest: 'dist/js/plugins.js'
      },
      bootstrap: {
        src: [
          'src/js/bootstrap/transition.js',
          'src/js/bootstrap/alert.js',
          'src/js/bootstrap/button.js',
          'src/js/bootstrap/carousel.js',
          'src/js/bootstrap/collapse.js',
          'src/js/bootstrap/dropdown.js',
          'src/js/bootstrap/modal.js',
          'src/js/bootstrap/tooltip.js',
          'src/js/bootstrap/popover.js',
          'src/js/bootstrap/scrollspy.js',
          'src/js/bootstrap/tab.js',
          'src/js/bootstrap/affix.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.bootstrap.js'
      },
      codrops: {
        src: [
          'src/js/codrops/navigator.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.codrops.js'
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
      plugins: {
        src: 'dist/js/plugins.js',
        dest: 'dist/js/plugins.min.js'
      },
      bootstrap: {
        src: 'dist/js/<%= pkg.name %>.bootstrap.js',
        dest: 'dist/js/<%= pkg.name %>.bootstrap.min.js'
      },
      codrops: {
        src: 'dist/js/<%= pkg.name %>.codrops.js',
        dest: 'dist/js/<%= pkg.name %>.codrops.min.js'
      },
      mainDocs: {
        src: 'docs/js/main.js',
        dest: 'docs/js/main.min.js'
      }
    },

    /************************************
     * grunt-contrib-copy
     * Copy files and folders to docs/ path
     ************************************/
    copy: {
      bootstrap: {
        expand: true,
        cwd: 'dist/js/',
        src: '*.min.js',
        dest: 'docs/js/'
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
      },
      javascripts: {
        files: '/src/js/**/*.js',
        tasks: ['dist-js'],
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
        commitFiles: ['package.json', 'bower.json', 'dist/', 'docs/css/', 'docs/js/'], // '-a' for all files
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

  // JS and CSS dist task
  grunt.registerTask('dist-css', ['less']);
  grunt.registerTask('dist-js', ['concat', 'uglify', 'copy']);
  grunt.registerTask('dist', ['dist-css', 'dist-js']);

  // Test task
  grunt.registerTask('test', ['jshint']);

  // Jekyll task
  grunt.registerTask('jekyll', ['shell:jekyll']);

  // Deploy task
  grunt.registerTask('deploy', ['shell:deployDocs']);

  // Default task
  grunt.registerTask('default', ['watch']);

};
