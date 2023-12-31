import parseArgs from "./utils/parseArgs";
import { ExerciseInputValues } from "./utils/parseArgs";

// assuming integer rating
type Rating = 1 | 2 | 3;

 
export interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: Rating,
  ratingDescription: string,
  target: number,
  average: number
}

const avg = (array: number[]): number => {
  const sum = array.reduce((sum, elem) => sum += elem, 0);
  return sum/array.length;
};

const rateExerciseHours = (averageHours: number, targetHours: number): Rating => {
  if (averageHours >= targetHours) {
    return 3;
  } else if (averageHours >= 0.5*targetHours) {
    return 2;
  } else {
    return 1;
  }
};

const RatingDescription: string[] = [
  //'the target is still quite far away',
  'bad',
  'not too bad but could be better',
  'target reached, well done!'
];
 
const getRatingDescription = (rating: Rating): string => {
  return RatingDescription[rating-1];
};

const calculateExercises = (dailyExerciseHours: number[], targetHours: number): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
  const average = avg(dailyExerciseHours);
  const success = average >= targetHours;
  const rating = rateExerciseHours(average, targetHours);
  const ratingDescription = getRatingDescription(rating);
  const target = targetHours;
  const result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
  return result;
};

if (process.argv[1] !== 'exerciseCalculator.ts') {
  console.log(`Loading exerciseCalculator from ${process.argv[1]}`);   
} else {
  try {
    const { hours, target } = parseArgs(process.argv) as ExerciseInputValues;
    console.log(calculateExercises(hours, target));
  } catch(error: unknown) {
    let errorMessage = 'exerciseCalculator: Error: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.error(errorMessage);
  }
}

export default calculateExercises;