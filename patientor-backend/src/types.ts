export interface Diagnosis {
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PatientSansSSN = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;