export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

// frontend has following selection options:
// male, female, other
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type PatientSansSSN = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;