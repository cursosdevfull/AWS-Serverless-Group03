import { AppointmentApplication } from "../../application/appointment.application";
import { Appointment } from "../../domain/appointment";

export class AppointmentController {
  constructor(private appointmentApplication: AppointmentApplication) {}

  async create(appointment: Appointment) {
    return await this.appointmentApplication.create(appointment);
  }
}
