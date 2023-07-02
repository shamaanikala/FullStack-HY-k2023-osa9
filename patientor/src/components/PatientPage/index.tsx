import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from '../../services/patients';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Card, CardContent } from "@mui/material";
import EntriesList from "./EntriesList";

import { calculateAge } from "../../utils";

// or no props and use React Router useParams
const PatientPage = () => {
  console.log(useParams().id);
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();

  const getPatientInformation = async (id: string) => {
    const response = await patientService.getOneById(id);
    return response;
  };

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        if (id) {
          const response = await getPatientInformation(id);
          setPatient(response);
        } else {
          throw new Error('Missing patient id!');
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }
      }
    };
    if (id) {
      fetchData(id);
    }
  },[id]);

  if (!patient) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <span>
        <h1>
          {patient.name}{" "}
          {patient.gender === 'male' &&  <span title="male"><MaleIcon fontSize="small" /></span>}
          {patient.gender === 'female' && <span title="female"><FemaleIcon fontSize="small" /></span>}
          {patient.gender === 'other' && <span title="gender: other"><small><i>other</i></small></span>}
        </h1></span>
        <div title={`Exact age: ${parseFloat(calculateAge(patient.dateOfBirth).toString()).toFixed(2)}`}>
          age: {Math.floor(calculateAge(patient.dateOfBirth))}
        </div>
        <div>
          ssn: {patient.ssn}
        </div>
        <div>
          occupation: {patient.occupation}
        </div>
        <div>
          <EntriesList entries={patient.entries} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientPage;