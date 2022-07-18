import type { AWS } from "@serverless/typescript";

import { register, login } from "./src/functions";

const serverlessConfiguration: AWS = {
  service: "authentication",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "${opt:stage, 'dev'}",
    apiGateway: {
      restApiId:
        "${ssm:/digital/api-gateway-rest-api-id-${self:provider.stage}}",
      restApiRootResourceId:
        "${ssm:/digital/api-gateway-rest-api-root-resource-id-${self:provider.stage}}",
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    deploymentBucket: {
      name: "${ssm:/digital/s3-bucket-deployment-name-${self:provider.stage}}",
      serverSideEncryption: "AES256",
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        name: "authentication-role-${self:provider.stage}",
        statements: [
          {
            Effect: "Allow",
            Action: [
              "logs:CreateLogGroup",
              "logs:CreateLogStream",
              "logs:PutLogEvents",
            ],
            Resource: "arn:aws:logs:*:*:*",
          },

          {
            Effect: "Allow",
            Action: "dynamodb:*",
            Resource: "arn:aws:dynamodb:us-east-1:*:table/Authentication-dev",
          },
        ],
      },
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
      exclude: ["aws-sdk"],
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    apiGateway: {
      restApiId: "wj33urp139",
      restApiRootResourceId: "ur83wck6fa",
    },
  },
  functions: { register, login },
};

module.exports = serverlessConfiguration;
