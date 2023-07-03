import { Diagnosis, Discharge, EntryTypes, HealthCheckRating, NewEntry, SickLeaveDuration } from "../types";
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

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if(!isNaN(Number(healthCheckRating)) && isHealthCheckRating(Number(healthCheckRating))) {
    return Number(healthCheckRating);
  } else {
    throw new Error('Missing or invalid HealthCheckRating');
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
  } else if ('criteria' in discharge || 'date' in discharge) {
      throw new Error('Dischrage requires both criteria and date fields');
  }
  return undefined;
};

const parseEmployerName = (employerName: unknown): string => {
  return parseStringParam('employerName', employerName);
};

const parseSickLeave = (sickLeave: unknown): SickLeaveDuration | undefined => {
  if(!sickLeave) {
    return undefined;
  }
  if(typeof sickLeave !== 'object' ) {
    throw new Error('Missing or incorrect sick leave duration information');
  }
  if ('startDate' in sickLeave && 'endDate' in sickLeave) {
    if (!isString(sickLeave.startDate) || !isDate(sickLeave.startDate) 
        || !isString(sickLeave.endDate) || !isDate(sickLeave.endDate)) {
      throw new Error('Incorrect sick leave date');
    }
    const startDate = sickLeave.startDate;
    const endDate = sickLeave.endDate;
    return { startDate, endDate };
  } else if ('startDate' in sickLeave || 'endDate' in sickLeave) {
    throw new Error('A valid sick leave duration requires both start and end dates.');
  }
  return undefined;
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data (typeof object !== \'object\'');
  }
  console.log('object test passed');
  if('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {
    // required and shared fields
    console.log('testing required shared fields');
    const description = parseDescription(object.description);
    const date =  parseDate(object.date);
    const specialist = parseSpecialist(object.specialist);
    const type = parseEntryType(object.type);
    if (!type) {
      throw new Error('Incorrect data: type field is missing');
    }

    console.log('next diagnosis codes:');
    // optional and shared field 
    const diagnosisCodes = 'diagnosisCodes' in object
      ? parseDiagnosisCodes(object)
      : undefined;

    console.log('shared fields passed');
    console.log('Testing HealthCheck fields');
    // HealthCheck fields
    if (type === 'HealthCheck') {
      console.log('type confirmed to be HealthCheck');
      const healthCheckRating = 'healthCheckRating' in object
        ? parseHealthCheckRating(object.healthCheckRating)
        : undefined;

      console.log('healthCheckRating validated, next trying to create object');
      console.log('This fails here');
      console.log('if(healthCheckRating) tests this healthCheckRating ',healthCheckRating);
      console.log('if healthCheckRating === 0, if(0) is false :(');
      console.log('What if tests HealthCheckRating[healthCheckRating]?');
      console.log('will zero pass then?');
      if (!healthCheckRating && healthCheckRating !== 0) {
        throw new Error('Required health check rating missing or invalid');
      }
      console.log('insdide if(healthCheckRating');
      const newEntry: NewEntry = {
        description,
        date,
        specialist,
        type,
        diagnosisCodes,
        healthCheckRating
      };

        console.log('HealthCheckEntry created, returning it');

        return newEntry;
    
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
      if ('employerName'in object) {
        const employerName = parseEmployerName(object.employerName);
        const sickLeave = 'sickLeave' in object
          ? parseSickLeave(object.sickLeave)
          : undefined;
        
        const newEntry: NewEntry = {
          description,
          date,
          specialist,
          type,
          diagnosisCodes,
          employerName,
          sickLeave
        };
      return newEntry;

      } else {
        throw new Error('Missing or incorrect employerName');
      }
    } else {
      throw new Error('Unknown type entry');
    }
  }
  throw new Error(`Incorrect data: some fields are missing (type, description, date, specialist): ${JSON.stringify(object)}`);
};

export default toNewEntry;
