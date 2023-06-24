import patients from '../../data/patients';
import { Patient, PatientSansSSN } from '../types';

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

export default {
  getPatients,
  getPatientsSansSSN,
};
