const { ErrorHandled } = require('ebased/util/error');
const GetClientByIdValidation = require('../schema/input/get-one-client.input');
const { getClientById } = require('../service/get-clients.service');
const { errorMessages, errorCodes } = require('../helper/clients-constants.helper');

module.exports = async (commandPayload, commandMeta) => {
  new GetClientByIdValidation(commandPayload, commandMeta);

  const client = await getClientById(commandPayload.id);

  if (!client)
    throw new ErrorHandled(errorMessages.clientNotFound, {
      code: errorCodes.clientNotFound,
      layer: 'DOMAIN'
    });

  return { body: client };
};
