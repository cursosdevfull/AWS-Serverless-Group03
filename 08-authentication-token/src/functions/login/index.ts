import { getPathHandler } from "../libs/getPathHandler";

export default {
  handler: `${getPathHandler(__dirname)}/handler.loginHandler`,
  events: [
    {
      http: {
        method: "post",
        path: "/auth/login",
        integration: "lambda",
      },
    },
  ],
};
