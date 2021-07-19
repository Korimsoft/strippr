const {src, dest} = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const { parallel, series } = require('gulp');
const chmod = require('gulp-chmod');

const paths = {
    mainfile: {
        dest: './dist/main.js'
    },
    scripts: { 
        src: 'src/**/*.ts', 
        dest: './dist/'},
    config: { 
        src: './resources/config/global-config.json', 
        dest: './dist/resources/config' },
    fonts: { 
        src: './resources/fonts/**/*.{fnt,png}', 
        dest: './dist/resources/fonts/' },
    sourcemaps: {
        dest: './sourcemaps'
    },
    tests: {
        src: './test/**/*.spec.ts'
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

function mainFileExecutable() {
   return src(paths.mainfile.dest).pipe(chmod(0x544));
}

function copyConfig() {
    return src(paths.config.src).pipe(dest(paths.config.dest));
}

function copyFonts() {
    return src(paths.fonts.src).pipe(dest(paths.fonts.dest));
}

const build = parallel(series(buildTS, mainFileExecutable), copyFonts, copyConfig);
const test = cb => cb();

exports.test = test;
exports.build = build;
exports.default = exports.build;
