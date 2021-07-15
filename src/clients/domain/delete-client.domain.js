const { getAllClients } = require('../service/get-clients.service');
const DeleteClientByIdValidation = require('../schema/input/delete-client.input');
const updateUser = require('../../cards/service/updateUser.service');

module.exports = async (commandPayload, commandMeta) => {
  new DeleteClientByIdValidation(commandPayload, commandMeta);

  const clients = await getAllClients();
  const client = clients.Items.find(client => client.id === commandPayload.id);

  if (!client)
    throw new ErrorHandled(errorMessages.clientNotFound, {
      code: errorCodes.clientNotFound,
      layer: 'DOMAIN'
    });

  const result = await updateUser({
    table: process.env.CLIENTS_TABLE_NAME,
    primaryKey: 'dni',
    primaryKeyValue: client.dni,
    body: {
      status: 'deleted'
    }
  });

  return {
    body: result.Attributes
  };
};
