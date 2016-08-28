import Router from 'koa-router'
import send from 'koa-send'
import path from 'path'
import s from 'koa-static'

const r = new Router()

const root = path.join(__dirname, '..', '..', 'public')
r.use(s(root))

r.get('*', async ctx => {
  await send(ctx, 'index.html', {root})
})

export default r
