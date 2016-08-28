'use strict'

require('babel-polyfill')

let app
if (process.env.NODE_ENV === 'production') {
  app = require('../build/routes').default
} else {
  require('babel-register')({presets: ['es2015', 'stage-3']})
  app = require('./routes').default
}

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('listening on', server.address().port)
})
