import { NewPatient } from "../types";

const toNewPatient = (object: unknown): NewPatient => {
  console.log(object);
  const newPatient: NewPatient = {
    name: "Donald Fauntleroy Duck",
    dateOfBirth: "1934-03-13",
    ssn: "13031934-AKUA",
    gender: "male",
    occupation: "International Duck of Mystery"
  };
  return newPatient;
};

export default toNewPatient;

// "name": "John McClane",
// "dateOfBirth": "1986-07-09",
// "ssn": "090786-122X",
// "gender": "male",
// "occupation": "New york city cop"
