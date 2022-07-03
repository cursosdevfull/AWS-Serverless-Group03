import { getPathHandler } from "../libs/getPathHandler";

export default {
  handler: `${getPathHandler(__dirname)}/handler.appointmentHandler`,
  events: [
    {
      eventBridge: {
        eventBus:
          "arn:aws:events:us-east-1:282865065290:event-bus/EventBusCursoAWS09",
        pattern: {
          source: ["appointment"],
          "detail-type": ["appointment-create-ec"],
        },
      },
    },
  ],
};
