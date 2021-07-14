const dynamo = require('ebased/service/storage/dynamo');

const createClient = body => dynamo.putItem({ TableName: process.env.CLIENTS_TABLE_NAME, Item: body });

module.exports = createClient;
