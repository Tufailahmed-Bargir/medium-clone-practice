import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { bookRouter } from './routes/blog';
import { cors } from 'hono/cors'

export const app = new Hono<{
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
  }
}>();

app.use(cors())


app.get('/', (c)=>{
  return c.text('hellow orld')
})

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', bookRouter)

export default app