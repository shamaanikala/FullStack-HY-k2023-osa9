import express from 'express';

import calculateBmi from './bmiCalculator';

const app = express();


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

// interface BmiQuery {
//   height: string;
//   weight: string;
// };

// const parseBmiQuery = (query: BmiQuery) {
  
// }

app.get('/bmi', (req, res) => {
  console.log('/bmi');
  console.log(req.query);
  const height = 180;
  const weight = 72;
  const bmiDummyResponse = {
    weight,
    height,
    bmi: calculateBmi(height, weight)
  };
  res.json(bmiDummyResponse);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
