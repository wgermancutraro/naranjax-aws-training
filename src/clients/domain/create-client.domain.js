const InputSchema = require('../schema/input/create-client.input');
const ClientCreatedEvent = require('../schema/event/client-created.event');
const createClient = require('../service/create-client.service');
const sendClientNotification = require('../service/client-notification.service');

module.exports = async (commandPayload, commandMeta) => {
  new InputSchema(commandPayload, commandMeta);

  const newClient = await createClient({ ...commandPayload, status: 'confirmed' });

  await sendClientNotification(new ClientCreatedEvent(newClient.Item, commandMeta));

  return { body: newClient.Item };
};
