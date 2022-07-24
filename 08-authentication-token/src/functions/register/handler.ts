import * as AWS from "aws-sdk";
import { v4 } from "uuid";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const registerHandler = async (event) => {
  const body = event.body;

  const register = { ...body };
  await dynamodb
    .put({
      TableName: "AuthenticationCurso-dev",
      Item: register,
    })
    .promise();
};
