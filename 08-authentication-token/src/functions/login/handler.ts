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

    return jwt.encode(payload, process.env.JWT_SECRET);
  }
}

export const loginHandler = async (event) => {
  const body = event.body;

  const result = await dynamodb
    .get({
      TableName: "AuthenticationCurso-dev",
      Key: {
        email: body.email,
      },
    })
    .promise();

  if (result && result.Item.password === body.password) {
    return {
      statusCode: 200,
      body: Token.generate(),
    };
  } else {
    return null;
  }
};
