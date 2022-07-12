import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "infrastructure",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "${opt:stage, 'dev'}",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
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
  resources: {
    Resources: {
      /* S3BucketDeploymentLambdas: {
        Type: "AWS::S3::Bucket",
        DeletionPolicy: "Retain",
        Properties: {
          BucketName: "digital-awscurso09-${self:provider.stage}",
        },
      }, */
      SSMAPIGatewayRestApiId: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/digital/api-gateway-rest-api-id-${self:provider.stage}",
          Type: "String",
          Value: "h9o3t08dcf",
        },
      },
      SSMAPIGatewayRestApiRootResourceId: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/digital/api-gateway-rest-api-root-resource-id-${self:provider.stage}",
          Type: "String",
          Value: "w9m6b02jz5",
        },
      },
      SSMS3BucketDeployment: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/digital/s3-bucket-deployment-name-${self:provider.stage}",
          Type: "String",
          Value: "digital-awscurso09-${self:provider.stage}",
          /* Value: {
            Ref: "S3BucketDeploymentLambdas",
          }, */
        },
      },
      EventBus: {
        Type: "AWS::Events::EventBus",
        Properties: {
          Name: "EventBusCursoAWS09",
        },
      },
      SQSDLQ: {
        Type: "AWS::SQS::Queue",
        Properties: {
          MessageRetentionPeriod: 86400,
          QueueName: "SQSDLQ-${self:provider.stage}",
          VisibilityTimeout: 20,
        },
      },
      SSMDLQ: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/digital/sql-dlq-deployment-name-${self:provider.stage}",
          Type: "String",
          Value: { "Fn::GetAtt": ["SQSDLQ", "Arn"] },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
