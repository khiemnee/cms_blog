import express, {Express} from 'express'
import authRouter from './routers/auth.router'
import userRouter from './routers/user.router'
import { PORT } from './secret'

const app:Express = express()

app.use(express.json())

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

app.listen(PORT,()=>{
    console.log('server is up')
})