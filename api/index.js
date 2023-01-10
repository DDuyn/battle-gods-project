import { Hono } from 'hono'
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

export default app
