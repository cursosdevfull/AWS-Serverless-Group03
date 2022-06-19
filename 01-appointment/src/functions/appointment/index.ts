import { getPathHandler } from "../libs/getPathHandler";

export default {
  handler: `${getPathHandler(__dirname)}/handler.appointment`,
  events: [
    {
      http: {
        method: "post",
        path: "/appointment",
      },
    },
  ],
};
