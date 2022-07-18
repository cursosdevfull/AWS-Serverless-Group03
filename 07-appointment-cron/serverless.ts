import type { AWS } from "@serverless/typescript";

import { appointment } from "./src/functions";

const serverlessConfiguration: AWS = {
  service: "appointment-cron",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "${opt:stage, 'dev'}",
    deploymentBucket: {
      serverSideEncryption: "AES256",
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        name: "appointment-cron-role-${self:provider.stage}",
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
            Resource: "arn:aws:dynamodb:us-east-1:*:table/Medic-dev",
          },
          {
            Effect: "Allow",
            Action: "ses:SendEmail",
            Resource: "*",
          },
          {
            Effect: "Allow",
            Action: "s3:GetObject",
            Resource: "arn:aws:s3:::cursoaws02/*",
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
  },
  functions: { appointment },
};

module.exports = serverlessConfiguration;
