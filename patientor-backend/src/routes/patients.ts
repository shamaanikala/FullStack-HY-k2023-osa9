import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log(`GET : ${_req.baseUrl}`);
  res.send(patientsService.getPatientsSansSSN());
});

router.post('/', (req, res) => {
  console.log(`POST : ${req.baseUrl}`);
  console.log('data: ', req.body);
  res.status(201).json(req.body);
});

export default router;