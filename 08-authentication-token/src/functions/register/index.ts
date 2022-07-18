import { getPathHandler } from "../libs/getPathHandler";

export default {
  handler: `${getPathHandler(__dirname)}/handler.registerHandler`,
  events: [
    {
      http: {
        method: "post",
        path: "/auth/register",
        integration: "lambda",
      },
    },
  ],
};
