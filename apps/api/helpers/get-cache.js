const getCacheClient = require('./get-cache-client');

module.exports = (id) => new Promise((resolve, reject) => {
  const client = getCacheClient();

  client.get(id, (err, data) => {
    if (err) {
      return reject(err);
    }

    return resolve(JSON.parse(data));
  })
});