const dynamo = require('ebased/service/storage/dynamo');

exports.getAllClients = () => dynamo.scanTable({ TableName: process.env.CLIENTS_TABLE_NAME });

exports.getClientById = id =>
  dynamo.queryTable({
    TableName: process.env.CLIENTS_TABLE_NAME,
    IndexName: 'id-index',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': id
    }
  });
