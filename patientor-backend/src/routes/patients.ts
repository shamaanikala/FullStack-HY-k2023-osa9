import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utlis/patientTools';
import { Patient } from '../types';
import toNewEntry from '../utlis/entryTools';

const router = express.Router();

router.get('/:id', (req,res) => {
  console.log((`GET : ${req.baseUrl}/${req.params.id}`));
  const patient: Patient | undefined = patientsService.getPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    console.log('not found');
    res.status(404).send({});
  }
});


router.post('/:id/entries', (req, res) => {
  console.log(`POST : ${req.baseUrl}`);
  console.log('- Received object', req.body);
  try {
    const newEntry = toNewEntry(req.body);

    console.log(newEntry);
    
    res.send(newEntry);
  } catch (error: unknown) {
    let errorMessage = `Something went wrong (${req.baseUrl})`;
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }

});

router.get('/', (_req, res) => {
  console.log(`GET : ${_req.baseUrl}`);
  res.send(patientsService.getPatientsSansSSN());
});
router.post('/', (req, res) => {
  console.log(`POST : ${req.baseUrl}`);
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = `Something went wrong (${req.baseUrl})`;
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


export default router;