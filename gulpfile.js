const {src, dest} = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const { parallel } = require('gulp');

const paths = {
    scripts: { 
        src: 'src/**/*.ts', 
        dest: 'dist/'},
    config: { 
        src: 'resources/config/global-config.json', 
        dest: 'dist/resources/config' },
    fonts: { 
        src: 'resources/fonts/**/*{.fnt, .png}', 
        dest: 'dist/resources/fonts/' },
    sourcemaps: {
        dest: 'sourcemaps'
    }
}

const tsProject = ts.createProject('tsconfig.json');

function buildTS() {
   return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write(paths.sourcemaps.dest))
        .pipe(dest(paths.scripts.dest));
}

function copyConfig() {
    return src(paths.config.src).pipe(dest(paths.config.dest));
}


function copyFonts() {
    return src(paths.fonts.src).pipe(dest(paths.fonts.dest));
}

exports.dev = parallel(buildTS, copyFonts, copyConfig);