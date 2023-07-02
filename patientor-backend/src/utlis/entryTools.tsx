import { Diagnosis, NewEntry } from "../types";
import { parseStringParam } from "./parseTools";


const parseDescription = (description: unknown): string => {
  return parseStringParam('description', description);
};

const parseDate = (date: unknown): string => {
  return parseStringParam('date', date);
};

const parseSpecialist = (specialist: unknown): string => {
  return parseStringParam('specialist', specialist);
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  /*
  if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirt(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
      };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
  */

  if('description' in object && 'date' in object && 'specialist' in object) {
    console.log('pakolliest');
    const description = parseDescription(object.description);
    const date =  parseDate(object.date);
    const specialist = parseSpecialist(object.specialist);
    
    const diagnosisCodes = 'diagnosisCodes' in object
      ? parseDiagnosisCodes(object)
      : undefined;

    const newEntry: NewEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewEntry;
