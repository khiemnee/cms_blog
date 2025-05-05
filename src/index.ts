import express, {Express} from 'express'
import router from './routers/user.router'

const app:Express = express()
const port = 3000

app.use(express.json())

app.use('/api/auth',router)

app.listen(port,()=>{
    console.log('server is up')
})