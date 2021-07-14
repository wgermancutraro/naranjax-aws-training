const InputSchema = require('../schema/input/create-gift.input');
const giftChoser = require('../helper/gift-choser.helper');
const updateUser = require('../../cards/service/updateUser.service');

module.exports = async (batchPayload, batchMeta) => {
  new InputSchema(JSON.parse(batchPayload.Message), batchMeta);

  const item = JSON.parse(batchPayload.Message);

  const { Attributes } = await updateUser({
    table: process.env.CLIENTS_TABLE_NAME,
    primaryKey: 'dni',
    primaryKeyValue: item.dni,
    body: {
      gift: giftChoser(item.birth)
    }
  });

  return Attributes;
};
