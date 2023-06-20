interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

const dummyResult = {
  periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could do better',
  target: 2,
  average: 1.9285714285714286
};

const calculateExercises = (dailyExerciseHours: number[], targetHours: number): Result => {
  return dummyResult;
}

const inputArray = [3, 0, 2, 4.5, 0, 3, 1];
const inputTarget = 2;

console.log(calculateExercises(inputArray, inputTarget));