const dynamo = require('ebased/service/storage/dynamo');

const updateUser = async query => {
  let updateExpression = 'set';
  let expressionAttributeNames = {};
  let expressionAttributeValues = {};

  for (const property in query.body) {
    updateExpression += ` #${property} = :${property} ,`;
    expressionAttributeNames['#' + property] = property;
    expressionAttributeValues[':' + property] = query.body[property];
  }

  updateExpression = updateExpression.slice(0, -1);

  const params = {
    TableName: query.table,
    Key: { [query.primaryKey]: query.primaryKeyValue },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'ALL_NEW'
  };

  return await dynamo.updateItem(params);
};

module.exports = updateUser;
