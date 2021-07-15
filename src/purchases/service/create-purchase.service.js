const dynamo = require('ebased/service/storage/dynamo');

const table = process.env.PURCHASE_TABLE_NAME;

const createPurchase = body => dynamo.putItem({ TableName: table, Item: body });

module.exports = createPurchase;
