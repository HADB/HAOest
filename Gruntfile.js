module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['src/screenfull.js', 'src/project.js', 'src/outro.js'],
                dest: 'dist/haoest.js',
            },
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/haoest.js',
                dest: 'dist/haoest.min.js'
            }
        },
        jshint: {
            files: ['gruntfile.js', 'src/*.js'],
            options: {
                jshintrc: '.jshintrc'
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify']);
};