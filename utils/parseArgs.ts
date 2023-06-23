const getTSfileName = (arg: string): string => {
  const tsFileStr = arg.split('/');
  const tsIndex = tsFileStr.length - 1;
  const tsFile = arg.split('/')[tsIndex];
  return tsFile;
};

interface argsLengthResult {
  success: boolean;
  length: number;
  requiredLength: number;
}

// with the min parameter checks for minimum required number of input arguments
const checkArgsLength = (args: string[], requiredLength: number, min = false) : argsLengthResult => {
  if (!min && args && requiredLength) {
    return args.length === requiredLength
      ? { success: true, length: args.length, requiredLength }
      : { success: false, length: args.length, requiredLength };
  } else if (min && args && requiredLength) {
    return args.length >= requiredLength // minimum required number of args
      ? { success: true, length: args.length, requiredLength }
      : { success: false, length: args.length, requiredLength };
  } else {
    throw new Error('Bad arguments given!');
  }
};

const handleInputArgumentLengthError = (result: argsLengthResult) => {
  throw result.length > result.requiredLength
    ? new Error('Too many arguments!')
    : new Error('Not enough arguments!');
};

export interface BmiInputValues {
  height: number;
  weight: number;
}

export interface ExerciseInputValues {
  hours: number[];
  target: number;
}

export const parseBmiArgs = (args: string[], requiredLength: number): BmiInputValues => {
  const argLenCheck = checkArgsLength(args,requiredLength);
  if (!argLenCheck.success) {
    handleInputArgumentLengthError(argLenCheck);
  }
  const height = Number(args[0]); // cm
  const weight = Number(args[1]); // kg
  if (!isNaN(height) && !isNaN(weight)) {
    return { height, weight };
  } else {
    throw new Error('Provided input values were not numbers!');
  }
};

export const toNumber = (n: string): number => {
  const numberN = Number(n);
  if (!isNaN(numberN)) {
    return numberN;
  } else {
    throw new Error('Provided input values were not numbers!');
  }
};

export const parseExerciseArgs = (args: string[], requiredLength: number): ExerciseInputValues => {
  // first arg target : number
  // then series of numbers => number[]
  const argLenCheck = checkArgsLength(args,requiredLength,true); // min=true
  if (!argLenCheck.success) {
    handleInputArgumentLengthError(argLenCheck);
  }

  const target = toNumber(args[0]);
  const hours = args.slice(1).map(n => toNumber(n));
  return { hours, target };
};

// exerciseCalculator has variable length arguments
// but it must have a minimum amount of input arguments:
// target [day1] is the minimum valid number of arguments
export const BMI_CALCULATOR_ARGS_LENGTH = 2;
export const EXERCISE_CALCULATOR_ARGS_MIN_LENGTH = 2;

const parseArgs = (args: string[]): BmiInputValues | ExerciseInputValues => {
  const tsFile = getTSfileName(args[1]);
  const input = args.slice(2); // slice off the 2 first

  switch (tsFile) {
    case 'bmiCalculator.ts':
      return parseBmiArgs(input, BMI_CALCULATOR_ARGS_LENGTH);
    case 'exerciseCalculator.ts':
      return parseExerciseArgs(input, EXERCISE_CALCULATOR_ARGS_MIN_LENGTH);
    default:
      throw new Error('Unable to find correct .ts file!');
  }
};

export default parseArgs;