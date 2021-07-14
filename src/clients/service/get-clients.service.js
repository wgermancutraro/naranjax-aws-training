const dynamo = require('ebased/service/storage/dynamo');

exports.getAllClients = () => dynamo.scanTable({ TableName: process.env.CLIENTS_TABLE_NAME });
