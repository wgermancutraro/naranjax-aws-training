const { getAllClients } = require('../service/get-clients.service');
const UpdateClientByIdValidation = require('../schema/input/update-client.input');
const changeCardOrGiftValidationEvent = require('../schema/event/change-card-or-gift.event');
const updateUser = require('../../cards/service/updateUser.service');
const changeCardOrGift = require('../service/send-notification.service');

module.exports = async (commandPayload, commandMeta) => {
  new UpdateClientByIdValidation(commandPayload, commandMeta);

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
    body: commandPayload
  });

  // We send a Sns if the user change the birth to rebuild the card and the gift
  if (result.Attributes.birth !== client.birth)
    await changeCardOrGift(new changeCardOrGiftValidationEvent(result.Attributes, commandMeta));

  return {
    body: result.Attributes
  };
};
