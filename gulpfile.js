const gulp = require('gulp');
function magicUpperCaseConvert() {
	// ...
}

gulp.task('upper', () => {
	gulp.src('*.txt')
	.pipe(magicUpperCaseConvert())
	.pipe(gulp.dest('upper_files'));
});

gulp.task('watch', () => {
	gulp.watch('*.txt', ['upper']);
});

gulp.task('default', ['watch']);


