'use strict'

const gulp = require('gulp')

gulp.task('serve', ['react:build', 'css:build'], () => {
  const gls = require('gulp-live-server')
  let server = gls.new('server')
  server.start()
  gulp.watch(['public/app.js', 'public/app.css'], f => server.notify(f))
  gulp.watch(['server.js', 'routes/**/*.js'], () => server.start.bind(server)())

  process.on('SIGINT', () => {
    console.error('stopping server...')
    server.stop().then(() => process.exit(1))
  })
})
