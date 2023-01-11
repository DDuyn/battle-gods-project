import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import gods from '../db/gods.json'
const app = new Hono()

app.get('/', (ctx) => {
  return ctx.json([
    {
      endpoint: '/gods',
      description: 'Return all gods'
    }
  ])
})

app.get('/gods', (ctx) => ctx.json(gods))

app.get('/static/*', serveStatic({ root: './' }))

export default app
