import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('diagnoses route!');
  res.send('diagnoses api call!');
});

export default router;