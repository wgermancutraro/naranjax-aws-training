const InputSchema = require('../schema/input/create-card.input');
const calculateAge = require('../helper/calculate-age.helper');
const generateCardData = require('../helper/generate-card-data.helper');
const updateUser = require('../service/updateUser.service');

module.exports = async (batchPayload, batchMeta) => {
  new InputSchema(JSON.parse(batchPayload.Message), batchMeta);

  const item = JSON.parse(batchPayload.Message);

  const { creditCardNumber, expirationDate, securityCode } = generateCardData();
  const type = calculateAge(item.birth) > 45 ? 'Gold' : 'Classic';

  const { Attributes } = await updateUser({
    table: process.env.CLIENTS_TABLE_NAME,
    primaryKey: 'dni',
    primaryKeyValue: item.dni,
    body: {
      number: creditCardNumber,
      expiration: expirationDate,
      ccv: securityCode,
      type
    }
  });

  return Attributes;
};
