const { InputValidation } = require('ebased/schema/inputValidation');

class GetClientByIdValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      source: meta.status,
      payload,
      source: meta.source,
      specVersion: 'v1.0.0',
      schema: {
        strict: true,
        id: { type: String, required: true }
      }
    });
  }
}

module.exports = GetClientByIdValidation;
