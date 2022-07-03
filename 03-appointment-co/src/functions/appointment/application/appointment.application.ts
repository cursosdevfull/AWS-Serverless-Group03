import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../domain/repositories/appoinment.repository";
import {
  Factory,
  FactoryCO,
  FactoryEC,
  FactoryPE,
} from "../infrastructure/appointment.factory";

export class AppointmentApplication {
  constructor(private appointmentRepository: AppointmentRepository) {}

  create(appointment: Appointment) {
    let factory: Factory;

    switch (appointment.countryISO) {
      case "PE":
        factory = new FactoryPE();
        break;
      case "CO":
        factory = new FactoryCO();
        break;
      case "EC":
        factory = new FactoryEC();
        break;
    }
    return this.appointmentRepository.create(appointment, factory);
  }
}
