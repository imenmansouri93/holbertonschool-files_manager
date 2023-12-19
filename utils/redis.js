const redis = require('require');
const { promisify } = require('util');

class RedisClient {
    constructor() {
        this.client = redis.createClient();

        this.client.on('error', (err) => {
            console.log(`${err}`)
        });
    }
    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        const getAsync = promisify(this.client.get).bind(this.client);
        return getAsync(key);
    }

    async set(key, value, durationInSeconds) {
        const setAsync = promisify(this.client.set).bind(this.client);
        const expireAsync = promisify(this.client.expire).bind(this.client);

        await setAsync(key, value);
        await expireAsync(key, durationInSeconds);

        return true;
    }

    async del(key) {
        const delAsync = promisify(this.client.del).bind(this.client);
        return delAsync(key);
    }
}

const redisClient = new RedisClient();

module.exports = redisClient;