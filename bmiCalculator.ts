interface BMI {
  // Example:
  // category: 'Normal'
  // description: 'healthy weight'
  // lowerBound: 18.5
  // upperBound: 24.9
  category: string;
  description: string;
  lowerBound?: number; // These are optional as the BMIs <= 16.0 or >= 40.0
  upperBound?: number; // do not have lower or upper bounds.
};

// BMI basic categories from Wikipedia:
// https://en.wikipedia.org/wiki/Body_mass_index
const bmis: BMI[] = [
  {
    category: 'Underweight',
    description: 'severe',
    upperBound: 16.0
  },
  {
    category: 'Underweight',
    description: 'moderate',
    lowerBound: 16.0,
    upperBound: 16.9
  },
  {
    category: 'Underweight',
    description: 'mild',
    lowerBound: 17.0,
    upperBound: 18.4
  },
  {
    category: 'Normal',
    description: 'healthy weight',
    lowerBound: 18.5,
    upperBound: 24.9
  },
  {
    category: 'Overweight',
    description: 'pre-obese',
    lowerBound: 25.0,
    upperBound: 29.9
  },
  {
    category: 'Obese',
    description: 'Class I',
    lowerBound: 30.0,
    upperBound: 34.9
  },
  {
    category: 'Obese',
    description: 'Class II',
    lowerBound: 35.0,
    upperBound: 39.9
  },
  {
    category: 'Obese',
    description: 'Class III',
    lowerBound: 40.0
  }
]


const calculateBmi = (height: number, weight: number): string =>  {
  // [height] = cm, [weight] = kg
  // BMI is calculated mass[kg]/height[m]^2
  const heightInMeters = height/100;
  const bmi = weight/(heightInMeters*heightInMeters)
  return `Calculated BMI: ${bmi}`;
}

console.log(calculateBmi(180, 74)); // should return Normal (healthy weight)