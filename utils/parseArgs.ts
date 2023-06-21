const getTSfileName = (arg: string): string => {
  const tsFileStr = arg.split('/');
  const tsIndex = tsFileStr.length - 1;
  const tsFile = arg.split('/')[tsIndex];
  return tsFile;
}

interface argsLengthResult {
  success: boolean;
  length: number;
}

const checkArgsLength = (args: string[], requiredLength: number): argsLengthResult => {
  if (args && requiredLength) {
    return args.length === requiredLength
      ? { success: true, length: requiredLength }
      : { success: false, length: args.length }
  } else {
    throw new Error('Bad arguments given!');
  }
}

interface BmiInputValues {
  height: number;
  weight: number;
};

const parseBmiArgs = (args: string[], requiredLength: number): BmiInputValues => {
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
  
  const bmi_input = parseBmiArgs(args, BMI_CALCULATOR_ARGS_LENGTH);
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