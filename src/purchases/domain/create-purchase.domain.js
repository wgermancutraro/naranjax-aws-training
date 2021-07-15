const CreatePurchaseInputValidation = require('../schema/input/create-purchase.input');
const createPurchase = require('../service/create-purchase.service');
const { ErrorHandled } = require('ebased/util/error');
const { errorMessages, errorCodes } = require('../../clients/helper/clients-constants.helper');
const { getClientByDNI } = require('../../clients/service/get-clients.service');
const {
  GOLD_DISCOUNT,
  CLASSIC_DISCOUNT,
  AMOUNT_TO_ADD_POINT
} = require('../helper/purchase-constants.helper');

module.exports = async (commandPayload, commandMeta) => {
  new CreatePurchaseInputValidation(commandPayload, commandMeta);

  const client = await getClientByDNI(commandPayload.dni);

  if (!client.Item || client.Item?.status === 'deleted')
    throw new ErrorHandled(
      client.Item?.status === 'deleted' ? errorMessages.invalidClient : errorMessages.clientNotFound,
      {
        code: client.Item?.status === 'deleted' ? errorCodes.invalidClient : errorCodes.clientNotFound,
        layer: 'DOMAIN'
      }
    );

  const discount = client.Item.type === 'Gold' ? 100 - GOLD_DISCOUNT : 100 - CLASSIC_DISCOUNT;

  const products = commandPayload.products.map(product => ({
    ...product,
    price: (discount * product.price) / 100
  }));
  const total = products.reduce((a, b) => a + b.price, 0);

  const purchase = await createPurchase({
    id: commandPayload.id,
    products: JSON.stringify(products),
    client: commandPayload.dni,
    total
  });

  return { body: purchase.Item };
};
