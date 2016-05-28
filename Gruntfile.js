module.exports = function(grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		watch: {

			css: {
				files: ['css/**/*.css'],
				tasks: ['postcss']
			},

			js: {
				files: ['js/**/*.js'],
				tasks: ['jshint', 'uglify']
			}
		},

		jshint: {
			dist: ['js/**/*.js'],
			gruntfile: ['Gruntfile.js']
		},

		postcss: {
			options: {
				map: true,
				processors: [
					require('precss')(),
					require('autoprefixer')(),
					require('cssnano')()
				]
			},
			dist: {
				src: 'css/app.css',
				dest: 'dist/app.css'
			}
		},

		uglify: {
			dist: {
				options: {
					sourceMap: true
				},
				files: {
					'dist/twos.js': [
						'js/lib/format.js',
						'js/lib/conv.js',
						'js/lib/twoscomp.js',
						'js/twos.js'
					],
					'dist/hexconv.js': [
						'js/lib/format.js',
						'js/lib/conv.js',
						'js/hexconv.js'
					],
					'dist/floatconv.js': [
						'js/lib/conv.js',
						'js/lib/twoscomp.js',
						'js/floatconv.js'
					]
				}
			}
		},

		clean: {
			options: {
				force: true
			},
			dist: ['dist/']
		},

		copy: {
			bootstrap: {
				expand: true,
				flatten: true,
				cwd: 'bower_components/bootstrap/dist',
				src: '**/*.min.*',
				dest: 'dist'
			}
		}
	});

	grunt.registerTask('default', ['clean', 'postcss', 'jshint', 'uglify', 'copy']);
};
