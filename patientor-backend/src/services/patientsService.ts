import patients from '../../data/patients';
import { Entry, NewEntry, NewPatient, Patient, PatientSansSSN } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = () : Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined => {
  const result = patients.find(p => p.id === id);
  // const entries: Entry[] = [];
  // return result ? { ...result, entries } : undefined;
  return result;
};

const getPatientsSansSSN = () : PatientSansSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = ( patient: NewPatient ): Patient => {
  const id: string = uuid();
  const newPatient = {
    id,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const addPatientEntry = ( patientId: string, entry: NewEntry ): Entry => {
  const entryId: string = uuid();
  const newEntry = {
    id: entryId,
    ...entry
  };

  const patient = patients.find(p => p.id === patientId);
  if (!patient) {
    throw new Error('Unable to add new entry: patient not found!');
  }
  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientById,
  getPatientsSansSSN,
  addPatient,
  addPatientEntry,
};
