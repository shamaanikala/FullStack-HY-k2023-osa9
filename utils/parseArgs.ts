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

interface BmiInputValues {
  height: number;
  weight: number;
};

const parseBmiArgs = (args: string[], requiredLength: number): BmiInputValues => {
  if (!checkArgsLength(args,requiredLength).success) {
    handleInputArgumentLengthError(checkArgsLength(args,requiredLength));
  }
  const height = 180; // cm
  const weight = 90; // kg
  return { height, weight };
}

const parseArgs = (args: string[]) => {
  const BMI_CALCULATOR_ARGS_LENGTH = 2;
  // exerciseCalculator has variable length arguments
  // but it must have a minimum amount of input arguments:
  // target day1
  const EXERCISE_CALCULATOR_ARGS_MIN_LENGTH = 2;

  const tsFile = getTSfileName(args[1]);
  // console.log(tsFile);
  console.log(checkArgsLength([],3));
  console.log(checkArgsLength(args,3));
  
  const input = args.slice(2); // slice off the 2 first

  const bmi_input = parseBmiArgs(input, BMI_CALCULATOR_ARGS_LENGTH);
  console.log(bmi_input);

  switch (tsFile) {
    case 'bmiCalculator.ts':
      return 'bmiCalculator.ts';
    case 'exerciseCalculator.ts':
      return 'exerciseCalculator.ts';
    default:
      throw new Error('Unable to find correct .ts file!');
  }
}

export default parseArgs;