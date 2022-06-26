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
      S3BucketDeploymentLambdas: {
        Type: "AWS::S3::Bucket",
        Properties: {
          BucketName: "digital-awscurso09-${self:provider.stage}",
        },
      },
      SSMAPIGatewayRestApiId: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/digital/api-gateway-rest-api-id-${self:provider.stage}",
          Type: "String",
          Value: "wj33urp139",
        },
      },
      SSMAPIGatewayRestApiRootResourceId: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/digital/api-gateway-rest-api-root-resource-id-${self:provider.stage}",
          Type: "String",
          Value: "ur83wck6fa",
        },
      },
      SSMS3BucketDeployment: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/digital/s3-bucket-deployment-name-${self:provider.stage}",
          Type: "String",
          Value: {
            Ref: "S3BucketDeploymentLambdas",
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
