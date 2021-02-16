const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB();
const cacheMs = 300000;

module.exports = async (id) => {
  let response;

  try {
    response = await dynamoDb.query({
      TableName: 'vehicles',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': {
          S: id
        }
      },
      ScanIndexForward: false
    }).promise();
  } catch (e) {
    throw e;
  }

  const items = response.Items

  if (!items.length) {
    return null;
  }

  const item = AWS.DynamoDB.Converter.unmarshall(items[0]);

  if ((new Date().getTime()) < (item.created + cacheMs)) {
    return JSON.parse(item.data);
  }

  return null;
};