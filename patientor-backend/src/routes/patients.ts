import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log(`GET : ${_req.baseUrl}`);
  res.send(patientsService.getPatients());
});

export default router;