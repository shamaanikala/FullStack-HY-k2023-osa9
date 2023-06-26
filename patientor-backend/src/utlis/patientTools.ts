import { NewPatient } from "../types";
import { isString, parseStringParam } from "./parseTools";

// Adding individual but currently redundant parsers for each field
// as they could be done with just one function parsing valid string
// Or let's at least add a parseStringParam to parseTools

const parseName = (name: unknown): string => {
  return parseStringParam('name', name);
};

const parseDateOfBirt = (dateOfBirth: unknown): string => {
  return parseStringParam('dateOfBirth', dateOfBirth);
};

const parseSSN = (ssn: unknown): string => {
  return parseStringParam('ssn', ssn);
};

const parseGender = (gender: unknown): string => {
  return parseStringParam('gender', gender);
};

const parseOccupation = (occupation: unknown): string => {
  return parseStringParam('occupation', occupation);
};

const toNewPatient = (object: unknown): NewPatient => {
  console.log(object);
  const newPatient: NewPatient = { ...object };
  return newPatient;
};

export default toNewPatient;

// "name": "John McClane",
// "dateOfBirth": "1986-07-09",
// "ssn": "090786-122X",
// "gender": "male",
// "occupation": "New york city cop"
