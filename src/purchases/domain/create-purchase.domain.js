const CreatePurchaseInputValidation = require('../schema/input/create-purchase.input');
const SumPointsEventValidation = require('../schema/event/create-purchase.event');
const createPurchase = require('../service/create-purchase.service');
const { ErrorHandled } = require('ebased/util/error');
const { errorMessages, errorCodes } = require('../../clients/helper/clients-constants.helper');
const { getClientByDNI } = require('../../clients/service/get-clients.service');
const {
  GOLD_DISCOUNT,
  CLASSIC_DISCOUNT,
  AMOUNT_TO_ADD_POINT
} = require('../helper/purchase-constants.helper');
const sendClientPointsNotification = require('../../clients/service/send-notification.service');

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

  // If the client beats $200 we send a notification to the sns
  const totalBy200 = Math.floor(total / AMOUNT_TO_ADD_POINT);
  if (totalBy200 >= 1)
    await sendClientPointsNotification(
      new SumPointsEventValidation({ client: commandPayload.dni, pointsToAdd: totalBy200 }, commandMeta)
    );

  return { body: purchase.Item };
};
