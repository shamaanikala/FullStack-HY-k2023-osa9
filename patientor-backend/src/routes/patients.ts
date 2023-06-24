import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log(`GET : ${_req.baseUrl}`);
  res.send('Patient data...');
});

export default router;