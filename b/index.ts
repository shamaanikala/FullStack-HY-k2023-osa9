import express from 'express';

import calculateBmi from './bmiCalculator';
import {
  BmiInputValues,
  parseBmiArgs,
  ExerciseInputValues,
  parseExerciseArgs,
  // toNumber,
  BMI_CALCULATOR_ARGS_LENGTH,
  EXERCISE_CALCULATOR_ARGS_MIN_LENGTH
} from './utils/parseArgs';
import calculateExercises from './exerciseCalculator';
import QueryString from 'qs';

import type { ErrorRequestHandler } from 'express';

const app = express();
app.use(express.json());

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
      return parseBmiArgs(args,BMI_CALCULATOR_ARGS_LENGTH);
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


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseExerciseRequest = (body: any): ExerciseInputValues => {
  console.log(body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!body.target|| !body.daily_exercises) {
    throw new Error('parameters missing');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  } else if (isNaN(Number(body.target))) {
    throw new Error('malformatted parameters');
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const args = [body.target].concat(body.daily_exercises) as string[];
    return parseExerciseArgs(args, EXERCISE_CALCULATOR_ARGS_MIN_LENGTH);
  }
};


app.post('/exercises', (req, res, next) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // const { daily_exercises, target } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  try {
    const { hours, target } = parseExerciseRequest(req.body);
    const result = calculateExercises(hours, target);
    return res.json(result);
  } catch (error) {
    return next(error);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// https://stackoverflow.com/questions/50218878/typescript-express-error-function
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (req.query && error instanceof Error) {
    // overwrite the parseArgs error.message as required
    if (error.message === 'Provided input values were not numbers!') {
      res.status(400).json({ error: 'malformatted parameters' });
    } else {
      // 400 Bad Request
      res.status(400).json({ error: error.message });
    }
  } else {
    console.error('Error: errorHandler: invoke default error handler!');
    next(error); // invoke the default express error handler
  }
};

app.use(errorHandler);
