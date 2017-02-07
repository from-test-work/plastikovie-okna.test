var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    images          = require('gulp-image'),
    pug             = require('gulp-pug'),
    autoprefixer    = require('gulp-autoprefixer'),
    concat          = require('gulp-concat'),
    notify          = require('gulp-notify'),
    uglify          = require('gulp-uglify'),
    plumber         = require('gulp-plumber'),
    rename          = require('gulp-rename'),
    browserSync     = require('browser-sync');

var path = {
    src:{
        /* ===========================  Images files    =========================== */
        img: [
            'src/images/**/*.png',
            'src/images/**/*.jpg',
            'src/images/**/*.jpeg',
            'src/images/**/*.gif',
            'src/images/**/*.svg'
        ],
        /* ===========================  JavaScript files    =========================== */
        js:{
            core:[
                'src/js/core/modernizr.js',
                'src/js/core/jquery.js',
                'src/js/core/jquery-easing.js'
            ],
            script: 'src/js/script.js'
        },
        /* ===========================  SCSS files  =========================== */
        scss: {
            style: [
                'src/scss/style.scss',
                'src/scss/core/**/*.scss',
                'src/scss/components/**/*.scss',
                'src/scss/fonts/**/*.scss',
                'src/scss/modules/**/*.scss',
                'src/scss/helpers/**/*.scss'
            ]
        },
        /* ===========================  Pug files  =========================== */
        templates: 'src/templates/**/*.pug'
    },
    dest: {
        img:[
            '/dest/images/'
        ],
        js: {
            core: 'dest/js/',
            // JavaScript init
            script: 'dest/js/'
        },
        css:{
            style: 'dest/css/'
        },
        templates: 'dest/'
    }
};

/* ===========================  Images  =========================== */
gulp.task('dev-imageMin', function () {
    gulp.src(path.src.img)
        .pipe(images())
        .pipe(gulp.dest(path.dest.img))
});


/* ===========================  JavaScript files  =========================== */
//core js
gulp.task('dev-jsCore', function () {
    gulp.src(path.src.js.core)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(concat('core.js'))
        .pipe(plumber.stop())
        .pipe(notify("js-core (DEV) compile success!"))
        .pipe(gulp.dest(path.dest.js.core))
        .pipe(browserSync.reload({stream: true}));
});

//init js
gulp.task('dev-jsScript', function () {
    gulp.src(path.src.js.script)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(plumber.stop())
        .pipe(notify("script.js (DEV) compile success!"))
        .pipe(gulp.dest(path.dest.js.script))
        .pipe(browserSync.reload({stream: true}));
});

/* ===========================  SCSS files  =========================== */
gulp.task('dev-sass', function () {
    gulp.src(path.src.scss.style)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 15 versions'],
            cascade: false
        }))
        .pipe(plumber.stop())
        .pipe(notify("style.scss (DEV) compiled success!"))
        .pipe(gulp.dest(path.dest.css.style))
        .pipe(browserSync.reload({stream: true}));
});

/* ===========================  Templates files  =========================== */
gulp.task('dev-pug', function () {
    return gulp.src(path.src.templates)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(pug({
            pretty: '\t',
            //debug: true
            //locals: jadedata
        }))
        .pipe(gulp.dest(path.dest.templates))
        .pipe(browserSync.reload({stream: true}));
});

/* ===========================  Browser-Sync  =========================== */
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            // baseDir: '/var/www/test/priselist/dest/' // Директория для сервера - app
            baseDir: 'dest/'
        },
        notify: false,
        open: true
    });
});


/*============= watch task =============*/
gulp.task('watch', function () {
    gulp.watch(path.src.img, ['dev-imageMin']);
    gulp.watch(path.src.js.core, ['dev-jsCore']);
    gulp.watch(path.src.js.script, ['dev-jsScript']);
    gulp.watch(path.src.scss.style, ['dev-sass']);
    gulp.watch(path.src.templates, ['dev-pug']);
});
/*============= default task =============*/
gulp.task('default', ['browser-sync', 'watch']);
