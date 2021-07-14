const { getAllClients } = require('../service/get-clients.service');
const DeleteClientByIdValidation = require('../schema/input/delete-client.input');
const updateUser = require('../../cards/service/updateUser.service');

module.exports = async (commandPayload, commandMeta) => {
  new DeleteClientByIdValidation(commandPayload, commandMeta);

  const clients = await getAllClients();
  const client = clients.Items.filter(client => client.id === commandPayload.id);

  if (!client[0])
    throw new ErrorHandled(errorMessages.clientNotFound, {
      code: errorCodes.clientNotFound,
      layer: 'DOMAIN'
    });

  const result = await updateUser({
    table: process.env.CLIENTS_TABLE_NAME,
    primaryKey: 'dni',
    primaryKeyValue: client[0].dni,
    body: {
      status: 'deleted'
    }
  });

  return {
    body: result.Attributes
  };
};
