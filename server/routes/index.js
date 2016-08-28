import Koa from 'koa'

import config from '../config'

import api from './api'
import s from './static'

const app = new Koa()

app.use(require('koa-morgan')(config.production ? 'combined' : 'dev'))
app.use(api.routes())
app.use(api.allowedMethods())

app.use(s.routes())
app.use(s.allowedMethods())

export default app
