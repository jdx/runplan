'use strict'

import Router from 'koa-router'
const r = Router({
  prefix: '/api'
})

r.get('/plan', async ctx => {
  ctx.send({foo: 'bar'})
})

module.exports = r
