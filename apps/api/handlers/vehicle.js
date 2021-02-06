const smartcar = require('smartcar');
const vehicleStub = require('../stub/vehicle.json');

module.exports = async (event) => {
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(vehicleStub)
  // };

  const accessToken = event.queryStringParameters.accessToken;

  let response;

  try {
    response = await smartcar.getVehicleIds(accessToken);
  } catch (error) {
    return {
      statusCode: 500, 
      body: JSON.stringify( error ),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    };
  }

  const id = response.vehicles[0];
  const vehicle = new smartcar.Vehicle(id, accessToken);
  
  const funcs = [
    'info',
    'location',
    'battery',
    'charge'
  ];

  let responses;

  try {
    responses = await Promise.all(funcs.map(func => vehicle[func]()));
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500, 
      body: JSON.stringify(error),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(Object.assign({}, ...responses.map(resp => resp.data ? resp.data : resp))),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    }
  };
};