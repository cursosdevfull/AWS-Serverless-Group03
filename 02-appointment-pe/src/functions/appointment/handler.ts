import * as AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const appointmentHandler = async (event) => {
  console.log("Appointment in Peru");
  const id = event.detail.id;

  const result = await dynamodb
    .update({
      TableName: "Appointment-dev",
      UpdateExpression: "set status_appointment = :newStatus",
      ExpressionAttributeValues: {
        ":newStatus": 1,
      },
      Key: { id },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  console.log(result);

  return event;
};
