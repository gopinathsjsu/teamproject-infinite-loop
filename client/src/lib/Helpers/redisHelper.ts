import { createClient } from 'redis';
const redisClient = createClient({
    url: 'redis://default:xHUpp2qKD5ukdaLns6luRsAINgAergn7@redis-17055.c321.us-east-1-2.ec2.cloud.redislabs.com:17055'
});

async function EstablishConnection() {
    redisClient.on('error', err => console.log('Redis Client Error', err));
    await redisClient.connect();
}

export async function AddToRedis(key: any, value: any) {

    try {
        EstablishConnection();
        await redisClient.hSet(key, value);
        console.log("Inserted to redis");
    }
    catch (err) {
        console.error(err);
    }
    await redisClient.quit();
}

export async function GetFromRedis(key: any) {
    try {
        EstablishConnection();
        const redis_data = await redisClient.hGetAll(key);
        await redisClient.quit();
        return redis_data;
    }
    catch (err) {
        console.error(err);
    }

}

export async function DeleteFromRedis(key: any) {
    try {
        EstablishConnection();
        const redis_data = await redisClient.del(key);
        await redisClient.quit();
        return redis_data;
    }
    catch (err) {
        console.error(err);
    }
}