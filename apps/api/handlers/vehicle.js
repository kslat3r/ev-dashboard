const smartcar = require('smartcar');
const response = require('../helpers/response');
// const vehicleStub = require('../stub/vehicle.json');

module.exports = async (event) => {
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(vehicleStub)
  // };

  const accessToken = event.queryStringParameters.accessToken;

  let resp;

  try {
    resp = await smartcar.getVehicleIds(accessToken);
  } catch (error) {
    console.log(error);

    return response(500, error);
  }

  const id = resp.vehicles[0];
  const vehicle = new smartcar.Vehicle(id, accessToken);
  
  const funcs = [
    'info',
    'location',
    'battery',
    'charge'
  ];

  let resps;

  try {
    resps = await Promise.all(funcs.map(func => vehicle[func]()));
  } catch (error) {
    console.error(error);

    return response(500, error);
  }

  return response(200, Object.assign({}, ...resps.map(resp => resp.data ? resp.data : resp)));
};