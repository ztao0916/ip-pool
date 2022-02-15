/*
 * @Author: ztao
 * @Date: 2022-01-10 11:23:22
 * @LastEditTime: 2022-01-10 11:23:49
 * @Description: 配置redis中间件
 */


const Redis = require('ioredis');
const redis = {
  port: 6379, // Redis port
  host: '47.115.47.202', // Redis host
  db: 3,
  password: '894277311z'
};
const newRedis = new Redis(redis);

module.exports = newRedis;