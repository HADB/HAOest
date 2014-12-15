/* ========================================================================
 * HAOest
 * http://hadb.github.io/HAOest
 * ========================================================================
 * Copyright 2014 HADB.
 * Licensed under MIT (https://github.com/HADB/HAOest/blob/master/LICENSE)
 * ========================================================================*/

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {

            },
            dist: {
                src: [
                    'src/js/core.js',
                    'src/js/mobile.js',
                    'src/js/fullscreen.js'
                ],
                dest: 'dist/haoest.js',
            },
        },
        uglify: {
            options: {
                banner: '/*!\n' +
                        ' * HAOest v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
                        ' * Copyright 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                        ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
                        ' */\n',
            },
            build: {
                src: 'dist/haoest.js',
                dest: 'dist/haoest.min.js'
            }
        },
        jshint: {
            files: [
                'gruntfile.js',
                'src/js/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};