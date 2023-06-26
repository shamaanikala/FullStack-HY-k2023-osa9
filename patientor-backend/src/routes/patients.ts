import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utlis/patientTools';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log(`GET : ${_req.baseUrl}`);
  res.send(patientsService.getPatientsSansSSN());
});

router.post('/', (req, res) => {
  console.log(`POST : ${req.baseUrl}`);
  console.log(`POST : ${req.body}`);
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