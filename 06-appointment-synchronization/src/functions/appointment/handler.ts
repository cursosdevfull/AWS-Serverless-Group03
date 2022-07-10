import * as AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

export const appointmentHandler = async (event) => {
  console.log("Appointment Synchronization");

  const objS3 = event.Records[0].s3;
  const bucketName = objS3.bucket.name;
  const key = objS3.object.key;

  console.log("bucketName: " + bucketName);
  console.log("key: " + key);

  const parameters = { Bucket: bucketName, Key: key };

  const data = await s3.getObject(parameters).promise();

  console.log("data", data);

  console.log(event);

  return event;
};
