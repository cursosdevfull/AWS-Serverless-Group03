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
      S3BucketMedic: {
        Type: "AWS::S3::Bucket",
        DeletionPolicy: "Retain",
        Properties: {
          BucketName: "digital-awscurso09-medic-${self:provider.stage}",
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
          Value: "digital-awscurso09-${self:provider.stage}",
          /* Value: {
            Ref: "S3BucketDeploymentLambdas",
          }, */
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
      SQSPE: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SQS_PE_${self:provider.stage}",
          RedrivePolicy: {
            deadLetterTargetArn: { "Fn::GetAtt": ["SQSDLQ", "Arn"] },
            maxReceiveCount: 1,
          },
        },
      },
      EventBus: {
        Type: "AWS::Events::EventBus",
        Properties: {
          Name: "EventBusCursoAWS09",
        },
      },
      EventRulePE: {
        Type: "AWS::Events::Rule",
        Properties: {
          EventBusName: { "Fn::GetAtt": ["EventBus", "Name"] },
          EventPattern: {
            source: ["appointment"],
            "detail-type": ["appointment-create-pe"],
          },
          Targets: [{ Arn: { "Fn::GetAtt": ["SQSPE", "Arn"] }, Id: "SQSPE" }],
        },
      },
      EventBridgeToSQSPolicy: {
        Type: "AWS::SQS::QueuePolicy",
        Properties: {
          PolicyDocument: {
            Statement: [
              {
                Effect: "Allow",
                Principal: { Service: "events.amazonaws.com" },
                Action: "sqs:*",
                Resource: { "Fn::GetAtt": ["SQSPE", "Arn"] },
              },
            ],
          },
          Queues: [{ Ref: "SQSPE" }],
        },
      },
      SSMSQSPE: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/digital/sqs-pe-arn-${self:provider.stage}",
          Type: "String",
          Value: { "Fn::GetAtt": ["SQSPE", "Arn"] },
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
      AppointmentTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "Appointment-${self:provider.stage}",
          BillingMode: "PAY_PER_REQUEST",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
        },
      },
      MedicTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "Medic-${self:provider.stage}",
          BillingMode: "PAY_PER_REQUEST",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
        },
      },
      AuthenticationTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "Authentication-${self:provider.stage}",
          BillingMode: "PAY_PER_REQUEST",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
        },
      },
      SNSTOPICOCURSO03: {
        Type: "AWS::SNS::Topic",
        Properties: {
          Subscription: [
            {
              Protocol: "sqs",
              Endpoint: { "Fn::GetAtt": ["SQSPE", "Arn"] },
            },
          ],
          TopicName: "SNS_TOPICO_CURSO03_${self:provider.stage}",
        },
      },
      SNSToSQSPolicy: {
        Type: "AWS::SQS::QueuePolicy",
        Properties: {
          Queues: [{ Ref: "SQSPE" }],
          PolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Action: ["sqs:SendMessage"],
                Resource: "*",
                Principal: "*",
                Condition: {
                  ArnEquals: {
                    "aws:SourceArn": { Ref: "SNSTOPICOCURSO03" },
                  },
                },
              },
            ],
          },
        },
      },
      SSMTOPICOSNS: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/digital/topic-sns-arn-${self:provider.stage}",
          Type: "String",
          Value: { Ref: "SNSTOPICOCURSO03" },
        },
      },
      SSMTOPICOSNSNAME: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/digital/topic-sns-name-topic-${self:provider.stage}",
          Type: "String",
          Value: { "Fn::GetAtt": ["SNSTOPICOCURSO03", "TopicName"] },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
