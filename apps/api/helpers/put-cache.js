const getCacheClient = require('./get-cache-client');

module.exports = (id, data) => new Promise((resolve, reject) => {
  const client = getCacheClient();

  client.set(id, JSON.stringify(data), 300, (err) => {
    if (err) {
      return reject(err);
    }

    return resolve();
  })
});