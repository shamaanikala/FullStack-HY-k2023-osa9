import express from 'express';

import calculateBmi from './bmiCalculator';
// import { BmiInputValues, parseBmiArgs } from './utils/parseArgs';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

// interface BmiQuery {
//   height: string;
//   weight: string;
// };

//const parseBmiQuery = (query: BmiQuery): BmiInputValues => {
// const parseBmiQuery = (query: ParsedQs): BmiInputValues => {
//   if (!query) {
//     throw new Error('malformatted parameters');
//   } else {
//     const args = [query.height, query.height];
//     return parseBmiArgs(args,2);
//   }
// }

app.get('/bmi', (req, res) => {
  console.log('/bmi');
  console.log(req.query);
  //const bmiInput = parseBmiQuery(req.query);
  const { lol } = req.query;
  console.log('lol',lol); // undefined
  const { url } = req.query;
  console.log('url',url); // undefined
  const { height, weight } = req.query;
  console.log(height, weight);
  const dummyHeight = 180;
  const dummyWeight = 72;
  const bmiDummyResponse = {
    dummyWeight: 180,
    dummyHeight,
    bmi: calculateBmi(dummyHeight, dummyWeight)
  };
  res.json(bmiDummyResponse);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
