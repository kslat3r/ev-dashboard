module.exports = (statusCode, body) => ({
  statusCode, 
  body: JSON.stringify(body),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  }
})