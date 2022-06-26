import { getPathHandler } from "../libs/getPathHandler";

export default {
  handler: `${getPathHandler(__dirname)}/handler.appointmentHandler`,
  events: [
    {
      http: {
        method: "post",
        path: "/appointment",
        integration: "lambda",
      },
    },
  ],
};
