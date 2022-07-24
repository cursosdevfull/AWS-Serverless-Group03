import jwt from "jwt-simple";

const validateToken = (token: string): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    try {
      jwt.decode(token, process.env.JWT_SECRET);
      resolve(true);
    } catch (error) {
      reject(false);
    }
  });
};

const generatePolicy = (principalId: string, effect: string, arn: string) => {
  const policyDocument = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: effect,
        Action: "execute-api:Invoke",
        Resource: arn,
      },
    ],
  };

  return {
    principalId,
    policyDocument,
  };
};

export const authenticationHandler = async (event) => {
  const { authorizationToken, methodArn } = event;

  try {
    await validateToken(authorizationToken);
    return generatePolicy("user", "Allow", methodArn);
  } catch (error) {
    return generatePolicy("user", "Deny", methodArn);
  }
};
