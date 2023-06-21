import parseArgs from "./utils/parseArgs";
import { BmiInputValues } from "./utils/parseArgs";

interface BmiCategory {
  // Example:
  // name: 'Normal'
  // description: 'healthy weight'
  // lowerBound: 18.5
  // upperBound: 24.9
  name: string;
  description: string;
  lowerBound?: number; // These are optional as the BMIs <= 16.0 or >= 40.0
  upperBound?: number; // do not have lower or upper bounds.
};

// BMI basic categories from Wikipedia:
// https://en.wikipedia.org/wiki/Body_mass_index
const bmis: BmiCategory[] = [
  {
    name: 'Underweight',
    description: 'severe',
    upperBound: 16.0
  },
  {
    name: 'Underweight',
    description: 'moderate',
    lowerBound: 16.0,
    upperBound: 16.9
  },
  {
    name: 'Underweight',
    description: 'mild',
    lowerBound: 17.0,
    upperBound: 18.4
  },
  {
    name: 'Normal',
    description: 'healthy weight',
    lowerBound: 18.5,
    upperBound: 24.9
  },
  {
    name: 'Overweight',
    description: 'pre-obese',
    lowerBound: 25.0,
    upperBound: 29.9
  },
  {
    name: 'Obese',
    description: 'Class I',
    lowerBound: 30.0,
    upperBound: 34.9
  },
  {
    name: 'Obese',
    description: 'Class II',
    lowerBound: 35.0,
    upperBound: 39.9
  },
  {
    name: 'Obese',
    description: 'Class III',
    lowerBound: 40.0
  }
];

// Using .toFixed(1) as the categories are defined with 1 decimal 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
const determineBmiCategory = (bmi: number) => {
  const roundedBmi = Number(bmi.toFixed(1));
  if (roundedBmi <= 16.0) {
    return bmis[0];
  } else if (roundedBmi >= 40.0) {
    return bmis[bmis.length - 1];
  } else {
    for (const category of bmis.slice(1,-1)) {
      if (category.lowerBound && category.upperBound) {
        if (roundedBmi >= category.lowerBound && roundedBmi <= category.upperBound) {
          return category;
        }
      }
    }
  }
  return;
}

const calculateBmi = (height: number, weight: number): string =>  {
  // [height] = cm, [weight] = kg
  // BMI is calculated mass[kg]/height[m]^2
  const heightInMeters = height/100;
  const bmi = weight/(heightInMeters*heightInMeters);

  const category = determineBmiCategory(bmi);
  return `${category?.name} (${category?.description})`;
}

try {
  // need to use type narrowing now with type assertion 'as'
  // because it is not automatically known if the function will
  // return BmiInputValues or ExerciseInputValues
  const { height, weight } = parseArgs(process.argv) as BmiInputValues;
  console.log(calculateBmi(height, weight));
} catch(error: unknown) {
  let errorMessage = 'bmiCalculator: Error: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.error(errorMessage);
}