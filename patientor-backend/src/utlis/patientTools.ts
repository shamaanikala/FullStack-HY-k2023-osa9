import { NewPatient } from "../types";

const toNewPatient = (object: NewPatient): NewPatient => {
// const toNewPatient = (object: unknown): NewPatient => {
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
