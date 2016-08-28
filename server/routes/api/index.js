'use strict'

import Router from 'koa-router'
import moment from 'moment'
import db from '../../db'

const r = Router({
  prefix: '/api'
})

r.use(async (ctx, next) => {
  ctx.db = await db()
  ctx.user = await ctx.db.collection('users').findOne({email: 'dickeyxxx@gmail.com'}) // TODO: auth
  await next()
})

r.get('/plan', async ctx => {
  let plan = await ctx.db.collection('plans').findOne({user_id: ctx.user._id})
  if (!plan) ctx.throw(404)
  ctx.body = plan
})

r.post('/plan', async ctx => {
  let plan = { user_id: ctx.user._id, weeks: [] }
  let race = {}
  race.type = ctx.request.body.type
  race.date = moment(ctx.request.body.date).toDate()
  let date = moment(new Date()).startOf('day')
  let mileage = 26
  while (date.weekday() !== 1) date.subtract(1, 'days')
  while (date.isBefore(race.date)) {
    let week = {
      total: {planned: 0},
      days: []
    }
    for (let i = 0; i < 7; i++) {
      let day = {date: date.clone().toDate()}
      if (date.isSame(race.date)) {
        day.type = 'race'
        day.race = race.type
        day.planned = 26.2
      } else {
        switch (date.weekday()) {
          case 1:
            day.type = 'cross'
            day.planned = 0
            break
          case 2:
            day.type = 'easy'
            day.planned = Math.min(5, Math.round(mileage * 0.1))
            break
          case 3:
            day.type = 'easy'
            day.planned = Math.min(8, Math.round(mileage * 0.2))
            break
          case 4:
            day.type = 'tempo'
            day.planned = Math.min(5, Math.round(mileage * 0.1))
            break
          case 5:
            day.type = 'rest'
            day.planned = 0
            break
          case 6:
            day.type = date.date() % 2 === 1 ? 'pace' : 'easy'
            day.planned = Math.min(8, Math.round(mileage * 0.2))
            break
          case 0:
            day.type = 'long'
            day.planned = Math.min(20, Math.round(mileage * 0.4))
            break
        }
      }
      week.total.planned += day.planned
      week.days.push(day)
      date.add(1, 'days')
    }
    mileage = week.total.planned * 1.1
    plan.weeks.push(week)
  }
  await ctx.db.collection('plans').update({user_id: plan.user_id}, plan, {upsert: true})
  ctx.status = 201
})

module.exports = r
