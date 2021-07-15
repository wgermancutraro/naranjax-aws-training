const { InputValidation } = require('ebased/schema/inputValidation');

class UpdateClientByIdValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      source: meta.status,
      payload,
      source: meta.source,
      specVersion: 'v1.0.0',
      schema: {
        strict: true,
        id: { type: String, required: true },
        dni: { type: String, required: false },
        name: { type: String, required: false },
        birth: { type: Date, required: false },
        status: { type: String, enum: ['confirmed', 'deleted'], required: false }
      }
    });
  }
}

module.exports = UpdateClientByIdValidation;
