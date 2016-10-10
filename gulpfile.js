var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    jshint = require('gulp-jshint'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require('browser-sync');

gulp.task('default', function() {

});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: ["app"],
            index: "index.html",
            routes: {
                "/bower_components": "bower_components",
                "/node_modules": "node_modules"
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

gulp.task('test', function() {
    browserSync.init({
        server: {
            baseDir: ["dist"],
            index: "index.html"
        }
    });

    console.log('## production server started ##');
});

gulp.task('minify-css', function() {
  return gulp.src(['bower_components/normalize-css/normalize.css',
                   'bower_components/angular-material/angular-material.min.css',
                   'bower_components/bootstrap/dist/css/bootstrap.min.css',
                   'bower_components/animate.css/animate.css',
                   'bower_components/font-awesome/css/font-awesome.min.css',
                   'bower_components/angular-ui-select/dist/select.min.css',
                   'app/styles/main.css',
                   'app/styles/layout.css',
                   'app/styles/spin-loader.css'])
    .pipe(concatCss('styles-1.0.3.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));

});

gulp.task('compress', function() {
  return gulp.src(['bower_components/jquery/dist/jquery.js',
                  'bower_components/angular/angular.js',
                  'bower_components/angular-animate/angular-animate.js',
                  'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                  'bower_components/bootstrap/dist/js/bootstrap.min.js',
                  'bower_components/angular-ui-router/release/angular-ui-router.js',
                  'bower_components/angular-ui-select/dist/select.min.js',
                  'bower_components/angular-material/angular-material.min.js',
                  'bower_components/angular-aria/angular-aria.min.js',
                  'bower_components/angular-md5/angular-md5.min.js',
                  'app/app.js',
                  'app/app.routes.js',
                  'app/app.config.js',
                  'app/js/controllers/*.js',
                  'app/js/directives/*.js',
                  'app/js/services/*.js'])
    .pipe(concat('scripts-1.0.2.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('pages', function() {
  gulp.src(['app/views/**/*'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/views'));
});

gulp.task('images', function() {
  gulp.src(['app/images/**/*'])
      .pipe(gulp.dest('dist/images'));
});

gulp.task('bootstrap', function() {
  gulp.src(['bower_components/bootstrap/dist/fonts/**/*'])
      .pipe(gulp.dest('dist/bootstrap/dist/fonts'));
});

gulp.task('fonts', function() {
  gulp.src(['bower_components/font-awesome/fonts/**/*'])
      .pipe(gulp.dest('dist/font-awesome/fonts'));
});

gulp.task('build', ['minify-css', 'compress', 'pages', 'images', 'bootstrap', 'fonts']);
