import { Gender, NewPatient } from "../types";
import { isDate, isString, parseStringParam } from "./parseTools";

// Adding individual but currently redundant parsers for each field
// as they could be done with just one function parsing valid string
// Or let's at least add a parseStringParam to parseTools

// const patientFields = ['name', 'dateOfBirth', 'ssn', 'gender', 'occupation'];

const parseName = (name: unknown): string => {
  return parseStringParam('name', name);
};

const parseDateOfBirt = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
  return parseStringParam('ssn', ssn);
};

const isGender = (param: string): param is Gender => {
  // console.log(Object.values(Gender)); // [ 'male', 'female', 'other' ]
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  return parseStringParam('occupation', occupation);
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  // this reduce trick doesn't work as TS does not have any clue what is
  // happening in there. The condition with explicit field names must be
  // typed in, it seems :(
  // if(patientFields.reduce((check, field) => check && (field in object),true)) {
  if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirt(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
      };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;
