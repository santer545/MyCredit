/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    minify = require('gulp-minify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync'),
    criticalCss = require('gulp-critical-css'),
    /*penthouse = require('penthouse'),*/
    inject = require('gulp-inject-string'),
    del = require('del'),
    replace = require('gulp-replace'),
    purify = require('gulp-purifycss'),
    sourcemaps = require('gulp-sourcemaps'),
    purgecss = require('gulp-purgecss'),
    purge = require('gulp-css-purge'),
    critical = require('critical'),
    rigger = require('gulp-rigger'),
    gcmq = require('gulp-group-css-media-queries');

// Styles
gulp.task('styles', function() {
    return gulp.src('sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'expanded' }))
        // .pipe(purify(['dist/css/**/*.css']))
        .pipe(autoprefixer('last 5 version'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('critical-login', function() {
    critical.generate({
        inline: true,
        extract: true,
        css: ['dist/css/style.css'],
        base: './dist',
        src: './index.html',
        dest: 'dist/test-critical.html'
    });
});

gulp.task('rigger', function() {
    gulp.src('template/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('dist/'));
});


gulp.task('purgecss', () => {
    return gulp.src('dist/**/*.css')
        .pipe(purgecss({
            content: ["dist/**/*.html"]
        }))
        .pipe(gulp.dest('build/css'))
});




// Local server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});





// настройки путей к файлам
var rootDir = '.';
var sourceDir = rootDir + '/js'; // здесь хранятся все исходники
var destDir = rootDir + '/dist'; // здесь хранится все на выходе




// Scripts
gulp.task('scripts', function() {

    return gulp.src([
            sourceDir + '/jquery-2.2.1.min.js',
            sourceDir + '/bootstrap-select.js',
            sourceDir + '/jquery.maskedinput.min.js',
            sourceDir + '/bootstrap-slider.js',
            sourceDir + '/jquery.sameheight.js',
            sourceDir + '/validate.js',
            //sourceDir + '/jquery.reject.js',

            //sourceDir + '/jquery.countTo.js',
            //sourceDir + '/jquery.knob.js',
            sourceDir + '/jquery.ui.widget.js',
            sourceDir + '/jquery.iframe-transport.js',
            sourceDir + '/bootstrap.min.js',
            //sourceDir + '/jquery.placeholder.min.js',
            sourceDir + '/owl.carousel.js',
            //sourceDir + '/jcf.js',
            //sourceDir + '/jcf.number.js',
            sourceDir + '/accounting.min.js',
            //sourceDir + '/viewportchecker.js',
            sourceDir + '/jquery.sticky-kit.min.js',
            sourceDir + '/jquery.jscrollpane.min.js',
            sourceDir + '/jquery.mousewheel.js',
            sourceDir + '/eskju.jquery.scrollflow.min.js',
            //sourceDir + '/videojs.js',
            sourceDir + '/lightgallery.min.js',
            //sourceDir + '/lg-fullscreen.min.js',
            //sourceDir + '/lg-thumbnail.min.js',
            sourceDir + '/zebra_datepicker.js',
            sourceDir + '/main.js',
            sourceDir + '/star-raiting.js',
            sourceDir + '/device.min.js',
            sourceDir + '/functions.js',
            sourceDir + '/googleAPI.js',
            sourceDir + '/forWidget.js',
            sourceDir + '/fingerprint2.js',
            sourceDir + '/pgwslideshow.js',
            sourceDir + '/css3-animate-it.js',
            //sourceDir + '/jquery.appear.js',
            sourceDir + '/jquery.countdown.min.js',
            //sourceDir + '/svgfixer.js',
            //sourceDir + '/jquery.colorbox.js',
            sourceDir + '/lightbox.js',
            //sourceDir + '/imagizer.js',
            sourceDir + '/vivus.js',
            sourceDir + '/client.min.js',
            sourceDir + '/jquery.lazy.js',

            //sourceDir + '/grayscale.js',
            sourceDir + '/wish.js',
            sourceDir + '/easter.js',
            sourceDir + '/downloadJS.js',

            //подключение функционала пуш уведомлений:
            //sourceDir + '/firebase/firebase-config.js', //- подключается отдельно
            //sourceDir + '/firebase/firebase-get-param.js',
            //sourceDir + '/firebase/firebase-api.js',
            //sourceDir + '/firebase/app-firebase.js'
        ])

        //.pipe(browserify(components.scripts.options))
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});


// Images
gulp.task('images', function() {
    return gulp.src('assets/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/assets/'))
        .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
    return del(['dist/css', 'dist/js', 'dist/images']);
});

// Default task
gulp.task('default', function() {
    gulp.start('styles', 'scripts');
});

gulp.task('server', function() {
    gulp.start('default', 'watch', 'browser-sync', 'rigger');
});


// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('sass/**/*.scss', ['styles', browserSync.reload]);

    // Watch .js files
    gulp.watch('js/**/*.js', ['scripts', browserSync.reload]);

    // Watch image files
    //gulp.watch('assets/images/**/*', ['images', browserSync.reload]);

    //gulp.watch('assets/svg/**/*', ['svgSprite', browserSync.reload]);
    gulp.watch('template/*.html', ['rigger', browserSync.reload]);

});