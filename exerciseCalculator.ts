import parseArgs from "./utils/parseArgs";
import { ExerciseInputValues } from "./utils/parseArgs";

// assuming integer rating
type Rating = 1 | 2 | 3;

 
interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: Rating,
  ratingDescription: string,
  target: number,
  average: number
};

const avg = (array: number[]): number => {
  const sum = array.reduce((sum, elem) => sum += elem, 0);
  return sum/array.length;
}

const rateExerciseHours = (averageHours: number, targetHours: number): Rating => {
  if (averageHours >= targetHours) {
    return 3;
  } else if (averageHours >= 0.5*targetHours) {
    return 2;
  } else {
    return 1;
  }
}

const RatingDescription: string[] = [
  'the target is still quite far away',
  'not too bad but could be better',
  'target reached, well done!'
];
 
const getRatingDescription = (rating: Rating): string => {
  return RatingDescription[rating-1];
}

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
}

const parsedArg = parseArgs(process.argv);

const { hours, target } = parseArgs(process.argv) as ExerciseInputValues;
console.log(calculateExercises(hours, target));
