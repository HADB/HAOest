/* ========================================================================
 * HAOest: Gruntfile.js
 * ========================================================================*/

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner: '/*\n' +
                ' * HAOest v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
                ' * Copyright 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
                ' */\n',

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            build: [
                'gruntfile.js',
                'src/js/*.js'
            ],
        },

        concat: {
            options: {
                banner: '<%= banner %>\n'
            },
            js: {
                src: [
                    'src/js/core.js',
                    'src/js/browser.js',
                    'src/js/fullscreen.js'
                ],
                dest: 'dist/js/haoest.js'
            },
            css: {
                src: [
                    'src/css/animation.css'
                ],
                dest: 'dist/css/haoest.css'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            build: {
                src: 'dist/js/haoest.js',
                dest: 'dist/js/haoest.min.js'
            }
        },

        cssmin: {
            options: {
                banner: '<%= banner %>'
            },
            build: {
                src: 'dist/css/haoest.css',
                dest: 'dist/css/haoest.min.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-css');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin']);
};