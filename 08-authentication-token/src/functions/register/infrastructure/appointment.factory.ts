import { Appointment } from "../domain/appointment";
import * as AWS from "aws-sdk";
import { v4 } from "uuid";

export interface IPattern {
  Source: string;
  DetailType: string;
}

//const awsLambda = new AWS.Lambda();
const awsEventBridge = new AWS.EventBridge();
const dynamodb = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();

export abstract class Factory {
  //abstract lambdaNameInvoke: string;
  abstract pattern: IPattern;

  async sendMessage(appointment: Appointment): Promise<any> {
    console.log(`Sending ${appointment.countryISO}`);
    const id = v4();

    const parameters = {
      Entries: [
        {
          ...this.pattern,
          Detail: JSON.stringify({ ...appointment, id }),
          EventBusName: "EventBusCursoAWS09",
        },
      ],
    };

    //console.log(parameters);

    const newAppointment = { id, ...appointment };
    await dynamodb
      .put({
        TableName: "Appointment-dev",
        Item: newAppointment,
      })
      .promise();

    const parametersSNS = {
      Message: JSON.stringify({ id, ...appointment }),
      TopicArn: process.env.SNS_TOPICO_CURSO03_ARN,
    };

    const result = await sns.publish(parametersSNS).promise();

    /* Descomentar si se require enviar a un eventbridge*/
    //const result = await awsEventBridge.putEvents(parameters).promise();

    //Descomentar si se quiere enviar información a un lambda
    /* const result = await awsLambda
      .invoke({
        InvocationType: "RequestResponse",
        FunctionName: this.lambdaNameInvoke,
        Payload: JSON.stringify(appointment),
      })
      .promise(); */

    return result;
  }
}

export class FactoryPE extends Factory {
  // lambdaNameInvoke: string = process.env.LAMBDA_CORE_PE;
  pattern: IPattern = {
    Source: "appointment",
    DetailType: "appointment-create-pe",
  };
}

export class FactoryCO extends Factory {
  //lambdaNameInvoke: string = process.env.LAMBDA_CORE_CO;
  pattern: IPattern = {
    Source: "appointment",
    DetailType: "appointment-create-co",
  };
}

export class FactoryEC extends Factory {
  //lambdaNameInvoke: string = process.env.LAMBDA_CORE_EC;
  pattern: IPattern = {
    Source: "appointment",
    DetailType: "appointment-create-ec",
  };
}
