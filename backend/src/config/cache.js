const {createClient} = require('redis')

const redisClient = createClient({ url: 'redis://localhost:6379' });

redisClient.connect()
  .then(() => console.log('Redis connection sucessful'))
  .catch(console.error);

module.exports = redisClient