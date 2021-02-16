const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async (id, data) => {
  try {
    await dynamoDb.put({
      TableName: 'vehicles',
      Item: {
        id,
        created: new Date().getTime(),
        data: JSON.stringify(data)
      },
    }).promise();
  } catch (e) {
    throw e;
  }
};