'use strict'

import Router from 'koa-router'
const r = Router({
  prefix: '/api'
})

r.get('/plan', async ctx => {
  const plan = [
    {
      start: new Date(2016, 7, 20),
      total: {planned: 25, actual: 28.7},
      days: [
        {planned: new Date()},
        {planned: 3},
        {planned: 5},
        {planned: 3},
        {planned: 0},
        {planned: 3},
        {planned: 8}
      ]
    },
    {
      start: new Date(2016, 7, 27),
      total: {planned: 25, actual: 28.7},
      days: [
        {planned: 0},
        {planned: 3},
        {planned: 5},
        {planned: 3},
        {planned: 0},
        {planned: 3},
        {planned: 8}
      ]
    }
  ]
  ctx.body = plan
})

r.post('/plan', async ctx => {
  console.dir(ctx.request.body)
  ctx.status = 201
})

module.exports = r
