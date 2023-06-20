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

const avg = (array: number[]): number => {
  const sum = array.reduce((sum, elem) => sum += elem, 0);
  return sum/array.length;
}
const calculateExercises = (dailyExerciseHours: number[], targetHours: number): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
  const average = avg(dailyExerciseHours);
  const result = {
    periodLength, trainingDays, average
  };
  console.log(result);
  return dummyResult;
}

const inputArray = [3, 0, 2, 4.5, 0, 3, 1];
const inputTarget = 2;

console.log(calculateExercises(inputArray, inputTarget));