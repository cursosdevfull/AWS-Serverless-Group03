export interface AppointmentFieldsRequired {
  readonly idMedic: string;
  readonly idSpeciality: string;
  readonly idAgenda: string;
  readonly pacientName: string;
  readonly pacientLastName: string;
  readonly pacientPhone: string;
  readonly status_appointment: number;
  readonly countryISO: string;
}

export type FieldsRequired = Required<AppointmentFieldsRequired>;

export class Appointment {
  readonly idMedic: string;
  readonly idSpeciality: string;
  readonly idAgenda: string;
  readonly pacientName: string;
  readonly pacientLastName: string;
  readonly pacientPhone: string;
  readonly countryISO: string;
  status_appointment: number;

  constructor(properties: FieldsRequired) {
    Object.assign(this, properties);
  }
}
