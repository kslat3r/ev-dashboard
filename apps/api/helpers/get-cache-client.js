const Memcached = require('memcached');
const {
  MEMCACHED_HOSTNAME,
  MEMCACHED_PORT
} = process.env;

const client = new Memcached(`${MEMCACHED_HOSTNAME}:${MEMCACHED_PORT}`);

module.exports = () => client;