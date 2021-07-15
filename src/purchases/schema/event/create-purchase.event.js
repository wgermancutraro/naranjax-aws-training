const { DownstreamEvent } = require('ebased/schema/downstreamEvent');

class ClientCreatedEvent extends DownstreamEvent {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.CLIENT_POINTS',
      specversion: 'v1.0.0',
      payload,
      meta,
      schema: {
        strict: false,
        dni: { type: String, required: true },
        pointsToAdd: { type: Number, required: true }
      }
    });
  }
}

module.exports = ClientCreatedEvent;
