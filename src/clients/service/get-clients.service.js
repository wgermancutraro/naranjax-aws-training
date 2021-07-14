const dynamo = require('ebased/service/storage/dynamo');

exports.getAllClients = () => dynamo.scanTable({ TableName: process.env.CLIENTS_TABLE_NAME });

exports.getClientById = async id => {
  const clients = await dynamo.scanTable({ TableName: process.env.CLIENTS_TABLE_NAME });

  const client = clients.Items?.find(client => client.id === id);

  return client;
};
