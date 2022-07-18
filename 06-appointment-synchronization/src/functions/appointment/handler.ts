import * as AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

export const appointmentHandler = async (event) => {
  console.log("Appointment Synchronization");

  const objS3 = event.Records[0].s3;
  const bucketName = objS3.bucket.name;
  const key = objS3.object.key;

  console.log("Parameters", JSON.stringify({ bucketName, key }));

  const parameters = { Bucket: bucketName, Key: key };
  const data = await s3.getObject(parameters).promise();
  const body = data.Body.toString("utf-8");
  const lines = body.split("\n");

  const listPromises = [];

  lines.forEach((line: string) => {
    const dataMedic = line.split(",");
    const newMedic = {
      id: dataMedic[0],
      name: dataMedic[1],
      lastname: dataMedic[2],
      speciality: dataMedic[3],
    };
    listPromises.push(
      dynamodb
        .put({
          TableName: "Medic-dev",
          Item: newMedic,
        })
        .promise()
    );
  });

  await Promise.all(listPromises);

  return event;
};
