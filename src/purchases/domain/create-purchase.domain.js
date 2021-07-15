const CreatePurchaseInputValidation = require('../schema/input/create-purchase.input');

module.exports = async (commandPayload, commandMeta) => {
  new CreatePurchaseInputValidation(commandPayload, commandMeta);

  return { body: 'hola' };
};
