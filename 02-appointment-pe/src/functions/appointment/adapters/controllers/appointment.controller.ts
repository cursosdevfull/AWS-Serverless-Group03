import { AppointmentApplication } from "../../application/appointment.application";
import { Appointment } from "../../domain/appointment";

export class AppointmentController {
  constructor(private appointmentApplication: AppointmentApplication) {}

  create(appointment: Appointment) {
    return this.appointmentApplication.create(appointment);
  }
}
