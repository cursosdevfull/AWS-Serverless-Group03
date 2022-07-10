import { getPathHandler } from "../libs/getPathHandler";

export default {
  handler: `${getPathHandler(__dirname)}/handler.appointmentHandler`,
  events: [
    {
      sqs: {
        arn: "${ssm:/digital/sql-dlq-deployment-name-${self:provider.stage}}",
      },
    },
  ],
};
