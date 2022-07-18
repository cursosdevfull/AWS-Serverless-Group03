import { getPathHandler } from "../libs/getPathHandler";

export default {
  handler: `${getPathHandler(__dirname)}/handler.appointmentHandler`,
  events: [
    {
      schedule: "cron(0/1 * * * ? *)",
    },
  ],
};
