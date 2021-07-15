const dynamo = require('ebased/service/storage/dynamo');

const table = process.env.CLIENTS_TABLE_NAME;

exports.getAllClients = () => dynamo.scanTable({ TableName: table });

exports.getClientById = async id => {
  const clients = await dynamo.scanTable({ TableName: table });

  const client = clients.Items?.find(client => client.id === id);

  return client;
};

exports.getClientByDNI = dni => dynamo.getItem({ TableName: table, Key: { dni } });
