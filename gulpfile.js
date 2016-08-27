'use strict'

const fs = require('fs')
const gulp = require('gulp')
const path = require('path')

fs.readdirSync(path.join(__dirname, 'gulp'))
.filter(f => f.endsWith('.js'))
.forEach(module => require('./gulp/' + module))

gulp.task('default', ['dev'])
gulp.task('dev', ['serve', 'css:watch', 'react:watch'])
gulp.task('build', ['css:build', 'react:build'])
gulp.task('minify', ['react:minify'])
