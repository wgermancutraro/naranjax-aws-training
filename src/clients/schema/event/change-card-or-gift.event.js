const { DownstreamEvent } = require('ebased/schema/downstreamEvent');

class ClientCreatedEvent extends DownstreamEvent {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.CLIENT_CHANGE_BIRTH',
      specversion: 'v1.0.0',
      payload,
      meta,
      schema: {
        strict: false,
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
