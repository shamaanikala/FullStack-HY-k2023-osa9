const getTSfileName = (arg: string): string => {
  const tsFileStr = arg.split('/');
  const tsIndex = tsFileStr.length - 1;
  const tsFile = arg.split('/')[tsIndex];
  return tsFile;
}

interface argsLengthResult {
  success: boolean;
  length: number;
  requiredLength: number;
};

const checkArgsLength = (args: string[], requiredLength: number): argsLengthResult => {
  if (args && requiredLength) {
    return args.length === requiredLength
      ? { success: true, length: args.length, requiredLength }
      : { success: false, length: args.length, requiredLength };
  } else {
    throw new Error('Bad arguments given!');
  }
}

const handleInputArgumentLengthError = (result: argsLengthResult) => {
  throw result.length > result.requiredLength
    ? new Error('Too many arguments!')
    : new Error('Not enough arguments!');
}

export interface BmiInputValues {
  height: number;
  weight: number;
};

export interface ExerciseInputValues {
  hours: number[];
  target: number;
};

const parseBmiArgs = (args: string[], requiredLength: number): BmiInputValues => {
  if (!checkArgsLength(args,requiredLength).success) {
    handleInputArgumentLengthError(checkArgsLength(args,requiredLength));
  }
  const height = Number(args[0]); // cm
  const weight = Number(args[1]); // kg
  return { height, weight };
}

const parseExerciseArgs = (args: string[], requiredLength: number): ExerciseInputValues => {
  // first arg target : number
  // then series of numbers => number[]
  const target = Number(args[0]);
  const hours = args.slice(1).map(n => Number(n));
  return { hours, target };
}

const parseArgs = (args: string[]): BmiInputValues | ExerciseInputValues => {
  const BMI_CALCULATOR_ARGS_LENGTH = 2;
  // exerciseCalculator has variable length arguments
  // but it must have a minimum amount of input arguments:
  // target [day1] is the minimum valid number of arguments
  const EXERCISE_CALCULATOR_ARGS_MIN_LENGTH = 2;

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
}

export default parseArgs;