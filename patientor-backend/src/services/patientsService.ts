import patients from '../../data/patients';
import { NewPatient, Patient, PatientSansSSN } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = () : Patient[] => {
  return patients;
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

export default {
  getPatients,
  getPatientsSansSSN,
  addPatient,
};
