import express, {Express} from 'express'
import authRouter from './routers/auth.router'
import userRouter from './routers/user.router'
import categoryRouter from './routers/categories.router'
import postsRouter from './routers/post.router'
import { PORT } from './secret'

const app:Express = express()

app.use(express.json())

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/category',categoryRouter)
app.use('/api/posts',postsRouter)

app.listen(PORT,()=>{
    console.log('server is up')
})