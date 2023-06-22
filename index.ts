import express from 'express';

import calculateBmi from './bmiCalculator';
import { BmiInputValues, parseBmiArgs } from './utils/parseArgs';
import QueryString from 'qs';

import type { ErrorRequestHandler } from 'express';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

interface BmiOutput {
  weight: number;
  height: number;
  bmi: string;
}


const checkQueryParameters = (query: QueryString.ParsedQs) => {
 if (isNaN(Number(query.height)) || isNaN(Number(query.weight))) {
  console.error('Error: checkQueryParameters: NaN query value!');
  throw new Error('malformatted parameters');
 }
};

const parseBmiQuery = (query: QueryString.ParsedQs): BmiInputValues => {
  if (query.height && query.weight) {
      checkQueryParameters(query);
      const args = [query.height.toString(), query.weight.toString()];
      return parseBmiArgs(args,2);
  } else {
    console.error('Error: parseBmiQuery: query params missing!');
    throw new Error('malformatted parameters');
  }
};

const prepareBmiResponse = (bmiInput: BmiInputValues): BmiOutput => {
  const { height, weight } = bmiInput;
  const bmi = calculateBmi(height, weight);
  return { weight, height, bmi };
};

app.get('/bmi', (req, res, next) => {
  try {
    const bmiInput = parseBmiQuery(req.query);
    const bmiResult = prepareBmiResponse(bmiInput);
    res.json(bmiResult);
  } catch(error) {
    next(error);
  } 
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// https://stackoverflow.com/questions/50218878/typescript-express-error-function
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (req.query && error instanceof Error) {
    // 400 Bad Request
    res.status(400).json({ error: error.message });
  } else {
    console.error('Error: errorHandler: invoke default error handler!');
    next(error); // invoke the default express error handler
  }
};

app.use(errorHandler);