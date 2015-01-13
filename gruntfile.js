module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      front: {
        files: ['front/src/**/*'],
        tasks: ['build'],
        options: {
          livereload: true
        }
      },
      back: {
        files: ['back/**/*'],
        tasks: ['express:server:stop', 'build', 'express:server'],
        options: {
          spawn: false,
          livereload: true
        }
      }      
    },
    copy: {
      images: {
        files: [
          {
            expand: true,
            cwd: 'front/src/img/',
            src: ['**/*'],
            dest: 'front/dist/img/',
          }
        ]
      },
      fonts: {
        files: [
          {
            expand: true,
            cwd: 'front/src/fonts/',
            src: ['**/*'],
            dest: 'front/dist/fonts/',
          }
        ]
      },
      js: {
        files: [
          {
            expand: true,
            cwd: 'front/src/js/',
            src: ['**/*'],
            dest: 'front/dist/js/',
          }
        ]
      },
      html: {
        files: [
          {
            expand: true,
            cwd: 'front/src/',
            src: ['**/*.html'],
            dest: 'front/dist/',
          }
        ]
      }
    },
    less: {
      dist: {
        options: {
          cleancss: true
        },
        files: [
          {
            expand: true,
            cwd: 'front/src/less/',
            src: ['*.less'],
            dest: 'front/dist/css/',
            ext: '.css'
          }
        ]
      }
    },
    express: {
      server: {
        options: {
          script: 'back/run.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build', ['less', 'copy']);
  grunt.registerTask('run', ['express:server', 'watch']);
  grunt.registerTask('dev', ['less', 'copy', 'express:server', 'watch']);
  grunt.registerTask('default', ['less', 'copy', 'express:server', 'watch']);
};