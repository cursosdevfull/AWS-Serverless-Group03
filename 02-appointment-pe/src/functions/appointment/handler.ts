import * as AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const appointmentHandler = async (event) => {
  console.log("Appointment in Peru");
  console.log(JSON.stringify(event));

  const records = event.Records;

  const listPromises = [];

  for (let record of records) {
    /*Para recibir de un SNS*/
    /*     const body = JSON.parse(record.Sns.Message);
    const id = body.id; */

    /*Para recibir de un SQS con EventBridge*/
    //const body = JSON.parse(record.body);
    //const id = body.detail.id;

    /*Para recibir de un SQS con SNS*/
    const body = JSON.parse(record.body);
    const message = JSON.parse(body.Message);
    const id = message.id;

    listPromises.push(
      dynamodb
        .update({
          TableName: "Appointment-dev",
          UpdateExpression: "set status_appointment = :newStatus",
          ExpressionAttributeValues: {
            ":newStatus": 1,
          },
          Key: { id },
          ReturnValues: "ALL_NEW",
        })
        .promise()
    );
  }

  const results = await Promise.all(listPromises);
  console.log("results: ", results);
  if (results[0].Attributes.pacientPhone === "999-999-999") {
    throw new Error("An error ocurred");
  }

  return { statusCode: 403, body: "An error occurred while updating" };
};
