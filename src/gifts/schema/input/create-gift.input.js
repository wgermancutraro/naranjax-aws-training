const { InputValidation } = require('ebased/schema/inputValidation');

class InputSchema extends InputValidation {
  constructor(payload, meta) {
    super({
      source: meta.status,
      payload,
      source: meta.source,
      specVersion: 'v1.0.0',
      schema: {
        strict: false,
        dni: { type: String, required: true }
      }
    });
  }
}

module.exports = InputSchema;
