const { getAllClients } = require('../service/get-clients.service');

module.exports = async (_commandPayload, _commandMeta) => {
  const clients = await getAllClients();

  return {
    body: clients.Items
  };
};
