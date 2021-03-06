const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const stripCssComments = require('gulp-strip-css-comments');
const autoprefixer = require('gulp-autoprefixer');


const child = require('child_process');
const gutil = require('gulp-util');

const browserSync = require('browser-sync').create();
const siteRoot = '_site';

const cssFiles = '_sass/**/*.?(s)css';

gulp.task('css', () => {
	gulp.src(cssFiles)
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		            cascade: false
		}))
	.pipe(concat('style.min.css'))
	.pipe(stripCssComments({ all: true }))
	.pipe(cssmin())
	.pipe(gulp.dest('assets'))
});

gulp.task('jekyll', () => {
	const jekyll = child.spawn('bundle', ['exec', 
	'jekyll',
	'build',
	'--watch',
	'--incremental',
	'--drafts'
	]);

	const jekyllLogger = (buffer) => {
		buffer.toString()
		.split(/\n/)
		.forEach((message) => gutil.log('jekyll: ' + message));

		jekyll.stdout.on('data', jekyllLogger);
		jekyll.stderr.on('data', jekyllLogger);
	};
});

gulp.task('serve', () => {
	browserSync.init({
		files: [siteRoot + '/**'],
		port: 4000,
		server: {
			baseDir: siteRoot
		}
	});

	gulp.watch(cssFiles, ['css']);
});

gulp.task('default', ['css', 'jekyll', 'generate-service-worker', 'serve']);

gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');

  swPrecache.write('service-worker.js', {
    staticFileGlobs: [siteRoot + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
    stripPrefix: siteRoot
  }, callback);
});
