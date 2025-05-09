import app from './app'
import { PORT } from './secret'




app.listen(PORT,()=>{
    console.log('server is up')
})

