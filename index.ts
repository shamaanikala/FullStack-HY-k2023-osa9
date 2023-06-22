import express from 'express';

import calculateBmi from './bmiCalculator';
import { BmiInputValues, parseBmiArgs } from './utils/parseArgs';
import QueryString from 'qs';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

// interface BmiQueryInput {
//   height: string;
//   weight: string;
// };

const parseBmiQuery = (query: QueryString.ParsedQs): BmiInputValues => {
  if (query.height && query.weight) {
      const args = [query.height.toString(), query.height.toString()];
      return parseBmiArgs(args,2);
  } else {
    throw new Error('malformatted parameters');
  }
}

app.get('/bmi', (req, res) => {
  console.log('/bmi');
  console.log(req.query);
  const bmiInput = parseBmiQuery(req.query);
  console.log('bmiIniput: ',bmiInput);
  const { height, weight } = bmiInput;
  console.log(calculateBmi(height, weight));
  const dummyHeight = 180;
  const dummyWeight = 72;
  const bmiDummyResponse = {
    dummyHeight: 180,
    dummyWeight: 72,
    bmi: calculateBmi(dummyHeight, dummyWeight)
  };
  res.json(bmiDummyResponse);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
