import { getPathHandler } from "../libs/getPathHandler";

export default {
  handler: `${getPathHandler(__dirname)}/handler.appointmentHandler`,
  events: [
    {
      sqs: {
        arn: "${ssm:/digital/sqs-pe-arn-${self:provider.stage}}",
      },
      /*  sns: {
        arn: "${ssm:/digital/topic-sns-arn-${self:provider.stage}}",
        topic: "${ssm:/digital/topic-sns-name-topic-${self:provider.stage}}",
      }, */
      /*  eventBridge: {
        eventBus:
          "arn:aws:events:us-east-1:282865065290:event-bus/EventBusCursoAWS09",
        pattern: {
          source: ["appointment"],
          "detail-type": ["appointment-create-pe"],
        },
        deadLetterQueueArn:
          "${ssm:/digital/sql-dlq-deployment-name-${self:provider.stage}}",
      }, */
    },
  ],
};
