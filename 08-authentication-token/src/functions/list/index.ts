import { getPathHandler } from "../libs/getPathHandler";

export default {
  handler: `${getPathHandler(__dirname)}/handler.listHandler`,
  events: [
    {
      http: {
        method: "get",
        path: "list",
        authorizer: "aws_iam",
      },
    },
  ],
};
