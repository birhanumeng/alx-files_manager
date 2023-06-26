const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error}`);
    });
    this.client.on('connect' () => {});
  }

  //chech if redis is connected
  isAlive() {
    return this.client.connected;
  }

  //get value using key
  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }

  //insert key value with expiration in second
  async set(key, value, delay) {
    this.client.setex(key, delay, value);
  }

  //delete elemet using key
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
