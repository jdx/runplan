'use strict'

const r = require('express').Router()
const path = require('path')

r.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = r
