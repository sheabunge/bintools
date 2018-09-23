'use strict';

import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import clean from 'gulp-clean';
import concat from 'gulp-concat';
import merge from 'merge-stream';

import postcss from 'gulp-postcss';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import eslint from 'gulp-eslint';

let browsersync = require('browser-sync').create();

const dest = 'dist';

gulp.task('css', () => {
	let processors = [
		precss(),
		autoprefixer(),
		cssnano()
	];

	const files = ['app', 'float'];

	let tasks = files.map((entry) => {
		return gulp.src('css/' + entry + '.css')
			.pipe(sourcemaps.init())
			.pipe(postcss(processors))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(dest))
			.pipe(browsersync.stream({match: '**/*.css'}));
	});

	return merge(tasks);
});

gulp.task('test-js', () => {

	const options = {
		parserOptions: {
			ecmaVersion: 6,
			sourceType: 'module'
		},
		extends: 'eslint:recommended',
		rules: {
			'quotes': ['error', 'single'],
			'linebreak-style': ['error', 'unix'],
			'eqeqeq': ['warn', 'always'],
			'indent': ['error', 'tab']
		}
	};

	return gulp.src(['*.js', 'js/**/*.js'])
		.pipe(eslint(options))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('js', gulp.series('test-js', () => {

	const files = ['twos', 'float', 'floatconv', 'hexconv'];

	const babel_options = {presets: ['@babel/preset-env'], sourceMaps: true};

	let tasks = files.map((entry) => {
		entry += '.js';
		return browserify({entries: 'js/' + entry, debug: true})
			.transform(babelify, babel_options)
			.bundle()
			.pipe(source(entry))
			.pipe(buffer())
			.pipe(sourcemaps.init())
			.pipe(uglify())
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(dest))
			.pipe(browsersync.stream({match: '**/*.js'}));
	});

	tasks.push(gulp.src(['node_modules/angular/angular.js','node_modules/angular-sanitize/angular-sanitize.js'])
		.pipe(concat('angular.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dest)));

	return merge(tasks);
}));

gulp.task('clean', () => {
	return gulp.src(dest, {read: false, allowEmpty: true})
		.pipe(clean());
});

gulp.task('test', gulp.parallel('test-js'));

gulp.task('default', gulp.series('clean', gulp.parallel('css', 'js')));

gulp.task('watch', gulp.series('default', (done) => {
	gulp.watch('css/**/*.css', gulp.series('css'));
	gulp.watch('js/**/*.js', gulp.series('js'));
	done();
}));

gulp.task('browsersync', gulp.series('watch', (done) => {

	browsersync.init({
		server: {
			baseDir: './'
		}
	});

	gulp.watch('*.html').on('change', browsersync.reload);
	done();
}));
