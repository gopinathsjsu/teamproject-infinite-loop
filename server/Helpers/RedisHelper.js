const express = require('express');
const redis = require('redis');
require('dotenv').config();

const app = express();
const redisHelperAdd = async (key, value) => {
    const redisClient = redis.createClient({
        url: process.env.REDIS_URL
    });
    redisClient.on('error', (err) => {
        console.error('Redis Client Error', err);
    }).connect();
    console.log("here at Add");
    console.log(key + "   added to redis");
    console.log(value + "  added to redis");
    const expirationInSeconds = 600;
    await redisClient.hSet(key, value)
    await redisClient.expire(key, expirationInSeconds);
    await redisClient.quit();
}

exports.RedisHelperAdd = redisHelperAdd;

const redisHelperGet = async (key) => {
    const redisClient = await redis.createClient({
        url: process.env.REDIS_URL
    });
    await redisClient.on('error', (err) => {
        console.error('Redis Client Error', err);
    }).connect();
    console.log(key);
    let return_data = await redisClient.hGetAll(key);
    await redisClient.quit();
    console.log("redis quited");
    string_data = JSON.stringify(return_data);
    console.log(string_data);
    return string_data;
    // await redisClient.hGetAll(key).then((result) => {
    //     redisClient.quit();
    //     console.log(result);
    //     return_data = JSON.stringify(result)
    //     console.log(return_data);
    //     return return_data;
    // }).catch((err) => {
    //     return err;
    // });
    // console.log(redis_data);
}

exports.RedisHelperGet = redisHelperGet;

const redisHelperDelete = async (key) => {
    console.log("at redis delete");
    const redisClient = await redis.createClient({
        url: process.env.REDIS_URL
    });
    redisClient.on('error', (err) => {
        console.error('Redis Client Error', err);
    }).connect();
    console.log(key);
    const redis_data = await redisClient.del(key);
    console.log(redis_data);
    await redisClient.quit();
    return redis_data;

}
exports.RedisHelperDelete = redisHelperDelete