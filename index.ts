import express from 'express';

import calculateBmi from './bmiCalculator';
import { BmiInputValues, parseBmiArgs } from './utils/parseArgs';
import QueryString from 'qs';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

interface BmiOutput {
  weight: number;
  height: number;
  bmi: string;
};


// TODO: Add error handling (middleware?)

const checkQueryParameters = (query: QueryString.ParsedQs) => {
 if (isNaN(Number(query.height)) || isNaN(Number(query.weight))) {
  throw new Error('malformatted parameters');
 }
}

const parseBmiQuery = (query: QueryString.ParsedQs): BmiInputValues => {
  if (query.height && query.weight) {
      checkQueryParameters(query);
      const args = [query.height.toString(), query.weight.toString()];
      return parseBmiArgs(args,2);
  } else {
    throw new Error('malformatted parameters');
  }
}

const prepareBmiResponse = (bmiInput: BmiInputValues): BmiOutput => {
  const { height, weight } = bmiInput;
  const bmi = calculateBmi(height, weight);
  return { weight, height, bmi };
}

app.get('/bmi', (req, res) => {
  console.log('req.query: ',req.query);
  const bmiInput = parseBmiQuery(req.query);
  console.log('bmiIniput: ',bmiInput);
  const bmiResult = prepareBmiResponse(bmiInput);
  res.json(bmiResult);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
