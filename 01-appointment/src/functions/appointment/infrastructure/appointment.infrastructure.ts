import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../domain/repositories/appoinment.repository";
import { Factory } from "./appointment.factory";

export class AppointmentInfrastructure implements AppointmentRepository {
  async create(appointment: Appointment, factory: Factory) {
    return await factory.sendMessage(appointment);
  }
}
