import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from '../../services/patients';

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

  return (
    <div>
      {patient && <h1>{patient.name}</h1>}
    </div>
  );
};

export default PatientPage;