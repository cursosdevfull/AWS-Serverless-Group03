import { getPathHandler } from "../libs/getPathHandler";

export default {
  handler: `${getPathHandler(__dirname)}/handler.medic`,
  events: [
    {
      http: {
        method: "get",
        path: "/medic",
      },
    },
  ],
};
