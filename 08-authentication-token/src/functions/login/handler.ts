import * as AWS from "aws-sdk";
import jwt from "jwt-simple";
import moment from "moment";

const dynamodb = new AWS.DynamoDB.DocumentClient();

class Token {
  static generate(): string {
    const payload = {
      iat: moment().unix(),
      exp: moment().add(20, "minutes").unix(),
    };

    return jwt.encode(payload, "palabraSuperSecreta");
  }
}

export const loginHandler = async (event) => {
  const body = event.body;
  console.log(body);

  const result = await dynamodb
    .get({
      TableName: "Authentication-dev",
      Key: {
        email: body.email,
        password: body.password,
      },
    })
    .promise();

  if (result) {
    return {
      statusCode: 200,
      body: Token.generate(),
    };
  } else {
    return null;
  }
};
