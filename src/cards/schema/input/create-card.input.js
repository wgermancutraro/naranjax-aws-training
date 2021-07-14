const { InputValidation } = require('ebased/schema/inputValidation');

class InputSchema extends InputValidation {
  constructor(payload, meta) {
    super({
      source: meta.status,
      payload,
      source: meta.source,
      specVersion: 'v1.0.0',
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

module.exports = InputSchema;
