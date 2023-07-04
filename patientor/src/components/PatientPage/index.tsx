import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EntryFormValues, Patient } from "../../types";
import patientService from '../../services/patients';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Button, Card, CardContent } from "@mui/material";
import EntriesList from "./EntriesList";

import { calculateAge } from "../../utils";
import AddEntryModal from "../AddEntryModal";
import entriesService from "../../services/entries";
import axios from "axios";

// or no props and use React Router useParams
const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();


  /**
   * The modal is propably not the optional choice as
   * the other entries can't be read while the entry form
   * is filled.
   * One solution would be to keep the state in memory
   * such that the specialist could close the modal temporarily
   * and not lose the already filled information.
   * 
   * But as I wanted to try the modal here, I'll use it for now
   * without cache functionality.
   * 
   *  */

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (patientId: string, values: EntryFormValues) => {
    console.log('submitNewEntry');
    console.log(values);
    try {
      const entry = await entriesService.create(patientId, values);
      patient?.entries.push(entry);
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          console.error(e.response.data);
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
    <div>
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
            <br />
            <AddEntryModal
              modalOpen={modalOpen}
              onSubmit={submitNewEntry}
              error={error}
              onClose={closeModal}
              patientId={patient.id}
            />
            <Button variant="contained" onClick={() => openModal()}>
              Add New Entry
            </Button>
          </div>
          <div>
            <EntriesList entries={patient.entries} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientPage;