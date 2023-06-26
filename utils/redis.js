const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);

    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error}`);
    });
  }

  // chech if redis is connected
  isAlive() {
    return this.client.connected;
  }

  // get value using key
  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }

  // insert key value with expiration in second
  async set(key, value, duration) {
    this.client.set(key, value);
    this.client.expire(key, duration);
  }

  // delete elemet using key
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();i
module.exports = redisClient;
