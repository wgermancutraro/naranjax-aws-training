const { InputValidation } = require('ebased/schema/inputValidation');

class CreatePurchaseInputValidation extends InputValidation {
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
        products: { type: [], required: true }
      }
    });
  }
}

module.exports = CreatePurchaseInputValidation;
