import * as AWS from "aws-sdk";
import { v4 } from "uuid";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const registerHandler = async (event) => {
  const body = event.body;
  const id = v4();

  const register = { id, ...body };
  await dynamodb
    .put({
      TableName: "Authentication-dev",
      Item: register,
    })
    .promise();
};
