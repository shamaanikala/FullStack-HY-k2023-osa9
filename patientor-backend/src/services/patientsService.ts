import patients from '../../data/patients';
import { Patient } from '../types';

const getPatients = () : Patient[] => {
  return patients;
};

export default {
  getPatients,
};
