import { Diagnosis, Discharge, EntryTypes, HealthCheckRating, NewEntry } from "../types";
import { parseStringParam, isDate, isString } from "./parseTools";


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

const isEntryType = (param: string): param is EntryTypes => {
  return Object.values(EntryTypes).map(v => v.toString()).includes(param);
};

const parseEntryType = (type: unknown): "HealthCheck" | "OccupationalHealthcare" | "Hospital" | undefined => {
  const param = parseStringParam('type', type);
  return isEntryType(param)
    ? EntryTypes[param]
    : undefined;
};


const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating | undefined => {
  if(!isNaN(Number(healthCheckRating)) && isHealthCheckRating(Number(healthCheckRating))) {
    return Number(healthCheckRating);
  } else {
    return undefined;
  }
};

const parseDischarge = (discharge: unknown): Discharge | undefined => {
  if (!discharge) {
    return undefined;
  }
  if(typeof discharge !== 'object' ) {
    throw new Error('Missing or incorrect discharge information');
  }
  if ('criteria' in discharge && 'date' in discharge) {
    if (!isString(discharge.criteria) || !isString(discharge.date) || !isDate(discharge.date)) {
      throw new Error('Incorrect discharge date');
    }
    const date = discharge.date;
    const criteria = discharge.criteria;
    return { date, criteria };
  }
  return undefined;
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

  if('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {
    // required and shared fields
    const description = parseDescription(object.description);
    const date =  parseDate(object.date);
    const specialist = parseSpecialist(object.specialist);
    const type = parseEntryType(object.type);
    if (!type) {
      throw new Error('Incorrect data: type field is missing');
    }

    // optional and shared field 
    const diagnosisCodes = 'diagnosisCodes' in object
      ? parseDiagnosisCodes(object)
      : undefined;

    

    // HealthCheck fields
    if (type === 'HealthCheck') {
      const healthCheckRating = 'healthCheckRating' in object
        ? parseHealthCheckRating(object.healthCheckRating)
        : undefined;

      if(healthCheckRating) {
        const newEntry: NewEntry = {
          description,
          date,
          specialist,
          type,
          diagnosisCodes,
          healthCheckRating
        };
        return newEntry;
      }
    } else if (type === 'Hospital') {
    // Hospital fields
      const discharge = 'discharge' in object
        ? parseDischarge(object.discharge)
        : undefined;

      const newEntry: NewEntry = {
        description,
        date,
        specialist,
        type,
        diagnosisCodes,
        discharge
      };
      return newEntry;

    } else if (type === 'OccupationalHealthcare') {
    // Occupational fields
    } else {
      throw new Error('Unknown type entry');
    }


    


  }
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewEntry;
