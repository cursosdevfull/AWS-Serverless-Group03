import { getPathHandler } from "../libs/getPathHandler";

export default {
  handler: `${getPathHandler(__dirname)}/handler.clientHandler`,
  events: [
    {
      http: {
        method: "post",
        path: "/client",
        authorizer: "authorizer",
      },
    },
  ],
};
