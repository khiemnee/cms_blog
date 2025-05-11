import { createClient } from 'redis';
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_USERNAME } from '../secret';



const client = createClient({
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST!,
        port: Number(REDIS_PORT),
    }
});

client.on('error', err => console.log('Redis Client Error', err));

client.connect();


export default client