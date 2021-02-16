const smartcar = require('smartcar');
const respond = require('../helpers/respond');
const getCache = require('../helpers/get-cache');
const putCache = require('../helpers/put-cache');

module.exports = async (event) => {
  const accessToken = event.queryStringParameters.accessToken;

  let resp;

  try {
    resp = await smartcar.getVehicleIds(accessToken);
  } catch (error) {
    console.log(error);

    return respond(500, error);
  }

  const id = resp.vehicles[0];
  
  let cache;

  try {
    cache = await getCache(id);
  } catch (error) {
    console.error(error);

    return respond(500, error);
  }

  if (cache) {
    console.log(`Cache hit for ${id}`)

    return respond(200, cache);
  }

  console.log(`Cache miss for ${id}`)

  const vehicle = new smartcar.Vehicle(id, accessToken);
  
  const funcs = [
    'location',
    'battery',
    'charge'
  ];

  let resps;

  try {
    resps = await Promise.all(funcs.map(func => vehicle[func]()));
  } catch (error) {
    console.error(error);

    return respond(500, error);
  }

  const out = Object.assign({}, ...resps.map(resp => resp.data));

  try {
    await putCache(id, out);
  } catch (error) {
    console.error(error);

    return respond(500, error);
  }

  return respond(200, out);
};