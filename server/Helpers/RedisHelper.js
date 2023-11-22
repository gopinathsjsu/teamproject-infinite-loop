const express = require('express');
const redis = require('redis');
require('dotenv').config();

const app = express();
const redisHelperAdd = async (req, res, key, value) => {
    const redisClient = redis.createClient({
        url: 'redis://default:xHUpp2qKD5ukdaLns6luRsAINgAergn7@redis-17055.c321.us-east-1-2.ec2.cloud.redislabs.com:17055'
    });
    redisClient.on('error', (err) => {
        console.error('Redis Client Error', err);
    }).connect();
    console.log(key + "added to redis");
    await redisClient.hSet(key, value)
    redisClient.quit();
}

exports.RedisHelperAdd = redisHelperAdd;

const redisHelperGet = async (req, res, key) => {
    const redisClient = redis.createClient({
        url: 'redis://default:xHUpp2qKD5ukdaLns6luRsAINgAergn7@redis-17055.c321.us-east-1-2.ec2.cloud.redislabs.com:17055'
    });
    redisClient.on('error', (err) => {
        console.error('Redis Client Error', err);
    }).connect();
    console.log(key);
    const redis_data = await redisClient.hGetAll(key);
    console.log(redis_data);
    redisClient.quit();
    return redis_data;
}

exports.RedisHelperGet = redisHelperGet;

const redisHelperDelete = async (req, res, key) => {
    const redisClient = redis.createClient({
        url: process.env.REDIS_URL
    });
    redisClient.on('error', (err) => {
        console.error('Redis Client Error', err);
    }).connect();
    console.log(key);
    const redis_data = await redisClient.del(key);
    console.log(redis_data);
    redisClient.quit();
    return redis_data;

}
exports.RedisHelperDelete = redisHelperDelete