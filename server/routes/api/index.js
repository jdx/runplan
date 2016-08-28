'use strict'

import Router from 'koa-router'
import moment from 'moment'

const r = Router({
  prefix: '/api'
})

let raceDate = new Date(2017, 2, 19)

r.get('/plan', async ctx => {
  let date = moment(new Date()).subtract(3, 'weeks')
  while (date.weekday() !== 1) date.subtract(1, 'days')
  let plan = []
  while (date.toDate() < raceDate) {
    let week = {
      start: date.toDate(),
      total: {planned: 25, actual: 28.7},
      days: []
    }
    for (let i = 0; i < 7; i++) {
      week.days.push({planned: 3})
      date.add(1, 'days')
    }
    plan.push(week)
  }
  ctx.body = plan
})

r.post('/plan', async ctx => {
  raceDate = moment(ctx.request.body.date).toDate()
  ctx.status = 201
})

module.exports = r
