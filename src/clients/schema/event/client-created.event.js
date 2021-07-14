const { DownstreamEvent } = require('ebased/schema/downstreamEvent');

class ClientCreatedEvent extends DownstreamEvent {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.CLIENT_CREATED',
      specversion: 'v1.0.0',
      payload,
      meta,
      schema: {
        strict: true,
        id: { type: String, required: true },
        dni: { type: String, required: true },
        name: { type: String, required: true },
        birth: { type: Date, required: true },
        status: { type: String, enum: ['confirmed', 'deleted'] }
      }
    });
  }
}

module.exports = ClientCreatedEvent;
