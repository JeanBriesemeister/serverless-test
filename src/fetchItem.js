"use strict";

const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const fetchItem = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  let item;

  try {
    const result = await dynamoDB
      .scan({
        TableName: "ItemTableNew",
        Key: { id },
      })
      .promise();
    item = result.Item;
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(item),
  };
};

module.exports = {
  handler: fetchItem,
};
