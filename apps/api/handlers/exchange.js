const smartcar = require('smartcar');
const response = require('../helpers/response');

module.exports = async (event) => {
  const {
    SMARTCAR_CLIENT_ID,
    SMARTCAR_CLIENT_SECRET,
    SMARTCAR_REDIRECT_URI
  } = process.env;
  
  const client = new smartcar.AuthClient({
    clientId: SMARTCAR_CLIENT_ID,
    clientSecret: SMARTCAR_CLIENT_SECRET,
    redirectUri: SMARTCAR_REDIRECT_URI,
    scope: [
      'required:read_battery',
      'required:read_charge',
      'required:read_location',
      'required:read_vehicle_info'
    ]
  });

  let exchanged;

  try {
    exchanged = await client.exchangeCode(event.queryStringParameters.code);
  } catch (error) {
    console.error(error);

    return response(400, error);
  }

  return response(200, exchanged);
};