import { createClient } from 'redis';


const client = createClient({
    username: 'default',
    password: '*******',
    socket: {
        host: 'redis-19997.crce194.ap-seast-1-1.ec2.redns.redis-cloud.com',
        port: 19997
    }
});

client.on('error', err => console.log('Redis Client Error', err));

client.connect();


export default client