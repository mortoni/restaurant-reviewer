var gulp = require('gulp'),
    jshint = require('gulp-jshint');
    browserSync = require('browser-sync');

gulp.task('default', function() {

});

gulp.task('server:dev', function() {
    browserSync.init({
        server: {
            baseDir: ["app"],
            index: "index.html",
            routes: {
                "/bower_components": "bower_components"
            }
        },
        browser: "google chrome canary"
    });

    console.log('## server started ##');

    gulp.watch('app/**/*').on('change', browserSync.reload);

    gulp.watch('app/**/*.js').on('change', function(event) {
        console.log("Linting " + event.path);
        gulp.src(event.path)
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'));
    });
});

gulp.task('server:dist', function() {
    browserSync.init({
        server: {
            baseDir: ["dist"],
            index: "index.html"
        }
    });

    console.log('## production server started ##');
});
