import { Appointment } from "../domain/appointment";
import * as AWS from "aws-sdk";

const awsLambda = new AWS.Lambda();

export abstract class Factory {
  abstract lambdaNameInvoke: string;
  async sendMessage(appointment: Appointment): Promise<Appointment> {
    console.log(`Sending ${appointment.countryISO}`);

    await awsLambda
      .invoke({
        InvocationType: "RequestResponse",
        FunctionName: this.lambdaNameInvoke,
      })
      .promise();

    return appointment;
  }
}

export class FactoryPE extends Factory {
  lambdaNameInvoke: string = "appointment-pe-dev";
}

export class FactoryCO extends Factory {
  lambdaNameInvoke: string = "appointment-co-dev";
}

export class FactoryEC extends Factory {
  lambdaNameInvoke: string = "appointment-ec-dev";
}
