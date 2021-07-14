const sns = require('ebased/service/downstream/sns');

const sendClientNotification = async clientCreatedEvent => {
  const { eventPayload, eventMeta } = clientCreatedEvent.get();

  const publishParams = {
    Message: eventPayload,
    TopicArn: process.env.SNS_ARN
  };

  await sns.publish(publishParams, eventMeta);
};

module.exports = sendClientNotification;
