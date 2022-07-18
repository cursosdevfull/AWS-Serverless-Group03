import { Factory } from "../../infrastructure/appointment.factory";
import { Appointment } from "../appointment";

export interface AppointmentRepository {
  create(appointment: Appointment, factory: Factory): Promise<Appointment>;
}
