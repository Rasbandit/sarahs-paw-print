const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const annotate = require('gulp-ng-annotate');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cssmin = require('gulp-cssmin');
const htmlmin = require('gulp-htmlmin');
const plumber = require('gulp-plumber');

const paths = {
    jsSource: ['./public/js/**/*.js'],
    sassSource: ['./public/styles/**/*.scss'],
    indexSource: ['./public/index.html'],
    viewsSource: ['./public/views/**/*.html'],
    picturesSource: ['./public/pictures/**/*']
};

gulp.task('sass', function() {
    return gulp.src(paths.sassSource)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('bundle.css'))
        .pipe(cssmin())
        .pipe(rename({extname: ".min.css"}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
    return gulp.src(paths.jsSource)
        .pipe(plumber())
        .pipe(annotate())
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(rename({extname: ".min.js"}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('views', function() {
    gulp.src(paths.viewsSource)
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest("./dist/views"));
});

gulp.task('index', function() {
    gulp.src(paths.indexSource)
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest("./dist"));
});

gulp.task('pictures', function() {
    gulp.src(paths.picturesSource)
      .pipe(gulp.dest("./dist/pictures"));
});

gulp.task('watch', function() {
    gulp.watch(paths.jsSource, ['js']);
    gulp.watch(paths.sassSource, ['sass']);
    gulp.watch(paths.indexSource, ['index']);
    gulp.watch(paths.viewsSource, ['views']);
    gulp.watch(paths.picturesSource, ['pictures']);
});

gulp.task('default', ['js', 'sass', 'index', 'views', 'pictures',
    'watch'
]);
